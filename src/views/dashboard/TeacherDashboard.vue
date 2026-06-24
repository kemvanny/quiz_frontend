<template>
  <div class="teacher-dashboard">
    <div class="row g-4">
      <div class="col-12 col-lg-8">
        <!-- Stats Cards -->
        <div class="row g-3 mb-4">
          <div class="col-12 col-md-4" v-for="stat in stats" :key="stat.title">
            <div
              class="stat-card d-flex flex-column align-items-center text-center justify-content-center gap-2"
              @mouseover="stat.hover = true"
              @mouseleave="stat.hover = false"
              :style="
                stat.hover
                  ? {
                      transform: 'translateY(-2px)',
                      borderColor: 'var(--emerald)',
                    }
                  : {}
              "
            >
              <div
                class="d-flex align-items-center justify-content-center icon-box"
                :style="{ background: stat.bg, color: stat.color }"
              >
                <i :class="stat.icon"></i>
              </div>
              <div>
                <div class="stat-title">{{ stat.title }}</div>
                <div
                  class="d-flex align-items-baseline justify-content-center gap-2 mt-1"
                >
                  <div class="stat-value">{{ stat.value }}</div>
                  <span
                    :class="stat.trendClass"
                    class="small trend-text"
                    style="font-size: 0.78rem"
                  >
                    <i :class="stat.trendIcon" v-if="stat.trendIcon"></i>
                    {{ stat.trendText }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="custom-card mb-4">
          <h5 class="section-title mb-3">សកម្មភាពរហ័ស</h5>
          <div class="d-flex flex-wrap gap-3">
            <button class="btn-emerald fw-semibold" @click="goToCreateExam">
              <i class="fas fa-plus me-2"></i> បង្កើតការប្រឡង
            </button>
          </div>
        </div>

        <!-- ========================================================= -->
        <div class="custom-card mb-4">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h5 class="section-title mb-0">វិញ្ញាសារបស់ខ្ញុំ</h5>
            <span
              class="badge bg-success bg-opacity-10 text-success rounded-pill px-3"
              style="font-size: 0.75rem; font-weight: 700"
            >
              {{ examList.length }} វិញ្ញាសា
            </span>
          </div>

          <div v-if="isLoading" class="text-center py-4">
            <div
              class="spinner-border text-success spinner-border-sm"
              role="status"
            ></div>
          </div>

          <div
            v-else-if="examList.length === 0"
            class="text-center py-4 text-muted small"
          >
            <p>មិនទាន់មានវិញ្ញាសាណាមួយត្រូវបានបង្កើតឡើយ។</p>
          </div>

          <div v-if="searchQuery.length > 0" class="search-results-list mb-4">
            <div
              v-for="exam in paginatedExams"
              :key="exam.id"
              class="search-row"
            >
              <div class="search-row-icon" :class="exam.status === 'active' ? 'sr-active' : 'sr-draft'">
                <i class="fas fa-file-alt"></i>
              </div>

              <div class="search-row-main">
                <span class="search-row-title">{{ exam.title }}</span>
                <span class="search-row-type">{{ exam.type }}</span>
              </div>

              <div class="search-row-meta">
                <span class="search-row-pts"><i class="far fa-clock me-1"></i>{{ exam.duration }} នាទី</span>
                <span class="sr-badge" :class="exam.status === 'active' ? 'srb-active' : 'srb-draft'">{{ exam.status }}</span>
              </div>

              <router-link
                :to="`/teacher/room-management/${exam.room_id || '0'}/exams/${exam.id}`"
                class="search-row-link"
              >
                <i class="fas fa-arrow-right"></i>
              </router-link>
            </div>
          </div>

          <div v-else class="row g-3">
            <div
              class="col-12 col-md-6"
              v-for="exam in paginatedExams"
              :key="exam.id"
            >
              <router-link
                :to="`/teacher/room-management/${exam.room_id || '0'}/exams/${exam.id}`"
                class="p-3 rounded-3 border bg-white h-100 d-flex flex-column text-decoration-none"
                style="
                  transition: 0.2s;
                  border-color: var(--bdr) !important;
                  color: inherit;
                  display: block;
                "
              >
                <div
                  class="d-flex justify-content-between align-items-center mb-2"
                >
                  <span
                    class="badge rounded-pill px-2.5 py-1"
                    :class="
                      exam.status === 'active'
                        ? 'bg-success bg-opacity-10 text-success'
                        : 'bg-warning bg-opacity-10 text-warning'
                    "
                  >
                    {{ exam.status === "active" ? "Active" : "Draft" }}
                  </span>
                  <span class="text-muted small fw-bold">
                    <i class="far fa-clock me-1"></i>{{ exam.duration }} នាទី
                  </span>
                </div>
                <h6 class="fw-bold text-dark mb-1 text-truncate">
                  {{ exam.title }}
                </h6>
                <div class="text-muted small mb-3">
                  Type:
                  <span class="text-uppercase fw-bold">{{ exam.type }}</span>
                </div>
                <div
                  class="d-flex justify-content-between align-items-center mt-auto pt-2 border-top border-light"
                >
                  <span class="fw-bold text-success" style="font-size: 0.82rem"
                    >ពិន្ទុ៖ {{ exam.total_points }}pt</span
                  >
                </div>
              </router-link>
            </div>
          </div>

          <div
            v-if="totalPages > 1"
            class="d-flex justify-content-center align-items-center gap-2 mt-4"
          >
            <button
              class="btn btn-sm btn-light border"
              :disabled="currentPage === 1"
              @click="currentPage--"
            >
              <i class="fas fa-chevron-left"></i>
            </button>
            <div class="d-flex gap-1">
              <button
                v-for="page in totalPages"
                :key="page"
                class="btn btn-sm"
                :class="
                  currentPage === page
                    ? 'btn-emerald text-white'
                    : 'btn-light border'
                "
                @click="currentPage = page"
                style="min-width: 32px"
              >
                {{ page }}
              </button>
            </div>
            <button
              class="btn btn-sm btn-light border"
              :disabled="currentPage === totalPages"
              @click="currentPage++"
            >
              <i class="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
        
      </div>

      <!-- Right Sidebar (Rooms, Expiring, Security) -->
      <div class="col-12 col-lg-4">
        <div class="custom-card d-flex flex-column" style="min-height: 380px">
          <h5 class="section-title mb-3">បន្ទប់សិក្សា</h5>

          <div
            v-if="loadingRooms"
            class="text-center py-4 flex-grow-1 d-flex align-items-center justify-content-center"
          >
            <div
              class="spinner-border text-success spinner-border-sm"
              role="status"
            ></div>
          </div>

          <div
            v-else-if="backendRooms.length === 0"
            class="text-center py-4 flex-grow-1 d-flex align-items-center justify-content-center text-muted small"
          >
            មិនទាន់មានបន្ទប់សិក្សានៅឡើយទេ។
          </div>

          <div v-else class="room-list flex-grow-1">
            <div
              class="room-item d-flex justify-content-between align-items-center"
              v-for="room in backendRooms.slice(0, 3)"
              :key="room.id"
            >
              <div>
                <p class="mb-0 text-dark room-name" style="font-size: 0.9rem">
                  {{ room.name || room.room_name }}
                </p>
                <small
                  class="text-muted"
                  style="font-size: 0.78rem; font-weight: 600"
                  >{{ room.student_count || room.count || 0 }} សិស្ស
                  Joined</small
                >
              </div>
              <router-link
                to="/teacher/room-management"
                class="text-success text-decoration-none small"
                style="font-size: 0.85rem; font-weight: 700"
                >មើលលម្អិត</router-link
              >
            </div>
          </div>

          <router-link
            to="/teacher/room-management"
            class="text-center small text-decoration-none fw-bold text-success py-2 border-top border-light-subtle d-block style-all-rooms-link"
            style="font-size: 0.85rem"
          >
            មើលបន្ទប់ទាំងអស់ 
            <i class="fas fa-arrow-right ms-1" style="font-size: 0.75rem"></i>
          </router-link>

          <button
            class="btn border-dashed mt-3 py-3"
            style="font-size: 0.95rem"
            @click="isCreateRoomOpen = true"
          >
            <i class="fas fa-plus me-2"></i> បង្កើតបន្ទប់ថ្មី
          </button>
        </div>

        <!-- Security Guard Info Box -->
        <!-- <div class="custom-card text-center p-4" style="background: var(--emerald-soft);">
          <h6 class="text-success mb-2" style="font-size: 1rem; font-weight: 700;">Secure Mode Active</h6>
          <p class="text-muted small mb-4" style="font-size: 0.78rem; line-height: 1.4; font-weight: 600;">Tab-switching and screenshot protections are enabled system-wide.</p>
          <router-link to="/teacher/teacher-validations" class="btn btn-white w-100 border border-2 rounded-4 py-2.5 small bg-white text-success text-decoration-none d-block" style="font-size: 0.88rem; font-weight: 700;">Security Settings</router-link>
        </div> -->
      </div>
    </div>
  </div>

  <!-- Create Room Modal Dialog component -->
  <CreateRoomModal
    :is-open="isCreateRoomOpen"
    @close="isCreateRoomOpen = false"
    @created="onRoomCreated"
  />
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { inject } from "vue";
import { getMyRooms } from "@/api/teacher.api";
import { getExams } from "@/api/exam.api";

const isCreateRoomOpen = ref(false);
const backendRooms = ref([]);
const loadingRooms = ref(false);
const totalStudents = computed(() => {
  return backendRooms.value.reduce(
    (total, room) => total + Number(room.student_count || room.count || 0),
    0
  );
});

const examList = ref([]);
const isLoading = ref(false);
const toast = useToast();

const currentPage = ref(1);
const itemsPerPage = 10;

const searchQuery = inject("searchQuery");

const fetchBackendRooms = async () => {
  try {
    loadingRooms.value = true;
    const res = await getMyRooms();

    backendRooms.value = res.data?.data || res.data || [];
  } catch (err) {
    console.error("Error fetching dashboard rooms:", err);
  } finally {
    loadingRooms.value = false;
  }
};

const fetchAllExams = async () => {
  try {
    isLoading.value = true;
    const res = await getExams();

    examList.value = res.data.data || res.data;
  } catch (err) {
    console.error("Failed to fetch exams:", err);
    toast.error("មិនអាចទាញយកបញ្ជីវិញ្ញាសាបានទេ!");
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchBackendRooms();
  fetchAllExams();
});

const onRoomCreated = async () => {
  isCreateRoomOpen.value = false;
  await fetchBackendRooms();
};

const router = useRouter();

const goToCreateExam = () => router.push({ name: "Quizzes" });


const stats = computed(() => [
  {
    title: "សិស្សសរុប",
    value: totalStudents.value.toString(),
    icon: "fas fa-users",
    bg: "#ecfdf5",
    color: "#10b981",
    trendClass: "text-success",
    trendIcon: "fas fa-arrow-up",
    trendText: "12%",
    hover: false,
  },
  {
    title: "បន្ទប់សរុប",
    value: backendRooms.value.length.toString(),
    icon: "fas fa-door-open",
    bg: "#f3e8ff",
    color: "#9333ea",
    trendClass: "text-muted",
    trendIcon: "",
    trendText: "Current term",
    hover: false,
  },
  {
    title: "វិញ្ញាសាសរុប",
    value: examList.value.length.toString(),
    icon: "fas fa-tasks",
    bg: "#fff7ed",
    color: "#f59e0b",
    trendClass: "text-success",
    trendIcon: "fas fa-check",
    trendText: "On track",
    hover: false,
  },
]);

const paginatedExams = computed(() => {
  const filtered = examList.value.filter((exam) =>
    exam.title.toLowerCase().includes(searchQuery.value.toLowerCase()),
  );

  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filtered.slice(start, end);
});

const totalPages = computed(() => {
  const filtered = examList.value.filter((exam) =>
    exam.title.toLowerCase().includes(searchQuery.value.toLowerCase()),
  );
  return Math.ceil(filtered.length / itemsPerPage);
});
</script>

<style scoped>
.teacher-dashboard {
  --emerald: #10b981;
  --emerald-soft: #ecfdf5;
  --text-dark: #1e293b;
  --text-muted: #475569;
  --border: #cbd5e1;
  --sh-sm: 0 4px 12px rgba(0, 0, 0, 0.03);
  font-family: "Kantumruy Pro", "Inter", sans-serif !important;
}

.teacher-dashboard,
.teacher-dashboard div,
.teacher-dashboard p,
.teacher-dashboard span,
.teacher-dashboard small {
  font-family: "Kantumruy Pro", "Inter", sans-serif !important;
  font-weight: 550 !important;
}

/* បង្កើនភាពធាត់ខ្លាំងសម្រាប់ចំណងជើងកាតនីមួយៗ */
.section-title {
  font-size: 1.05rem;
  font-weight: 700 !important;
  color: var(--text-dark) !important;
}

.custom-card {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(10px);
  border-radius: 18px;
  border: 1.5px solid var(--border);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.04);
  padding: 24px; /* បង្កើនទំហំប្រអប់ឲ្យធំជាងមុន */
  margin-bottom: 24px;
}

.stat-card {
  background: white;
  padding: 24px; /* ពង្រីកទំហំកាតស្ថិតិ */
  border-radius: 18px;
  border: 1.5px solid var(--border);
  height: 100%;
  transition: all 0.2s ease-in-out;
}

.icon-box {
  width: 48px;
  height: 48px;
  font-size: 1.3rem;
  border-radius: 12px;
  flex-shrink: 0;
}

/* រក្សាទុកកម្រាស់សម្រាប់ Icon មិនឲ្យបែករូប */
.icon-box i,
button i,
span i,
.stat-card i {
  font-weight: 900 !important;
}

.style-all-rooms-link {
  transition: color 0.2s ease;
}
.style-all-rooms-link:hover {
  color: #059669 !important;
}

.stat-title {
  font-size: 0.8rem;
  font-weight: 700 !important;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 800 !important; /* ធ្វើឲ្យលេខលទ្ធផលធាត់ដិតច្បាស់ខ្លាំង */
  color: var(--text-dark) !important;
  line-height: 1.2;
}

.trend-text {
  font-weight: 700 !important;
}
.btn-emerald {
  background-color: var(--emerald, #10b981) !important;
  border-color: var(--emerald, #10b981) !important;
}

.btn-light.border {
  border-color: #e2e8f0 !important;
  color: #64748b;
}

.btn-light.border:hover {
  background-color: #f1f5f9;
}

/* រចនាប័ទ្មសម្រាប់កាតវិញ្ញាសាដើម្បីឱ្យស្អាត (Clean Design) */
.p-3.rounded-3.border.bg-white {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
  border: 1px solid #e2e8f0 !important;
}

.p-3.rounded-3.border.bg-white:hover {
  border-color: var(--emerald) !important;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.1);
}
/* ពង្រីកទំហំប៊ូតុង និងអក្សរលើប៊ូតុង */
.btn-emerald {
  background: var(--emerald);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 12px 24px;
  font-size: 0.95rem;
  transition: 0.3s;
}
.btn-emerald:hover {
  background: #059669;
}
.exam-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.exam-list-item {
  padding: 15px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
}
.exam-list-item:hover {
  border-color: var(--emerald);
}

.btn-emerald-outline {
  background: transparent;
  color: var(--emerald);
  border: 2px solid var(--emerald);
  border-radius: 12px;
  padding: 12px 24px;
  font-weight: 700 !important;
  font-size: 0.92rem;
  transition: 0.3s;
}
.btn-emerald-outline:hover {
  background: var(--emerald-soft);
}

.border-dashed {
  border: 2px dashed var(--emerald) !important;
  color: var(--emerald);
  background: transparent;
  border-radius: 14px;
  width: 100%;
  padding: 14px;
  font-weight: 700 !important;
  font-size: 0.92rem;
  transition: 0.2s;
}
.border-dashed:hover {
  background: var(--emerald-soft);
}

.room-item {
  background: white;
  padding: 16px;
  border-radius: 14px;
  margin-bottom: 12px;
  border: 1px solid var(--border);
  transition: 0.2s;
}
.room-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border-color: var(--emerald);
}

.student-name,
.room-name {
  font-weight: 700 !important; /* ធ្វើឲ្យឈ្មោះសិស្ស និងបន្ទប់ដិតច្បាស់ */
}

.text-details {
  font-weight: 600 !important;
}

.submission-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid var(--border);
}
.submission-item:last-child {
  border-bottom: none;
}

.avatar-sm {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid var(--border);
}

.score-badge {
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 0.78rem;
  font-weight: 800 !important;
}
.score-high {
  background: #dcfce7;
  color: #166534;
}
.score-mid {
  background: #fef9c3;
  color: #854d0e;
}

.bar-chart-container {
  display: flex;
  align-items: flex-end;
  gap: 10px;
  height: 115px;
  padding-top: 10px;
}
.bar-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}
.bar {
  width: 100%;
  background: var(--emerald-soft);
  border-radius: 4px 4px 0 0;
  position: relative;
  overflow: hidden;
}
.bar-fill {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--emerald);
  border-radius: 4px 4px 0 0;
  transition: height 1s cubic-bezier(0.1, 0.76, 0.55, 0.94);
}
.bar-label {
  font-size: 0.72rem;
  color: var(--text-muted);
  font-weight: 700 !important;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(15, 23, 42, 0.45);
  backdrop-filter: blur(5px);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
}
.modal-dialog {
  width: 100%;
  max-width: 480px;
  margin: 0;
}
.cursor-pointer {
  cursor: pointer;
}
.search-results-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.search-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  transition: all 0.2s ease;
}

.search-row:hover {
  border-color: #10b981;
  box-shadow: 0 2px 8px rgba(16, 185, 129, 0.08);
}

.search-row-icon {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  flex-shrink: 0;
}

.sr-active { background: rgba(16, 185, 129, 0.08); color: #10b981; }
.sr-draft  { background: #f1f5f9; color: #94a3b8; }

.search-row-main {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
}

.search-row-title {
  font-size: 13px;
  font-weight: 700;
  color: #1e293b;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.search-row-type {
  font-size: 10px;
  font-weight: 700;
  color: #10b981;
  background: rgba(16, 185, 129, 0.08);
  padding: 1px 7px;
  border-radius: 5px;
  text-transform: uppercase;
  flex-shrink: 0;
}

.search-row-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

.search-row-pts {
  font-size: 11px;
  color: #94a3b8;
  font-weight: 600;
}

.sr-badge {
  font-size: 10px;
  font-weight: 700;
  padding: 2px 9px;
  border-radius: 20px;
  text-transform: uppercase;
}

.srb-active { background: rgba(16, 185, 129, 0.1); color: #047857; }
.srb-draft  { background: #f1f5f9; color: #64748b; }

.search-row-link {
  width: 28px;
  height: 28px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  background: #f8fafc;
  color: #94a3b8;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  text-decoration: none;
  flex-shrink: 0;
  transition: all 0.2s ease;
}

.search-row-link:hover {
  background: #10b981;
  border-color: #10b981;
  color: #fff;
}
</style>
