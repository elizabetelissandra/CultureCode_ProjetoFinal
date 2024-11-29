import {
  HttpException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../database/entities/';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dtos/updateUser.dto';
import { UserDecoratorDTO } from './dtos/userDecorator.dto';
import { RoleEnum } from '../enum/role.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findByEmail(email: string) {
    try {
      return this.usersRepository.findOne({
        where: { email },
        select: { password: true, email: true, id: true, role: true },
      });
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async findById(id: number) {
    try {
      const user = await this.usersRepository.findOne({ where: { id } });

      if (!user) {
        throw new NotFoundException(`This user with id: ${id} not found!`);
      }

      return user;
    } catch (error) {
      console.error(error);

      throw new HttpException(error.message, error.status);
    }
  }

  async findAll() {
    try {
      return await this.usersRepository.find();
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async userById(id: number) {
    try {
      await this.findById(id);

      return await this.usersRepository.findOne({
        where: { id },
        select: { id: true, firstName: true, lastName: true, coins: true },
        relations: { jewels: true, productsPurchased: true },
      });
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async profile(user: UserDecoratorDTO) {
    try {
      return await this.usersRepository.findOne({
        where: { id: user.userId },
        relations: { productsPurchased: true, jewels: true },
      });
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async update(id: number, body: UpdateUserDto, user: UserDecoratorDTO) {
    try {
      const userUpdate =  await this.userById(id)

      if (user.userRole !== RoleEnum.admin && user.userId !== Number(id)) {
        throw new UnauthorizedException(
          'You dont have permitions to update other users.',
        );
      }

      Object.assign(userUpdate, body);
      this.usersRepository.save(userUpdate);

      return await this.findById(id)
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async delete(id: number, user: UserDecoratorDTO) {
    try {
      await this.usersRepository.findOne({where: {id}, select: {id: true}});

      if (user.userRole !== RoleEnum.admin && user.userId !== id) {
        throw new UnauthorizedException(
          'You do not have permission to delete other users.',
        );
      }

      await this.usersRepository.softDelete(id);

      return { message: 'ok' };
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, error.status);
    }
  }
}
