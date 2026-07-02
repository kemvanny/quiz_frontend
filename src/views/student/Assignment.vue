<template>
  <div>
    <div class="tab-row">
      <div class="tab-pills">
        <button class="tab-pill" :class="{ active: activeTab === 'all' }" @click="changeTab('all')">
          ការប្រឡងទាំងអស់
        </button>

        <button class="tab-pill" :class="{ active: activeTab === 'todo' }" @click="changeTab('todo')">
          ត្រូវធ្វើ
          <span class="count-badge"
            :style="todoCount === 0 ? 'background: #f1f5f9; color: #64748b;' : 'background: #fef2f2; color: #dc2626'">
            {{ todoCount }}
          </span>
        </button>

        <button class="tab-pill" :class="{ active: activeTab === 'completed' }" @click="changeTab('completed')">
          បានបញ្ចប់
        </button>
      </div>

      <div style="font-size: 0.8rem; color: var(--txt-mu); font-weight: 600">
        <i class="fas fa-calendar-week me-1"></i> {{ currentKhmerDate }}
      </div>
    </div>

    <div class="section-label">
      <span v-if="activeTab === 'all'">ការប្រឡងរួមទាំងអស់</span>
      <span v-else-if="activeTab === 'todo'">បន្ទាន់ — កំណត់ត្រឹមថ្ងៃនេះ</span>
      <span v-else>កិច្ចការដែលបានប្រឡងរួចរាល់</span>
    </div>

    <div v-if="isExamLoading">
      <div v-for="n in 3" :key="n" class="skeleton-card mb-3">
        <div class="skeleton-icon-box"></div>
        <div class="skeleton-content">
          <div class="skeleton-line short"></div>
          <div class="skeleton-line medium"></div>
          <div class="skeleton-line long"></div>
        </div>
      </div>
    </div>

    <div v-else-if="paginatedExams.length > 0">
      <a v-for="exam in paginatedExams" :key="exam.id" href="#" style="cursor:default;" class="task-card type-exam mb-3" @click.prevent>
        <div class="task-icon"
          :style="exam.is_completed === 1 ? 'background: #f1f5f9; color: #64748b;' : (exam.time_status === 'upcoming' ? 'background: #eff6ff; color: #2563eb;' : 'background: #ecfdf5; color:#059669')">
          <i
            :class="exam.is_completed === 1 ? 'fas fa-check' : (exam.time_status === 'upcoming' ? 'fas fa-clock' : 'fas fa-bolt')"></i>
        </div>

        <div class="flex-grow-1">
          <div class="task-meta" >
            <span v-if="exam.is_completed === 1" class="meta-chip" style="background: #e2e8f0; color: #475569">
              <i class="fas fa-check-circle"></i> បានបញ្ចប់
            </span>
            <span v-else-if="exam.time_status === 'upcoming'" class="meta-chip"
              style="background: #dbeafe; color: #1e40af">
              <i class="fas fa-hourglass-start"></i> ជិតមកដល់ (Upcoming)
            </span>
            <span v-else-if="exam.time_status === 'expired'" class="meta-chip"
              style="background: #fef2f2; color: #991b1b">
              <i class="fas fa-calendar-times"></i> ហួសកំណត់ (អត់បានប្រឡង)
            </span>
            <span v-else class="meta-chip" style="background: #ecfdf5; color: #059669">
              <i class="fas fa-play-circle"></i> កំពុងដំណើរការ
            </span>

            <span class="meta-chip" style="background: #fff7ed; color: #c2410c">
              <i class="fas fa-graduation-cap"></i> {{ exam.room_name }}
            </span>
          </div>

          <div class="task-title">{{ exam.title }}</div>

          <div class="task-details">
            <span class="task-detail" style="color:#065f46; font-weight: 400;">
              <i class="fas fa-calendar-alt"></i> ម៉ោងចាប់ផ្តើម៖ {{ new Date(exam.start_time).toLocaleString('kh-KH') }}
            </span>
          </div>
        </div>

        <button v-if="exam.is_completed === 0 && exam.time_status === 'ongoing'" class="task-cta cta-green"
          type="button" @click.stop.prevent="startExam(exam)">
          ចាប់ផ្តើមប្រឡង
        </button>
        <button v-else-if="exam.is_completed === 0 && exam.time_status === 'upcoming'" class="task-cta"
          style="background: #eff6ff; color: #2563eb; border: 1px solid #bfdbfe;" type="button"
          @click.stop.prevent="startExam(exam)">
          រង់ចាំម៉ោងប្រឡង
        </button>
        <button v-if="exam.time_status === 'expired' && exam.is_completed === 0" class="task-cta cta-disabled"
          type="button" disabled>
          ហួសកំណត់ពេល
        </button>
        <router-link v-else-if="exam.time_status === 'completed' || exam.is_completed === 1"
          :to="{ name:'AnalyticsResult' }" class="task-cta text-decoration-none text-center"
          style="background: #f1f5f9; color: #1e293b; border: 1px solid #cbd5e1; display: inline-flex; align-items: center; justify-content: center;">
          មើលលទ្ធផល
        </router-link>
      </a>

      <div v-if="totalPages > 1" class="custom-pagination">
        <button class="pag-btn" :disabled="currentPage === 1" @click="currentPage--">
          <i class="fas fa-chevron-left"></i>
        </button>

        <span class="pag-info">
          ទំព័រទី {{ currentPage }} នៃ {{ totalPages }}
        </span>

        <button class="pag-btn" :disabled="currentPage === totalPages" @click="currentPage++">
          <i class="fas fa-chevron-right"></i>
        </button>
      </div>
    </div>

    <div v-else class="task-card task-card-static type-exam" >
      <div class="task-icon" style="background: #fef2f2; color: #ef4444">
        <i class="fas fa-triangle-exclamation"></i>
      </div>
      <div class="flex-grow-1">
        <div class="task-meta">
          <span class="meta-chip" style="background: #fef2f2; color: #dc2626">
            <i class="fas fa-circle-exclamation"></i> មិនមានទិន្នន័យ
          </span>
        </div>
        <div class="task-title">
          <span v-if="activeTab === 'todo'">គ្មានការប្រឡងដែលត្រូវធ្វើទេ</span>
          <span v-else-if="activeTab === 'completed'">មិនទាន់មានការប្រឡងដែលបានបញ្ចប់ឡើយ</span>
          <span v-else>មិនទាន់មានកិច្ចការប្រឡងណាមួយឡើយ</span>
        </div>
        <div class="task-details">
          <span class="task-detail" style="color: #dc2626; font-weight: 400">
            <i class="fas fa-info-circle"></i> {{ examError || "ថ្ងៃនេះអ្នកគ្មានការប្រឡងដែលត្រូវបង្ហាញនោះទេ" }}
          </span>
        </div>
      </div>
      <button class="task-cta cta-red" type="button" @click="fetchStudentExams">
        ព្យាយាមម្តងទៀត
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { getAllStudentExams } from "@/api/student.api";

const examList = ref([]);
const router = useRouter();
const isExamLoading = ref(false);
const examError = ref("");
const activeTab = ref("all");

// Pagination States
const currentPage = ref(1);
const itemsPerPage = ref(4);
const processedExams = computed(() => {
  const nowTime = new Date().getTime();

  return examList.value.map(exam => {
    let currentStatus = exam.time_status;
    const startTime = new Date(exam.start_time).getTime();
    let deadlineTime = exam.deadline ? new Date(exam.deadline).getTime() : null;
    if (!deadlineTime || isNaN(deadlineTime)) {
      deadlineTime = startTime + (12 * 60 * 60 * 1000);
    }
    if (exam.is_completed === 1 || exam.is_completed === true) {
      currentStatus = 'completed';
    } else if (nowTime < startTime) {
      currentStatus = 'upcoming';
    } else if (nowTime >= startTime && nowTime <= deadlineTime) {
      currentStatus = 'ongoing';
    } else {
      currentStatus = 'expired';
    }
    return {
      ...exam,
      time_status: currentStatus
    };
  });
});
const currentKhmerDate = computed(() => {
  const now = new Date();
  const currentDay = now.getDate();
  const weekNumber = Math.ceil(currentDay / 7);
  const khmerMonths = [
    "មករា", "កុម្ភៈ", "មីនា", "មេសា", "ឧសភា", "មិថុនា",
    "កក្កដា", "សីហា", "កញ្ញា", "តុលា", "វិច្ឆិកា", "ធ្នូ"
  ];
  const currentMonthName = khmerMonths[now.getMonth()];
  const englishYear = now.getFullYear().toString();
  const khmerNumbers = {
    '0': '០', '1': '១', '2': '២', '3': '៣', '4': '៤',
    '5': '៥', '6': '៦', '7': '៧', '8': '៨', '9': '៩'
  };
  const khmerYear = englishYear.split('').map(digit => khmerNumbers[digit] || digit).join('');
  const khmerWeek = khmerNumbers[weekNumber] || weekNumber;
  return `សប្តាហ៍ទី${khmerWeek} នៃខែ${currentMonthName} ឆ្នាំ${khmerYear}`;
});

const todoCount = computed(() => {
  return processedExams.value.filter(exam =>
    exam.is_completed === 0 && (exam.time_status === 'ongoing' || exam.time_status === 'upcoming')
  ).length;
});



const filteredExams = computed(() => {
  const sortedExams = [...processedExams.value].sort((a, b) => {
    return new Date(b.start_time).getTime() - new Date(a.start_time).getTime();
  });
  if (activeTab.value === "todo") {
    return sortedExams.filter(exam =>
      exam.is_completed === 0 && (exam.time_status === 'ongoing' || exam.time_status === 'upcoming')
    );
  }
  
  if (activeTab.value === "completed") {
    return sortedExams.filter(exam => 
      exam.is_completed === 1 || exam.time_status === 'completed'
    );
  }
  return sortedExams;
});

const paginatedExams = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage.value;
  const endIndex = startIndex + itemsPerPage.value;
  return filteredExams.value.slice(startIndex, endIndex);
});

const totalPages = computed(() => {
  return Math.ceil(filteredExams.value.length / itemsPerPage.value);
});

function changeTab(tabName) {
  activeTab.value = tabName;
  currentPage.value = 1;
}

async function fetchStudentExams() {
  try {
    isExamLoading.value = true;
    examError.value = "";
    examList.value = [];

    const response = await getAllStudentExams();
    if (response.data && response.data.result) {
      examList.value = response.data.data || [];
      currentPage.value = 1; 
    } else {
      throw new Error(response.data?.msg || "Failed to fetch exam data.");
    }
  } catch (error) {
    examList.value = [];
    examError.value = error.response?.data?.message || error.message || "Request failed with status code 404";
  } finally {
    setTimeout(() => {
      isExamLoading.value = false;
    }, 450);
  }
}

function startExam(exam) {
  if (!exam) return;
  if (exam.time_status === 'upcoming') {
    return;
  }
  localStorage.setItem("active_exam_id", exam.id);
  localStorage.setItem("active_exam", JSON.stringify(exam));
  router.push(`/take-exam/${exam.exam_code}`);
}

onMounted(fetchStudentExams);
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
  --sh-hover: 0 16px 36px rgba(0, 0, 0, 0.07);
}

body {
  font-family: "Inter", sans-serif;
  background-color: #f4f7fe;
  background-image:
    radial-gradient(at 0% 0%, hsla(158, 76%, 76%, 0.6) 0, transparent 50%),
    radial-gradient(at 100% 100%, hsla(209, 43%, 80%, 0.6) 0, transparent 50%);
  height: 100vh;
  overflow: hidden;
  color: var(--txt);
}

a {
  text-decoration: none;
  color: inherit;
}

.workspace {
  flex: 1;
  overflow-y: auto;
  padding: 36px 40px;
}

/* ── TABS ── */
.tab-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 28px;
}

.tab-pills {
  display: flex;
  gap: 6px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border: 1px solid var(--bdr);
  border-radius: 14px;
  padding: 5px;
  box-shadow: var(--sh-sm);
}

.tab-pill {
  padding: 7px 20px;
  border-radius: 10px;
  font-size: 0.83rem;
  font-weight: 700;
  color: var(--txt-mu);
  cursor: pointer;
  border: none;
  background: transparent;
  transition: 0.18s;
  display: flex;
  align-items: center;
  gap: 7px;
}

.tab-pill.active {
  background: #fff;
  color: var(--em-dk);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.tab-pill:hover:not(.active) {
  color: var(--txt);
}

.count-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  font-size: 0.65rem;
  font-weight: 800;
}

/* ── SECTION LABEL ── */
.section-label {
  font-size: 0.73rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--txt-mu);
  margin-bottom: 14px;
  margin-top: 32px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.section-label::after {
  content: "";
  flex: 1;
  height: 1px;
  background: var(--bdr);
}

/* ── TASK CARD ── */
.task-card {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border: 1px solid var(--bdr);
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px 24px;
  margin-bottom: 12px;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: var(--sh-sm);
  position: relative;
  overflow: hidden;
  cursor: pointer;
}

.task-card::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 5px;
  border-radius: 20px 0 0 20px;
  transition: width 0.2s;
}

.task-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--sh-hover);
}

.task-card:hover::before {
  width: 6px;
}

.task-card-static {
  cursor: default;
}

.task-card-static:hover {
  transform: none;
}

.task-card-static:hover .task-icon {
  transform: none;
}

.task-card-static .task-cta {
  cursor: pointer;
}

.task-card.type-exam::before {
  background: #28ba8a;
}

.task-card.type-exam:hover {
  border-color: rgba(68, 239, 182, 0.2);
}

/* Icon */
.task-icon {
  width: 52px;
  height: 52px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  flex-shrink: 0;
  transition: transform 0.25s;
}

.task-card:hover .task-icon {
  transform: scale(1.08) rotate(-4deg);
}

/* Meta */
.task-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 7px;
  flex-wrap: wrap;
}

.meta-chip {
  padding: 3px 10px;
  border-radius: 7px;
  font-size: 0.72rem;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.task-title {
  font-size: 1rem;
  font-weight: 700;
  color: var(--txt);
  margin-bottom: 8px;
  line-height: 1.3;
}

.task-details {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.task-detail {
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--txt-mu);
  display: flex;
  align-items: center;
  gap: 5px;
}

/* CTA Button */
.task-cta {
  margin-left: auto;
  flex-shrink: 0;
  padding: 10px 22px;
  border-radius: 13px;
  font-weight: 700;
  font-size: 0.83rem;
  border: none;
  cursor: pointer;
  transition: all 0.22s;
  white-space: nowrap;
}

.task-cta:hover:not(:disabled) {
  transform: scale(1.04);
}

.cta-red {
  background: #fef2f2;
  color: #dc2626;
  border: 1.5px solid #fee2e2;
}

.cta-red:hover {
  background: #ef4444;
  color: #fff;
}

.cta-green {
  background: #ecfdf5;
  color: #059669;
  border: 1.5px solid #bbf7d0;
}

.cta-green:hover {
  background: #10b981;
  color: #fff;
}

.cta-disabled {
  background: #f3f4f6;
  color: #6b7280;
  border: 1px solid #d1d5db;
  cursor: not-allowed;
}

/* 🔢 របារគ្រប់គ្រងទំព័រ (Custom Pagination Style) */
.custom-pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-top: 24px;
  padding: 10px;
}

.pag-btn {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  color: #059669;
  /* ប្រើពណ៌បៃតងលំនាំដើមរបស់បង */
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
}

.pag-btn:hover:not(:disabled) {
  background: #ecfdf5;
  border-color: #a7f3d0;
  transform: translateY(-1px);
}

.pag-btn:disabled {
  background: #f1f5f9;
  color: #94a3b8;
  cursor: not-allowed;
  border-color: #e2e8f0;
}

.pag-info {
  font-size: 0.83rem;
  font-weight: 700;
  color: #475569;
  background: rgba(255, 255, 255, 0.8);
  padding: 6px 18px;
  border-radius: 20px;
  border: 1px solid #e2e8f0;
}

/* 🔄 ស្ទីល Shimmer Skeleton Card Animation Effect */
.skeleton-card {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid var(--bdr);
  border-radius: 20px;
  padding: 20px 24px;
  gap: 20px;
  position: relative;
  overflow: hidden;
}

.skeleton-card::after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.6) 50%, rgba(255, 255, 255, 0) 100%);
  animation: shimmer-wave 1.6s infinite;
}

.skeleton-icon-box {
  width: 52px;
  height: 52px;
  background: #f1f5f9;
  border-radius: 15px;
  flex-shrink: 0;
}

.skeleton-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.skeleton-line {
  height: 12px;
  background: #f1f5f9;
  border-radius: 4px;
}

.skeleton-line.short {
  width: 25%;
}

.skeleton-line.medium {
  width: 45%;
}

.skeleton-line.long {
  width: 75%;
}

@keyframes shimmer-wave {
  0% {
    transform: translateX(-100%);
  }

  100% {
    transform: translateX(100%);
  }
}

/* Scrollbar */
::-webkit-scrollbar {
  width: 5px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: #e2e8f0;
  border-radius: 99px;
}
</style>