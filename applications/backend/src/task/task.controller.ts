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
import { Prompt } from 'src/generativeAi/dtos/prompt.dto';

@Controller('/tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async getTasks(): Promise<Task[]> {
    return await this.taskService.getAllTasks();
  }

  @Post()
  async createTask(@Body() createTaskBody: CreateTaskFields): Promise<Task> {
    return this.taskService.createTask(createTaskBody);
  }

  @Post('/aiGeneration')
  async createTaskUsingAiPrompt(@Body() prompt: Prompt): Promise<Task[]> {
    return this.taskService.generateTasksListByPrompt(prompt);
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
