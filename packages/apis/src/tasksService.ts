import { Task } from "@packages/domain";
import ApiService from "./apiService";

export default class TaskService extends ApiService {
  constructor() {
    super(`${process.env.BACKEND_HOST!}/api`);
  }

  async getTasks(): Promise<Task[]> {
    const { data } = await this.apiClient.get<Task[]>('tasks');

    return data;
  }
}
