import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ description: 'email' })
  email: string;
  @ApiProperty({ description: 'password' })
  password: string;
}
