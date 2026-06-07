<template>
  <div class="app-layout">
    <BaseSidebar :mainMenus="studentMainMenus" @logout="handleLogout">
      <template #user-profile>
        <div class="profile-card">
        <div class="profile-info">
          <img :src="`${imgBaseUrl}${authStore.profile?.avatar}`" alt="Profile" class="profile-img" />
          <div class="profile-text">
            <span class="profile-name">{{ authStore.profile?.firstName }} {{ authStore.profile?.lastName }}</span>
            <span class="profile-role">{{ authStore.profile?.role }}</span>
          </div>
        </div>

        <button class="logout-btn" @click.prevent="isLogoutModalOpen = true" title="ចាកចេញ">
          <i class="bi bi-box-arrow-right"></i>
        </button>

        <LogoutModal :show="isLogoutModalOpen" title="Student" @close="isLogoutModalOpen = false"
          @confirm="handleLogout" />

      </div>
      </template>
    </BaseSidebar>
    <div class="main-wrapper">
      <component :is="activeNavbar" />
      <main class="content-body">
        <div class="main-content">
          <div class="page-body">
            <router-view />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { computed ,ref,onMounted} from "vue";
import { useRoute } from "vue-router";
import DashboardNav from "@/components/layout/navbar/student/DashboardNav.vue";
import ClassroomNav from "@/components/layout/navbar/student/ClassroomNav.vue";
import AnalyticsResultNav from "@/components/layout/navbar/student/AnalyticsResultNav.vue";
import ProfilesettingNav from "@/components/layout/navbar/student/ProfilesettingNav.vue";
import AssignmentNav from "@/components/layout/navbar/student/AssignmentNav.vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authStore";

const router = useRouter()
const authStore = useAuthStore()
const route = useRoute();

const imgBaseUrl = import.meta.env.VITE_BASE_URL_FOR_IMAGE
const isLogoutModalOpen = ref(false)

const studentMainMenus = [
  {
    name: "ផ្ទាំងគ្រប់គ្រង",
    routeName: "StudentDashboard",
    icon: "bi bi-grid-fill",
  },
  {
    name: "ថ្នាក់រៀនរបស់ខ្ញុំ",
    routeName: "Classroom",
    icon: "bi bi-door-open-fill",
  },
  { name: "បញ្ជីកិច្ចការ", routeName: "Assignment", icon: "bi bi-list-task" },
  {
    name: "ការវិភាគ និងលទ្ធផល",
    routeName: "AnalyticsResult",
    icon: "bi bi-bar-chart-fill",
  },
  {
    name: "ការកំណត់គណនី",
    routeName: "ProfileSetting",
    icon: "bi bi-person-circle",
  },
];

const activeNavbar = computed(() => {
  switch (route.name) {
    case "StudentDashboard":
      return DashboardNav;
    case "Assignment":
      return AssignmentNav;
    case "Classroom":
      return ClassroomNav;
    case "AnalyticsResult":
      return AnalyticsResultNav;
    case "ProfileSetting":
      return ProfilesettingNav;
  }
});
const handleLogout = () => {
  isLogoutModalOpen.value = false
  sessionStorage.clear()
  router.push('/login')
}

onMounted(async () => {
  
  if (!authStore.profile) {
    try {
      await authStore.fetchProfile() 
    } catch (err) {
      console.error("Failed to load profile to store:", err)
    }
  }
})

</script>
<style>
.welcome-meta h1 {
  font-size: 16px;
  font-weight: 700;
  letter-spacing: -0.4px;
  color: var(--txt);
}

.welcome-meta p {
  font-size: 10px;
  color: var(--txt-mu);
  margin-top: 2px;
}

:root {
  --em: #10b981;
  --em-dk: #059669;
  --em-soft: #ecfdf5;
  --txt: #0f172a;
  --txt-m: #475569;
  --txt-mu: #94a3b8;
  --surf: #ffffff;
  --bdr: #e2e8f0;
  --sh-sm: 0 4px 12px rgba(0, 0, 0, 0.03);
  --sh-md: 0 10px 25px rgba(0, 0, 0, 0.05);
  --sh-hover: 0 20px 40px rgba(16, 185, 129, 0.13);
}

.content-body {
  background-image:
    radial-gradient(at 0% 0%, hsla(158, 76%, 76%, 0.6) 0, transparent 50%),
    radial-gradient(at 100% 100%, hsla(209, 43%, 80%, 0.6) 0, transparent 50%);
}
/* add new */

.profile-pill {
  display: flex;
  align-items: center;
  gap: 12px;
  background: var(--surf);
  padding: 6px 6px;
  border-radius: 99px;
  border: 1px solid var(--border);
}

.avatar {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: var(--em);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 600;
}

.user-profile-info {
  display: flex;
  flex-direction: column;
}

.user-name {
  font-size: 10px;
  font-weight: 600;
  color: var(--txt);
}

.user-id {
  font-size: 8px;
  color: var(--txt-lt);
}
</style>
