import { Injectable, UnauthorizedException, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { getApps, initializeApp, cert } from 'firebase-admin/app';
import { getAuth, Auth } from 'firebase-admin/auth';
import { User } from './entities/user.entity';

@Injectable()
export class AuthService {
  private auth: Auth | null = null;

  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private jwtService: JwtService,
  ) {
    console.log('ALL ENV KEYS:', Object.keys(process.env).filter(k => k.includes('FIRE') || k.includes('firebase')));
    console.log('FIREBASE_KEY present:', !!process.env.FIREBASE_PRIVATE_KEY, 'length:', (process.env.FIREBASE_PRIVATE_KEY || '').length);
    if (!getApps().length) {
      try {
        initializeApp({
          credential: cert({
            projectId: process.env.FIREBASE_PROJECT_ID || 'food-app-32114',
            privateKey: (process.env.FIREBASE_PRIVATE_KEY || '').replace(/\\n/g, '\n').trim(),
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL || 'firebase-adminsdk-fbsvc@food-app-32114.iam.gserviceaccount.com',
          }),
        });
        this.auth = getAuth();
      } catch (e: any) {
        console.warn('Firebase init failed:', e.message);
      }
    } else {
      try {
        this.auth = getAuth();
      } catch (e: any) {
        console.warn('Firebase getAuth failed:', e.message);
      }
    }
  }

  async verifyCustomer(firebaseToken: string, fcmToken?: string) {
    if (!this.auth) throw new UnauthorizedException('Auth service unavailable');
    let decoded: any;
    try {
      decoded = await this.auth.verifyIdToken(firebaseToken);
    } catch {
      throw new UnauthorizedException('Invalid Firebase token');
    }
    const phone = decoded.phone_number;
    if (!phone) throw new BadRequestException('Token has no phone number');
    let user = await this.userRepo.findOne({ where: { firebaseUid: decoded.uid } });
    if (!user) {
      user = this.userRepo.create({ phone, firebaseUid: decoded.uid });
      if (fcmToken) user.fcmToken = fcmToken;
      await this.userRepo.save(user);
    } else if (fcmToken && user.fcmToken !== fcmToken) {
      user.fcmToken = fcmToken;
      await this.userRepo.save(user);
    }
    const token = this.jwtService.sign({ sub: user.id, phone: user.phone });
    return { token, user };
  }

  async findUser(id: string) {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async updateProfile(id: string, data: { name?: string; email?: string }) {
    const user = await this.findUser(id);
    if (data.name !== undefined) user.name = data.name;
    if (data.email !== undefined) user.email = data.email;
    return this.userRepo.save(user);
  }
}
