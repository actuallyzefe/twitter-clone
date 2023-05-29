import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  exports: [
    UsersService,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  imports: [
    JwtModule,
    AuthModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MulterModule.register({
      dest: '/img',
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
