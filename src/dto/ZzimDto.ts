import { ApiProperty } from '@nestjs/swagger';

export class ZzimDto {
  @ApiProperty({ description: '상품 Id' })
  productId: number;
  @ApiProperty({ description: '찜 서랍 Id' })
  zzimDrawerId: number;
}
