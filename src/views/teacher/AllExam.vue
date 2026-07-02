<template>
  <div class="exams-dashboard-container p-1">
    <div class="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4 pb-2">
      <div>
        <h4 class="fw-bold text-dark mb-1" style="letter-spacing: -0.5px;">បញ្ជីវិញ្ញាសាទាំងអស់</h4>
        <p class="text-muted small mb-0">គ្រប់គ្រង និងពិនិត្យមើលរាល់វិញ្ញាសាប្រឡងក្នុងប្រព័ន្ធ</p>
      </div>
      <div>
        <span class="vibrant-count-badge">
          សរុប៖ {{ filteredResults.length }} វិញ្ញាសា
        </span>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border vibrant-spinner" role="status">
        <span class="visually-hidden">កំពុងដំណើរការ...</span>
      </div>
    </div>
    <div v-else>
      <div v-if="paginatedResults.length > 0" class="row g-4">
        <div v-for="exam in paginatedResults" :key="exam.id" class="col-12 col-md-6 col-lg-4">
          <div class="vibrant-exam-item transition-all">
            <div class="d-flex align-items-center justify-content-between mb-3">
              <div class="d-flex align-items-center gap-2">
                <div class="vibrant-avatar-sm">
                  {{ (exam.teacher_name || 'T').charAt(0).toUpperCase() }}
                </div>
                <div class="d-flex flex-column">
                  <span class="vibrant-teacher-name">{{ exam.teacher_name || 'មិនមានឈ្មោះគ្រូ' }}</span>
                  <span class="vibrant-code-label">Code: {{ exam.exam_code || '---' }}</span>
                </div>
              </div>

              <span :class="['vibrant-status-badge', exam.status === 'active' ? 'status-active' : 'status-inactive']">
                <span class="status-pulse-dot" v-if="exam.status === 'active'"></span>
                {{ exam.status === 'active' ? 'Active' : exam.status }}
              </span>
            </div>

            <div class="mb-3 pt-1">
              <h5 class="vibrant-exam-title text-truncate-2" :title="exam.title">
                {{ exam.title || 'វិញ្ញាសាគ្មានឈ្មោះ' }}
              </h5>
              <p class="vibrant-exam-desc text-truncate-2" :title="exam.description">
                {{ exam.description || 'គ្មានការពិពណ៌នាឡើយ' }}
              </p>
            </div>

            <div class="d-flex align-items-center justify-content-between my-3 py-2 border-top border-bottom border-light-subtle">
              <div class="meta-block">
                <span class="meta-label">រយៈពេល</span>
                <span class="meta-value text-gradient-green">{{ exam.duration || 0 }} នាទី</span>
              </div>
              <div class="meta-divider"></div>
              <div class="meta-block">
                <span class="meta-label">ម៉ោងចាប់ផ្តើម</span>
                <span class="meta-value text-dark">
                  {{ exam.start_time ? new Date(exam.start_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : '---' }}
                </span>
              </div>
              <div class="meta-divider"></div>
              <div class="meta-block">
                <span class="meta-label">កាលបរិច្ឆេទ</span>
                <span class="meta-value text-secondary">
                  {{ exam.created_at ? new Date(exam.created_at).toLocaleDateString() : '---' }}
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-5 bg-white shadow-sm rounded-4">
        <i class="far fa-folder-open fa-2x mb-4 text-muted opacity-50"></i>
        <h6 class="fw-semibold text-secondary">មិនមានវិញ្ញាសាឡើយ</h6>
      </div>
      <div v-if="totalPages > 1" class="d-flex align-items-center justify-content-between pt-3 flex-wrap gap-2">
        <div class="text-muted small fw-medium">
          បង្ហាញ {{ (currentPage - 1) * itemsPerPage + 1 }} - {{ Math.min(currentPage * itemsPerPage, filteredResults.length) }} នៃ {{ filteredResults.length }}
        </div>
        
        <nav>
          <ul class="pagination pagination-vibrant mb-0 gap-1">
            <li class="page-item" :class="{ disabled: currentPage === 1 }">
              <button class="page-link" @click="prevPage" aria-label="Previous">
                <i class="fas fa-angle-left"></i>
              </button>
            </li>
            <li v-for="page in visiblePages" :key="page" class="page-item" :class="{ active: currentPage === page }">
              <button class="page-link" @click="goToPage(page)">{{ page }}</button>
            </li>
            <li class="page-item" :class="{ disabled: currentPage === totalPages }">
              <button class="page-link" @click="nextPage" aria-label="Next">
                <i class="fas fa-angle-right"></i>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { useAuthStore } from "@/stores/authStore";
import { getExams } from "@/api/exam.api";

const loading = ref(true);
const studentResults = ref([]);
const currentPage = ref(1);
const itemsPerPage = ref(6);
const toast = useToast();
const router = useRouter();
const authStore = useAuthStore();

const filteredResults = computed(() => studentResults.value || []);
const paginatedResults = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage.value;
  return filteredResults.value.slice(startIndex, startIndex + itemsPerPage.value);
});
const totalPages = computed(() => Math.ceil(filteredResults.value.length / itemsPerPage.value) || 1);
const visiblePages = computed(() => {
  const maxVisible = 2;
  const pages = [];
  
  let startPage = Math.max(1, currentPage.value - Math.floor(maxVisible / 2));
  let endPage = startPage + maxVisible - 1;

  if (endPage > totalPages.value) {
    endPage = totalPages.value;
    startPage = Math.max(1, endPage - maxVisible + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }
  
  return pages;
});

const prevPage = () => { if (currentPage.value > 1) currentPage.value--; };
const nextPage = () => { if (currentPage.value < totalPages.value) currentPage.value++; };
const goToPage = (page) => { currentPage.value = page; };


const fetchStudentResults = async () => {
  loading.value = true;
  try {
    const res = await getExams();
    const rawData = res?.data?.data || res.data || [];
    studentResults.value = Array.isArray(rawData) ? rawData : rawData ? [rawData] : [];
  } catch (err) {
    if (toast) toast.error("មានកំហុសក្នុងការទាញយកបញ្ជីវិញ្ញាសា");
  } finally {
    loading.value = false;
  }
};

onMounted( async () => {
  fetchStudentResults();
  await authStore.fetchProfile;
  
});
</script>

<style scoped>
.vibrant-exam-item {
  background: #ffffff;
  border: 1px solid rgba(43, 182, 115, 0.15); 
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 4px 18px rgba(43, 182, 115, 0.02), 0 1px 3px rgba(0, 0, 0, 0.01);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.vibrant-exam-item:hover {
  transform: translateY(-4px);
  border-color: rgba(43, 182, 115, 0.4);
  box-shadow: 0 14px 30px rgba(43, 182, 115, 0.12);
}

.vibrant-avatar-sm {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: linear-gradient(135deg, #e8f7f0, #d1f0e1);
  color: #2bb673;
  font-size: 0.85rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
}

.vibrant-teacher-name {
  font-size: 0.88rem;
  font-weight: 700;
  color: #0f172a;
  line-height: 1.2;
}

.vibrant-code-label {
  font-size: 0.72rem;
  color: #64748b;
  font-weight: 600;
}

.vibrant-status-badge {
  font-size: 0.75rem;
  font-weight: 700;
  padding: 4px 12px;
  border-radius: 30px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
.status-active {
  background-color: #d1fae5;
  color: #065f46;
}
.status-inactive {
  background-color: #f1f5f9;
  color: #475569;
}

.status-pulse-dot {
  width: 6px;
  height: 6px;
  background-color: #10b981;
  border-radius: 50%;
  display: inline-block;
  animation: pulseGlow 1.5s infinite;
}

@keyframes pulseGlow {
  0% { transform: scale(0.9); opacity: 0.6; }
  50% { transform: scale(1.2); opacity: 1; }
  100% { transform: scale(0.9); opacity: 0.6; }
}

/* Title & Description */
.vibrant-exam-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #0f172a;
  line-height: 1.4;
  margin-bottom: 6px;
}

.vibrant-exam-desc {
  font-size: 0.85rem;
  color: #475569;
  line-height: 1.5;
}

.vibrant-exam-id {
  font-size: 0.72rem;
  color: #2bb673;
  background-color: #e8f7f0;
  padding: 2px 8px;
  border-radius: 6px;
  font-weight: 600;
}

/* Meta Data Inline */
.meta-block {
  display: flex;
  flex-direction: column;
}

.meta-label {
  font-size: 0.68rem;
  font-weight: 700;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 2px;
}

.meta-value {
  font-size: 0.85rem;
  font-weight: 700;
}

.text-gradient-green {
  background: linear-gradient(135deg, #2bb673, #10b981);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.meta-divider {
  width: 1px;
  height: 22px;
  background-color: #e2e8f0;
}

.btn-vibrant-action {
  background: linear-gradient(135deg, #2bb673, #10b981);
  border: none;
  color: #ffffff;
  font-size: 0.82rem;
  font-weight: 600;
  padding: 6px 16px;
  border-radius: 30px;
  box-shadow: 0 4px 10px rgba(43, 182, 115, 0.2);
  display: inline-flex;
  align-items: center;
  transition: all 0.2s ease;
  cursor: pointer;
}

.btn-vibrant-action:hover {
  transform: scale(1.03);
  box-shadow: 0 6px 14px rgba(43, 182, 115, 0.3);
}

.vibrant-count-badge {
  background: linear-gradient(135deg, #e8f7f0, #d1f0e1);
  color: #2bb673;
  padding: 6px 16px;
  border-radius: 30px;
  font-size: 0.8rem;
  font-weight: 700;
}

.vibrant-spinner {
  color: #2bb673;
}

.text-truncate-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Pagination Style */
.pagination-vibrant .page-link {
  border: none;
  background: #ffffff;
  color: #475569;
  font-size: 0.82rem;
  font-weight: 700;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 25px !important;
  box-shadow: 0 2px 6px rgba(0,0,0,0.02);
  transition: all 0.2s ease;
}

.pagination-vibrant .page-item.active .page-link {
  background: linear-gradient(135deg, #2bb673, #10b981) !important;
  color: #ffffff !important;
}

.pagination-vibrant .page-item.disabled .page-link {
  opacity: 0.4;
  cursor: not-allowed;
  background: transparent;
}
</style>