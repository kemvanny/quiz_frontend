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
  return api.get(`/students/results`);
};

export const examApi = {
    checkExamCode: async (examCode) => {
        const response = await api.get(`${BASE_URL}/students/join/${examCode}`);
        return response.data; 
    },
    getRooms: async () => {
        const response = await api.get(`${BASE_URL}/student/rooms`);
        return response.data; 
    },
    startExam: async (studentData) => {
        const response = await api.post(`${BASE_URL}/students/startExam`, studentData);
        return response.data; 
    },

    getQuestions: async (examId) => {
        const response = await api.get(`${BASE_URL}/students/question/student/${examId}`);
        return response.data;
    },

    submitExam: async (submissionData) => {
        const response = await api.post(`${BASE_URL}/students/submitExam`, submissionData);
        return response.data;
    }
};
export const getUpcomingDeadlines = () => {
  return api.get(`/students/upcomingDeadlines`, {
  });
};
export const getDashboardStats = () => {
  return api.get("/students/dashboardStats", );
};

export const getRecentFeedback = () => {
  return api.get(`/students/recentFeedback`,);
};

export const getStudentPerformance = () => {
  return api.get(`/students/performance`, );
};
export const getAllStudentExams = () => {
  return api.get("/students/exams"); 
};

export default {
  getRoomDetail(roomId) {
    return api.get(`/exams/student/rooms/${roomId}`);
  },
  getRoomPosts(roomId) {
    return api.get(`/exams/student/rooms/${roomId}/posts`);
  }
}
export const getExamResult = (examId, studentId) => {
  return api.get(`/students/${examId}/results/${studentId}`);
}