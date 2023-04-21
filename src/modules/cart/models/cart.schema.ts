import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';

export type CartDocument = HydratedDocument<Cart>;

@Schema({ timestamps: true })
export class Cart {
  @Prop({ type: mongoose.Types.ObjectId, ref: 'Product' })
  product: string;
  @Prop({ type: mongoose.Types.ObjectId, ref: 'Order' })
  order: string;
  @Prop()
  qty: number;
  @Prop({ required: true })
  price: number;
  @Prop()
  additional_price: number;
  @Prop({ required: true })
  total: number;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
