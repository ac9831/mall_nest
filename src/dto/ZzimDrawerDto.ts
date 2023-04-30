import { ApiProperty } from "@nestjs/swagger";

export class ZzimDrawerDto {
  @ApiProperty({ description: '유저 Id' })
  userId: number;
  @ApiProperty({ description: '찜 서랍 이름' })
  name: string;
}
