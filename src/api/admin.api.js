import api from './axiosInstance';

export const getAllUsers = () => api.get('/admin/getAllUsers');
export const createUser = (payload, token) => {
  return api.post('/admin/createUser', payload, {
    headers: {
      'Authorization': `Bearer ${token}` 
    }
  });
};
export const deleteUser = (id) => api.delete(`/admin/users/${id}`);
export const updateStatus = (id, data) => api.put(`/admin/users/status/${id}`, data);
export const getSummerise = () => api.get('/admin/dashboard/overview');
export const recentActivity = () => api.get('/admin/dashboard/activity');
export const getAllExams = () => api.get('/admin/quizzes');
export const getDashboardData = () => api.get('/admin/dashboard/total');
export const getSubmissionMonthly = () => api.get('/admin/submissions/monthly');
export const getSystemHealth = () => api.get('/admin/dashboard/health');
export const getDashboardExamData = () => api.get('/admin/examDashboard');
export const getSearchUsers = (query) => api.get(`/admin/users?search=${query}`);