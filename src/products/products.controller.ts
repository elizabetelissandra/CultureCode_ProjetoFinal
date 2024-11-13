import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProdutsDto } from './dtos/create-products.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/decorator/role.decorator';
import { RoleEnum } from 'src/enum/role.enum';
import { UpdateProductsDto } from './dtos/update-products.dto';

@UseGuards(AuthGuard, RolesGuard)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Roles(RoleEnum.admin)
  @Post('create')
  async create(@Body() body: CreateProdutsDto){
    return await this.productsService.create(body)
  }

  @Get(':id')
  async productById(@Param('id', ParseIntPipe) id:number){
    return await this.productsService.productById(id)
  }
  
  @Roles(RoleEnum.admin)
  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateProductsDto){
    return await this.productsService.update(id, body)
  }

  @Roles(RoleEnum.admin)
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number){
    return await this.productsService.delete(id)
  }
}
