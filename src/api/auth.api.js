import api from "./axiosInstance";

// Login 
export const loginAPI = (email, password) => {
  return api.post('/auth/login', { email, password });
};

// Logout
export const logoutAPI = () => {
  return api.post('/auth/logout');
};

// Get Profile 
export const getProfileAPI = () => {
  return api.get('/user/profile');
};

// Update Profile 
export const updateProfileAPI = (profileData) => {
  return api.put("/user/profile", profileData);
};

// Upload Profile Picture 
export const uploadProfilePictureAPI = (file) => {
  const formData = new FormData();
  formData.append("avatar", file);

  return api.put("/user/profile/avatar", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// Change Password
export const changePasswordAPI = (oldPassword, newPassword) => {
  return api.put("/auth/changePassword", {
    oldPassword,
    newPassword,
  });
};

// Delete Profile Picture
export const deleteProfilePictureAPI = () => {
  return api.delete("/user/profile/avatar");
};

// Delete Account (ដក id ចេញ ព្រោះចាប់តាម Token នៅ Backend)
export const deleteAccountAPI = (password) => {
  return api.delete("/auth/deleteAccount", {
    data: {
      password,
    },
  });
};