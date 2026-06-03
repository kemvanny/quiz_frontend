<template>
  <div class="workspace">
    
    <div class="workspace-header mb-4 d-flex justify-content-between align-items-center gap-3">
      <div class="search-box position-relative flex-grow-1" style="max-width: 400px;">
        <i class="fas fa-search position-absolute top-50 translate-middle-y ms-3 text-muted"></i>
        <input 
          v-model="searchQuery" 
          type="text" 
          class="form-control ps-5" 
          placeholder="ស្វែងរកថ្នាក់រៀន..."
          style="border-radius: 12px; border: 1px solid var(--bdr, #e2e8f0); padding-top: 10px; padding-bottom: 10px;"
        />
      </div>
    </div>

    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-success" role="status"></div>
      <p class="text-muted mt-2">កំពុងទាញទិន្នន័យ...</p>
    </div>

    <div v-else class="room-grid">
      <div 
        v-for="(room, index) in filteredRooms" 
        :key="room.id || index" 
        class="room-card"
        @click="navigateToRoom(room.id)"
      >
        <div class="room-card-banner">
          <div class="room-card-icon">
            <i class="fas fa-graduation-cap"></i>
          </div>

          <div class="card-actions-wrapper" @click.stop>
            <button class="action-trigger-btn" @click="openUpdateModal(room)" title="កែប្រែបន្ទប់">
              <i class="fas fa-edit text-warning"></i>
            </button>
            <button class="action-trigger-btn" @click="openDeleteModal(room)" title="លុបបន្ទប់">
              <i class="fas fa-trash-alt text-danger"></i>
            </button>
          </div>
        </div>
        
        <div class="room-card-body">
          <div class="room-card-title text-truncate">{{ room.name }}</div>
        </div>
        
        <div class="room-card-footer d-flex justify-content-between align-items-center">
          <div class="room-stat">
            <i class="fas fa-users"></i> {{ room.studentCount || 0 }} students
          </div>
          
          <button 
            class="btn btn-sm invite-student-btn d-flex align-items-center gap-1"
            @click.stop="handleInviteStudent(room)"
          >
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
import { getMyRooms } from '@/api/teacher.api'

import UpdateRoomModal from '@/components/teacher/UpdateRoomModal.vue'
import DeleteRoomModal from '@/components/teacher/DeleteRoomModal.vue'
import InviteStudentModal from '@/components/teacher/InviteStudentModal.vue';

const searchQuery = ref('')
const rooms = ref([])
const loading = ref(false)
const isInviteOpen = ref(false);

// States សម្រាប់គ្រប់គ្រងការ បើក/បិទ Modals និងការចងទិន្នន័យបន្ទប់ដែលជ្រើសរើស
const isCreateOpen = ref(false)
const isUpdateOpen = ref(false)
const isDeleteOpen = ref(false)
const selectedRoom = ref(null)

const filteredRooms = computed(() => {
  if (!searchQuery.value) return rooms.value
  return rooms.value.filter(room => 
    room.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

// [GET] ទាញយកទិន្នន័យបន្ទប់រៀនទាំងអស់
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

// Logic សម្រាប់បើក និងបិទ Update Modal
const openUpdateModal = (room) => {
  selectedRoom.value = room
  isUpdateOpen.value = true
}
const closeUpdateModal = () => {
  isUpdateOpen.value = false
  selectedRoom.value = null
}

const handleRoomCreatedSuccess = async (newRoom) => {
  // ១. ទាញយកទិន្នន័យបញ្ជីបន្ទប់រៀនឡើងវិញដើម្បីបង្ហាញលើ Dashboard ក្រោយពេលបង្កើតរួច
  await fetchRooms();

  // ២. ចាប់យកទិន្នន័យបន្ទប់ដែលទើបបង្កើតថ្មី (ដែលមាន room_id ត្រឹមត្រូវពី backend) មកចងទុក
  selectedRoom.value = newRoom;

  // ៣. បាញ់បើកផ្ទាំងម៉ូដាល់អញ្ជើញសិស្ស (InviteStudentModal) ភ្លាមៗដោយស្វ័យប្រវត្តិតែម្តង!
  isInviteOpen.value = true;
};

// Logic សម្រាប់បើក និងបិទ Delete Modal
const openDeleteModal = (room) => {
  selectedRoom.value = room
  isDeleteOpen.value = true
}
const closeDeleteModal = () => {
  isDeleteOpen.value = false
  selectedRoom.value = null
}

// [POST] មុខងារ Invite Student តាមរយៈ API 
const handleInviteStudent = (room) => {
  selectedRoom.value = room; // ចាប់យក Object បន្ទប់ទាំងមូល
  isInviteOpen.value = true;  // បើកផ្ទាំងអញ្ជើញ
};

const closeInviteModal = () => {
  isInviteOpen.value = false;
  selectedRoom.value = null;
};
const navigateToRoom = (roomId) => {
  console.log(`Maps to /api/teacher/rooms/${roomId}`)
}

onMounted(() => {
  fetchRooms()
})
</script>

<style scoped>
.workspace {
  padding: 2.5rem;
}

.room-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
}

.room-card {
  background: var(--surf, #ffffff); 
  border: 1px solid var(--bdr, #e2e8f0);
  border-radius: 16px; 
  overflow: hidden; 
  display: flex; 
  flex-direction: column; 
  text-decoration: none;
  cursor: pointer; 
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1); 
  box-shadow: var(--sh-sm, 0 4px 12px rgba(0,0,0,0.03));
  position: relative;
}
.room-card:hover { 
  border-color: var(--em-mid, #a7f3d0); 
  transform: translateY(-4px); 
  box-shadow: 0 12px 24px rgba(16,185,129,0.15); 
}

.room-card-banner { 
  height: 120px; 
  background: linear-gradient(135deg, var(--em-soft, #ecfdf5), #d1fae5); 
  position: relative; 
}

.room-card-icon {
  position: absolute; bottom: -20px; left: 20px;
  width: 54px; height: 54px; border-radius: 14px; background: var(--em, #10b981); color: #fff;
  display: flex; align-items: center; justify-content: center; font-size: 1.5rem; border: 3px solid #fff;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}

.card-actions-wrapper {
  position: absolute;
  top: 12px;
  right: 12px;
  display: flex;
  gap: 8px;
  z-index: 5;
}

.action-trigger-btn {
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid rgba(0, 0, 0, 0.05);
  width: 34px;
  height: 34px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  transition: transform 0.15s;
}
.action-trigger-btn:hover {
  transform: scale(1.08);
}

.room-card-body { 
  padding: 36px 20px 24px; 
  flex: 1; 
}
.room-card-title { 
  font-size: 1.25rem; 
  font-weight: 700; 
  color: var(--txt, #0f172a); 
  line-height: 1.2;
}

.room-card-footer {
  padding: 14px 20px; 
  border-top: 1px solid var(--bdr, #e2e8f0);
  background: #fafbfc; 
}
.room-stat { font-size: 0.8rem; font-weight: 600; color: #475569; display: flex; align-items: center; gap: 6px; }

.invite-student-btn {
  background: transparent;
  border: 1px solid var(--em, #10b981);
  color: var(--em, #10b981);
  font-size: 0.75rem;
  font-weight: 600;
  padding: 5px 12px;
  border-radius: 8px;
  transition: all 0.2s;
}
.invite-student-btn:hover {
  background: var(--em, #10b981);
  color: white;
}

@keyframes fadeUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
.room-card { animation: fadeUp 0.3s ease both; }
</style>