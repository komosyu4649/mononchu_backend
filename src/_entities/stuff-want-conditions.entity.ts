import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { StuffWantConditions as IF } from './_types';
import { StuffWantEntity } from './stuff-want.entity';

@Entity('stuff_want_conditions')
export class StuffWantConditions implements IF {
  @PrimaryGeneratedColumn({})
  id: number;

  @Column({ nullable: true })
  asset: string;

  @Column({ nullable: true })
  period: string;

  @Column({ nullable: true })
  property: number;

  @OneToOne(() => StuffWantEntity, (want) => want.conditions)
  @JoinColumn({ name: 'want_id' })
  want: StuffWantEntity;
}
