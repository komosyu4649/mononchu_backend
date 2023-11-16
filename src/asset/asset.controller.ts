import { Controller, Get } from '@nestjs/common';
import { AssetService } from './asset.service';

@Controller('asset')
export class AssetController {
  constructor(private readonly assetService: AssetService) {}
  // stuff-propertyのカテゴリーからasset-propertyを作成する
  @Get('property')
  public async getProperty() {
    return await this.assetService.getProperty();
  }
}
