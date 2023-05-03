import { IsNotEmpty } from 'class-validator';
import mongoose from 'mongoose';

export class CreateTweetDto {
  @IsNotEmpty()
  user: mongoose.Schema.Types.ObjectId;
}
