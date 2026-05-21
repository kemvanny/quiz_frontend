<template>
  <div class="app-layout">
    <TeacherSidebar />
    <div class="main-wrapper">
    <TeacherNavbar />
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
import TeacherSidebar from '@/components/layout/TeacherSidebar.vue';
import TeacherNavbar from '@/components/layout/TeacherNavbar.vue';
</script>
