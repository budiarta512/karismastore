import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './models/product.schema';
import { ProductController } from './controllers/product.controller';
import { Supplier, SupplierSchema } from '../supplier/models/supplier.schema';
import { ProductService } from './services/product.service';
import { User, UserSchema } from '../user/models/user.schema';
import { Order, OrderSchema } from '../order/models/order.schema';
import { UserService } from '../user/services/user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    MongooseModule.forFeature([
      { name: Supplier.name, schema: SupplierSchema },
    ]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
  ],
  providers: [ProductService, UserService],
  controllers: [ProductController],
})
export class ProductModule {}
