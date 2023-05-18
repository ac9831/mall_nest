import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto, UserInfo } from '../dto/UserDto';
import { User } from '../entity';
import { Repository } from 'typeorm';
import * as uuid from 'uuid';
import { AuthService } from './AuthService';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private authService: AuthService,
  ) {}

  async getUserInfo(userId: number): Promise<UserInfo> {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException('유저가 존재하지 않습니다.');
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }

  async login(userDto: UserDto): Promise<string> {
    const user = await this.userRepository.findOne({
      where: {
        email: userDto.email,
        password: userDto.password,
      },
    });

    if (!user) throw new UnauthorizedException('존재하지 않은 사용자 입니다.');
    return this.authService.login({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  }

  async createUser(userDto: UserDto) {
    const userExist = await this.checkUserExists(userDto.email);
    if (userExist) {
      throw new UnprocessableEntityException('이미 존재하는 이메일입니다.');
    }

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
    const user = await this.userRepository.findOne({
      where: { signupVerifyToken },
    });

    if (!user) {
      throw new NotFoundException('유저가 존재하지 않습니다.');
    }

    return this.authService.login({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  }

  private async checkUserExists(email: string) {
    const user = await this.userRepository.findOne({
      where: { email: email },
    });

    return user !== undefined;
  }

  private async saveUser(userDto: UserDto, signupVerifyToken: string) {
    const user = new User(userDto);
    user.signupVerifyToken = signupVerifyToken;

    await this.userRepository.save(user);
  }

  private sendMemberJoinEmail(email, signupVerifyToken: string) {
    return;
  }
}
