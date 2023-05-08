import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UserService } from '../services/UserService';
import { UserDto } from '../dto/UserDto';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from 'src/entity';
import { VerifyEmailDto } from 'src/dto/VerifyEmailDto';
import { UserInfo } from 'os';

@Controller('user')
@ApiTags('유저 API')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @HttpCode(201)
  @Post('/add')
  @ApiOperation({ summary: '유저 생성 API' })
  @ApiCreatedResponse({ description: '유저를 생성한다.', type: User })
  public add(@Body() user: UserDto) {
    return this.userService.createUser(user);
  }

  @Get('/:userId')
  @ApiOperation({ summary: '유저 정보 API' })
  @ApiCreatedResponse({ description: '유저 정보 하나를 가져온다.', type: User })
  public getUserInfo(@Param('userId') id: number) {
    return this.userService.getUserInfo(id);
  }

  @Post('/login')
  @ApiOperation({ summary: '유저 로그인 API' })
  @ApiCreatedResponse({ description: '로그인을 진행한다.', type: User })
  public login(@Body() userLogin: UserDto): Promise<User> {
    return this.userService.login(userLogin);
  }

  @Post('/email-verify')
  @ApiOperation({ summary: '이메일 검증' })
  @ApiCreatedResponse({ description: '이메일을 검증한다.', type: String })
  public async verifyEmail(@Query() dto: VerifyEmailDto): Promise<string> {
    const { signupVerifyToken } = dto;

    return await this.userService.verifyEmail(signupVerifyToken);
  }

  @Delete('/user/delete')
  @ApiOperation({ summary: '찜 삭제 API' })
  @ApiCreatedResponse({ description: '찜 하나를 해제합니다.' })
  public deleteZzim(@Param('id') id: number) {
    return this.userService.delete(id);
  }

  @HttpCode(202)
  @Patch(':id')
  public update(@Param('id') id: number, @Body() updateUserDto: UserDto) {
    return this.userService.update(id, updateUserDto);
  }
}
