import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Jewels, User } from '../database/entities/index';
import { Repository } from 'typeorm';
import { CreateJewelsDto } from './dtos/create-jewels.dto';
import { UpdateJewelsDto } from './dtos/update-jewels.dto';

@Injectable()
export class JewelsService {
  constructor(
    @InjectRepository(Jewels)
    private jewelsRepository: Repository<Jewels>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(body: CreateJewelsDto) {
    try {
      if (await this.findJewel(body.name)) {
        throw new BadRequestException('This Jewels already exists.');
      }

      const newJewel = this.jewelsRepository.create(body);

      await this.jewelsRepository.save(newJewel);

      return newJewel;
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async distribuiteJewels(userId: number, jewelId: number) {
    try {
      const user = await this.usersRepository.findOne({
        where: { id: userId },
        select: { id: true, firstName: true, role: true, email: true, coins: true },
        relations: { jewels: true },
      });

      const jewel = await this.jewelsRepository.findOne({
        where: { id: jewelId },
        select: {
          id: true,
          price: true,
          active: true,
          name: true,
          description: true,
          transactionType: true,
        },
      });

      if (!user || !jewel || !jewel.active) {
        throw new NotFoundException(
          'User or Jewel not found or jewel is inactive',
        );
      }

      const userUpdate = [...user.jewels, jewel];

      await this.usersRepository.save({
        ...user,
        coins: user.coins + jewel.price,
        jewels: userUpdate.map(j => ({ id: j.id })),
      });

      await this.jewelsRepository.save({
        ...jewel,
        active: false,
        user: { id: user.id },
      });

      return jewel;
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async jewelById(id: number) {
    try {
      const jewel = await this.jewelsRepository.findOne({ where: { id } });

      if (!jewel) {
        throw new NotFoundException(`This jewels with id: ${id} not found!`);
      }

      return jewel;
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async findAll() {
    try {
      return await this.jewelsRepository.find();
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async findJewel(name: string) {
    try {
      return await this.jewelsRepository.findOne({ where: { name } });
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async update(id: number, body: UpdateJewelsDto) {
    try {
      const jewel =  await this.jewelById(id);

      Object.assign(jewel, body)

      await this.jewelsRepository.save(jewel)

      return jewel
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, error.status);
    }
  }
}
