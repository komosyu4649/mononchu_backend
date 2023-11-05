import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StuffCategoryEntity } from 'src/_entities/stuff-category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StuffService {
  constructor(
    @InjectRepository(StuffCategoryEntity)
    private readonly stuffCategoryRepository: Repository<StuffCategoryEntity>,
  ) {}

  async createStuffCategory(createStuffCategoryDto) {
    // stuff_categoryを作成する処理
    const stuffCategory = this.stuffCategoryRepository.create({
      ...createStuffCategoryDto,
      rank: 1,
    });
    await this.stuffCategoryRepository.save(stuffCategory);
    return stuffCategory;
  }

  async getStuffCategory() {
    // stuff_categoryを取得する処理
    return await this.stuffCategoryRepository.find();
  }
}
