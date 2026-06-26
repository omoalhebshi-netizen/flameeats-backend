import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth, DecodedIdToken } from 'firebase-admin/auth';
import { User } from './entities/user.entity';

@Injectable()
export class AuthService {
  findUser(sub: any) {
      throw new Error('Method not implemented.');
  }
  updateProfile(sub: any, body: { name?: string; email?: string; }) {
      throw new Error('Method not implemented.');
  }
  private auth;

  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {
  if (!getApps().length) {
  try {
    initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID || 'food-app-32114',
        privateKey: (process.env.FIREBASE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL || 'firebase-adminsdk-fbsvc@food-app-32114.iam.gserviceaccount.com',
      } as any),
    });
  } catch (e) {
    console.warn('Firebase init failed:', e.message);
  }
}

this.auth = getAuth();
}

  async verifyCustomer(firebaseToken: string, fcmToken?: string) {
    let decoded: DecodedIdToken;
    try {
      decoded = await getAuth().verifyIdToken(firebaseToken);
    } catch {
      throw new UnauthorizedException('Invalid Firebase token');
    }

    const phone = decoded.phone_number;
    if (!phone) throw new BadRequestException('Token has no phone number');

    let user = await this.userRepo.findOne({ where: { firebaseUid: decoded.uid } });
    if (!user) {
      user = this.userRepo.create({ phone, firebaseUid: decoded.uid });
    }

    if (fcmToken) user.fcmToken = fcmToken;
    await this.userRepo.save(user);

    return { user };
  }
}