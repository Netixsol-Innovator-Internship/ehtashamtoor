import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class User extends Document {
  @Prop()
  username: string;
  @Prop({ unique: [true, 'User with this email is already here'] })
  email: string;
  @Prop()
  password: string;
  @Prop({
    type: {
      path: String,
      imageId: String,
    },
  })
  profilePicture: {
    path: string;
    imageId: string;
  };
  @Prop({ enum: ['blocked', 'unblocked'], default: 'unblocked' })
  status: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
