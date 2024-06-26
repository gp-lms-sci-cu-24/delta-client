export interface PageQuery {
  pageNo?: number;
  pageSize?: number;
}

export interface Page<T> {
  totalPages: number;
  totalElements: number;
  pageable: Pageable;
  size: number;
  content: T[];
  number: number;
  sort: Sort;
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export interface Pageable {
  pageNumber: number;
  offset: number;
  sort: Sort;
  pageSize: number;
  paged: boolean;
  unpaged: boolean;
}

export interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export interface MessageResponse {
  message: string;
}
