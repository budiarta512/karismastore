import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Cart } from 'src/modules/cart/models/cart.schema';

export type OrderDocument = HydratedDocument<Order>;

@Schema({ timestamps: true })
export class Order {
  @Prop({ type: mongoose.Types.ObjectId, ref: 'User' })
  user: string;
  @Prop({ type: [{ type: mongoose.Types.ObjectId, ref: 'Cart' }] })
  carts: Cart[];
}

export const OrderSchema = SchemaFactory.createForClass(Order);
