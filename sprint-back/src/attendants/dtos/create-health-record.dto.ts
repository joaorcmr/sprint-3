import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  ValidateIf,
} from 'class-validator';
import { AttendantEntity } from 'src/entities/attendant.entity';
import { DiseasesPresentedEnum } from 'src/shared/enums/diseases-presentes.enum';
import { NeurologicalConditionEnum } from 'src/shared/enums/neurological-codition.enum';
import { RespiratoryConditionEnum } from 'src/shared/enums/respiratory-condition.enum';

export class CreateHealthRecordDTO {
  @IsNotEmpty({ message: 'O campo data é obrigatório.' })
  @Transform(({ value }) =>
    value ? new Date(value).toLocaleDateString('pt-BR') : value,
  )
  date: Date;

  @IsOptional()
  @Transform(({ value }) =>
    value ? new Date(value).toLocaleDateString('pt-BR') : value,
  )
  admissionDate: Date;

  @IsNotEmpty({ message: 'O campo Nome da Criança é obrigatório.' })
  childName: string;

  @IsNotEmpty({ message: 'O campo gênero é obrigatório.' })
  @IsIn(['male', 'female'], {
    message: 'O campo género deve ser masculino, feminino ou outro.',
  })
  gender: 'male' | 'female';

  @IsNotEmpty({ message: 'O campo Data de Nascimento é obrigatório.' })
  @Transform(({ value }) =>
    value ? new Date(value).toLocaleDateString('pt-BR') : value,
  )
  birthDate: Date;

  @IsNotEmpty({ message: 'O campo Estatura é obrigatório.' })
  @IsNumber({}, { message: 'O campo Estatura deve ser um número.' })
  height: number;

  @IsNotEmpty({ message: 'O campo Peso é obrigatório.' })
  @IsNumber({}, { message: 'O campo Peso deve ser um número.' })
  weight: number;

  @IsOptional()
  @IsEnum(DiseasesPresentedEnum, {
    message: 'O campo Doenças que apresenta deve ser um valor válido.',
  })
  diseasesPresented: DiseasesPresentedEnum;

  @IsBoolean()
  @IsNotEmpty({ message: 'O campo Tem Alergia ? é obrigatório.' })
  hasAllergy: boolean;

  @ValidateIf((dto: CreateHealthRecordDTO) => dto.hasAllergy === true)
  @IsNotEmpty({
    message: "O campo 'Se sim, descreva (Tem Alergia ?)' é obrigatório.",
  })
  allergyDescription: string;

  @IsEnum(RespiratoryConditionEnum, {
    message:
      "O campo 'Tem Bronquite ou Falta de Ar?' deve ser um valor válido.",
  })
  @IsNotEmpty({
    message: "O campo 'Tem Bronquite ou Falta de Ar?' é obrigatório.",
  })
  hasBronchitisOrShortnessOfBreath: RespiratoryConditionEnum;

  @ValidateIf(
    (dto: CreateHealthRecordDTO) =>
      dto.hasBronchitisOrShortnessOfBreath === RespiratoryConditionEnum.YES ||
      dto.hasBronchitisOrShortnessOfBreath ===
        RespiratoryConditionEnum.FREQUENTLY ||
      dto.hasBronchitisOrShortnessOfBreath === RespiratoryConditionEnum.RARELLY,
  )
  @IsOptional()
  bronchitisOrShortnessOfBreathMedicationUsed: string;

  @ValidateIf(
    (dto: CreateHealthRecordDTO) =>
      dto.hasBronchitisOrShortnessOfBreath === RespiratoryConditionEnum.YES ||
      dto.hasBronchitisOrShortnessOfBreath ===
        RespiratoryConditionEnum.FREQUENTLY ||
      dto.hasBronchitisOrShortnessOfBreath === RespiratoryConditionEnum.RARELLY,
  )
  @IsOptional()
  bronchitisOrShortnessOfBreathMonitoringLocation: string;

  @IsEnum(NeurologicalConditionEnum, {
    message: "O campo 'tem convulsão ou ataques?' deve ser um valor válido.",
  })
  @IsNotEmpty({ message: "O campo 'tem convulsão ou ataques?' é obrigatório." })
  hasSeizuresOrAttacks: NeurologicalConditionEnum;

  @ValidateIf(
    (dto: CreateHealthRecordDTO) =>
      dto.hasSeizuresOrAttacks === NeurologicalConditionEnum.YES ||
      dto.hasSeizuresOrAttacks === NeurologicalConditionEnum.FREQUENTLY ||
      dto.hasSeizuresOrAttacks === NeurologicalConditionEnum.RARELLY,
  )
  @IsOptional()
  seizuresOrAttacksMedicationUsed: string;

  @ValidateIf(
    (dto: CreateHealthRecordDTO) =>
      dto.hasSeizuresOrAttacks === NeurologicalConditionEnum.YES ||
      dto.hasSeizuresOrAttacks === NeurologicalConditionEnum.FREQUENTLY ||
      dto.hasSeizuresOrAttacks === NeurologicalConditionEnum.RARELLY,
  )
  @IsOptional()
  seizuresOrAttacksMonitoringLocation: string;

  @IsBoolean()
  @IsNotEmpty({ message: "O campo 'já esteve internado?' é obrigatório." })
  hasBeenHospitalized: boolean;

  @ValidateIf((dto: CreateHealthRecordDTO) => dto.hasBeenHospitalized === true)
  @IsNotEmpty({
    message:
      "O campo 'Com que idade? Por quê? (já esteve internado?)' é obrigatório.",
  })
  hospitalizationReason: string;

  @IsBoolean()
  @IsNotEmpty({ message: "O campo 'já foi ao dentista?' é obrigatório." })
  hasBeenToTheDentist: boolean;

  @ValidateIf((dto: CreateHealthRecordDTO) => dto.hasBeenToTheDentist === true)
  @IsNotEmpty({
    message: "O campo 'Por quê? (já foi ao dentista?)' é obrigatório.",
  })
  dentistDescription: string;

  @IsBoolean()
  @IsNotEmpty({ message: "O campo 'está em tratamento?' é obrigatório." })
  isInTreatment: boolean;

  @ValidateIf((dto: CreateHealthRecordDTO) => dto.isInTreatment === true)
  @IsNotEmpty({
    message: "O campo 'Qual? (esta em tratamento?)' é obrigatório.",
  })
  treatmentDescription: string;

  @IsBoolean()
  @IsNotEmpty({
    message: "O campo 'Assistência de Saúde Conveniada' é obrigatório.",
  })
  hasHealthCare: boolean;

  @ValidateIf((dto: CreateHealthRecordDTO) => dto.hasHealthCare === true)
  @IsNotEmpty({
    message:
      "O campo 'Por quê (Assistência de Saúde Conveniada)' é obrigatório.",
  })
  healthCareDescription: string;

  @IsBoolean()
  @IsNotEmpty({ message: "O campo 'UBS' é obrigatório." })
  hasUBS: boolean;

  @ValidateIf((dto: CreateHealthRecordDTO) => dto.hasUBS === true)
  @IsNotEmpty({ message: "O campo 'Por quê? (UBS)' é obrigatório." })
  ubsDescription: string;

  @IsBoolean()
  @IsNotEmpty({
    message: "O campo 'Carteira de Vacina Autorizada' é obrigatório.",
  })
  hasVaccineCard: boolean;

  @ValidateIf((dto: CreateHealthRecordDTO) => dto.hasVaccineCard === true)
  @IsNotEmpty({
    message:
      "O campo 'Por quê? (Carteira de Vacina Autorizada)' é obrigatório.",
  })
  vaccineCardDescription: string;

  @IsBoolean()
  @IsNotEmpty({ message: "O campo 'Medicação Contra Febre' é obrigatório." })
  hasFeverMedication: boolean;

  @ValidateIf((dto: CreateHealthRecordDTO) => dto.hasFeverMedication === true)
  @IsNotEmpty({
    message: "O campo 'Por quê? (Medicação Contra Febre)' é obrigatório.",
  })
  feverMedicationDescription: string;

  @IsBoolean()
  @IsNotEmpty({
    message: "O campo 'Pode Praticar Atividades Físicas?' é obrigatório.",
  })
  canPracticePhysicalActivities: boolean;

  @IsBoolean()
  @IsNotEmpty({
    message: "O campo 'Tem Acompanhamento Médico?' é obrigatório.",
  })
  hasMedicalMonitoring: boolean;

  @IsNotEmpty({ message: "O campo 'Preenchido Por' é obrigatório." })
  filledBy: string;

  @IsOptional()
  // @IsNumber({}, { message: 'O campo id_atendido deve ser um número.' })
  attendant: AttendantEntity;
}
