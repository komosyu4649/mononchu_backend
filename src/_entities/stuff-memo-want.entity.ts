import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { StuffMemo as IF } from './_types';
import { StuffWantEntity } from './stuff-want.entity';

@Entity('stuff_memo_want')
export class StuffMemoWantEntity implements IF {
  @PrimaryGeneratedColumn({})
  id: number;

  @Column({ type: 'text', array: true })
  fiveW: string[];

  @Column({ nullable: true })
  image: string;

  @Column()
  memo: string;

  @ManyToOne(() => StuffWantEntity, (property) => property.memos)
  want: StuffWantEntity;
}
