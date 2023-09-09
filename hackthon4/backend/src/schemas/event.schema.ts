import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from './user.schema';
import mongoose from 'mongoose';

@Schema()
export class Eventt {
  @Prop()
  title: string;
  @Prop({
    type: {
      path: String,
      imageId: String,
    },
  })
  thumbnail: {
    path: string;
    imageId: string;
  };
  @Prop()
  description: string;
  @Prop()
  date: string;
  @Prop()
  time: string;
  @Prop()
  location: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
  //   @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  //   category: Category;
}

export const EventtSchema = SchemaFactory.createForClass(Eventt);
