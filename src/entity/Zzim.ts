import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToOne } from 'typeorm';

import { Product } from './Product';
import { ZzimDrawer } from './ZzimDrawer';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Zzim {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'id' })
  id: number;

  @ManyToOne((type) => Product, (product) => product.zzim)
  product: Product;

  @ManyToOne((type) => ZzimDrawer, (zzimDrawer) => zzimDrawer.zzim)
  @ApiProperty({ description: '찜서랍 id' })
  zzimDrawer: ZzimDrawer;
}
