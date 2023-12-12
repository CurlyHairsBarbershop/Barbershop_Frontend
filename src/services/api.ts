import { apiClient } from '../lib/axios';
import { Appointment } from '../types/Appointment/Appointment';
import { Barber } from '../types/Barber/Barber';
import { BarberComment } from '../types/Barber/BarberComment';
import { EditBarber } from '../types/Barber/EditBarber';
import { Service } from '../types/Service/Service';

const apiInstance = apiClient;

export const api = {
  signUp: async (body: { email: string, name: string, lastName: string, password: string, confirmPassword: string }) => {
    const { data } = await apiInstance.post('/account/register', body);
    return data;
  },

  signIn: (body: { email: string, password: string }) => apiInstance.post('/account/login', body),

  signInAdminAccoint: (body: { email: string, password: string }) => apiInstance.post('/admin/login', body),

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

  getBarbers: async () => apiInstance.get('/barbers', { withCredentials: true }),

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
  },
  addBarber: async (token: string, id: number, body: Barber) => {
    const { data } = await apiInstance.post(`/barbers/${id}`, body, { headers: { 'Authorization': `Bearer ${token}` } });

    return data;
  },
  deleteBarber: async (token: string, id: number) => {
    const { data } = await apiInstance.delete(`/barbers/${id}`, { headers: { 'Authorization': `Bearer ${token}` } });

    return data;
  },
  addService: async (token: string, body: Omit<Service, 'id'>) => {
    const { data } = await apiInstance.post('/favors', body, { headers: { 'Authorization': `Bearer ${token}` } }
    );
    return data;
  },
  editService: async (token: string, id: number, body: Omit<Service, 'id'>) => {
    const { data } = await apiInstance.put(`/favors/${id}`, body, { headers: { 'Authorization': `Bearer ${token}` } });

    return data;
  },
  deleteService: async (token: string, id: number) => {
    const { data } = await apiInstance.delete(`/favors/${id}`, { headers: { 'Authorization': `Bearer ${token}` } });

    return data;
  }
};