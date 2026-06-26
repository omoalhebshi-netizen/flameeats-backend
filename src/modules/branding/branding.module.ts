import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandingController } from './branding.controller';
import { BrandingService } from './branding.service';
import { Branding } from './branding.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Branding])],
  controllers: [BrandingController],
  providers: [BrandingService],
  exports: [BrandingService],
})
export class BrandingModule {}