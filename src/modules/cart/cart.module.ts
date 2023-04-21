import { Module } from '@nestjs/common';
import { CartController } from './controller/cart.controller';
import { CartService } from './services/cart.service';
import { Cart, CartSchema } from './models/cart.schema';
import { Product, ProductSchema } from '../product/models/product.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from '../order/models/order.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cart.name, schema: CartSchema }]),
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
  ],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
