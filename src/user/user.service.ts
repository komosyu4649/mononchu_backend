import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/_entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  public async createUser(dto: CreateUserDto) {
    const user = this.userRepository.findOne({
      where: { email: dto.email },
    });

    if (user) {
      throw new Error('User already exists');
    }

    const newUser = this.userRepository.create({
      ...dto,
      email: await hash(dto.password, 10),
    });

    // const { password, ...result } = newUser;
    const { ...result } = newUser;
    return result;
  }
}
