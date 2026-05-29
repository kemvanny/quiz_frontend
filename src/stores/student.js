import { defineStore } from "pinia";
import { ref } from "vue";
import { getStudentProfile } from "@/api/student.api";

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

  return {
    profile,
    loading,
    error,
    getProfile,
  };
});
