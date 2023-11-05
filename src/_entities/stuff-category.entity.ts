import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { StuffCategory as IF } from './_types';
import { StuffPropertyStatusEntity } from './stuff-property-status.entity';
import { StuffWantStatusEntity } from './stuff-want-status.entity';

@Entity('stuff_category')
export class StuffCategoryEntity implements IF {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rank: number;

  @Column()
  name: string;

  @ManyToMany(() => StuffPropertyStatusEntity)
  property: StuffPropertyStatusEntity;

  @ManyToMany(() => StuffWantStatusEntity)
  want: StuffWantStatusEntity;
}
