import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StuffCategoryEntity } from 'src/_entities/stuff-category.entity';
import { Repository } from 'typeorm';
import { CreateStuffCategoryDto } from './dto/create-stuff-category.dto';
import { CreateStuffPropertyDto } from './dto/create-sruff-property.dto';
import { StuffPropertyEntity } from 'src/_entities/stuff-property.entity';
import { CreateStuffWantDto } from './dto/create-stuff-want.dto';
import { StuffWantEntity } from 'src/_entities/stuff-want.entity';
import { StuffWantConditions } from 'src/_entities/stuff-want-conditions.entity';

@Injectable()
export class StuffService {
  constructor(
    @InjectRepository(StuffCategoryEntity)
    private readonly stuffCategoryRepository: Repository<StuffCategoryEntity>,
    @InjectRepository(StuffPropertyEntity)
    private readonly stuffPropertyRepository: Repository<StuffPropertyEntity>,
    @InjectRepository(StuffWantEntity)
    private readonly stuffWantRepository: Repository<StuffWantEntity>,
    @InjectRepository(StuffWantConditions)
    private readonly stuffWantConditions: Repository<StuffWantConditions>,
  ) {}

  /** category */
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

  /** property */
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

  /** want */
  public async createStuffWant(
    createStuffWantDto: CreateStuffWantDto,
    categoryId: number,
  ) {
    const conditions = this.stuffWantConditions.create({
      ...createStuffWantDto.conditions,
    });
    await this.stuffWantConditions.save(conditions);
    console.log('conditions', conditions);
    const stuffWant = this.stuffWantRepository.create({
      ...createStuffWantDto,
      conditions,
      category: {
        id: categoryId,
      },
    });
    console.log('stuffWant', stuffWant);
    await this.stuffWantRepository.save(stuffWant);
    return stuffWant;
  }

  public async getStuffWant(categoryId: number) {
    const stuffWant = await this.stuffWantRepository.find({
      where: {
        category: {
          id: categoryId,
        },
      },
    });
    return stuffWant;
  }

  public async getStuffWantById(categoryId: number, id: number) {
    const stuffWant = await this.stuffWantRepository.findOne({
      where: {
        category: {
          id: categoryId,
        },
        id,
      },
      relations: ['conditions'],
    });
    return stuffWant;
  }

  public async editStuffWant(
    categoryId: number,
    id: number,
    createStuffWantDto: CreateStuffWantDto,
  ) {
    const stuffWant = await this.stuffWantRepository.findOne({
      where: {
        category: {
          id: categoryId,
        },
        // conditions: {
        //   id:
        // },
        id,
      },
      relations: ['conditions'],
    });
    stuffWant.name = createStuffWantDto.name;
    stuffWant.thumbnail = createStuffWantDto.thumbnail;
    stuffWant.score = createStuffWantDto.score;
    stuffWant.price = createStuffWantDto.price;
    stuffWant.brand = createStuffWantDto.brand;
    stuffWant.url = createStuffWantDto.url;
    // console.log('stuffWant.conditions.asset', stuffWant.conditions.asset);
    stuffWant.conditions.asset = 20;
    stuffWant.conditions.period = createStuffWantDto.conditions.period;
    stuffWant.conditions.property = createStuffWantDto.conditions.property;
    console.log('createStuffWantDto', createStuffWantDto);
    console.log('stuffWant', stuffWant);
    await this.stuffWantRepository.save(stuffWant);
  }
}
