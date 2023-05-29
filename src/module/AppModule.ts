import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AllModule } from './AllModule';
import databseConfig from 'src/config/Database';
import { ConfigService } from '@nestjs/config';
import { LoggerMiddleware } from 'src/middleware/Logger';
import { UserController } from 'src/controllers/UserController';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { HandlerRolesGuard } from 'src/middleware/HandlerRolesGuard';
import { HttpExceptionFilter } from 'src/middleware/HttpExceptionFilter';

@Module({
  imports: [TypeOrmModule.forRoot(databseConfig), AllModule],
  providers: [
    ConfigService,
    { provide: APP_GUARD, useClass: HandlerRolesGuard },
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(LoggerMiddleware)
      //.exclude() // 적용하지 않을 라우팅 설정
      .forRoutes(UserController);
  }
}
