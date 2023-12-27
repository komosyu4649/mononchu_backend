import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { User as IF } from './_types';

@Entity('user')
export class UserEntity implements IF {
  @PrimaryGeneratedColumn({})
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;
}
