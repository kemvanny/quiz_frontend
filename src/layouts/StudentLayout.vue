<template>
  <div class="app-layout">
    <StudentSidebar />

    <div class="main-wrapper">
      <StudentNavbar />
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
import StudentSidebar from '@/components/layout/StudentSidebar.vue';
import StudentNavbar from '@/components/layout/StudentNavbar.vue';
</script>
