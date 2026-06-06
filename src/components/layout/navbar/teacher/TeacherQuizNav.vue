<template>
  <div class="quiz-topbar-wrapper w-100">
    <header class="topbar">
      
      <div class="tb-section grow border-0 align-items-center justify-content-start gap-2 flex-grow-1" style="min-width: 0;">
        <button class="btn btn-light d-lg-none shadow-sm p-1 px-2 flex-shrink-0" data-bs-toggle="offcanvas" data-bs-target="#sidebarMenu">
          <i class="fas fa-bars"></i>
        </button>
        <div class="d-flex align-items-center gap-2 w-100" style="max-width: 400px;">
          <input 
            type="text" 
            :value="quizTitle" 
            @input="$emit('update:quizTitle', $event.target.value)"
            class="form-control border-0 bg-transparent fw-bold p-0 shadow-none text-dark quiz-header-input" 
            placeholder="បញ្ចូលចំណងជើងកម្រងសំណួរ..."
          />
        </div>
      </div>

      <div class="tb-section border-0 gap-3 flex-shrink-0 align-items-center">
        <div class="select-wrapper">
          <select :value="status" @change="$emit('update:status', $event.target.value)" 
                  class="form-select form-select-sm border-0 fw-bold shadow-none cursor-pointer status-dropdown-select">
            <option value="draft">Status: Draft</option>
            <option value="active">Status: Active</option>
          </select>
        </div>
        
        <div class="d-flex align-items-center text-muted fw-bold timer-pill-box">
          <i class="fa-regular fa-clock text-warning clock-icon"></i>
          <input 
            type="number" 
            :value="duration" 
            @input="$emit('update:duration', parseInt($event.target.value) || 0)"
            class="form-control form-control-sm border text-dark fw-bold text-center shadow-none timer-num-field" 
            min="0"
          />
          <span class="mins-lbl">នាទី</span>
        </div>
      </div>

      <div class="tb-section border-0 d-none d-md-flex align-items-center flex-shrink-0">
        <span class="text-muted fw-bold saved-status-txt">
          <i class="fas fa-check-circle text-success me-1"></i> Save
        </span>
      </div>

      <div class="d-none d-sm-block divider-line"></div>

      <div class="tb-section gap-3 pe-0 border-0 flex-shrink-0 align-items-center">
        <div class="d-flex align-items-center gap-2 profile-pill-trigger"
          @click="goToProfile"
          style="cursor: pointer; padding: 4px; border-radius: 12px; transition: .2s;">
            
            <img :src="authStore.avatarUrl" alt="avatar" class="user-avatar-img"/>
            <div class="d-none d-sm-flex flex-column justify-content-center" style="line-height: 1.1;">
              <span class="fw-bold user-name-text">{{ authStore.fullName }}</span>
              <span class="user-role-text">គ្រូបង្រៀន</span>
            </div>
            <i class="fas fa-chevron-down ms-1 text-muted d-none d-sm-block arrow-down-icon"></i>
        </div>
      </div>

    </header>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router'; 
import { useAuthStore } from '@/stores/auth'; 

defineProps({
  quizTitle: { type: String, default: 'Create Quiz' },
  duration: { type: [Number, String], default: 60 },
  status: { type: String, default: 'draft' }
});

defineEmits(['update:quizTitle', 'update:duration', 'update:status']);

const authStore = useAuthStore();
const router = useRouter(); 

const goToProfile = () => {
  router.push('/teacher/profile'); 
};

onMounted(() => {
  authStore.fetchUserProfile();
});
</script>

<style scoped>
.topbar {
  height: 70px; 
  background: var(--surf, #ffffff);
  border-bottom: 1px solid var(--bdr, #e2e8f0);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
    width: auto;
  margin-left: 240px; 
  box-sizing: border-box;
}
@media (max-width: 991px) {
  .topbar {
    margin-left: 0 !important;
  }
}
.tb-section {
  display: flex;
  align-items: center;
  gap: 12px;
  height: 100%;
}
.tb-section.grow { flex: 1; }

/* Input ចំណងជើង Quiz */
.quiz-header-input {
  font-size: 1.2rem; /* ប៉ុនគ្នាទៅនឹងទំព័រផ្សេងៗ */
  outline: none; 
  line-height: 1; 
  font-family: inherit;
}
.quiz-header-input:focus {
  color: var(--em, #10b981);
}

/* Status Select Dropdown */
.status-dropdown-select {
  background-color: var(--em-soft, #ecfdf5); 
  color: var(--em, #10b981); 
  font-size: .75rem; 
  border-radius: 8px;
  padding: 6px 28px 6px 12px;
  height: 34px;
}

/* Timer Pill Box */
.timer-pill-box {
  font-size: .75rem;
  background: #f8fafc;
  border: 1px solid var(--bdr, #e2e8f0);
  padding: 4px 12px;
  border-radius: 8px;
  height: 34px;
}
.clock-icon { font-size: .85rem; }
.timer-num-field {
  width: 38px; 
  height: 22px; 
  font-size: .75rem; 
  border: none !important;
  background: transparent;
  outline: none !important;
}
.mins-lbl {
  font-size: 0.7rem;
  color: var(--txt-mu);
}

.saved-status-txt {
  font-size: .75rem;
}

/* Divider Line */
.divider-line {
  width: 1px; 
  height: 24px; 
  background: var(--bdr, #e2e8f0); 
  align-self: center;
  margin: 0 4px;
}

/* Profile Pill */
.profile-pill-trigger {
  padding: 4px; 
  border-radius: 12px;
  transition: .2s;
}
.user-avatar-img {
  width: 36px; 
  height: 36px; 
  border-radius: 50%; 
  object-fit: cover; 
  border: 2px solid var(--em-soft, #ecfdf5);
}
.user-name-text {
  font-size: .85rem; 
  color: var(--txt, #1e293b);
}
.user-role-text {
  font-size: .65rem; 
  color: var(--txt-mu, #64748b); 
  font-weight: 600;
}
.arrow-down-icon {
  font-size: 0.7rem;
}
</style>