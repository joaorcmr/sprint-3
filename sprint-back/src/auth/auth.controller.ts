import {
  Controller,
  Post,
  Body,
  BadRequestException,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLoginDTO } from './dto/login.dto';
import { Response } from 'express';
import { CreateUserDTO } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @Post('/signin')
  async signIn(
    @Body() dto: UserLoginDTO,
    @Res() res: Response<{ token: string }>,
  ) {
    const token = await this._authService.signIn(dto);
    if (!token) {
      throw new BadRequestException('Invalid credentials');
    }

    return res.status(HttpStatus.OK).json(token);
  }

  @Post('/signup')
  async createUser(
    @Body() dto: CreateUserDTO,
    @Res() res: Response<CreateUserDTO>,
  ) {
    const response = await this._authService.createUser(dto);
    return res.status(HttpStatus.CREATED).send(response);
  }
}
