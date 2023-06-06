import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Roles } from '../user.schema';

export class SignupDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  nickname: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Please provide a valid email' })
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  passwordConfirm: string;

  @IsOptional()
  @IsString()
  bio?: string;

  role: Roles;

  @IsOptional()
  avatar?: string;

  followers: [];

  followings: [];
}
