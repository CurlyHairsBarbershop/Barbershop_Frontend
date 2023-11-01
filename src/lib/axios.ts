import axios, { AxiosInstance } from 'axios';

class AxiosController {
  token: string | null = null;
  instance: AxiosInstance;
  withoutAuth: string[] = ['account/register', ];

  constructor({ baseURL }: { baseURL: string }) {
    this.instance = axios.create({
      baseURL,
    });
    this.init();
  }

  setToken(token: string | null) {
    this.token = token;
  }

  init() {
    this.instance.interceptors.request.use(
      (config) => {
        if (this.withoutAuth.includes(config.url as string) || !this.token) {
          return config;
        }

        config.headers['Authorization'] = `Bearer ${this.token}`;

        return config;
      },
      (error) => error
    );
  }
}

export const apiClient = new AxiosController({
  baseURL: 'http://194.1.220.48:5092/'
});