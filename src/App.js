import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import Layout from "./Layout";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import CoversationBox from "./components/chat/CoversationBox";
import Login from "./pages/Login";
import Employee from "./pages/Employee";
import { useSelector } from "react-redux";
import Profile from "./pages/Profile";

// Create rtl cache
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

const theme = createTheme({
  direction: "rtl",
  palette: {
    primary: {
      main: "#645CBB",
    },
    secondary: {
      main: "#A084DC",
    },
    white: {
      main: "#fff",
    },
    textMuted: "rgba(0, 0, 0, 0.6)",
    ddd: "#ddd",
    eee: "#eee",
    cardText: "#828282",
    bgLight: "rgb(191, 172, 226, 0.5)",
    primaryLight: "rgb(100, 92, 187, 0.3)",
    ef: "#efefef",
    a4: "#a4a4a4",
    fontLight: "rgb(33, 37, 41, 0.75)",
    black: "#000",
  },
});

function App() {
  const { token, currentUser } = useSelector((state) => state.user);
  const page404 = (
    <h1 style={{ textAlign: "center", marginTop: "250px" }}>
      404 | الصفحة غير موجودة
    </h1>
  );
  const conversation404 = (
    <h1 style={{ textAlign: "center", marginTop: "250px" }}>المحادثة غير موجودة</h1>
  );
  const router = createBrowserRouter([
    {
      path: "/",
      element: token ? <Layout /> : <Navigate to={"/login"} />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "chat",
          element: <Chat />,
          children: [
            {
              index: true,
              element: (
                <h1
                  style={{
                    fontWeight: "500",
                    textAlign: "center",
                    marginTop: "250px",
                  }}
                >
                  اختر محادثة
                </h1>
              ),
            },
            {
              path: 'not-found',
              element: conversation404
            },
            {
              path: ":ChatId",
              element: <CoversationBox />,
            },
          ],
        },
        (currentUser?.role_id == "1" && {
          path: "employee",
          element: <Employee />,
        }),
        {
          path: "profile",
          element: <Profile />,
        },
        {
          path: "*",
          element: page404,
        },
      ],
    },
    {
      path: "/login",
      element: token ? <Navigate to={"/"} /> : <Login />,
    },
    {
      path: "*",
      element: page404,
    },
  ]);

  return (
    <ThemeProvider theme={theme}>
      <CacheProvider value={cacheRtl}>
        <CssBaseline />
        <RouterProvider router={router} />
      </CacheProvider>
    </ThemeProvider>
  );
}

export default App;
