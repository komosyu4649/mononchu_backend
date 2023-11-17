import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { StuffCategory as IF } from './_types';
import { StuffPropertyEntity } from './stuff-property.entity';
import { StuffWantEntity } from './stuff-want.entity';
import { AssetPropertyEntity } from './asset-proerty.entity';
import { AssetWantEntity } from './asset-want.entity';

@Entity('stuff_category')
export class StuffCategoryEntity implements IF {
  @PrimaryGeneratedColumn({})
  id: number;

  @Column({ nullable: true })
  rank: number;

  @Column()
  name: string;

  @Column()
  icon: string;

  @Column()
  propertyLimitedNumber: number;

  @Column({ nullable: true })
  propertyRegistrationNumber: number;

  @Column({ nullable: true })
  wantRegistrationNumber: number;

  @Column({ nullable: true })
  wantTotalAmount: number;

  @OneToMany(() => StuffPropertyEntity, (property) => property.category)
  properties: StuffPropertyEntity[];

  @OneToMany(() => StuffWantEntity, (want) => want.category)
  wants: StuffWantEntity[];

  @OneToOne(
    () => AssetPropertyEntity,
    (assetProperty) => assetProperty.category,
  )
  @JoinColumn({ name: 'asset_property_id' })
  assetProperty: AssetPropertyEntity;

  @OneToMany(() => AssetWantEntity, (want) => want.category)
  @JoinColumn({ name: 'asset_want_id' })
  assetWants: AssetWantEntity[];
}
