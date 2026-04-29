import axios, { AxiosInstance } from "axios";

export default class AxiosBaseService {
  protected apiClient: AxiosInstance;

  constructor(baseUrl: string) {
    this.apiClient = axios.create({
      baseURL: baseUrl,
    })
  }
}
