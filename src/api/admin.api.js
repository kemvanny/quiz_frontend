import api from './axiosInstance';

// Get All User
export const getAllUsers = (params) => api.get('/admin/getAllUsers', { params });

// Create User
export const createUser = (payload, token) => {
  return api.post('/admin/createUser', payload, {
    headers: {
      'Authorization': `Bearer ${token}` 
    }
  });
};

// Update Status User
export const updateStatus = (id, data) => api.put(`/admin/users/status/${id}`, data);

export const getSummerise = () => api.get('/admin/dashboard/overview');

export const recentActivity = (params) => api.get('/admin/dashboard/activity', { params });

export const getAllExams = (params) => api.get('/admin/quizzes', { params });

export const getDashboardData = () => api.get('/admin/dashboard/total');

export const getSubmissionMonthly = () => api.get('/admin/submissions/monthly');

export const getSystemHealth = () => api.get('/admin/dashboard/health');

export const getDashboardExamData = () => api.get('/admin/examDashboard');

export const getSearchUsers = (query) => api.get(`/admin/users?search=${query}`);

export const getAllSubmissions = (params) => api.get('/admin/dashboard/recentSubmissions', { params });

export const ChangeStatusUser = (id, status) => api.put(`/admin/changeUserStatus/${id}`, { status });
