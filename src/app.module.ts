import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { MenuModule } from './modules/menu/menu.module';
import { OrdersModule } from './modules/orders/orders.module';
import { DriversModule } from './modules/drivers/drivers.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { BrandingModule } from './modules/branding/branding.module';
import { StorageModule } from './modules/storage/storage.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: false,
      ssl: { rejectUnauthorized: false },
    }),
    AuthModule,
    MenuModule,
    OrdersModule,
    DriversModule,
    NotificationsModule,
    BrandingModule,
    StorageModule,
  ],
})
export class AppModule {}