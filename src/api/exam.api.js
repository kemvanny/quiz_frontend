import api from "./axiosInstance";

export const createExam = (payload) => { 
  return api.post('/exams/create', payload); 
};

export const updateExam = (id, examData) => { 
  return api.put(`/exams/${id}`, examData); 
};

export const deleteExam = (id) => { 
  return api.delete(`/exams/${id}`); 
};

export const getExams = () => { 
  return api.get('/exams/getAll'); 
};

export const createQuestion = (payload) => { 
  return api.post('/exams/question/create', payload); 
};