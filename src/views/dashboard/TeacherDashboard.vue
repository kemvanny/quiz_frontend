<template>
  <div class="teacher-dashboard">
    <!-- Header/Greeting --> 
    <div class="row g-4">
      <!-- Left Column -->
      <div class="col-12 col-lg-8">
        <!-- Stats Row -->
        <div class="row g-3 mb-4">
          <div class="col-12 col-md-4" v-for="stat in stats" :key="stat.title">
            <div class="stat-card d-flex align-items-center gap-3" 
                 @mouseover="stat.hover = true" 
                 @mouseleave="stat.hover = false"
                 :style="stat.hover ? { transform: 'translateY(-2px)', borderColor: 'var(--emerald)' } : {}">
              <div class="d-flex align-items-center justify-content-center icon-box" :style="{ background: stat.bg, color: stat.color }">
                <i :class="stat.icon"></i>
              </div>
              <div>
                <div class="stat-title">{{ stat.title }}</div>
                <div class="d-flex align-items-baseline gap-2">
                  <div class="fw-bold stat-value">{{ stat.value }}</div>
                  <span :class="stat.trendClass" class="small fw-bold" style="font-size: 0.75rem;">
                    <i :class="stat.trendIcon" v-if="stat.trendIcon"></i> {{ stat.trendText }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Action -->
        <div class="custom-card">
          <h5 class="fw-bold mb-4 text-dark">សកម្មភាពរហ័ស (Quick Actions)</h5>
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

        <!-- Performance Analytics -->
        <div class="custom-card">
          <div class="d-flex justify-content-between align-items-center mb-4">
            <h5 class="fw-bold mb-0 text-dark">ទិដ្ឋភាពទូទៅនៃលទ្ធផលថ្នាក់រៀន (Class Performance Overview)</h5>
            <select class="form-select form-select-sm w-auto border-0 shadow-sm rounded-pill px-3" style="font-size: 0.8rem; background-color: white;">
              <option>៧ ថ្ងៃចុងក្រោយ</option>
              <option>ខែនេះ</option>
            </select>
          </div>
          <div class="row align-items-center">
            <div class="col-md-4 text-center border-end py-3">
              <h2 class="display-4 fw-bold text-dark mb-0">៨២%</h2>
              <p class="text-muted small fw-medium mb-1">Average Class Score</p>
              <span class="badge bg-success bg-opacity-10 text-success rounded-pill px-2 py-1"><i class="fas fa-arrow-up me-1"></i> 4% vs last week</span>
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

        <!-- Recent Submissions -->
        <div class="custom-card">
          <div class="d-flex justify-content-between align-items-center mb-4">
            <h5 class="fw-bold mb-0 text-dark">ការដាក់ស្នើថ្មីៗ (Recent Submissions)</h5>
            <router-link to="/teacher/student-results" class="text-success small fw-bold text-decoration-none">មើលទាំងអស់</router-link>
          </div>
          
          <div class="submission-list">
            <div class="submission-item" v-for="sub in submissions" :key="sub.id">
              <div class="d-flex align-items-center gap-3">
                <img :src="sub.avatar" class="avatar-sm" alt="avatar">
                <div>
                  <h6 class="mb-0 fw-bold text-dark" style="font-size: 0.9rem;">{{ sub.student }}</h6>
                  <small class="text-muted" style="font-size: 0.75rem;">{{ sub.type }}: {{ sub.title }} • {{ sub.time }}</small>
                </div>
              </div>
              <div class="score-badge" :class="sub.score >= 80 ? 'score-high' : 'score-mid'">{{ sub.score }} / 100</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column -->
      <div class="col-12 col-lg-4">
        <!-- Assessment Rooms -->
        <div class="custom-card">
          <h5 class="fw-bold mb-4 text-dark">Assessment Rooms</h5>
          <div class="room-list">
            <div class="room-item d-flex justify-content-between align-items-center" v-for="room in rooms" :key="room.name">
              <div>
                <p class="mb-0 fw-bold small text-dark">{{ room.name }}</p>
                <small class="text-muted">{{ room.count }} Students Joined</small>
              </div>
              <router-link to="/teacher/room-management" class="text-success fw-bold text-decoration-none small">Manage</router-link>
            </div>
          </div>
          <button class="btn border-dashed mt-2" @click="openRoomModal">
            <i class="fas fa-plus me-2"></i> បង្កើតបន្ទប់ថ្មី
          </button>
        </div>

        <!-- Expiring Soon -->
        <div class="custom-card">
          <h5 class="fw-bold mb-4 text-dark">Expiring Soon</h5>
          <div class="d-flex align-items-center gap-2 mb-3" v-for="(item, idx) in expiringItems" :key="idx">
            <div class="rounded-circle" :class="item.bgClass" style="width:8px; height:8px; flex-shrink: 0;"></div>
            <div>
              <p class="mb-0 fw-bold small text-dark">{{ item.title }}</p>
              <small :class="item.textClass" class="fw-medium">{{ item.timeText }}</small>
            </div>
          </div>
        </div>

        <!-- Secure Mode Status -->
        <div class="custom-card text-center" style="background: var(--emerald-soft);">
          <h6 class="text-success fw-bold mb-2">Secure Mode Active</h6>
          <p class="text-muted small mb-4">Tab-switching and screenshot protections are enabled system-wide.</p>
          <router-link to="/teacher/teacher-validations" class="btn btn-white w-100 border border-2 rounded-4 py-2 small fw-bold bg-white text-success text-decoration-none d-block">Security Settings</router-link>
        </div>
      </div>
    </div>

    <!-- Enhanced Modal for Creating a New Room -->
    <div class="modal-overlay" v-if="showModal" @click.self="closeModal">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-0 rounded-5 overflow-hidden shadow-lg" style="background: rgba(255, 255, 255, 0.98); backdrop-filter: blur(10px);">
          <!-- Modal Header with Emerald Accent -->
          <div class="modal-header border-0 p-4 pb-2">
            <div>
              <h5 class="modal-title fw-bold text-dark mb-1">បង្កើតបន្ទប់ថ្មី</h5>
              <p class="text-muted small mb-0">Create a new space for your class assessments.</p>
            </div>
            <button type="button" class="btn-close shadow-none" @click="closeModal" aria-label="Close"></button>
          </div>

          <div class="modal-body p-4">
            <!-- Room Name Input Group -->
            <div class="mb-4">
              <label class="form-label fw-600 small text-dark opacity-75">ឈ្មោះបន្ទប់ (ROOM NAME)</label>
              <div class="input-group border-2 rounded-4 overflow-hidden" style="border: 1px solid var(--border); background: #f8fafc;">
                <span class="input-group-text bg-transparent border-0 pe-0">
                  <i class="fas fa-door-open text-muted small"></i>
                </span>
                <input type="text" v-model="newRoomName" class="form-control border-0 bg-transparent py-3 shadow-none" placeholder="e.g. Grade 12-A / Mobile App Dev">
              </div>
            </div>

            <!-- Student Invitation Group -->
            <div class="mb-2 position-relative">
              <label class="form-label fw-600 small text-dark opacity-75">អញ្ជើញសិស្ស (INVITE STUDENTS)</label>
              <div class="p-2 rounded-4 border-2 transition-all" style="background: #f8fafc; border: 1px solid var(--border); min-height: 100px;">
                <!-- Chips Container -->
                <div id="chip-container" class="d-flex flex-wrap gap-2 mb-2">
                  <div v-for="(member, idx) in selectedMembers" :key="member" class="badge bg-success d-flex align-items-center gap-2 py-2 px-3 rounded-3 fw-normal" style="background-color: var(--emerald) !important;">
                    {{ member }} 
                    <i class="fas fa-times cursor-pointer" @click="removeMember(idx)" style="cursor:pointer; font-size: 0.7rem;"></i>
                  </div>
                </div>
                
                <!-- Input field -->
                <div class="d-flex align-items-center">
                  <i class="fas fa-search text-muted mx-2 small"></i>
                  <input type="text" v-model="studentSearchQuery" @keydown="handleSearchKeypress" class="form-control border-0 bg-transparent shadow-none p-1" style="font-size: 0.9rem;" placeholder="Search name or email...">
                </div>
              </div>

              <!-- Smart Results Dropdown -->
              <div v-if="filteredStudents.length" class="list-group shadow-sm mt-1 border-0 rounded-3 overflow-auto" style="z-index: 1050; display: block; max-height: 180px; position: absolute; width: 100%; background: white; border: 1px solid var(--border) !important;">
                <button type="button" v-for="student in filteredStudents" :key="student.email" class="list-group-item list-group-item-action border-0 py-2 px-3 text-start" style="font-size: 0.85rem;" @click="addMember(student.name)">
                  <div class="fw-bold text-dark">{{ student.name }}</div>
                  <div class="text-muted small" style="font-size: 0.75rem;">{{ student.email }}</div>
                </button>
              </div>
            </div>
            <p class="text-muted" style="font-size: 0.65rem;"><i class="fas fa-info-circle me-1"></i> Students must be registered by the admin to appear in search results.</p>
          </div>

          <!-- Modal Footer -->
          <div class="modal-footer border-0 p-4 pt-0">
            <button class="btn btn-emerald w-100 py-3 rounded-4 fw-bold shadow-sm" @click="saveRoom">
              <i class="fas fa-check-circle me-2"></i> បង្កើត និងអញ្ជើញសិស្ស
            </button>
            <button class="btn btn-link w-100 text-muted text-decoration-none small text-center" @click="closeModal">បោះបង់</button>
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

// Quick Actions routes mapping
const goToCreateExam = () => router.push({ name: 'CreateExam' })
const goToAssignment = () => router.push({ name: 'Assignment' })
const goToFinalExam = () => router.push({ name: 'FinalExam' })

// Reactive statistics
const stats = ref([
  {
    title: 'សិស្សសរុប (Total Students)',
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
    title: 'បន្ទប់សរុប (Total Rooms)',
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
    title: 'អត្រាបញ្ចប់ (Completion Rate)',
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

// Performance graph data
const performanceData = ref([
  { label: 'Mon', fill: '60%' },
  { label: 'Tue', fill: '45%' },
  { label: 'Wed', fill: '80%' },
  { label: 'Thu', fill: '65%' },
  { label: 'Fri', fill: '90%' },
  { label: 'Sat', fill: '75%' }
])

// Recent submissions list
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

// Assessment Rooms list
const rooms = ref([
  { name: 'Grade 12-A', count: 32 },
  { name: 'Grade 11-B', count: 28 },
  { name: 'Grade 11-C', count: 23 }


])

// Expiring tasks
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

// Room Creation Modal state
const showModal = ref(false)
const newRoomName = ref('')
const studentSearchQuery = ref('')
const selectedMembers = ref([])

// Mock registered student database
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

// Modal functions
const openRoomModal = () => {
  newRoomName.value = ''
  studentSearchQuery.value = ''
  selectedMembers.value = []
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}

// Student search dropdown filter
const filteredStudents = computed(() => {
  const query = studentSearchQuery.value.trim().toLowerCase()
  if (!query) return []
  return mockStudents.filter(student => 
    (student.name.toLowerCase().includes(query) || student.email.toLowerCase().includes(query)) &&
    !selectedMembers.value.includes(student.name)
  )
})

// Add/Remove students in Modal
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

// Save room creation
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
  --text-muted: #64748b;
  --border: #e2e8f0;
  --sh-sm: 0 4px 12px rgba(0,0,0,0.03);
}

/* Custom Card Layouts */
.custom-card { 
  background: rgba(255, 255, 255, 0.7); 
  backdrop-filter: blur(10px); 
  border-radius: 24px; 
  border: 1px solid white; 
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.03); 
  padding: 25px; 
  margin-bottom: 25px; 
}

.stat-card { 
  background: white; 
  padding: 25px; 
  border-radius: 24px; 
  border: 1px solid var(--border); 
  height: 100%; 
  transition: all 0.2s ease-in-out;
}

.icon-box {
  width: 52px; 
  height: 52px; 
  font-size: 1.4rem; 
  border-radius: 14px; 
  flex-shrink: 0;
}

.stat-title {
  font-size: 0.75rem; 
  font-weight: 700; 
  color: var(--text-muted); 
  text-transform: uppercase; 
  letter-spacing: 0.5px;
}

.stat-value {
  font-size: 1.5rem; 
  color: var(--text-dark); 
  line-height: 1.2;
}

/* Buttons */
.btn-emerald { 
  background: var(--emerald); 
  color: white; 
  border: none; 
  border-radius: 14px; 
  padding: 12px 24px; 
  font-weight: 600; 
  transition: 0.3s; 
}
.btn-emerald:hover {
  background: #059669;
}

.btn-emerald-outline { 
  background: transparent; 
  color: var(--emerald); 
  border: 1.5px solid var(--emerald); 
  border-radius: 14px; 
  padding: 12px 24px; 
  font-weight: 600; 
  transition: 0.3s;
}
.btn-emerald-outline:hover {
  background: var(--emerald-soft);
}

.border-dashed { 
  border: 2px dashed var(--emerald) !important; 
  color: var(--emerald); 
  background: transparent; 
  border-radius: 18px; 
  width: 100%; 
  padding: 15px; 
  font-weight: 600; 
  transition: .2s; 
}
.border-dashed:hover { 
  background: var(--emerald-soft); 
}

/* Assessment Room Items */
.room-item { 
  background: white; 
  padding: 18px; 
  border-radius: 18px; 
  border: 1px solid var(--border); 
  margin-bottom: 12px; 
  transition: .2s; 
}
.room-item:hover { 
  transform: translateY(-2px); 
  box-shadow: 0 4px 12px rgba(0,0,0,0.05); 
  border-color: var(--emerald); 
}

/* Recent Submissions */
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
  width: 36px; 
  height: 36px; 
  border-radius: 50%; 
  object-fit: cover; 
  border: 1px solid var(--border); 
}

.score-badge { 
  padding: 4px 10px; 
  border-radius: 20px; 
  font-size: 0.75rem; 
  font-weight: 700; 
}
.score-high { 
  background: #dcfce7; 
  color: #166534; 
}
.score-mid { 
  background: #fef9c3; 
  color: #854d0e; 
}

/* Chart Styles */
.bar-chart-container { 
  display: flex; 
  align-items: flex-end; 
  gap: 12px; 
  height: 120px; 
  padding-top: 20px; 
}
.bar-wrapper { 
  flex: 1; 
  display: flex; 
  flex-direction: column; 
  align-items: center; 
  gap: 8px; 
}
.bar { 
  width: 100%; 
  background: var(--emerald-soft); 
  border-radius: 6px 6px 0 0; 
  position: relative; 
  overflow: hidden; 
}
.bar-fill { 
  position: absolute; 
  bottom: 0; 
  left: 0; 
  right: 0; 
  background: var(--emerald); 
  border-radius: 6px 6px 0 0; 
  transition: height 1s cubic-bezier(0.1, 0.76, 0.55, 0.94); 
}
.bar-label { 
  font-size: 0.7rem; 
  color: var(--text-muted); 
  font-weight: 600; 
}

/* Modal Overlay Styling for custom clean overlay rendering */
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
  padding: 20px;
}
.modal-dialog {
  width: 100%;
  max-width: 500px;
  margin: 0;
}
.cursor-pointer {
  cursor: pointer;
}
.fw-600 {
  font-weight: 600;
}
</style>