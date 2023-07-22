import { InputType, Int, Field } from '@nestjs/graphql';
import { IsEmail, IsInt, IsString } from 'class-validator';

@InputType()
export class CreateUserDto {
  @Field(() => String)
  @IsString()
  name: string;

  @Field(() => String)
  @IsEmail()
  email: string;

  @Field(() => Int)
  @IsInt()
  age: number;
}
