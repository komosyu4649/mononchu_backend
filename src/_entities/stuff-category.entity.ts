import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { StuffCategory as IF } from './_types';
import { StuffPropertyEntity } from './stuff-property.entity';
import { StuffWantEntity } from './stuff-want.entity';
import { AssetPropertyEntity } from './asset-proerty.entity';
import { AssetWantEntity } from './asset-want.entity';
import { AssetAllEntity } from './asset-all.entity';
import { UserEntity } from './user.entity';

@Entity('stuff_category')
export class StuffCategoryEntity implements IF {
  @PrimaryGeneratedColumn({})
  id: number;

  @Column({ nullable: true })
  rank: number;

  @Column()
  name: string;

  @Column({ nullable: true })
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

  @OneToOne(() => AssetWantEntity, (assetWants) => assetWants.category)
  @JoinColumn({ name: 'asset_want_id' })
  assetWants: AssetWantEntity;

  @OneToOne(() => AssetAllEntity, (assetAll) => assetAll.category)
  @JoinColumn({ name: 'asset_all_id' })
  assetAll: AssetAllEntity;

  @Column({ name: 'user_id', nullable: true }) // Change this line
  userId: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: UserEntity;
}
