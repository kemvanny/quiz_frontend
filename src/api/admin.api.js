//សម្រាប់ Manage Users, View All Quizzes
import api from './axiosInstance';

export const getAllUsers = () => api.get('/admin/users');
export const deleteUser = (id) => api.delete(`/admin/users/${id}`);
export const updateStatus = (id, data) => api.put(`/admin/users/status/${id}`, data);