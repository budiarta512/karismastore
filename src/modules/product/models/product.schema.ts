import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import { HydratedDocument, Schema as Sc } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true })
  name: string;
  @Transform(({ value }) => value.toString())
  @Prop({ type: Sc.Types.ObjectId, ref: 'Supplier', required: true })
  supplier: string;
  @Prop({ required: true })
  price: number;
  @Prop()
  image: string;
  @Prop({ required: true })
  qty: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
