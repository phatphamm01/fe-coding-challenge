import axiosService from '@/assets/utils/axios';

const url = ((base) => ({
  base: base + '/',
  webpage: (id: string) => base + '/' + id
}))('web-page');

const fetchWebPage = {
  async getAll() {
    try {
      const response = await axiosService.get?.(url.base);
      return response;
    } catch (error) {}
  },
  async create(payload: { json: string }) {
    try {
      const response = await axiosService.post?.(url.base, payload);
      return response;
    } catch (error) {}
  },
  async delete(payload: { _id: string }) {
    try {
      const response = await axiosService.delete?.(url.webpage(payload._id));
      return response;
    } catch (error) {}
  },
  async getWebPageById(payload: { _id: string }) {
    try {
      const response = await axiosService.get?.(url.webpage(payload._id));
      return response;
    } catch (error) {}
  },
  async update(payload: { _id: string; data: { json: string } }) {
    try {
      const response = await axiosService.patch?.(
        url.webpage(payload._id),
        payload.data
      );
      return response;
    } catch (error) {}
  }
};

export default fetchWebPage;
