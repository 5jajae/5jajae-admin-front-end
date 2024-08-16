export interface PageResponse<T> {
  content: T[];
  pagination: Pagination,
}

export interface Pagination {
  totalElements: number;
  totalPages: number;
  currentPage: number;
  size: number;
  last: boolean;
}
