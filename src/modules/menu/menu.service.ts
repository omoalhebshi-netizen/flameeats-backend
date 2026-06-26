import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { MenuItem } from './entities/menu-item.entity';
import { CustomizationGroup } from './entities/customization.entity';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
    @InjectRepository(MenuItem) private itemRepo: Repository<MenuItem>,
    @InjectRepository(CustomizationGroup) private groupRepo: Repository<CustomizationGroup>,
  ) {}

  getCategories() {
    return this.categoryRepo.find({ where: { isActive: true }, order: { sortOrder: 'ASC' } });
  }

  getItems(categoryId?: string) {
    const where: any = { isAvailable: true };
    if (categoryId) where.category = { id: categoryId };
    return this.itemRepo.find({
      where,
      relations: { category: true },
      order: { sortOrder: 'ASC' },
    });
  }

  getFeatured() {
    return this.itemRepo.find({
      where: { isFeatured: true, isAvailable: true },
      relations: { category: true },
    });
  }

  getPopular() {
    return this.itemRepo.find({
      where: { isPopular: true, isAvailable: true },
      relations: { category: true },
    });
  }

  async getItemDetail(id: string) {
    const item = await this.itemRepo.findOne({
      where: { id },
      relations: {
        category: true,
        customizationGroups: {
          options: true,
        },
      },
    });
    if (!item) throw new NotFoundException('Item not found');
    return item;
  }
  search(q: string) {
    return this.itemRepo
      .createQueryBuilder('item')
      .leftJoinAndSelect('item.category', 'category')
      .where('item.isAvailable = true')
      .andWhere('(item.nameAr ILIKE :q OR item.nameEn ILIKE :q)', { q: `%${q}%` })
      .getMany();
  }

  async createItem(data: any) {
    const item = this.itemRepo.create({ ...data, category: { id: data.categoryId } });
    return this.itemRepo.save(item);
  }

  async updateItem(id: string, data: any) {
    await this.itemRepo.update(id, data);
    return this.getItemDetail(id);
  }

  async deleteItem(id: string) {
    await this.itemRepo.delete(id);
    return { success: true };
  }

  async updateImage(id: string, imageUrl: string) {
    await this.itemRepo.update(id, { imageUrl });
    return { imageUrl };
  }

  async createCategory(data: Partial<Category>) {
    return this.categoryRepo.save(this.categoryRepo.create(data));
  }
}