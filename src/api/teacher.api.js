import api from './axiosInstance';

export const createQuiz = (quizData) => api.post('/teacher/quizzes', quizData);

// ================= ROOM =================
export const getMyRooms = () =>  api.get('/teacher/rooms');
export const createRoom = (roomData) => api.post('/teacher/rooms', roomData);
export const inviteStudent = (roomId, emailData) => api.post(`/teacher/rooms/${roomId}/invite`, emailData);
export const getRoomInvitations = (roomId) => api.get(`/teacher/rooms/${roomId}/invitations`);
export const getOneRoom = (roomId) => api.get(`/teacher/rooms/${roomId}`);
export const updateRoom = (roomId, roomData) => api.put(`/teacher/rooms/${roomId}`, roomData);
export const deleteRoomApi = (roomId) => api.delete(`/teacher/rooms/${roomId}`);
export const removeStudentFromRoom = (roomId, studentId) => {
  return api.delete(`/teacher/rooms/${roomId}/students/${studentId}`);
};
// ================= ClassStream =================
export const createPost = (roomId, data) => {
  return api.post(`/exams/rooms/${roomId}/posts`, data);
};
export const getPosts = (roomId) => {
  return api.get(`/exams/rooms/${roomId}/posts`);
};
export const updatePost = (postId, data) => {
  return api.put(`/exams/rooms/posts/${postId}`, data);
};
export const deletePost = (roomId, postId) => {
  return api.delete(`/exams/rooms/${roomId}/posts/${postId}`);
};
