import { BadRequestException } from '@nestjs/common';
import { User } from '../schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

export class InvalidUserservice {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async isUserValid(email: string, nickname: string) {
    const invalidEmail = await this.userModel.findOne({ email });
    const invalidNickname = await this.userModel.findOne({ nickname });

    if (invalidEmail) {
      throw new BadRequestException('EMAIL IN USE');
    } else if (invalidNickname) {
      throw new BadRequestException('NICKNAME IN USE');
    }

    return 1;
  }
}
