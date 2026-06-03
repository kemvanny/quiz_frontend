import { defineStore } from "pinia";
import { ref } from "vue";
import {
  getStudentProfile,
  uploadProfilePicture,
  updateStudentProfile,
  changePasswordAPI,
  deleteProfilePicture,
  deleteAccountAPI,
} from "@/api/student.api";

export const useStudentStore = defineStore("student", () => {
  // State
  const profile = ref(null);
  const loading = ref(false);
  const error = ref(null);

  // Action
  const getProfile = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await getStudentProfile();
      profile.value = response.data.data; // Correctly accessing nested data payload
    } catch (err) {
      // 1. Changed block variable to 'err' to avoid name clashing with the 'error' ref
      // 2. Extracted readable message text string for easier UI rendering
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
      await uploadProfilePicture(file);
      // Fetch the updated profile from server to ensure avatar is synced
      await getProfile();
      return { success: true };
    } catch (err) {
      error.value =
        err.response?.data?.message || err.message || "Failed to upload avatar";
      console.error("Error uploading avatar:", err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const updateProfile = async (profileData) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await updateStudentProfile(profileData);
      profile.value = response.data.data;
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
      const response = await deleteProfilePicture();

      await getProfile();

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
      const response = await deleteAccountAPI(id, password);
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
    getProfile,
    uploadAvatar,
    updateProfile,
    changePassword,
    deleteAvatar,
    deleteAccount,
  };
});
