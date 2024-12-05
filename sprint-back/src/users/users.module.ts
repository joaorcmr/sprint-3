import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersService } from './users.service';
import { UserEntity } from '../entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UsersController } from './users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UsersService, JwtService],
  controllers: [UsersController],
})
export class UsersModule {}
