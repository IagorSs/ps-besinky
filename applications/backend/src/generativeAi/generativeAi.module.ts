import { Module } from '@nestjs/common';
import { GenerativeAiService } from './generativeAi.service';

@Module({
  providers: [GenerativeAiService],
  exports: [GenerativeAiService],
})
export class GenerativeAiModule {}
