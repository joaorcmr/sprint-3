import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { AttendantEntity } from './attendant.entity';
import { HaveTransferOfIncomeEnum } from '../shared/enums/have-transfer-of-income.enum';
import { HaveBenefitOfContinuosIncome } from '../shared/enums/have-benefit-of-continuos-income.enum';
import { TypeOfBuildEnum } from '../shared/enums/type-of-build.enum';
import { EmploymentStatusEnum } from '../shared/enums/employment-status.enum';
import { HousingSituationEnum } from '../shared/enums/house-situtation.enum';
import { MaritalStatusEnum } from '../shared/enums/maritinal-status.enum';

@Entity('responsible')
export class ResponsibleEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'name', type: 'varchar' })
  name: string;

  @Column({ name: 'degree_of_kinship', type: 'varchar', nullable: true })
  degreeOfKinship: string;

  @Column({ name: 'marital_status', type: 'enum', enum: MaritalStatusEnum })
  maritalStatus: MaritalStatusEnum;

  @Column({ name: 'level_of_education', type: 'varchar' })
  levelOfEducation: string;

  @Column({ name: 'elementary_education', type: 'boolean' })
  elementaryEducation: boolean;

  @Column({ name: 'high_school', type: 'boolean' })
  highSchool: boolean;

  @Column({ name: 'higher_education', type: 'boolean' })
  higherEducation: boolean;

  @Column({ name: 'job', type: 'varchar', nullable: true })
  job: string;

  @Column({ name: 'occupation', type: 'varchar', nullable: true })
  occupation: string;

  @Column({
    name: 'employment_status',
    type: 'enum',
    enum: EmploymentStatusEnum,
  })
  employmentStatus: EmploymentStatusEnum;

  @Column({ name: 'address', type: 'varchar' })
  address: string;

  @Column({ name: 'address_number', type: 'varchar' })
  addressNumber: string;

  @Column({ name: 'address_complement', type: 'varchar', nullable: true })
  addressComplement: string;

  @Column({ name: 'cep', type: 'varchar' })
  cep: string;

  @Column({ name: 'neighborhood', type: 'varchar' })
  neighborhood: string;

  @Column({ name: 'district', type: 'varchar' })
  district: string;

  @Column({ name: 'phone_number', type: 'varchar' })
  phoneNumber: string;

  @Column({ name: 'residencial_phone', type: 'varchar', nullable: true })
  residencialPhone: string;

  @Column({ name: 'reference', type: 'varchar', nullable: true })
  reference: string;

  @Column({ name: 'conditional_of_home', type: 'varchar' })
  conditionalOfHome: string;

  @Column({
    name: 'housing_situation',
    type: 'enum',
    enum: HousingSituationEnum,
  })
  housingSituation: HousingSituationEnum;

  @Column({ name: 'value_of_rent', type: 'decimal', precision: 10, scale: 2 })
  valueOfRent: number;

  @Column({ name: 'type_of_builder', type: 'enum', enum: TypeOfBuildEnum })
  typeOfBuilder: TypeOfBuildEnum;

  @Column({
    name: 'have_transfer_of_income',
    type: 'enum',
    enum: HaveTransferOfIncomeEnum,
  })
  haveTransferOfIncome: HaveTransferOfIncomeEnum;

  @Column({
    name: 'have_benefit_of_continuos_income',
    type: 'enum',
    enum: HaveBenefitOfContinuosIncome,
  })
  haveBenefitOfContinuosIncome: HaveBenefitOfContinuosIncome;

  @OneToMany(() => AttendantEntity, (attendant) => attendant.responsible)
  attendants: AttendantEntity[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp' })
  deletedAt: Date;
}
