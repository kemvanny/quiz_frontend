import api from "./axiosInstance";

export const loginAPI = async (email, password) => {
  const response = await api.post('/auth/login', { email, password })
  return response.data;
}

export const getProfile = () => api.get('/user/profile');
export const logout = () => api.post('/auth/logout');