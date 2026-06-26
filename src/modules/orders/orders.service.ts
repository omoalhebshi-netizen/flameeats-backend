import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order, OrderItem } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(OrderItem) private itemRepo: Repository<OrderItem>,
  ) {}

  private generateOrderNumber(): string {
    const num = Math.floor(1000 + Math.random() * 9000);
    return `ORD-${num}`;
  }

  async createOrder(userId: string, data: any) {
    const deliveryFee = parseFloat(process.env.DELIVERY_FEE || '15');
    const taxRate = parseFloat(process.env.TAX_RATE || '0.15');

    const subtotal = data.items.reduce((sum: number, item: any) => sum + item.itemTotal, 0);
    const tax = parseFloat((subtotal * taxRate).toFixed(2));
    const total = subtotal + deliveryFee + tax;

    const orderData: any = {
      orderNumber: this.generateOrderNumber(),
      status: 'received',
      deliveryAddress: data.deliveryAddress,
      customerName: data.customerName,
      customerPhone: data.customerPhone,
      subtotal,
      deliveryFee,
      tax,
      total,
      paymentMethod: data.paymentMethod,
      paymentStatus: data.paymentMethod === 'cash' ? 'pending' : 'paid',
      notes: data.notes || '',
      estimatedMins: 30,
      receivedAt: new Date(),
      items: data.items.map((item: any) => ({
        menuItemId: item.menuItemId,
        nameSnapshot: item.name,
        priceSnapshot: item.price,
        quantity: item.quantity,
        notes: item.notes || '',
        itemTotal: item.itemTotal,
      })),
    };

    const order = this.orderRepo.create(orderData);
    return this.orderRepo.save(order);
  }

  getUserOrders(userId: string) {
    return this.orderRepo.find({
      relations: { items: true },
      order: { createdAt: 'DESC' },
    });
  }

  async getOrderById(id: string) {
    const order = await this.orderRepo.findOne({
      where: { id },
      relations: { items: true },
    });
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  getAllOrders(status?: string) {
    const where: any = {};
    if (status) where.status = status;
    return this.orderRepo.find({
      where,
      relations: { items: true },
      order: { createdAt: 'DESC' },
    });
  }

  async updateStatus(id: string, status: string) {
    const timestamps: any = {
      preparing: 'preparingAt',
      ready: 'readyAt',
      delivered: 'deliveredAt',
      cancelled: 'cancelledAt',
    };
    const update: any = { status };
    if (timestamps[status]) update[timestamps[status]] = new Date();
    await this.orderRepo.update(id, update);
    return this.getOrderById(id);
  }
}