import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsIn,
  IsNotEmpty,
  IsOptional,
  MaxLength,
} from 'class-validator';
import { DismissalEnum } from '../../shared/enums/dismissal.enum';
import { IsCPF } from '../../decorators/cpf.decorator';
import { ResponsibleEntity } from 'src/entities/responsible.entity';
import { FamilyCompositionEntity } from 'src/entities/family-composition.entity';
// TODO: ADD NISS WITH FICHA MEDICA, rg decorator
export class CreateAttendantDTO {
  @IsNotEmpty({ message: 'O campo nome é obrigatório.' })
  name: string;

  @IsNotEmpty({ message: 'O campo género é obrigatório.' })
  @IsIn(['male', 'female'], {
    message: 'O campo género deve ser masculino, feminino ou outro.',
  })
  gender: 'male' | 'female';

  @IsNotEmpty({ message: 'O campo data de inscrição é obrigatório.' })
  @Transform(({ value }) =>
    value ? new Date(value).toLocaleDateString('pt-BR') : value,
  )
  dateOfSubscription: Date;

  @IsOptional()
  @Transform(({ value }) =>
    value ? new Date(value).toLocaleDateString('pt-BR') : value,
  )
  dateOfRegistration: Date;

  @IsOptional()
  @Transform(({ value }) =>
    value ? new Date(value).toLocaleDateString('pt-BR') : value,
  )
  dateOfShutdown: Date;

  @IsNotEmpty({ message: 'O campo motivo do desligamento é obrigatório.' })
  @IsEnum(DismissalEnum, {
    message: 'O campo motivo do desligamento deve ser um valor válido.',
  })
  dismissal: DismissalEnum;

  @IsNotEmpty({ message: 'O campo data de nascimento é obrigatório.' })
  @IsNotEmpty({ message: 'O campo data de inscrição é obrigatório.' })
  @Transform(({ value }) =>
    value ? new Date(value).toLocaleDateString('pt-BR') : value,
  )
  birthDate: Date;

  @IsOptional()
  bdcNumber: string;

  @IsNotEmpty({ message: 'O campo N° NIS é obrigatório.' })
  nisNumber: string;

  @IsNotEmpty({ message: 'O campo naturalidade é obrigatório.' })
  naturalness: string;

  @IsNotEmpty({ message: 'O campo cor é obrigatório.' })
  color: string;

  @IsNotEmpty({ message: 'O campo pessoa com deficiência é obrigatório.' })
  @IsBoolean({
    message: 'O campo pessoa com deficiência deve ser um booleano.',
  })
  personWithDisabilities: boolean;

  @IsOptional()
  @IsCPF({ message: 'O campo CPF deve ser um CPF válido.' })
  cpf: string;

  @IsOptional()
  rg: string;

  @IsOptional()
  emission: string;

  @IsOptional()
  organIssuer: string;

  @IsOptional()
  @MaxLength(2, { message: 'O campo UF deve ter no máximo 2 caracteres.' })
  uf: string;

  @IsOptional()
  birthCertificate: string;

  @IsOptional()
  paper: string;

  @IsOptional()
  book: string;

  @IsOptional()
  schoolName: string;

  @IsOptional()
  serie: string;

  @IsOptional()
  shift: string;

  @IsOptional()
  motherName: string;

  @IsOptional()
  fatherName: string;

  @IsOptional()
  familyComposition: FamilyCompositionEntity[];

  @IsOptional()
  responsible: ResponsibleEntity;
}
