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
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { OpenAiRequest } from '../generativeAi/dtos/openAiRequest.dto';
import { CreateTaskFields } from './dtos/createTaskFields.dto';
import { TaskIdentification } from './dtos/taskIdentification.dto';
import { Task } from './task.entity';
import { TaskService } from './task.service';

@Controller('/tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns list of tasks ordered decrescent by creation date',
  })
  async getTasks(): Promise<Task[]> {
    return await this.taskService.getAllTasks();
  }

  @Post()
  async createTask(@Body() createTaskBody: CreateTaskFields): Promise<Task> {
    return this.taskService.createTask(createTaskBody);
  }

  @Post('/aiGeneration')
  @ApiOperation({
    description:
      'This api uses OpenAi to do this request, put your api key to work. To generate one follow the link: https://platform.openai.com/home',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Occurs when given API key have some problem.',
  })
  async createTaskUsingAiPrompt(
    @Body() openAiRequest: OpenAiRequest,
  ): Promise<Task[]> {
    return this.taskService.generateTasksListByPrompt(openAiRequest);
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
