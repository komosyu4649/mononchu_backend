import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { StuffMemoProperty as IF } from './_types';
import { StuffPropertyEntity } from './stuff-property.entity';

@Entity('stuff_memo_property')
export class StuffMemoPropertyEntity implements IF {
  @PrimaryGeneratedColumn({})
  id: number;

  @Column({ type: 'text', array: true })
  fiveW: string[];

  @Column({ nullable: true })
  image: string;

  @Column()
  memo: string;

  @ManyToOne(() => StuffPropertyEntity, (property) => property.memos)
  property: StuffPropertyEntity;
}
