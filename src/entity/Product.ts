import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Zzim } from './Zzim';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'id' })
  id: number;

  @Column({
    length: 100,
  })
  @ApiProperty({ description: '상품명' })
  name: string;

  @Column({
    length: 255,
  })
  @ApiProperty({ description: '썸네일' })
  thumbnall: string;

  @Column()
  @ApiProperty({ description: '가격' })
  price: number;

  @ApiProperty({ description: '찜' })
  @OneToMany((type) => Zzim, (zzim) => zzim.product)
  zzim: Zzim;
}
