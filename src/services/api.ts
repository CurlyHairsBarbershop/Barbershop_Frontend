import { apiClient } from '../lib/axios';

const apiInstance = apiClient.instance;

export const api = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  signUp: async (body: any) => {
    const { data } = await apiInstance.post('/account/register', body);
    return data;
  },
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  signIn: (body: any) => apiInstance.post('/account/login', body),
};