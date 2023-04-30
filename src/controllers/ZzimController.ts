import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { ZzimService } from 'src/services/ZzimService';
import { ZzimDto } from 'src/dto/ZzimDto';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Zzim } from 'src/entity';

@Controller()
@ApiTags('찜 API')
export class ZzimController {
  constructor(private readonly zzimService: ZzimService) {}

  @Get('/zzim/list')
  @ApiOperation({ summary: '찜 목록 API' })
  @ApiCreatedResponse({ description: '찜 목록을 가져온다.', type: Zzim })
  public getZzimList(@Query('zzimDrawerId') zzimDrawerId: number) {
    console.log(zzimDrawerId);
    return this.zzimService.findAll(zzimDrawerId);
  }

  @Post('/zzim/add')
  @ApiOperation({ summary: '찜 추가 API' })
  @ApiCreatedResponse({ description: '상품 하나를 찜 합니다..', type: Zzim })
  public addZzim(@Body() zzimDto: ZzimDto) {
    return this.zzimService.save(zzimDto);
  }

  @Delete('/zzim/delete')
  @ApiOperation({ summary: '찜 삭제 API' })
  @ApiCreatedResponse({ description: '찜 하나를 해제합니다.' })
  public deleteZzim(@Query('id') id: number) {
    console.log(id);
    return this.zzimService.delete(id);
  }
}
