import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { MenuItem } from './menu-item.entity';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn('uuid')
    id!: string;

  @Column({ name: 'name_ar' })
    nameAr!: string;

  @Column({ name: 'name_en' })
    nameEn!: string;

  @Column({ nullable: true, name: 'image_url' })
    imageUrl!: string;

  @Column({ default: 0, name: 'sort_order' })
    sortOrder!: number;

  @Column({ default: true, name: 'is_active' })
    isActive!: boolean;

  @OneToMany(() => MenuItem, item => item.category)
    items!: MenuItem[];
}