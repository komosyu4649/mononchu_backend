import { IsNumber, IsString } from 'class-validator';

export class CreateStuffPropertyDto {
  @IsString()
  name: string;

  @IsString()
  thumbnail: string;

  @IsNumber()
  score: number;

  @IsNumber()
  price: number;

  @IsString()
  address: string;

  @IsString()
  purchaseDate: string;

  @IsString()
  purchasePlace: string;
}
