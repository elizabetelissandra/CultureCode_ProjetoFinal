import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: RegisterDto){
    return await this.authService.register(body)
  }

  @Post('login')
  async login(@Body() body: LoginDto){
    return await this.authService.login(body)
  }
}
