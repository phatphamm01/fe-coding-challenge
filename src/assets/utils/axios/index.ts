import axios from 'axios';

export type IDataAxios = Record<string, any>;

export interface IData {
  data: any;
  success: boolean;
}
export type IResponseAxios = Promise<IData | any>;
export type Method = 'get' | 'delete' | 'patch' | 'delete' | 'post';

axios.defaults.baseURL =
  'https://fe-coding-challenge-backend.vercel.app/api/v1';

const handleError = (err: any) => {
  let message =
    typeof err.response !== 'undefined'
      ? err.response.data.message
      : err.message;
  return message;
};

const instance = axios.create({
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
});

const axiosService: Record<
  Method,
  (url: string, data?: IDataAxios) => IResponseAxios
> = {
  get: async (url: string, data?: IDataAxios): IResponseAxios => {
    try {
      return await (
        await instance.get(url, { params: data })
      ).data;
    } catch (error) {
      Promise.reject(error);
    }
  },
  post: async (url: string, data?: IDataAxios): IResponseAxios => {
    try {
      return await (
        await instance.post(url, data)
      ).data;
    } catch (error) {
      Promise.reject(error);
    }
  },
  patch: async (url: string, data?: IDataAxios): IResponseAxios => {
    try {
      return await await (
        await instance.patch(url, data)
      ).data;
    } catch (error) {
      Promise.reject(error);
    }
  },
  delete: async (url: string, data?: IDataAxios): IResponseAxios => {
    try {
      return await await (
        await instance.delete(url, data)
      ).data;
    } catch (error) {
      Promise.reject(error);
    }
  }
};

export default axiosService;
