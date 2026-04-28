import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { Prompt } from 'src/generativeAi/dtos/prompt.dto';
import { CreateTaskFields } from './dtos/createTaskFields.dto';
import { TaskIdentification } from './dtos/taskIdentification.dto';
import { Task } from './task.entity';
import { TaskService } from './task.service';

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

  @Patch('/toggleCompletion/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Occurs when specify not-existent task',
  })
  async toggleCompletion(
    @Param() toggleCompletionTaskQuery: TaskIdentification,
  ) {
    await this.taskService.toggleCompletion(toggleCompletionTaskQuery);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Occurs when specify not-existent task',
  })
  async deleteTask(@Param() deleteTaskQuery: TaskIdentification) {
    await this.taskService.deleteTask(deleteTaskQuery);
  }
}
