import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/auth.dot';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('register')
  public async registerUser(@Body() dto: CreateUserDto) {
    console.log('dto', dto);
    return await this.userService.createUser(dto);
  }

  @Post('login')
  public async loginUser(@Body() dto: LoginDto) {
    return await this.authService.login(dto);
  }
}
