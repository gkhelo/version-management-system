import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { createHashHistory, Outlet, ReactLocation, Router } from "@tanstack/react-location";
import { rankRoutes } from "@tanstack/react-location-rank-routes";
import { Provider as AppProvider } from "./context/AppContext";
import { Provider as UserProvider } from "./context/UserContext";
import MainContainer from "./pages/home/MainContainer";
import Homepage from "./pages/home/Homepage";
import UsersPage from "./pages/user/UsersPage";
import Applications from "./pages/application/Applications";
import UserPage from "./pages/user/UserPage";

const queryClient = new QueryClient();
const history = createHashHistory();
const location = new ReactLocation({ history });

const App = () => {
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
              { path: "/", element: <Homepage /> },
            ]}
          >
            <ThemeProvider theme={theme}>
              <UserProvider>
                <MainContainer>
                  <Outlet />
                  <ReactQueryDevtools initialIsOpen={false} />
                </MainContainer>
              </UserProvider>
            </ThemeProvider>
          </Router>
        </AppProvider>
      </LocalizationProvider>
    </QueryClientProvider>
  );
};

export default App;
