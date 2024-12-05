import { Injectable } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { AttendantEntity } from '../entities/attendant.entity';
import {
  GetAllAttendantsRequestDTO,
  SimplifiedAttendantDTO,
} from '../attendants/dtos/get-all-attendants.dto';
import { CreateAttendantDTO } from 'src/attendants/dtos/create-attendant.dto';

@Injectable()
@EntityRepository(AttendantEntity)
export class AttendantsRepository {
  constructor(
    @InjectRepository(AttendantEntity)
    private readonly _attendantsRepository: Repository<AttendantEntity>,
  ) {}

  async findAllAttendants(
    filters: GetAllAttendantsRequestDTO,
  ): Promise<{ data: SimplifiedAttendantDTO[]; count: number }> {
    const take = filters.take || 10;
    const skip = filters.skip || 0;

    let query = this._attendantsRepository
      .createQueryBuilder('attendants')
      .leftJoinAndSelect('attendants.responsible', 'responsible')
      .select([
        'attendants.id',
        'attendants.name',
        'attendants.age',
        'responsible.name',
        'responsible.phoneNumber',
      ])
      .skip(skip)
      .take(take);

    if (filters.responsible) {
      query = query.andWhere('responsible.name ILIKE :responsible', {
        responsible: `%${filters.responsible}%`,
      });
    }

    if (filters.responsiblePhoneNumber) {
      query = query.andWhere(
        'responsible.phoneNumber ILIKE :responsiblePhoneNumber',
        {
          responsiblePhoneNumber: `%${filters.responsiblePhoneNumber}%`,
        },
      );
    }

    if (filters.name) {
      query = query.andWhere('attendants.name ILIKE :name', {
        name: `%${filters.name}%`,
      });
    }

    if (filters.age) {
      query = query.andWhere('attendants.age = :age', {
        age: filters.age,
      });
    }

    const [result, total] = await query.getManyAndCount();

    return {
      data: result.map((attendant) => ({
        id: attendant.id,
        name: attendant.name,
        age: attendant.age,
        responsible: attendant.responsible?.name,
        responsiblePhoneNumber: attendant.responsible?.phoneNumber,
      })),
      count: total,
    };
  }

  async findById(id: number): Promise<AttendantEntity> {
    return this._attendantsRepository.findOne({
      where: { id },
      relations: [
        'responsible',
        'familyComposition',
        'healthRecords',
        'homeVisitRecords',
      ],
    });
  }

  async createAttendant(dto: CreateAttendantDTO): Promise<AttendantEntity> {
    const attendant = this._attendantsRepository.create(dto);
    return this._attendantsRepository.save(attendant);
  }

  async deleteAttendant(id: number): Promise<void> {
    const attendant = await this._attendantsRepository.findOne({
      where: { id },
    });
    if (!attendant) {
      throw new Error('Atendido não encontrado.');
    }

    await this._attendantsRepository.softDelete(id);
  }
}
