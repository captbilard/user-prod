import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}
  async create(data: CreateProductDto, userId: string): Promise<Product> {
    try {
      const user = await this.userRepo.findOne({ where: { id: userId } });
      const newProduct = { ...data, user };
      const product = this.productRepo.create({ ...newProduct });
      return await this.productRepo.save(product);
    } catch (error) {
      throw new BadRequestException(`${error}`);
    }
  }
}
