import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

  async likeDislikeTweet(user: User, id: string) {
    const tweet = await this.tweetModel.findById(id);

    if (!tweet) {
      throw new NotFoundException('No tweet found');
    }

    //@ts-ignore
    if (!tweet.likes.includes(user.nickname)) {
      await tweet.updateOne({ $push: { likes: user.nickname } });
      return 'Post liked';
    }
    await tweet.updateOne({ $pull: { likes: user.nickname } });
    return 'Post disliked';
  }

  async deleteTweet(req: any, id: string) {
    const tweet = await this.tweetModel.findById(id);
    if (!tweet) {
      throw new NotFoundException('No document found with that ID');
    }

    if (req.user.nickname !== tweet.User) {
      throw new BadRequestException('You are not allowed to do that');
    }

    await this.tweetModel.deleteOne({ _id: tweet._id });

    return 'DELETED';
  }
}
