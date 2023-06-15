import { Module } from '@nestjs/common';
import { TweetController } from './tweet.controller';
import { TweetService } from './tweet.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TweetSchema } from './tweet.schema';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Tweet', schema: TweetSchema }]),
    PassportModule,
    AuthModule,
  ],
  providers: [TweetService],
  controllers: [TweetController],
})
export class TweetModule {}
// aws s3 is coming soon
