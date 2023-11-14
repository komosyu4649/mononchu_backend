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
import { CreateStuffPropertyDto } from './dto/create-sruff-property.dto';
import { CreateStuffWantDto } from './dto/create-stuff-want.dto';
import { CreateStuffMemoDto } from './dto/create-stuff-memo.dto';

@Controller('stuff')
export class StuffController {
  constructor(private readonly stuffService: StuffService) {}

  /** category */
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

  /** property */
  @Post('property/create/:categoryId')
  public async createStuffProperty(
    @Body() createStuffPropertyDto: CreateStuffPropertyDto,
    @Param('categoryId') categoryId: number,
  ) {
    return await this.stuffService.createStuffProperty(
      createStuffPropertyDto,
      categoryId,
    );
  }

  @Get('property/:categoryId')
  public async getStuffProperty(@Param('categoryId') categoryId: number) {
    return await this.stuffService.getStuffProperty(categoryId);
  }

  @Get('property/:categoryId/:id')
  public async getStuffPropertyById(
    @Param('categoryId') categoryId: number,
    @Param('id') id: number,
  ) {
    return await this.stuffService.getStuffPropertyById(categoryId, id);
  }

  @Patch('property/edit/:categoryId/:id')
  public async editStuffProperty(
    @Param('categoryId') categoryId: number,
    @Param('id') id: number,
    @Body() createStuffPropertyDto: CreateStuffPropertyDto,
  ) {
    return await this.stuffService.editStuffProperty(
      categoryId,
      id,
      createStuffPropertyDto,
    );
  }

  @Delete('property/delete/:categoryId/:id')
  public async deleteStuffProperty(
    @Param('categoryId') categoryId: number,
    @Param('id') id: number,
  ) {
    return await this.stuffService.deleteStuffProperty(categoryId, id);
  }

  /** want */
  @Post('want/create/:categoryId')
  public async createStuffWant(
    @Body() createStuffWantDto: CreateStuffWantDto,
    @Param('categoryId') categoryId: number,
  ) {
    return await this.stuffService.createStuffWant(
      createStuffWantDto,
      categoryId,
    );
  }

  @Get('want/:categoryId')
  public async getStuffWant(@Param('categoryId') categoryId: number) {
    return await this.stuffService.getStuffWant(categoryId);
  }

  @Get('want/:categoryId/:id')
  public async getStuffWantById(
    @Param('categoryId') categoryId: number,
    @Param('id') id: number,
  ) {
    return await this.stuffService.getStuffWantById(categoryId, id);
  }

  @Patch('want/edit/:categoryId/:id')
  public async editStuffWant(
    @Param('categoryId') categoryId: number,
    @Param('id') id: number,
    @Body() createStuffWantDto: CreateStuffWantDto,
  ) {
    return await this.stuffService.editStuffWant(
      categoryId,
      id,
      createStuffWantDto,
    );
  }

  @Delete('want/delete/:categoryId/:id')
  public async deleteStuffWant(
    @Param('categoryId') categoryId: number,
    @Param('id') id: number,
  ) {
    return await this.stuffService.deleteStuffWant(categoryId, id);
  }

  // 欲しいモノから所有しているモノへ移行
  @Post('want/to-property/:categoryId/:id')
  public async moveStuffWantToStuffProperty(
    @Param('categoryId') categoryId: number,
    @Param('id') id: number,
    @Body() createStuffPropertyDto: CreateStuffPropertyDto,
  ) {
    return await this.stuffService.moveStuffWantToStuffProperty(
      categoryId,
      id,
      createStuffPropertyDto,
    );
  }

  // 所有しているモノにメモ
  @Post('property/memo/create/:categoryId/:itemId')
  public async createStuffMemoProperty(
    @Param('categoryId') categoryId: number,
    @Param('itemId') itemId: number,
    @Body() createStuffMemoDto: CreateStuffMemoDto,
  ) {
    return await this.stuffService.createStuffMemoProperty(
      categoryId,
      itemId,
      createStuffMemoDto,
    );
  }
}
