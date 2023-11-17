import { AssetProperty as IF } from './_types';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { StuffCategoryEntity } from './stuff-category.entity';

@Entity('asset_property')
export class AssetPropertyEntity implements IF {
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

  @RelationId((assetProperty: AssetPropertyEntity) => assetProperty.category)
  categoryId: number;
}
