import { IsString } from 'class-validator';

export class CreateStuffCategoryDto {
  @IsString()
  name: string;

  @IsString()
  icon: string;

  @IsString()
  propertyLimitedNumber: number;
}
