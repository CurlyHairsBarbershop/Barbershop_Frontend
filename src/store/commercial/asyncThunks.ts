import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../services/api';
import { Appointment, FullAppointment } from '../../types/Appointment/Appointment';
import { BarberCommentBody } from '../../types/Barber/BarberComment';
import { AddBarber, EditBarber } from '../../types/Barber/EditBarber';
import { Service } from '../../types/Service/Service';

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

export const makeAppointment = createAsyncThunk('/appointments', async ({ appointment, token }: { appointment: Appointment, token: string }) => {
  return await api.makeAppointment(appointment, token);
});

export const getSchedulePerBarber = createAsyncThunk('/getBarbersSchedule', async ({ id, daysAhead }: { id: number, daysAhead: number }) => {
  return await api.getSchedulePerBarber(id, daysAhead);
});


export const leaveCommentBarber = createAsyncThunk('leaveCommentBarber', async ({ commentBody, token }: { commentBody: BarberCommentBody, token: string }) => {
  return await api.leaveCommentBarber(commentBody, token);
});

export const getAppointmentsPerUser = createAsyncThunk('getAppointmentsPerUser', async (token: string): Promise<FullAppointment[]> => {
  return await api.getAppointmentsPerUser(token);
});

export const getFavouriteBarbers = createAsyncThunk('getFavouriteBarbers', async (token: string) => {
  return await api.getFavouriteBarbers(token);
});

export const likeBarber = createAsyncThunk('likeBarber', async ({ token, id }: { token: string, id: number }) => {
  return await api.likeBarber(token, id);
});

export const dislikeBarber = createAsyncThunk('likeBarber', async ({ token, id }: { token: string, id: number }) => {
  return await api.dislikeBarber(token, id);
});

export const editBarber = createAsyncThunk('editBarber', async ({ token, id, body }: { token: string, id: number, body: EditBarber }) => {
  return await api.editBarber(token, id, body);
});

export const deleteBarber = createAsyncThunk('deleteBarber', async ({ token, id }: { token: string, id: number }) => {
  return await api.deleteBarber(token, id);
});

export const addService = createAsyncThunk('addService', async ({ token, body }: { token: string, body: Omit<Service, 'id'> }) => {
  return await api.addService(token, body);
});

export const editService = createAsyncThunk('editService', async ({ token, id, body }: { token: string, id: number, body: Omit<Service, 'id'> }) => {
  return await api.editService(token, id, body);
});

export const deleteService = createAsyncThunk('deleteService', async ({ token, id }: { token: string, id: number }) => {
  return await api.deleteService(token, id);
});

export const addBarber = createAsyncThunk('addBarber', async ({ token, body }: { token: string, body: AddBarber }) => {
  return await api.addBarber(token, body);
});

export const cancelAppointment = createAsyncThunk('cancelAppointment', async({ token, id }: { token: string, id: number }) => {
  return await api.cancelAppointment(token, id);
});
