import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/schemas/user.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { PasswordService } from 'src/helpers/Password.service';
import { InvalidUserservice } from 'src/helpers/InvalidUser.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string | number>('JWT_EXPIRES'),
        },
      }),
      inject: [ConfigService],
    }),
    ConfigModule,
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  providers: [AuthService, PasswordService, InvalidUserservice, JwtStrategy],
  exports: [JwtStrategy, JwtModule, PassportModule],
  controllers: [AuthController],
})
export class AuthModule {}
