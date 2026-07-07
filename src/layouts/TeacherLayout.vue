<template>
  <div class="app-layout">
    <BaseSidebar :role-name="'TEACHER'" :main-menus="teacherMainMenus">
      <template #user-profile>
        <div class="profile-card">
          <div class="profile-info">
            <img
              :src="layoutAvatar"
              class="profile-img"
              @error="(e) => (e.target.src = defaultImage)"
            />
            <div class="profile-text">
              <span class="profile-name"
                >{{ authStore.profile?.firstName }}
                {{ authStore.profile?.lastName }}</span
              >
              <span class="profile-role">{{ authStore.profile?.role }}</span>
            </div>
          </div>

          <button
            class="logout-btn"
            @click.prevent="isLogoutModalOpen = true"
            title="ចាកចេញ"
          >
            <i class="bi bi-box-arrow-right"></i>
          </button>

          <LogoutModal
            :show="isLogoutModalOpen"
            title="Student"
            @close="isLogoutModalOpen = false"
            @confirm="handleLogout"
            :is-loading="isLogoutLoading"
          />
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
import { computed, ref, provide, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authStore";
import defaultImage from "../assets/images/default.png";
import { logoutAPI } from "@/api/auth.api";
import TeacherAssignmentNav from "@/components/teachernavbar/TeacherAssignmentNav.vue";
import TeacherDashboardNav from "@/components/teachernavbar/TeacherDashboardNav.vue";
import TeacherRoommanagementNav from "@/components/teachernavbar/TeacherRoommanagementNav.vue";
import TeacherClassstreamNav from "@/components/teachernavbar/TeacherClassstreamNav.vue";
import TeacherQuizNav from "@/components/teachernavbar/TeacherQuizNav.vue";
import TeacherFinalexamNav from "@/components/teachernavbar/TeacherFinalexamNav.vue";
import TeacherResultaNav from "@/components/teachernavbar/TeacherResultaNav.vue";
import TeacherProfileNav from "@/components/teachernavbar/TeacherProfileNav.vue";
import TeacherValidationNav from "@/components/teachernavbar/TeacherValidationNav.vue";
import TeacherRoomDetail from "@/components/teachernavbar/TeacherRoomDetail.vue";
import TeacherExamDetail from "@/components/teachernavbar/TeacherExamDetail.vue";
import TeacherAllexamNav from "@/components/teachernavbar/TeacherAllexamNav.vue";

const router = useRouter();
const route = useRoute();

const authStore = useAuthStore();
const isLogoutModalOpen = ref(false);

const layoutImageRefresh = ref(Date.now());
const imgBaseUrl = import.meta.env.VITE_BASE_URL_FOR_IMAGE;

const searchQuery = ref("");

const isLogoutLoading = ref(false);

const layoutAvatar = computed(() => {
  const avatar = authStore.profile?.avatar;

  if (!avatar || avatar.includes("default.png")) {
    return defaultImage;
  }

  return `${imgBaseUrl}${avatar}?t=${layoutImageRefresh.value}`;
});

onMounted(async () => {
  if (typeof authStore.fetchProfile === "function") {
    await authStore.fetchProfile();

    console.log("PROFILE AFTER REFRESH:", authStore.profile);

    console.log("AVATAR:", authStore.profile?.avatar);
  }
});

const handleLogout = async () => {
  isLogoutLoading.value = true;
  try {
    await logoutAPI();
  } catch (err) {
    console.error("Logout failed", err);
  } finally {
    localStorage.clear();
    isLogoutLoading.value = false;
    isLogoutModalOpen.value = false;
    router.push("/login");
  }
};
watch(
  () => authStore.profile?.avatar,
  () => {
    layoutImageRefresh.value = Date.now();
  },
);

const teacherMainMenus = [
  {
    name: "ផ្ទាំងគ្រប់គ្រង",
    routeName: "TeacherDashboard",
    icon: "fas fa-th-large",
  },
  {
    name: "គ្រប់គ្រងថ្នាក់រៀន",
    routeName: "RoomManagement",
    icon: "fas fa-users",
  },
  {
    name: "បង្កើតការប្រឡង",
    routeName: "Quizzes",
    icon: "fas fa-edit",
  },
  {
    name: "បញ្ជីវិញ្ញាសារ",
    routeName: "AllExams",
    icon: "fas fa-file-alt",
  },
  {
    name: "លទ្ធផលសិស្ស",
    routeName: "StudentResults",
    icon: "fas fa-chart-bar",
  },
  {
    name: "ប្រវត្តិរូប",
    routeName: "Profile",
    icon: "fas fa-user-circle",
  },
];

provide("searchQuery", searchQuery);

const activeNavbar = computed(() => {
  switch (route.name) {
    case "TeacherDashboard":
      return TeacherDashboardNav;
    case "Assignments":
      return TeacherAssignmentNav;
    case "ClassStream":
      return TeacherClassstreamNav;
    case "RoomManagement":
      return TeacherRoommanagementNav;
    case "RoomDetails":
      return TeacherRoomDetail;
    case "TeacherExamDetail":
      return TeacherExamDetail;
    case "Quizzes":
      return TeacherQuizNav;
    case "FinalExam":
      return TeacherFinalexamNav;
    case "StudentResults":
      return TeacherResultaNav;
    case "Profile":
      return TeacherProfileNav;
    case "TeacherValidations":
      return TeacherValidationNav;
    case "AllExams":
      return TeacherAllexamNav;
    default:
      return null;
  }
});
</script>

<style scoped>
.sidebar-cta {
  width: 100% !important;
  margin: 0 auto 20px auto;
  border: 2px dashed rgba(16, 185, 129, 0.25);
  border-radius: 14px;
  background: var(--em-soft);
  cursor: pointer;
  transition: 0.2s;
}

.sidebar-cta:hover {
  background: #d1fae5;
}

.sidebar-cta:hover {
  background: #d1fae5;
}

.sidebar-brand {
  padding: 39px 20px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-bottom: 1.5px solid var(--green-mid);
  height: 60px;
  margin-bottom: 20px;
  gap: 0;
}

.brand-logo {
  max-width: 190px;
  height: auto;
  display: block;
}

.sidebar-footer {
  padding: 15px 16px;
  border-top: 1px solid #f1f5f9;
  background-color: #ffffff;
}

.btn-logout {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 12px 16px;
  background-color: transparent;
  border: none;
  border-radius: 8px;
  color: #ef4444;
  font-weight: 550;
  font-size: 0.95rem;
  text-align: left;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
}

.btn-logout i {
  font-size: 1.1rem;
  transition: transform 0.2s ease;
}

.btn-logout:hover {
  background-color: #fef2f2;
  color: #dc2626;
}

.btn-logout:hover i {
  transform: translateX(-2px);
}

.btn-logout:active {
  transform: scale(0.98);
}
</style>
