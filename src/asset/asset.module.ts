import { Module } from '@nestjs/common';
import { AssetController } from './asset.controller';
import { AssetService } from './asset.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssetPropertyEntity } from 'src/_entities/asset-proerty.entity';
import { StuffCategoryEntity } from 'src/_entities/stuff-category.entity';
import { StuffPropertyEntity } from 'src/_entities/stuff-property.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AssetPropertyEntity,
      StuffCategoryEntity,
      StuffPropertyEntity,
    ]),
  ],
  controllers: [AssetController],
  providers: [AssetService],
})
export class AssetModule {}
