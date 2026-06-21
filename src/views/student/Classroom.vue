<template>
  <div>
    <div class="filter-row">
      <div class="search-pill">
        <i class="fas fa-search" style="color: var(--txt-mu); font-size: 0.85rem"></i>
        <input v-model="searchQuery" type="text" placeholder="ស្វែងរកវគ្គសិក្សា ឬគ្រូបង្រៀន..."
          @input="currentPage = 1" />
      </div>
    </div>

    <div v-if="isLoading" class="room-grid">
      <div v-for="n in itemsPerPage" :key="'skeleton-' + n" class="room-card skeleton-card">
        <div class="card-banner skeleton-animated"></div>
        <div class="room-card card-body" style="padding-top: 42px;">
          <div class="skeleton-line skeleton-title skeleton-animated"></div>
          <div class="skeleton-line skeleton-text skeleton-animated"></div>
        </div>
        <div class="card-footer" style="background: #fafbfc;">
          <div class="skeleton-line skeleton-footer-text skeleton-animated"></div>
        </div>
      </div>
    </div>

    <div v-else-if="errorMessage" class="text-center py-5 text-danger" style="font-weight: bold;">
      {{ errorMessage }}
    </div>

    <div v-else-if="paginatedRooms.length === 0" class="text-center py-5"
      style="color: var(--txt-mu); font-size: 1.1rem;">
      មិនមានបន្ទប់សិក្សាឡើយ
    </div>

    <div v-else class="room-grid">
  <router-link 
    v-for="(room, index) in paginatedRooms" 
    :key="room.id" 
    :to="{ name: 'RoomDetail', params: { room_id: room.id } }" 
    class="room-card text-decoration-none"
  >
    <div class="card-banner" :class="getBannerClass(index)">
      <div class="status-chip">
        <div class="status-dot" style="background: #10b981;"></div>
        {{ translateStatus(room.invitation_status) }}
      </div>
      <div class="card-icon" style="background: linear-gradient(135deg, var(--em), var(--em-dk));">
        <img :src="`${imgBaseUrl}${room.thumnail}`" alt="">
        <i class="fas fa-code"></i>
      </div>
    </div>

    <div class="card-body">
      <div class="card-title text-dark">{{ room.name }}</div>
      <div class="card-instructor text-muted">
        <span>បង្រៀនដោយ: {{ room.teacher_name }}</span>
      </div>
    </div>

    <div class="card-footer">
      <div class="footer-note text-muted">
        <i class="far fa-calendar-alt" style="color: var(--em)"></i>
        ចុចទីនេះដើម្បីចូលបន្ទប់សិក្សា
      </div>
      <i class="fas fa-arrow-right" style="color: var(--txt-mu); font-size: 0.78rem"></i>
    </div>
  </router-link>
</div>

    <div v-if="totalPages > 1 && !isLoading" class="pagination-container">
      <button class="page-btn" :disabled="currentPage === 1" @click="changePage(currentPage - 1)">
        <i class="fas fa-chevron-left"></i> ថយក្រោយ
      </button>

      <span class="page-info">ទំព័រ {{ currentPage }} នៃ {{ totalPages }}</span>

      <button class="page-btn" :disabled="currentPage === totalPages" @click="changePage(currentPage + 1)">
        បន្ទាប់ <i class="fas fa-chevron-right"></i>
      </button>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { getAllRoom } from '@/api/student.api';
const imgBaseUrl = import.meta.env.VITE_BASE_URL_FOR_IMAGE;

const rooms = ref([]);
const isLoading = ref(false);
const errorMessage = ref('');

const searchQuery = ref('');
const activeTab = ref('All');

const currentPage = ref(1);
const itemsPerPage = ref(8);

const fetchRooms = async () => {
  isLoading.value = true;
  errorMessage.value = '';
  try {
    const response = await getAllRoom();
    if (response.data && response.data.result === true && response.data.data) {

      if (Array.isArray(response.data.data.data)) {
        rooms.value = response.data.data.data;
      } else if (Array.isArray(response.data.data)) {
        rooms.value = response.data.data;
      } else {
        rooms.value = [];
      }
    } else {
      rooms.value = [];
    }

  } catch (error) {
    errorMessage.value = "មិនអាចទាញយកទិន្នន័យបន្ទប់សិក្សាបានទេ!";
    rooms.value = [];
  } finally {
    setTimeout(() => {
      isLoading.value = false;
    }, 450);
  }
};

const getBannerClass = (index) => {
  const colors = ['green', 'blue', 'amber', 'purple', 'rose', 'cyan'];
  return colors[index % colors.length];
};

const filteredRooms = computed(() => {
  if (!Array.isArray(rooms.value)) return [];

  return rooms.value.filter(room => {
    const roomName = (room.name || '').toLowerCase();
    const teacherName = (room.teacher_name || '').toLowerCase();
    const searchTarget = searchQuery.value.toLowerCase();
    const matchesSearch = roomName.includes(searchTarget) || teacherName.includes(searchTarget);
    return matchesSearch;
  });
});
const totalPages = computed(() => {
  return Math.ceil(filteredRooms.value.length / itemsPerPage.value) || 1;
});

const paginatedRooms = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredRooms.value.slice(start, end);
});

const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};
const translateStatus = (status) => {
  if (!status) return 'មិនច្បាស់';
  const statusLower = status.toLowerCase().trim();
  switch (statusLower) {
    case 'accepted':
      return 'បានចូលរួម';
    case 'pending':
      return 'កំពុងរង់ចាំ';
    case 'rejected':
      return 'បានបដិសេធ';
    default:
      return status;
  }
};

onMounted(() => {
  fetchRooms();
});
</script>

<style scoped>
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

:root {
  --em: #10b981;
  --em-dk: #059669;
  --em-soft: #ecfdf5;
  --txt: #0f172a;
  --txt-m: #475569;
  --txt-mu: #94a3b8;
  --surf: #ffffff;
  --bdr: #e2e8f0;
  --sh-sm: 0 4px 12px rgba(0, 0, 0, 0.03);
  --sh-md: 0 10px 25px rgba(0, 0, 0, 0.05);
  --sh-hover: 0 20px 40px rgba(16, 185, 129, 0.13);
}

body {
  font-family: "Inter", sans-serif;
  background-color: #f4f7fe;
  color: var(--txt);
}

/* ── FILTER ROW ── */
.filter-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 30px;
}

.search-pill {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #fff;
  border: 1px solid var(--bdr);
  border-radius: 14px;
  padding: 10px 18px;
  width: 280px;
  box-shadow: var(--sh-sm);
}

.search-pill input {
  border: none;
  outline: none;
  background: transparent;
  font-size: 0.85rem;
  color: var(--txt);
  width: 100%;
}

/* ── ROOM GRID ── */
.room-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 24px;
}

/* ── ROOM CARD ── */
.room-card {
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(10px);
  border: 1px solid var(--bdr);
  border-radius: 22px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: 318px;
  transition: all 0.28s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: var(--sh-sm);
  cursor: pointer;
  text-decoration: none;
}

.room-card:hover {
  border-color: rgba(16, 185, 129, 0.3);
  transform: translateY(-5px);
  box-shadow: var(--sh-hover);
}

.card-banner {
  height: 110px;
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  padding: 16px;
}

.card-banner.green { background: linear-gradient(135deg, #d1fae5, #a7f3d0); }
.card-banner.blue { background: linear-gradient(135deg, #dbeafe, #bfdbfe); }
.card-banner.amber { background: linear-gradient(135deg, #fef9c3, #fde68a); }
.card-banner.purple { background: linear-gradient(135deg, #ede9fe, #ddd6fe); }
.card-banner.rose { background: linear-gradient(135deg, #ffe4e6, #fecdd3); }
.card-banner.cyan { background: linear-gradient(135deg, #cffafe, #a5f3fc); }

.status-chip {
  background: rgba(255, 255, 255, 0.82);
  backdrop-filter: blur(6px);
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.73rem;
  font-weight: 700;
  color: var(--txt-m);
  display: flex;
  align-items: center;
  gap: 5px;
}

.status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
}

.card-icon {
  position: absolute;
  bottom: -22px;
  left: 22px;
  width: 56px;
  height: 56px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  border: 4px solid #fff;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
  color: #fff;
}

.room-card .card-body {
  padding: 42px 26px 20px;
  flex: 1;
  min-width: 0;
}

.room-card .card-title {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--txt);
  margin-bottom: 6px;
  line-height: 1.3;
  min-height: 2.6em;
}

.room-card .card-instructor {
  display: flex;
  align-items: center;
  gap: 7px;
  margin-bottom: 18px;
}

.room-card .card-instructor span {
  font-size: 0.8rem;
  color: var(--txt-mu);
  font-weight: 600;
}

.room-card .card-footer {
  padding: 14px 26px;
  border-top: 1px solid var(--bdr);
  background: #fafbfc;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.room-card .footer-note {
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--txt-mu);
  display: flex;
  align-items: center;
  gap: 6px;
}

/* ── 🌟 SKELETON LOADING STYLES ── */
.skeleton-card {
  cursor: default;
  pointer-events: none;
}

.skeleton-card .card-banner {
  background: #e2e8f0;
}

.skeleton-line {
  background: #e2e8f0;
  border-radius: 6px;
}

.skeleton-title {
  width: 85%;
  height: 1.25rem;
  margin-bottom: 12px;
}

.skeleton-text {
  width: 55%;
  height: 0.9rem;
}

.skeleton-footer-text {
  width: 65%;
  height: 0.85rem;
}

.skeleton-animated {
  position: relative;
  overflow: hidden;
}

.skeleton-animated::after {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transform: translateX(-100%);
  background-image: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.5) 20%,
    rgba(255, 255, 255, 0.6) 60%,
    rgba(255, 255, 255, 0) 100%
  );
  animation: shunt-shimmer 2s infinite;
  content: '';
}

@keyframes shunt-shimmer {
  100% {
    transform: translateX(100%);
  }
}

/* ── PAGINATION STYLE ── */
.pagination-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-top: 35px;
}

.page-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border: 1px solid var(--bdr);
  border-radius: 10px;
  background: #fff;
  color: var(--txt-m);
  font-size: 0.83rem;
  font-weight: 700;
  cursor: pointer;
}

.page-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-info {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--txt-m);
}

.text-center { text-align: center; }
.py-5 { padding-top: 3rem; padding-bottom: 3rem; }
.text-danger { color: #ef4444; }
</style>