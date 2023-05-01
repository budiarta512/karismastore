import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Transaction } from '../models/transaction.schema';
import { Model } from 'mongoose';
import { CreateTransactionDto } from '../dtos/create-transaction.dto';
import { UpdateTransactionDto } from '../dtos/update-transaction.dto';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(Transaction.name) private transactionModel: Model<Transaction>,
  ) {}

  async getAll(): Promise<Transaction[]> {
    try {
      const data = await this.transactionModel
        .find()
        .sort({ createdAt: 'desc' })
        .populate('customer')
        .exec();
      return data;
    } catch (error) {
      throw new InternalServerErrorException().getResponse();
    }
  }

  async getById(id: string): Promise<Transaction> {
    try {
      const data = await this.transactionModel
        .findById(id)
        .populate({
          path: 'customer',
        })
        .exec();
      return data;
    } catch (error) {
      throw new InternalServerErrorException().getResponse();
    }
  }

  async create(request: CreateTransactionDto): Promise<Transaction> {
    try {
      const lastestTransaction = await this.transactionModel.findOne(
        {},
        {},
        { sort: { createdAt: -1 } },
      );
      if (lastestTransaction) {
        const lastest = lastestTransaction.invoice_no.split('-')[1];
        request.invoice_no =
          'TRA' +
          new Date().getMonth() +
          new Date().getFullYear() +
          '-' +
          (parseInt(lastest) + 1);
      } else {
        request.invoice_no =
          'TRA' + new Date().getMonth() + new Date().getFullYear() + '-' + 1;
      }
      request.status = 'MENUNGGU';
      const transaction = new this.transactionModel(request).save();
      return transaction;
    } catch (error) {
      throw new InternalServerErrorException(error).getResponse();
    }
  }

  async update(
    request: UpdateTransactionDto,
    id: string,
  ): Promise<Transaction> {
    try {
      const updateTransaction = await this.transactionModel
        .findByIdAndUpdate(id, request)
        .exec();
      return updateTransaction;
    } catch (error) {
      throw new InternalServerErrorException(error).getResponse();
    }
  }

  async delete(id: string): Promise<Transaction> {
    try {
      const deleteTransaction = await this.transactionModel
        .findByIdAndDelete(id)
        .exec();
      return deleteTransaction;
    } catch (error) {
      throw new InternalServerErrorException(error).getResponse();
    }
  }
}
