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
import { AuthModule } from './AuthModule';
import { ExceptionModule } from './ExceptionModule';
import { LoggingModule } from './LoggingModule';
import { TerminusModule } from '@nestjs/terminus';
import { HealthCheckController } from 'src/controllers/HealthCheckController';
import { HttpModule } from '@nestjs/axios';
import { DogHealthIndicator } from 'src/middleware/DogHealthIndicator';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateUserHandler } from 'src/cqrs/CreateUserHandler';
import { UserFactory } from 'src/domain/UserFactory';

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
    ExceptionModule,
    LoggingModule,
    TerminusModule,
    HttpModule,
    CqrsModule,
    TypeOrmModule.forFeature([Zzim, User, ZzimDrawer, Product]),
    CqrsModule,
  ],
  controllers: [
    ZzimController,
    ZzimDrawerController,
    UserController,
    HealthCheckController,
  ],
  providers: [
    ZzimDrawerService,
    ZzimService,
    UserService,
    DogHealthIndicator,
    Logger,
    CreateUserHandler,
    UserFactory,
  ],
})
export class AllModule {}
