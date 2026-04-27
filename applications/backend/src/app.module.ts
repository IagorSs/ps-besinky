import { Module } from '@nestjs/common';
import { DataBaseModule } from './database/database.module';
import { TaskModule } from './task/task.module';

@Module({
  imports: [DataBaseModule, TaskModule],
})
export class AppModule {}
