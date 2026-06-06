import api from "./axiosInstance";

export const createExam = (payload) => {  return api.post('/exams/create', payload); };
export const getExams = () => {return api.get('/exams/getAll'); };
export const createQuestion = (payload) => { return api.post('/exams/question/create', payload);};