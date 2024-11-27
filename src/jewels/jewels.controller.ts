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
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { ResponseCreateJewelsDoc } from './docs/response-create-jewels.doc';
import { CreateJewelsDoc } from './docs/create-jewels.doc';
import { ResponseDistribuiteJewelsDoc } from './docs/response-distribuite-jewels.doc';
import { UpdateJewelsDoc } from './docs/update-jewels.doc';

@ApiBearerAuth()
@ApiTags('Jewels')
@UseGuards(AuthGuard, RolesGuard)
@Controller('jewels')
export class JewelsController {
  constructor(private readonly jewelsService: JewelsService) {}

  @ApiParam({type: Number, example: 2, name: 'userId'})
  @ApiParam({type: Number, example: 9, name: 'jewelId'})
  @ApiCreatedResponse({type: ResponseDistribuiteJewelsDoc})
  @ApiNotFoundResponse({example: 'User or Jewel not found or jewel is inactive'})
  @ApiForbiddenResponse({example: {message: "token not found"}})
  @Roles(RoleEnum.admin)
  @Post('assign/:userId/jewels/:jewelId')
  async distribuiteJewels(@Param('userId', ParseIntPipe) userId: number, @Param('jewelId', ParseIntPipe) jewelId: number){
    return await this.jewelsService.distribuiteJewels(userId, jewelId)
  }

  @ApiBody({type: CreateJewelsDoc})
  @ApiCreatedResponse({type: ResponseCreateJewelsDoc})
  @ApiForbiddenResponse({example: {message: "token not found"}})
  @ApiBadRequestResponse({example: 'This Jewels already exists.'})
  @Roles(RoleEnum.admin)
  @Post('create')
  async create(@Body() body: CreateJewelsDto) {
    return await this.jewelsService.create(body);
  }

  @ApiOkResponse({type: [ResponseCreateJewelsDoc]})
  @ApiForbiddenResponse({example: {message: "token not found"}})
  @Get()
  async findAll(){
    return await this.jewelsService.findAll()
  }

  @ApiParam({type: Number, example: 9, name: 'id'})
  @ApiCreatedResponse({type: ResponseCreateJewelsDoc})
  @ApiNotFoundResponse({example: `This product with id: 9 not found!`})
  @ApiForbiddenResponse({example: {message: "token not found"}})
  @Get(':id')
  async jewelById(@Param('id', ParseIntPipe) id: number) {
    return await this.jewelsService.jewelById(id);
  }

  @ApiParam({type: Number, example: 9, name: 'id'})
  @ApiBody({type: UpdateJewelsDoc})
  @ApiOkResponse({type:  ResponseCreateJewelsDoc})
  @ApiNotFoundResponse({example: `This product with id: 9 not found!`})
  @ApiForbiddenResponse({example: {message: "token not found"}})
  @Roles(RoleEnum.admin)
  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateJewelsDto){
    return await this.jewelsService.update(id, body)
  }

  
}
