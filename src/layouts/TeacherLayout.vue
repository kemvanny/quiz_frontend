<template>
  <div class="app-layout">
    <TeacherSidebar />
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
import { computed } from "vue";
import { useRoute } from "vue-router";

import TeacherSidebar from "@/components/layout/sidebar/TeacherSidebar.vue";
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

const route = useRoute();

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
      return "TeacherExamDetail.vue"
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
  }
});
</script>
