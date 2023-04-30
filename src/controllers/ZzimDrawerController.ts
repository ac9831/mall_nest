import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { ZzimDrawerService } from 'src/services/ZzimDrawerService';
import { ZzimDrawerDto } from 'src/dto/ZzimDrawerDto';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ZzimDrawer } from 'src/entity';

@Controller()
@ApiTags('찜 서랍 API')
export class ZzimDrawerController {
  constructor(private readonly zzimDrawerService: ZzimDrawerService) {}

  @Get('/zzimdrawer/list')
  @ApiOperation({ summary: '찜 서랍 목록 API' })
  @ApiCreatedResponse({ description: '찜 서랍 목록을 가져온다.', type: ZzimDrawer })
  public getzzimDrawerList(@Query('userId') userId: number) {
    return this.zzimDrawerService.findAll(userId);
  }

  @Post('/zzimdrawer/add')
  @ApiOperation({ summary: '찜 서랍 추가 API' })
  @ApiCreatedResponse({ description: '찜 서랍을 추가한다.', type: ZzimDrawer })
  public addZzimDrawer(@Body() zzimDrawer: ZzimDrawerDto) {
    return this.zzimDrawerService.save(zzimDrawer);
  }

  @Delete('/zzimdrawer/delete')
  @ApiOperation({ summary: '찜 서랍 삭제 API' })
  @ApiCreatedResponse({ description: '찜 서랍 하나를 삭제한다.' })
  public deleteZzimDrawer(@Query('zzimDrawerId') zzimDrawerId: number) {
    return this.zzimDrawerService.delete(zzimDrawerId);
  }
}
