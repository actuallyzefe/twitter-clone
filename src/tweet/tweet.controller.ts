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
import { CreateTweetDto } from './dtos/Create-tweet.dto';

@Controller('tweet')
export class TweetController {
  constructor(private tweetService: TweetService) {}

  @UseGuards(AuthGuard())
  @Post('post')
  postTweet(@Body() body: CreateTweetDto, @Request() req: any) {
    const id = req.user._id;
    return this.tweetService.createTweet(body, id);
  }

  @Get('tweets')
  getAllTweets() {
    return this.tweetService.getAllTweets();
  }
}
