import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  phone!: string;

  @Column({ nullable: true })
  name!: string;

  @Column({ nullable: true })
  email!: string;

  @Column({ unique: true, name: 'firebase_uid' })
  firebaseUid!: string;

  @Column({ nullable: true, name: 'avatar_url' })
  avatarUrl!: string;

  @Column({ nullable: true, name: 'fcm_token' })
  fcmToken!: string;

  @Column({ default: true, name: 'is_active' })
  isActive!: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}