import axios from 'axios';

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
  baseURL: import.meta.env.VITE_API_URL,
});