import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { StuffWant as IF } from './_types';
import { StuffCategoryEntity } from './stuff-category.entity';
import { StuffWantConditions } from './stuff-want-conditions.entity';

@Entity('stuff_want')
export class StuffWantEntity implements IF {
  @PrimaryGeneratedColumn({})
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  thumbnail?: string;

  @Column({ nullable: true })
  score?: number;

  @Column({ nullable: true })
  price?: number;

  @Column({ nullable: true })
  brand?: string;

  @Column({ nullable: true })
  url?: string;

  @OneToOne(() => StuffWantConditions, (conditions) => conditions.want)
  @JoinColumn({ name: 'condition_id' })
  conditions: StuffWantConditions;

  @ManyToOne(() => StuffCategoryEntity, (category) => category.wants)
  category: StuffCategoryEntity;
}
