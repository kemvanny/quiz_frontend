import api from "./axiosInstance";

export const loginAPI = async (email, password) => {
  const response = await api.post('/auth/login', { email, password })
  return response.data;
}