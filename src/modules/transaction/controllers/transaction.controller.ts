import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Res,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { TransactionService } from '../services/transaction.service';
import { HttpStatus } from '@nestjs/common/enums';
import { CreateTransactionDto } from '../dtos/create-transaction.dto';
import { UpdateTransactionDto } from '../dtos/update-transaction.dto';
import { UserGuard } from 'src/modules/user/user.guard';
import { RoleGuard } from 'src/modules/user/role.guard';
import { UserService } from 'src/modules/user/services/user.service';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly TransactionService: TransactionService) {}

  @UseGuards(UserGuard)
  @UseGuards(RoleGuard)
  @Get()
  async index(@Res() response) {
    try {
      const data = await this.TransactionService.getAll();
      return response.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Transaction found',
        data: data,
      });
    } catch (error) {
      return error;
    }
  }

  @UseGuards(UserGuard)
  @Get('/:id')
  async show(@Res() response, @Param('id') id: string) {
    try {
      const data = await this.TransactionService.getById(id);
      return response.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Transaction found',
        data: data,
      });
    } catch (error) {
      return error;
    }
  }

  @UseGuards(UserGuard)
  @Post()
  async store(@Res() response, @Body() request: CreateTransactionDto) {
    try {
      const data = await this.TransactionService.create(request);
      return response.status(HttpStatus.CREATED).json({
        statusCode: HttpStatus.CREATED,
        message: 'Transaction created successfuly',
        data: data,
      });
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(UserGuard)
  @UseGuards(RoleGuard)
  @Put('/:id')
  async edit(
    @Res() response,
    @Body() request: UpdateTransactionDto,
    @Param('id') id: string,
  ) {
    try {
      const data = await this.TransactionService.update(request, id);
      return response.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Transaction updated successfuly',
        data: data,
      });
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(UserGuard)
  @UseGuards(RoleGuard)
  @Delete('/:id')
  async destroy(@Res() response, @Param('id') id: string) {
    try {
      const data = await this.TransactionService.delete(id);
      return response.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Transaction deleted successfuly',
        data: data,
      });
    } catch (error) {
      throw error;
    }
  }
}
