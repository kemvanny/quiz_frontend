<template>
  <div class="container-fluid" style="max-width: 1300px;">

    <div v-if="isLoading">
      <div class="row g-3 mb-4">
        <div v-for="n in 3" :key="n" class="col-12 col-md-6 col-lg-4">
          <div class="white-flat-card p-4 d-flex align-items-center gap-3">
            <div class="skeleton-avatar skeleton-shimmer"></div>
            <div class="flex-grow-1">
              <div class="skeleton-line skeleton-shimmer mb-2" style="width: 40%; height: 12px;"></div>
              <div class="skeleton-line skeleton-shimmer" style="width: 75%; height: 20px;"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="table-card">
        <div class="table-top d-flex align-items-center justify-content-between px-4 pt-4 pb-3">
          <div class="skeleton-line skeleton-shimmer" style="width: 250px; height: 20px;"></div>
          <div class="skeleton-line skeleton-shimmer" style="width: 160px; height: 36px; border-radius: 50px;"></div>
        </div>
        <div class="filter-strip px-4 pb-2">
          <div class="skeleton-line skeleton-shimmer" style="width: 80px; height: 26px; border-radius: 50px;"></div>
        </div>
        <div class="table-responsive">
          <table class="table results-table align-middle mb-0">

            <thead>
              <tr>
                <th class="ps-4">
                  <div class="skeleton-line skeleton-shimmer" style="width: 80px; height: 12px;"></div>
                </th>
                <th>
                  <div class="skeleton-line skeleton-shimmer" style="width: 40px; height: 12px;"></div>
                </th>
                <th>
                  <div class="skeleton-line skeleton-shimmer" style="width: 60px; height: 12px;"></div>
                </th>
                <th>
                  <div class="skeleton-line skeleton-shimmer" style="width: 70px; height: 12px;"></div>
                </th>
                <th>
                  <div class="skeleton-line skeleton-shimmer" style="width: 40px; height: 12px;"></div>
                </th>
                <th class="text-center">
                  <div class="skeleton-line skeleton-shimmer" style="width: 40px; height: 12px; margin: 0 auto;"></div>
                </th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="n in itemsPerPage" :key="n">
                <td class="ps-4">
                  <div class="skeleton-line skeleton-shimmer" style="width: 85%; height: 16px;"></div>
                </td>
                <td>
                  <div class="skeleton-line skeleton-shimmer" style="width: 70px; height: 22px; border-radius: 12px;">
                  </div>
                </td>
                <td>
                  <div class="skeleton-line skeleton-shimmer" style="width: 100px; height: 14px;"></div>
                </td>
                <td>
                  <div class="skeleton-line skeleton-shimmer" style="width: 90%; height: 32px; border-radius: 10px;">
                  </div>
                </td>
                <td>
                  <div class="d-flex align-items-center gap-2">
                    <div class="skeleton-line skeleton-shimmer flex-grow-1" style="height: 6px; border-radius: 99px;">
                    </div>
                    <div class="skeleton-line skeleton-shimmer" style="width: 24px; height: 14px;"></div>
                  </div>
                </td>
                <td>
                  <div class="d-flex justify-content-center">
                    <div class="skeleton-line skeleton-shimmer" style="width: 34px; height: 34px; border-radius: 10px;">
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div
          class="pagination-container d-flex align-items-center justify-content-between px-4 py-3 border-top border-light-subtle">
          <div class="skeleton-line skeleton-shimmer" style="width: 220px; height: 16px;"></div>
          <div class="skeleton-line skeleton-shimmer" style="width: 140px; height: 34px; border-radius: 10px;"></div>
        </div>
      </div>
    </div>

    <div v-else-if="errorMessage" class="state-center">
      <div class="state-icon-box error-box">
        <i class="fas fa-exclamation-triangle"></i>
      </div>
      <p class="state-text text-danger mt-3">{{ errorMessage }}</p>
    </div>

    <div v-else-if="examResultsList.length === 0" class="state-center">
      <div class="state-icon-box empty-box">
        <i class="fas fa-inbox"></i>
      </div>
      <p class="state-text mt-3">មិនមានទិន្នន័យលទ្ធផលប្រឡងឡើយ។</p>
    </div>

    <div v-else>
      <div class="row g-3 mb-4">
        <div class="col-12 col-lg-4">
          <div class="white-flat-card h-100 p-4 d-flex align-items-center gap-3">
            <div class="icon-pill purple">
              <i class="fas fa-user-graduate"></i>
            </div>
            <div class="overflow-hidden">
              <div class="card-label">អត្តសញ្ញាណសិស្ស</div>
              <div class="card-value text-truncate">
                {{ examResultsList[0]?.first_name }} {{ examResultsList[0]?.last_name }}
              </div>
            </div>
          </div>
        </div>

        <div class="col-12 col-md-6 col-lg-4">
          <div class="white-flat-card h-100 p-4 d-flex align-items-center gap-3">
            <div class="arc-ring">
              <svg viewBox="0 0 44 44">
                <circle class="arc-track" cx="22" cy="22" r="18" />
                <circle class="arc-fill" cx="22" cy="22" r="18"
                  :style="{ strokeDashoffset: calculateArc(averageScore) }" />
              </svg>
              <div class="arc-label">{{ averageScore.toFixed(0) }}%</div>
            </div>
            <div>
              <div class="card-label">មធ្យមភាគនិទ្ទេសរួម</div>
              <div class="card-value" :class="getGradeClass(averageGrade)">{{ averageGrade }}</div>
            </div>
          </div>
        </div>

        <div class="col-12 col-md-6 col-lg-4">
          <div class="white-flat-card h-100 p-4 d-flex align-items-center gap-3">
            <div class="icon-pill blue">
              <i class="fas fa-layer-group"></i>
            </div>
            <div>
              <div class="card-label">ការប្រឡងសរុប</div>
              <div class="card-value text-dark">
                {{ examResultsList.length }}
                <span class="card-unit">វិញ្ញាសា</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="table-card">
        <div class="table-top d-flex align-items-center justify-content-between flex-wrap gap-3 px-4 pt-4 pb-3">
          <div>
            <h5 class="table-heading mb-1">ប្រវត្តិនៃការប្រឡង និងមតិកែលម្អ</h5>
          </div>
          <button class="dl-btn d-flex align-items-center gap-2 px-4 py-2" @click="exportToCSV">
            <i class="fas fa-cloud-download-alt"></i>
            ទាញយកលទ្ធផលសរុប
          </button>
        </div>
        <div class="filter-strip px-4 pb-2">
          <button class="filter-chip active">
            ទាំងអស់
            <span class="chip-count">{{ examResultsList.length }}</span>
          </button>
        </div>

        <div class="table-responsive">
          <table class="table results-table align-middle mb-0" id="print-table">
            <thead>
              <tr>
                <th class="ps-4">ឈ្មោះវិញ្ញាសា</th>
                <th>បន្ទប់</th>
                <th>កាលបរិច្ឆេទ</th>
                <th style="min-width: 240px;">មតិកែលម្អ</th>
                <th style="min-width: 160px;">ពិន្ទុ</th>
                <th class="text-center">និទ្ទេស</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="result in paginatedExamResults" :key="result.submission_id">
                <td class="ps-4">
                  <div class="d-flex align-items-center gap-3">
                    <span class="exam-name">{{ result.exam_title }}</span>
                  </div>
                </td>
                <td>
                  <span class="room-badge">{{ result.room }}</span>
                </td>
                <td>
                  <span class="date-text">{{ formatDate(result.submitted_at) }}</span>
                </td>
                <td>
                  <div class="feedback-box" :class="getFeedbackBorderClass(result.grade)">
                    <i class="fas fa-comment-dots me-1 opacity-50 small"></i>
                    {{ result.feedback || 'មិនទាន់មានមតិកែលម្អ' }}
                  </div>
                </td>
                <td>
                  <div class="d-flex align-items-center gap-2">
                    <div class="score-track flex-grow-1">
                      <div class="score-fill"
                        :style="{ width: result.score + '%', background: getProgressBarColor(result.grade) }">
                      </div>
                    </div>
                    <span class="score-num" :style="{ color: getProgressBarColor(result.grade) }">
                      {{ parseFloat(result.score).toFixed(0) }}
                    </span>
                  </div>
                </td>
                <td class="text-center">
                  <span class="grade-badge" :class="getBadgeClass(result.grade)">
                    {{ result.grade || 'F' }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div
          class="pagination-container d-flex align-items-center justify-content-between px-4 py-3 border-top border-light-subtle flex-wrap gap-2">
          <div class="pagination-info">
            បង្ហាញសន្លឹកកិច្ចការ <b>{{ rowRangeStart }}</b> ដល់ <b>{{ rowRangeEnd }}</b> នៃលទ្ធផលសរុប <b>{{
              examResultsList.length }}</b>
          </div>

          <div class="d-flex align-items-center gap-1">
            <button class="page-arrow-btn" :disabled="currentPage === 1" @click="changePage(currentPage - 1)">
              <i class="fas fa-chevron-left"></i>
            </button>

            <button v-for="page in totalPages" :key="page" class="page-number-btn"
              :class="{ active: currentPage === page }" @click="changePage(page)">
              {{ page }}
            </button>

            <button class="page-arrow-btn" :disabled="currentPage === totalPages" @click="changePage(currentPage + 1)">
              <i class="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { getAllStudentExamResult } from "@/api/student.api";
import { ref, onMounted, computed } from "vue";

const examResultsList = ref([]);
const isLoading = ref(false);
const errorMessage = ref('');
const currentPage = ref(1);
const itemsPerPage = ref(5);

const fetchStudentAllResults = async () => {
  isLoading.value = true;
  errorMessage.value = '';
  try {
    const response = await getAllStudentExamResult();
    if (response.data && response.data.result === true) {
      examResultsList.value = response.data.data;
      currentPage.value = 1;
    } else {
      errorMessage.value = "មិនអាចទាញយកប្រវត្តិលទ្ធផលបានឡើយ!";
    }
  } catch (error) {
    errorMessage.value = "មានបញ្ហាក្នុងការតភ្ជាប់ទៅកាន់ Server!";
  } finally {
    setTimeout(() => {
      isLoading.value = false;
    }, 450);
  }
};

const totalPages = computed(() => {
  return Math.ceil(examResultsList.value.length / itemsPerPage.value) || 1;
});

const paginatedExamResults = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage.value;
  const endIndex = startIndex + itemsPerPage.value;
  return examResultsList.value.slice(startIndex, endIndex);
});

const rowRangeStart = computed(() => {
  if (examResultsList.value.length === 0) return 0;
  return (currentPage.value - 1) * itemsPerPage.value + 1;
});

const rowRangeEnd = computed(() => {
  const currentEnd = currentPage.value * itemsPerPage.value;
  return currentEnd > examResultsList.value.length ? examResultsList.value.length : currentEnd;
});

const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

const averageScore = computed(() => {
  if (examResultsList.value.length === 0) return 0;
  const total = examResultsList.value.reduce((acc, curr) => acc + (parseFloat(curr.score) || 0), 0);
  return total / examResultsList.value.length;
});

const averageGrade = computed(() => {
  const score = averageScore.value;
  if (score >= 90) return 'A';
  if (score >= 80) return 'B';
  if (score >= 70) return 'C';
  if (score >= 60) return 'D';
  if (score >= 50) return 'E';
  return 'F';
});

const calculateArc = (score) => {
  const parsedScore = parseFloat(score) || 0;
  const maxOffset = 113;
  return maxOffset - (maxOffset * parsedScore) / 100;
};

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('kh-KH', { day: 'numeric', month: 'long', year: 'numeric' });
};

const getGradeClass = (grade) => {
  if (!grade) return 'text-dark';
  if (['A', 'B'].includes(grade)) return 'text-emerald';
  if (['C', 'D'].includes(grade)) return 'text-amber';
  return 'text-rose';
};

const getProgressBarColor = (grade) => {
  if (['A', 'B'].includes(grade)) return '#10b981';
  if (['C', 'D'].includes(grade)) return '#f59e0b';
  return '#ef4444';
};

const getBadgeClass = (grade) => {
  if (['A', 'B'].includes(grade)) return 'badge-success';
  if (['C', 'D'].includes(grade)) return 'badge-warning';
  return 'badge-danger';
};

const getFeedbackBorderClass = (grade) => {
  if (['A', 'B'].includes(grade)) return 'fb-success';
  if (['C', 'D'].includes(grade)) return 'fb-warning';
  return 'fb-danger';
};

const exportToCSV = () => {
  const headers = ["ឈ្មោះវិញ្ញាសា", "បន្ទប់", "កាលបរិច្ឆេទ", "មតិកែលម្អ", "ពិន្ទុ", "និទ្ទេស"];
  const rows = examResultsList.value.map((result) => [
    `"${result.exam_title || ''}"`,
    `"${result.room || ''}"`,
    formatDate(result.submitted_at),
    `"${(result.feedback || 'មិនទាន់មានមតិកែលម្អ').replace(/"/g, '""')}"`,
    parseFloat(result.score || 0).toFixed(0),
    result.grade || 'F'
  ]);
  const csvContent = "\ufeff" + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  const dateStr = new Date().toISOString().slice(0, 10);
  link.setAttribute("href", url);
  link.setAttribute("download", `ប្រវត្តិលទ្ធផល_${dateStr}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

onMounted(() => {
  fetchStudentAllResults();
});
</script>

<style scoped>
.skeleton-shimmer {
  background: linear-gradient(90deg,
      #f1f5f9 25%,
      #e2e8f0 37%,
      #f1f5f9 63%);
  background-size: 400% 100%;
  animation: shimmer-animation 1.4s ease infinite;
}

@keyframes shimmer-animation {
  0% {
    background-position: 100% 0;
  }

  100% {
    background-position: 0% 0;
  }
}

.skeleton-avatar {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  flex-shrink: 0;
}

.skeleton-line {
  background-color: #f1f5f9;
  border-radius: 4px;
}

.state-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 40vh;
  gap: 12px;
}

.white-flat-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.03), 0 10px 18px rgba(15, 23, 42, 0.015);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.white-flat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.05);
}

.icon-pill {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.15rem;
  flex-shrink: 0;
}

.icon-pill.purple {
  background: #f3e8ff;
  color: #7c3aed;
}

.icon-pill.blue {
  background: #e0f2fe;
  color: #0284c7;
}

.card-label {
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  color: #434444;
  margin-bottom: 2px;
}

.card-value {
  font-size: 1.3rem;
  font-weight: 700;
  line-height: 1.2;
  color: #0f172a;
}

.card-unit {
  font-size: 0.8rem;
  font-weight: 600;
  color: #64748b;
}

.text-emerald {
  color: #10b981;
}

.text-amber {
  color: #f59e0b;
}

.text-rose {
  color: #ef4444;
}

.arc-ring {
  width: 52px;
  height: 52px;
  position: relative;
  flex-shrink: 0;
}

.arc-ring svg {
  transform: rotate(-90deg);
  width: 100%;
  height: 100%;
}

.arc-track {
  fill: none;
  stroke: #f1f5f9;
  stroke-width: 4;
}

.arc-fill {
  fill: none;
  stroke: #10b981;
  stroke-width: 4;
  stroke-linecap: round;
  stroke-dasharray: 113;
  transition: stroke-dashoffset 0.8s ease-in-out;
}

.arc-label {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.72rem;
  font-weight: 700;
  color: #0f172a;
}

.table-card {
  background: #fff;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.03), 0 10px 18px rgba(15, 23, 42, 0.015);
  overflow: hidden;
}

.table-heading {
  font-size: 1rem;
  font-weight: 700;
  color: #0f172a;
}

.dl-btn {
  background: linear-gradient(135deg, #10b981, #059669);
  color: #fff;
  border: none;
  border-radius: 50px;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.dl-btn:hover {
  opacity: 0.92;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.2);
}

.filter-strip {
  border-bottom: 1px solid #f1f5f9;
}

.filter-chip {
  background: none;
  border: 1px solid transparent;
  border-radius: 50px;
  padding: 4px 14px;
  font-size: 0.78rem;
  font-weight: 600;
  color: #64748b;
  cursor: pointer;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.filter-chip.active {
  background: #ecfdf5;
  color: #059669;
  border-color: rgba(16, 185, 129, 0.25);
}

.chip-count {
  background: #d1fae5;
  color: #065f46;
  border-radius: 50px;
  padding: 1px 7px;
  font-size: 0.7rem;
  font-weight: 700;
}

.results-table thead th {
  background: #f8fafc;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.6px;
  text-transform: uppercase;
  color: #373737;
  padding: 14px 16px;
  border-bottom: 1px solid #e2e8f0;
  white-space: nowrap;
}

.results-table tbody tr {
  border-bottom: 1px solid #f1f5f9;
  transition: background 0.15s;
}

.results-table tbody tr:last-child {
  border-bottom: none;
}

.results-table tbody tr:hover {
  background: #f8fafc;
}

.results-table tbody td {
  padding: 14px 16px;
  vertical-align: middle;
}

.exam-name {
  font-size: 0.875rem;
  font-weight: 600;
  color: #1e293b;
}

.room-badge {
  background: #f1f5f9;
  color: #475569;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 3px 14px;
  font-size: 0.75rem;
  font-weight: 600;
  white-space: nowrap;
}

.date-text {
  font-size: 0.78rem;
  color: #64748b;
  font-weight: 500;
  white-space: nowrap;
}

.feedback-box {
  font-size: 0.78rem;
  font-style: italic;
  color: #64748b;
  line-height: 1.5;
  padding: 8px 12px;
  border-radius: 10px;
  border-left: 3px solid;
  max-width: 280px;
}

.fb-success {
  border-color: #10b981;
  background: #f0fdf4;
}

.fb-warning {
  border-color: #f59e0b;
  background: #fffbeb;
}

.fb-danger {
  border-color: #ef4444;
  background: #fff1f2;
}

.score-track {
  height: 6px;
  background: #e2e8f0;
  border-radius: 99px;
  overflow: hidden;
}

.score-fill {
  height: 100%;
  border-radius: 99px;
  transition: width 1s ease;
}

.score-num {
  font-size: 0.82rem;
  font-weight: 700;
  font-family: monospace;
  min-width: 30px;
  text-align: right;
}

.grade-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 10px;
  font-size: 0.85rem;
  font-weight: 800;
}

.badge-success {
  background: #dcfce7;
  color: #15803d;
}

.badge-warning {
  background: #fef9c3;
  color: #a16207;
}

.badge-danger {
  background: #fee2e2;
  color: #b91c1c;
}

.pagination-container {
  background-color: #ffffff;
}

.pagination-info {
  font-size: 0.82rem;
  color: #64748b;
  font-weight: 500;
}

.pagination-info b {
  color: #065f46;
  font-weight: 600;
  background: #e6f4ea;
  padding: 2px 6px;
  border-radius: 4px;
  margin: 0 2px;
}

.page-arrow-btn {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  color: #10b981;
  width: 34px;
  height: 34px;
  border-radius: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.page-arrow-btn:hover:not(:disabled) {
  background: #e6f4ea;
  border-color: #a7f3d0;
  color: #059669;
  transform: scale(1.03);
}

.page-arrow-btn:disabled {
  opacity: 0.35;
  color: #94a3b8;
  border-color: #e2e8f0;
  cursor: not-allowed;
}

.page-number-btn {
  background: #ffffff;
  border: 1px solid transparent;
  color: #475569;
  width: 34px;
  height: 34px;
  border-radius: 10px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.page-number-btn:hover {
  background: #e6f4ea;
  color: #059669;
}

.page-number-btn.active {
  background: linear-gradient(135deg, #10b981, #059669);
  color: #ffffff;
  border-color: #10b981;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.25);
}
</style>