import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { StuffPropertyStatus as IF } from './_types';
import { StuffCategoryEntity } from './stuff-category.entity';

@Entity('stuff_property_status')
export class StuffPropertyStatusEntity implements IF {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  registrationNumber: number;

  @Column()
  limitedNumber: number;

  @OneToMany(() => StuffCategoryEntity, (category) => category.property)
  category: StuffCategoryEntity[];
}
