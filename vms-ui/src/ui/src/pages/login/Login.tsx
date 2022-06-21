import { FC, FormEvent, useContext, useState } from "react";
import { useNavigate } from "@tanstack/react-location";
import {
  Alert,
  AlertTitle,
  Avatar,
  Box,
  Button,
  CssBaseline,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import ServerApi from "../../api/ServerApi";
import Copyright from "../../components/Copyright";
import { Context } from "../../context/UserContext";

const Login: FC = () => {
  const { setUser } = useContext(Context);
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    await ServerApi.login(data)
      .then((response) => {
        localStorage.setItem("jwt", response.headers.authorization);
        setUser(response.data.user);
      })
      .catch(() => {
        console.error("Bad credentials for " + data.get("username"));

        setIsError(true);
      });
  };
  const navigate = useNavigate();
  const handleRegistration = () => {
    navigate({ to: "/register" });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          Sign in
        </Typography>

        {isError && (
          <Alert severity="error">
            <AlertTitle>Bad credentials</AlertTitle>
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>

        <Grid container>
          <Grid item>
            <Link
              onClick={handleRegistration}
              component="button"
              variant="body2"
            >
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
};

export default Login;
