import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider as AppProvider } from "./context/AppContext";
import {
  createHashHistory,
  Outlet,
  ReactLocation,
  Router,
} from "react-location";
import MainContainer from "./pages/home/MainContainer";
import { ReactQueryDevtools } from "react-query-devtools";
import Homepage from "./pages/home/Homepage";
import Clients from "./pages/client/Clients";
import Applications from "./pages/application/Applications";

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
            routes={[
              {
                path: "clients",
                element: <Clients />,
              },
              {
                path: "applications",
                element: <Applications />,
              },

              { path: "/*", element: <Homepage /> },
            ]}
          >
            <ThemeProvider theme={theme}>
              <MainContainer>
                <Outlet />
                <ReactQueryDevtools initialIsOpen={false} />
              </MainContainer>
            </ThemeProvider>
          </Router>
        </AppProvider>
      </LocalizationProvider>
    </QueryClientProvider>
  );
};

export default App;
