import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../database/entities/index';
import { Repository } from 'typeorm';
import { CreateProdutsDto } from './dtos/create-products.dto';
import { UpdateProductsDto } from './dtos/update-products.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async create(body: CreateProdutsDto) {
    try {
      if (await this.findName(body.name)) {
        throw new BadRequestException('product already exists');
      }

      const newProduct = this.productsRepository.create(body);

      await this.productsRepository.save(newProduct);

      return newProduct;
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async productById(id: number) {
    try {
      const product = await this.productsRepository.findOne({ where: { id } });

      if (!product) {
        throw new NotFoundException(`This product with id: ${id} not found!`);
      }

      return product;
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async findName(name: string) {
    try {
      return await this.productsRepository.findOne({ where: { name } });
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async update(id: number, body: UpdateProductsDto) {
    try {
      await this.productById(id);

      await this.productsRepository.update(id, body);

      return await this.productById(id);
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async delete(id: number) {
    try {
        await this.productById(id)

        await this.productsRepository.delete(id)

        return {message: 'Product deleted'}
        
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, error.status);
    }
  }
}
