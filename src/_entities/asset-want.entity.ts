import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { StuffCategoryEntity } from './stuff-category.entity';

@Entity('asset_want')
export class AssetWantEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  price: number;

  @Column({ nullable: true })
  registrationNumber: number;

  @OneToOne(() => StuffCategoryEntity, (category) => category.assetProperty)
  @JoinColumn({ name: 'category_id' })
  category: StuffCategoryEntity;
}
