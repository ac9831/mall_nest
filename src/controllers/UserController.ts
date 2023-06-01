import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Inject,
  Logger,
  LoggerService,
  Param,
  Patch,
  Post,
  Query,
  UseFilters,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from '../services/UserService';
import { UserDto, UserInfo } from '../dto/UserDto';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from 'src/entity';
import { VerifyEmailDto } from 'src/dto/VerifyEmailDto';
import { AuthGuard } from 'src/middleware/AuthGuard';
import { Roles } from 'src/decorator/Role';
import { stringify } from 'querystring';
import { HttpExceptionFilter } from 'src/middleware/HttpExceptionFilter';
import { CommandBus } from '@nestjs/cqrs';
import { CreateUserCommand } from 'src/cqrs/CreateUserCommand';

@Roles('user')
@Controller('user')
@ApiTags('유저 API')
export class UserController {
  constructor(
    private commandBus: CommandBus,
    private readonly userService: UserService,
    @Inject(Logger) private readonly logger: LoggerService,
  ) {}

  @HttpCode(201)
  @Post('/add')
  @Roles('admin')
  @ApiOperation({ summary: '유저 생성 API' })
  @ApiCreatedResponse({ description: '유저를 생성한다.', type: User })
  public add(@Body(ValidationPipe) user: UserDto) {
    this.printLoggerServiceLog(user);
    return this.userService.createUser(user);
  }

  @UseGuards(AuthGuard)
  @Get('/:userId')
  @ApiOperation({ summary: '유저 정보 API' })
  @ApiCreatedResponse({ description: '유저 정보 하나를 가져온다.', type: User })
  public getUserInfo(@Param('userId') id: number): Promise<UserInfo> {
    return this.userService.getUserInfo(id);
  }

  @Post('/login')
  @ApiOperation({ summary: '유저 로그인 API' })
  @ApiCreatedResponse({ description: '로그인을 진행한다.', type: User })
  public login(@Body() userLogin: UserDto): Promise<string> {
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

  @UseFilters(HttpExceptionFilter)
  @HttpCode(202)
  @Patch(':id')
  public update(@Param('id') id: number, @Body() updateUserDto: UserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Post()
  async createUser(@Body() dto: UserDto): Promise<void> {
    const { name, email, password } = dto;
    const command = new CreateUserCommand(name, email, password);

    return this.commandBus.execute(command);
  }

  private printLoggerServiceLog(dto) {
    try {
      //throw new InternalServerErrorException('test');
    } catch (e) {
      this.logger.error('error: ' + JSON.stringify(dto), e.stack);
    }

    this.logger.log('log: ' + JSON + stringify(dto));
  }
}
