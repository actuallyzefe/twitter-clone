import { Module } from '@nestjs/common';
import { TweetController } from './tweet.controller';
import { TweetService } from './tweet.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Tweet, TweetSchema } from '../schemas/tweet.schema';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Tweet', schema: TweetSchema }]),
    UsersModule,
    PassportModule,
    AuthModule,
  ],
  providers: [TweetService],
  controllers: [TweetController],
})
export class TweetModule {}
