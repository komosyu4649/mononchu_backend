import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { StuffWantStatus as IF } from './_types';
import { StuffCategoryEntity } from './stuff-category.entity';

@Entity('stuff_want_status')
export class StuffWantStatusEntity implements IF {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  registrationNumber: number;

  @Column()
  totalAmount: number;

  @OneToMany(() => StuffCategoryEntity, (category) => category.want)
  category: StuffCategoryEntity[];
}
