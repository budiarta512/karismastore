import { Module } from '@nestjs/common';
import { OrderController } from './controllers/order.controller';
import { OrderService } from './services/order.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Cart, CartSchema } from '../cart/models/cart.schema';
import { Product, ProductSchema } from '../product/models/product.schema';
import { Order, OrderSchema } from './models/order.schema';
import { User, UserSchema } from '../user/models/user.schema';
import { UserService } from '../user/services/user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cart.name, schema: CartSchema }]),
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [OrderService, UserService],
  controllers: [OrderController],
})
export class OrderModule {}
