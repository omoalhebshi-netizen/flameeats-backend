import { Controller, Post, Get, Put, Body, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('verify')
  verifyCustomer(@Body() body: { firebaseToken: string; fcmToken?: string }) {
    return this.authService.verifyCustomer(body.firebaseToken, body.fcmToken);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMe(@Request() req) {
    return this.authService.findUser(req.user.sub);
  }

  @UseGuards(JwtAuthGuard)
  @Put('me')
  updateMe(@Request() req, @Body() body: { name?: string; email?: string }) {
    return this.authService.updateProfile(req.user.sub, body);
  }
}