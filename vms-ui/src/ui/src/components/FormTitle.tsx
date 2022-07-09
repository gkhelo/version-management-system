import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const FormTitle = styled(Typography)(() => ({
  marginBottom: 16,
  root: {
    color: "blue",
  },
  textOverflow: "ellipsis",
  overflow: "hidden",
}));

export default FormTitle;
