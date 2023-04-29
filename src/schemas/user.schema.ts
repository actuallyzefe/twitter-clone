import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Exclude, Expose } from 'class-transformer';

export enum Roles {
  user = 'user',
  admin = 'admin',
}

@Schema({
  timestamps: true,
})
export class User {
  @Expose()
  @Prop()
  name: string;

  @Expose()
  @Prop({ unique: [true, 'This nickname is taken '] })
  nickname: string;

  @Expose()
  @Prop({ unique: [true, 'This email is taken'] })
  email: string;

  @Expose()
  @Prop({ default: 'user' })
  role: Roles;

  @Exclude()
  @Prop()
  password: string;

  @Exclude()
  @Prop()
  passwordConfirm: string;

  @Expose()
  @Prop({ default: 'default.jpg' })
  avatar: string;

  @Expose()
  @Prop({ default: '', max: 150 })
  bio: string;

  @Expose()
  @Prop({ ref: 'User', default: [] })
  followers: [];

  @Expose()
  @Prop({ ref: 'User', default: [] })
  followings: [];
}

export const UserSchema = SchemaFactory.createForClass(User);
