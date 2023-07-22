import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from '../products.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from '../entities/product.entity';
import { User } from '../../users/entities/user.entity';
import { mockUser } from '../../users/tests/mocks/mock';
import { productRepoMock, userRepoMock } from './mocks/mock';

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        { provide: getRepositoryToken(Product), useValue: productRepoMock },
        { provide: getRepositoryToken(User), useValue: userRepoMock },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a product', async () => {
      const user = userRepoMock.findOne.mockReturnValue(mockUser);
      const newProduct = {
        id: '1234',
        name: 'some-product',
        price: 23.0,
        user,
      };
      productRepoMock.save.mockReturnValue(newProduct);
      const product = await service.create(newProduct, '123');
      expect(product).toMatchObject(newProduct);
    });
  });
});
