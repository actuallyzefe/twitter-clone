import {
  Controller,
  Get,
  UseGuards,
  Request,
  Body,
  BadRequestException,
  Patch,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Serialize } from './interceptors/Serializeuser.interceptor';
import { User } from './user.schema';
import { AuthGuard } from '@nestjs/passport';
import { FollowLogicDto } from './dtos/FollowLogic.dto';

@Serialize(User)
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('me')
  @UseGuards(AuthGuard())
  findMe(@Request() req: any) {
    return req.user;
  }

  @UseGuards(AuthGuard())
  @Patch('followUser')
  followUser(@Request() req: any, @Body() userCredentials: FollowLogicDto) {
    const { postedNickname } = userCredentials;
    if (!postedNickname) {
      throw new BadRequestException('postedNickname is required');
    }
    return this.userService.followUser(req, postedNickname);
  }
  @UseGuards(AuthGuard())
  @Patch('unfollowUser')
  unfollowUser(@Request() req: any, @Body() userCredentails: FollowLogicDto) {
    const { postedNickname } = userCredentails;
    if (!postedNickname) {
      throw new BadRequestException('postedNickname is required');
    }
    return this.userService.unfollowUser(req, postedNickname);
  }
}
