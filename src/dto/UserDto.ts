import { BadRequestException, Param } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { NotIn } from 'src/decorator/NotIn';

export class UserDto {
  @Transform((params) => params.value.trim())
  @ApiProperty({ description: 'email' })
  @IsEmail()
  @MaxLength(100)
  email: string;

  @Transform((params) => params.value.trim())
  @NotIn('password', {
    message: 'password는 name과 같은 문자열을 포함할 수 없습니다.',
  })
  @ApiProperty({ description: 'name' })
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  name: string;

  @ApiProperty({ description: 'password' })
  @IsString()
  @MinLength(5)
  @Matches(/^[A-Za-z\d!@#$%^&*()]{5,30}$/)
  @Transform((params) => params.value.trim())
  @NotIn('name', {
    message: 'password는 name과 같은 문자열을 포함할 수 없습니다.',
  })
  password: string;
}

export interface UserInfo {
  id: number;
  email: string;
  password: string;
}
