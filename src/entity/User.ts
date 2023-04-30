import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ZzimDrawer } from './ZzimDrawer';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'id' })
  id: number;

  @Column({ unique: true })
  @ApiProperty({ description: 'email' })
  email: string;

  @Column()
  @ApiProperty({ description: 'password' })
  password: string;

  @OneToMany((type) => ZzimDrawer, (zzimDrawer) => zzimDrawer.user)
  @ApiProperty({ description: 'zzimDrawer 아이디' })
  zzimDrawer: ZzimDrawer[];
}
