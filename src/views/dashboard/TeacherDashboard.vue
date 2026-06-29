<template>
  <div class="teacher-dashboard p-1">
    <div class="row g-4">

      <div class="col-12 col-lg-8">

        <div class="row g-3 mb-4">
          <div class="col-12 col-md-4" v-for="stat in stats" :key="stat.title">
            <div
              class="premium-stat-card d-flex flex-column align-items-center text-center justify-content-center gap-2"
              @mouseover="stat.hover = true" @mouseleave="stat.hover = false"
              :style="stat.hover ? { transform: 'translateY(-3px)', borderColor: '#10b981', boxShadow: '0 10px 20px rgba(16, 185, 129, 0.08)' } : {}">

              <div class="icon-avatar-box d-flex align-items-center justify-content-center"
                :style="{ background: stat.bg, color: stat.color }">
                <i :class="stat.icon"></i>
              </div>

              <div>
                <div class="premium-stat-title">{{ stat.title }}</div>
                <div class="d-flex align-items-baseline justify-content-center gap-2 mt-1">
                  <div class="premium-stat-value">{{ stat.value }}</div>
                  <span :class="stat.trendClass" class="small fw-bold" style="font-size: 0.75rem">
                    <i :class="stat.trendIcon" v-if="stat.trendIcon"></i>
                    {{ stat.trendText }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="premium-card mb-4">
          <div class="d-flex align-items-center justify-content-between flex-wrap gap-2">
            <div>
              <h5 class="premium-section-title mb-1">សកម្មភាពរហ័ស</h5>
              <p class="text-muted small mb-0">គ្រប់គ្រង និងរៀបចំកិច្ចការប្រឡងរបស់សិស្ស</p>
            </div>
            <button class="btn-premium-emerald" @click="goToCreateExam">
              <i class="fas fa-plus me-2"></i> បង្កើតការប្រឡង
            </button>
          </div>
        </div>

        <div class="premium-card mb-4">
          <div class="d-flex justify-content-between align-items-center mb-4">
            <h5 class="premium-section-title mb-0">វិញ្ញាសារបស់ខ្ញុំ</h5>
            <span class="badge-count-pill">{{ examList.length }} វិញ្ញាសា</span>
          </div>
          <router-link to="/teacher/all-exams" class="view-all-rooms-btn mb-2 text-end">
            មើលវិញ្ញាសាទាំងអស់ <i class="fas fa-arrow-right ms-1"></i>
          </router-link>
          <div v-if="isLoading" class="text-center py-5">
            <div class="spinner-border text-success spinner-border-sm" role="status"></div>
          </div>

          <div v-else-if="examList.length === 0" class="text-center py-5 text-muted small">
            <i class="far fa-folder-open fa-2x mb-2 opacity-50"></i>
            <p class="mb-0">មិនទាន់មានវិញ្ញាសាណាមួយត្រូវបានបង្កើតឡើយ។</p>
          </div>

          <div v-else class="row g-3">
            <div class="col-12 col-md-6" v-for="exam in paginatedExams" :key="exam.id">
              <div
                class="premium-exam-subcard d-flex flex-column text-decoration-none">

                <div class="d-flex justify-content-between align-items-center mb-3">
                  <span class="status-pill-badge" :class="exam.status === 'active' ? 'status-active' : 'status-draft'">
                    <span class="live-dot" v-if="exam.status === 'active'"></span>
                    {{ exam.status === "active" ? "Active" : "Draft" }}
                  </span>
                  <span class="duration-text-badge"><i class="far fa-clock me-1"></i>{{ exam.duration }} នាទី</span>
                </div>

                <h6 class="exam-title-text text-truncate" :title="exam.title">{{ exam.title }}</h6>

                <div class="d-flex justify-content-between align-items-center mt-auto pt-2 border-top border-light">
                  <span class="points-text-label">ម៉ោងចាប់ផ្ដើម៖ {{ exam.start_time ? new Date(exam.start_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : '---' }}</span>
                  <span class="view-detail-arrow"></span>
                </div>
              </div>
            </div>
          </div>

          <div v-if="totalPages > 1"
            class="d-flex justify-content-between align-items-center flex-wrap gap-2 mt-4 pt-3 border-top border-light">
            <div class="text-muted small fw-medium">បង្ហាញទំព័រទី {{ currentPage }} នៃ {{ totalPages }}</div>
            <div class="d-flex align-items-center gap-1">
              <button class="btn-page-nav" :disabled="currentPage === 1" @click="currentPage--">
                <i class="fas fa-chevron-left"></i>
              </button>
              <template v-for="page in totalPages" :key="page">
                <button
                  v-if="Math.abs(page - currentPage) <= 1 || (currentPage === 1 && page <= 3) || (currentPage === totalPages && page >= totalPages - 2)"
                  class="btn-page-number" :class="{ 'active': currentPage === page }" @click="currentPage = page">
                  {{ page }}
                </button>
              </template>
              <button class="btn-page-nav" :disabled="currentPage === totalPages" @click="currentPage++">
                <i class="fas fa-chevron-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="col-12 col-lg-4 d-flex flex-column gap-4">

        <div class="premium-card d-flex flex-column custom-room-card">
          <div class="d-flex align-items-center justify-content-between mb-3">
            <h5 class="premium-section-title mb-0">បន្ទប់សិក្សា</h5>
            <i class="fas fa-graduation-cap text-muted opacity-50"></i>
          </div>

          <div v-if="loadingRooms"
            class="text-center py-4 flex-grow-1 d-flex align-items-center justify-content-center">
            <div class="spinner-border text-success spinner-border-sm" role="status"></div>
          </div>

          <div v-else-if="backendRooms.length === 0"
            class="text-center py-4 flex-grow-1 d-flex align-items-center justify-content-center text-muted small">
            មិនទាន់មានបន្ទប់សិក្សានៅឡើយទេ។
          </div>

          <div v-else class="room-list-scrollbar flex-grow-1 pe-1">
            <div class="premium-room-row d-flex justify-content-between align-items-center mb-2"
              v-for="room in backendRooms" :key="room.id">
              <div class="text-truncate me-2">
                <p class="mb-0 text-dark fw-bold text-truncate" style="font-size: 0.85rem">
                  {{ room.name || room.room_name }}
                </p>
                <small class="text-muted fw-medium" style="font-size: 0.72rem">
                  <i class="fas fa-users me-1 text-success opacity-75"></i> {{ room.student_count || room.count || 0 }}
                  សិស្ស
                </small>
              </div>
              <router-link to="/teacher/room-management" class="btn-room-action flex-shrink-0">មើល</router-link>
            </div>
          </div>

          <div class="pt-3 border-top border-light mt-3">
            <router-link to="/teacher/room-management" class="view-all-rooms-btn mb-2">
              មើលបន្ទប់ទាំងអស់ <i class="fas fa-arrow-right ms-1"></i>
            </router-link>
            <button class="btn-create-room-dashed w-100 py-2" @click="isCreateRoomOpen = true">
              <i class="fas fa-plus me-2"></i> បង្កើតបន្ទប់ថ្មី
            </button>
          </div>
        </div>

        <div class="premium-card instruction-box">
          <div class="d-flex align-items-center gap-2 mb-3">
            <div class="tip-icon-box"><i class="far fa-lightbulb"></i></div>
            <h5 class="premium-section-title mb-0" style="font-size: 0.90rem;">គន្លឹះ និងការណែនាំ</h5>
          </div>

          <div class="d-flex flex-column gap-3">
            <div class="d-flex gap-2 align-items-start">
              <span class="badge-dot mt-2" style="background-color: #10b981;"></span>
              <p class="mb-0 text-muted" style="font-size: 0.90rem; line-height: 1.4;">
                <strong class="text-dark">ការបង្កើតវិញ្ញាសា៖</strong> លោកគ្រូអាចកំណត់រយៈពេលប្រឡងច្បាស់លាស់
                និងជ្រើសរើសបន្ទប់ដាក់ឱ្យសិស្សប្រឡងបានភ្លាមៗ។
              </p>
            </div>
            <div class="d-flex gap-2 align-items-start">
              <span class="badge-dot mt-2" style="background-color: #3b82f6;"></span>
              <p class="mb-0 text-muted" style="font-size: 0.90rem; line-height: 1.4;">
                <strong class="text-dark">ត្រួតពិនិត្យការប្រឡង៖</strong> រាល់ទិន្នន័យពិន្ទុ
                និងការបញ្ជូនកិច្ចការរបស់សិស្ស
                នឹងធ្វើបច្ចុប្បន្នភាពរហ័សតាមពេលវេលាជាក់ស្តែង។
              </p>
            </div>
            <div class="d-flex gap-2 align-items-start">
              <span class="badge-dot mt-2" style="background-color: #f59e0b;"></span>
              <p class="mb-0 text-muted" style="font-size: 0.90rem; line-height: 1.4;">
                <strong class="text-dark">ការគ្រប់គ្រងបន្ទប់សិក្សា៖</strong> លោកគ្រូអាចពិនិត្យមើលចំនួនសិស្សដែលបានចូលរួម
                និងគ្រប់គ្រងសមាជិកក្នុងបន្ទប់នីមួយៗបានយ៉ាងងាយស្រួល។
              </p>
            </div>
            <div class="d-flex gap-2 align-items-start">
              <span class="badge-dot mt-2" style="background-color: #ef4444;"></span>
              <p class="mb-0 text-muted" style="font-size: 0.90rem; line-height: 1.4;">
                <strong class="text-dark">របាយការណ៍លទ្ធផល៖</strong> ប្រព័ន្ធនឹងរៀបចំស្ថិតិពិន្ទុទូទៅ
                ដើម្បីជួយសម្រួលដល់លោកគ្រូក្នុងការវាយតម្លៃកម្រិតយល់ដឹងរបស់សិស្ស។
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  </div>

  <CreateRoomModal :is-open="isCreateRoomOpen" @close="isCreateRoomOpen = false" @created="onRoomCreated" />
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
const itemsPerPage = 4;

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
    hover: false,
  },
  {
    title: "បន្ទប់សរុប",
    value: backendRooms.value.length.toString(),
    icon: "fas fa-door-open",
    bg: "#f3e8ff",
    color: "#9333ea",
    trendClass: "text-muted",
    hover: false,
  },
  {
    title: "វិញ្ញាសាសរុប",
    value: examList.value.length.toString(),
    icon: "fas fa-tasks",
    bg: "#fff7ed",
    color: "#f59e0b",
    trendClass: "text-success",
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
/* Base Premium Design */
.premium-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.01);
}

.custom-room-card {
  max-height: 380px;
}

.room-list-scrollbar {
  max-height: 200px;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #cbd5e1 #f8fafc;
}

.room-list-scrollbar::-webkit-scrollbar {
  width: 5px;
}

.room-list-scrollbar::-webkit-scrollbar-track {
  background: #f8fafc;
  border-radius: 10px;
}

.room-list-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}

.room-list-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Style Rows & Buttons */
.premium-room-row {
  background: #f8fafc;
  border: 1px solid #f1f5f9;
  padding: 10px 12px;
  border-radius: 12px;
  transition: all 0.2s;
}

.premium-room-row:hover {
  background: #e8f7f0;
  border-color: rgba(16, 185, 129, 0.2);
}

.btn-room-action {
  font-size: 0.72rem;
  font-weight: 700;
  color: #10b981;
  text-decoration: none;
  background: #ffffff;
  padding: 3px 10px;
  border-radius: 20px;
  border: 1px solid #e2e8f0;
}

.view-all-rooms-btn {
  display: block;
  font-size: 0.8rem;
  font-weight: 700;
  color: #10b981;
  text-decoration: none;
  text-align: center;
  padding: 4px 0;
  transition: all 0.2s;
}
.view-all-rooms-btn:hover {
  color: #58e6a1; 
  transform: translateY(-1px);  
}

.btn-create-room-dashed {
  background: transparent;
  border: 1px dashed rgba(16, 185, 129, 0.4);
  color: #10b981;
  border-radius: 12px;
  font-size: 0.82rem;
  font-weight: 600;
  transition: all 0.2s;
}

.btn-create-room-dashed:hover {
  background: #e8f7f0;
}

.instruction-box {
  background: #fdfdfd;
  border-left: 4px solid #10b981;
}

.tip-icon-box {
  width: 32px;
  height: 32px;
  background: #fff7ed;
  color: #f59e0b;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.95rem;
}

.badge-dot {
  width: 6px;
  height: 6px;
  background-color: #10b981;
  border-radius: 50%;
  display: inline-block;
  flex-shrink: 0;
}

.premium-stat-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.01);
  transition: all 0.25s ease;
}

.icon-avatar-box {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  font-size: 1.1rem;
}

.premium-stat-title {
  font-size: 0.8rem;
  font-weight: 700;
  color: #64748b;
}

.premium-stat-value {
  font-size: 1.35rem;
  font-weight: 800;
  color: #0f172a;
}

.premium-section-title {
  font-size: 0.95rem;
  font-weight: 700;
  color: #0f172a;
}

.btn-premium-emerald {
  background: linear-gradient(135deg, #2bb673, #10b981);
  border: none;
  color: #ffffff;
  padding: 8px 18px;
  border-radius: 30px;
  font-size: 0.82rem;
  font-weight: 700;
  box-shadow: 0 4px 10px rgba(16, 185, 129, 0.12);
  transition: all 0.2s;
}

.btn-premium-emerald:hover {
  transform: translateY(-1px);
}

.badge-count-pill {
  background: #e8f7f0;
  color: #10b981;
  padding: 4px 12px;
  border-radius: 30px;
  font-size: 0.75rem;
  font-weight: 700;
}

.premium-exam-subcard {
  background: #f8fafc;
  border: 1px solid #f1f5f9;
  border-radius: 12px;
  padding: 18px;
  min-height: 135px;
  transition: all 0.2s ease;
}

.premium-exam-subcard:hover {
  background: #ffffff;
  border-color: rgba(16, 185, 129, 0.25);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.02);
}

.exam-title-text {
  font-size: 0.92rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 12px;
}

.status-pill-badge {
  font-size: 0.7rem;
  font-weight: 700;
  padding: 2px 10px;
  border-radius: 20px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.status-active {
  background: #d1fae5;
  color: #065f46;
}

.status-draft {
  background: #f1f5f9;
  color: #475569;
}

.live-dot {
  width: 5px;
  height: 5px;
  background-color: #10b981;
  border-radius: 50%;
  animation: pulseEffect 1.5s infinite;
}

@keyframes pulseEffect {

  0%,
  100% {
    transform: scale(0.9);
    opacity: 0.6;
  }

  50% {
    transform: scale(1.2);
    opacity: 1;
  }
}

.duration-text-badge {
  font-size: 0.75rem;
  color: #64748b;
  font-weight: 600;
}

.points-text-label {
  font-size: 0.78rem;
  font-weight: 700;
  color: #10b981;
}

.view-detail-arrow {
  font-size: 0.78rem;
  font-weight: 600;
  color: #94a3b8;
}

.premium-exam-subcard:hover .view-detail-arrow {
  color: #10b981;
}

.btn-page-nav,
.btn-page-number {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  color: #475569;
  font-size: 0.78rem;
  font-weight: 700;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  transition: all 0.15s ease;
}

.btn-page-number.active {
  background: linear-gradient(135deg, #2bb673, #10b981);
  color: #ffffff;
  border-color: transparent;
  box-shadow: 0 2px 6px rgba(16, 185, 129, 0.2);
}

.btn-page-nav:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
</style>