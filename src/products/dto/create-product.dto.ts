import { InputType, Field } from '@nestjs/graphql';
import { IsDecimal, IsNumber, IsString, Min } from 'class-validator';

@InputType()
export class CreateProductDto {
  @Field()
  @IsString()
  name: string;

  @Field()
  @IsNumber()
  @IsDecimal({ decimal_digits: '2' })
  @Min(0.0)
  price: number;
}
