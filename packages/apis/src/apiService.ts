import axios, { AxiosInstance } from "axios";

export default class ApiService {
  protected apiClient: AxiosInstance;

  constructor(baseUrl: string) {
    this.apiClient = axios.create({
      baseURL: baseUrl,
    })
  }
}
