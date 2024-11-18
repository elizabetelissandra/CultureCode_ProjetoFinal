import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { RegisterDoc } from './docs/register.doc';
import { UserDoc } from './docs/response-register.doc';
import { TokenDoc } from './docs/token.doc';
import { LoginDoc } from './docs/login.doc';



@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({type: RegisterDoc})
  @ApiCreatedResponse({type: UserDoc})
  @ApiBadRequestResponse({example: 'user already exists'})
  @Post('register')
  async register(@Body() body: RegisterDto){
    return await this.authService.register(body)
  }

  @ApiBody({type: LoginDoc})
  @ApiCreatedResponse({type: TokenDoc})
  @ApiUnauthorizedResponse({example: 'invalid credentials'})
  @Post('login')
  async login(@Body() body: LoginDto){
    return await this.authService.login(body)
  }
}
