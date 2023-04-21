import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Res,
  Param,
  Body,
  HttpStatus,
} from '@nestjs/common';
import { CartService } from '../services/cart.service';
import { CreateCartDto } from '../dtos/create-cart.dto';
import { UpdateCartDto } from '../dtos/update-cart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartServicec: CartService) {}

  @Get()
  async index(@Res() response) {
    try {
      const data = await this.cartServicec.getAll();
      return response.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'cart found',
        data: data,
      });
    } catch (error) {
      return error;
    }
  }

  @Get('/:id')
  async show(@Res() response, @Param('id') id: string) {
    try {
      const data = await this.cartServicec.getById(id);
      return response.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'cart found',
        data: data,
      });
    } catch (error) {
      return error;
    }
  }

  @Post()
  async store(@Res() response, @Body() request: CreateCartDto) {
    try {
      const data = await this.cartServicec.create(request);
      return response.status(HttpStatus.CREATED).json({
        statusCode: HttpStatus.CREATED,
        message: 'cart created successfuly',
        data: data,
      });
    } catch (error) {
      throw error;
    }
  }

  @Put('/:id')
  async edit(
    @Res() response,
    @Body() request: UpdateCartDto,
    @Param('id') id: string,
  ) {
    try {
      const data = await this.cartServicec.update(request, id);
      return response.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'cart updated successfuly',
        data: data,
      });
    } catch (error) {
      throw error;
    }
  }

  @Delete('/:id')
  async destroy(@Res() response, @Param('id') id: string) {
    try {
      const data = await this.cartServicec.delete(id);
      return response.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'cart deleted successfuly',
        data: data,
      });
    } catch (error) {
      throw error;
    }
  }
}
