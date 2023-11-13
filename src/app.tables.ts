import { StuffCategoryEntity } from './_entities/stuff-category.entity';
import { StuffPropertyEntity } from './_entities/stuff-property.entity';
import { StuffWantConditions } from './_entities/stuff-want-conditions.entity';
import { StuffWantEntity } from './_entities/stuff-want.entity';

export const tables = [
  StuffCategoryEntity,
  StuffPropertyEntity,
  StuffWantEntity,
  StuffWantConditions,
];
