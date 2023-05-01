import { Module } from '@nestjs/common';
import { TransactionController } from './controllers/transaction.controller';
import { TransactionService } from './services/transaction.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Transaction, TransactionSchema } from './models/transaction.schema';
import { UserService } from '../user/services/user.service';
import { User, UserSchema } from '../user/models/user.schema';
import { Order, OrderSchema } from '../order/models/order.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Transaction.name, schema: TransactionSchema },
    ]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
  ],
  controllers: [TransactionController],
  providers: [TransactionService, UserService],
})
export class TransactionModule {}
