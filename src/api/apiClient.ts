import axios, { AxiosResponse } from 'axios';

const client = axios.create({
  baseURL: import.meta.env.VITE_API_HOST,
  responseType: 'json',
  timeout: 10 * 1000,
  withCredentials: true,
});

export default class ApiClient {
  static post<T>(path: string, body?: any, headers?: any): Promise<AxiosResponse<T>> {
    return client.post(path, body, headers);
  }

  static get<T>(path: string, headers?: any): Promise<AxiosResponse<T>> {
    return client.get(path, headers);
  }

  static put<T>(path: string, body?: any, headers?: any): Promise<AxiosResponse<T>> {
    return client.put(path, body, headers);
  }

  static delete<T>(path: string, headers?: any): Promise<AxiosResponse<T>> {
    return client.delete(path, headers);
  }
}
