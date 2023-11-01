import { createSlice } from '@reduxjs/toolkit';
import { signIn, signUp } from './asyncThunks';
import { setCookie } from '../../helpers/common';
import { apiClient } from '../../lib/axios';

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
        const tokens = action.payload?.tokens;

        if (tokens) {
          setCookie('tokens', JSON.stringify(tokens));
          apiClient.setToken(tokens?.access.token);
        }
      })
      // .addCase(signUp.rejected, (state, action) => {
      //   // state.errorMessage = action?.payload?.response?.data?.message;
      // })
      .addCase(signIn.fulfilled, (state, action) => {
        state.user = action.payload.data.user;
        state.isAuth = true;
        const tokens = action.payload.data?.tokens;

        if (tokens) {
          setCookie('tokens', JSON.stringify(tokens));
          apiClient.setToken(tokens?.access.token);
        }
      });
    // .addCase(signIn.rejected, (state, action) => {
    //   // state.errorMessage =
    //     // action?.payload?.response?.data?.message || 'unexpectedError';
    // });
  },
});

export const { actions } = slice;
export default slice.reducer;
