import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';

import { UsersService } from './users.service';
import { GetUserResponseDTO } from './dtos/get-user.dto';
import { JwtAuthGuard } from '../shared/guards/jwt.guard';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly _userService: UsersService) {}

  @Post('/email')
  async getUserByEmail(
    @Body() body: { email: string },
    @Res() res: Response<GetUserResponseDTO>,
  ) {
    const user = await this._userService.getUserByEmail(body.email);

    return res.status(HttpStatus.OK).json(user);
  }

  @Get('/:id')
  async getUserById(
    @Param('id') id: number,
    @Res() res: Response<GetUserResponseDTO>,
  ) {
    const user = await this._userService.getUserById(id);

    return res.status(HttpStatus.OK).json(user);
  }
}
