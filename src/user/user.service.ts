import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/_entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { hash } from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  public async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.findOne({
      where: { email: dto.email },
    });

    if (user) {
      throw new Error('User already exists');
    }

    const newUser = this.userRepository.create({
      ...dto,
      password: await hash(dto.password, 10),
    });

    // const { password, ...result } = newUser;
    // const { ...result } = newUser;
    // console.log(password, result);
    return await this.userRepository.save(newUser);
    // return result;
  }

  public async findByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email } });
  }

  public async findById(id: number) {
    return await this.userRepository.findOne({ where: { id } });
  }
}
