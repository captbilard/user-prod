import { ObjectType, Field } from '@nestjs/graphql';
import { Product } from '../../products/entities/product.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class User {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ nullable: false })
  name: string;

  @Field()
  @Column({ nullable: false, unique: true })
  email: string;

  @Field()
  @Column({ type: 'int', nullable: false })
  age: number;

  @Field(() => [Product], { nullable: true })
  @OneToMany(() => Product, (product) => product.user)
  orders: Product[];
}
