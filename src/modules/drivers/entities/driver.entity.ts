import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('drivers')
export class Driver {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column({ unique: true })
  phone!: string;

  @Column({ unique: true, name: 'firebase_uid' })
  firebaseUid!: string;

  @Column({ nullable: true, name: 'avatar_url' })
  avatarUrl!: string;

  @Column({ nullable: true, name: 'fcm_token' })
  fcmToken!: string;

  @Column({ nullable: true, name: 'vehicle_type' })
  vehicleType!: string;

  @Column({ nullable: true, name: 'plate_number' })
  plateNumber!: string;

  @Column({ default: true, name: 'is_active' })
  isActive!: boolean;

  @Column({ default: false, name: 'is_available' })
  isAvailable!: boolean;

  @Column({ type: 'decimal', precision: 10, scale: 8, nullable: true, name: 'current_lat' })
  currentLat!: number;

  @Column({ type: 'decimal', precision: 11, scale: 8, nullable: true, name: 'current_lng' })
  currentLng!: number;

  @Column({ type: 'decimal', precision: 3, scale: 2, default: 5.0 })
  rating!: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}