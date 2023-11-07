import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { StuffCategory as IF } from './_types';

@Entity('stuff_category')
export class StuffCategoryEntity implements IF {
  @PrimaryGeneratedColumn({})
  id: number;

  @Column()
  rank: number;

  @Column()
  name: string;

  @Column()
  propertyLimitedNumber: number;

  @Column({ nullable: true })
  propertyRegistrationNumber: number;

  @Column({ nullable: true })
  wantRegistrationNumber: number;

  @Column({ nullable: true })
  wantTotalAmount: number;
}
