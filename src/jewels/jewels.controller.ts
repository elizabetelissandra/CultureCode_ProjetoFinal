import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JewelsService } from './jewels.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/role.guard';
import { CreateJewelsDto } from './dtos/create-jewels.dto';
import { Roles } from '../auth/decorator/role.decorator';
import { RoleEnum } from '../enum/role.enum';
import { UpdateJewelsDto } from './dtos/update-jewels.dto';

@UseGuards(AuthGuard, RolesGuard)
@Controller('jewels')
export class JewelsController {
  constructor(private readonly jewelsService: JewelsService) {}

  @Roles(RoleEnum.admin)
  @Post('assign/:userId/jewels/:jewelId')
  async distribuiteJewels(@Param('userId', ParseIntPipe) userId: number, @Param('jewelId', ParseIntPipe) jewelId: number){
    return await this.jewelsService.distribuiteJewels(userId, jewelId)
  }

  @Roles(RoleEnum.admin)
  @Post('create')
  async create(@Body() body: CreateJewelsDto) {
    return await this.jewelsService.create(body);
  }

 

  @Get()
  async findAll(){
    return await this.jewelsService.findAll()
  }

  @Get(':id')
  async jewelById(@Param('id', ParseIntPipe) id: number) {
    return await this.jewelsService.jewelById(id);
  }

  @Roles(RoleEnum.admin)
  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateJewelsDto){
    return await this.jewelsService.update(id, body)
  }

  
}
