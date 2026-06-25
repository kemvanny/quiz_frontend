<template>
  <div class="main-content">
    <div class="topbar">
      <div class="d-flex align-items-center gap-2 flex-grow-1 position-relative" style="min-width: 0;">
        <button class="btn btn-light d-lg-none shadow-sm flex-shrink-0" data-bs-toggle="offcanvas" data-bs-target="#sidebarMenu">
            <i class="fas fa-bars"></i>
        </button>

        <div class="search-wrapper flex-grow-1" style="max-width: 380px;">
          <div class="d-flex align-items-center gap-2 p-2 rounded-pill"
               style="border: 1px solid var(--bdr); background: #ffffff; box-shadow: var(--sh-sm); transition: .2s;"
               onfocusin="this.style.borderColor='var(--em)'" 
               onfocusout="this.style.borderColor='var(--bdr)'">
            <i class="fas fa-search text-muted ms-2"></i>
            <input 
                type="text" 
                :value="modelValue"
                @input="$emit('update:modelValue', $event.target.value)"
                class="border-0 bg-transparent shadow-none w-100 ms-2"
                style="outline: none; font-size: 0.85rem; color: var(--txt);"
                placeholder="ស្វែងរកការប្រឡង..."
            >
          </div>

          <div v-if="modelValue && filteredExams.length > 0" class="suggestions-dropdown shadow-sm">
            <router-link 
                v-for="exam in filteredExams.slice(0, 5)" 
                :key="exam.id" 
                :to="`/teacher/room-management/${exam.room_id || '0'}/exams/${exam.id}`"
                class="suggestion-item"
            >
                <i class="fas fa-search me-2 text-muted"></i> {{ exam.title }}
            </router-link>
          </div>
        </div>
      </div>

      <div class="d-flex align-items-center gap-2 p-1 pe-2 rounded-pill flex-shrink-0"
           style="border: 1px solid var(--bdr); background: #ffffff; cursor: pointer; transition: .2s; box-shadow: var(--sh-sm);"
           onmouseover="this.style.borderColor='#cbd5e1'; this.style.boxShadow='0 4px 12px rgba(0,0,0,.05)'"
           onmouseout="this.style.borderColor='var(--bdr)'; this.style.boxShadow='var(--sh-sm)'">
        <img :src="authStore.avatarUrl" alt="avatar" style="width: 32px; height: 32px; border-radius: 50%; object-fit: cover;" />
        <div class="d-none d-sm-flex flex-column justify-content-center pe-2" style="line-height: 1.1;">
            <span class="fw-bold" style="font-size: .8rem; color: var(--txt);">{{ authStore.fullName }}</span>
            <span style="font-size: .65rem; color: var(--txt-mu); font-weight: 500;">គ្រូបង្រៀន</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth'; 

const props = defineProps(['modelValue', 'allExams']);
defineEmits(['update:modelValue']);

const authStore = useAuthStore();

// Logic សម្រាប់ត្រងយកលទ្ធផលស្វែងរក
const filteredExams = computed(() => {
    if (!props.allExams) return [];
    return props.allExams.filter(exam => 
        exam.title && exam.title.toLowerCase().includes(props.modelValue.toLowerCase())
    );
});

onMounted(() => {
  authStore.fetchUserProfile();
});
</script>

<style scoped>
.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  background: white;
  width: 100%;
}

.search-wrapper { position: relative; }

.suggestions-dropdown {
  position: absolute;
  top: 110%;
  left: 0;
  width: 100%;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  z-index: 1000;
  padding: 8px 0;
  margin-top: 5px;
  max-height: 300px;
  overflow-y: auto;
}

.suggestion-item {
  display: block;
  padding: 10px 16px;
  text-decoration: none;
  color: #334155;
  font-size: 0.85rem;
  transition: 0.2s;
}

.suggestion-item:hover {
  background: #f1f5f9;
  color: var(--emerald, #10b981);
}
</style>