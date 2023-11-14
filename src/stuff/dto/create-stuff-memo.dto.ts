import { IsString } from 'class-validator';

export class CreateStuffMemoDto {
  @IsString()
  fiveW: string[];

  @IsString()
  image: string;

  @IsString()
  memo: string;
}
