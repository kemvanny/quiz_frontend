<template>
  <div class="workspace-container">
    <div class="workspace-toolbar mb-4">
      <div class="search-wrapper position-relative">
        <i class="fas fa-search search-icon"></i>
        <input 
          v-model="searchQuery" 
          type="text" 
          class="form-control search-input" 
          placeholder="ស្វែងរកថ្នាក់រៀន..."
        />
      </div>
    </div>

    <div class="w-100 py-5 my-5 text-center" v-if="loading">
      <div class="spinner-custom"></div>
      <p class="text-muted small mt-3 fw-medium">កំពុងទាញទិន្នន័យ...</p>
    </div>

    <div v-else class="classroom-grid">
      <div 
        v-for="(room, index) in filteredRooms" 
        :key="room.id || index" 
        class="material-classroom-card"
        @click="goToRoomDetail(room.id)"
      >
        <div class="card-main-content">
          <div class="d-flex align-items-start justify-content-between gap-3">
            <div class="d-flex align-items-center gap-3">
              <div class="icon-avatar-box">
                <i class="fas fa-graduation-cap"></i>
              </div>
              <div class="title-overflow-block">
                <h3 class="classroom-title-text text-truncate" :title="room.name">
                  {{ room.name }}
                </h3>
                <span class="student-count-subtext">
                  <i class="fas fa-users me-1 text-muted"></i>
                  <strong>{{ room.studentCount || 0 }}</strong> សិស្សសរុប
                </span>
              </div>
            </div>
            
            <div class="normal-action-group d-flex align-items-center" @click.stop>
              <button class="std-btn btn-edit-normal" @click="openUpdateModal(room)" title="កែប្រែបន្ទប់">
                <i class="fas fa-pen"></i>
              </button>
              <button class="std-btn btn-delete-normal" @click="openDeleteModal(room)" title="លុបបន្ទប់">
                <i class="fas fa-trash-alt"></i>
              </button>
            </div>
          </div>
        </div>

        <div class="card-footer-tray d-flex align-items-center justify-content-between" @click.stop>
          <div class="status-indicator-tag">
            <span class="active-dot-pulse"></span>
            <span class="small-text">Active</span>
          </div>

          <button 
            class="btn btn-sm invite-student-btn d-flex align-items-center gap-1"
            @click.stop="handleInviteStudent(room)">
            <i class="fas fa-user-plus"></i> Invite
          </button>
        </div>

      </div>
    </div>

    <CreateRoomModal 
      :is-open="isCreateOpen" 
      @close="isCreateOpen = false" 
      @created="handleRoomCreatedSuccess" 
    />

    <UpdateRoomModal 
      :is-open="isUpdateOpen" 
      :room-data="selectedRoom" 
      @close="closeUpdateModal" 
      @updated="fetchRooms" 
    />

    <DeleteRoomModal 
      :is-open="isDeleteOpen" 
      :room-data="selectedRoom" 
      @close="closeDeleteModal" 
      @deleted="fetchRooms" 
    />

    <InviteStudentModal 
      :is-open="isInviteOpen" 
      :room-data="selectedRoom" 
      @close="isInviteOpen = false" 
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getMyRooms } from '@/api/teacher.api'

import CreateRoomModal from '@/components/teacher/CreateRoomModal.vue'
import UpdateRoomModal from '@/components/teacher/UpdateRoomModal.vue'
import DeleteRoomModal from '@/components/teacher/DeleteRoomModal.vue'
import InviteStudentModal from '@/components/teacher/InviteStudentModal.vue'

const router = useRouter()

const searchQuery = ref('')
const rooms = ref([])
const loading = ref(false)
const selectedRoom = ref(null)

const isCreateOpen = ref(false)
const isUpdateOpen = ref(false)
const isDeleteOpen = ref(false)
const isInviteOpen = ref(false)

const filteredRooms = computed(() => {
  if (!searchQuery.value) return rooms.value
  return rooms.value.filter(room => 
    room.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const goToRoomDetail = (roomId) => {
  router.push({
    name: 'RoomDetail',
    params: { roomId: roomId }
  })
}

const fetchRooms = async () => {
  try {
    loading.value = true
    const response = await getMyRooms()
    rooms.value = response.data?.data || response.data || []
  } catch (error) {
    console.error("Error fetching rooms:", error)
  } finally {
    loading.value = false
  }
}

const handleRoomCreatedSuccess = async (newRoom) => {
  await fetchRooms()
  selectedRoom.value = newRoom
  isInviteOpen.value = true
}

const openUpdateModal = (room) => {
  selectedRoom.value = room
  isUpdateOpen.value = true
}

const closeUpdateModal = () => {
  isUpdateOpen.value = false
  selectedRoom.value = null
}

const openDeleteModal = (room) => {
  selectedRoom.value = room
  isDeleteOpen.value = true
}

const closeDeleteModal = () => {
  isDeleteOpen.value = false
  selectedRoom.value = null
}

const handleInviteStudent = (room) => {
  selectedRoom.value = room
  isInviteOpen.value = true
}

onMounted(() => {
  fetchRooms()
})
</script>
<style scoped>

.workspace-container {
  padding: 1.5rem 0.5rem;
}

/* Modern Minimal Search Box Styles */
.search-wrapper {
  max-width: 360px;
  width: 100%;
}
.search-icon {
  position: absolute;
  top: 50%;
  left: 1.15rem;
  transform: translateY(-50%);
  color: #64748b;
  font-size: 0.9rem;
}
.search-input {
  border: 1px solid #cbd5e1;
  background-color: #ffffff;
  padding: 0.65rem 1rem 0.65rem 2.75rem;
  border-radius: 10px;
  font-size: 0.9rem;
  color: #0f172a;
  transition: all 0.2s ease;
  box-shadow: none !important;
}
.search-input:focus {
  border-color: #25eb60;
  background-color: #ffffff;
}

/* Classroom Cards Grid */
.classroom-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(330px, 1fr));
  gap: 1.5rem;
}

/* Solid Material Card Styling Blueprint */
.material-classroom-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  position: relative;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
}

.material-classroom-card:hover {
  border-color: #cbd5e1;
  box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}

/* Main Upper Block Configuration */
.card-main-content {
  padding: 1.5rem;
  flex-grow: 1;
}

.icon-avatar-box {
  width: 46px;
  height: 46px;
  background-color: #eff6ff;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #0eba67;
  font-size: 1.15rem;
}

.title-overflow-block {
  max-width: 180px;
}

.classroom-title-text {
  font-size: 1.15rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 0.25rem 0;
}

.student-count-subtext {
  font-size: 0.825rem;
  color: #475569;
}

/* Normal Classic Action Group Utilities */
.normal-action-group {
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 2px;
}

.std-btn {
  border: none;
  background: transparent;
  width: 32px;
  height: 32px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  transition: all 0.15s ease;
}
.btn-edit-normal {
  color: #d97706;
}
.btn-edit-normal:hover {
  background-color: #fef3c7;
}
.btn-delete-normal {
  color: #dc2626;
}
.btn-delete-normal:hover {
  background-color: #fee2e2;
}

/* Shaded Lower Operational Card Tray */
.card-footer-tray {
  padding: 0.85rem 1.5rem;
  border-top: 1px solid #f1f5f9;
  background-color: #f8fafc;
  border-bottom-left-radius: 14px;
  border-bottom-right-radius: 14px;
}

.status-indicator-tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
.active-dot-pulse {
  width: 7px;
  height: 7px;
  background-color: #10b981;
  border-radius: 50%;
}
.small-text {
  font-size: 0.775rem;
  font-weight: 500;
  color: #64748b;
}

/* Standard Button Invite Styles */
.btn-standard-invite {
  background-color: #ffffff;
  border: 1px solid #cbd5e1;
  color: #334155;
  font-size: 0.8rem;
  font-weight: 500;
  padding: 0.4rem 0.8rem;
  border-radius: 8px;
  transition: all 0.15s ease;
}
.btn-standard-invite:hover {
  background-color: #1e293b;
  border-color: #1e293b;
  color: #ffffff;
}
/* Custom CSS Loader */
.spinner-custom {
  width: 2rem;
  height: 2rem;
  border: 3px solid #e2e8f0;
  border-top-color: #2563eb;
  border-radius: 50%;
  display: inline-block;
  animation: spin 0.7s linear infinite;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>