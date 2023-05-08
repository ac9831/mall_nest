import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ZzimController } from 'src/controllers/ZzimController';
import { ZzimDrawerController } from 'src/controllers/ZzimDrawerController';
import { Product } from 'src/entity/Product';
import { User } from 'src/entity/User';
import { Zzim } from 'src/entity/Zzim';
import { ZzimDrawer } from 'src/entity/ZzimDrawer';
import { ZzimDrawerService } from 'src/services/ZzimDrawerService';
import { ZzimService } from 'src/services/ZzimService';

@Module({
  imports: [TypeOrmModule.forFeature([Product, User, Zzim, ZzimDrawer])],
  controllers: [ZzimController, ZzimDrawerController],
  providers: [ZzimDrawerService, ZzimService],
})
export class AllModule {}
