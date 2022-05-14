import { styled } from "@mui/styles";
import { DataGrid, DataGridProps } from "@mui/x-data-grid";

const Wrapper = styled("div")(() => ({
  height: "calc(100vh - 200px)",
}));

const VMSDatagrid: React.FC<DataGridProps> = (props) => {
  return (
    <Wrapper>
      <DataGrid
        sortingMode="client"
        paginationMode="client"
        disableColumnFilter
        showCellRightBorder
        disableSelectionOnClick
        {...props}
      />
    </Wrapper>
  );
};

export default VMSDatagrid;
