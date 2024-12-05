import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { UserLoginDTO } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CreateUserDTO } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly _userRepository: Repository<UserEntity>,
    private readonly _jwtService: JwtService,
    private readonly _configService: ConfigService,
  ) {}

  async signIn(login: UserLoginDTO): Promise<{ token: string }> {
    const user = await this._userRepository.findOne({
      where: {
        email: login.email,
      },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const secret = this._configService.get<string>('JWT_SECRET');
    console.log('secret', this._configService.get<string>('JWT_SECRET'));

    if (user && (await bcrypt.compare(login.password, user.password))) {
      return {
        token: this._jwtService.sign(
          { id: user.id },
          {
            algorithm: 'HS256',
            expiresIn: '1h',
            secret: this._configService.get<string>('JWT_SECRET'),
          },
        ),
      };
    }
  }

  async createUser(user: CreateUserDTO): Promise<CreateUserDTO> {
    const existingUser = await this._userRepository.findOne({
      where: {
        email: user.email,
      },
    });

    if (existingUser) {
      throw new BadRequestException('User already exists.');
    }

    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(user.password, saltOrRounds);

    const newUser = await this._userRepository.save({
      ...user,
      password: hashedPassword,
    });

    return newUser;
  }
}
