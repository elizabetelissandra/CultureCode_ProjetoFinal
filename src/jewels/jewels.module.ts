import { Module } from '@nestjs/common';
import { JewelsService } from './jewels.service';
import { JewelsController } from './jewels.controller';

@Module({
  controllers: [JewelsController],
  providers: [JewelsService],
})
export class JewelsModule {}
