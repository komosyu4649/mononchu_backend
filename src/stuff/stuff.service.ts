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
import { StuffMemoPropertyEntity } from 'src/_entities/stuff-memo-property.entity';
import { CreateStuffMemoDto } from './dto/create-stuff-memo.dto';
import { StuffMemoWantEntity } from 'src/_entities/stuff-memo-want.entity';

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
    @InjectRepository(StuffMemoPropertyEntity)
    private readonly stuffMemoPropertyRepository: Repository<StuffMemoPropertyEntity>,
    @InjectRepository(StuffMemoWantEntity)
    private readonly stuffMemoWantRepository: Repository<StuffMemoWantEntity>,
  ) {}

  /** category */
  public async createStuffCategory(
    createStuffCategoryDto: CreateStuffCategoryDto,
  ) {
    // console.log('createStuffCategoryDto', createStuffCategoryDto);
    const stuffCategory = this.stuffCategoryRepository.create({
      ...createStuffCategoryDto,
    });
    // console.log('stuffCategory', stuffCategory);
    const { userId } = createStuffCategoryDto;
    await this.stuffCategoryRepository.save(stuffCategory);
    await this.updateCategoryRanks(userId);
    return stuffCategory;
  }

  public async getStuffUserCategory(userId: number) {
    // console.log('userId', userId);
    // stuff_categoryを取得する処理
    const stuffCategories = await this.stuffCategoryRepository.find({
      where: {
        userId,
      },
      order: {
        rank: 'ASC',
      },
    });
    // console.log('stuffCategories', stuffCategories);
    // categoryごとのwantTotalAmountを計算する
    for (const stuffCategory of stuffCategories) {
      const stuffWantTotalAmount = await this.stuffWantRepository.find({
        where: {
          category: {
            id: stuffCategory.id,
          },
        },
      });
      stuffCategory.wantTotalAmount = stuffWantTotalAmount.reduce(
        (acc, cur) => acc + cur.price,
        0,
      );
    }

    return stuffCategories;
  }

  public async getStuffCategoryById(id: number) {
    const stuffCategory = await this.stuffCategoryRepository.findOne({
      where: {
        id,
      },
      // relations: ['properties', 'wants'],
    });
    // console.log('stuffCategory', stuffCategory);
    // wantTotalAmountを計算する
    const stuffWantTotalAmount = await this.stuffWantRepository.find({
      where: {
        category: {
          id,
        },
      },
    });
    stuffCategory.wantTotalAmount = stuffWantTotalAmount.reduce(
      (acc, cur) => acc + cur.price,
      0,
    );
    // console.log('stuffWantTotalAmount', stuffWantTotalAmount);
    return stuffCategory;
  }

  public async updateCategoryRanks(userId) {
    const items = await this.stuffCategoryRepository.find({
      where: {
        userId,
      },
      order: {
        propertyLimitedNumber: 'DESC',
      },
    });
    // console.log('update', items);
    let rank = 1;
    for (const item of items) {
      item.rank = rank++;
      await this.stuffCategoryRepository.save(item);
    }
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

  public async deleteStuffCategory(userId: number, id: number) {
    console.log('userId', userId);
    console.log('id', id);
    const stuffCategory = await this.stuffCategoryRepository.findOne({
      where: {
        userId,
        id,
      },
    });
    console.log('stuffCategory', stuffCategory);
    await this.stuffCategoryRepository.remove(stuffCategory);
  }

  /** property */
  public async createStuffProperty(
    createStuffPropertyDto: CreateStuffPropertyDto,
    categoryId: number,
  ) {
    const stuffCategory = await this.getStuffCategoryById(categoryId);
    const stuffPropertyItemCount =
      await this.getStuffPropertyItemCount(categoryId);
    // propertyLimitedNumberを超えている場合はエラーを返す
    if (
      stuffPropertyItemCount >= stuffCategory.propertyLimitedNumber &&
      stuffCategory.propertyLimitedNumber !== 0
    ) {
      throw new Error('stuffPropertyItemCount is over propertyLimitedNumber');
    }
    const stuffProperty = this.stuffPropertyRepository.create({
      ...createStuffPropertyDto,
      category: {
        id: categoryId,
      },
    });
    // 追加時には、categoryのpropertyRegistrationNumberを更新する
    stuffCategory.propertyRegistrationNumber = stuffPropertyItemCount + 1;
    await this.stuffCategoryRepository.save(stuffCategory);
    await this.stuffPropertyRepository.save(stuffProperty);
  }

  public async getStuffProperty(
    categoryId: number,
    limit?: number,
  ): Promise<StuffPropertyEntity[]> {
    const stuffProperty = await this.stuffPropertyRepository.find({
      where: {
        category: {
          id: categoryId,
        },
      },
      take: limit,
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
    const stuffCategory = await this.getStuffCategoryById(categoryId);
    const stuffPropertyItemCount =
      await this.getStuffPropertyItemCount(categoryId);
    const stuffProperty = await this.stuffPropertyRepository.findOne({
      where: {
        category: {
          id: categoryId,
        },
        id,
      },
    });
    // 削除時には、categoryのwantRegistrationNumberを更新する
    stuffCategory.propertyRegistrationNumber = stuffPropertyItemCount - 1;
    await this.stuffCategoryRepository.save(stuffCategory);
    await this.stuffPropertyRepository.remove(stuffProperty);
  }

  public async getStuffPropertyItemCount(categoryId: number) {
    const stuffPropertyItemCount = await this.stuffPropertyRepository.count({
      where: {
        category: {
          id: categoryId,
        },
      },
    });
    return stuffPropertyItemCount;
  }

  /** want */
  public async createStuffWant(
    createStuffWantDto: CreateStuffWantDto,
    categoryId: number,
  ) {
    // const stuffCategory = await this.getStuffCategoryById(categoryId);
    // const stuffWantItemCount = await this.getStuffWantItemCount(categoryId);
    const conditions = this.stuffWantConditions.create({
      ...createStuffWantDto.conditions,
    });
    await this.stuffWantConditions.save(conditions);
    const stuffWant = this.stuffWantRepository.create({
      ...createStuffWantDto,
      conditions,
      category: {
        id: categoryId,
      },
    });
    // 追加時には、categoryのwantRegistrationNumber/wantTotalAmountを更新する
    // stuffCategory.wantRegistrationNumber = stuffWantItemCount + 1;
    // stuffCategory.wantTotalAmount = 0;
    // console.log(stuffCategory, stuffWant);
    // stuffCategory.wantTotalAmount + stuffWant.price;
    // await this.stuffCategoryRepository.save(stuffCategory);
    await this.stuffWantRepository.save(stuffWant);
    return stuffWant;
  }

  public async getStuffWant(categoryId: number, limit?: number) {
    const stuffWant = await this.stuffWantRepository.find({
      where: {
        category: {
          id: categoryId,
        },
      },
      take: limit,
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
    await this.stuffWantConditions.update(
      { id: stuffWant.conditions.id },
      { ...createStuffWantDto.conditions },
    );
    // // 更新時には、categoryのwantRegistrationNumber/wantTotalAmountを更新する
    // const stuffCategory = await this.getStuffCategoryById(categoryId);
    // stuffCategory.wantTotalAmount =
    //   stuffCategory.wantTotalAmount - stuffWant.price;
    await this.stuffWantRepository.save(stuffWant);
  }

  public async deleteStuffWant(categoryId: number, id: number) {
    // const stuffCategory = await this.getStuffCategoryById(categoryId);
    // const stuffWantItemCount = await this.getStuffWantItemCount(categoryId);
    const stuffWant = await this.stuffWantRepository.findOne({
      where: {
        category: {
          id: categoryId,
        },
        id,
      },
    });
    // // 削除時には、categoryのwantRegistrationNumber/wantTotalAmountを更新する
    // stuffCategory.wantRegistrationNumber = stuffWantItemCount - 1;
    // stuffCategory.wantTotalAmount =
    //   stuffCategory.wantTotalAmount - stuffWant.price;
    // await this.stuffCategoryRepository.save(stuffCategory);
    await this.stuffWantRepository.remove(stuffWant);
  }

  public async moveStuffWantToStuffProperty(
    categoryId: number,
    id: number,
    createStuffPropertyDto: CreateStuffPropertyDto,
  ) {
    const stuffWant = await this.stuffWantRepository.findOne({
      where: {
        category: {
          id: categoryId,
        },
        id,
      },
    });
    const stuffProperty = this.stuffPropertyRepository.create({
      ...createStuffPropertyDto,
      category: {
        id: categoryId,
      },
    });
    await this.stuffPropertyRepository.save(stuffProperty);
    await this.stuffWantRepository.remove(stuffWant);
  }

  public async getStuffWantItemCount(categoryId: number) {
    const stuffWantItemCount = await this.stuffWantRepository.count({
      where: {
        category: {
          id: categoryId,
        },
      },
    });
    return stuffWantItemCount;
  }

  // 所有しているモノにメモ
  public async createStuffMemoProperty(
    categoryId: number,
    itemId: number,
    createStuffMemoDto: CreateStuffMemoDto,
  ) {
    const stuffProperty = await this.stuffPropertyRepository.findOne({
      where: {
        category: {
          id: categoryId,
        },
        id: itemId,
      },
    });
    const stuffMemoProperty = this.stuffMemoPropertyRepository.create({
      ...createStuffMemoDto,
      property: stuffProperty,
    });
    await this.stuffMemoPropertyRepository.save(stuffMemoProperty);
  }

  public async getStuffMemoProperty(categoryId: number, itemId: number) {
    const stuffMemoProperty = await this.stuffMemoPropertyRepository.find({
      where: {
        property: {
          category: {
            id: categoryId,
          },
          id: itemId,
        },
      },
    });
    return stuffMemoProperty;
  }

  public async getStuffMemoPropertyById(
    categoryId: number,
    itemId: number,
    id: number,
  ) {
    const stuffMemoProperty = await this.stuffMemoPropertyRepository.findOne({
      where: {
        property: {
          category: {
            id: categoryId,
          },
          id: itemId,
        },
        id,
      },
    });
    return stuffMemoProperty;
  }

  public async editStuffMemoProperty(
    categoryId: number,
    itemId: number,
    id: number,
    createStuffMemoDto: CreateStuffMemoDto,
  ) {
    const stuffMemoProperty = await this.stuffMemoPropertyRepository.findOne({
      where: {
        property: {
          category: {
            id: categoryId,
          },
          id: itemId,
        },
        id,
      },
    });
    stuffMemoProperty.fiveW = createStuffMemoDto.fiveW;
    stuffMemoProperty.image = createStuffMemoDto.image;
    stuffMemoProperty.memo = createStuffMemoDto.memo;
    // console.log('stuffMemoProperty', stuffMemoProperty);
    await this.stuffMemoPropertyRepository.save(stuffMemoProperty);
  }

  public async deleteStuffMemoProperty(
    categoryId: number,
    itemId: number,
    id: number,
  ) {
    const stuffMemoProperty = await this.stuffMemoPropertyRepository.findOne({
      where: {
        property: {
          category: {
            id: categoryId,
          },
          id: itemId,
        },
        id,
      },
    });
    await this.stuffMemoPropertyRepository.remove(stuffMemoProperty);
  }

  // 欲しいモノにメモ
  public async createStuffMemoWant(
    categoryId: number,
    itemId: number,
    createStuffMemoDto: CreateStuffMemoDto,
  ) {
    const stuffWant = await this.stuffWantRepository.findOne({
      where: {
        category: {
          id: categoryId,
        },
        id: itemId,
      },
    });
    // console.log(
    //   'createStuffMemoDto',
    //   createStuffMemoDto,
    //   'stuffWant',
    //   stuffWant,
    // );
    const stuffMemoWant = this.stuffMemoWantRepository.create({
      ...createStuffMemoDto,
      want: stuffWant,
    });
    await this.stuffMemoWantRepository.save(stuffMemoWant);
  }

  public async getStuffMemoWant(categoryId: number, itemId: number) {
    const stuffMemoWant = await this.stuffMemoWantRepository.find({
      where: {
        want: {
          category: {
            id: categoryId,
          },
          id: itemId,
        },
      },
    });
    return stuffMemoWant;
  }

  public async getStuffMemoWantById(
    categoryId: number,
    itemId: number,
    id: number,
  ) {
    const stuffMemoWant = await this.stuffMemoWantRepository.findOne({
      where: {
        want: {
          category: {
            id: categoryId,
          },
          id: itemId,
        },
        id,
      },
    });
    return stuffMemoWant;
  }

  public async editStuffMemoWant(
    categoryId: number,
    itemId: number,
    id: number,
    createStuffMemoDto: CreateStuffMemoDto,
  ) {
    const stuffMemoWant = await this.stuffMemoWantRepository.findOne({
      where: {
        want: {
          category: {
            id: categoryId,
          },
          id: itemId,
        },
        id,
      },
    });
    stuffMemoWant.fiveW = createStuffMemoDto.fiveW;
    stuffMemoWant.image = createStuffMemoDto.image;
    stuffMemoWant.memo = createStuffMemoDto.memo;
    await this.stuffMemoWantRepository.save(stuffMemoWant);
  }

  public async deleteStuffMemoWant(
    categoryId: number,
    itemId: number,
    id: number,
  ) {
    const stuffMemoWant = await this.stuffMemoWantRepository.findOne({
      where: {
        want: {
          category: {
            id: categoryId,
          },
          id: itemId,
        },
        id,
      },
    });
    await this.stuffMemoWantRepository.remove(stuffMemoWant);
  }
}
