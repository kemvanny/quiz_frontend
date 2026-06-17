<template>
  <div class="workspace">

    <!-- Room Selector -->
    <div class="room-selector">
      <div class="section-label">Select Classroom</div>
      <div class="room-tabs">
        <button
          v-for="room in rooms"
          :key="room.id"
          :class="['room-btn', selectedRoom === room.id ? 'active' : '']"
          @click="selectedRoom = room.id"
        >
          <i :class="selectedRoom === room.id ? 'fas fa-folder-open' : 'fas fa-folder'"></i>
          {{ room.name }}
        </button>
      </div>
    </div>

    <!-- Breadcrumb + Exam Selector -->
    <div class="breadcrumb-bar">
      <div class="breadcrumb-left">
        <span class="bc-room">
          <i class="fas fa-folder-open"></i>
          {{ rooms.find(r => r.id === selectedRoom)?.name }}
        </span>
        <i class="fas fa-chevron-right bc-sep"></i>
        <div class="dropdown" ref="dropdownRef">
          <button class="exam-toggle" @click="dropdownOpen = !dropdownOpen">
            <i class="fas fa-graduation-cap"></i>
            {{ selectedExam }}
            <i class="fas fa-chevron-down exam-caret"></i>
          </button>
          <ul v-if="dropdownOpen" class="exam-dropdown">
            <li @click="selectExam('Final Exam')"><i class="fas fa-graduation-cap"></i> Final Exam</li>
            <li @click="selectExam('Quiz')"><i class="fas fa-bolt"></i> Quiz</li>
            <li @click="selectExam('Assignment')"><i class="fas fa-tasks"></i> Assignment</li>
          </ul>
        </div>
      </div>
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
    <div class="filter-row">
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

    <!-- Table -->
    <div class="table-wrap">
      <div class="rg-header">
        <div>Student</div>
        <div>Status</div>
        <div>Submitted</div>
        <div>Duration</div>
        <div>Score</div>
        <div class="text-right">Action</div>
      </div>

      <div
        class="rg-row"
        v-for="student in filteredStudents"
        :key="student.id"
      >
        <div class="cell-student">
          <img :src="student.avatar" class="student-avatar" :alt="student.name" />
          <div>
            <div class="student-name">{{ student.name }}</div>
            <div class="student-id">{{ student.id }}</div>
          </div>
        </div>
        <div>
          <span :class="['badge-status', 'badge-' + student.statusType]">
            {{ student.status }}
          </span>
        </div>
        <div class="cell-muted">{{ student.date }}</div>
        <div class="cell-muted">{{ student.duration }}</div>
        <div class="cell-score">{{ student.score }}</div>
        <div class="text-right">
          <button class="btn-review" @click="openReview(student)">
            <i class="fas fa-eye"></i> Review
          </button>
        </div>
      </div>

      <div v-if="filteredStudents.length === 0" class="empty-state">
        <i class="fas fa-search"></i>
        <p>No students found</p>
      </div>
    </div>

    <!-- Review Modal -->
    <div v-if="reviewStudent" class="modal-overlay" @click.self="reviewStudent = null">
      <div class="modal-box">
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
            <div class="meta-item">
              <span class="meta-label">Duration</span>
              <span class="meta-val">{{ reviewStudent.duration }}</span>
            </div>
            <div class="meta-item">
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
import { ref, computed } from 'vue';

const selectedRoom = ref(1);
const selectedExam = ref('Final Exam');
const dropdownOpen = ref(false);
const searchQuery = ref('');
const activeFilter = ref('all');
const reviewStudent = ref(null);

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

const filteredStudents = computed(() => {
  return students.value.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                        s.id.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchFilter = activeFilter.value === 'all' || s.statusType === activeFilter.value;
    return matchSearch && matchFilter;
  });
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
/* ── Root Variables ── */
:root {
  --primary: #1CAB70;
  --primary-d: #158a59;
  --surf: #ffffff;
  --bg: #f4f6f9;
  --bdr: #e2e8f0;
  --txt: #1e293b;
  --txt-mu: #64748b;
  --txt-lt: #94a3b8;
  --radius: 10px;
}

/* ── Workspace ── */
.workspace {
  font-family: 'Inter', 'Segoe UI', sans-serif;
  background: var(--bg);
  min-height: 100vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  color: var(--txt);
}

/* ── Room Selector ── */
.room-selector {
  background: var(--surf);
  border: 1px solid var(--bdr);
  border-radius: var(--radius);
  padding: 14px 16px;
}

.section-label {
  font-size: 0.68rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.2px;
  color: var(--txt-mu);
  margin-bottom: 10px;
}

.room-tabs {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.room-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border-radius: 8px;
  border: 1.5px solid var(--bdr);
  background: transparent;
  color: var(--txt-mu);
  font-size: 0.83rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
}
.room-btn:hover { border-color: var(--primary); color: var(--primary); }
.room-btn.active {
  background: #e8f8f1;
  border-color: var(--primary);
  color: var(--primary);
  font-weight: 600;
}
.room-btn i { font-size: 0.8rem; }

/* ── Breadcrumb Bar ── */
.breadcrumb-bar {
  background: var(--surf);
  border: 1px solid var(--bdr);
  border-radius: var(--radius);
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
}

.breadcrumb-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.bc-room {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.83rem;
  color: var(--txt-mu);
}
.bc-room i { color: #f59e0b; }

.bc-sep {
  font-size: 0.65rem;
  color: var(--txt-lt);
}

.exam-toggle {
  display: flex;
  align-items: center;
  gap: 6px;
  background: none;
  border: none;
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--txt);
  cursor: pointer;
  padding: 0;
}
.exam-toggle i:first-child { color: var(--primary); }
.exam-caret { font-size: 0.65rem; color: var(--txt-mu); }

.dropdown { position: relative; }
.exam-dropdown {
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  background: var(--surf);
  border: 1px solid var(--bdr);
  border-radius: 10px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.1);
  list-style: none;
  margin: 0;
  padding: 6px;
  min-width: 160px;
  z-index: 100;
}
.exam-dropdown li {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  border-radius: 7px;
  font-size: 0.84rem;
  cursor: pointer;
  color: var(--txt);
}
.exam-dropdown li:hover { background: #f1faf6; color: var(--primary); }
.exam-dropdown li i { width: 14px; text-align: center; }

.breadcrumb-right {
  display: flex;
  align-items: center;
  gap: 8px;
}

.stat-chip {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.78rem;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 20px;
  background: #e8f8f1;
  color: var(--primary);
}
.stat-chip.warn {
  background: #fff7ed;
  color: #f97316;
}
.stat-chip i { font-size: 0.72rem; }

/* ── Filter Row ── */
.filter-row {
  background: var(--surf);
  border: 1px solid var(--bdr);
  border-radius: var(--radius);
  padding: 10px 14px;
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.search-wrap {
  position: relative;
  flex: 1;
  min-width: 180px;
}
.search-wrap i {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--txt-lt);
  font-size: 0.78rem;
}
.search-input {
  width: 100%;
  padding: 7px 12px 7px 30px;
  border: 1.5px solid var(--bdr);
  border-radius: 8px;
  font-size: 0.84rem;
  color: var(--txt);
  background: var(--bg);
  outline: none;
  transition: border-color 0.15s;
}
.search-input:focus { border-color: var(--primary); }

.filter-tabs {
  display: flex;
  gap: 4px;
  background: var(--bg);
  padding: 4px;
  border-radius: 9px;
  border: 1px solid var(--bdr);
}
.ftab {
  padding: 5px 12px;
  border-radius: 7px;
  font-size: 0.78rem;
  font-weight: 500;
  color: var(--txt-mu);
  cursor: pointer;
  border: none;
  background: transparent;
  transition: all 0.15s;
  white-space: nowrap;
}
.ftab:hover { color: var(--txt); }
.ftab.active {
  background: var(--surf);
  color: var(--primary);
  font-weight: 600;
  box-shadow: 0 1px 4px rgba(0,0,0,0.08);
}

/* ── Table ── */
.table-wrap {
  background: var(--surf);
  border: 1px solid var(--bdr);
  border-radius: var(--radius);
  overflow: hidden;
}

.rg-header {
  display: grid;
  grid-template-columns: 2fr 1.2fr 1fr 1fr 1fr 1fr;
  padding: 10px 16px;
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  color: var(--txt-mu);
  background: var(--bg);
  border-bottom: 1px solid var(--bdr);
}

.rg-row {
  display: grid;
  grid-template-columns: 2fr 1.2fr 1fr 1fr 1fr 1fr;
  padding: 12px 16px;
  align-items: center;
  border-bottom: 1px solid var(--bdr);
  transition: background 0.12s;
}
.rg-row:last-child { border-bottom: none; }
.rg-row:hover { background: #f8fafc; }

.cell-student {
  display: flex;
  align-items: center;
  gap: 10px;
}

.student-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--bdr);
}

.student-name {
  font-size: 0.86rem;
  font-weight: 600;
  color: var(--txt);
}
.student-id {
  font-size: 0.74rem;
  color: var(--txt-lt);
}

.cell-muted {
  font-size: 0.82rem;
  color: var(--txt-mu);
}

.cell-score {
  font-size: 0.86rem;
  font-weight: 600;
  color: var(--txt);
}

.text-right { text-align: right; }

/* ── Status Badges ── */
.badge-status {
  display: inline-flex;
  align-items: center;
  padding: 3px 10px;
  border-radius: 20px;
  font-size: 0.74rem;
  font-weight: 600;
}
.badge-graded  { background: #dcfce7; color: #16a34a; }
.badge-review  { background: #fff7ed; color: #ea580c; }
.badge-absent  { background: #f1f5f9; color: #64748b; }

/* ── Row Action Button ── */
.btn-review {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 5px 12px;
  border-radius: 7px;
  border: 1.5px solid var(--bdr);
  background: transparent;
  font-size: 0.78rem;
  font-weight: 500;
  color: var(--txt-mu);
  cursor: pointer;
  transition: all 0.15s;
}
.btn-review:hover {
  border-color: var(--primary);
  color: var(--primary);
  background: #f1faf6;
}

/* ── Empty State ── */
.empty-state {
  padding: 48px;
  text-align: center;
  color: var(--txt-lt);
}
.empty-state i { font-size: 2rem; margin-bottom: 10px; display: block; }
.empty-state p { font-size: 0.88rem; margin: 0; }

/* ── Modal ── */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  backdrop-filter: blur(2px);
}

.modal-box {
  background: var(--surf);
  border-radius: 14px;
  width: 100%;
  max-width: 460px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.15);
  overflow: hidden;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid var(--bdr);
}
.modal-title {
  font-size: 0.92rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--txt);
}
.modal-title i { color: var(--primary); }

.modal-close {
  background: none;
  border: none;
  color: var(--txt-mu);
  font-size: 0.9rem;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 6px;
}
.modal-close:hover { background: var(--bg); color: var(--txt); }

.modal-body { padding: 20px; }

.modal-student {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}
.modal-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--bdr);
}
.modal-student-name { font-size: 0.95rem; font-weight: 700; }
.modal-student-id   { font-size: 0.78rem; color: var(--txt-lt); }
.ms-auto { margin-left: auto; }

.modal-meta {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  background: var(--bg);
  border-radius: 10px;
  padding: 14px;
}
.meta-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.meta-label {
  font-size: 0.70rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  color: var(--txt-lt);
}
.meta-val {
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--txt);
}
.meta-val.score { color: var(--primary); }

.modal-footer {
  padding: 14px 20px;
  border-top: 1px solid var(--bdr);
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

.btn-cancel {
  padding: 8px 16px;
  border-radius: 8px;
  border: 1.5px solid var(--bdr);
  background: transparent;
  font-size: 0.84rem;
  font-weight: 500;
  color: var(--txt-mu);
  cursor: pointer;
}
.btn-cancel:hover { background: var(--bg); }

.btn-grade {
  padding: 8px 18px;
  border-radius: 8px;
  border: none;
  background: var(--primary);
  color: #fff;
  font-size: 0.84rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: background 0.15s;
}
.btn-grade:hover { background: var(--primary-d); }

/* ── Responsive ── */
@media (max-width: 768px) {
  .rg-header { display: none; }
  .rg-row {
    grid-template-columns: 1fr;
    gap: 8px;
    padding: 14px 16px;
  }
  .text-right { text-align: left; }
  .modal-meta { grid-template-columns: 1fr 1fr; }
}
</style>