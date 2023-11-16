import { apiClient } from '../lib/axios';
import { Appointment } from '../types/Appointment/Appointment';

const apiInstance = apiClient.instance;

export const api = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  signUp: async (body: any) => {
    const { data } = await apiInstance.post('/account/register', body);
    return data;
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  signIn: (body: any) => apiInstance.post('/account/login', body),

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getAccount: async (token: string) => {
    const { data } = await apiInstance.get('/account', {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    return data;
  },

  getBarbers: async () => apiInstance.get('/barbers'),

  getServices: async () => apiInstance.get('/favors'),

  makeAppointment: async (appointment: Appointment, token: string) => {
    const { data } = await apiInstance.post('/appointments', appointment, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    return data;
  },

  getSchedulePerBarber: async (id: number, daysAhead: number) => {
    const { data } = await apiInstance.get(`/barbers/${id}/schedule?daysAhead=${daysAhead}`);
    
    return data;
  }
};