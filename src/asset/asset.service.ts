import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AssetPropertyEntity } from 'src/_entities/asset-proerty.entity';
import { StuffCategoryEntity } from 'src/_entities/stuff-category.entity';
import { StuffPropertyEntity } from 'src/_entities/stuff-property.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AssetService {
  constructor(
    @InjectRepository(AssetPropertyEntity)
    private readonly assetPropertyRepository: Repository<AssetPropertyEntity>,
    @InjectRepository(StuffCategoryEntity)
    private readonly stuffCategoryRepository: Repository<StuffCategoryEntity>,
    @InjectRepository(StuffPropertyEntity)
    private readonly stuffPropertyRepository: Repository<StuffPropertyEntity>,
  ) {}
  // stuff-propertyのカテゴリーからasset-propertyを作成する
  // MEMO: この処理を実行するタイミング
  public async getProperty() {
    // propertyからカテゴリーのみを取得
    const propertyCategories = await this.stuffCategoryRepository.find({
      select: ['id', 'name', 'propertyRegistrationNumber'],
      relations: ['properties'],
    });
    // カテゴリー毎に処理
    for (const category of propertyCategories) {
      const assetProperty = await this.assetPropertyRepository.create({
        name: category.name,
        price: category.properties.reduce((acc, cur) => acc + cur.price, 0),
        registrationNumber: category.propertyRegistrationNumber,
        category,
      });
      const existingAssetProperty = await this.assetPropertyRepository.findOne({
        where: { category: { id: category.id } },
      });
      if (existingAssetProperty) {
        await this.assetPropertyRepository.update(
          existingAssetProperty.id,
          assetProperty,
        );
      } else {
        await this.assetPropertyRepository.save(assetProperty);
      }
    }
  }
}
