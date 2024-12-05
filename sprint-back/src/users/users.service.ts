import { Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { UserEntity } from '../entities/user.entity';
import { GetUserResponseDTO } from './dtos/get-user.dto';
import { JwtAuthGuard } from '../shared/guards/jwt.guard';

@Injectable()
@UseGuards(JwtAuthGuard)
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly _usersRepository: Repository<UserEntity>,
  ) {}

  async getUserByEmail(email: string): Promise<GetUserResponseDTO> {
    const user = await this._usersRepository.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      throw new NotFoundException('Usuário nao encontrado.');
    }

    return {
      cca: user.cca,
      email: user.email,
      id: user.id,
      name: user.name,
      occupation: user.occupation,
    };
  }

  async getUserById(id: number): Promise<GetUserResponseDTO> {
    const user = await this._usersRepository.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException('Usuário nao encontrado.');
    }

    return {
      cca: user.cca,
      email: user.email,
      id: user.id,
      name: user.name,
      occupation: user.occupation,
    };
  }
}
