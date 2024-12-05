import { DismissalEnum } from '../shared/enums/dismissal.enum';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { ResponsibleEntity } from './responsible.entity';
import { HealthRecordEntity } from './health-record.entity';
import { HomeVisitRecordsEntity } from './home-visit-records.entity';
import { FamilyCompositionEntity } from './family-composition.entity';

@Entity('attendant')
export class AttendantEntity {
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  id: number;

  @Column({ name: 'name', type: 'varchar' })
  name: string;

  @Column({ name: 'gender', type: 'varchar' })
  gender: string;

  @Column({ name: 'date_of_subscription' })
  dateOfSubscription: Date;

  @Column({ name: 'date_of_registration', nullable: true })
  dateOfRegistration: Date;

  @Column({ name: 'date_of_shutdown', nullable: true })
  dateOfShutdown: Date;

  @Column({ name: 'dismissal', type: 'enum', enum: DismissalEnum })
  dismissal: DismissalEnum;

  @Column({ name: 'birth_date', type: 'date' })
  birthDate: Date;

  @Column({ name: 'age', type: 'int8' })
  age: number;

  @Column({ name: 'bdc_number', type: 'varchar' })
  BDCNumber: string;

  @Column({ name: 'nis_number', type: 'varchar', unique: true })
  nisNumber: string;

  @Column({ name: 'naturalness', type: 'varchar' })
  naturalness: string;

  @Column({ name: 'color', type: 'varchar' })
  color: string;

  @Column({ name: 'person_with_disabilities', type: 'boolean', default: false })
  personWithDisabilities: boolean;

  @Column({ name: 'rg', type: 'varchar', unique: true })
  rg: string;

  @Column({ name: 'cpf', type: 'varchar', unique: true })
  cpf: string;

  @Column({ name: 'emission', type: 'varchar', nullable: true })
  emission: string;

  @Column({ name: 'organ_issuer', type: 'varchar', nullable: true })
  organIssuer: string;

  @Column({ name: 'uf', type: 'varchar', nullable: true })
  uf: string;

  @Column({ name: 'birth_certificate', type: 'varchar', nullable: true })
  birthCertificate: string;

  @Column({ name: 'paper', type: 'varchar', nullable: true })
  paper: string;

  @Column({ name: 'book', type: 'varchar', nullable: true })
  book: string;

  @Column({ name: 'serie', type: 'varchar', nullable: true })
  serie: string;

  @Column({ name: 'school_name', type: 'varchar', nullable: true })
  schoolName: string;

  @Column({ name: 'time', type: 'varchar', nullable: true })
  time: string;

  @Column({ name: 'mother_name', type: 'varchar', nullable: true })
  motherName: string;

  @Column({ name: 'father_name', type: 'varchar', nullable: true })
  fatherName: string;

  @ManyToOne(() => ResponsibleEntity, (responsible) => responsible.attendants, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'responsible_id' })
  responsible: ResponsibleEntity;

  @OneToMany(
    () => HealthRecordEntity,
    (healthRecord) => healthRecord.attendant,
    {
      cascade: true,
    },
  )
  healthRecords: HealthRecordEntity[];

  @OneToMany(() => FamilyCompositionEntity, (family) => family.attendant, {
    cascade: true,
  })
  familyComposition: FamilyCompositionEntity[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp' })
  deletedAt: Date;

  @OneToOne(() => HomeVisitRecordsEntity, (homeVisit) => homeVisit.attendant)
  homeVisitRecords: HomeVisitRecordsEntity;
}
