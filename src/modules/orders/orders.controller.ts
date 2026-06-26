import { Controller, Get, Post, Put, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post()
createOrder(@Request() req, @Body() body: any) {
  return this.ordersService.createOrder('guest-user', body);
}

  @UseGuards(JwtAuthGuard)
  @Get()
  getMyOrders(@Request() req) {
    return this.ordersService.getUserOrders(req.user.sub);
  }

 @Get('admin/all')
getAllOrders(@Query('status') status?: string) {
  return this.ordersService.getAllOrders(status);
}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getOrder(@Param('id') id: string) {
    return this.ordersService.getOrderById(id);
  }

  @Put(':id/status')
updateStatus(@Param('id') id: string, @Body() body: { status: string }) {
  return this.ordersService.updateStatus(id, body.status);
  
}
}