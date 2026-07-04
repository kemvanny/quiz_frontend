import api from "./axiosInstance";


export const createExam = (payload) => { return api.post('/exams/create', payload); };
export const updateExam = (id, data) => {return api.put(`/exams/update/${id}`, data);};
export const deleteExam = (id) => { return api.delete(`/exams/${id}`); };
export const getExams = () => { return api.get('/exams/getAll'); };
export const createQuestion = (payload) => { return api.post('/exams/question/create', payload); };
export const getQuestionsForTeacher = (examId) => { return api.get(`/exams/question/teacher/${examId}`); };
export const updateQuestion = (id, data) => {  return api.put(`/exams/question/update/${id}`, data);};
export const deleteQuestion = (id) => {return api.delete(`/exams/question/delete/${id}`); };
export const joinExam = (examCode) => { return api.get(`/exams/join/${encodeURIComponent(examCode)}`); };
export const getExamsInRoom = (roomId) => api.get(`/exams/teacher/rooms/${roomId}`);
export const getStudentResultsByExam = (examId) => {return api.get(`/exams/results/${examId}`); };
export const getAllStudentResults = () => {return api.get('/exams/results/all'); };
export const addFeedback = (submissionId, feedbackData) => {return api.post('/exams/feedback', {submissionId: submissionId,   feedback: feedbackData});};