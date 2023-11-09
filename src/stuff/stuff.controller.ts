import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
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

  @Get('category/calc')
  public async updateCategoryRanks() {
    return await this.stuffService.updateCategoryRanks();
  }

  @Get('category')
  public async getStuffCategory() {
    return await this.stuffService.getStuffCategory();
  }

  @Patch('category/edit/:id')
  public async editStuffCategory(
    @Param('id') id: number,
    @Body() createStuffCategoryDto: CreateStuffCategoryDto,
  ) {
    return await this.stuffService.editStuffCategory(
      id,
      createStuffCategoryDto,
    );
  }
}
