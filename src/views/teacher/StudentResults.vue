<template>
  <div class="student-results-container">
    <!-- Loading State -->
    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">កំពុងដំណើរការ...</span>
      </div>
    </div>

    <!-- Content State -->
    <div v-else class="card border-0 shadow-sm rounded-4 overflow-hidden">
      <!-- Header with integrated filter controls -->
      <div
        class="card-header bg-white border-bottom-0 pt-4 px-4 pb-3 d-flex align-items-center justify-content-between flex-wrap gap-3">
        <div>
          <h5 class="card-title fw-bold text-dark mb-1">លទ្ធផលសិស្ស</h5>
          <p class="text-muted small mb-0">
            បង្ហាញព័ត៌មានលទ្ធផល និងការផ្តល់មតិត្រឡប់
          </p>
        </div>

        <!-- Filter Selector and Stats -->
        <div class="d-flex align-items-center gap-3 flex-wrap">
          <div class="d-flex align-items-center gap-2">
            <span class="text-muted small fw-semibold text-nowrap">កម្រងវិញ្ញាសា៖</span>
            <select v-model="selectedExam"
              class="form-select form-select-sm border border-secondary-subtle rounded-pill px-3 py-2 text-dark" style="
                min-width: 180px;
                font-size: 0.82rem;
                font-weight: 600;
                background-color: #f8fafc;
              ">
              <option value="all">ទាំងអស់</option>
              <option v-for="title in availableExams" :key="title" :value="title">
                {{ title }}
              </option>
            </select>
          </div>
          <span class="badge bg-light text-dark border px-3 py-2 rounded-pill fw-semibold">
            សរុប {{ filteredResults.length }} លទ្ធផល
          </span>
        </div>
      </div>

      <!-- Table content wrapper with pagination bottom row -->
      <div class="px-4 pb-4">
        <div class="table-responsive">
          <table class="table align-middle mb-0 custom-results-table">
            <thead>
              <tr>
                <th class="text-secondary text-uppercase py-3 ps-3" style="font-size: 0.75rem; letter-spacing: 0.5px">
                  សិស្ស
                </th>
                <th class="text-secondary text-uppercase py-3 ps-3" style="font-size: 0.75rem; letter-spacing: 0.5px">
                  បន្ទប់
                </th>
                <th class="text-secondary text-uppercase py-3" style="font-size: 0.75rem; letter-spacing: 0.5px">
                  វិញ្ញាសា
                </th>
                <th class="text-secondary text-uppercase py-3 text-center"
                  style="font-size: 0.75rem; letter-spacing: 0.5px">
                  ពិន្ទុ
                </th>
                <th class="text-secondary text-uppercase py-3 text-center"
                  style="font-size: 0.75rem; letter-spacing: 0.5px">
                  កាលបរិច្ឆេទ
                </th>
                <th class="text-secondary text-uppercase py-3" style="
                    font-size: 0.75rem;
                    letter-spacing: 0.5px;
                    min-width: 240px;
                  ">
                  មតិកែលម្អ
                </th>
                <th class="text-center text-secondary text-uppercase py-3 pe-3"
                  style="font-size: 0.75rem; letter-spacing: 0.5px; width: 90px">
                  សកម្មភាព
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="res in paginatedResults" :key="res.submission_id" class="card-row">
                <!-- Student Column -->
                <td class="ps-3 py-3">
                  <div class="d-flex align-items-center gap-3">
                    <div
                      class="avatar-circle-custom d-flex align-items-center justify-content-center overflow-hidden rounded-circle bg-light"
                      style="width: 40px; height: 40px">
                      <img :src="getAvatarUrl(res.avatar)" class="w-100 h-100 object-fit-cover" @error="
                        (e) =>
                        (e.target.src =
                          'https://ui-avatars.com/api/?name=' +
                          res.first_name +
                          '+' +
                          res.last_name +
                          '&background=random')
                      " alt="student avatar" />
                    </div>
                    <div>
                      <div class="fw-semibold text-dark mb-0">
                        {{ res.first_name }} {{ res.last_name }}
                      </div>
                      <span class="text-muted small">{{
                        res.student_code
                      }}</span>
                    </div>
                  </div>
                </td>

                <td class="py-3">
                  <span class="fw-medium text-dark-emphasis">{{
                    res.room
                  }}</span>
                </td>

                <!-- Exam Title -->
                <td class="py-3">
                  <span class="fw-medium text-dark-emphasis">{{
                    res.exam_title
                  }}</span>
                </td>

                <!-- Score Badge -->
                <td class="py-3 text-center">
                  <span class="badge rounded-pill px-3 py-2 fw-semibold d-inline-flex align-items-center gap-1"
                    :class="getScoreClass(res)">
                    <i class="fas" :class="getScoreIcon(res)"></i>
                    {{ formatScore(res) }}
                  </span>
                </td>

                <!-- Date -->
                <td class="py-3 text-center text-muted small">
                  {{ new Date(res.submitted_at).toLocaleDateString() }}
                </td>

                <!-- Feedback Input -->
                <td class="py-3">
                  <input type="text"
                    class="form-control form-control-sm border-0 bg-light rounded-3 px-3 py-2 feedback-input-field"
                    v-model="res.feedback" placeholder="សរសេរមតិកែលម្អនៅទីនេះ..." />
                </td>

                <!-- Action Button -->
                <td class="text-center pe-3 py-3">
                  <button class="btn btn-action-send btn-sm rounded-3"
                    @click="sendFeedback(res.submission_id, res.feedback)" title="ផ្ញើមតិកែលម្អ">
                    <i class="fas fa-paper-plane"></i>
                  </button>
                </td>
              </tr>
              <!-- Filter result fall-through empty state -->
              <tr v-if="paginatedResults.length === 0">
                <td colspan="6" class="text-center py-5 text-muted">
                  មិនមានលទ្ធផលត្រូវគ្នានឹងការចម្រោះរបស់អ្នកឡើយ។
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination Footer Controls -->
        <div v-if="totalPages > 1"
          class="d-flex align-items-center justify-content-between mt-4 border-top pt-3 flex-wrap gap-2">
          <div class="text-muted small fw-medium">
            បង្ហាញ {{ (currentPage - 1) * itemsPerPage + 1 }} ដល់
            {{ Math.min(currentPage * itemsPerPage, filteredResults.length) }}
            នៃលទ្ធផលសរុប {{ filteredResults.length }} នាក់
          </div>
          <nav aria-label="Result pagination">
            <ul class="pagination pagination-sm mb-0 align-items-center gap-1">
              <li class="page-item" :class="{ disabled: currentPage === 1 }">
                <button class="page-link border-0 rounded-circle d-flex align-items-center justify-content-center p-0"
                  @click="prevPage" style="width: 32px; height: 32px">
                  <i class="fas fa-chevron-left" style="font-size: 0.8rem"></i>
                </button>
              </li>

              <li v-for="page in totalPages" :key="page" class="page-item" :class="{ active: currentPage === page }">
                <button
                  class="page-link border-0 rounded-circle d-flex align-items-center justify-content-center p-0 fw-semibold"
                  @click="goToPage(page)" style="width: 32px; height: 32px; font-size: 0.82rem">
                  {{ page }}
                </button>
              </li>

              <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                <button class="page-link border-0 rounded-circle d-flex align-items-center justify-content-center p-0"
                  @click="nextPage" style="width: 32px; height: 32px">
                  <i class="fas fa-chevron-right" style="font-size: 0.8rem"></i>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { getAllStudentResults, addFeedback } from "@/api/exam.api";

const loading = ref(true);
const studentResults = ref([]);
const selectedExam = ref("all");
const currentPage = ref(1);
const itemsPerPage = ref(6);
const toast = useToast();
const imgBaseUrl = import.meta.env.VITE_BASE_URL_FOR_IMAGE;

const availableExams = computed(() => {
  if (!studentResults.value) return [];
  return [
    ...new Set(
      studentResults.value.map((res) => res.exam_title).filter(Boolean),
    ),
  ];
});

const filteredResults = computed(() => {
  if (!studentResults.value) return [];
  return selectedExam.value === "all"
    ? studentResults.value
    : studentResults.value.filter(
      (res) => res.exam_title === selectedExam.value,
    );
});

const paginatedResults = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage.value;
  return filteredResults.value.slice(
    startIndex,
    startIndex + itemsPerPage.value,
  );
});

const totalPages = computed(
  () => Math.ceil(filteredResults.value.length / itemsPerPage.value) || 1,
);

// --- Navigation ---
const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};
const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};
const goToPage = (page) => {
  currentPage.value = page;
};

watch(selectedExam, () => {
  currentPage.value = 1;
});

// --- API Calls ---
const fetchStudentResults = async () => {
  loading.value = true;
  try {
    const res = await getAllStudentResults();
    const rawData = res?.data?.data || [];

    studentResults.value = Array.isArray(rawData)
      ? rawData
      : rawData
        ? [rawData]
        : [];
  } catch (err) {
    console.error(err);
    toast.error("មានកំហុសក្នុងការទាញយកលទ្ធផលសិស្ស");
  } finally {
    loading.value = false;
  }
};

const getInitial = (res) => {
  const name =
    res.first_name ||
    res.last_name ||
    res.student_name ||
    res.student_code ||
    "S";

  return name.charAt(0).toUpperCase();
};

const formatScore = (res) => {
  const score = Number(res.score || 0);
  const total = Number(res.total_points || 1);

  return `${score.toFixed(0)} / ${total}`;
};

const getScoreClass = (res) => {
  const score = Number(res.score || 0);
  const total = Number(res.total_points || 1);

  const percent = (score / total) * 100;

  if (percent >= 50) return "bg-success-subtle text-success";
  return "bg-danger-subtle text-danger";
};

const getScoreIcon = (res) => {
  const score = Number(res.score || 0);
  const total = Number(res.total_points || 1);

  return (score / total) * 100 >= 50 ? "fa-check-circle" : "fa-times-circle";
};

const sendFeedback = async (subId, feedbackText) => {
  try {
    await addFeedback(subId, feedbackText);

    toast.success("បានផ្ញើ Feedback ជោគជ័យ!");
  } catch (err) {
    console.error("កំហុស Feedback:", err.response?.data || err);
    toast.error("មានកំហុសក្នុងការផ្ញើ Feedback");
  }
};

const getAvatarUrl = (avatar) => {
  if (!avatar || avatar === "default.png") {
    return 'default.png';
  }

  return `${imgBaseUrl}${avatar}`;
};

onMounted(async () => {
  fetchStudentResults();
});
</script>

<style scoped>
.student-results-container {
  min-height: 100vh;
}

.custom-results-table {
  font-family: "Inter", "Segoe UI", "Kantumruy Pro", sans-serif;
}

.avatar-circle-custom {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #e2f1fd;
  color: #2b82c9;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1rem;
  border: 2px solid #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
}

.feedback-input-field {
  transition: all 0.2s ease;
  border: 1px solid transparent !important;
}

.feedback-input-field:focus {
  background-color: #ffffff !important;
  border-color: #10b981 !important;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.15);
  outline: none;
}

.btn-action-send {
  background-color: #e6fcf5;
  color: #059669;
  border: none;
  width: 34px;
  height: 34px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.btn-action-send:hover {
  background-color: #10b981;
  color: #ffffff;
  transform: translateY(-1px);
}

.pagination .page-link {
  color: #64748b;
  background-color: #f1f5f9;
  border: none;
  transition: all 0.2s ease;
}

.pagination .page-link:hover {
  background-color: #ecfdf5;
  color: #059669;
}

.pagination .page-item.active .page-link {
  background-color: #10b981 !important;
  color: #ffffff !important;
  box-shadow: 0 4px 8px rgba(16, 185, 129, 0.2);
}

.pagination .page-item.disabled .page-link {
  background-color: #f8fafc;
  color: #cbd5e1;
  cursor: not-allowed;
}
</style>
