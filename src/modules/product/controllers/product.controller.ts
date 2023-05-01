import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Res,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { CreateProductDto } from '../dtos/create-product.dto';
import { ProductService } from '../services/product.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { UpdateProductDto } from '../dtos/update-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Get()
  async index(@Res() response) {
    try {
      const data = await this.productService.getAll();
      return response.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Products found',
        data: data,
      });
    } catch (error) {
      return error;
    }
  }

  @Get(':id')
  async show(@Res() response, @Param('id') id: string) {
    try {
      const data = await this.productService.getById(id);
      return response.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Product found',
        data: data,
      });
    } catch (error) {
      return error;
    }
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/products',
        filename: function (req, file, cb) {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(
            null,
            file.fieldname +
              '-' +
              uniqueSuffix +
              '.' +
              file.mimetype?.split('/')[1],
          );
        },
      }),
    }),
  )
  async store(
    @UploadedFile() file: Express.Multer.File,
    @Res() response,
    @Body() request: CreateProductDto,
  ) {
    try {
      request.image = file.path.replace(/\\/g, '/');
      const data = await this.productService.create(request);
      return response.status(HttpStatus.CREATED).json({
        statusCode: HttpStatus.CREATED,
        message: 'Product created successfuly',
        data: data,
      });
    } catch (error) {
      throw error;
    }
  }

  @Post('/:id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/products',
        filename: function (req, file, cb) {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(
            null,
            file.fieldname +
              '-' +
              uniqueSuffix +
              '.' +
              file.mimetype?.split('/')[1],
          );
        },
      }),
    }),
  )
  async edit(
    @Res() response,
    @Body() request: UpdateProductDto,
    @Param('id') id: string,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    try {
      if (!file) {
        console.log('file not found');
      } else {
        console.log('file found');
        request.image = file.path.replace(/\\/g, '/');
      }
      const data = await this.productService.update(request, id);
      return response.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Product updated successfuly',
        data: data,
      });
    } catch (error) {
      return error;
    }
  }

  @Delete(':id')
  async destroy(@Res() response, @Param('id') id: string) {
    try {
      const data = await this.productService.delete(id);
      return response.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Product deleted successfuly',
        data: data,
      });
    } catch (error) {
      return error;
    }
  }
}
