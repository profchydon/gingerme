import { AxiosHeaders } from "axios";

export type ApiRequestConfig<D, P, T> = {
  data?: D;
  path?: T;
  params?: P & { [key: string]: any };
} & Omit<Partial<AxiosHeaders>, "params">;

export type ApiRequest<
  D = any,
  P = Record<string, any>,
  Q = Record<string, any>
> = {
  path?: P;
  params?: Q;
  data?: D;
} & Omit<Partial<AxiosHeaders>, "params">;

export type ApiResponse<T = any> = {
  status: number;
  message: string;
  data: T;
  total: number;
  filtered: number;
  size: number;
  pages: number;
};

export type ApiPaginatedResponseData<T = void> = {
  status: number;
  take: number;
  limit: number;
  cursor: number;
  records: Array<T>;
  pageCount: number;
  data: {
    status: number;
    take: number;
    limit: number;
    cursor: number;
    pageCount: number;
    pages: number;
    data: Array<T>;
    totalRecords: number;
  };
};

export type ApiErrorResponse = {
  defaultUserMessage: string;
  status: number;
  data: { [key: string]: string };
};
