import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { MenuItem } from './menu-item.entity';

@Entity('customization_groups')
export class CustomizationGroup {
  @PrimaryGeneratedColumn('uuid')
    id!: string;

  @ManyToOne(() => MenuItem, item => item.customizationGroups, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'menu_item_id' })
    menuItem!: MenuItem;

  @Column({ name: 'name_ar' })
    nameAr!: string;

  @Column({ name: 'name_en' })
    nameEn!: string;

  @Column({ default: 'checkbox' })
    type!: string;

  @Column({ default: false, name: 'is_required' })
    isRequired!: boolean;

  @Column({ default: 10, name: 'max_select' })
    maxSelect!: number;

  @OneToMany(() => CustomizationOption, opt => opt.group, { cascade: true })
    options!: CustomizationOption[];
}

@Entity('customization_options')
export class CustomizationOption {
  @PrimaryGeneratedColumn('uuid')
    id!: string;

  @ManyToOne(() => CustomizationGroup, group => group.options, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'group_id' })
    group!: CustomizationGroup;

  @Column({ name: 'name_ar' })
    nameAr!: string;

  @Column({ name: 'name_en' })
    nameEn!: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0, name: 'extra_price' })
    extraPrice!: number;

  @Column({ default: false, name: 'is_default' })
    isDefault!: boolean;

  @Column({ default: true, name: 'is_active' })
    isActive!: boolean;
}