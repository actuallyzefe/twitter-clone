import {
  BadRequestException,
  Body,
  ForbiddenException,
  Injectable,
  NotFoundException,
  Request,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';
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

  async followUser(@Request() req: any, postedNickname: string) {
    const currentUser = req.user;

    if (currentUser !== postedNickname) {
      try {
        const user = await this.userModel.findOne({
          nickname: currentUser.nickname,
        });
        const otherUser = await this.userModel.findOne({
          nickname: postedNickname,
        });
        //@ts-ignore
        if (!otherUser.followers.includes(currentUser)) {
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
        return e;
      }
    }
  }
}
