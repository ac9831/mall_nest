import { Controller, Post } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';

@Controller('batches')
export class BatchController {
  constructor(private scheduler: SchedulerRegistry) {}

  @Post('/start')
  start() {
    const job = this.scheduler.getCronJob('cronBatch');

    job.start();
  }

  @Post('/stop')
  stop() {
    const job = this.scheduler.getCronJob('cronBatch');

    job.stop();
  }
}
