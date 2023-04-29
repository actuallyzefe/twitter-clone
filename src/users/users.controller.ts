import {
  Controller,
  Get,
  UseGuards,
  Request,
  Post,
  Body,
  BadRequestException,
  Patch,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Serialize } from './interceptors/Serializeuser.interceptor';
import { User } from '../schemas/user.schema';
import { AuthGuard } from '@nestjs/passport';
import { SignupDto } from './dtos/Signup.dto';
import { FollowLogicDto } from './dtos/FollowLogic.dto';

@Serialize(User)
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Get('allUsers')
  @UseGuards(AuthGuard())
  findAll() {
    return this.userService.findAll();
  }

  @Get('me')
  @UseGuards(AuthGuard())
  findMe(@Request() req: any) {
    return req.user;
  }

  @UseGuards(AuthGuard())
  @Patch('followUser')
  followUser(@Request() req: any, @Body() body: FollowLogicDto) {
    const { postedNickname } = body;
    if (!postedNickname) {
      throw new BadRequestException('postedNickname is required');
    }
    return this.userService.followUser(req, postedNickname);
  }
  @UseGuards(AuthGuard())
  @Patch('unfollowUser')
  unfollowUser(@Request() req: any, @Body() body: FollowLogicDto) {
    const { postedNickname } = body;
    if (!postedNickname) {
      throw new BadRequestException('postedNickname is required');
    }
    return this.userService.unfollowUser(req, postedNickname);
  }
}
