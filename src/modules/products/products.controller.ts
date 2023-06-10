import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductDto } from './dto/product.dto';

@Controller('/api/v1')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Post('products')
  async create(@Body() data: ProductDto) {
    return await this.productsService.create(data);
  }

  @Get('products')
  async findAll() {
    return await this.productsService.findAll();
  }

  @Get('products/:id')
  async findOne(@Param('id') id: string) {
    return await this.productsService.findOne(Number(id));
  }

  @Patch('products/:id')
  async update(@Param('id') id: string, @Body() data: ProductDto) {
    return await this.productsService.update(Number(id), data);
  }

  @Delete('products/:id')
  async delete(@Param('id') id: string) {
    return await this.productsService.delete(Number(id));
  }
}
