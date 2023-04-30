import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

import { User } from './User';
import { Zzim } from './Zzim';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class ZzimDrawer {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'id' })
  id: number;

  @Column({
    length: 100,
    unique: true,
  })
  @ApiProperty({ description: '서랍 이름' })
  name: string;

  @ManyToOne((type) => User, (user) => user.zzimDrawer)
  @JoinColumn()
  @ApiProperty({ description: '사용자 Id' })
  user: User;

  @OneToMany((type) => Zzim, (zzim) => zzim.zzimDrawer)
  @ApiProperty({ description: '찜 Id' })
  zzim: Zzim[];
}
