import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn } from 'typeorm';

@Entity('branding')
export class Branding {
  @PrimaryGeneratedColumn('uuid')
    id!: string;

  @Column({ default: 'FlameEats', name: 'restaurant_name' })
    restaurantName!: string;

  @Column({ default: 'Delicious food, delivered fast' })
    tagline!: string;

  @Column({ default: '🔥' })
    logo!: string;

  @Column({ default: '#f97316', name: 'primary_color' })
    primaryColor!: string;

  @Column({ default: '#0d0d1a', name: 'background_color' })
    backgroundColor!: string;

  @Column({ default: '#161625', name: 'card_color' })
    cardColor!: string;

  @Column({ default: '#ffffff', name: 'text_color' })
    textColor!: string;

  @Column({ default: 'system-ui', name: 'font_family' })
    fontFamily!: string;

  @Column({ default: 24, name: 'heading_size' })
    headingSize!: number;

  @Column({ default: 14, name: 'body_size' })
    bodySize!: number;

  @Column({ default: true, name: 'show_featured' })
    showFeatured!: boolean;

  @Column({ default: true, name: 'show_popular' })
    showPopular!: boolean;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 15.00, name: 'delivery_fee' })
    deliveryFee!: number;

  @Column({ type: 'decimal', precision: 5, scale: 4, default: 0.15, name: 'tax_rate' })
    taxRate!: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0, name: 'min_order' })
    minOrder!: number;

  @Column({ nullable: true })
    whatsapp!: string;

  @Column({ nullable: true })
    instagram!: string;

  @Column({ nullable: true, type: 'text' })
    address!: string;

  @UpdateDateColumn({ name: 'updated_at' })
    updatedAt!: Date;
}