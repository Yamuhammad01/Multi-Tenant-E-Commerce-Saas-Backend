import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsController } from '../presentation/controllers/products.controller';
import { ProductsService } from '../application/services/products.service';
import { Product } from '../domain/models/product.model';

@Module({
  imports: [TypeOrmModule.forFeature([Product])], // register repository
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
