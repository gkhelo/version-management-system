import Typography from "@mui/material/Typography";
import { Link } from "@mui/material";

const Copyright = (props: any) => {
  return (
    <Typography variant="body2" color="text.secondary" align="center" { ...props }>
      { 'Copyright © ' }
      <Link color="inherit" href="https://github.com/gkhelo/version-management-system">
        VMS
      </Link>{ ' ' }
      { new Date().getFullYear() }
      { '.' }
    </Typography>
  );
};

export default Copyright;
