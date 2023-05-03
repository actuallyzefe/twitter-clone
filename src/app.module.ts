import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { UsersController } from './users/users.controller';
import { TweetModule } from './tweet/tweet.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.URI),
    UsersModule,
    AuthModule,
    TweetModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
