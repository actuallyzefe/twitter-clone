import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tweet } from 'src/schemas/tweet.schema';
import { User } from 'src/schemas/user.schema';
import { CreateTweetDto } from './dtos/Create-tweet.dto';
@Injectable()
export class TweetService {
  constructor(
    @InjectModel(Tweet.name) private tweetModel: Model<Tweet>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async createTweet(body: CreateTweetDto, userId: string) {
    const user = await this.userModel.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    const tweet = new this.tweetModel({
      ...body,
      User: user.nickname,
    });

    await tweet.save();

    return { tweet };
  }

  async getAllTweets() {
    return this.tweetModel.find();
  }
}
