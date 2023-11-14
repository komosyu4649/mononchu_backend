import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { StuffProperty as IF } from './_types';
import { StuffCategoryEntity } from './stuff-category.entity';
import { StuffMemoPropertyEntity } from './stuff-memo-property.entity';

@Entity('stuff_property')
export class StuffPropertyEntity implements IF {
  @PrimaryGeneratedColumn({})
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  thumbnail: string;

  @Column({ nullable: true })
  score: number;

  @Column({ nullable: true })
  price: number;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  purchaseDate: string;

  @Column({ nullable: true })
  purchasePlace: string;

  @ManyToOne(() => StuffCategoryEntity, (category) => category.properties)
  category: StuffCategoryEntity;

  @OneToMany(() => StuffMemoPropertyEntity, (memo) => memo.property)
  memos: StuffMemoPropertyEntity[];
}
