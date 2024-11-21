import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Patch, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dtos/updateUser.dto';
import { UserDecorator } from '../auth/decorator/user.decorator';
import { UserDecoratorDTO } from './dtos/userDecorator.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/role.guard';
import { RoleEnum } from '../enum/role.enum';
import { Roles } from '../auth/decorator/role.decorator';
import { ApiAcceptedResponse, ApiBearerAuth, ApiBody, ApiForbiddenResponse, ApiOkResponse, ApiParam, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { UserRelationsDoc } from './docs/user-relations.doc';
import { ResponseUserDoc } from './docs/response-user.doc';
import { UpdateUserDoc } from './docs/update-user.doc';


@ApiBearerAuth()
@ApiTags('User')
@UseGuards(AuthGuard, RolesGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiForbiddenResponse({example: {message: "token not found"}})
  @ApiOkResponse({type: UserRelationsDoc})
  @Get('profile')
  async profile(@UserDecorator() user: UserDecoratorDTO){
    return await this.userService.profile(user)
  }

  @ApiOkResponse({type: [ResponseUserDoc]})
  @ApiForbiddenResponse({example: {message: "token not found"}})
  @Roles(RoleEnum.admin)
  @Get()
  async findAll(){
    return await this.userService.findAll()
  }

  @ApiParam({type: Number, example: 4, name: 'id'})
  @ApiForbiddenResponse({example: {message: "token not found"}})
  @ApiOkResponse({type: ResponseUserDoc})
  @Roles(RoleEnum.admin)
  @Get(':id')
  async userById(@Param('id', ParseIntPipe) id: number){
    return await this.userService.userById(id)
  }

  @ApiParam({type: Number, example: 4, name: 'id'})
  @ApiBody({type: UpdateUserDoc})
  @ApiForbiddenResponse({example: {message: "token not found"}})
  @ApiUnauthorizedResponse({example: 'You dont have permitions to update other users.'})
  @ApiOkResponse({type: ResponseUserDoc})
  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateUserDto, @UserDecorator() user: UserDecoratorDTO){
    return await this.userService.update(id, body, user)
  }

  
  @ApiParam({type: Number, example: 4, name: 'id'})
  @ApiForbiddenResponse({example: {message: "token not found"}})
  @ApiUnauthorizedResponse({example: 'You dont have permitions to update other users.'})
  @ApiOkResponse({example: {message: 'ok'}})
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id:number, @UserDecorator() user: UserDecoratorDTO){
    return await this.userService.delete(id, user)
  }
}
