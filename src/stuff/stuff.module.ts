import { Module } from '@nestjs/common';
import { StuffController } from './stuff.controller';
import { StuffService } from './stuff.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StuffCategoryEntity } from 'src/_entities/stuff-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StuffCategoryEntity])],
  controllers: [StuffController],
  providers: [StuffService],
})
export class StuffModule {}
