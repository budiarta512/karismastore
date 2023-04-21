import {
  Controller,
  Get,
  Post,
  UseInterceptors,
  UploadedFiles,
  Param,
  Res,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { get } from 'http';
import { createReadStream } from 'fs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  uploadFile(@UploadedFiles() file) {
    console.log(file);
  }

  @Get('/uploads/products/:path')
  seeImageFile(@Param('path') image, @Res() response) {
    try {
      return response.sendFile(image, { root: './uploads/products' });
    } catch (error) {
      throw error;
    }
  }
}
