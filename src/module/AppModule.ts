import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AllModule } from './AllModule';
import databseConfig from 'src/config/Database';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forRoot(databseConfig), AllModule],
  providers: [ConfigService],
})
export class AppModule {}
