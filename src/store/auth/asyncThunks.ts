import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../services/api';
import { User } from '../../types/User/User';

export const signUp = createAsyncThunk(
  '/account/register',
  async (body: { email: string; name: string; lastName: string; password: string; confirmPassword: string; }, { rejectWithValue }) => {
    try {
      return await api.signUp(body);
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const signIn = createAsyncThunk(
  '/account/login',
  async (body: { email: string; password: string; }, { rejectWithValue }) => {
    try {
      return await api.signIn(body);
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const signInAdminAccount = createAsyncThunk(
  '/admin/login',
  async (body: { email: string; password: string; }, { rejectWithValue }) => {
    try {
      return await api.signInAdminAccoint(body);
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const getAccount = createAsyncThunk('/account', async (token: string): Promise<User> => {
  return await api.getAccount(token);
});

export const changePassword = createAsyncThunk('/account/changePassword', async ({ currentPassword, newPassword, token }: { currentPassword: string, newPassword: string, token: string }) => {
  return await api.changePassword(currentPassword, newPassword, token);
});