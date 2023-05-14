import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SignupDto } from 'src/users/dtos/Signup.dto';
import { LoginDto } from 'src/users/dtos/Login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signup(userCredentails: SignupDto) {
    const { nickname, email, password, passwordConfirm } = userCredentails;

    // checking if the posted email AND nickname is valid
    const invalidEmail = await this.userModel.findOne({ email });
    const invalidNickname = await this.userModel.findOne({ nickname });
    if (invalidEmail || invalidNickname) throw new BadRequestException();

    // Checking the passwordConfirmation
    if (password !== passwordConfirm) {
      throw new BadRequestException('Passwords are not the same');
    }

    // hashing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    userCredentails.password = hashedPassword;
    userCredentails.passwordConfirm = undefined;

    // creating user
    const user = await this.userModel.create(userCredentails);

    // signing the jsonwebtoken
    const token = this.jwtService.sign({ id: user._id });

    // response
    return { token };
  }

  async login(userCredentails: LoginDto) {
    const { email, password } = userCredentails;

    // getting the user
    const user = await this.userModel.findOne({ email });
    if (!user) throw new NotFoundException();

    // comparing passwords
    const storedAndHashedPassword = user.password;
    const isMatch = await bcrypt.compare(password, storedAndHashedPassword);
    if (!isMatch) throw new BadRequestException();

    // signing the jsonwebtoken
    const token = this.jwtService.sign({ id: user._id });

    // response
    return { token };
  }
}
