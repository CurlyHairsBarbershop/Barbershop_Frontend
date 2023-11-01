import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../services/api';

export const signUp = createAsyncThunk(
  'account/register',
  async (body, { rejectWithValue }) => {
    try {
      return await api.signUp(body);
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const signIn = createAsyncThunk(
  '',
  async (body, { rejectWithValue }) => {
    try {
      return await api.signIn(body);
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);