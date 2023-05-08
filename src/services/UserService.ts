import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from '../dto/UserDto';
import { User } from '../entity';
import { Repository } from 'typeorm';
import * as uuid from 'uuid';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    this.userRepository = userRepository;
  }

  async getUserInfo(userId: number) {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

    return user;
  }

  async login(userDto: UserDto) {
    const user = await this.userRepository.findOne({
      where: {
        email: userDto.email,
        password: userDto.password,
      },
    });

    if (!user) throw new UnauthorizedException('존재하지 않은 사용자 입니다.');
    return user;
  }

  async createUser(userDto: UserDto) {
    await this.checkUserExists(userDto.email);

    const signupVerifyToken = uuid.v1();

    await this.saveUser(userDto, signupVerifyToken);
    await this.sendMemberJoinEmail(userDto.email, signupVerifyToken);
  }

  async delete(id: number) {
    const user = await this.userRepository.findOne({
      where: {
        id: id,
      },
    });
    return await this.userRepository.delete(user);
  }

  async update(id: number, userDto: UserDto) {
    if (this.userRepository.findOne({ where: { id: id } })) {
      return new BadRequestException('존재하지 않는 사용자 입니다.');
    }
    return await this.userRepository.update(+id, userDto);
  }

  async verifyEmail(signupVerifyToken: string): Promise<string> {
    throw new Error('');
  }

  private checkUserExists(email: string) {
    return false;
  }

  private saveUser(user: UserDto, signupVerifyToken: string) {
    return;
  }

  private sendMemberJoinEmail(email, signupVerifyToken: string) {
    return;
  }
}
