import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../services/api';

export const signUp = createAsyncThunk(
  '/account/register',
  async (body, { rejectWithValue }) => {
    try {
      return await api.signUp(body);
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const signIn = createAsyncThunk(
  '/account/login',
  async (body, { rejectWithValue }) => {
    try {
      return await api.signIn(body);
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const signInAdminAccount = createAsyncThunk(
  '/admin/login',
  async (body, { rejectWithValue }) => {
    try {
      return await api.signInAdminAccoint(body);
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const getAccount = createAsyncThunk('/account', async (token: string) => {
  return await api.getAccount(token);
});

export const changePassword = createAsyncThunk('/account/changePassword', async ({ currentPassword, newPassword, token }: { currentPassword: string, newPassword: string, token: string }) => {
  return await api.changePassword(currentPassword, newPassword, token);
});