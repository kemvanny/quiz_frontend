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
                <span class="text-truncate" style="max-width: 150px;">{{ examStore.currentRoomName || '...' }}</span>
                <i class="fas fa-chevron-right"></i>
                <span class="crumb-cur">វិញ្ញាសា</span>
              </div>
              <div class="page-title">{{ examStore.currentExamTitle || 'កំពុងផ្ទុក...' }} <span class="title-dot">.</span></div>
            </div>
          </div>
          
          <span class="hd-count">{{ examStore.currentQuestionCount }} សំណួរ</span>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useExamStore } from '@/stores/examStore';

const examStore = useExamStore();
const router = useRouter();

const goBack = () => {
  router.push('/teacher/room-management');
};
</script>

<style scoped>
.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 24px;
  background: #ffffff;
  border-bottom: 1px solid #e2e8f0;
  width: 100%; /* បង្ខំឱ្យពេញទទឹង */
  box-sizing: border-box; /* ធានាថា padding មិនធ្វើឱ្យវាហួសទំហំ */
}

.topbar-exam-detail {
  width: 100%;
  display: block; /* ត្រូវតែជា block */
}

.room-hd {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%; /* បន្ថែមបន្ទាត់នេះ ដើម្បីឱ្យវាពង្រីកពេញ */
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
.crumb a { color: #64748b; text-decoration: none; }
.crumb i { font-size: 8px; color: #cbd5e1; }
.crumb-cur { color: #334155; font-weight: 600; }
.page-title { font-size: 18px; font-weight: 700; color: #1e293b; line-height: 1.2; }
.title-dot { color: #f15a24; }
.hd-count {
  font-size: 11px;
  font-weight: 600;
  color: #475569;
  background: #e2e8f0;
  border-radius: 20px;
  padding: 3px 10px;
}
</style>