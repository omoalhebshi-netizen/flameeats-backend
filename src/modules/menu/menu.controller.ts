import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MenuService } from './menu.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { S3Service } from '../storage/s3.service';

@Controller('menu')
export class MenuController {
  constructor(
    private menuService: MenuService,
    private s3: S3Service,
  ) {}

  @Get('categories')
  getCategories() { return this.menuService.getCategories(); }

  @Get('items')
  getItems(@Query('categoryId') categoryId?: string) {
    return this.menuService.getItems(categoryId);
  }

  @Get('items/featured')
  getFeatured() { return this.menuService.getFeatured(); }

  @Get('items/popular')
  getPopular() { return this.menuService.getPopular(); }

  @Get('items/search')
  search(@Query('q') q: string) { return this.menuService.search(q); }

  @Get('items/:id')
  getItem(@Param('id') id: string) { return this.menuService.getItemDetail(id); }

  @Post('admin/items')
  createItem(@Body() body: any) { return this.menuService.createItem(body); }

  @Put('admin/items/:id')
  updateItem(@Param('id') id: string, @Body() body: any) {
    return this.menuService.updateItem(id, body);
  }

  @Delete('admin/items/:id')
  deleteItem(@Param('id') id: string) { return this.menuService.deleteItem(id); }

  @Post('admin/categories')
  createCategory(@Body() body: any) { return this.menuService.createCategory(body); }

  // Image upload endpoint
  @Post('admin/items/:id/image')
  @UseInterceptors(FileInterceptor('image', { limits: { fileSize: 5 * 1024 * 1024 } }))
  async uploadImage(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const imageUrl = await this.s3.uploadFile(file, 'menu');
    return this.menuService.updateImage(id, imageUrl);
  }
}