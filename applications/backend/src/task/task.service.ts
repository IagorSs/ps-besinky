import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskFields } from './dtos/createTaskFields.dto';
import { TaskIdentification } from './dtos/taskIdentification.dto';
import { Task } from './task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async getAllTasks(): Promise<Task[]> {
    return this.tasksRepository.find();
  }

  async createTask(createTaskFields: CreateTaskFields): Promise<Task> {
    const newTask = this.tasksRepository.create({
      ...createTaskFields,
      isGeneratedByAI: !!createTaskFields.isGeneratedByAI,
    });

    return this.tasksRepository.save(newTask);
  }

  async getTask(taskIdentification: TaskIdentification) {
    return this.tasksRepository.findOne({
      where: { id: taskIdentification.id },
    });
  }

  async getMandatoryTask(taskIdentification: TaskIdentification) {
    const task = await this.getTask(taskIdentification);

    if (!task) {
      throw new NotFoundException(
        `Cannot found task [${taskIdentification.id}]`,
      );
    }

    return task;
  }

  async toggleCompletion(taskIdentification: TaskIdentification) {
    const task = await this.getMandatoryTask(taskIdentification);

    task.isCompleted = !task.isCompleted;

    await this.tasksRepository.save(task);
  }
}
