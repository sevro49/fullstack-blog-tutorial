import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from '@/features/authSlice';

const persistConfig = {
  key: 'root',
  storage, // localStorage
};

const persistedReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
  reducer: {
    auth: persistedReducer, // authSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'], // We don't want to persist this action
        ignoredPaths: ['register'], // We don't want to persist this path
      },
    }),
});

const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>; // Doğru tip dönüşü
export type AppDispatch = typeof store.dispatch;

export { store, persistor };
