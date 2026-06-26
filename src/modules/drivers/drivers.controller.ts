import { Controller, Get, Post, Put, Body, Param, UseGuards, Request } from '@nestjs/common';
import { DriversService } from './drivers.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@Controller('drivers')
export class DriversController {
  constructor(private driversService: DriversService) {}

  @UseGuards(JwtAuthGuard)
  @Get('admin/all')
  findAll() { return this.driversService.findAll(); }

  @UseGuards(JwtAuthGuard)
  @Put('location')
  updateLocation(@Request() req, @Body() body: { lat: number; lng: number }) {
    return this.driversService.updateLocation(req.user.sub, body.lat, body.lng);
  }

  @UseGuards(JwtAuthGuard)
  @Put('availability')
  toggleAvailability(@Request() req, @Body() body: { isAvailable: boolean }) {
    return this.driversService.toggleAvailability(req.user.sub, body.isAvailable);
  }

  @UseGuards(JwtAuthGuard)
  @Post('admin/create')
  createDriver(@Body() body: any) { return this.driversService.createDriver(body); }
}