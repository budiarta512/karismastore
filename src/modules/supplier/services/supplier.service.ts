import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Supplier } from '../models/supplier.schema';
import { CreateSupplierDto } from '../dtos/create-supplier.dto';
import { Product } from 'src/modules/product/models/product.schema';
import mongoose, { Model } from 'mongoose';
import { UpdateSupplierDto } from '../dtos/update-supplier.dto';

@Injectable()
export class SupplierService {
  constructor(
    @InjectModel(Supplier.name) private supplierModel: Model<Supplier>,
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async getAll(): Promise<Supplier[]> {
    try {
      const data = await this.supplierModel.find().populate('products').exec();
      return data;
    } catch (error) {
      throw new InternalServerErrorException().getResponse();
    }
  }

  async getById(id: string): Promise<Supplier> {
    try {
      const data = await this.supplierModel.findOne({ _id: id }).exec();
      console.log(data);
      return data;
    } catch (error) {
      throw new InternalServerErrorException().getResponse();
    }
  }

  async create(createSupplier: CreateSupplierDto): Promise<Supplier> {
    try {
      const create = new this.supplierModel(createSupplier);
      return create.save();
    } catch (error) {
      throw new InternalServerErrorException(error).getResponse();
    }
  }

  async update(request: UpdateSupplierDto, id: string): Promise<Supplier> {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new HttpException('Not a valid ID!', HttpStatus.NOT_FOUND);
      }
      const supplier = await this.supplierModel.findById(id).exec();
      supplier.name = request.name;
      supplier.phone = request.phone;
      supplier.address = supplier.address;
      supplier.save();
      return supplier;
    } catch (error) {
      throw new InternalServerErrorException(error).getResponse();
    }
  }
  async delete(id: string): Promise<Supplier> {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new HttpException('Not a valid ID!', HttpStatus.NOT_FOUND);
      }
      const supplier = await this.supplierModel.findByIdAndDelete(id).exec();
      return supplier;
    } catch (error) {
      throw new InternalServerErrorException(error).getResponse();
    }
  }
}
