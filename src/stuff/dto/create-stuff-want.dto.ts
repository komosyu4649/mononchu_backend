import { IsJSON, IsNumber, IsString } from 'class-validator';

export class CreateStuffWantDto {
  @IsString()
  name: string;

  @IsString()
  thumbnail: string;

  @IsNumber()
  score: number;

  @IsNumber()
  price: number;

  @IsString()
  brand: string;

  @IsString()
  url: string;

  @IsJSON()
  conditions: {
    asset: string;
    period: string;
    property: number;
  };
}
