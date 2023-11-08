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
    // TODO: rankを計算する処理を追加する
    // const rank = await this.calcCategoryRank();
    // console.log('rank', rank);
    const stuffCategory = this.stuffCategoryRepository.create({
      ...createStuffCategoryDto,
      rank: 2,
      // propertyRegistrationNumber: 2,
      // wantRegistrationNumber: 3,
      // wantTotalAmount: 1000,
    });
    await this.stuffCategoryRepository.save(stuffCategory);
    return stuffCategory;
  }

  public async calcCategoryRank() {
    // stuff_categoryのrankを計算する処理でcategoryのpropertyLimitedNumberの数が多い順にrankをつける
    const stuffCategories = await this.stuffCategoryRepository.find({
      // select: {
      //   propertyLimitedNumber: true,
      // },
      order: {
        propertyLimitedNumber: 'DESC',
      },
    });
    // console.log(stuffCategories);
    console.log('stuffCategories', stuffCategories);
    return stuffCategories;
  }

  async getStuffCategory() {
    // stuff_categoryを取得する処理
    return await this.stuffCategoryRepository.find();
  }
}
