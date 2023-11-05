import { configureStore } from '@reduxjs/toolkit';
import auth from './auth/slice';
import barber from './barber/slice';

export const store = configureStore({
  reducer: {
    auth,
    barber,
  },
});


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch