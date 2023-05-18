import { Module } from '@nestjs/common';
import { AuthService } from 'src/services/AuthService';

@Module({
  imports: [],
  controllers: [],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
