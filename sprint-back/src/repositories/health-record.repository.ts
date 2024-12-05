import { Injectable } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HealthRecordEntity } from '../entities/health-record.entity';
import { CreateHealthRecordDTO } from 'src/attendants/dtos/create-health-record.dto';

@Injectable()
@EntityRepository(HealthRecordEntity)
export class HealthRecordRepository {
  constructor(
    @InjectRepository(HealthRecordEntity)
    private readonly _healthRecordRepository: Repository<HealthRecordEntity>,
  ) {}

  async createHealthRecord(
    dto: CreateHealthRecordDTO,
  ): Promise<HealthRecordEntity> {
    const healthRecord = this._healthRecordRepository.create(dto);
    return this._healthRecordRepository.save(healthRecord);
  }
}
