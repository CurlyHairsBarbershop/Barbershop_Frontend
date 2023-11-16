import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../services/api';
import { Appointment } from '../../types/Appointment/Appointment';

export const getBarbers = createAsyncThunk('/barbers', async (_, { rejectWithValue }) => {
  try {
    return await api.getBarbers();
  } catch (e) {
    return rejectWithValue(e);
  }
});

export const getServices = createAsyncThunk('/favors', async (_, { rejectWithValue }) => {
  try {
    return await api.getServices();
  } catch (e) {
    return rejectWithValue(e);
  }
});

export const makeAppointment = createAsyncThunk('/appointments', async ({ appointment, token }: { appointment: Omit<Appointment, 'id'>, token: string }) => {
  return await api.makeAppointment(appointment, token);
});