import { IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';
import { AttendantEntity } from 'src/entities/attendant.entity';

export class CreateHomeVisitRecordDTO {
  @IsNotEmpty({ message: 'O campo Nome do serviço é obrigatório.' })
  serviceName: string;

  @IsNotEmpty({ message: 'O campo CRAS é obrigatório.' })
  cras: string;

  @IsNotEmpty({ message: 'O campo Nome do profissional é obrigatório.' })
  professionalName: string;

  @IsNotEmpty({ message: 'O campo Data da visita é obrigatório.' })
  visitDate: string;

  @IsNotEmpty({ message: 'O campo Nome do usuário é obrigatório.' })
  userName: string;

  @IsNotEmpty({ message: 'O campo Nome do representante é obrigatório.' })
  representativeName: string;

  @IsNotEmpty({ message: 'O campo NIS é obrigatório.' })
  nisNumber: string;

  @IsNotEmpty({ message: 'O campo Endereço é obrigatório.' })
  address: string;

  @IsNotEmpty({ message: 'O campo Objetivo da visita é obrigatório.' })
  visitObjective: string;

  @IsOptional()
  familyMembersTalked?: string;

  @IsBoolean()
  @IsOptional()
  familyCompositionChange?: boolean;

  @IsOptional()
  demandIdentification?: string;

  @IsOptional()
  attendant: AttendantEntity;
}
