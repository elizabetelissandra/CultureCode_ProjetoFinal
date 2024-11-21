import { Module } from '@nestjs/common';
import { JewelsService } from './jewels.service';
import { JewelsController } from './jewels.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Jewels, User } from '../database/entities/index';


@Module({
  imports: [TypeOrmModule.forFeature([Jewels, User])],
  controllers: [JewelsController],
  providers: [JewelsService],
})
export class JewelsModule {}
