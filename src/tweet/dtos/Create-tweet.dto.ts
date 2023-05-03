import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateTweetDto {
  @IsNotEmpty()
  @MaxLength(150)
  tweet: string;
}
