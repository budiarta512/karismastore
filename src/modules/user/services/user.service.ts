import { Model } from 'mongoose';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from '../dtos/create-user.request';
import { User } from '../models/user.schema';
import { LoginUserDto } from '../dtos/login-user.dto';
import * as bcrypt from 'bcrypt';
import { Order } from 'src/modules/order/models/order.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Order.name) private orderModel: Model<Order>,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<User> {
    try {
      // validate phone number
      const checkPhone = await this.userModel
        .findOne({ phone: createUserDto.phone })
        .exec();
      if (checkPhone) {
        throw new BadRequestException('Phone already used');
      }
      // hashing password
      const saltOrRounds = 10;
      const hash = await bcrypt.hash(createUserDto.password, saltOrRounds);
      createUserDto.password = hash;
      // create user
      const createdUser = new this.userModel(createUserDto).save();
      // create order
      const order = new this.orderModel({
        user: (await createdUser)._id,
      });
      order.save();
      // return createUser;
      return createdUser;
    } catch (error) {
      throw new InternalServerErrorException(error).getResponse();
    }
  }

  async login(user: LoginUserDto): Promise<User> {
    try {
      // find user by phone
      const loginUser = await this.userModel
        .findOne({ phone: user.phone })
        .exec();
      // check password
      const isMatch = await bcrypt.compare(user.password, loginUser.password);
      // validate user
      if (loginUser && isMatch) {
        return loginUser;
      }
      throw new BadRequestException('Phone or password is wrong').getResponse();
    } catch (error) {
      throw new InternalServerErrorException(error).getResponse();
    }
  }

  async verify(phone: string): Promise<User> {
    try {
      // find user by phone
      const loginUser = await this.userModel
        .findOne({ phone: phone }, 'name phone role')
        .exec();
      return loginUser;
    } catch (error) {
      throw new InternalServerErrorException(error).getResponse();
    }
  }

  async getAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async delete(id: string): Promise<User> {
    return await this.userModel.findById(id).deleteOne();
  }
}
