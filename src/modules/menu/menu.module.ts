import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';
import { Category } from './entities/category.entity';
import { MenuItem } from './entities/menu-item.entity';
import { CustomizationGroup, CustomizationOption } from './entities/customization.entity';
import { StorageModule } from '../storage/storage.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Category, MenuItem, CustomizationGroup, CustomizationOption]),
    StorageModule,
  ],
  controllers: [MenuController],
  providers: [MenuService],
  exports: [MenuService],
})
export class MenuModule {}