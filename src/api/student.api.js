//# សម្រាប់ Join Room, Submit Quiz
import api from './axiosInstance';

//Join Room
export const joinRoom = (roomCode) => {
    return api.post('/student/join-room', { roomCode });
};

//Get All Assignments in Room
export const getAssignments = (roomId) => {
    return api.get(`/student/rooms/${roomId}/assignments`);
};

//Get Quiz Details 
export const getQuizDetails = (quizId) => {
    return api.get(`/student/quizzes/${quizId}`);
};

//Submit Quiz Answers
export const submitQuiz = (quizId, answers) => {
    return api.post(`/student/quizzes/${quizId}/submit`, { answers });
};

//Get Results
export const getMyResults = () => {
    return api.get('/student/results');
};

//Get Profile
export const getStudentProfile = () => {
    return api.get('/user/profile');
};