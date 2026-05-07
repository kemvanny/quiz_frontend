//# សម្រាប់ Create Room, Create Quiz
import api from './axiosInstance';

export const createQuiz = (quizData) => api.post('/teacher/quizzes', quizData);
export const getMyRooms = () => api.get('/teacher/rooms');