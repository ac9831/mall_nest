import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from '../dto/UserDto';
import { User } from '../entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    this.userRepository = userRepository;
  }

  async findOne(userId: number) {
    return await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });
  }

  async login(userDto: UserDto) {
    const user = await this.userRepository.findOne({
      where: {
        email: userDto.email,
        password: userDto.password,
      },
    });

    if (user) {
      return user;
    } else {
      return null;
    }
  }

  async save(userDto: UserDto) {
    const user = new User();
    user.email = userDto.email;
    user.password = userDto.password;
    return await this.userRepository.save(user);
  }

  async delete(id: number) {
    const user = await this.userRepository.findOne({
      where: {
        id: id,
      },
    });
    return this.userRepository.delete(user);
  }
}
