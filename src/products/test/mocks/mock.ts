import { CreateProductDto } from 'src/products/dto/create-product.dto';
import { Product } from '../../entities/product.entity';
import { User } from '../../../users/entities/user.entity';
import { MockType } from '../../../users/tests/mocks/mock';
import { Repository } from 'typeorm';

export const productServiceFactoryMock = () => ({
  create: jest.fn((data: CreateProductDto) => ({
    id: '1234',
    user,
    ...data,
  })),
});

export const productRepoMock: MockType<Repository<Product>> = {
  save: jest.fn(),
  create: jest.fn(),
  findOne: jest.fn(),
};

export const userRepoMock: MockType<Repository<User>> = {
  findOne: jest.fn(),
};

export const user = {
  id: '123',
  name: 'John Doe',
  email: 'jdoe@example.com',
  age: 30,
};
