import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { StuffCategory as IF } from './_types';

@Entity('stuff_category')
export class StuffCategoryEntity implements IF {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rank: number;

  @Column()
  name: string;

  @Column()
  propertyRegistrationNumber: number;

  @Column()
  propertyLimitedNumber: number;

  @Column()
  wantRegistrationNumber: number;

  @Column()
  wantTotalAmount: number;
}
