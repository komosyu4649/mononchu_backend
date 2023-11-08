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
    // stuff_categoryを作成する処理
    const rank = await this.calcCategoryRank();
    const stuffCategory = this.stuffCategoryRepository.create({
      ...createStuffCategoryDto,
      rank: rank,
    });
    await this.stuffCategoryRepository.save(stuffCategory);
    return stuffCategory;
  }

  public async calcCategoryRank() {
    // stuff_categoryのrankを計算する処理でcategoryのpropertyLimitedNumberの数が多い順にrankをつける
    const items = await this.stuffCategoryRepository.find({
      order: {
        propertyLimitedNumber: 'DESC',
      },
    });
    items.forEach((item, index) => {
      item.rank = index + 1;
    });
    return items;
  }

  async getStuffCategory() {
    // stuff_categoryを取得する処理
    return await this.stuffCategoryRepository.find();
  }
}
