import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { StuffPropertyStatus as IF } from './_types';

@Entity('stuff_property_status')
export class StuffPropertyStatusEntity implements IF {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  registrationNumber: number;

  @Column()
  limitedNumber: number;
}
