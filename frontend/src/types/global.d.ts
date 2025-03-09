interface IPaginatedDataResponse<T = unknown> {
  current_page: number;
  [key?: string]: T;
  data?: T;
  firstPageUrl: string;
  from: number;
  last_page: number;
  lastPageUrl: string;
  links: any;
  nextPageUrl: string;
  path: string;
  per_page: number;
  prevPageUrl: null | string;
  to: number;
  total: number;
}

interface ServerResponse<T = unknown> {
  status?: number;
  success: boolean;
  message: string;
  errors?: any;
  data: T;
  total: number;
  filtered: number;
  size: number;
  pages: number;
}

interface ServerPaginatedResponse<T = unknown> {
  success: boolean;
  message: string;
  data: IPaginatedDataResponse<T>;
}
