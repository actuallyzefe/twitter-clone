import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/schemas/user.schema';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SignupDto } from 'src/users/dtos/Signup.dto';
import { LoginDto } from 'src/users/dtos/Login.dto';
import { PasswordService } from 'src/helpers/Password.service';
import { InvalidUserservice } from 'src/helpers/InvalidUser.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
    private passwordService: PasswordService,
    private invalidUserservice: InvalidUserservice,
  ) {}

  async signup(body: SignupDto) {
    const { nickname, email, password, passwordConfirm } = body;

    // checking if the posted email is valid
    await this.invalidUserservice.isUserValid(email, nickname);

    // Checking the passwordConfirmation
    this.passwordService.checkPassword(password, passwordConfirm);

    // hashing
    await this.passwordService.hashPassword(body);

    // creating user
    const user = await this.userModel.create(body);

    // signing the jsonwebtoken
    const token = this.jwtService.sign({ id: user._id });

    // response
    return { token };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // getting the user
    const user = await this.userModel.findOne({ email });
    if (!user) throw new NotFoundException('No user found');

    const storedHash = user.password;

    // comparing passwords
    await this.passwordService.comparePasswords(password, storedHash);

    // signing the jsonwebtoken
    const token = this.jwtService.sign({ id: user._id });

    // response
    return { token };
  }
}
