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

  public async createStuffCategory(createStuffCategoryDto) {
    const stuffCategory = this.stuffCategoryRepository.create({
      ...createStuffCategoryDto,
    });
    await this.stuffCategoryRepository.save(stuffCategory);
    await this.updateCategoryRanks();
    return stuffCategory;
  }

  public async updateCategoryRanks() {
    const items = await this.stuffCategoryRepository.find({
      order: {
        propertyLimitedNumber: 'DESC',
      },
    });
    let rank = 1;
    for (const item of items) {
      item.rank = rank++;
      await this.stuffCategoryRepository.save(item);
    }
  }

  async getStuffCategory() {
    // stuff_categoryを取得する処理
    return await this.stuffCategoryRepository.find();
  }
}
