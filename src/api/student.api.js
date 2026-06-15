import api from "./axiosInstance";
import axios from "axios"; 

const BASE_URL = import.meta.env.VITE_BASE_URL;

// Join Room 
export const joinRoom = (id, token) => {
  return axios.get(`${BASE_URL}/invitations/${id}/accept`, {
    params: { token: token }
  });
};

// Get All Room
export const getAllRoom = () => {
  return api.get(`/student/rooms`);
};

export const getAllStudentExamResult = () => {
  return api.get(`/exams/student/results`);
};

export const examApi = {
    checkExamCode: async (examCode) => {
        const response = await api.get(`${BASE_URL}/exams/join/${examCode}`);
        return response.data; 
    },
    getRooms: async () => {
        const response = await api.get(`${BASE_URL}/student/rooms`);
        return response.data; 
    },
    startExam: async (studentData) => {
        const response = await api.post(`${BASE_URL}/exams/startExam`, studentData);
        return response.data; 
    },

    getQuestions: async (examId) => {
        const response = await api.get(`${BASE_URL}/exams/question/student/${examId}`);
        return response.data;
    },

    submitExam: async (submissionData) => {
        const response = await api.post(`${BASE_URL}/exams/submitExam`, submissionData);
        return response.data;
    }
};