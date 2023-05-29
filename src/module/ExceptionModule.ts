import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from 'src/middleware/HttpExceptionFilter';
import { Logger } from 'winston';

@Module({
  providers: [Logger, { provide: APP_FILTER, useClass: HttpExceptionFilter }],
})
export class ExceptionModule {}
