import { configureStore , combineReducers} from '@reduxjs/toolkit'
import useRreducer from './userSilce';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'
  import storage from 'redux-persist/lib/storage';

  const persistConfig = {
    key: 'crm',
    version: 1,
    storage,
  }

  const rootReducer=combineReducers({user:useRreducer})

  const persistedReducer = persistReducer(persistConfig, rootReducer)



export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }),
});

export const  persistor = persistStore(store)