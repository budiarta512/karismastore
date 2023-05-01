import {
  Controller,
  Get,
  Res,
  Body,
  Param,
  Post,
  Put,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { OrderService } from '../services/order.service';
import { CreateOrderDto } from '../dtos/create-order.dto';
import { UpdateOrderDto } from '../dtos/update-order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async index(@Res() response) {
    try {
      const data = await this.orderService.getAll();
      return response.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Order found',
        data: data,
      });
    } catch (error) {
      return error;
    }
  }

  @Get('/:id')
  async show(@Res() response, @Param('id') id: string) {
    try {
      const data = await this.orderService.getById(id);
      return response.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Order found',
        data: data,
      });
    } catch (error) {
      return error;
    }
  }

  @Get('/user/:id')
  async showOrderByUserId(@Res() response, @Param('id') id: string) {
    try {
      const data = await this.orderService.getByUserId(id);
      return response.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Order found',
        data: data,
      });
    } catch (error) {
      return error;
    }
  }

  @Post()
  async store(@Res() response, @Body() request: CreateOrderDto) {
    try {
      const data = await this.orderService.create(request);
      return response.status(HttpStatus.CREATED).json({
        statusCode: HttpStatus.CREATED,
        message: 'Order created successfuly',
        data: data,
      });
    } catch (error) {
      throw error;
    }
  }

  @Put('/:id')
  async edit(
    @Res() response,
    @Body() request: UpdateOrderDto,
    @Param('id') id: string,
  ) {
    try {
      const data = await this.orderService.update(request, id);
      return response.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Order updated successfuly',
        data: data,
      });
    } catch (error) {
      throw error;
    }
  }

  @Delete('/:id')
  async destroy(@Res() response, @Param('id') id: string) {
    try {
      const data = await this.orderService.delete(id);
      return response.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Order deleted successfuly',
        data: data,
      });
    } catch (error) {
      throw error;
    }
  }
}
