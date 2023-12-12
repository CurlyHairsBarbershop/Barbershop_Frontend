import axios from 'axios';
import { API_URL } from '../../env.ts';

// class AxiosController {
//   instance: AxiosInstance;

//   constructor({ baseURL }: { baseURL: string }) {
//     this.instance = axios.create({
//       baseURL,
//     });
//   }
// }

// export const apiClient = new AxiosController({
//   baseURL: API_URL,
// });

export const apiClient = axios.create({
  baseURL: API_URL,
});