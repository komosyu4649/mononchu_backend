import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { StuffWantStatus as IF } from './_types';

@Entity('stuff_want_status')
export class StuffWantStatusEntity implements IF {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  registrationNumber: number;

  @Column()
  totalAmount: number;
}
