import { Pagination } from './pagination.model';

export interface ResponseWithPagination<T> {
  data: T;
  pagination: Pagination;
}
