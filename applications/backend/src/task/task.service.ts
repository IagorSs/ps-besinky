import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskFields } from './dtos/createTaskFields.dto';
import { TaskIdentification } from './dtos/taskIdentification.dto';
import { Task } from './task.entity';
import { GenerativeAiService } from '../generativeAi/generativeAi.service';
import { Prompt } from '../generativeAi/dtos/prompt.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
    @Inject(GenerativeAiService)
    private generativeAiService: GenerativeAiService,
  ) {}

  async getAllTasks(): Promise<Task[]> {
    return this.tasksRepository.find({ order: { createdAt: 'DESC' } });
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

  async generateTasksListByPrompt(taskListPrompt: Prompt): Promise<Task[]> {
    const plainTaskList =
      await this.generativeAiService.getListByPrompt(taskListPrompt);

    const taskListPromise = plainTaskList.map(async (plainTaskItem) => {
      return this.createTask({
        title: plainTaskItem,
        isGeneratedByAI: true,
      });
    });

    return Promise.all(taskListPromise);
  }

  async deleteTask(taskIdentification: TaskIdentification) {
    const task = await this.getMandatoryTask(taskIdentification);

    return this.tasksRepository.delete(task.id);
  }
}
