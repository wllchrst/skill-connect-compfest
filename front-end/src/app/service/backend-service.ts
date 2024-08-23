import axios, { AxiosRequestConfig } from "axios";

class BackendService {
  backendUrl: string;

  constructor() {
    this.backendUrl = process.env.BACKEND_URL
      ? process.env.BACKEND_URL
      : "http://localhost:3000/";
  }

  async get(url: string) {
    const response = await axios.get(this.backendUrl + url);
    return response;
  }

  async post<T>(
    url: string,
    data: any,
    config: AxiosRequestConfig | null = null
  ) {
    const response = await axios.post<T>(this.backendUrl + url, data);
    return response;
  }
}

export default BackendService;
