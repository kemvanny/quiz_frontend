import api from "./axiosInstance";


export const createExam = (payload) => { 
  return api.post('/exams/create', payload); 
};

export const updateExam = (id, data) => {
  return api.put(`/exams/update/${id}`, data);
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


