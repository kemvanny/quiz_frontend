<template>
  <div class="app-layout">
    <BaseSidebar :role-name="'TEACHER'" :main-menus="teacherMainMenus">
      <template #user-profile>
       
        <div class="sidebar-footer">
          <button type="button" class="btn-logout" @click="openLogoutModal">
            <i class="fas fa-sign-out-alt"></i>
            <span>ចាកចេញពីគណនី</span>
          </button>
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
    <CreateRoomModal
      :is-open="isCreateRoomOpen"
      @close="isCreateRoomOpen = false"
      @created="onRoomCreated"
    />

    <BaseModal
      :isOpen="isLogoutModalOpen"
      @close="isLogoutModalOpen = false"
      width="350px"
    >
      <div class="p-3 text-center">
        <div class="modal-icon-alert text-warning mb-3">
          <i class="fas fa-sign-out-alt fa-2x"></i>
        </div>
        <h5 class="fw-bold text-dark mb-2" style="font-size: 1.1rem">
          ចាកចេញពីប្រព័ន្ធ?
        </h5>
        <p class="text-muted mb-4 small" style="line-height: 1.5">
          តើអ្នកពិតជាចង់បញ្ចប់ការងារ និងចាកចេញពីគណនីបច្ចុប្បន្ននេះមែនទេ?
        </p>
        <div class="d-flex gap-2 w-100">
          <button
            class="btn btn-outline flex-fill"
            @click="isLogoutModalOpen = false"
          >
            បោះបង់
          </button>
          <button
            class="btn btn-danger flex-fill"
            style="margin-top: 0"
            @click="confirmSignOut"
          >
            ចាកចេញ
          </button>
        </div>
      </div>
    </BaseModal>
  </div>
</template>

<script setup>
import { computed, ref, provide } from "vue";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { logoutAPI } from "@/api/auth.api";
import { useAuthStore } from "@/stores/auth";
import TeacherAssignmentNav from "@/components/layout/navbar/teacher/TeacherAssignmentNav.vue";
import TeacherDashboardNav from "@/components/layout/navbar/teacher/TeacherDashboardNav.vue";
import TeacherRoommanagementNav from "@/components/layout/navbar/teacher/TeacherRoommanagementNav.vue";
import TeacherClassstreamNav from "@/components/layout/navbar/teacher/TeacherClassstreamNav.vue";
import TeacherQuizNav from "@/components/layout/navbar/teacher/TeacherQuizNav.vue";
import TeacherFinalexamNav from "@/components/layout/navbar/teacher/TeacherFinalexamNav.vue";
import TeacherResultaNav from "@/components/layout/navbar/teacher/TeacherResultaNav.vue";
import TeacherProfileNav from "@/components/layout/navbar/teacher/TeacherProfileNav.vue";
import TeacherValidationNav from "@/components/layout/navbar/teacher/TeacherValidationNav.vue";
import TeacherRoomDetail from "@/components/layout/navbar/teacher/TeacherRoomDetail.vue";
import TeacherExamDetail from "@/components/layout/navbar/teacher/TeacherExamDetail.vue";
import TeacherAllexamNav from "@/components/layout/navbar/teacher/TeacherAllexamNav.vue";


const router = useRouter();
const route = useRoute();
const toast = useToast();
const authStore = useAuthStore();

const searchQuery = ref("");

const toastConfig = {
  position: "bottom-right",
  timeout: 3000,
  closeOnClick: true,
  pauseOnHover: true,
};

const isLogoutModalOpen = ref(false);
const openLogoutModal = () => {
  isLogoutModalOpen.value = true;
};

const confirmSignOut = async () => {
  isLogoutModalOpen.value = false;

  try {
    await logoutAPI(); 
  } catch (err) {
    console.error("Logout API error (Safe to ignore):", err);
  }

  try {
    if (typeof authStore.$reset === 'function') {
      authStore.$reset();
    }
  } catch (e) {
    console.error("Store reset failed:", e);
  }
  
  localStorage.clear();
  sessionStorage.clear();

  toast.success("ចាកចេញជោគជ័យ", toastConfig);

  setTimeout(() => {
    router.replace({ name: "Home" }).catch((err) => {
      console.error("Vue Router blocked navigation. Forcing hard redirect...", err);
      window.location.href = "/";
    });
  }, 1200);
};


const teacherMainMenus = [
  {
    name: "ផ្ទាំងគ្រប់គ្រង",
    routeName: "TeacherDashboard",
    icon: "fas fa-th-large",
  },
  { name: "បង្កើតការប្រឡង", routeName: "Quizzes", icon: "fas fa-edit" },
  {
    name: "គ្រប់គ្រងថ្នាក់រៀន",
    routeName: "RoomManagement",
    icon: "fas fa-users",
  },
  { name: "បញ្ជីវិញ្ញាសា", routeName: "AllExams", icon: "fas fa-file-alt" },
  {
    name: "លទ្ធផលសិស្ស",
    routeName: "StudentResults",
    icon: "fas fa-chart-bar",
  },
  { name: "ប្រវត្តិរូប", routeName: "Profile", icon: "fas fa-user-circle" },
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
