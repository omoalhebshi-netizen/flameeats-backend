import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Branding } from './branding.entity';

@Injectable()
export class BrandingService {
  constructor(
    @InjectRepository(Branding) private repo: Repository<Branding>,
  ) {}

  async getBranding() {
    const all = await this.repo.find();
    if (all.length === 0) {
      return this.repo.save(this.repo.create({}));
    }
    return all[0];
  }

  async updateBranding(data: Partial<Branding>) {
    const branding = await this.getBranding();
    Object.assign(branding, data);
    return this.repo.save(branding);
  }
}