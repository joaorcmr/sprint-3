import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateFamilyCompositionDTO } from 'src/attendants/dtos/create-family-composition.dto';
import { FamilyCompositionEntity } from 'src/entities/family-composition.entity';
import { EntityRepository, Repository } from 'typeorm';

@Injectable()
@EntityRepository(FamilyCompositionEntity)
export class FamilyCompositionRepository {
  constructor(
    @InjectRepository(FamilyCompositionEntity)
    private readonly _familyCompositionRepository: Repository<FamilyCompositionEntity>,
  ) {}

  async createFamilyComposition(
    dtos: CreateFamilyCompositionDTO[],
  ): Promise<FamilyCompositionEntity[]> {
    const familyCompositions = this._familyCompositionRepository.create(dtos); // Creates multiple entities
    return this._familyCompositionRepository.save(familyCompositions); // Saves all entities
  }
}
