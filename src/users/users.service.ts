import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async create(data: CreateUserDto): Promise<User> {
    const user = this.userRepo.create({ ...data });
    return await this.userRepo.save(user);
  }

  async findAll(): Promise<User[]> {
    try {
      return await this.userRepo.find({
        relations: {
          orders: true,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(`${error}`);
    }
  }

  async findOne(id: string): Promise<User> {
    try {
      return await this.userRepo.findOne({
        where: { id },
        relations: {
          orders: true,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(`${error}`);
    }
  }
}
