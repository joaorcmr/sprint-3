import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  DeleteDateColumn,
  UpdateDateColumn,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { AttendantEntity } from './attendant.entity';

@Entity('family_compositions')
export class FamilyCompositionEntity {
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  id: string;

  @Column()
  name: string;

  @Column({ name: 'birth_date', type: 'date' })
  birthDate: Date;

  @Column({ name: 'degree_of_kinship', type: 'varchar' })
  degreeOfKinship: string;

  @Column()
  schooling: string;

  @Column({ nullable: true })
  career?: string;

  @Column({ nullable: true })
  occupation?: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  income: number;

  @ManyToOne(
    () => AttendantEntity,
    (attendant) => attendant.familyComposition,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'attendant_id' })
  attendant: AttendantEntity;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp' })
  deletedAt: Date;
}
