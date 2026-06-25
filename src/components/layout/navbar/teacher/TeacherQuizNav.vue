<template>
  <div class="quiz-topbar-wrapper w-100">
    <header class="topbar">
      
      <!-- Left Section: Mobile Menu & Document Title -->
      <div class="tb-section grow border-0 align-items-center justify-content-start gap-2 flex-grow-1" style="min-width: 0;">
        <button class="btn btn-mobile-toggle d-lg-none flex-shrink-0" data-bs-toggle="offcanvas" data-bs-target="#sidebarMenu">
          <i class="fas fa-bars"></i>
        </button>
        <div class="d-flex align-items-center gap-2 w-100" style="max-width: 400px;">
          <input 
            type="text" 
            :value="quizTitle" 
            @input="$emit('update:quizTitle', $event.target.value)"
            class="form-control border-0 bg-transparent fw-bold p-0 shadow-none quiz-header-input" 
            placeholder="បញ្ចូលចំណងជើងកម្រងសំណួរ..."
          />
        </div>
      </div>

      <!-- Center Section: Status & Duration Controls with added horizontal padding -->
      <div class="tb-section border-0 gap-3 flex-shrink-0 align-items-center tb-center-controls">
        <!-- <div class="select-wrapper">
          <select 
            :value="status" 
            @change="$emit('update:status', $event.target.value)" 
            class="form-select form-select-sm border-0 fw-bold shadow-none cursor-pointer status-dropdown-select"
          >
            <option value="draft">Status: Draft</option>
            <option value="active">Status: Active</option>
          </select>
        </div> -->
        

      </div>

      <!-- Saved Status Indicators (Hidden on small screens) -->
      <div class="tb-section border-0 d-none d-md-flex align-items-center flex-shrink-0">
        <span class="text-muted fw-bold saved-status-txt">
          <i class="fas fa-check-circle text-success me-1"></i> រក្សាទុករួចរាល់
        </span>
      </div>  

      <div class="d-none d-sm-block divider-line"></div>

      <!-- Right Section: Profile Pill Trigger -->
      <div class="tb-section gap-3 pe-0 border-0 flex-shrink-0 align-items-center">
        <div class="d-flex align-items-center gap-2.5 profile-pill-trigger" @click="goToProfile">
          <img :src="authStore.avatarUrl || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'" alt="avatar" class="user-avatar-img"/>
          <div class="d-none d-sm-flex flex-column justify-content-center text-start" style="line-height: 1.2;">
            <span class="fw-bold user-name-text">{{ authStore.fullName || 'គណនីគ្រូ' }}</span>
            <span class="user-role-text">គ្រូបង្រៀន</span>
          </div>
          <i class="fas fa-chevron-down ms-0.5 text-muted d-none d-sm-block arrow-down-icon"></i>
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
  quizTitle: { type: String, default: 'បង្កើតការប្រឡង' },
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
  --em:          #10b981;
  --em-dk:       #059669;
  --em-soft:     #f0fdf4;
  --em-mid:      rgba(16, 185, 129, 0.15);
  --txt-main:    #0f172a;
  --txt-sub:     #475569;
  --txt-muted:   #94a3b8;
  --surf-card:   #ffffff;
  --bdr:         #e2e8f0;
  --radius-sm:   8px;
  --radius-md:   12px;
  --shadow-sm:   0 1px 3px rgba(15, 23, 42, 0.03);

  height: 79px; 
  background: var(--surf-card);
  border-bottom: 1px solid var(--bdr);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  width: auto;
  margin-left: 240px; 
  box-sizing: border-box;
  font-family: "Kantumruy Pro", "Inter", sans-serif;
  user-select: none;
}

@media (max-width: 991px) {
  .topbar {
    margin-left: 0 !important;
    padding: 0 16px;
  }
}

.tb-section {
  display: flex;
  align-items: center;
  gap: 12px;
  height: 100%;
}

.tb-section.grow { 
  flex: 1; 
}

/* Center Section: Space Isolation */
.tb-center-controls {
  padding: 0 12px;
  margin: 0 4px;
}

@media (max-width: 991px) {
  .tb-center-controls {
    padding: 0;
    margin: 0;
  }
}

/* Mobile Sidebar Drawer Button */
.btn-mobile-toggle {
  background-color: #f8fafc;
  border: 1px solid var(--bdr);
  color: var(--txt-sub);
  padding: 6px 12px;
  border-radius: var(--radius-sm);
  transition: all 0.2s;
  box-shadow: var(--shadow-sm);
}

.btn-mobile-toggle:hover {
  background-color: #f1f5f9;
  color: var(--txt-main);
  border-color: var(--txt-muted);
}

/* Quiz Title Input styling */
.quiz-header-input {
  font-size: 1.15rem !important; 
  outline: none !important; 
  line-height: 1.2; 
  color: var(--txt-main) !important;
  font-weight: 700 !important;
  font-family: inherit;
  transition: color 0.15s;
}

.quiz-header-input:focus {
  color: var(--em-dk) !important;
}

.quiz-header-input::placeholder {
  color: var(--txt-muted);
}

/* Status Select Dropdown - Soft Green Default styling */
.status-dropdown-select {
  font-size: 0.75rem !important; 
  border-radius: var(--radius-sm) !important;
  padding: 6px 32px 6px 12px !important;
  height: 36px;
  background-color: var(--em-soft) !important;
  color: var(--em-dk) !important;
  border: 1px solid var(--em-mid) !important;
  transition: all 0.2s ease;
}

.status-dropdown-select:focus {
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1) !important;
}

/* Timer Pill Box Container */
.timer-pill-box {
  font-size: 0.78rem;
  background: #f8fafc;
  border: 1px solid var(--bdr);
  padding: 4px 12px;
  border-radius: var(--radius-sm);
  height: 36px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.clock-icon { 
  font-size: 0.85rem; 
  color: var(--em-dk); /* Changed from orange to match theme */
}

.timer-num-field {
  width: 38px; 
  height: 24px !important; 
  font-size: 0.82rem !important; 
  border: none !important;
  background: transparent !important;
  outline: none !important;
  color: var(--txt-main) !important;
  font-weight: 700 !important;
  padding: 0 !important;
}

.timer-num-field::-webkit-outer-spin-button,
.timer-num-field::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.timer-num-field[type=number] {
  appearance: textfield;
  -moz-appearance: textfield;
}

.mins-lbl {
  font-size: 0.7rem;
  color: var(--txt-muted);
}

.saved-status-txt {
  font-size: 0.75rem;
  color: var(--txt-muted) !important;
}

/* Divider Line */
.divider-line {
  width: 1px; 
  height: 24px; 
  background: var(--bdr); 
  align-self: center;
  margin: 0 4px;
}

/* Profile Pill Component */
.profile-pill-trigger {
  border: 1px solid transparent;
  transition: all 0.2s ease;
}

.profile-pill-trigger:hover {
  background-color: #f8fafc;
  border-color: var(--bdr);
}

.user-avatar-img {
  width: 34px; 
  height: 34px; 
  border-radius: 50%; 
  object-fit: cover; 
  border: 2px solid var(--em-soft);
}

.user-name-text {
  font-size: 0.82rem; 
  color: var(--txt-main);
}

.user-role-text {
  font-size: 0.65rem; 
  color: var(--txt-muted); 
  font-weight: 600;
}

.arrow-down-icon {
  font-size: 0.7rem;
  color: var(--txt-muted);
}
</style>