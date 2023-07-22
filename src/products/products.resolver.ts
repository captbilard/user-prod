import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Mutation(() => Product)
  createProduct(
    @Args('userId') userId: string,
    @Args('createProductInput') data: CreateProductDto,
  ) {
    return this.productsService.create(data, userId);
  }
}
