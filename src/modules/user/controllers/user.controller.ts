import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  Delete,
  Param,
  HttpStatus,
  Headers,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dtos/create-user.request';
import { LoginUserDto } from '../dtos/login-user.dto';
import { JwtService } from '@nestjs/jwt/dist';
import * as env from 'dotenv';
import { UserGuard } from '../user.guard';
import { RoleGuard } from '../role.guard';

env.config();

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  @UseGuards(UserGuard)
  @UseGuards(RoleGuard)
  @Get()
  async getAll(@Res() response) {
    const users = await this.userService.getAll();
    return response.json(users);
  }

  @Post('/register')
  async register(@Res() response, @Body() request: CreateUserDto) {
    try {
      const createUser = await this.userService.register(request);
      return response.status(HttpStatus.CREATED).json({
        statusCode: HttpStatus.CREATED,
        message: 'User created successfuly',
        data: createUser,
      });
    } catch (error) {
      throw error;
    }
  }

  @Post('/login')
  async login(@Res() response, @Body() request: LoginUserDto) {
    try {
      const service = await this.userService.login(request);
      const payload = { name: service?.name, sub: service?.phone };
      const token = await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET,
      });
      console.log(token);
      return response.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Login user successfuly',
        data: {
          user: service,
          access_token: token,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(UserGuard)
  @Post('/verify')
  async verify(@Res() response, @Headers() header) {
    try {
      const [type, token] = header?.authorization.split(' ') ?? [];
      const checkToken = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      if (!checkToken) {
        throw new UnauthorizedException('asdasdasdsad').getResponse();
      }
      const user = await this.userService.verify(checkToken?.sub);
      return response.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'user verified',
        data: {
          user: user,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  @Delete('/:id')
  async delete(@Res() response, @Param('id') id: string) {
    const deleteUser = await this.userService.delete(id);
    return response.json(deleteUser);
  }
}
