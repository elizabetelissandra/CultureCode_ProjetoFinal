import {
  BadRequestException,
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product, User } from '../database/entities';
import { ILike, Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dtos/register.dto';
import { UserService } from '../user/user.service';
import { LoginDto } from './dtos/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private userService: UserService,
    private jwtService: JwtService,
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async register(body: RegisterDto) {
    try {
      console.log('REGISTER');
      if (await this.userService.findByEmail(body.email)) {
        throw new BadRequestException('user already exists');
      }

      const newUser = this.usersRepository.create(body);

      await this.usersRepository.save(newUser);

      return newUser;
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async login(body: LoginDto) {
    try {
      const user = await this.findOne(
      body.email);

        console.log('user:', user )
        console.log('user password:', user.password)
        console.log('body password:', body.password)

      const isPasswordValid = await bcrypt.compare(
        body.password,
        user.password,
      );

      console.log('Usuário encontrado:', user);
      console.log('Validação de senha:', isPasswordValid);

      if (!user || !isPasswordValid) {
        throw new UnauthorizedException('invalid credentials');
      }

      const tokenPayload = {
        userId: user.id,
        userEmail: user.email,
        userRole: user.role,
        iss: 'Culture Code User',
        aud: 'users from Culture Code',
      };

      return { access_token: await this.jwtService.signAsync(tokenPayload) };
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async findOne(email: string) {
    try {
      return await this.usersRepository.findOne({
        where: { email },
        select: { id: true, email: true, password: true, role: true },
      });
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async findAllProducts(
    page: number,
    limit: number,
    price?: number,
    name?: string,
  ) {
    try {
      if (!page || !limit) {
        throw new BadRequestException('required page and limit');
      }
      const pageOptions = { skip: (page - 1) * limit, take: limit };

      const products = price
        ? await this.productsRepository.find({
            where: { price },
            ...pageOptions,
          })
        : name
          ? await this.productsRepository.find({
              where: { name: ILike(`%${name}%`) },
              ...pageOptions,
            })
          : price && name
            ? await this.productsRepository.find({
                where: { price, name },
                ...pageOptions,
              })
            : await this.productsRepository.find({ ...pageOptions });

      return {
        page,
        limit,
        total: products.length,
        data: products,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, error.status);
    }
  }
}
