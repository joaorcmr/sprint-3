import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

import { Request } from 'express';
import { Repository } from 'typeorm';

import { UserEntity } from '../../entities/user.entity';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly _jwtService: JwtService,
    private readonly _configService: ConfigService,
    @InjectRepository(UserEntity)
    private readonly _userRepository: Repository<UserEntity>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    let payload;
    try {
      payload = await this._jwtService.verifyAsync(token, {
        secret: this._configService.get<string>('JWT_SECRET'),
      });
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Token has expired');
      }
      throw new UnauthorizedException('Invalid token');
    }

    const user = await this._userRepository.findOne({
      where: { id: payload.id },
    });

    if (!user) {
      throw new UnauthorizedException("User doesn't exist");
    }

    request['user'] = { id: user.id };

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
