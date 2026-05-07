<template>
  <div>
    <AdminDashboard v-if="authStore.role === 'admin'" />
    
    <TeacherDashboard v-else-if="authStore.role === 'teacher'" />
    
    <StudentDashboard v-else />
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth';
import AdminDashboard from './AdminDashboard.vue';
import TeacherDashboard from './TeacherDashboard.vue';
import StudentDashboard from './StudentDashboard.vue';

const authStore = useAuthStore();
</script>