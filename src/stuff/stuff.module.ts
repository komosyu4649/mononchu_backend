import { Module } from '@nestjs/common';
import { StuffController } from './stuff.controller';
import { StuffService } from './stuff.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StuffCategoryEntity } from 'src/_entities/stuff-category.entity';
import { StuffPropertyEntity } from 'src/_entities/stuff-property.entity';
import { StuffWantEntity } from 'src/_entities/stuff-want.entity';
import { StuffWantConditions } from 'src/_entities/stuff-want-conditions.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      StuffCategoryEntity,
      StuffPropertyEntity,
      StuffWantEntity,
      StuffWantConditions,
    ]),
  ],
  controllers: [StuffController],
  providers: [StuffService],
})
export class StuffModule {}
