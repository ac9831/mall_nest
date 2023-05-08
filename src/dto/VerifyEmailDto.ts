import { ApiProperty } from '@nestjs/swagger';

export class VerifyEmailDto {
  @ApiProperty({ description: '인증 메일 토큰' })
  signupVerifyToken: string;
}
