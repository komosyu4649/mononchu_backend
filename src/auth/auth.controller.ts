import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
  constructor(private userService: UserService) {}

  @Post('register')
  public async registerUser(@Body() dto: CreateUserDto) {
    return await this.userService.createUser(dto);
  }
}
