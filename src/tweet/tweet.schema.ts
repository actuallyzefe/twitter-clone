import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Tweet {
  @Prop()
  tweet: string;

  @Prop({ default: [] })
  likes: string[];

  @Prop({ default: Date.now() })
  createdAt: Date;

  @Prop({
    ref: 'User',
  })
  User: string;
}

export const TweetSchema = SchemaFactory.createForClass(Tweet);

TweetSchema.set('toObject', { virtuals: true });
TweetSchema.set('toJSON', { virtuals: true });
