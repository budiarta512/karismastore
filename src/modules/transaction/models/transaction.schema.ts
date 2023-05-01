import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type TransactionDocument = HydratedDocument<Transaction>;

@Schema({ timestamps: true })
export class Transaction {
  @Prop({ unique: true, required: true })
  invoice_no: string;
  @Prop({ required: true })
  carts: [
    {
      _id: mongoose.Types.ObjectId;
      product: string;
      price: number;
      total: number;
      qty: number;
      additional_price: number | null;
    },
  ];
  @Prop({ required: true, type: mongoose.Types.ObjectId, ref: 'User' })
  customer: string;
  @Prop({ required: true })
  grand_total: number;
  @Prop({ required: true })
  status: 'MENUNGGU' | 'SUKSES' | 'TIDAK VALID';
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
