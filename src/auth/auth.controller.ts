import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from 'src/users/dtos/Signup.dto';
import { LoginDto } from 'src/users/dtos/Login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('signup')
  signup(@Body() body: SignupDto) {
    return this.authService.signup(body);
  }
  @Get('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
