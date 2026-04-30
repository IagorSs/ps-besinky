import { Task, WebSerializedTask } from "@packages/domain";
import AxiosBaseService from "../axiosBaseService";
import { CreateTaskFieldsDto, TaskIdentificationDto } from "./dtos";
import { TaskView } from "./taskView";

export default class TaskService extends AxiosBaseService {
  constructor() {
    super(`${process.env.BACKEND_HOST!}/api`);
  }

  async getTasks(): Promise<Task[]> {
    const { data } = await this.apiClient.get<WebSerializedTask[]>('tasks');

    return data.map(item => new TaskView(item));
  }

  async addTask(createTaskFields: CreateTaskFieldsDto): Promise<Task> {
    const { data } = await this.apiClient.post<WebSerializedTask>('tasks', createTaskFields);

    return new TaskView(data);
  }

  async deleteTask(taskIdentification: TaskIdentificationDto): Promise<void> {
    await this.apiClient.delete(`tasks/${taskIdentification.id}`);
  }

  async toggleTaskCompletion(taskIdentification: TaskIdentificationDto): Promise<void> {
    await this.apiClient.patch(`tasks/toggleCompletion/${taskIdentification.id}`);
  }

  async generateTasksWithAiPrompt(openAiApiKey: string, aiPrompt: string): Promise<Task[]> {
    const { data } = await this.apiClient.post<WebSerializedTask[]>(
      'tasks/aiGeneration',
      {
        openAiId: {
          openAiApiKey
        },
        prompt: aiPrompt
      }
    );

    return data.map(item => new TaskView(item));
  }
}
