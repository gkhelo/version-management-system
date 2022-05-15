import { styled } from "@mui/styles";
import { DataGrid, DataGridProps } from "@mui/x-data-grid";

const Wrapper = styled("div")(() => ({
  height: "calc(100vh - 200px)",
}));

const VMSDatagrid: React.FC<DataGridProps> = (props) => {
  return (
    <Wrapper>
      <DataGrid
        sx={{ height: "calc(100vh - 200px)" }}
        sortingMode="server"
        paginationMode="server"
        disableColumnFilter
        showCellRightBorder
        disableSelectionOnClick
        rowsPerPageOptions={[5, 10, 20]}
        pagination
        {...props}
      />
    </Wrapper>
  );
};

export default VMSDatagrid;
