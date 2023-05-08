import { Module } from '@nestjs/common';
import { EmailService } from 'src/services/EmailService';

@Module({
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
