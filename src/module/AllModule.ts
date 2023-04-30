import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from 'src/controllers/UserController';
import { ZzimController } from 'src/controllers/ZzimController';
import { ZzimDrawerController } from 'src/controllers/ZzimDrawerController';
import { Product } from 'src/entity/Product';
import { User } from 'src/entity/User';
import { Zzim } from 'src/entity/Zzim';
import { ZzimDrawer } from 'src/entity/ZzimDrawer';
import { UserService } from 'src/services/UserService';
import { ZzimDrawerService } from 'src/services/ZzimDrawerService';
import { ZzimService } from 'src/services/ZzimService';

@Module({
  imports: [TypeOrmModule.forFeature([Product, User, Zzim, ZzimDrawer])],
  controllers: [UserController, ZzimController, ZzimDrawerController],
  providers: [UserService, ZzimDrawerService, ZzimService],
})
export class AllModule {}
