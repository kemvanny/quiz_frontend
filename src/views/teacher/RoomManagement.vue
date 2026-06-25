<template>
  <div class="workspace-container">
    <!-- Action / Search Toolbar -->
    <div class="workspace-toolbar mb-4">
      <div class="search-wrapper position-relative" @keydown.esc="isFocused = false">
        <i class="fas fa-search search-icon"></i>
        <input 
          v-model="searchQuery" 
          type="text" 
          class="form-control search-input" 
          placeholder="ស្វែងរកថ្នាក់រៀន..."
          @focus="isFocused = true"
          @blur="onBlur"
          @keydown.down.prevent="onArrowDown"
          @keydown.up.prevent="onArrowUp"
          @keydown.enter.prevent="onEnter"
        />

        <!-- Google-Like Suggestions Dropdown -->
        <div 
          v-if="isFocused && suggestions.length > 0" 
          class="search-suggestions-dropdown"
        >
          <div 
            v-for="(room, index) in suggestions" 
            :key="'suggest-' + (room.id || index)"
            class="suggestion-item"
            :class="{ 'active': index === activeIndex }"
            @mousedown.prevent="selectSuggestion(room)"
            @mouseenter="activeIndex = index"
          >
            <div class="d-flex align-items-center gap-2 min-w-0">
              <i class="fas fa-search suggestion-icon"></i>
              <div class="suggestion-text-wrapper text-truncate">
                <span class="suggestion-title">{{ room.name }}</span>
                <span class="suggestion-meta" v-if="room.student_count">
                  · {{ room.student_count }} សិស្ស
                </span>
              </div>
            </div>
            <span class="suggestion-action-hint">
              <i class="fas fa-arrow-left"></i>
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Dynamic Emerald Spinner -->
    <div class="w-100 py-5 my-5 text-center" v-if="loading">
      <div class="spinner-custom"></div>
      <p class="text-muted small mt-3 fw-semibold">កំពុងទាញទិន្នន័យ...</p>
    </div>

    <!-- Classroom Grid -->
    <div v-else-if="filteredRooms.length > 0" class="classroom-grid">
      <div 
        v-for="(room, index) in filteredRooms" 
        :key="room.id || index" 
        class="classroom-card"
        @click="goToRoomDetail(room.id)"
      >
        <!-- Main Top Content Block -->
        <div class="card-main-content">
          <div class="d-flex align-items-start justify-content-between gap-3">
            <div class="d-flex align-items-center gap-3 min-w-0">
              <div class="icon-avatar-box">
                <i class="fas fa-graduation-cap"></i>
              </div>
              <div class="title-overflow-block">
                <h3 class="classroom-title-text text-truncate" :title="room.name">
                  {{ room.name }}
                </h3>
                <span class="student-count-subtext">
                  <i class="fas fa-users me-1"></i>
                  <strong>{{ room.student_count || 0 }}</strong> សិស្សសរុប
                </span>
              </div>
            </div>
            
            <!-- Modern Minimalist Actions -->
            <div class="card-actions-wrapper" @click.stop>
              <button class="action-circle-btn btn-edit" @click="openUpdateModal(room)" title="កែប្រែបន្ទប់">
                <i class="fas fa-pen"></i>
              </button>
              <button class="action-circle-btn btn-delete" @click="openDeleteModal(room)" title="លុបបន្ទប់">
                <i class="fas fa-trash-alt"></i>
              </button>
            </div>
          </div>
        </div>

        <!-- Seamless Shaded Footer Tray -->
        <div class="card-footer-tray d-flex align-items-center justify-content-between" @click.stop>
          <div class="status-indicator-tag">
            <span class="active-dot-pulse"></span>
            <span class="small-text">Active</span>
          </div>

          <button 
            class="btn btn-pill-invite d-flex align-items-center gap-1"
            @click.stop="handleInviteStudent(room)">
            <i class="fas fa-user-plus"></i> <span>Invite</span>
          </button>
        </div>

      </div>
    </div>

    <!-- Filter Result Fall-Through Empty State -->
    <div v-else class="empty-state-container">
      <i class="fas fa-folder-open empty-icon"></i>
      <p class="empty-text">រកមិនឃើញថ្នាក់រៀនដែលត្រូវគ្នានឹងការស្វែងរកឡើយ។</p>
    </div>

    <!-- Modals (Functional State Integrations) -->
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
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { getMyRooms } from '@/api/teacher.api'

import CreateRoomModal from '@/components/teacher/CreateRoomModal.vue'
import UpdateRoomModal from '@/components/teacher/UpdateRoomModal.vue'
import DeleteRoomModal from '@/components/teacher/DeleteRoomModal.vue'
import InviteStudentModal from '@/components/teacher/InviteStudentModal.vue'

// Router & States
const router = useRouter()

const searchQuery = ref('')
const rooms = ref([])
const loading = ref(false)
const selectedRoom = ref(null)

const isCreateOpen = ref(false)
const isUpdateOpen = ref(false)
const isDeleteOpen = ref(false)
const isInviteOpen = ref(false)

// Google search-like autocomplete states
const isFocused = ref(false)
const activeIndex = ref(-1)

// Dynamic suggestions limited to top 6 matches
const suggestions = computed(() => {
  if (!searchQuery.value) return []
  return rooms.value.filter(room => 
    room.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  ).slice(0, 6)
})

// Reset the active keyboard navigation index when search query changes
watch(searchQuery, () => {
  activeIndex.value = -1
})

const onBlur = () => {
  isFocused.value = false
  activeIndex.value = -1
}

const selectSuggestion = (room) => {
  searchQuery.value = room.name
  isFocused.value = false
  goToRoomDetail(room.id)
}

// Keyboard Navigation Handlers
const onArrowDown = () => {
  if (suggestions.value.length === 0) return
  activeIndex.value = (activeIndex.value + 1) % suggestions.value.length
}

const onArrowUp = () => {
  if (suggestions.value.length === 0) return
  if (activeIndex.value <= 0) {
    activeIndex.value = suggestions.value.length - 1
  } else {
    activeIndex.value--
  }
}

const onEnter = () => {
  if (activeIndex.value >= 0 && activeIndex.value < suggestions.value.length) {
    selectSuggestion(suggestions.value[activeIndex.value])
  } else {
    isFocused.value = false
  }
}

// Computed Classroom Filter List
const filteredRooms = computed(() => {
  if (!searchQuery.value) return rooms.value
  return rooms.value.filter(room => 
    room.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

// Room Details Navigation
const goToRoomDetail = (roomId) => {
  router.push({
    name: 'ClassStream', 
    params: { roomId: roomId }
  })
}

// Fetch Classroom Data API call
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

// Handle dynamic Room Setup flow after success
const handleRoomCreatedSuccess = async (newRoom) => {
  await fetchRooms()
  selectedRoom.value = newRoom
  isInviteOpen.value = true
}

// Update Room Modal Trigger
const openUpdateModal = (room) => {
  selectedRoom.value = room
  isUpdateOpen.value = true
}

const closeUpdateModal = () => {
  isUpdateOpen.value = false
  selectedRoom.value = null
}

// Delete Room Modal Trigger
const openDeleteModal = (room) => {
  selectedRoom.value = room
  isDeleteOpen.value = true
}

const closeDeleteModal = () => {
  isDeleteOpen.value = false
  selectedRoom.value = null
}

// Invite Handler
const handleInviteStudent = (room) => {
  selectedRoom.value = room
  isInviteOpen.value = true
}

// Setup onmount
onMounted(() => {
  fetchRooms()
})
</script>

<style scoped>
.workspace-container {
  --em:      #10b981;
  --em-dk:   #059669;
  --em-soft: #ecfdf5;
  --em-mid:  rgba(16,185,129,.12);
  --txt:     #0f172a;
  --txt-m:   #334155;
  --txt-mu:  #64748b;
  --surf:    #ffffff;
  --bdr:     #e2e8f0;
  --r-md:    12px;
  --r-lg:    16px;
  --r-xl:    20px;
  --sh-sm:   0 4px 18px rgba(0,0,0,.03);
  --sh-md:   0 8px 24px rgba(0,0,0,.06);

  padding: 24px 8px;
  font-family: 'Kantumruy Pro', 'Inter', sans-serif;
}

/* Modern Minimal Search Box Styles */
.search-wrapper {
  max-width: 360px;
  width: 100%;
  z-index: 100;
}

.search-icon {
  position: absolute;
  top: 50%;
  left: 14px;
  transform: translateY(-50%);
  color: var(--txt-mu);
  font-size: 0.9rem;
}

.search-input {
  border: 1px solid var(--bdr);
  background-color: var(--surf);
  padding: 10px 16px 10px 38px;
  border-radius: var(--r-md);
  font-size: 0.88rem;
  color: var(--txt);
  transition: all 0.2s ease-in-out;
  box-shadow: var(--sh-sm) !important;
}

.search-input:focus {
  border-color: var(--em);
  background-color: var(--surf);
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1) !important;
}

/* Google-Like Autocomplete Suggestions Dropdown */
.search-suggestions-dropdown {
  position: absolute;
  top: calc(100% + 5px);
  left: 0;
  right: 0;
  background: var(--surf);
  border: 1px solid var(--bdr);
  border-radius: var(--r-md);
  box-shadow: var(--sh-md);
  z-index: 1000;
  overflow: hidden;
  padding: 6px 0;
  text-align: left;
}

.suggestion-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.15s ease;
}

.suggestion-item.active {
  background-color: var(--em-soft);
}

.suggestion-icon {
  font-size: 0.8rem;
  color: var(--txt-mu);
}

.suggestion-text-wrapper {
  font-size: 0.88rem;
  color: var(--txt);
}

.suggestion-title {
  font-weight: 600;
}

.suggestion-meta {
  font-size: 0.75rem;
  color: var(--txt-mu);
  font-weight: 500;
}

.suggestion-action-hint {
  font-size: 0.75rem;
  color: var(--em);
  opacity: 0;
  transform: scaleHorizontally(-1); /* Points diagonal-up or left to imply insert */
  transition: opacity 0.15s ease, transform 0.15s ease;
}

.suggestion-item:hover .suggestion-action-hint,
.suggestion-item.active .suggestion-action-hint {
  opacity: 1;
}

/* Classroom Cards Grid Layout */
.classroom-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
}

/* Premium Floating Card Element */
.classroom-card {
  background: var(--surf);
  border: 1px solid var(--bdr);
  border-radius: var(--r-xl);
  position: relative;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  box-shadow: var(--sh-sm);
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.classroom-card:hover {
  border-color: var(--em-mid);
  box-shadow: var(--sh-md);
  transform: translateY(-3px);
}

/* Upper Content Layout */
.card-main-content {
  padding: 24px;
  flex-grow: 1;
}

/* Elegant Mint Avatar Blocks */
.icon-avatar-box {
  width: 44px;
  height: 44px;
  background: linear-gradient(135deg, var(--em-soft), rgba(16, 185, 129, 0.08));
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--em);
  font-size: 1.25rem;
  box-shadow: inset 0 2px 4px rgba(16, 185, 129, 0.05);
  flex-shrink: 0;
}

.title-overflow-block {
  min-width: 0;
  text-align: left;
}

.classroom-title-text {
  font-size: 1.1rem;
  font-weight: 800;
  color: var(--txt);
  margin: 0 0 4px 0;
}

.student-count-subtext {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--txt-mu);
  display: inline-flex;
  align-items: center;
}

.student-count-subtext i {
  color: var(--em);
  margin-right: 4px;
}

/* Clean Decoupled Control Group Actions */
.card-actions-wrapper {
  display: flex;
  align-items: center;
  gap: 6px;
}

.action-circle-btn {
  border: 1px solid var(--bdr);
  background: var(--surf);
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-edit {
  color: #d97706;
}
.btn-edit:hover {
  background-color: #fef3c7;
  border-color: #fde047;
}

.btn-delete {
  color: #ef4444;
}
.btn-delete:hover {
  background-color: #fef2f2;
  border-color: #fecaca;
}

/* Seamless Shaded Footer Tray */
.card-footer-tray {
  padding: 14px 24px;
  border-top: 1px solid #f1f5f9;
  background-color: #fafbfc;
  border-bottom-left-radius: var(--r-xl);
  border-bottom-right-radius: var(--r-xl);
}

.status-indicator-tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.active-dot-pulse {
  width: 8px;
  height: 8px;
  background-color: var(--em);
  border-radius: 50%;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.15);
}

.small-text {
  font-size: 0.76rem;
  font-weight: 700;
  color: var(--txt-mu);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Pill-Shaped Invite Action CTA */
.btn-pill-invite {
  background-color: var(--surf);
  border: 1px solid var(--bdr);
  color: var(--txt-m);
  font-size: 0.78rem;
  font-weight: 700;
  padding: 5px 12px;
  border-radius: 30px;
  box-shadow: var(--sh-sm);
  transition: all 0.2s ease;
}

.btn-pill-invite:hover {
  background-color: var(--em);
  border-color: var(--em);
  color: #ffffff;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.2);
}

.btn-pill-invite:active {
  transform: scale(0.96);
}

/* Premium Emerald Loader Spinner */
.spinner-custom {
  width: 2.2rem;
  height: 2.2rem;
  border: 3.5px solid var(--em-soft);
  border-top-color: var(--em);
  border-radius: 50%;
  display: inline-block;
  animation: spin 0.75s cubic-bezier(0.4, 0, 0.2, 1) infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Empty State illustration wrapper */
.empty-state-container {
  text-align: center;
  padding: 60px 20px;
  color: var(--txt-mu);
  background: var(--surf);
  border-radius: var(--r-xl);
  border: 1px solid var(--bdr);
  box-shadow: var(--sh-sm);
}

.empty-icon {
  font-size: 2.5rem;
  color: #cbd5e1;
  margin-bottom: 12px;
  display: block;
}

.empty-text {
  font-size: 0.9rem;
  font-weight: 600;
  margin: 0;
}
</style>