<<<<<<< HEAD
// src/stores/auth.js
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { getProfile } from '@/api/teacher.api';

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);
  const loading = ref(false);

  // 💡 Getter: ចាប់យកឈ្មោះពេញលេញ Dynamic
  const fullName = computed(() => {
    if (!user.value) return 'Hean Liza';
    return `${user.value.firstName || ''} ${user.value.lastName || ''}`.trim() || 'Hean Liza';
  });

  // 💡 Getter: រៀបចំ URL រូបភាព សម្អាតសញ្ញា / ការពារការបាក់រូបភាព
  const avatarUrl = computed(() => {
    if (!user.value || !user.value.avatar || user.value.avatar === 'default.png') {
      return `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName.value)}&background=random`;
    }

    if (user.value.avatar.startsWith('http')) {
      return user.value.avatar;
    }

    // កាត់តម្រូវភ្ជាប់ជាមួយ Base URL របស់ Server ឱ្យត្រូវខ្នាត
    const url = new URL(import.meta.env.VITE_BASE_URL);
    const serverOrigin = url.origin;
    const cleanAvatarPath = user.value.avatar.startsWith('/') ? user.value.avatar.slice(1) : user.value.avatar;
    
    return `${serverOrigin}/${cleanAvatarPath}`;
  });

  // 💡 Action: ហៅ API ទៅទាញទិន្នន័យពី Server តែម្តងគត់ (ទោះប្តូរ Navbar ក៏មិនបុក API ជាន់គ្នាដែរ)
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
=======
import { defineStore } from "pinia";
>>>>>>> 55b0be6b9180578486ab99888354bf205274b603
