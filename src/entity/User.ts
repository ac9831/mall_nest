import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ZzimDrawer } from './ZzimDrawer';
import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from 'src/dto/UserDto';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'id' })
  id: number;

  @Column({ length: 30 })
  @ApiProperty({ description: 'name' })
  name: string;

  @Column({ unique: true, length: 100 })
  @ApiProperty({ description: 'email' })
  email: string;

  @Column({ length: 30 })
  @ApiProperty({ description: 'password' })
  password: string;

  @Column({ length: 60 })
  @ApiProperty({ description: 'signupVerifyToken' })
  signupVerifyToken: string;

  @OneToMany((type) => ZzimDrawer, (zzimDrawer) => zzimDrawer.user)
  @ApiProperty({ description: 'zzimDrawer 아이디' })
  zzimDrawer: ZzimDrawer[];

  constructor(userDto?: UserDto) {
    if (userDto) {
      this.name = userDto.name;
      this.email = userDto.email;
      this.password = userDto.password;
    }
  }
}
