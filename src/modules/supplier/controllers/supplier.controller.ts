import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { SupplierService } from '../services/supplier.service';
import { CreateSupplierDto } from '../dtos/create-supplier.dto';
import { UpdateSupplierDto } from '../dtos/update-supplier.dto';

@Controller('supplier')
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) {}

  @Get()
  async index(@Res() response) {
    try {
      const data = await this.supplierService.getAll();
      return response.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Supplier found',
        data: data,
      });
    } catch (error) {
      return error;
    }
  }

  @Get('/:id')
  async show(@Res() response, @Param('id') id: string) {
    try {
      const data = await this.supplierService.getById(id);
      return response.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Supplier found',
        data: data,
      });
    } catch (error) {
      return error;
    }
  }

  @Post()
  async store(@Res() response, @Body() request: CreateSupplierDto) {
    try {
      const data = await this.supplierService.create(request);
      return response.status(HttpStatus.CREATED).json({
        statusCode: HttpStatus.CREATED,
        message: 'Supplier created successfuly',
        data: data,
      });
    } catch (error) {
      throw error;
    }
  }

  @Put('/:id')
  async edit(
    @Res() response,
    @Body() request: UpdateSupplierDto,
    @Param('id') id: string,
  ) {
    try {
      const data = await this.supplierService.update(request, id);
      return response.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Supplier updated successfuly',
        data: data,
      });
    } catch (error) {
      throw error;
    }
  }

  @Delete('/:id')
  async destroy(@Res() response, @Param('id') id: string) {
    try {
      const data = await this.supplierService.delete(id);
      return response.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Supplier deleted successfuly',
        data: data,
      });
    } catch (error) {
      throw error;
    }
  }
}
