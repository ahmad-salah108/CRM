import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import Layout from "./Layout";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import CoversationBox from "./components/chat/CoversationBox";

// Create rtl cache
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

const theme = createTheme({
  direction: 'rtl',
  palette: {
    primary: {
      main: '#645CBB'
    },
    secondary: {
      main: '#A084DC'
    },
    textMuted: 'rgba(0, 0, 0, 0.6)',
    ddd: '#ddd',
    white: {
      main: '#fff'
    }
  }
});

const page404 = <h1 style={{textAlign: 'center', marginTop: '250px'}}>404 | الصفحة غير موجودة</h1>;

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'chat',
        element: <Chat/>,
        children: [
          {
            index: true,
            element: <h1 style={{fontWeight: 'normal', textAlign: 'center', marginTop: '250px'}}>اختر محادثة</h1>
          },
          {
            path: ':ChatId',
            element: <CoversationBox/>
          }
        ]
      },
      {
        path: '*',
        element: page404
      }
    ],
  },
  {
    path: '*',
    element: page404
  }
]);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CacheProvider value={cacheRtl}>
        <CssBaseline/>
        <RouterProvider router={router} />
      </CacheProvider>
    </ThemeProvider>
  );
}

export default App;
