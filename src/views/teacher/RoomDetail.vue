<template>
  <div class="room-page">
    
    <div class="toolbar">
      <div class="filter-group">
        <button class="fp" :class="{ on: activeFilter === 'all' }" @click="activeFilter = 'all'">All</button>
        <button class="fp" :class="{ on: activeFilter === 'quiz' }" @click="activeFilter = 'quiz'">Quiz</button>
        <button class="fp" :class="{ on: activeFilter === 'assignment' }" @click="activeFilter = 'assignment'">Assignment</button>
        <button class="fp" :class="{ on: activeFilter === 'final exam' }" @click="activeFilter = 'final exam'">Final Exam</button>
      </div>
      <div class="sep"></div>
      <div class="select-wrapper">
        <select class="sort-select" v-model="statusFilter">
          <option value="all">ស្ថានភាពទាំងអស់</option>
          <option value="active">Active</option>
          <option value="draft">Draft</option>
        </select>
      </div>
    </div>

    <div v-if="loading" class="state-empty">
      <div class="spinner-border text-success spinner-border-sm" role="status"></div>
      <p class="mt-2 mb-0">កំពុងទាញយក...</p>
    </div>

    <div v-else-if="allExams.length === 0" class="state-empty">
  <i class="fas fa-folder-open empty-icon"></i>
  <p class="mb-0">មិនមានវិញ្ញាសា</p>
  </div>

    <div v-else class="exam-list">
      <div
        class="exam-row" v-for="exam in allExams" :key="exam.id" @click="viewExamDetails(exam.id)" 
      >
        <div class="row-icon" :class="exam.status === 'active' ? 'ic-active' : 'ic-draft'">
          <i class="fas fa-file-alt"></i>
        </div>

        <div class="row-main">
          <div class="row-title-container">
            <h3 class="row-title">{{ exam.title }}</h3>
            <span class="row-tag text-uppercase">{{ exam.type || 'quiz' }}</span>
          </div>
          <div class="row-sub">
            <span class="sub-item"><i class="far fa-clock"></i> {{ exam.duration }} នាទី</span>
            <div class="dot"></div>
            <span class="sub-item"><i class="far fa-user"></i> {{ exam.teacher_name || 'Hean Liza' }}</span>
            <div class="dot"></div>
            <span class="row-pts">
              <i class="fas fa-star text-warning me-1"></i>{{ exam.total_points !== undefined && exam.total_points !== null ? exam.total_points : 0 }} pts
            </span>
          </div>
        </div>

        <div class="row-meta-actions" @click.stop>
          <span class="ec-badge" :class="exam.status === 'active' ? 'b-active' : 'b-draft'">
            {{ exam.status }}
          </span>
          
          <div class="vertical-divider"></div>

          <div class="action-buttons">
            <button class="icon-btn btn-edit" @click.stop="handleUpdate(exam)" title="កែប្រែ">
              <i class="far fa-edit"></i>
            </button>
            <button class="icon-btn btn-del" @click.stop="handleDelete(exam)" title="លុប">
              <i class="far fa-trash-alt"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showUpdateModal" class="modal-backdrop-custom d-flex align-items-center justify-content-center" @click.self="showUpdateModal = false">
      <div class="modal-dialog-custom p-4 bg-white rounded-4 shadow-lg slide-in" style="width: 100%; max-width: 460px;">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h5 class="fw-bold text-dark m-0"><i class="far fa-edit text-success me-2"></i>កែប្រែព័ត៌មានវិញ្ញាសា</h5>
          <button class="btn-close shadow-none" style="font-size: 0.8rem;" @click="showUpdateModal = false"></button>
        </div>
        
        <form @submit.prevent="submitUpdateExam">
          <div class="mb-3 text-start">
            <label class="form-label small fw-bold text-muted">ចំណងជើងវិញ្ញាសា</label>
            <input type="text" v-model="editForm.title" class="form-control rounded-3 border-light-subtle shadow-sm small-input" required>
          </div>
          
          <div class="mb-3 text-start">
            <label class="form-label small fw-bold text-muted">រយៈពេលប្រឡង (នាទី)</label>
            <input type="number" v-model.number="editForm.duration" class="form-control rounded-3 border-light-subtle shadow-sm small-input" required min="1">
          </div>

          <div class="mb-4 text-start">
            <label class="form-label small fw-bold text-muted">ការពិពណ៌នា (Instructions)</label>
            <textarea v-model="editForm.description" class="form-control rounded-3 border-light-subtle shadow-sm small-input" rows="3"></textarea>
          </div>

          <div class="d-flex gap-2 justify-content-end border-top pt-3">
            <button type="button" class="btn btn-light rounded-3 px-4 fw-bold text-muted small" @click="showUpdateModal = false" :disabled="isProcessing">បោះបង់</button>
            <button type="submit" class="btn btn-emerald rounded-3 px-4 fw-bold small d-flex align-items-center gap-2" :disabled="isProcessing">
              <span v-if="isProcessing" class="spinner-border spinner-border-sm" role="status"></span>
              {{ isProcessing ? 'កំពុងរក្សាទុក...' : 'រក្សាទុកការកែប្រែ' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <div v-if="showDeleteModal" class="modal-backdrop-custom d-flex align-items-center justify-content-center" @click.self="showDeleteModal = false">
      <div class="modal-dialog-custom p-4 bg-white rounded-4 shadow-lg text-center slide-in" style="max-width: 420px;">
        <div class="delete-icon-wrapper mb-3 mx-auto d-flex align-items-center justify-content-center rounded-circle bg-danger bg-opacity-10 text-danger" style="width: 54px; height: 54px;">
          <i class="fas fa-exclamation-triangle fa-lg"></i>
        </div>
        <h5 class="fw-bold text-dark mb-2">តើអ្នកពិតជាចង់លុបវិញ្ញាសានេះមែនទេ?</h5>
        <p class="text-muted small mb-4">ទិន្នន័យសំណួរ និងចម្លើយទាំងអស់នៅក្នុងវិញ្ញាសា <strong>"{{ examToDelete?.title }}"</strong> នឹងត្រូវបាត់បង់ទាំងស្រុងពីប្រព័ន្ធ។</p>
        <div class="d-flex gap-2 justify-content-center">
          <button class="btn btn-light rounded-3 px-4 fw-bold text-muted small" @click="showDeleteModal = false" :disabled="isProcessing">បោះបង់</button>
          <button class="btn btn-danger rounded-3 px-4 fw-bold small d-flex align-items-center gap-2" @click="confirmDeleteExam" :disabled="isProcessing">
            <span v-if="isProcessing" class="spinner-border spinner-border-sm" role="status"></span>
            {{ isProcessing ? 'កំពុងលុប...' : 'យល់ព្រមលុប' }}
          </button>
        </div>
      </div> 
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { useAuthStore } from '@/stores/auth'
import { getExams, updateExam, deleteExam, getExamsInRoom } from '@/api/exam.api'
import { getOneRoom } from '@/api/teacher.api'

const route = useRoute()
const router = useRouter()
const toast = useToast()
const authStore = useAuthStore()

const roomId = route.params.roomId
const allExams = ref([])

const roomName = ref('កំពុងទាញយក...') 
const loading = ref(false)
const isProcessing = ref(false)

const roomData = ref(null); 
const exams = ref([]);     

const activeFilter = ref('all')
const statusFilter = ref('all')
const sortBy = ref('date')

const showDeleteModal = ref(false)
const examToDelete = ref(null)

const showUpdateModal = ref(false)
const selectedExamId = ref(null)
const editForm = ref({
  title: '',
  duration: 60,
  description: ''
})

const assignedExams = computed(() => {
  return allExams.value.filter(exam => String(exam.room_id) === String(roomId))
})

const fetchRoomInformation = async () => {
  if (!props.roomId) return  
  try {
    const res = await getOneRoom(props.roomId)  
    roomName.value = res.data?.data?.name || res.data?.name || 'Unknown Room'
  } catch (err) {
    roomName.value = 'មិនអាចទាញយកឈ្មោះបន្ទប់បានទេ'
  }
}

  const props = defineProps({
    roomId: {
      type: [String, Number],
      required: true
    }
  })
const fetchRoomData = async () => {
  try {
    loading.value = true;
    const response = await getOneRoom(props.roomId);
    
    // បើសិនក្នុង response មាន list exams ស្រាប់
    roomData.value = response.data.data;
    
    // បង្ហាញ exams ក្នុង UI
    exams.value = roomData.value.exams || []; 
  } catch (error) {
    console.error("Error:", error);
  } finally {
    loading.value = false;
  }
};


const filteredExams = computed(() => {
  if (!allExams.value) return []
  return allExams.value.filter(exam => String(exam.room_id) === String(roomId))
})

const fetchExamsData = async () => {
  try {
    loading.value = true
    const res = await getExamsInRoom(route.params.roomId);
    
    // បន្ថែមការ Log នេះ
    console.log("URL ដែលហៅទៅ:", `/exams/teacher/rooms/${route.params.roomId}`);
    console.log("ទិន្នន័យដែលទទួលបាន:", res.data);

    allExams.value = res.data?.data || [];
  } catch (err) {
    console.error("កំហុស API:", err);
  } finally {
    loading.value = false
  }
}

const viewExamDetails = (examId) => router.push({ name: 'TeacherExamDetail', params: { examId } })

const handleUpdate = (exam) => {
  selectedExamId.value = exam.id
  editForm.value = {
    title: exam.title,
    duration: exam.duration,
    description: exam.description || '',
    type: exam.type || 'quiz',     
    status: exam.status || 'active'  
  }
  showUpdateModal.value = true
}

const submitUpdateExam = async () => {
  if (!selectedExamId.value) return
  try {
    isProcessing.value = true
    
    // រៀបចំកាលបរិច្ឆេទស្វ័យប្រវត្ត (YYYY-MM-DD H:mm) 
    const today = new Date()
    const year = today.getFullYear()
    const month = String(today.getMonth() + 1).padStart(2, '0')
    const day = String(today.getDate()).padStart(2, '0')
    const start_date_formatted = `${year}-${month}-${day} 00:00`
    
    const nextWeek = new Date()
    nextWeek.setDate(today.getDate() + 7)
    const endYear = nextWeek.getFullYear()
    const endMonth = String(nextWeek.getMonth() + 1).padStart(2, '0')
    const endDay = String(nextWeek.getDate()).padStart(2, '0')
    const end_date_formatted = `${endYear}-${endMonth}-${endDay} 23:59`

    //Payload 
    const fullUpdatePayload = {
      title: editForm.value.title.trim(),
      type: editForm.value.type,
      description: editForm.value.description ? editForm.value.description.trim() : 'គ្មានការពិពណ៌នា',
      duration: parseInt(editForm.value.duration) || 60,
      status: editForm.value.status,
      start_time: start_date_formatted,
      end_time: end_date_formatted
    }

    console.log("Payload ដែលរុញទៅ Update លើ Server:", fullUpdatePayload)

    // ហៅទៅកាន់ API (ទម្រង់ URL នឹងរត់ទៅកាន់ /api/exams/update/:id)
    await updateExam(selectedExamId.value, fullUpdatePayload)
    
    toast.success("ព័ត៌មានវិញ្ញាសាត្រូវបានកែប្រែដោយជោគជ័យ!")
    
    const examIndex = assignedExams.value.findIndex(e => e.id === selectedExamId.value)
    if (examIndex !== -1) {
      assignedExams.value[examIndex].title = editForm.value.title
      assignedExams.value[examIndex].duration = editForm.value.duration
      assignedExams.value[examIndex].description = editForm.value.description
    }

    showUpdateModal.value = false
  } catch (err) {
    console.error("Failed to update exam layout:", err)
    toast.error("ការរក្សាទុកការកែប្រែបានបរាជ័យ! សូមពិនិត្យមើល Console។")
  } finally {
    isProcessing.value = false
  }
}

const handleDelete = (exam) => {
  examToDelete.value = exam
  showDeleteModal.value = true
}

const confirmDeleteExam = async () => {
  if (!examToDelete.value) return
  try {
    isProcessing.value = true
    const targetId = examToDelete.value.id
    
    await deleteExam(targetId)
    
    toast.success("បានលុបវិញ្ញាសាចេញពីប្រព័ន្ធដោយជោគជ័យ!")
    assignedExams.value = assignedExams.value.filter(e => e.id !== targetId)
    showDeleteModal.value = false
  } catch (err) {
    console.error("Failed to delete exam:", err)
    toast.error("ការលុបវិញ្ញាសាបានបរាជ័យ!")
  } finally {
    isProcessing.value = false
    examToDelete.value = null
  }
}




onMounted(() => {
  authStore.fetchUserProfile()
  fetchRoomInformation()
  fetchExamsData()
})
</script>

<style scoped>
.room-page {
  padding: 4px 24px 24px 24px;
  width: 100%;
  box-sizing: border-box;
}

/* Toolbar Controls Layout */
.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin: 0px 0 20px;
  flex-wrap: wrap;
}
.filter-group {
  display: flex;
  gap: 4px;
  background: #f1f5f9;
  padding: 4px;
  border-radius: 12px;
}
.fp {
  font-size: 13px;
  font-weight: 600;
  padding: 6px 16px;
  border-radius: 9px;
  border: none;
  background: transparent;
  color: #64748b;
  cursor: pointer;
  transition: all 0.2s ease;
}
.fp:hover {
  color: #1e293b;
}
.fp.on {
  background: #fff;
  color: #10b981;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
}
.sep {
  flex-grow: 1;
}
.sort-select {
  font-size: 12px;
  font-weight: 600;
  padding: 7px 32px 7px 14px;
  border-radius: 10px;
  border: 1px solid #e2e8f0;
  background: #fff;
  color: #475569;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' fill='none'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%2364748b' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  transition: border-color 0.15s;
}
.sort-select:focus {
  outline: none;
  border-color: #cbd5e1;
}

/* Minimalist Exam Row List Design */
.exam-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.exam-row {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 20px;
  background: #fff;
  border-radius: 16px;
  border: 1px solid var(--bdr, #e2e8f0);
  cursor: pointer;
  transition: all 0.25s ease;
}
.exam-row:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(16, 185, 129, 0.05);
  border-color: #10b981;
}

/* Icon Containers */
.row-icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 16px;
}
.ic-active { 
  background: rgba(16, 185, 129, 0.06); 
  color: #10b981;
}
.ic-draft  { 
  background: #f8fafc; 
  color: #94a3b8; 
  border: 1px dashed #cbd5e1;
}

/* Text Elements */
.row-main {
  flex: 1;
  min-width: 0;
}
.row-title-container {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}
.row-title {
  font-size: 15px;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.row-tag {
  font-size: 10px;
  color: #10b981;
  font-weight: 700;
  background: rgba(16, 185, 129, 0.08);
  padding: 1px 8px;
  border-radius: 6px;
  letter-spacing: 0.5px;
}
.row-sub {
  font-size: 12px;
  color: #94a3b8;
  margin-top: 6px;
  display: flex;
  align-items: center;
  gap: 10px;
}
.sub-item i {
  margin-right: 4px;
  color: #cbd5e1;
}
.dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #cbd5e1;
  flex-shrink: 0;
}
.row-pts {
  font-size: 12px;
  font-weight: 700;
  color: #475569;
  display: inline-flex;
  align-items: center;
}

/* Action Groups Layout */
.row-meta-actions {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-shrink: 0;
}
.ec-badge {
  font-size: 11px;
  font-weight: 700;
  padding: 4px 12px;
  border-radius: 20px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.b-active { background: rgba(16, 185, 129, 0.1); color: #047857; }
.b-draft  { background: #f1f5f9; color: #64748b; }

.vertical-divider {
  width: 1px;
  height: 24px;
  background: #e2e8f0;
}
.action-buttons {
  display: flex;
  align-items: center;
  gap: 6px;
}
.icon-btn {
  width: 34px;
  height: 34px;
  border-radius: 10px;
  border: 1px solid #e2e8f0;
  background: #fff;
  color: #64748b;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  transition: all 0.2s ease;
}
.icon-btn:hover {
  background: #f8fafc;
  color: #1e293b;
}
.btn-edit:hover {
  color: #3b82f6;
  background: #eff6ff;
  border-color: #bfdbfe;
}
.btn-del:hover {
  background: #fef2f2;
  color: #ef4444;
  border-color: #fee2e2;
}

.state-empty {
  text-align: center;
  padding: 60px 20px;
  color: #94a3b8;
  font-size: 14px;
  background: #fff;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
}
.empty-icon {
  font-size: 36px;
  color: #cbd5e1;
  margin-bottom: 12px;
  display: block;
}

/* MODAL OVERLAY STYLES */
.modal-backdrop-custom {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(15, 23, 42, 0.3);
  backdrop-filter: blur(4px);
  z-index: 1050;
}
.modal-dialog-custom {
  border: 1px solid rgba(255, 255, 255, 0.7);
}
.small-input {
  font-size: 0.88rem;
  padding: 10px 14px;
  border-color: #e2e8f0 !important;
}
.small-input:focus {
  border-color: #10b981 !important;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1) !important;
}
.btn-emerald {
  background: #10b981;
  color: white;
  border: none;
}
.btn-emerald:hover {
  background: #059669;
}
.slide-in {
  animation: modalSlide 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
@keyframes modalSlide {
  from { opacity: 0; transform: scale(0.96) translateY(8px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}
</style>