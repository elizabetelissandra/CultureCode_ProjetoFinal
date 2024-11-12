import {
  BadRequestException,
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../database/entities';
import { Repository } from 'typeorm';
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
      console.log('LOGIN');
      const user = await this.findOne(body.email);
      console.log(user);
      if (!user || !(await bcrypt.compare(body.password, user.password))) {
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
        select: {id: true, email: true, password: true, role: true },
      });
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, error.status);
    }
  }
}
