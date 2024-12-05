import { IsBoolean, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { ConditionalOfHome } from 'src/shared/enums/conditional-of-home.enum';
import { EmploymentStatusEnum } from 'src/shared/enums/employment-status.enum';
import { HaveBenefitOfContinuosIncome } from 'src/shared/enums/have-benefit-of-continuos-income.enum';
import { HaveTransferOfIncomeEnum } from 'src/shared/enums/have-transfer-of-income.enum';
import { HousingSituationEnum } from 'src/shared/enums/house-situtation.enum';
import { MaritalStatusEnum } from 'src/shared/enums/maritinal-status.enum';
import { TypeOfBuildEnum } from 'src/shared/enums/type-of-build.enum';

export class CreateResponsibleDTO {
  @IsNotEmpty({ message: 'O campo nome é obrigatório.' })
  name: string;

  @IsOptional()
  degreeOfKinship: string;

  @IsNotEmpty({ message: 'O campo estado civil é obrigatório.' })
  @IsEnum(MaritalStatusEnum, {
    message: 'O campo estado civil deve ser um valor válido.',
  })
  maritalStatus: MaritalStatusEnum;

  @IsNotEmpty({ message: 'O campo grau de instrução é obrigatório.' })
  levelOfEducation: string;

  @IsBoolean()
  elementaryEducation: boolean;

  @IsBoolean()
  highSchool: boolean;

  @IsBoolean()
  higherEducation: boolean;

  @IsOptional()
  job: string;

  @IsOptional()
  occupation: string;

  @IsNotEmpty({ message: 'O campo situação de emprego é obrigatório.' })
  @IsEnum(EmploymentStatusEnum, {
    message: 'O campo situação de emprego deve ser um valor válido.',
  })
  employmentStatus: EmploymentStatusEnum;

  @IsNotEmpty({ message: 'O campo endereço é obrigatório.' })
  address: string;

  @IsNotEmpty({ message: 'O campo número é obrigatório.' })
  addressNumber: string;

  @IsOptional()
  addressComplement: string;

  @IsNotEmpty({ message: 'O campo CEP é obrigatório.' })
  cep: string;

  @IsNotEmpty({ message: 'O campo bairro é obrigatório.' })
  neighborhood: string;

  @IsNotEmpty({ message: 'O campo distrito é obrigatório.' })
  district: string;

  @IsNotEmpty({ message: 'O campo telefone celular é obrigatório.' })
  phoneNumber: string;

  @IsNotEmpty({ message: 'O campo telefone residencial é obrigatório.' })
  residencialPhone: string;

  @IsOptional()
  reference: string;

  @IsNotEmpty({ message: 'O campo cidade é obrigatório.' })
  @IsEnum(ConditionalOfHome, {
    message: 'O campo situação de moradia deve ser um valor válido.',
  })
  conditionalOfHome: string;

  @IsNotEmpty({ message: 'O campo situação de moradia é obrigatório.' })
  @IsEnum(HousingSituationEnum, {
    message: 'O campo situação de moradia deve ser um valor válido.',
  })
  housingSituation: HousingSituationEnum;

  @IsNotEmpty({ message: 'O campo valor do aluguel é obrigatório.' })
  valueOfRent: number;

  @IsNotEmpty({ message: 'O campo tipo de construção é obrigatório.' })
  @IsEnum(TypeOfBuildEnum, {
    message: 'O campo tipo de construção deve ser um valor válido.',
  })
  typeOfBuilder: TypeOfBuildEnum;

  @IsEnum(HaveTransferOfIncomeEnum)
  haveTransferOfIncome: HaveTransferOfIncomeEnum;

  @IsEnum(HaveBenefitOfContinuosIncome)
  haveBenefitOfContinuosIncome: HaveBenefitOfContinuosIncome;
}
