// ================= API INSTANCE =================
import api from './axiosInstance';

// ================= QUIZ =================
export const createQuiz = (quizData) => api.post('/teacher/quizzes', quizData);

// ================= ROOM =================
export const getMyRooms = () =>  api.get('/teacher/rooms');
export const createRoom = (roomData) => api.post('/teacher/rooms', roomData);
export const inviteStudent = (roomId, emailData) => api.post(`/teacher/rooms/${roomId}/invite`, emailData);
export const getRoomInvitations = (roomId) => api.get(`/teacher/rooms/${roomId}/invitations`);
export const getOneRoom = (roomId) => api.get(`/teacher/rooms/${roomId}`);
export const updateRoom = (roomId, roomData) => api.put(`/teacher/rooms/${roomId}`, roomData);
export const deleteRoomApi = (roomId) => api.delete(`/teacher/rooms/${roomId}`);

// ================= PROFILE =================
export const getProfile = () => api.get('/user/profile');
export const updateProfile = (profileData) => api.put('/user/profile', profileData);
export const updateAvatar = (formData) => api.put('/user/profile/avatar', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
export const deleteAvatar = () => api.delete('/user/profile/avatar');