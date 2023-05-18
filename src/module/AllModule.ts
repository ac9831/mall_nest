import { Logger, Module } from '@nestjs/common';
import { ZzimController } from 'src/controllers/ZzimController';
import { ZzimDrawerController } from 'src/controllers/ZzimDrawerController';
import { ZzimDrawerService } from 'src/services/ZzimDrawerService';
import { ZzimService } from 'src/services/ZzimService';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product, User, Zzim, ZzimDrawer } from 'src/entity';
import { UserController } from 'src/controllers/UserController';
import { UserService } from 'src/services/UserService';
import { EmailModule } from './EmailModule';
import { ConfigModule } from '@nestjs/config';
import EmailConfig from 'src/config/EmailConfig';
import { validationSchema } from 'src/config/ValidationSchema';
import AuthConfig from 'src/config/AuthConfig';
import { AuthService } from 'src/services/AuthService';
import { AuthModule } from './AuthModule';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${__dirname}/../config/env/.${process.env.NODE_ENV}.env`,
      load: [EmailConfig, AuthConfig],
      isGlobal: true,
      validationSchema,
    }),
    EmailModule,
    AuthModule,
    TypeOrmModule.forFeature([Zzim, User, ZzimDrawer, Product]),
  ],
  controllers: [ZzimController, ZzimDrawerController, UserController],
  providers: [ZzimDrawerService, ZzimService, UserService, Logger],
})
export class AllModule {}
