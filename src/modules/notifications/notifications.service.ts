import { Injectable, Logger } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { getMessaging } from 'firebase-admin/messaging';

@Injectable()
export class NotificationsService {
  private logger = new Logger('NotificationsService');

  async sendToToken(token: string, title: string, body: string) {
    if (!token) return;
    try {
      await getMessaging().send({
        token,
        notification: { title, body },
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      this.logger.warn(`Notification failed: ${message}`);
    }
  }

  async notifyOrderStatus(fcmToken: string, status: string, orderNumber: string) {
    const messages: Record<string, { title: string; body: string }> = {
      received:         { title: '✅ Order Received',    body: `Order ${orderNumber} received!` },
      preparing:        { title: '👨‍🍳 Preparing',        body: `${orderNumber} is being prepared.` },
      ready:            { title: '✅ Ready for Pickup',  body: `Driver is on the way!` },
      out_for_delivery: { title: '🛵 Out for Delivery', body: `${orderNumber} is on its way!` },
      delivered:        { title: '🎉 Delivered!',        body: `Enjoy your meal!` },
      cancelled:        { title: '❌ Cancelled',         body: `Order ${orderNumber} cancelled.` },
    };
    const msg = messages[status];
    if (msg) await this.sendToToken(fcmToken, msg.title, msg.body);
  }
}