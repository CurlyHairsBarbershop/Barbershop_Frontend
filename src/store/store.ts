import { configureStore } from '@reduxjs/toolkit';
import auth from './auth/slice';
import commercial from './commercial/slice';

export const store = configureStore({
  reducer: {
    auth,
    commercial,
  },
});


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch