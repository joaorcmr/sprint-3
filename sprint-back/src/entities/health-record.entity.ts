import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AttendantEntity } from './attendant.entity';
import { DiseasesPresentedEnum } from 'src/shared/enums/diseases-presentes.enum';
import { RespiratoryConditionEnum } from '../shared/enums/respiratory-condition.enum';
import { NeurologicalConditionEnum } from 'src/shared/enums/neurological-codition.enum';

@Entity('health_record')
export class HealthRecordEntity {
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  id: number;

  @ManyToOne(() => AttendantEntity, (attendant) => attendant.healthRecords, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'attendant_id' })
  attendant: AttendantEntity;

  @Column({ name: 'date', type: 'timestamp' })
  date: Date;

  @Column({ name: 'admission_date', type: 'timestamp', nullable: true })
  admissionDate?: Date;

  @Column({ name: 'child_name', type: 'varchar' })
  childName: string;

  @Column({ name: 'gender', type: 'varchar', enum: ['male', 'female'] })
  gender: 'male' | 'female';

  @Column({ name: 'birth_date', type: 'date' })
  birthDate: Date;

  @Column({ name: 'height', type: 'int' })
  height: number;

  @Column({ name: 'weight', type: 'decimal', precision: 5, scale: 2 })
  weight: number;

  @Column({
    name: 'diseases_presented',
    type: 'enum',
    enum: DiseasesPresentedEnum,
    nullable: true,
  })
  diseasesPresented?: DiseasesPresentedEnum;

  @Column({ name: 'has_allergy', type: 'boolean' })
  hasAllergy: boolean;

  @Column({ name: 'allergy_description', type: 'varchar', nullable: true })
  allergyDescription?: string;

  @Column({
    name: 'has_bronchitis_or_shortness_of_breath',
    type: 'enum',
    enum: RespiratoryConditionEnum,
  })
  hasBronchitisOrShortnessOfBreath: RespiratoryConditionEnum;

  @Column({
    name: 'bronchitis_or_shortness_of_breath_medication_used',
    type: 'varchar',
    nullable: true,
  })
  bronchitisOrShortnessOfBreathMedicationUsed?: string;

  @Column({
    name: 'bronchitis_or_shortness_of_breath_monitoring_location',
    type: 'varchar',
    nullable: true,
  })
  bronchitisOrShortnessOfBreathMonitoringLocation?: string;

  @Column({
    name: 'has_seizures_or_attacks',
    type: 'enum',
    enum: NeurologicalConditionEnum,
  })
  hasSeizuresOrAttacks: NeurologicalConditionEnum;

  @Column({
    name: 'seizures_or_attacks_medication_used',
    type: 'varchar',
    nullable: true,
  })
  seizuresOrAttacksMedicationUsed?: string;

  @Column({
    name: 'seizures_or_attacks_monitoring_location',
    type: 'varchar',
    nullable: true,
  })
  seizuresOrAttacksMonitoringLocation?: string;

  @Column({ name: 'has_been_hospitalized', type: 'boolean' })
  hasBeenHospitalized: boolean;

  @Column({ name: 'hospitalization_reason', type: 'varchar', nullable: true })
  hospitalizationReason?: string;

  @Column({ name: 'has_been_to_the_dentist', type: 'boolean' })
  hasBeenToTheDentist: boolean;

  @Column({ name: 'dentist_description', type: 'varchar', nullable: true })
  dentistDescription?: string;

  @Column({ name: 'is_in_treatment', type: 'boolean' })
  isInTreatment: boolean;

  @Column({ name: 'treatment_description', type: 'varchar', nullable: true })
  treatmentDescription?: string;

  @Column({ name: 'has_health_care', type: 'boolean' })
  hasHealthCare: boolean;

  @Column({ name: 'health_care_description', type: 'varchar', nullable: true })
  healthCareDescription?: string;

  @Column({ name: 'has_ubs', type: 'boolean' })
  hasUBS: boolean;

  @Column({ name: 'ubs_description', type: 'varchar', nullable: true })
  ubsDescription?: string;

  @Column({ name: 'has_vaccine_card', type: 'boolean' })
  hasVaccineCard: boolean;

  @Column({
    name: 'vaccine_card_description',
    type: 'varchar',
    nullable: true,
  })
  vaccineCardDescription?: string;

  @Column({ name: 'has_fever_medication', type: 'boolean' })
  hasFeverMedication: boolean;

  @Column({
    name: 'fever_medication_description',
    type: 'varchar',
    nullable: true,
  })
  feverMedicationDescription?: string;

  @Column({ name: 'can_practice_physical_activities', type: 'boolean' })
  canPracticePhysicalActivities: boolean;

  @Column({ name: 'has_medical_monitoring', type: 'boolean' })
  hasMedicalMonitoring: boolean;

  @Column({ name: 'filled_by', type: 'varchar' })
  filledBy: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp' })
  deletedAt: Date;
}
