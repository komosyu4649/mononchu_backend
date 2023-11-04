import { Controller, Get } from '@nestjs/common';

@Controller('stuff')
export class StuffController {
  constructor() {}

  @Get()
  public async getStuff() {
    return 'stuff';
  }
}
