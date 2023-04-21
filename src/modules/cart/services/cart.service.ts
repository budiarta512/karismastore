import {
  Injectable,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cart } from '../models/cart.schema';
import { Model } from 'mongoose';
import { CreateCartDto } from '../dtos/create-cart.dto';
import { Order } from 'src/modules/order/models/order.schema';
import { UpdateCartDto } from '../dtos/update-cart.dto';
import { Product } from 'src/modules/product/models/product.schema';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name) private cartModel: Model<Cart>,
    @InjectModel(Order.name) private orderModel: Model<Order>,
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async getAll(): Promise<Cart[]> {
    try {
      const data = await this.cartModel.find().populate('product').exec();
      return data;
    } catch (error) {
      throw new InternalServerErrorException().getResponse();
    }
  }

  async getById(id: string): Promise<Cart> {
    try {
      const data = await this.cartModel.findById(id).populate('product').exec();
      return data;
    } catch (error) {
      throw new InternalServerErrorException().getResponse();
    }
  }

  async create(request: CreateCartDto): Promise<Cart> {
    try {
      // check double product
      const product = await this.productModel.findById(request.product).exec();
      if (product) {
        throw new BadRequestException('Product already in cart').getResponse();
      }

      const order = await this.orderModel.findById(request.order).exec();
      const cart = new this.cartModel(request).save();
      order.carts.push(await cart), order.save();
      return cart;
    } catch (error) {
      throw new InternalServerErrorException(error).getResponse();
    }
  }

  async update(request: UpdateCartDto, id: string): Promise<Cart> {
    try {
      const updateCart = await this.cartModel
        .findByIdAndUpdate(id, request)
        .exec();
      return updateCart;
    } catch (error) {
      throw new InternalServerErrorException(error).getResponse();
    }
  }

  async delete(id: string): Promise<Cart> {
    try {
      const deleteCart = await this.cartModel.findByIdAndDelete(id).exec();
      return deleteCart;
    } catch (error) {
      throw new InternalServerErrorException(error).getResponse();
    }
  }
}
