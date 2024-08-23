import axios, { AxiosRequestConfig } from "axios";

class BackendService {
  backendUrl: string;
  defaultRequestConfig: AxiosRequestConfig;

  constructor() {
    this.backendUrl = process.env.BACKEND_URL
      ? process.env.BACKEND_URL
      : "http://localhost:3000/";

    this.defaultRequestConfig = {};
  }

  async get<T>(url: string, config: AxiosRequestConfig | null = null) {
    const response = await axios.get<T>(
      this.backendUrl + url,
      config == null ? this.defaultRequestConfig : config
    );
    return response;
  }

  async post<T>(
    url: string,
    data: any,
    config: AxiosRequestConfig | null = null
  ) {
    const response = await axios.post<T>(
      this.backendUrl + url,
      data,
      config == null ? this.defaultRequestConfig : config
    );
    return response;
  }
}

export default BackendService;
