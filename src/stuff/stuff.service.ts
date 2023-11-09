import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StuffCategoryEntity } from 'src/_entities/stuff-category.entity';
import { Repository } from 'typeorm';
import { CreateStuffCategoryDto } from './dto/create-stuff-category.dto';

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

  public async getStuffCategoryById(id: number) {
    return await this.stuffCategoryRepository.findOne({
      where: {
        id,
      },
    });
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

  public async getStuffCategory() {
    // stuff_categoryを取得する処理
    return await this.stuffCategoryRepository.find();
  }

  public async editStuffCategory(
    id: number,
    createStuffCategoryDto: CreateStuffCategoryDto,
  ) {
    // stuff_categoryを更新する処理
    const stuffCategory = await this.stuffCategoryRepository.findOne({
      where: {
        id,
      },
    });
    stuffCategory.name = createStuffCategoryDto.name;
    stuffCategory.icon = createStuffCategoryDto.icon;
    stuffCategory.propertyLimitedNumber =
      createStuffCategoryDto.propertyLimitedNumber;
    await this.stuffCategoryRepository.save(stuffCategory);
  }

  public async deleteStuffCategory(id: number) {
    const stuffCategory = await this.stuffCategoryRepository.findOne({
      where: {
        id,
      },
    });
    await this.stuffCategoryRepository.remove(stuffCategory);
  }
}
