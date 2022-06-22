import { FC } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import {
  createBrowserHistory,
  Outlet,
  ReactLocation,
  Router,
} from "@tanstack/react-location";
import { rankRoutes } from "@tanstack/react-location-rank-routes";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Provider as AppProvider } from "./context/AppContext";
import { Provider as UserProvider } from "./context/UserContext";
import { Provider as ErrorProvider } from "./context/ErrorContext";
import Login from "./pages/login/Login";
import Registration from "./pages/registration/Registration";
import Homepage from "./pages/home/Homepage";
import UsersPage from "./pages/user/UsersPage";
import UserPage from "./pages/user/UserPage";
import Applications from "./pages/application/Applications";
import VMSRouter from "./router/VMSRouter";
import WithAxios from "./error/WithAxios";

const queryClient = new QueryClient();
const history = createBrowserHistory();
const location = new ReactLocation({ history });

const App: FC = () => {
  const theme = createTheme();

  return (
    <QueryClientProvider client={queryClient}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <AppProvider>
          <Router
            location={location}
            filterRoutes={rankRoutes}
            routes={[
              {
                path: "/users",
                children: [
                  { path: "/", element: <UsersPage /> },
                  { path: "/:userId", element: <UserPage /> },
                ],
              },
              {
                path: "/applications",
                element: <Applications />,
              },
              { path: "/login", element: <Login />, meta: { outer: true } },
              {
                path: "/register",
                element: <Registration />,
                meta: { outer: true },
              },

              { element: <Homepage /> },
            ]}
          >
            <ThemeProvider theme={theme}>
              <ErrorProvider>
                <UserProvider>
                  <WithAxios>
                    <VMSRouter>
                      <Outlet />
                    </VMSRouter>
                    <ReactQueryDevtools initialIsOpen={false} />
                  </WithAxios>
                </UserProvider>
              </ErrorProvider>
            </ThemeProvider>
          </Router>
        </AppProvider>
      </LocalizationProvider>
    </QueryClientProvider>
  );
};

export default App;
