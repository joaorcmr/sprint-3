import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import { AttendantsService } from './attendants.service';
import { AttendantsController } from './attendants.controller';
import { AttendantEntity } from '../entities/attendant.entity';
import { AttendantsRepository } from '../repositories/attendants.repository';
import { UserEntity } from '../entities/user.entity';
import { ResponsibleEntity } from 'src/entities/responsible.entity';
import { HealthRecordEntity } from 'src/entities/health-record.entity';
import { ResponsibleRepository } from 'src/repositories/responsible.repository';
import { HealthRecordRepository } from 'src/repositories/health-record.repository';
import { HomeVisitRecordsEntity } from 'src/entities/home-visit-records.entity';
import { HomeVisitRecordRepository } from 'src/repositories/home-visit.repository';
import { FamilyCompositionEntity } from 'src/entities/family-composition.entity';
import { FamilyCompositionRepository } from 'src/repositories/family-composition.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AttendantEntity,
      UserEntity,
      ResponsibleEntity,
      HealthRecordEntity,
      HomeVisitRecordsEntity,
      FamilyCompositionEntity,
    ]),
  ],
  controllers: [AttendantsController],
  providers: [
    AttendantsService,
    AttendantsRepository,
    ResponsibleRepository,
    HealthRecordRepository,
    HomeVisitRecordRepository,
    FamilyCompositionRepository,
    JwtService,
  ],
})
export class AttendantsModule {}
