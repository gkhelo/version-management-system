import { styled } from "@mui/styles";
import { DataGrid, DataGridProps } from "@mui/x-data-grid";
import { useTranslation } from "react-i18next";

const Wrapper = styled("div")(() => ({
  height: "calc(100vh - 150px)",
}));

const VMSDatagrid: React.FC<DataGridProps> = (props) => {
  const { t } = useTranslation();
  return (
    <Wrapper>
      <DataGrid
        sx={{ height: "calc(100vh - 150px)" }}
        sortingMode="server"
        paginationMode="server"
        disableColumnFilter
        showCellRightBorder
        disableSelectionOnClick
        rowsPerPageOptions={[5, 10, 20]}
        pagination
        componentsProps={{
          pagination: {
            labelRowsPerPage: t("labelRowsPerPage"),
            labelDisplayedRows: ({
              from,
              to,
              count,
            }: {
              from: number;
              to: number;
              count: number;
            }) => t("labelDisplayedRows", { from: from, to: to, count: count }),
          },
        }}
        {...props}
      />
    </Wrapper>
  );
};

export default VMSDatagrid;
