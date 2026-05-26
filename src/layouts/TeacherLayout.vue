<template>
  <div class="app-layout">
    <TeacherSidebar/>
    <div class="main-wrapper">
      <component :is="activeNavbar"/>
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
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import TeacherSidebar from '@/components/sidebar/TeacherSidebar.vue';
import TeacherAssignmentNav from '@/components/navbar/teacher/TeacherAssignmentNav.vue';
import TeacherDashboardNav from '@/components/navbar/teacher/TeacherDashboardNav.vue';
import TeacherRoommanagementNav from '@/components/navbar/teacher/TeacherRoommanagementNav.vue';
import TeacherClassstreamNav from '@/components/navbar/teacher/TeacherClassstreamNav.vue';
import TeacherQuizNav from '@/components/navbar/teacher/TeacherQuizNav.vue';
import TeacherFinalexamNav from '@/components/navbar/teacher/TeacherFinalexamNav.vue';
import TeacherResultaNav from '@/components/navbar/teacher/TeacherResultaNav.vue';
import TeacherProfileNav from '@/components/navbar/teacher/TeacherProfileNav.vue';
import TeacherValidationNav from '@/components/navbar/teacher/TeacherValidationNav.vue';

const route = useRoute();

const activeNavbar = computed(() => {
    switch(route.name) {
        case 'TeacherDashboard' : return TeacherDashboardNav;
        case 'Assignments' : return TeacherAssignmentNav;
        case 'ClassStream' : return TeacherClassstreamNav;
        case 'RoomManagement' : return TeacherRoommanagementNav;
        case 'Quizzes' : return TeacherQuizNav;
        case 'FinalExam' : return TeacherFinalexamNav;
        case 'StudentResults' : return TeacherResultaNav;
        case 'Profile' : return TeacherProfileNav;
        case 'TeacherValidations' : return TeacherValidationNav;
        
    }
})
</script>
