import api from "./axiosInstance";
import axios from "axios"; 

const BASE_URL = import.meta.env.VITE_BASE_URL;

// Join Room 
export const joinRoom = (id, token) => {
  return axios.get(`${BASE_URL}/invitations/${id}/accept`, {
    params: { token: token }
  });
};

// Get All Assignments in Room
export const getAssignments = (roomId) => {
  return api.get(`/student/rooms/${roomId}/assignments`);
};

// Get Quiz Details
export const getQuizDetails = (quizId) => {
  return api.get(`/student/quizzes/${quizId}`);
};

// Submit Quiz Answers
export const submitQuiz = (quizId, answers) => {
  return api.post(`/student/quizzes/${quizId}/submit`, { answers });
};

// Get Results
export const getMyResults = () => {
  return api.get("/student/results");
};