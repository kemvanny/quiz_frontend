<template>
  <div class="teacher-dashboard">
    <div class="row g-4">
      <div class="col-12 col-lg-8">
        <div class="row g-3 mb-4">
          <div class="col-12 col-md-4" v-for="stat in stats" :key="stat.title">
            <div class="stat-card d-flex flex-column align-items-center text-center justify-content-center gap-2" 
                 @mouseover="stat.hover = true" 
                 @mouseleave="stat.hover = false"
                 :style="stat.hover ? { transform: 'translateY(-2px)', borderColor: 'var(--emerald)' } : {}">
              <div class="d-flex align-items-center justify-content-center icon-box" :style="{ background: stat.bg, color: stat.color }">
                <i :class="stat.icon"></i>
              </div>
              <div>
                <div class="stat-title">{{ stat.title }}</div>
                <div class="d-flex align-items-baseline justify-content-center gap-2 mt-1">
                  <div class="stat-value">{{ stat.value }}</div>
                  <span :class="stat.trendClass" class="small trend-text" style="font-size: 0.78rem;">
                    <i :class="stat.trendIcon" v-if="stat.trendIcon"></i> {{ stat.trendText }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="custom-card">
          <h5 class="section-title mb-3">សកម្មភាពរហ័ស (Quick Actions)</h5>
          <div class="d-flex flex-wrap gap-3">
            <button class="btn-emerald" @click="goToCreateExam">
              <i class="fas fa-plus me-2"></i> Create Quiz
            </button>
            <button class="btn-emerald-outline" @click="goToAssignment">
              <i class="fas fa-file-upload me-2"></i> Create Assignment
            </button>
            <button class="btn-emerald-outline" @click="goToFinalExam">
              <i class="fas fa-graduation-cap me-2"></i> Create Final Exam
            </button>
          </div>
        </div>

        <div class="custom-card">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h5 class="section-title mb-0">ទិដ្ឋភាពទូទៅនៃលទ្ធផលថ្នាក់រៀន (Class Performance Overview)</h5>
            <select class="form-select form-select-sm w-auto border border-secondary shadow-sm rounded-pill px-3" style="font-size: 0.85rem; background-color: white; font-weight: 600;">
              <option>៧ ថ្ងៃចុងក្រោយ</option>
              <option>ខែនេះ</option>
            </select>
          </div>
          <div class="row align-items-center">
            <div class="col-md-4 text-center border-end py-3">
              <h2 class="fw-bold text-dark mb-0" style="font-size: 2.5rem; color: #1e293b !important;">៨២%</h2>
              <p class="text-dark small mb-1" style="font-size: 0.85rem; font-weight: 600;">Average Class Score</p>
              <span class="badge bg-success bg-opacity-10 text-success rounded-pill px-3 py-1.5" style="font-size: 0.75rem; font-weight: 700;"><i class="fas fa-arrow-up me-1"></i> 4% vs last week</span>
            </div>
            <div class="col-md-8 px-4">
              <div class="bar-chart-container">
                <div class="bar-wrapper" v-for="day in performanceData" :key="day.label">
                  <div class="bar" style="height: 100px;">
                    <div class="bar-fill" :style="{ height: day.fill }"></div>
                  </div>
                  <span class="bar-label">{{ day.label }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="custom-card">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h5 class="section-title mb-0">ការដាក់ស្នើថ្មីៗ (Recent Submissions)</h5>
            <router-link to="/teacher/student-results" class="text-success small text-decoration-none" style="font-size: 0.88rem; font-weight: 700;">មើលទាំងអស់</router-link>
          </div>
          
          <div class="submission-list">
            <div class="submission-item" v-for="sub in submissions" :key="sub.id">
              <div class="d-flex align-items-center gap-3">
                <img :src="sub.avatar" class="avatar-sm" alt="avatar">
                <div>
                  <h6 class="mb-0 text-dark student-name" style="font-size: 0.95rem;">{{ sub.student }}</h6>
                  <small class="text-muted text-details" style="font-size: 0.78rem;">{{ sub.type }} : {{ sub.title }} • {{ sub.time }}</small>
                </div>
              </div>
              <div class="score-badge" :class="sub.score >= 80 ? 'score-high' : 'score-mid'">{{ sub.score }} / 100</div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-12 col-lg-4">
        <div class="custom-card d-flex flex-column" style="min-height: 380px;">
          <h5 class="section-title mb-3">Assessment Rooms</h5>
          
          <div v-if="loadingRooms" class="text-center py-4 flex-grow-1 d-flex align-items-center justify-content-center">
            <div class="spinner-border text-success spinner-border-sm" role="status"></div>
          </div>

          <div v-else-if="backendRooms.length === 0" class="text-center py-4 flex-grow-1 d-flex align-items-center justify-content-center text-muted small">
            មិនទាន់មានបន្ទប់សិក្សានៅឡើយទេ។
          </div>

          <div v-else class="room-list flex-grow-1">
            <div class="room-item d-flex justify-content-between align-items-center" v-for="room in backendRooms.slice(0, 3)" :key="room.id">
              <div>
                <p class="mb-0 text-dark room-name" style="font-size: 0.9rem;">{{ room.name || room.room_name }}</p>
                <small class="text-muted" style="font-size: 0.78rem; font-weight: 600;">{{ room.student_count || room.count || 0 }} Students Joined</small>
              </div>
              <router-link to="/teacher/room-management" class="text-success text-decoration-none small" style="font-size: 0.85rem; font-weight: 700;">Manage</router-link>
            </div>
          </div>

          <router-link 
            to="/teacher/room-management" 
            class="text-center small text-decoration-none fw-bold text-success py-2 border-top border-light-subtle d-block style-all-rooms-link" 
            style="font-size: 0.85rem;"
          >
            មើលបន្ទប់ទាំងអស់ (See All Rooms) <i class="fas fa-arrow-right ms-1" style="font-size: 0.75rem;"></i>
          </router-link>

          <button class="btn border-dashed mt-3 py-3" style="font-size: 0.95rem;" @click="isCreateRoomOpen = true">
            <i class="fas fa-plus me-2"></i> បង្កើតបន្ទប់ថ្មី
          </button>
        </div>

        <div class="custom-card">
          <h5 class="section-title mb-3">Expiring Soon</h5>
          <div class="d-flex align-items-center gap-2 mb-3" v-for="(item, idx) in expiringItems" :key="idx">
            <div class="rounded-circle" :class="item.bgClass" style="width:8px; height:8px; flex-shrink: 0;"></div>
            <div>
              <p class="mb-0 text-dark room-name" style="font-size: 0.9rem;">{{ item.title }}</p>
              <small :class="item.textClass" style="font-size: 0.78rem; font-weight: 700;">{{ item.timeText }}</small>
            </div>
          </div>
        </div>

        <div class="custom-card text-center p-4" style="background: var(--emerald-soft);">
          <h6 class="text-success mb-2" style="font-size: 1rem; font-weight: 700;">Secure Mode Active</h6>
          <p class="text-muted small mb-4" style="font-size: 0.78rem; line-height: 1.4; font-weight: 600;">Tab-switching and screenshot protections are enabled system-wide.</p>
          <router-link to="/teacher/teacher-validations" class="btn btn-white w-100 border border-2 rounded-4 py-2.5 small bg-white text-success text-decoration-none d-block" style="font-size: 0.88rem; font-weight: 700;">Security Settings</router-link>
        </div>
      </div>
    </div>
  </div>

  <CreateRoomModal 
    :is-open="isCreateRoomOpen" 
    @close="isCreateRoomOpen = false" 
    @created="onRoomCreated" 
  />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getMyRooms } from '@/api/teacher.api';

const isCreateRoomOpen = ref(false);
const backendRooms = ref([]);
const loadingRooms = ref(false);

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

// ហៅដំណើរការទាញយកទិន្នន័យភ្លាមៗពេល Component ត្រូវបានបើកដំណើរការ
onMounted(() => {
  fetchBackendRooms();
});

const onRoomCreated = async () => {
    isCreateRoomOpen.value = false;
    // ទាញយកទិន្នន័យបន្ទប់រៀនឡើងវិញភ្លាមៗក្រោយពេលគ្រូបង្កើតបន្ទប់ថ្មីជោគជ័យ
    await fetchBackendRooms(); 
};

const router = useRouter()

const goToCreateExam = () => router.push({ name: 'CreateExam' })
const goToAssignment = () => router.push({ name: 'Assignment' })
const goToFinalExam = () => router.push({ name: 'FinalExam' })

const stats = ref([
  {
    title: 'សិស្សសរុប',
    value: '1,284',
    icon: 'fas fa-users',
    bg: '#ecfdf5',
    color: '#10b981',
    trendClass: 'text-success',
    trendIcon: 'fas fa-arrow-up',
    trendText: '12%',
    hover: false
  },
  {
    title: 'បន្ទប់សរុប',
    value: '8',
    icon: 'fas fa-door-open',
    bg: '#f3e8ff',
    color: '#9333ea',
    trendClass: 'text-muted',
    trendIcon: '',
    trendText: 'Current term',
    hover: false
  },
  {
    title: 'អត្រាបញ្ចប់',
    value: '94%',
    icon: 'fas fa-tasks',
    bg: '#fff7ed',
    color: '#f59e0b',
    trendClass: 'text-success',
    trendIcon: 'fas fa-check',
    trendText: 'On track',
    hover: false
  }
])

const performanceData = ref([
  { label: 'Mon', fill: '60%' },
  { label: 'Tue', fill: '45%' },
  { label: 'Wed', fill: '80%' },
  { label: 'Thu', fill: '65%' },
  { label: 'Fri', fill: '90%' },
  { label: 'Sat', fill: '75%' }
])

const submissions = ref([
  {
    id: 1,
    student: 'Sok Vibol',
    type: 'Quiz',
    title: 'Java Basics',
    time: '5 mins ago',
    score: 95,
    avatar: 'https://ui-avatars.com/api/?name=Sok+Vibol&background=random'
  },
  {
    id: 2,
    student: 'Chan Rithy',
    type: 'Assignment',
    title: 'Web Layouts',
    time: '12 mins ago',
    score: 88,
    avatar: 'https://ui-avatars.com/api/?name=Chan+Rithy&background=random'
  },
  {
    id: 3,
    student: 'Mao Sophea',
    type: 'Quiz',
    title: 'HTML Tags',
    time: '1 hr ago',
    score: 72,
    avatar: 'https://ui-avatars.com/api/?name=Mao+Sophea&background=random'
  }
])

const expiringItems = ref([
  {
    title: 'Midterm - PHP',
    timeText: 'Expires in 2 hours',
    bgClass: 'bg-warning',
    textClass: 'text-muted'
  },
  {
    title: 'Quiz: SQL Join',
    timeText: 'Expiring now',
    bgClass: 'bg-danger',
    textClass: 'text-danger'
  }
])
</script>

<style scoped>
.teacher-dashboard {
  --emerald: #10b981;
  --emerald-soft: #ecfdf5;
  --text-dark: #1e293b; 
  --text-muted: #475569; 
  --border: #cbd5e1; 
  --sh-sm: 0 4px 12px rgba(0,0,0,0.03);
  font-family: 'Kantumruy Pro', 'Inter', sans-serif !important;
}

.teacher-dashboard,
.teacher-dashboard div,
.teacher-dashboard p,
.teacher-dashboard span,
.teacher-dashboard small {
  font-family: 'Kantumruy Pro', 'Inter', sans-serif !important;
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

/* ពង្រីកទំហំប៊ូតុង និងអក្សរលើប៊ូតុង */
.btn-emerald { 
  background: var(--emerald); 
  color: white; 
  border: none; 
  border-radius: 12px; 
  padding: 12px 24px; 
  font-weight: 700 !important; 
  font-size: 0.92rem; 
  transition: 0.3s; 
}
.btn-emerald:hover {
  background: #059669;
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
  transition: .2s; 
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
  transition: .2s; 
}
.room-item:hover { 
  transform: translateY(-2px); 
  box-shadow: 0 4px 12px rgba(0,0,0,0.05); 
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
</style>