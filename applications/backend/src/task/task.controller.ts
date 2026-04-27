import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './task.entity';
import { CreateTaskFields } from './dtos/createTaskFields.dto';
import { TaskIdentification } from './dtos/taskIdentification.dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller('/tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async getTasks(): Promise<Task[]> {
    return await this.taskService.getAllTasks();
  }

  @Post()
  @HttpCode(HttpStatus.NO_CONTENT)
  async createTask(@Body() createTaskBody: CreateTaskFields) {
    await this.taskService.createTask(createTaskBody);
  }

  @Patch('/toggleCompletion')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Occurs when specify not-existent task',
  })
  async toggleCompletion(
    @Query() toggleCompletionTaskQuery: TaskIdentification,
  ) {
    await this.taskService.toggleCompletion(toggleCompletionTaskQuery);
  }
}
