import { Test, TestingModule } from '@nestjs/testing';
import { ProductsResolver } from '../products.resolver';
import { ProductsService } from '../products.service';
import { productServiceFactoryMock, user } from './mocks/mock';

describe('ProductsResolver', () => {
  let resolver: ProductsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsResolver,
        { provide: ProductsService, useFactory: productServiceFactoryMock },
      ],
    }).compile();

    resolver = module.get<ProductsResolver>(ProductsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('create', () => {
    it('should create a product', async () => {
      const newProduct = {
        name: 'some-product',
        price: 25.0,
      };
      const response = await resolver.createProduct('123', newProduct);
      expect(response).toEqual({
        id: '1234',
        name: 'some-product',
        price: 25.0,
        user,
      });
    });
  });
});
