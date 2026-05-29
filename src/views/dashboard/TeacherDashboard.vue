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
        <div class="custom-card">
          <h5 class="section-title mb-3">Assessment Rooms</h5>
          <div class="room-list">
            <div class="room-item d-flex justify-content-between align-items-center" v-for="room in rooms" :key="room.name">
              <div>
                <p class="mb-0 text-dark room-name" style="font-size: 0.9rem;">{{ room.name }}</p>
                <small class="text-muted" style="font-size: 0.78rem; font-weight: 600;">{{ room.count }} Students Joined</small>
              </div>
              <router-link to="/teacher/room-management" class="text-success text-decoration-none small" style="font-size: 0.85rem; font-weight: 700;">Manage</router-link>
            </div>
          </div>
          <button class="btn border-dashed mt-2 py-3" style="font-size: 0.95rem;">
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

    <div class="modal-overlay" v-if="showModal" @click.self="closeModal">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-0 rounded-4 overflow-hidden shadow-lg" style="background: rgba(255, 255, 255, 0.98); backdrop-filter: blur(10px);">
          <div class="modal-header border-0 p-4 pb-1">
            <div>
              <h5 class="modal-title text-dark mb-1" style="font-weight: 700;">បង្កើតបន្ទប់ថ្មី</h5>
              <p class="text-muted small mb-0" style="font-size: 0.78rem; font-weight: 600;">Create a new space for your class assessments.</p>
            </div>
            <button type="button" class="btn-close shadow-none" @click="closeModal" aria-label="Close" style="font-size: 0.9rem;"></button>
          </div>

          <div class="modal-body p-4">
            <div class="mb-3">
              <label class="form-label small text-dark opacity-75" style="font-size: 0.78rem; font-weight: 600;">ឈ្មោះបន្ទប់ (ROOM NAME)</label>
              <div class="input-group border-2 rounded-3 overflow-hidden" style="border: 1px solid var(--border); background: #f8fafc;">
                <span class="input-group-text bg-transparent border-0 pe-0">
                  <i class="fas fa-door-open text-muted small"></i>
                </span>
                <input type="text" v-model="newRoomName" class="form-control border-0 bg-transparent py-3 shadow-none" style="font-size: 0.95rem; font-weight: 600;" placeholder="e.g. Grade 12-A / Mobile App Dev">
              </div>
            </div>

            <div class="mb-2 position-relative">
              <label class="form-label small text-dark opacity-75" style="font-size: 0.78rem; font-weight: 600;">អញ្ជើញសិស្ស (INVITE STUDENTS)</label>
              <div class="p-2 rounded-3 border-2 transition-all" style="background: #f8fafc; border: 1px solid var(--border); min-height: 100px;">
                <div id="chip-container" class="d-flex flex-wrap gap-1 mb-2">
                  <div v-for="(member, idx) in selectedMembers" :key="member" class="badge bg-success d-flex align-items-center gap-2 py-2 px-3 rounded-2" style="background-color: var(--emerald) !important; font-size: 0.78rem; font-weight: 600;">
                    {{ member }} 
                    <i class="fas fa-times cursor-pointer" @click="removeMember(idx)" style="cursor:pointer; font-size: 0.7rem;"></i>
                  </div>
                </div>
                
                <div class="d-flex align-items-center">
                  <i class="fas fa-search text-muted mx-2 small" style="font-size: 0.85rem;"></i>
                  <input type="text" v-model="studentSearchQuery" @keydown="handleSearchKeypress" class="form-control border-0 bg-transparent shadow-none p-1" style="font-size: 0.88rem; font-weight: 600;" placeholder="Search name or email...">
                </div>
              </div>

              <div v-if="filteredStudents.length" class="list-group shadow-sm mt-1 border-0 rounded-3 overflow-auto" style="z-index: 1050; display: block; max-height: 150px; position: absolute; width: 100%; background: white; border: 1px solid var(--border) !important;">
                <button type="button" v-for="student in filteredStudents" :key="student.email" class="list-group-item list-group-item-action border-0 py-2 px-3 text-start" style="font-size: 0.88rem;" @click="addMember(student.name)">
                  <div class="text-dark" style="font-weight: 600;">{{ student.name }}</div>
                  <div class="text-muted small" style="font-size: 0.78rem; font-weight: 600;">{{ student.email }}</div>
                </button>
              </div>
            </div>
            <p class="text-muted" style="font-size: 0.68rem; font-weight: 600;"><i class="fas fa-info-circle me-1"></i> Students must be registered by the admin to appear in search results.</p>
          </div>

          <div class="modal-footer border-0 p-4 pt-0">
            <button class="btn btn-emerald w-100 py-3 rounded-3 shadow-sm" style="font-size: 0.95rem;" @click="saveRoom">
              <i class="fas fa-check-circle me-2"></i> បង្កើត និងអញ្ជើញសិស្ស
            </button>
            <button class="btn btn-link w-100 text-muted text-decoration-none small text-center mt-1" style="font-size: 0.85rem; font-weight: 600;" @click="closeModal">បោះបង់</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

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

const rooms = ref([
  { name: 'Grade 12-A', count: 32 },
  { name: 'Grade 11-B', count: 28 },
  { name: 'Grade 11-C', count: 23 }
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

const showModal = ref(false)
const newRoomName = ref('')
const studentSearchQuery = ref('')
const selectedMembers = ref([])

const mockStudents = [
  { name: 'Sok Vibol', email: 'sok.vibol@school.edu' },
  { name: 'Chan Rithy', email: 'chan.rithy@school.edu' },
  { name: 'Mao Sophea', email: 'mao.sophea@school.edu' },
  { name: 'Keo Pich', email: 'keo.pich@school.edu' },
  { name: 'Nguon Setha', email: 'nguon.setha@school.edu' },
  { name: 'Heng Dara', email: 'heng.dara@school.edu' },
  { name: 'Lim Sokha', email: 'lim.sokha@school.edu' },
  { name: 'Chey Oudom', email: 'chey.oudom@school.edu' }
]

const openRoomModal = () => {
  newRoomName.value = ''
  studentSearchQuery.value = ''
  selectedMembers.value = []
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}

const filteredStudents = computed(() => {
  const query = studentSearchQuery.value.trim().toLowerCase()
  if (!query) return []
  return mockStudents.filter(student => 
    (student.name.toLowerCase().includes(query) || student.email.toLowerCase().includes(query)) &&
    !selectedMembers.value.includes(student.name)
  )
})
 
const addMember = (name) => {
  if (!selectedMembers.value.includes(name)) {
    selectedMembers.value.push(name)
  }
  studentSearchQuery.value = ''
}

const removeMember = (index) => {
  selectedMembers.value.splice(index, 1)
}

const handleSearchKeypress = (e) => {
  if (e.key === 'Enter') {
    e.preventDefault()
    const name = studentSearchQuery.value.trim()
    if (name) {
      addMember(name)
    }
  }
}

const saveRoom = () => {
  const roomName = newRoomName.value.trim()
  if (!roomName) {
    alert('Please enter a Room Name!')
    return
  }

  rooms.value.push({
    name: roomName,
    count: selectedMembers.value.length
  })

  alert(`បន្ទប់ "${roomName}" ត្រូវបានបង្កើតឡើងដោយជោគជ័យ ជាមួយសិស្សចំនួន ${selectedMembers.value.length} នាក់!`)
  closeModal()
}

defineExpose({
  openRoomModal
})
</script>

<style scoped>
.teacher-dashboard {
  --emerald: #10b981;
  --emerald-soft: #ecfdf5;
  --text-dark: #1e293b; 
  --text-muted: #475569; /* ប្តូរពណ៌ឲ្យងងឹតជាងមុនដើម្បីងាយស្រួលមើល */
  --border: #cbd5e1; /* ធ្វើឲ្យបន្ទាត់ border ច្បាស់ជាងមុន */
  --sh-sm: 0 4px 12px rgba(0,0,0,0.03);
  font-family: 'Kantumruy Pro', 'Inter', sans-serif !important;
}

/* កំណត់អក្សរទូទៅឲ្យមានកម្រាស់ដិតច្បាស់ល្មម (Font weight 550) */
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