import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../../domain/models/product.model';

@Injectable()
export class ProductsService {

   constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  private products: Array<CreateProductDto & { id: number }> = [];

  async create(productDto: CreateProductDto): Promise<Product> {
    const product = this.productRepo.create(productDto); // create entity
    return this.productRepo.save(product); // persist in DB
  }

  async findAll(): Promise<Product[]> {
    return this.productRepo.find();
  }

  async findOne(id: number): Promise<Product> {
  const product = await this.productRepo.findOne({ where: { id } });
  if (!product) throw new NotFoundException(`Product ${id} not found`);
  return product;
} 

  async update(id: number, updateDto: UpdateProductDto): Promise<Product> {
    const product = await this.findOne(id);
    Object.assign(product, updateDto);
    return this.productRepo.save(product);
  }

  async remove(id: number): Promise<Product> {
    const product = await this.findOne(id);
    return this.productRepo.remove(product);
  }
}