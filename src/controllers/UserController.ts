import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../services/UserService';
import { UserDto } from '../dto/UserDto';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from 'src/entity';

@Controller()
@ApiTags('유저 API')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/user/add')
  @ApiOperation({ summary: '유저 생성 API' })
  @ApiCreatedResponse({ description: '유저를 생성한다.', type: User })
  public add(@Body() user: UserDto) {
    return this.userService.save(user);
  }

  @Get('/user/:userId')
  @ApiOperation({ summary: '유저 정보 API' })
  @ApiCreatedResponse({ description: '유저 정보 하나를 가져온다.', type: User })
  public getUser(@Param('userId') id: number) {
    return this.userService.findOne(id);
  }

  @Post('/user/login')
  @ApiOperation({ summary: '유저 로그인 API' })
  @ApiCreatedResponse({ description: '로그인을 진행한다..', type: User })
  public login(@Body() userLogin: UserDto) {
    const result = this.userService.login(userLogin);
    if (result) {
      return result;
    } else {
      return new UnauthorizedException('존재하지 않은 사용자 입니다.');
    }
  }

  @Delete('/user/delete')
  @ApiOperation({ summary: '찜 삭제 API' })
  @ApiCreatedResponse({ description: '찜 하나를 해제합니다.' })
  public deleteZzim(@Param('id') id: number) {
    return this.userService.delete(id);
  }
}
