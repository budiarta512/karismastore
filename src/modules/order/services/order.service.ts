import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cart } from 'src/modules/cart/models/cart.schema';
import { Order } from '../models/order.schema';
import { CreateOrderDto } from '../dtos/create-order.dto';
import { UpdateOrderDto } from '../dtos/update-order.dto';
import { User } from 'src/modules/user/models/user.schema';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Cart.name) private cartModel: Model<Cart>,
    @InjectModel(Order.name) private orderModel: Model<Order>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async getAll(): Promise<Order[]> {
    try {
      const data = await this.orderModel.find().populate('carts').exec();
      return data;
    } catch (error) {
      throw new InternalServerErrorException().getResponse();
    }
  }

  async getById(id: string): Promise<Order> {
    try {
      const data = await this.orderModel.findById(id).populate('carts').exec();
      return data;
    } catch (error) {
      throw new InternalServerErrorException().getResponse();
    }
  }

  async create(request: CreateOrderDto): Promise<Order> {
    try {
      // const user = await this.userModel.findById(request.user).exec();
      const order = new this.orderModel(request).save();
      // user.orders.push(await order), user.save();
      return order;
    } catch (error) {
      throw new InternalServerErrorException(error).getResponse();
    }
  }

  async update(request: UpdateOrderDto, id: string): Promise<Order> {
    try {
      const updateOrder = await this.orderModel
        .findByIdAndUpdate(id, request)
        .exec();
      return updateOrder;
    } catch (error) {
      throw new InternalServerErrorException(error).getResponse();
    }
  }

  async delete(id: string): Promise<Order> {
    try {
      const deleteOrder = await this.orderModel.findByIdAndDelete(id).exec();
      return deleteOrder;
    } catch (error) {
      throw new InternalServerErrorException(error).getResponse();
    }
  }
}
