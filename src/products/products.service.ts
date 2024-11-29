import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product, User } from '../database/entities/index';
import { Repository } from 'typeorm';
import { CreateProdutsDto } from './dtos/create-products.dto';
import { UpdateProductsDto } from './dtos/update-products.dto';
import { UserDecoratorDTO } from '../user/dtos/userDecorator.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
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

  async reward(id: number, userDeco: UserDecoratorDTO) {
    try {
      const product = await this.productsRepository.findOne({
        where: { id },
        select: {
          id: true,
          name: true,
          price: true,
          category: true,
          inStock: true,
        }, relations: {buyer: true}
      });

      if (!product || !product.inStock) {
        throw new NotFoundException(
          `This product with id: ${id} not found or no stock`,
        );
      }
      

      const user = await this.usersRepository.findOne({
        where: { id: userDeco.userId },
        select: {
          id: true,
          coins: true,
          firstName: true,
          role: true,
        },
        relations: { productsPurchased: true },
      });

      if (user.coins < product.price) {
        throw new BadRequestException('Insufficient jewels');
      }

      const updateProducts = [...user.productsPurchased, product];

      await this.usersRepository.save({
        ...user,
        coins: user.coins - product.price,
        productsPurchased: updateProducts.map((p) => ({ id: p.id })),
      });

      const userBuyer = [...product.buyer, user];

      await this.productsRepository.save({
        ...product,
        inStock: true,
        buyer: userBuyer.map((u) => ({ id: u.id })),
      });

      return { message: 'Product purchased successfully', product};
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
      const product = await this.productById(id);      

      Object.assign(product, body)
      this.productsRepository.save(product);

      return product;

    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async delete(id: number) {
    try {
      await this.productById(id);

      await this.productsRepository.softDelete(id);

      return { message: 'Product deleted' };
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, error.status);
    }
  }
}
