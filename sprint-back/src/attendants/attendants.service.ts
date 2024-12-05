import { BadRequestException, Inject, Injectable } from '@nestjs/common';

import { AttendantEntity } from '../entities/attendant.entity';
import { AttendantsRepository } from '../repositories/attendants.repository';
import {
  GetAllAttendantsRequestDTO,
  GetAllAttendantsResponseDTO,
} from './dtos/get-all-attendants.dto';
import { CreateAttendantDTO } from './dtos/create-attendant.dto';
import { ResponsibleRepository } from 'src/repositories/responsible.repository';
import { HealthRecordRepository } from 'src/repositories/health-record.repository';
import { CreateResponsibleDTO } from './dtos/create-responsible.dto';
import { CreateHealthRecordDTO } from './dtos/create-health-record.dto';
import { CreateHomeVisitRecordDTO } from './dtos/create-home-visit.dto';
import { HomeVisitRecordRepository } from 'src/repositories/home-visit.repository';
import { FamilyCompositionRepository } from 'src/repositories/family-composition.repository';
import { CreateFamilyCompositionDTO } from './dtos/create-family-composition.dto';

@Injectable()
export class AttendantsService {
  constructor(
    @Inject(AttendantsRepository)
    private readonly _attendantsRepository: AttendantsRepository,
    @Inject(ResponsibleRepository)
    private readonly _responsibleRepository: ResponsibleRepository,
    @Inject(HealthRecordRepository)
    private readonly _healthRecordRepository: HealthRecordRepository,
    @Inject(HomeVisitRecordRepository)
    private readonly _homeVisitRecordRepository: HomeVisitRecordRepository,
    @Inject(FamilyCompositionRepository)
    private readonly _familyCompositionRepository: FamilyCompositionRepository,
  ) {}

  async findAll(
    query: GetAllAttendantsRequestDTO,
  ): Promise<GetAllAttendantsResponseDTO> {
    const { data, count } =
      await this._attendantsRepository.findAllAttendants(query);

    return {
      data: data.map((item) => ({
        id: item.id,
        name: item.name,
        age: item.age,
        responsible: item.responsible,
        responsiblePhoneNumber: item.responsiblePhoneNumber,
      })),
      count,
    };
  }

  async findById(id: number): Promise<AttendantEntity> {
    const attendant = await this._attendantsRepository.findById(id);
    if (!attendant) {
      throw new BadRequestException('Atendido não encontrado.');
    }

    return attendant;
  }

  async createAttendant(
    responsibleDTO: CreateResponsibleDTO,
    attendantDTO: CreateAttendantDTO,
    healthRecordDTO: CreateHealthRecordDTO,
    homeVisitRecordDTO: CreateHomeVisitRecordDTO,
    familyCompositionDTO: CreateFamilyCompositionDTO[],
  ): Promise<any> {
    try {
      const responsible =
        await this._responsibleRepository.createResponsible(responsibleDTO);

      const attendant = await this._attendantsRepository.createAttendant({
        ...attendantDTO,
        responsible,
      });

      const healthRecord =
        await this._healthRecordRepository.createHealthRecord({
          ...healthRecordDTO,
          attendant,
        });

      const homeVisitRecord =
        await this._homeVisitRecordRepository.createHomeVisitRecord({
          ...homeVisitRecordDTO,
          attendant,
        });

      const familyCompositions = familyCompositionDTO.map((fc) => ({
        ...fc,
        attendant,
      }));

      const savedFamilyCompositions =
        await this._familyCompositionRepository.createFamilyComposition(
          familyCompositions,
        );

      return {
        message: 'All entities created successfully!',
        data: {
          responsible,
          attendant,
          healthRecord,
          homeVisitRecord,
          familyCompositions: savedFamilyCompositions,
        },
      };
    } catch (error) {
      console.error('Error in Service:', error);
      throw new BadRequestException(
        'Error creating entities: ' + error.message,
      );
    }
  }

  async deleteAttendant(id: number): Promise<void> {
    await this._attendantsRepository.deleteAttendant(id);
  }
}
