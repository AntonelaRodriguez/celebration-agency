import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe, Put, UsePipes, ValidationPipe, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';

@Controller('product')
export class ProductController {

  constructor(
    private readonly productService: ProductService
  ) {}

  @UsePipes(new ValidationPipe({whitelist: true}))
  @Post()
  async create(@Body() products: CreateProductDto) {
    return await this.productService.create(products);
  }

  @Get()
  async getAll(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
    ): Promise<{product: Product[]; total: number}> {
      const [product, total] = await this.productService.getAll(page, limit)
      return {product, total};
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.productService.findById(id);
  }

  @UsePipes(new ValidationPipe({whitelist: true}))
  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() products: CreateProductDto) {
    return await this.productService.update(id, products);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.productService.remove(id);
  }
}
