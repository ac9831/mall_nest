import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { BatchController } from 'src/controllers/BatchController';
import { TaskService } from 'src/services/TaskService';

@Module({
  imports: [ScheduleModule.forRoot()],
  controllers: [BatchController],
  providers: [TaskService],
})
export class BatchModule {}
