import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe, Put, UsePipes, ValidationPipe, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Observable } from 'rxjs';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Product } from './entities/product.entity';
import { SERVER_PORT } from 'src/config/constants';

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
  index(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    ): Observable<Pagination<Product>> {
      limit = limit > 100 ? 100 : limit;

    return this.productService.paginate({
      page, limit: 10, route: `http://localhost${SERVER_PORT}/product`
    });
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
