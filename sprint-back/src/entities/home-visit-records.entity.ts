import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { AttendantEntity } from 'src/entities/attendant.entity';

@Entity('home_visit_records')
export class HomeVisitRecordsEntity {
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  id: string;

  @Column({ name: 'service_name', type: 'varchar', length: 255 })
  serviceName: string;

  @Column({ name: 'cras', type: 'varchar', length: 255 })
  cras: string;

  @Column({ name: 'professional_name', type: 'varchar', length: 255 })
  professionalName: string;

  @Column({ name: 'visit_date', type: 'date' })
  visitDate: Date;

  @Column({ name: 'user_name', type: 'varchar', length: 255 })
  userName: string;

  @Column({ name: 'representative_name', type: 'varchar', length: 255 })
  representativeName: string;

  @Column({ name: 'nis_number', type: 'varchar', length: 50 })
  nisNumber: string;

  @Column({ name: 'address', type: 'text' })
  address: string;

  @Column({ name: 'visit_objective', type: 'text' })
  visitObjective: string;

  @Column({ name: 'family_members_talked', type: 'text', nullable: true })
  familyMembersTalked: string;

  @Column({ name: 'demand_identification', type: 'text', nullable: true })
  demandIdentification: string;

  @Column({
    name: 'family_composition_change',
    type: 'boolean',
    default: false,
  })
  familyCompositionChange: boolean;

  @OneToOne(() => AttendantEntity)
  @JoinColumn({ name: 'attendant_id' })
  attendant: AttendantEntity;
}
