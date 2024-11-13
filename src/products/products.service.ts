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
import { UserDecoratorDTO } from 'src/user/dtos/userDecorator.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    @InjectRepository(User)
    private usersRepository: Repository<User>
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

  async reward(id: number, userDeco: UserDecoratorDTO){
    try {
      const product = await this.productsRepository.findOne({where: {id}, select: {price: true, inStock: true, name: true, id: true}})

      const user = await this.usersRepository.findOne({where: {id: userDeco.userId}, select: {id: true, coins: true, productsPurchased: true}}) 

      if(!product || !product.inStock){
        throw new NotFoundException(`This product with id: ${id} not found or no stock`)
      }

      if(user.coins < product.price){
        throw new BadRequestException('Insufficient jewels')
      }

      user.coins -= product.price
      product.buyer = user
    
      await this.usersRepository.save(user)
      await this.productsRepository.save(product)

      return {message: 'Product purchased successfully', product}

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
