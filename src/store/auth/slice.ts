import { createSlice } from '@reduxjs/toolkit';
import { getAccount, signIn, signUp } from './asyncThunks';
import { setCookie } from '../../helpers/common';

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

        if (token) {
          setCookie('token', JSON.stringify(token));
        }
      })
      .addCase(signUp.rejected, (state, action) => {
        // eslint-disable-next-line indent, @typescript-eslint/ban-ts-comment
        // @ts-ignore
        state.errorMessage = action?.payload?.response.data;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.errorMessage = '';
        state.user = action.payload.data.user;
        state.isAuth = true;

        const token = action.payload.data?.token;

        if (token) {
          setCookie('token', JSON.stringify(token));
        }
      })
      .addCase(signIn.rejected, (state, action) => {
        // eslint-disable-next-line indent, @typescript-eslint/ban-ts-comment
        // @ts-ignore
        state.errorMessage = action?.payload?.response?.data;
      })
      .addCase(getAccount.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export const { actions } = slice;
export default slice.reducer;
