import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { AttendantEntity } from 'src/entities/attendant.entity';

export class CreateFamilyCompositionDTO {
  @IsNotEmpty({ message: 'O campo nome é obrigatório.' })
  name: string;

  @IsNotEmpty({ message: 'O campo data de nascimento é obrigatório.' })
  @Transform(({ value }) =>
    value ? new Date(value).toLocaleDateString('pt-BR') : value,
  )
  birthDate: Date;

  @IsNotEmpty({ message: 'O campo parentesco é obrigatório.' })
  degreeOfKinship: string;

  @IsNotEmpty({ message: 'O campo escolaridade é obrigatório.' })
  schooling: string;

  @IsOptional()
  carrer: string;

  @IsOptional()
  occupation: string;

  @IsNotEmpty({ message: 'O campo renda é obrigatório.' })
  @IsNumber({}, { message: 'O campo renda deve ser um número.' })
  income: number;

  @IsOptional()
  attendant?: AttendantEntity;
}
