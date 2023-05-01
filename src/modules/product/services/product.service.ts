import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from '../models/product.schema';
import { CreateProductDto } from '../dtos/create-product.dto';
import { Model } from 'mongoose';
import { Supplier } from 'src/modules/supplier/models/supplier.schema';
import { UpdateProductDto } from '../dtos/update-product.dto';
import * as fs from 'fs';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    @InjectModel(Supplier.name) private supplierModel: Model<Supplier>,
  ) {}

  async getAll(): Promise<Product[]> {
    try {
      const data = await this.productModel.find().populate('supplier').exec();
      return data;
    } catch (error) {
      throw new InternalServerErrorException().getResponse();
    }
  }

  async getById(id: string): Promise<Product> {
    try {
      const data = await this.productModel
        .findById(id)
        .populate('supplier')
        .exec();
      return data;
    } catch (error) {
      throw new InternalServerErrorException().getResponse();
    }
  }

  async create(request: CreateProductDto): Promise<Product> {
    try {
      // console.log(createProduct.supplier);
      const supplier = await this.supplierModel
        .findById(request.supplier)
        .exec();
      const product = new this.productModel(request).save();
      supplier.products.push(await product), supplier.save();
      return product;
      // return create.save();
    } catch (error) {
      throw new InternalServerErrorException(error).getResponse();
    }
  }

  async update(request: UpdateProductDto, id: string): Promise<Product> {
    try {
      console.log(request);
      if (request.image) {
        console.log('delete image');
        const prevProduct = await this.productModel.findById(id).exec();
        const fileName = prevProduct.image;
        fs.unlink(fileName, (err) => {
          if (err) {
            console.error(err);
            return err;
          }
        });
      }
      if (request.image === '') {
        const prevProduct = await this.productModel.findById(id).exec();
        request.image = prevProduct.image;
      }
      const updateProduct = await this.productModel
        .findByIdAndUpdate(id, request)
        .exec();
      return updateProduct;
    } catch (error) {
      throw new InternalServerErrorException(error).getResponse();
    }
  }

  async delete(id: string): Promise<Product> {
    try {
      const deleteProduct = await this.productModel
        .findByIdAndDelete(id)
        .exec();
      return deleteProduct;
    } catch (error) {
      throw new InternalServerErrorException(error).getResponse();
    }
  }
}
