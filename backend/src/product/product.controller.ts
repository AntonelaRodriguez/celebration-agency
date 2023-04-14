import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';

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
  async findAll() {
    return await this.productService.getAll();
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
