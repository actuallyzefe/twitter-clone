import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { TweetService } from './tweet.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('tweet')
export class TweetController {
  constructor(private tweetService: TweetService) {}

  @UseGuards(AuthGuard())
  @Post('post')
  postTweet(@Body() body: any, @Request() req: any) {
    const id = req.user._id;
    return this.tweetService.createTweet(body, id);
  }

  @Get('tweets')
  getAllTweets() {
    return this.tweetService.getAllTweets();
  }
}
