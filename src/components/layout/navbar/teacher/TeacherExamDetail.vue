<template>
  <div class="topbar-exam-detail w-100">
    <div class="topbar">
      
      <div class="d-flex align-items-center gap-2 flex-grow-1" style="min-width: 0;">
        <button class="btn btn-light d-lg-none shadow-sm flex-shrink-0" data-bs-toggle="offcanvas" data-bs-target="#sidebarMenu">
          <i class="fas fa-bars"></i>
        </button>

        <div class="room-hd w-100 me-3">
          <div class="room-hd-left">
            <button class="btn-back" @click="goBack">
              <i class="fas fa-arrow-left"></i>
            </button>
            <div class="text-start">
              <div class="crumb">
                <router-link to="/teacher/room-management">គ្រប់គ្រងថ្នាក់រៀន</router-link>
                <i class="fas fa-chevron-right"></i>
                <span class="text-truncate" style="max-width: 150px;">{{ roomName }}</span>
                <i class="fas fa-chevron-right"></i>
                <span class="crumb-cur">{{ currentTabLabel }}</span>
              </div>
              <div class="page-title">{{ pageTitle }} <span class="title-dot">.</span></div>
            </div>
          </div>
          <span v-if="showCount" class="hd-count">{{ examCount }} សំណួរ</span>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth'; 

const props = defineProps({
  roomName: { type: String, default: '...' },
  currentTabLabel: { type: String, default: 'វិញ្ញាសា' },
  pageTitle: { type: String, default: '...' }, 
  examCount: { type: Number, default: 0 },
  showCount: { type: Boolean, default: true }
});

const router = useRouter();
const authStore = useAuthStore();

const goBack = () => {
  router.go(-1);
};

onMounted(() => {
  if (!authStore.fullName) {
    authStore.fetchUserProfile();
  }
});
</script>

<style scoped>
.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 24px;
  background: #ffffff;
  border-bottom: 1px solid var(--bdr, #e2e8f0);
}

.topbar-exam-detail  {
  width: 100%;
}

.room-hd {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.room-hd-left {
  display: flex;
  align-items: center;
  gap: 14px;
}
.btn-back {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  border: 1px solid #eef1f6;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #64748b;
  transition: all 0.2s ease;
}
.btn-back:hover {
  background: #f8fafc;
  color: #0F6E56;
}
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
}
.crumb i { 
  font-size: 8px; 
  color: #cbd5e1; 
}
.crumb-cur { 
  color: #334155; 
  font-weight: 600; 
}
.page-title { 
  font-size: 18px; 
  font-weight: 700; 
  color: #1e293b; 
  line-height: 1.2; 
}
.title-dot { 
  color: #f15a24; 
}
.hd-count {
  font-size: 11px;
  font-weight: 600;
  color: #475569;
  background: #e2e8f0;
  border-radius: 20px;
  padding: 3px 10px;
}

.profile-dropdown-trigger {
  border: 1px solid var(--bdr, #e2e8f0); 
  background: #ffffff; 
  cursor: pointer; 
  transition: all 0.2s ease; 
  box-shadow: var(--sh-sm, 0 1px 2px rgba(0,0,0,0.05));
}
.profile-dropdown-trigger:hover {
  border-color: #cbd5e1;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}
.avatar-image {
  width: 32px; 
  height: 32px; 
  border-radius: 50%; 
  object-fit: cover;
}
.text-container {
  line-height: 1.1;
}
.profile-name {
  font-size: .8rem; 
  color: var(--txt, #1e293b);
}
.profile-role {
  font-size: .65rem; 
  color: var(--txt-mu, #64748b); 
  font-weight: 500;
}
</style>