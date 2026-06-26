import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Category } from './category.entity';
import { CustomizationGroup } from './customization.entity';

@Entity('menu_items')
export class MenuItem {
  @PrimaryGeneratedColumn('uuid')
    id!: string;

  @ManyToOne(() => Category, cat => cat.items)
    @JoinColumn({ name: 'category_id' })
    category!: Category;

  @Column({ name: 'name_ar' })
    nameAr!: string;

  @Column({ name: 'name_en' })
    nameEn!: string;

  @Column({ nullable: true, name: 'description_ar', type: 'text' })
    descriptionAr!: string;

  @Column({ nullable: true, name: 'description_en', type: 'text' })
    descriptionEn!: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
    price!: number;

  @Column({ nullable: true, name: 'image_url' })
    imageUrl!: string;

  @Column({ default: 15, name: 'prep_time_mins' })
    prepTimeMins!: number;

  @Column({ default: true, name: 'is_available' })
    isAvailable!: boolean;

  @Column({ default: false, name: 'is_featured' })
    isFeatured!: boolean;

  @Column({ default: false, name: 'is_popular' })
    isPopular!: boolean;

  @Column({ default: 0, name: 'sort_order' })
    sortOrder!: number;

  @OneToMany(() => CustomizationGroup, group => group.menuItem)
    customizationGroups!: CustomizationGroup[];

  @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
    updatedAt!: Date;
}