import { apiClient } from '../lib/axios';
import { Appointment } from '../types/Appointment/Appointment';
import { BarberComment } from '../types/Barber/BarberComment';
import { EditBarber } from '../types/Barber/EditBarber';

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
  signInAdminAccoint: (body: any) => apiInstance.post('/admin/login', body),

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getAccount: async (token: string) => {
    const { data } = await apiInstance.get('/account', {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    return data;
  },
  changePassword: async (currentPassword: string, newPassword: string, token: string) => {
    return await apiInstance.post('/account/password', { currentPassword, newPassword, }, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
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
  },

  leaveCommentBarber: async (commentBody: BarberComment, token: string) => {
    const { data } = await apiInstance.post('/barbers/comment', commentBody, { headers: { 'Authorization': `Bearer ${token}` } });
    return data;
  },

  getAppointmentsPerUser: async (token: string) => {
    const { data } = await apiInstance.get('/appointments', { headers: { 'Authorization': `Bearer ${token}` } });
    return data;
  },

  getFavouriteBarbers: async (token: string) => {
    const { data } = await apiInstance.get('/account/favourite-barbers', { headers: { 'Authorization': `Bearer ${token}` } });
    return data;
  },
  likeBarber: async (token: string, id: number) => {
    const { data } = await apiInstance.patch(`/barbers/favourite/${id}`, {}, { headers: { 'Authorization': `Bearer ${token}` } });
    return data;
  },
  dislikeBarber: async (token: string, id: number) => {
    const { data } = await apiInstance.delete(`/barbers/favourite/${id}`, { headers: { 'Authorization': `Bearer ${token}` } });
    return data;
  },
  editBarber: async (token: string, id: number, body: EditBarber) => {
    const { data } = await apiInstance.patch(`/barbers/${id}`, body, { headers: { 'Authorization': `Bearer ${token}` } });

    return data;
  }
};