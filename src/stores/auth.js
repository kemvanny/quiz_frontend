import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { getProfile } from '@/api/teacher.api';

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);
  const loading = ref(false);

  const fullName = computed(() => {
    if (!user.value) return 'Defualt Name';
    return `${user.value.firstName || ''} ${user.value.lastName || ''}`.trim() || 'Defualt Name';
  });

  const avatarUrl = computed(() => {
    if (!user.value || !user.value.avatar || user.value.avatar === 'default.png') {
      return `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName.value)}&background=random`;
    }

    if (user.value.avatar.startsWith('http')) {
      return user.value.avatar;
    }

    const url = new URL(import.meta.env.VITE_BASE_URL);
    const serverOrigin = url.origin;
    const cleanAvatarPath = user.value.avatar.startsWith('/') ? user.value.avatar.slice(1) : user.value.avatar;
    
    return `${serverOrigin}/${cleanAvatarPath}`;
  });

  const fetchUserProfile = async (forceRefresh = false) => {
    if (user.value && !forceRefresh) return;
    
    try {
      loading.value = true;
      const res = await getProfile();
      const responseData = res.data;
      user.value = responseData?.data || responseData;
    } catch (err) {
      console.error("Store fetch profile error:", err);
    } {
      loading.value = false;
    }
  };

  return {
    user,
    loading,
    fullName,
    avatarUrl,
     fetchUserProfile,
  };
});
