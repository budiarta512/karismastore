import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as Sch } from 'mongoose';
import { Product } from 'src/modules/product/models/product.schema';

export type SupplierDocument = HydratedDocument<Supplier>;

@Schema({ timestamps: true })
export class Supplier {
  @Prop()
  name: string;
  @Prop({ unique: true })
  phone: string;
  @Prop()
  address: string;
  @Prop({ type: [{ type: Sch.Types.ObjectId, ref: 'Product' }] })
  products: Product[];
}

export const SupplierSchema = SchemaFactory.createForClass(Supplier);
