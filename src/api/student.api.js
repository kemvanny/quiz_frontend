//# សម្រាប់ Join Room, Submit Quiz
import api from "./axiosInstance";

//Join Room
export const joinRoom = (roomCode) => {
  return api.post("/student/join-room", { roomCode });
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
  return api.get("/student/results");
};

//Get Profile
export const getStudentProfile = () => {
  return api.get("/user/profile");
};

//Upload Profile Picture
export const uploadProfilePicture = (file) => {
  const formData = new FormData();
  formData.append("avatar", file);

  return api.put("/user/profile/avatar", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// Update Profile
export const updateStudentProfile = (profileData) => {
  return api.put("/user/profile", profileData);
};

export const changePasswordAPI = (oldPassword, newPassword) => {
  return api.put("/auth/changePassword", {
    oldPassword,
    newPassword,
  });
};

// Delete Profile Picture
export const deleteProfilePicture = () => {
  return api.delete("/user/profile/avatar");
};

// Delete Account
export const deleteAccountAPI = (id, password) => {
  return api.delete("/auth/deleteAccount", {
    data: {
      id,
      password,
    },
  });
};
