import { Module } from '@nestjs/common';
import { UserController } from 'src/controllers/UserController';
import { UserService } from 'src/services/UserService';
import { EmailModule } from './EmailModule';

@Module({
  imports: [EmailModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UsersModule {}
