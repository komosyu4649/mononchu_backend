import { IsNumber, IsString } from 'class-validator';

export class CreateStuffCategoryDto {
  @IsString()
  name: string;

  @IsString()
  icon: string;

  @IsNumber()
  propertyLimitedNumber: number;
}
