import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import {
  StuffCategory as IF,
  // StuffPropertyStatus,
  // StuffWantStatus,
} from './_types';

@Entity('stuff_category')
export class StuffCategoryEntity implements IF {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rank: number;

  @Column()
  name: string;

  // @Column()
  // property: StuffPropertyStatus;

  // @Column()
  // want: StuffWantStatus;
}
