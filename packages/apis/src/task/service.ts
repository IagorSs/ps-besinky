import { Task } from "@packages/domain";
import AxiosBaseService from "../axiosBaseService";
import { CreateTaskFieldsDto } from "./dtos";

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
}
