import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Driver } from './entities/driver.entity';

@Injectable()
export class DriversService {
  constructor(
    @InjectRepository(Driver) private driverRepo: Repository<Driver>,
  ) {}

  findAll() {
    return this.driverRepo.find();
  }

  async findById(id: string) {
    const driver = await this.driverRepo.findOne({ where: { id } });
    if (!driver) throw new NotFoundException('Driver not found');
    return driver;
  }

  async updateLocation(id: string, lat: number, lng: number) {
    await this.driverRepo.update(id, { currentLat: lat, currentLng: lng });
    return { success: true };
  }

  async toggleAvailability(id: string, isAvailable: boolean) {
    await this.driverRepo.update(id, { isAvailable });
    return { isAvailable };
  }

  async createDriver(data: Partial<Driver>) {
    return this.driverRepo.save(this.driverRepo.create(data));
  }
}