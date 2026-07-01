<template>
  <div class="app-layout">
    <BaseSidebar
      :role-name="'TEACHER'"
      :main-menus="teacherMainMenus"
    >
      <template #user-profile>
        <div class="sidebar-cta p-3 text-center" style="cursor: pointer" @click="isCreateRoomOpen = true">
      <div class="bg-white rounded-circle d-flex align-items-center justify-content-center shadow-sm mx-auto mb-2"
        style="width: 38px; height: 38px">
        <i class="fas fa-plus text-success"></i>
      </div>
      <div class="fw-medium text-dark mb-1" style="font-size: 0.85rem">
        បង្កើតថ្នាក់រៀនថ្មី
      </div>
      <div class="text-muted mb-2" style="font-size: 0.7rem; line-height: 1.3">
        បង្កើតថ្នាក់រៀនសម្រាប់សិស្សចូលរួម
      </div>
      <span class="badge bg-success rounded-pill w-100 py-2 fw-normal"
        style="font-size: 0.72rem; letter-spacing: 0.5px">ចាប់ផ្ដើមបង្កើត</span>
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
    <CreateRoomModal :is-open="isCreateRoomOpen" @close="isCreateRoomOpen = false" @created="onRoomCreated" />
  </div>
</template>

<script setup>
import { computed, ref, provide } from "vue";
import { useRoute } from "vue-router";
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

const route = useRoute();

const searchQuery = ref('');

const isOpen = ref(false);
const isCreateRoomOpen = ref(false);

const onRoomCreated = (roomData) => {
  console.log("Room created:", roomData);
};

const teacherMainMenus = [
  { name: "ផ្ទាំងគ្រប់គ្រង", routeName: "TeacherDashboard", icon: "fas fa-th-large" },
  { name: "បង្កើតការប្រឡង", routeName: "Quizzes", icon: "fas fa-edit" },
  { name: "គ្រប់គ្រងថ្នាក់រៀន", routeName: "RoomManagement", icon: "fas fa-users" },
  { name: "បញ្ជីវិញ្ញាសា", routeName: "AllExams", icon: "fas fa-file-alt" },
  { name: "លទ្ធផលសិស្ស", routeName: "StudentResults", icon: "fas fa-chart-bar" },
  { name: "ប្រវត្តិរូប", routeName: "Profile", icon: "fas fa-user-circle" }
];

provide('searchQuery', searchQuery);

const activeNavbar = computed(() => {
  switch (route.name) {
    case "TeacherDashboard": return TeacherDashboardNav;
    case "Assignments": return TeacherAssignmentNav;
    case "ClassStream": return TeacherClassstreamNav;
    case "RoomManagement": return TeacherRoommanagementNav;
    case "RoomDetails": return TeacherRoomDetail;
    case "TeacherExamDetail": return TeacherExamDetail;
    case "Quizzes": return TeacherQuizNav;
    case "FinalExam": return TeacherFinalexamNav;
    case "StudentResults": return TeacherResultaNav;
    case "Profile": return TeacherProfileNav;
    case "TeacherValidations": return TeacherValidationNav;
    case "AllExams": return TeacherAllexamNav;
    default: return null;
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
</style>