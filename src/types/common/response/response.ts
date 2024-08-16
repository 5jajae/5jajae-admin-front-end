export interface DefaultResponse<T> {
  status: string;
  message: string;
  data: T;
}
