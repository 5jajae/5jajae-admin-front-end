export interface PageResponse<T> {
  data: T[];
  pagination: Pagination;
}

export interface Pagination {
  totalElements: number;
  totalPages: number;
  currentPage: number;
  size: number;
  last: boolean;
}
