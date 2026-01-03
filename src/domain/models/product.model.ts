import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Product {
   @ApiProperty({ example: 1, description: 'The ID of the product' })
 @PrimaryGeneratedColumn('increment')
  id: number;

   @ApiProperty({ example: 'Laptop', description: 'The name of the product' })
  @Column()
  name: string;

  @ApiProperty({ example: 1500, description: 'The price of the product' })
  @Column('decimal') // store price as decimal
  price: number;
}

