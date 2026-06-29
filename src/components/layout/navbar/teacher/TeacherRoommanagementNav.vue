<template>
  <div class="main-content">
    <div class="topbar">
      <!-- Left Column: Controls, Header Icon, and Dashboard Title -->
      <div class="left-section">
        <!-- Mobile Sidebar Toggle -->
        <button class="btn-control d-lg-none" data-bs-toggle="offcanvas" data-bs-target="#sidebarMenu"
          aria-label="Toggle Sidebar">
          <i class="fas fa-bars"></i>
        </button>

        <!-- Elegant Dashboard Header Icon -->
        <div class="dashboard-icon d-none d-sm-flex">
          <i class="fas fa-users-cog"></i>
        </div>

        <!-- Title Stack -->
        <div class="title-area">
          <h1 class="page-title">
            ការគ្រប់គ្រងថ្នាក់រៀន<span class="title-dot">.</span>
          </h1>
          <p class="page-subtitle d-none d-md-block">
            គ្រប់គ្រងថ្នាក់រៀន និងសិស្សដែលបានចុះឈ្មោះ
          </p>
        </div>
      </div>

      <!-- Right Column: Actions & Instructor Pill -->
      <div class="right-section">
        <!-- Modern New Room Button -->
        <button class="btn-create-room" @click="isCreateRoomOpen = true">
          <i class="fas fa-plus"></i>
          <span class="d-none d-sm-inline">ថ្នាក់ថ្មី</span>
        </button>

        <!-- Divider Line -->
        <div class="divider d-none d-sm-block"></div>

        <!-- Instructor Profile Pill -->
        <div class="instructor-profile">
          <img :src="authStore.avatarUrl" alt="avatar" class="profile-avatar" />
          <router-link to="/teacher/profile" class="d-none d-sm-flex flex-column justify-content-center pe-2"
            style="line-height: 1.1;">
            <span class="fw-bold" style="font-size: .8rem; color: var(--txt);">{{ authStore.fullName }}</span>
            <span style="font-size: .65rem; color: var(--txt-mu); font-weight: 500;">គ្រូបង្រៀន</span>
          </router-link>
        </div>
      </div>
    </div>
  </div>

  <CreateRoomModal :is-open="isCreateRoomOpen" :existing-rooms="backendRooms" @close="isCreateRoomOpen = false"
    @created="onRoomCreated" />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import CreateRoomModal from '@/components/teacher/CreateRoomModal.vue';
import { useAuthStore } from '@/stores/auth';

const isCreateRoomOpen = ref(false);
const emit = defineEmits(['room-created']);

const authStore = useAuthStore();

const onRoomCreated = (roomData) => {
  isCreateRoomOpen.value = false;
  emit('room-created', roomData);
};

onMounted(() => {
  authStore.fetchUserProfile();
});
</script>

<style scoped>
/* Glassmorphism Header Structure */
.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 24px;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--bdr);
  position: sticky;
  top: 0;
  z-index: 1000;
  width: 100%;
  box-sizing: border-box;
}

/* Left Section: Icon & Titles */
.left-section {
  display: flex;
  align-items: center;
  gap: 14px;
  min-width: 0;
  flex: 1;
}

.dashboard-icon {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: var(--em-soft);
  color: var(--em-dk);
  font-size: 1.15rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(16, 185, 129, 0.15);
  box-shadow: var(--sh-sm);
  flex-shrink: 0;
}

.title-area {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: 0;
  user-select: none;
}

/* Dashboard Titles */
.page-title {
  font-size: 1.15rem;
  font-weight: 800;
  color: var(--txt);
  margin: 0;
  line-height: 1.2;
  letter-spacing: -0.2px;
  text-truncate: ellipsis;
}

.title-dot {
  color: var(--em);
}

.page-subtitle {
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--txt-mu);
  margin: 2px 0 0 0;
  font-family: 'Kantumruy Pro', 'Inter', sans-serif;
  text-truncate: ellipsis;
}

/* Control Buttons (Mobile Sidebar Trigger) */
.btn-control {
  background: #ffffff;
  border: 1px solid var(--bdr);
  box-shadow: var(--sh-sm);
  width: 38px;
  height: 38px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--txt-mu);
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  flex-shrink: 0;
}

.btn-control:hover {
  color: var(--em);
  border-color: var(--em-mid);
  transform: translateY(-1px);
  box-shadow: var(--sh-md);
}

.btn-control:active {
  transform: translateY(1px);
}

/* Right Section: Button, Divider & Profile Pill */
.right-section {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  flex-shrink: 0;
}

/* Premium New Room CTA */
.btn-create-room {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: linear-gradient(135deg, var(--em), var(--em-dk));
  color: #ffffff;
  border: none;
  border-radius: 12px;
  padding: 8px 18px;
  font-size: 0.82rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: var(--sh-sm);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  white-space: nowrap;
}

.btn-create-room:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.25);
}

.btn-create-room:active {
  transform: translateY(1px);
  box-shadow: var(--sh-sm);
}

/* Dynamic Vertical Separator */
.divider {
  width: 1px;
  height: 24px;
  background-color: var(--bdr);
}

/* Profile Pill component */
.instructor-profile {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 4px 14px 4px 4px;
  border-radius: 30px;
  background: #ffffff;
  border: 1px solid var(--bdr);
  box-shadow: var(--sh-sm);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  user-select: none;
  cursor: pointer;
}

.instructor-profile:hover {
  border-color: var(--em-mid);
  box-shadow: var(--sh-md);
  transform: translateY(-1px);
}

.profile-avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  object-fit: cover;
  border: 1.5px solid var(--em-soft);
  transition: transform 0.2s ease;
}

.instructor-profile:hover .profile-avatar {
  transform: scale(1.05);
}

.profile-details {
  display: flex;
  flex-direction: column;
  justify-content: center;
  line-height: 1.1;
}

.profile-name {
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--txt);
}

.profile-role {
  font-size: 0.65rem;
  color: var(--txt-mu);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Responsive Rulesets */
@media (max-width: 576px) {
  .topbar {
    padding: 10px 16px;
  }

  .page-title {
    font-size: 1rem;
  }

  .profile-details {
    display: none;
  }

  .instructor-profile {
    padding: 4px;
  }
}
</style>