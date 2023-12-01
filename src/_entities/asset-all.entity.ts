import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { StuffCategoryEntity } from './stuff-category.entity';

@Entity('asset_all')
export class AssetAllEntity {
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

  @RelationId((assetAll: AssetAllEntity) => assetAll.category)
  categoryId: number;
}
