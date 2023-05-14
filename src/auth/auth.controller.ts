import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from 'src/users/dtos/Signup.dto';
import { LoginDto } from 'src/users/dtos/Login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('signup')
  signup(@Body() usercredentails: SignupDto) {
    return this.authService.signup(usercredentails);
  }
  @Get('login')
  login(@Body() userCredentails: LoginDto) {
    return this.authService.login(userCredentails);
  }
}
