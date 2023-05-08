import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AllModule } from './AllModule';
import databseConfig from 'src/config/Database';
import { UsersModule } from './UserModule';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRoot(databseConfig),
    AllModule,
    UsersModule,
    ConfigModule.forRoot({
      envFilePath: '.dev.env',
    }),
  ],
  providers: [ConfigService],
})
export class AppModule {}
