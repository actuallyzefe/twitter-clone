import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  Request,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model } from 'mongoose';
import { SignupDto } from './dtos/Signup.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(body: SignupDto) {
    const newUser = await this.userModel.create(body);
    return newUser.save();
  }

  async findAll() {
    return await this.userModel.find();
  }

  async find(email: string) {
    const user = await this.userModel.find({ where: { email } });
    if (!user) throw new NotFoundException('NO USER FOUND');
    return user;
  }

  async findOne(id: number) {
    if (!id) {
      return null;
    }
    await this.userModel.findOne({ id });
  }

  // NEED REFACTORING // follow and unfollow methods kinda similar. We can refactor them later
  async followUser(@Request() req: any, postedNickname: string) {
    const currentUser = req.user;

    if (currentUser.nickname === postedNickname) {
      throw new BadRequestException('You cannot follow yourself');
    } else {
      try {
        const user = await this.userModel.findOne({
          nickname: currentUser.nickname,
        });
        const otherUser = await this.userModel.findOne({
          nickname: postedNickname,
        });

        if (!otherUser) {
          throw new NotFoundException('User not found');
        }

        //@ts-ignore
        if (!otherUser.followers.includes(currentUser.nickname)) {
          await user.updateOne({
            $push: { followings: postedNickname },
          });

          await otherUser.updateOne({
            $push: { followers: currentUser.nickname },
          });
          return `${otherUser.nickname} followed`;
        } else {
          throw new BadRequestException('You are already following this user');
        }
      } catch (e) {
        console.log(e);

        if (e instanceof NotFoundException) {
          throw new NotFoundException(e.message);
        } else if (e instanceof BadRequestException) {
          throw new BadRequestException(e.message);
        } else {
          throw new InternalServerErrorException(e.message);
        }
      }
    }
  }

  // NEED REFACTORING // follow and unfollow methods kinda similar. We can refactor them later
  async unfollowUser(@Request() req: any, postedNickname: string) {
    const currentUser = req.user;

    if (currentUser.nickname === postedNickname) {
      throw new BadRequestException('You cannot unfollow yourself');
    } else {
      try {
        const user = await this.userModel.findOne({
          nickname: currentUser.nickname,
        });
        const otherUser = await this.userModel.findOne({
          nickname: postedNickname,
        });

        if (!otherUser) {
          throw new NotFoundException('User not found');
        }

        //@ts-ignore
        if (otherUser.followers.includes(currentUser.nickname)) {
          await user.updateOne({
            $pull: { followings: postedNickname },
          });

          await otherUser.updateOne({
            $pull: { followers: currentUser.nickname },
          });
          return `${otherUser.nickname} unfollowed`;
        } else {
          throw new BadRequestException('You can not unfollow this user');
        }
      } catch (e) {
        console.log(e);

        if (e instanceof NotFoundException) {
          throw new NotFoundException(e.message);
        } else if (e instanceof BadRequestException) {
          throw new BadRequestException(e.message);
        } else {
          throw new InternalServerErrorException(e.message);
        }
      }
    }
  }
}
