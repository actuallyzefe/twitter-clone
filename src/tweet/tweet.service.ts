import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tweet } from 'src/tweet/tweet.schema';
import { User } from 'src/users/user.schema';
import { CreateTweetDto } from './dtos/Create-tweet.dto';

@Injectable()
export class TweetService {
  constructor(@InjectModel(Tweet.name) private tweetModel: Model<Tweet>) {}

  async createTweet(body: CreateTweetDto, user: User) {
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
      throw new NotFoundException();
    }

    // @ts-ignore
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
      throw new NotFoundException();
    }

    if (req.user.nickname !== tweet.User) {
      throw new UnauthorizedException();
    }

    await this.tweetModel.deleteOne({ _id: tweet._id });

    return 'DELETED';
  }
}
