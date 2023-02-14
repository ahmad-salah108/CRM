import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'
import App from './App';
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
import ar from 'javascript-time-ago/locale/ar.json'
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { SnackbarProvider } from 'notistack';

TimeAgo.addDefaultLocale(ar);
TimeAgo.addLocale(en);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <SnackbarProvider maxSnack={3}>
        <App />
      </SnackbarProvider>
    </Provider>
  </React.StrictMode>
);
