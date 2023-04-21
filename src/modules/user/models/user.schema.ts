import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Order } from 'src/modules/order/models/order.schema';

export type UserDocument = HydratedDocument<User>;

export enum Role {
  Admin = 'admin',
  Customer = 'customer',
}

@Schema({ timestamps: true })
export class User {
  @Prop()
  name: string;
  @Prop({ unique: true })
  phone: string;
  @Prop()
  password: string;
  @Prop()
  role: Role;
}

export interface IAuthenticate {
  readonly user: User;
  readonly token: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
