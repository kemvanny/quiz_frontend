//# សម្រាប់ Create Room, Create Quiz
import api from './axiosInstance';

export const createQuiz = (quizData) => api.post('/teacher/quizzes', quizData);
export const getMyRooms = () => api.get('/teacher/rooms');
export const createRoom = (roomData) => api.post('/teacher/rooms', roomData);
export const inviteStudent = (inviteData) => api.post('/teacher/rooms/invite', inviteData);