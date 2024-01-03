import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User as IF } from './_types';
import { StuffCategoryEntity } from './stuff-category.entity';

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

  @OneToMany(() => StuffCategoryEntity, (category) => category.userId)
  category: StuffCategoryEntity;
}
