import { GridSortDirection } from "@mui/x-data-grid";

export type Pageable = {
  page?: number;
  size?: number;
  sortBy?: string | null;
  sortDirection?: GridSortDirection;
};

export type PageImpl<T> = {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  empty: boolean;
};
