import { BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { SignupDto } from 'src/users/dtos/Signup.dto';

export class PasswordHelper {
  constructor() {}

  checkPassword(password: string, passwordConfirm: string) {
    if (password !== passwordConfirm) {
      throw new BadRequestException('Passwords are not the same');
    }
  }

  async hashPassword(body: SignupDto) {
    const { password } = body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    body.password = hashedPassword;
    body.passwordConfirm = undefined;
  }

  async comparePasswords(password: string, storedAndHashedPassword: string) {
    const isMatch = await bcrypt.compare(password, storedAndHashedPassword);
    if (!isMatch) throw new BadRequestException('bad password');
  }
}
