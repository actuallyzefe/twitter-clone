import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { TweetService } from './tweet.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateTweetDto } from './dtos/Create-tweet.dto';

@UseGuards(AuthGuard())
@Controller('tweet')
export class TweetController {
  constructor(private tweetService: TweetService) {}

  @Post('post')
  postTweet(@Body() body: CreateTweetDto, @Request() req: any) {
    const id = req.user._id;
    return this.tweetService.createTweet(body, id);
  }

  @Get('tweets')
  getAllTweets() {
    return this.tweetService.getAllTweets();
  }

  @Patch('likedislike/:id')
  likeDiskikeTweet(@Request() req: any, @Param('id') id: string) {
    const user = req.user;
    return this.tweetService.likeDislikeTweet(user, id);
  }

  @Delete('delete/:id')
  deleteTweet(@Param('id') id: string) {
    return this.tweetService.deleteTweet(id);
  }
}
