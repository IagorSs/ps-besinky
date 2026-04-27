import { Injectable } from '@nestjs/common';
import { Task } from './task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskFields } from './dtos/createTaskFields.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async getAllTasks(): Promise<Task[]> {
    return this.tasksRepository.find();
  }

  async createTask(createTaskFields: CreateTaskFields) {
    await this.tasksRepository.save({
      ...createTaskFields,
      isGeneratedByAI: !!createTaskFields.isGeneratedByAI,
    });
  }
}
