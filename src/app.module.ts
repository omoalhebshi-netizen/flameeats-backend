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
import { HealthController } from './health.controller';

console.log('DB CONFIG:', {
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  user: process.env.PGUSER,
  db: process.env.PGDATABASE,
});

@Module({
  controllers: [HealthController],
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.PGHOST || 'mainline.proxy.rlwy.net',
      port: parseInt(process.env.PGPORT || '27281'),
      username: process.env.PGUSER || 'postgres',
      password: process.env.PGPASSWORD || 'keRMTcNtIiaIglDztprkGZyupZgvnooq',
      database: process.env.PGDATABASE || 'railway',
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