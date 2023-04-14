import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { MessageDto } from 'src/common/message.dto';
import { UserService } from 'src/user/user.service';
import { paginate, Pagination, IPaginationOptions } from 'nestjs-typeorm-paginate';
import { Observable, from, map } from 'rxjs';


@Injectable()
export class ProductService {

  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    private userService: UserService
  ) {}

  async create(products: CreateProductDto): Promise<any> {
    const product = this.productRepository.create(products);
    await this.productRepository.save(product);
    return new MessageDto('Event created')
  }

  async getAll(): Promise<Product[]> {
    const list = await this.productRepository.find({relations: ['author']});
    if(!list.length) {
      throw new NotFoundException(new MessageDto('The list is empty'));
    }
    return list;
  }

  paginate(options: IPaginationOptions): Observable<Pagination<Product>>{
    return from(paginate<Product>(this.productRepository, options)).pipe(
      map((productPageable: Pagination<Product>) => {
        productPageable.items.forEach(function (v) {delete v.password});

        return productPageable;
      })
    )
  }

  async findById(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: {
          id
      }
    });
    if(!product){
      throw new NotFoundException(new MessageDto('Not exist'))
    }
    return product;
  }

  async update(id: number, products: CreateProductDto): Promise<any> {
    const product = await this.productRepository.findOne({
      where: {
        id
      }
    })
    if(!product){
      throw new NotFoundException(new MessageDto('Event not exist'))
    }
    products.address? product.address = products.address : product.address;
    products.date? product.date = products.date : product.date;
    products.hour? product.hour = products.hour : product.hour;
    await this.productRepository.save(product);
    return new MessageDto('Event updated');

  }

  async remove(id: number): Promise<any> {
    const product = await this.productRepository.findOne({
      where: {
        id
      }
    })
    if(!product){
      throw new NotFoundException(new MessageDto('Event not exist'))
    }
    await this.productRepository.delete(product);
    return new MessageDto('Event deleted')
  }



  
}
