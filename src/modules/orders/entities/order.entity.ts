import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../auth/entities/user.entity';

export type OrderStatus = 'received' | 'preparing' | 'ready' | 'out_for_delivery' | 'delivered' | 'cancelled';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
    id!: string;

  @Column({ unique: true, name: 'order_number' })
    orderNumber!: string;

 @ManyToOne(() => User, { nullable: true })
@JoinColumn({ name: 'user_id' })
user: User;

  @Column({ nullable: true, name: 'driver_id' })
    driverId!: string;

  @Column({ default: 'received' })
    status!: OrderStatus;

  @Column({ name: 'delivery_address', type: 'text' })
    deliveryAddress!: string;

  @Column({ type: 'decimal', precision: 10, scale: 8, nullable: true, name: 'delivery_lat' })
    deliveryLat!: number;

  @Column({ type: 'decimal', precision: 11, scale: 8, nullable: true, name: 'delivery_lng' })
    deliveryLng!: number;

  @Column({ nullable: true, name: 'customer_name' })
    customerName!: string;

  @Column({ nullable: true, name: 'customer_phone' })
    customerPhone!: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
    subtotal!: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0, name: 'delivery_fee' })
    deliveryFee!: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    tax!: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
    total!: number;

  @Column({ name: 'payment_method' })
    paymentMethod!: string;

  @Column({ default: 'pending', name: 'payment_status' })
    paymentStatus!: string;

  @Column({ nullable: true, name: 'payment_ref' })
    paymentRef!: string;

  @Column({ nullable: true, type: 'text' })
    notes!: string;

  @Column({ nullable: true, name: 'estimated_mins' })
    estimatedMins!: number;

  @OneToMany(() => OrderItem, item => item.order, { cascade: true })
    items!: OrderItem[];

  @Column({ nullable: true, name: 'received_at', type: 'timestamptz' })
    receivedAt!: Date;

  @Column({ nullable: true, name: 'preparing_at', type: 'timestamptz' })
    preparingAt!: Date;

  @Column({ nullable: true, name: 'ready_at', type: 'timestamptz' })
    readyAt!: Date;

  @Column({ nullable: true, name: 'delivered_at', type: 'timestamptz' })
    deliveredAt!: Date;

  @Column({ nullable: true, name: 'cancelled_at', type: 'timestamptz' })
    cancelledAt!: Date;

  @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
    updatedAt!: Date;
}

@Entity('order_items')
export class OrderItem {
  @PrimaryGeneratedColumn('uuid')
    id!: string;

  @ManyToOne(() => Order, order => order.items, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'order_id' })
    order!: Order;

  @Column({ name: 'menu_item_id', nullable: true })
    menuItemId!: string;

  @Column({ name: 'name_snapshot' })
    nameSnapshot!: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, name: 'price_snapshot' })
    priceSnapshot!: number;

  @Column()
    quantity!: number;

  @Column({ nullable: true, type: 'text' })
    notes!: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, name: 'item_total' })
    itemTotal!: number;
}