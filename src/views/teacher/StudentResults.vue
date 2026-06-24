<template>
  <div class="workspace">



    <!-- Breadcrumb + Exam Selector -->
    <div class="breadcrumb-bar shadow-sm">

      <div class="breadcrumb-right">
        <span class="stat-chip">
          <i class="fas fa-users"></i> {{ students.length }} Students
        </span>
        <span class="stat-chip warn">
          <i class="fas fa-clock"></i> {{ students.filter(s => s.statusType === 'review').length }} Pending
        </span>
      </div>
    </div>

    <!-- Filter Row -->
    <div class="filter-row shadow-sm">
      <div class="search-wrap">
        <i class="fas fa-search"></i>
        <input
          type="text"
          class="search-input"
          placeholder="Search student..."
          v-model="searchQuery"
        />
      </div>
      <div class="filter-tabs">
        <button
          v-for="tab in filterTabs"
          :key="tab.value"
          :class="['ftab', activeFilter === tab.value ? 'active' : '']"
          @click="activeFilter = tab.value"
        >
          {{ tab.label }}
        </button>
      </div>
    </div>

    <!-- Floating Table List Wrapper -->
    <div class="table-wrap">
      <div class="rg-header fw-bold text-muted">
        <div>Student</div>
        <div>Status</div>
        <div class="text-center">Submitted</div>
        <div class="text-center">Duration</div>
        <div class="text-center">Score</div>
        <div class="text-end">Action</div>
      </div>

      <!-- Paginated Floating Card Rows -->
      <div
        class="rg-row"
        v-for="student in paginatedStudents"
        :key="student.id"
      >
        <div class="cell-student">
          <img :src="student.avatar" class="student-avatar" :alt="student.name" />
          <div>
            <div class="student-name fw-bold text-dark">{{ student.name }}</div>
            <div class="student-id text-muted">{{ student.id }}</div>
          </div>
        </div>
        <div>
          <span :class="['badge-status', 'badge-' + student.statusType]">
            <i class="fas fa-circle me-1" style="font-size: 0.5rem; opacity: 0.7;"></i>
            {{ student.status }}
          </span>
        </div>
        <div class="cell-muted text-center">{{ student.date }}</div>
        <div class="cell-muted text-center">{{ student.duration }}</div>
        <div class="cell-score text-center fw-bold">{{ student.score }}</div>
        <div class="text-end">
          <button class="btn-review" @click="openReview(student)">
            <i class="fas fa-eye"></i> Review
          </button>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="filteredStudents.length === 0" class="empty-state border border-dashed rounded-4">
        <i class="fas fa-search"></i>
        <p>No students found matching current filters</p>
      </div>

      <!-- Pagination Footer Controls (Hides automatically if total pages <= 1) -->
      <div v-if="totalPages > 1" class="d-flex align-items-center justify-content-between mt-4 border-top pt-3 flex-wrap gap-2 px-2">
        <div class="text-muted small fw-medium">
          Showing {{ (currentPage - 1) * itemsPerPage + 1 }} to {{ Math.min(currentPage * itemsPerPage, filteredStudents.length) }} of {{ filteredStudents.length }} students
        </div>
        <nav aria-label="Student roster pagination">
          <ul class="pagination pagination-sm mb-0 align-items-center gap-1">
            <li class="page-item" :class="{ disabled: currentPage === 1 }">
              <button class="page-link border-0 rounded-circle d-flex align-items-center justify-content-center p-0" @click="prevPage" style="width: 32px; height: 32px;">
                <i class="fas fa-chevron-left" style="font-size: 0.8rem;"></i>
              </button>
            </li>
            
            <li v-for="page in totalPages" :key="page" class="page-item" :class="{ active: currentPage === page }">
              <button class="page-link border-0 rounded-circle d-flex align-items-center justify-content-center p-0 fw-semibold" @click="goToPage(page)" style="width: 32px; height: 32px; font-size: 0.82rem;">
                {{ page }}
              </button>
            </li>

            <li class="page-item" :class="{ disabled: currentPage === totalPages }">
              <button class="page-link border-0 rounded-circle d-flex align-items-center justify-content-center p-0" @click="nextPage" style="width: 32px; height: 32px;">
                <i class="fas fa-chevron-right" style="font-size: 0.8rem;"></i>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <!-- Review Modal -->
    <div v-if="reviewStudent" class="modal-overlay" @click.self="reviewStudent = null">
      <div class="modal-box shadow-lg">
        <div class="modal-header">
          <div class="modal-title">
            <i class="fas fa-file-alt"></i> Submission Review
          </div>
          <button class="modal-close" @click="reviewStudent = null">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-body">
          <div class="modal-student">
            <img :src="reviewStudent.avatar" class="modal-avatar" />
            <div>
              <div class="modal-student-name">{{ reviewStudent.name }}</div>
              <div class="modal-student-id">{{ reviewStudent.id }}</div>
            </div>
            <span :class="['badge-status ms-auto', 'badge-' + reviewStudent.statusType]">
              {{ reviewStudent.status }}
            </span>
          </div>
          <div class="modal-meta">
            <div class="meta-item">
              <span class="meta-label">Submitted</span>
              <span class="meta-val">{{ reviewStudent.date }}</span>
            </div>
            <div class="meta-item text-center">
              <span class="meta-label">Duration</span>
              <span class="meta-val">{{ reviewStudent.duration }}</span>
            </div>
            <div class="meta-item text-end">
              <span class="meta-label">Score</span>
              <span class="meta-val score">{{ reviewStudent.score }}</span>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn-cancel" @click="reviewStudent = null">Close</button>
          <button class="btn-grade">
            <i class="fas fa-check"></i> Mark as Graded
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

const selectedRoom = ref(1);
const selectedExam = ref('Final Exam');
const dropdownOpen = ref(false);
const searchQuery = ref('');
const activeFilter = ref('all');
const reviewStudent = ref(null);

// Pagination setup (Activates pagination on 11 items or more)
const currentPage = ref(1);
const itemsPerPage = ref(10); 

const rooms = ref([
  { id: 1, name: 'Grade 12-A' },
  { id: 2, name: 'Grade 11-B' },
  { id: 3, name: 'Grade 10-C' },
]);

const filterTabs = [
  { label: 'All', value: 'all' },
  { label: 'Needs Grading', value: 'review' },
  { label: 'Graded', value: 'graded' },
  { label: 'Absent', value: 'absent' },
];

const students = ref([
  { id: 'STU-9201', name: 'James Reyes',    status: 'Needs Grading', statusType: 'review',  date: 'Nov 5',  duration: '41m', score: '— / 100',  avatar: 'https://i.pravatar.cc/150?img=12' },
  { id: 'STU-9202', name: 'Chloe Navarro',  status: 'Graded',        statusType: 'graded',  date: 'Nov 5',  duration: '38m', score: '97 / 100', avatar: 'https://i.pravatar.cc/150?img=47' },
  { id: 'STU-9203', name: 'Ethan Lim',      status: 'Needs Grading', statusType: 'review',  date: 'Nov 6',  duration: '55m', score: '— / 100',  avatar: 'https://i.pravatar.cc/150?img=33' },
  { id: 'STU-9204', name: 'Sophia Chen',    status: 'Graded',        statusType: 'graded',  date: 'Nov 5',  duration: '29m', score: '88 / 100', avatar: 'https://i.pravatar.cc/150?img=44' },
  { id: 'STU-9205', name: 'Marcus Webb',    status: 'Absent',        statusType: 'absent',  date: '—',      duration: '—',   score: '— / 100',  avatar: 'https://i.pravatar.cc/150?img=60' },
  { id: 'STU-9206', name: 'Aria Santos',    status: 'Graded',        statusType: 'graded',  date: 'Nov 6',  duration: '44m', score: '75 / 100', avatar: 'https://i.pravatar.cc/150?img=25' },
]);

// Computed to return the fully filtered list of students
const filteredStudents = computed(() => {
  return students.value.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                        s.id.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchFilter = activeFilter.value === 'all' || s.statusType === activeFilter.value;
    return matchSearch && matchFilter;
  });
});

// Computed to segment filtered lists based on active pagination limits
const paginatedStudents = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage.value;
  const endIndex = startIndex + itemsPerPage.value;
  return filteredStudents.value.slice(startIndex, endIndex);
});

// Computed to determine structural page count
const totalPages = computed(() => {
  return Math.ceil(filteredStudents.value.length / itemsPerPage.value) || 1;
});

// Pagination Navigation Handlers
const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const goToPage = (page) => {
  currentPage.value = page;
};

// Reset page indicator back to 1 when changing filters
watch([selectedRoom, selectedExam, searchQuery, activeFilter], () => {
  currentPage.value = 1;
});

function selectExam(name) {
  selectedExam.value = name;
  dropdownOpen.value = false;
}

function openReview(student) {
  reviewStudent.value = student;
}
</script>

<style scoped>
/* Scoped variable fallbacks matching dynamic dashboard design system */
:root {
  --primary: #10b981;
  --primary-d: #059669;
  --surf: #ffffff;
  --bg: #f8fafc;
  --bdr: rgba(0, 0, 0, 0.05);
  --txt: #1e293b;
  --txt-mu: #64748b;
  --txt-lt: #94a3b8;
}

/* Outer workspace structure */
.workspace {
  font-family: 'Inter', 'Segoe UI', sans-serif;
  background-color: #f8fafc;
  min-height: 100vh;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  color: #1e293b;
}

/* Room Selector Box */
.room-selector {
  background-color: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.05) !important;
  border-radius: 16px;
  padding: 16px 20px;
}

.section-label {
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.2px;
  color: #94a3b8;
  margin-bottom: 12px;
}

.room-tabs {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.room-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 30px;
  border: 1.5px solid #e2e8f0;
  background: transparent;
  color: #64748b;
  font-size: 0.84rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}
.room-btn:hover { border-color: #10b981; color: #10b981; }
.room-btn.active {
  background-color: #ecfdf5;
  border-color: #10b981;
  color: #059669;
  font-weight: 700;
}

/* Breadcrumb Selector Row */
.breadcrumb-bar {
  background-color: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.05) !important;
  border-radius: 16px;
  padding: 14px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
}

.breadcrumb-left {
  display: flex;
  align-items: center;
}

.bc-room {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.88rem;
  color: #475569;
}
.bc-room i { color: #f59e0b; }

.bc-sep {
  font-size: 0.7rem;
  color: #cbd5e1;
}

.exam-toggle {
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 30px;
  padding: 6px 16px;
  font-size: 0.88rem;
  font-weight: 700;
  color: #1e293b;
  cursor: pointer;
  transition: all 0.2s ease;
}
.exam-toggle:hover { background-color: #f1f5f9; border-color: #cbd5e1; }
.exam-toggle i:first-child { color: #10b981; }
.exam-caret { font-size: 0.7rem; color: #64748b; }

.dropdown { position: relative; }
.exam-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 14px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  list-style: none;
  margin: 0;
  padding: 8px;
  min-width: 180px;
  z-index: 1000;
}
.exam-dropdown li {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 10px;
  font-size: 0.88rem;
  font-weight: 600;
  cursor: pointer;
  color: #475569;
  transition: all 0.15s ease;
}
.exam-dropdown li:hover { background-color: #ecfdf5; color: #059669; }
.exam-dropdown li i { width: 16px; text-align: center; }

.breadcrumb-right {
  display: flex;
  align-items: center;
  gap: 10px;
}

.stat-chip {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.82rem;
  font-weight: 700;
  padding: 6px 14px;
  border-radius: 30px;
  background-color: #ecfdf5;
  color: #059669;
  border: 1px solid rgba(16, 185, 129, 0.15);
}
.stat-chip.warn {
  background-color: #fff7ed;
  color: #ea580c;
  border: 1px solid rgba(234, 88, 12, 0.15);
}

/* Custom Input Field & Filters */
.filter-row {
  background-color: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.05) !important;
  border-radius: 16px;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.search-wrap {
  position: relative;
  flex: 1;
  min-width: 220px;
}
.search-wrap i {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: #94a3b8;
  font-size: 0.85rem;
}
.search-input {
  width: 100%;
  padding: 10px 16px 10px 38px;
  border: 1px solid #e2e8f0;
  border-radius: 30px;
  font-size: 0.88rem;
  color: #1e293b;
  background-color: #f8fafc;
  outline: none;
  transition: all 0.2s ease-in-out;
}
.search-input:focus {
  background-color: #ffffff;
  border-color: #cbd5e1;
  box-shadow: 0 0 0 3px rgba(165, 180, 252, 0.25);
}

.filter-tabs {
  display: flex;
  gap: 4px;
  background-color: #f1f5f9;
  padding: 6px;
  border-radius: 30px;
  border: 1px solid #e2e8f0;
}
.ftab {
  padding: 6px 16px;
  border-radius: 30px;
  font-size: 0.82rem;
  font-weight: 700;
  color: #64748b;
  cursor: pointer;
  border: none;
  background: transparent;
  transition: all 0.2s ease;
  white-space: nowrap;
}
.ftab:hover { color: #1e293b; }
.ftab.active {
  background-color: #ffffff;
  color: #059669;
  font-weight: 700;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

/* Floating Table List Wrapper */
.table-wrap {
  background-color: transparent;
  border: none;
  overflow: visible;
}

.rg-header {
  display: grid;
  grid-template-columns: 2fr 1.2fr 1.2fr 1.2fr 1fr 100px;
  padding: 12px 24px;
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  align-items: center;
}

.rg-row {
  display: grid;
  grid-template-columns: 2fr 1.2fr 1.2fr 1.2fr 1fr 100px;
  padding: 16px 24px;
  align-items: center;
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.03);
  margin-bottom: 12px;
  transition: all 0.2s ease-in-out;
}
.rg-row:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.06);
}

.cell-student {
  display: flex;
  align-items: center;
  gap: 12px;
}

.student-avatar {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
}

.student-name {
  font-size: 0.9rem;
  color: #1e293b;
}
.student-id {
  font-size: 0.78rem;
}

.cell-muted {
  font-size: 0.88rem;
  color: #64748b;
  font-weight: 500;
}

.cell-score {
  font-size: 0.92rem;
  color: #1e293b;
}

/* Status Badges */
.badge-status {
  display: inline-flex;
  align-items: center;
  padding: 6px 12px;
  border-radius: 30px;
  font-size: 0.78rem;
  font-weight: 700;
}
.badge-graded {
  background-color: #ecfdf5 !important;
  color: #10b981 !important;
  border: 1px solid rgba(16, 185, 129, 0.15);
}
.badge-review {
  background-color: #fff7ed !important;
  color: #ea580c !important;
  border: 1px solid rgba(234, 88, 12, 0.15);
}
.badge-absent {
  background-color: #f1f5f9 !important;
  color: #64748b !important;
  border: 1px solid rgba(100, 116, 139, 0.15);
}

/* Pagination Control Styling */
.pagination .page-link {
  color: var(--txt-m);
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

/* Eye Review Action Button */
.btn-review {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border-radius: 30px;
  border: none;
  background-color: #e6fcf5;
  font-size: 0.8rem;
  font-weight: 700;
  color: #059669;
  cursor: pointer;
  transition: all 0.2s ease;
}
.btn-review:hover {
  background-color: #10b981;
  color: #ffffff;
  transform: scale(1.05);
}
.btn-review:active { transform: scale(0.95); }

/* Empty State Container */
.empty-state {
  background-color: #ffffff;
  border-radius: 16px;
  padding: 60px 40px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
}
.empty-state i {
  font-size: 2.5rem;
  color: #cbd5e1;
  margin-bottom: 12px;
  display: block;
}
.empty-state p {
  font-size: 0.95rem;
  color: #64748b;
  font-weight: 500;
  margin: 0;
}

/* Review Modal Window */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.3);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
}

.modal-box {
  background-color: #ffffff;
  border-radius: 24px;
  width: 100%;
  max-width: 480px;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.05);
  animation: modalFadeIn 0.2s ease-out;
}

@keyframes modalFadeIn {
  from { opacity: 0; transform: scale(0.95) translateY(8px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  border-bottom: 1px solid #f1f5f9;
}
.modal-title {
  font-size: 1rem;
  font-weight: 800;
  display: flex;
  align-items: center;
  gap: 10px;
  color: #1e293b;
}
.modal-title i { color: #10b981; }

.modal-close {
  background-color: #f1f5f9;
  border: none;
  color: #64748b;
  font-size: 0.95rem;
  cursor: pointer;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;
}
.modal-close:hover { background-color: #cbd5e1; color: #1e293b; }

.modal-body { padding: 24px; }

.modal-student {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 24px;
}
.modal-avatar {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
.modal-student-name {
  font-size: 1.05rem;
  font-weight: 800;
  color: #1e293b;
  margin-bottom: 2px;
}
.modal-student-id {
  font-size: 0.82rem;
  color: #94a3b8;
  font-weight: 500;
}
.ms-auto { margin-left: auto; }

.modal-meta {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  background-color: #f8fafc;
  border-radius: 16px;
  padding: 16px;
  border: 1px solid #f1f5f9;
}
.meta-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.meta-label {
  font-size: 0.7rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #94a3b8;
}
.meta-val {
  font-size: 0.9rem;
  font-weight: 700;
  color: #1e293b;
}
.meta-val.score { color: #10b981; }

.modal-footer {
  padding: 16px 24px;
  border-top: 1px solid #f1f5f9;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.btn-cancel {
  padding: 10px 20px;
  border-radius: 30px;
  border: 1px solid #cbd5e1;
  background: transparent;
  font-size: 0.88rem;
  font-weight: 700;
  color: #64748b;
  cursor: pointer;
  transition: all 0.2s ease;
}
.btn-cancel:hover { background-color: #f1f5f9; color: #1e293b; }

.btn-grade {
  padding: 10px 22px;
  border-radius: 30px;
  border: none;
  background-color: #10b981;
  color: #ffffff;
  font-size: 0.88rem;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.2);
}
.btn-grade:hover {
  background-color: #059669;
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(5, 150, 105, 0.3);
}
.btn-grade:active { transform: translateY(0); }

/* Responsive grid layouts under 768px */
@media (max-width: 768px) {
  .rg-header { display: none; }
  .rg-row {
    grid-template-columns: 1fr;
    gap: 12px;
    padding: 20px;
  }
  .text-end { text-align: left !important; }
  .modal-meta { grid-template-columns: 1fr; }
}
</style>