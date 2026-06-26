import { Controller, Get, Put, Body } from '@nestjs/common';
import { BrandingService } from './branding.service';

@Controller('branding')
export class BrandingController {
  constructor(private brandingService: BrandingService) {}

  @Get()
  getBranding() {
    return this.brandingService.getBranding();
  }

  @Put()
  updateBranding(@Body() body: any) {
    return this.brandingService.updateBranding(body);
  }
}