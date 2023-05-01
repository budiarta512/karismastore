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
  UseGuards,
} from '@nestjs/common';
import { CartService } from '../services/cart.service';
import { CreateCartDto } from '../dtos/create-cart.dto';
import { UpdateCartDto } from '../dtos/update-cart.dto';
import { UserGuard } from 'src/modules/user/user.guard';
import { RoleGuard } from 'src/modules/user/role.guard';

@Controller('cart')
export class CartController {
  constructor(private readonly cartServicec: CartService) {}

  @UseGuards(UserGuard)
  @UseGuards(RoleGuard)
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

  @UseGuards(UserGuard)
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

  @UseGuards(UserGuard)
  @Post()
  async store(@Res() response, @Body() request: CreateCartDto) {
    try {
      const data = await this.cartServicec.create(request);
      return response.status(HttpStatus.CREATED).json({
        statusCode: HttpStatus.CREATED,
        message: 'successfuly added product to cart',
        data: data,
      });
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(UserGuard)
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

  @UseGuards(UserGuard)
  @Delete('/:id')
  async destroy(@Res() response, @Param('id') id: string) {
    try {
      const data = await this.cartServicec.delete(id);
      return response.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'product deleted from cart successfuly',
        data: data,
      });
    } catch (error) {
      throw error;
    }
  }
}
