import { defineStore } from "pinia";
import { ref } from "vue";

import {
  getProfileAPI,
  uploadProfilePictureAPI,
  updateProfileAPI,
  changePasswordAPI,
  deleteProfilePictureAPI,
  deleteAccountAPI,
} from "@/api/auth.api";

export const useAuthStore = defineStore("auth", () => {
  const profile = ref(null);
  const loading = ref(false);
  const error = ref(null);

  const fetchProfile = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await getProfileAPI();

      profile.value = response.data.data || response.data;
    } catch (err) {
      error.value =
        err.response?.data?.message || err.message || "Failed to fetch profile";
      console.error("Error fetching profile:", err);
    } finally {
      loading.value = false;
    }
  };

  const uploadAvatar = async (file) => {
   loading.value = true;
   error.value = null;
    try {
      const response = await uploadProfilePictureAPI(file);

      return response.data || response;
    } catch (err) {
      const errorMsg = err.response?.data?.msg || "Failed to upload";
      error.value = errorMsg;
      throw err;
    } finally {
     loading.value = false;
    }
  };

  const updateProfile = async (profileData) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await updateProfileAPI(profileData);

      profile.value = response.data.data || response.data;
      return response;
    } catch (err) {
      error.value =
        err.response?.data?.message ||
        err.message ||
        "Failed to update profile";
      console.error("Error updating profile:", err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const changePassword = async (oldPassword, newPassword) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await changePasswordAPI(oldPassword, newPassword);

      if (response.data?.result === false) {
        throw new Error(response.data?.msg || "Failed to change password");
      }
      return response;
    } catch (err) {
      error.value =
        err.response?.data?.msg ||
        err.response?.data?.message ||
        err.message ||
        "Failed to change password";
      console.error("Change password failed:", err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const deleteAvatar = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await deleteProfilePictureAPI();
      await fetchProfile();
      return response;
    } catch (err) {
      error.value =
        err.response?.data?.message || err.message || "Failed to delete avatar";
      console.error("Error deleting avatar:", err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const deleteAccount = async (password) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await deleteAccountAPI(password);
      if (response.data?.result === false) {
        throw new Error(response.data?.msg || "Failed to delete account");
      }
      profile.value = null;
      return response;
    } catch (err) {
      error.value =
        err.response?.data?.msg ||
        err.response?.data?.message ||
        err.message ||
        "Failed to delete account";
      console.error("Delete account failed:", err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  return {
    profile,
    loading,
    error,
    fetchProfile,
    uploadAvatar,
    updateProfile,
    changePassword,
    deleteAvatar,
    deleteAccount,
  };
});
