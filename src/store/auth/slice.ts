import { createSlice } from '@reduxjs/toolkit';
import { signIn, signUp } from './asyncThunks';
import { setCookie } from '../../helpers/common';
// import { apiClient } from '../../lib/axios';

const slice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuth: false,
    errorMessage: '',
  },
  reducers: {
    setAuth(state, action) {
      state.isAuth = action.payload;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.fulfilled, (state, action) => {
        state.errorMessage = '';
        state.isAuth = true;

        const token = action.payload?.token;
        console.log(action);

        if (token) {
          setCookie('token', JSON.stringify(token));
        }
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.user = action.payload.data.user;
        state.isAuth = true;
        const token = action.payload.data?.token;
        console.log(action);

        if (token) {
          setCookie('token', JSON.stringify(token));
        }
      });
  },
});

export const { actions } = slice;
export default slice.reducer;
