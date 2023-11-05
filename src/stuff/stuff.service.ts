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
      property: {
        registrationNumber: 5,
        limitedNumber: 12,
      },
      want: {
        registrationNumber: 3,
        totalAmount: 10000,
      },
    });
    console.log('stuffCategory', stuffCategory);
    // await this.stuffCategoryRepository.save(stuffCategory);
    // return stuffCategory;
  }

  async calcCategoryRank() {
    // stuff_categoryのrankを計算する処理
  }

  async getStuffCategory() {
    // stuff_categoryを取得する処理
    return await this.stuffCategoryRepository.find();
  }
}
