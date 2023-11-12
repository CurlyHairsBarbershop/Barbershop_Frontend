import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../services/api';

export const getBarbers = createAsyncThunk('/barbers', async (_, { rejectWithValue }) => {
  try {
    return await api.getBarbers();
  } catch (e) {
    return rejectWithValue(e);
  }
});