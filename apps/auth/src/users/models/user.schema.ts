import { AbstractSchema } from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false })
export class UserDocument extends AbstractSchema {
  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  timestamps: Date;
}

export const userSchema = SchemaFactory.createForClass(UserDocument);
