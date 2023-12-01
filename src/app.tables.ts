import { AssetAllEntity } from './_entities/asset-all.entity';
import { AssetPropertyEntity } from './_entities/asset-proerty.entity';
import { AssetWantEntity } from './_entities/asset-want.entity';
import { StuffCategoryEntity } from './_entities/stuff-category.entity';
import { StuffMemoPropertyEntity } from './_entities/stuff-memo-property.entity';
import { StuffMemoWantEntity } from './_entities/stuff-memo-want.entity';
import { StuffPropertyEntity } from './_entities/stuff-property.entity';
import { StuffWantConditions } from './_entities/stuff-want-conditions.entity';
import { StuffWantEntity } from './_entities/stuff-want.entity';

export const tables = [
  StuffCategoryEntity,
  StuffPropertyEntity,
  StuffWantEntity,
  StuffWantConditions,
  StuffMemoPropertyEntity,
  StuffMemoWantEntity,
  AssetPropertyEntity,
  AssetWantEntity,
  AssetAllEntity,
];
