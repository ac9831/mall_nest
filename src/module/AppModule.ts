import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AllModule } from './AllModule';
import databseConfig from 'src/config/Database';

@Module({
  imports: [TypeOrmModule.forRoot(databseConfig), AllModule],
})
export class AppModule {}
