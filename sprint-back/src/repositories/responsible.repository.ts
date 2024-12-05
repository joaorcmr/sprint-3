import { Injectable } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponsibleEntity } from '../entities/responsible.entity';
import { CreateResponsibleDTO } from 'src/attendants/dtos/create-responsible.dto';

@Injectable()
@EntityRepository(ResponsibleEntity)
export class ResponsibleRepository {
  constructor(
    @InjectRepository(ResponsibleEntity)
    private readonly _responsibleRepository: Repository<ResponsibleEntity>,
  ) {}

  async createResponsible(
    dto: CreateResponsibleDTO,
  ): Promise<ResponsibleEntity> {
    const responsible = this._responsibleRepository.create(dto);
    return this._responsibleRepository.save(responsible);
  }
}
