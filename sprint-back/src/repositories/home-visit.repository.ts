import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HomeVisitRecordsEntity } from '../entities/home-visit-records.entity';
import { CreateHomeVisitRecordDTO } from 'src/attendants/dtos/create-home-visit.dto';

@Injectable()
export class HomeVisitRecordRepository {
  constructor(
    @InjectRepository(HomeVisitRecordsEntity)
    private readonly repository: Repository<HomeVisitRecordsEntity>,
  ) {}

  async createHomeVisitRecord(
    homeVisitRecordData: CreateHomeVisitRecordDTO,
  ): Promise<HomeVisitRecordsEntity> {
    const homeVisitRecord = this.repository.create(homeVisitRecordData);
    return this.repository.save(homeVisitRecord);
  }
}
