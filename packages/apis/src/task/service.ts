import { Task } from "@packages/domain";
import AxiosBaseService from "../axiosBaseService";
import { CreateTaskFieldsDto, TaskIdentificationDto } from "./dtos";

export default class TaskService extends AxiosBaseService {
  constructor() {
    super(`${process.env.BACKEND_HOST!}/api`);
  }

  async getTasks(): Promise<Task[]> {
    const { data } = await this.apiClient.get<Task[]>('tasks');

    return data;
  }

  async addTask(createTaskFields: CreateTaskFieldsDto): Promise<Task> {
    const { data } = await this.apiClient.post<Task>('tasks', createTaskFields);

    return data;
  }

  async deleteTask(taskIdentification: TaskIdentificationDto): Promise<void> {
    await this.apiClient.delete(`tasks/${taskIdentification.id}`);
  }

  async toggleTaskCompletion(taskIdentification: TaskIdentificationDto): Promise<void> {
    await this.apiClient.patch(`tasks/toggleCompletion/${taskIdentification.id}`);
  }

  async generateTasksWithAiPrompt(aiPrompt: string): Promise<Task[]> {
    const { data } = await this.apiClient.post<Task[]>('tasks/aiGeneration', { prompt: aiPrompt });

    return data;
  }
}
