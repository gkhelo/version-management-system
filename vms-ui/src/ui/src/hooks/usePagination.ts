import { useState } from "react";
import { GridSortModel } from "@mui/x-data-grid";

const usePagination = ([defaultPage = 0, defaultPageSize = 10]: [
  number?,
  number?
]) => {
  const [page, setPage] = useState<number>(defaultPage);
  const [pageSize, setPageSize] = useState<number>(defaultPageSize);
  const [sortModel, setSortModel] = useState<GridSortModel>();

  const onPageSizeChange = (pageSize: number) => setPageSize(pageSize);
  const onPageChange = (page: number) => setPage(page);
  const onSortModelChange = (sortBy: GridSortModel) => setSortModel(sortBy);

  return {
    page: page,
    pageSize: pageSize,
    sortModel: sortModel,
    onPageSizeChange: onPageSizeChange,
    onPageChange: onPageChange,
    onSortModelChange: onSortModelChange,
  };
};

export default usePagination;
