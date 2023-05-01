import { Module } from '@nestjs/common';
import { SupplierService } from './services/supplier.service';
import { SupplierController } from './controllers/supplier.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Supplier, SupplierSchema } from './models/supplier.schema';
import { Product, ProductSchema } from '../product/models/product.schema';
import { User, UserSchema } from '../user/models/user.schema';
import { Order, OrderSchema } from '../order/models/order.schema';
import { UserService } from '../user/services/user.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Supplier.name, schema: SupplierSchema },
    ]),
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
  ],
  providers: [SupplierService, UserService],
  controllers: [SupplierController],
})
export class SupplierModule {}
