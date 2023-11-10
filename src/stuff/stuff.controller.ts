import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
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

  @Get('category/:id')
  public async getStuffCategoryById(@Param('id') id: number) {
    return await this.stuffService.getStuffCategoryById(id);
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

  @Delete('category/delete/:id')
  public async deleteStuffCategory(@Param('id') id: number) {
    return await this.stuffService.deleteStuffCategory(id);
  }

  @Post('property/create')
  public async createStuffProperty(@Body() createStuffPropertyDto: any) {
    return await this.stuffService.createStuffProperty(createStuffPropertyDto);
  }
}
