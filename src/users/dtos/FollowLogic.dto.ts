import { IsNotEmpty, IsString } from 'class-validator';

export class FollowLogicDto {
  @IsNotEmpty()
  @IsString()
  postedNickname: string;
}
