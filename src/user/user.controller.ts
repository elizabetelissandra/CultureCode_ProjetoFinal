import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dtos/updateUser.dto';
import { UserDecorator } from 'src/auth/decorator/user.decorator';
import { UserDecoratorDTO } from './dtos/userDecorator.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/role.guard';
import { RoleEnum } from 'src/enum/role.enum';
import { Roles } from 'src/auth/decorator/role.decorator';


@UseGuards(AuthGuard, RolesGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}


  @Get('profile')
  async profile(@UserDecorator() user: UserDecoratorDTO){
    return await this.userService.profile(user)
  }

  @Roles(RoleEnum.admin)
  @Get()
  async findAll(){
    return await this.userService.findAll()
  }

  @Roles(RoleEnum.admin)
  @Get(':id')
  async userById(@Param('id', ParseIntPipe) id: number){
    return await this.userService.userById(id)
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateUserDto, @UserDecorator() user: UserDecoratorDTO){
    return await this.userService.update(id, body, user)
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id:number, @UserDecorator() user: UserDecoratorDTO){
    return await this.userService.delete(id, user)
  }
}
