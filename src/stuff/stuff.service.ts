import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StuffCategoryEntity } from 'src/_entities/stuff-category.entity';
import { Repository } from 'typeorm';
import { CreateStuffCategoryDto } from './dto/create-stuff-category.dto';
import { CreateStuffPropertyDto } from './dto/create-sruff-property.dto';
import { StuffPropertyEntity } from 'src/_entities/stuff-property.entity';

@Injectable()
export class StuffService {
  constructor(
    @InjectRepository(StuffCategoryEntity)
    private readonly stuffCategoryRepository: Repository<StuffCategoryEntity>,
    @InjectRepository(StuffPropertyEntity)
    private readonly stuffPropertyRepository: Repository<StuffPropertyEntity>,
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

  public async createStuffProperty(
    createStuffPropertyDto: CreateStuffPropertyDto,
    categoryId: number,
  ) {
    const stuffProperty = this.stuffPropertyRepository.create({
      ...createStuffPropertyDto,
      category: {
        id: categoryId,
      },
    });
    await this.stuffPropertyRepository.save(stuffProperty);
  }

  public async getStuffProperty(
    categoryId: number,
  ): Promise<StuffPropertyEntity[]> {
    const stuffProperty = await this.stuffPropertyRepository.find({
      where: {
        category: {
          id: categoryId,
        },
      },
    });
    return stuffProperty;
  }

  public async getStuffPropertyById(
    categoryId: number,
    id: number,
  ): Promise<StuffPropertyEntity> {
    const stuffProperty = await this.stuffPropertyRepository.findOne({
      where: {
        category: {
          id: categoryId,
        },
        id,
      },
    });
    return stuffProperty;
  }

  public async editStuffProperty(
    categoryId: number,
    id: number,
    createStuffPropertyDto: CreateStuffPropertyDto,
  ) {
    const stuffProperty = await this.stuffPropertyRepository.findOne({
      where: {
        category: {
          id: categoryId,
        },
        id,
      },
    });
    stuffProperty.name = createStuffPropertyDto.name;
    stuffProperty.thumbnail = createStuffPropertyDto.thumbnail;
    stuffProperty.score = createStuffPropertyDto.score;
    stuffProperty.price = createStuffPropertyDto.price;
    stuffProperty.address = createStuffPropertyDto.address;
    stuffProperty.purchaseDate = createStuffPropertyDto.purchaseDate;
    stuffProperty.purchasePlace = createStuffPropertyDto.purchasePlace;
    await this.stuffPropertyRepository.save(stuffProperty);
  }

  public async deleteStuffProperty(categoryId: number, id: number) {
    const stuffProperty = await this.stuffPropertyRepository.findOne({
      where: {
        category: {
          id: categoryId,
        },
        id,
      },
    });
    await this.stuffPropertyRepository.remove(stuffProperty);
  }
}
