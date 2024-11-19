import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product, User } from 'src/database/entities';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from './jwt.config';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    JwtModule.registerAsync({ ...jwtConfig, global: true }),
    TypeOrmModule.forFeature([User, Product]),
    UserModule
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
