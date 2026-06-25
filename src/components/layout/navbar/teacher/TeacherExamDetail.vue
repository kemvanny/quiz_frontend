<template>
  <div class="main-content">
    <div class="topbar">
      <!-- Left Column: Controls + Breadcrumbs + Exam Details -->
      <div class="left-section">
        <button 
          class="btn-control d-lg-none" 
          data-bs-toggle="offcanvas" 
          data-bs-target="#sidebarMenu" 
          aria-label="Toggle Sidebar"
        >
          <i class="fas fa-bars"></i>
        </button>
        <button 
          @click="goBack" 
          class="btn-control" 
          aria-label="Go Back"
        >
          <i class="fas fa-arrow-left"></i>
        </button>

        <!-- Dynamic Breadcrumb Trail & Title Stack -->
        <div class="title-area">
          <div class="crumb">
            <router-link to="/teacher/room-management">គ្រប់គ្រងថ្នាក់រៀន</router-link>
            <i class="fas fa-chevron-right"></i>
            <span class="text-truncate" style="max-width: 150px;">{{ examStore.currentRoomName || '...' }}</span>
            <i class="fas fa-chevron-right"></i>
            <span class="crumb-cur">វិញ្ញាសា</span>
          </div>
          
          <h1 class="page-title">
            <span class="text-truncate title-text">{{ examStore.currentExamTitle || 'កំពុងផ្ទុក...' }}</span>
            <span class="title-dot">.</span>
            <span class="hd-count">{{ examStore.currentQuestionCount }} សំណួរ</span>
          </h1>
        </div>
      </div>

      <!-- Right Column: Premium User Profile Pill -->
      <div class="right-section">
        <div class="instructor-profile">
          <img 
            :src="authStore.avatarUrl" 
            alt="avatar" 
            class="profile-avatar" 
          />
          <div class="profile-details">
            <span class="profile-name">{{ authStore.fullName }}</span>
            <span class="profile-role">គ្រូបង្រៀន</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth'; 
import { useExamStore } from '@/stores/examStore';

// Stores & Router
const authStore = useAuthStore();
const examStore = useExamStore();
const router = useRouter();

// Navigation Logic

const goBack = () => {
  router.push({ name: 'RoomDetails' }); 
};

// Lifecycle Hooks
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

/* Left Section: Buttons & Titles */
.left-section {
  display: flex;
  align-items: center;
  gap: 14px;
  min-width: 0;
  flex: 1;
}

.title-area {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: 0;
  user-select: none;
}

/* Breadcrumbs (Crumb Trail) */
.crumb {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  color: #94a3b8;
  margin-bottom: 2px;
  font-weight: 500;
}

.crumb a { 
  color: #64748b; 
  text-decoration: none; 
  transition: color 0.15s ease;
}

.crumb a:hover {
  color: var(--em);
}

.crumb i { 
  font-size: 8px; 
  color: #cbd5e1; 
}

.crumb-cur { 
  color: #334155; 
  font-weight: 600; 
}

/* Page Title with Count Badge */
.page-title {
  font-size: 1.15rem;
  font-weight: 800;
  color: var(--txt);
  margin: 0;
  line-height: 1.2;
  display: flex;
  align-items: center;
  min-width: 0;
}

.title-text {
  max-width: 280px;
}

.title-dot {
  color: #f15a24;
  margin-right: 8px;
}

.hd-count {
  font-size: 11px;
  font-weight: 600;
  color: #475569;
  background: #e2e8f0;
  border-radius: 20px;
  padding: 3px 10px;
  white-space: nowrap;
}

/* Control Buttons (Toggle & Back) */
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
  box-shadow: var(--sh-sm);
}

/* Right Section: Profile Pill */
.right-section {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-shrink: 0;
}

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
  border: 1.5px solid var(--em-mid);
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

/* Responsive Styles */
@media (max-width: 768px) {
  .title-text {
    max-width: 180px;
  }
}

@media (max-width: 576px) {
  .topbar {
    padding: 10px 16px;
  }
  .crumb {
    display: none; /* Keeps header clean and un-wrapped on mobile */
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