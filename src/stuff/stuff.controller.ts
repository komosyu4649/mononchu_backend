import { Body, Controller, Get, Post } from '@nestjs/common';
import { StuffService } from './stuff.service';
import { CreateStuffCategoryDto } from './dto/create-stuff-category.dto';

@Controller('stuff')
export class StuffController {
  constructor(private readonly stuffService: StuffService) {}

  @Post('category/create')
  public async createStuffCategory(
    @Body() createStuffCategoryDto: CreateStuffCategoryDto,
  ) {
    return await this.stuffService.createStuffCategory(createStuffCategoryDto);
  }

  @Get('category')
  public async getStuffCategory() {
    return await this.stuffService.getStuffCategory();
  }
}
