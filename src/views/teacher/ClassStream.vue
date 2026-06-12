<template>
  <div class="app-shell">
    <div class="main-col">
      <div class="workspace">

        <div class="class-banner">
          <div class="class-banner-content">
            <h1 class="class-title">{{ roomData?.name || 'Loading...' }}</h1>
            <div class="class-meta d-flex align-items-center gap-4 flex-wrap">
              <span>
                <i class="fas fa-users me-2"></i>
                {{ roomData?.student_count ?? roomData?.students?.length ?? 0 }} Students
              </span>
            </div>
          </div>
        </div>

        <div class="class-tabs-container d-flex align-items-center justify-content-between">
          <div class="class-tabs">
            <div class="class-tab" :class="{ active: currentTab === 'stream' }" @click="currentTab = 'stream'">
              <i class="fas fa-stream"></i> Stream
            </div>
            <div class="class-tab" :class="{ active: currentTab === 'people' }" @click="currentTab = 'people'">
              <i class="fas fa-users"></i> All Student 
              <span class="badge-count ms-2">({{ roomData?.students?.length || 0 }})</span>
            </div>
            <div class="class-tab" :class="{ active: currentTab === 'results' }" @click="currentTab = 'results'">
              <i class="fas fa-chart-bar"></i> Student Result
            </div>
          </div>

          <button class="btn-exams-link" @click="goToExams">
            <i class="fas fa-file-alt me-2"></i> View All Exams
          </button>
        </div>

        <div v-if="currentTab === 'stream'" class="tab-pane active">
          <div class="stream-grid">
            <div class="side-panel">
               <div class="d-flex align-items-center justify-content-between mb-2">
                <span style="font-size: 0.7rem; font-weight: 700; color: var(--txt-mu); text-transform: uppercase; letter-spacing: 1px;">Class Overview</span>
                <button class="btn btn-sm text-muted p-0"><i class="fas fa-chart-line"></i></button>
              </div>
              <div class="d-flex gap-2 mt-2">
                <div class="text-center flex-fill">
                  <div style="font-weight: 700; color: var(--txt); font-size: 1.2rem;">{{ roomData?.students?.length || 0 }}</div>
                  <div style="font-size: 0.65rem; color: var(--txt-mu); font-weight: 600;">Students</div>
                </div>
                <div class="text-center flex-fill border-start border-end">
                  <div style="font-weight: 700; color: var(--em); font-size: 1.2rem;">86%</div>
                  <div style="font-size: 0.65rem; color: var(--txt-mu); font-weight: 600;">Avg Grade</div>
                </div>
                <div class="text-center flex-fill">
                  <div style="font-weight: 700; color: var(--txt); font-size: 1.2rem;"></div>
                  <div style="font-size: 0.65rem; color: var(--txt-mu); font-weight: 600;">Posts</div>
                </div>
              </div>
            </div>

            <div class="feed-container">
              <div class="composer-card">
                <input v-model="newPost.title" class="form-control mb-2" placeholder="ចំណងជើង..." />
                <textarea v-model="newPost.message" class="composer-input mb-2" rows="2" placeholder="សរសេរការប្រកាស..."></textarea>
                <input v-model="newPost.examLink" class="form-control mb-2" placeholder="បញ្ចូល Link ការប្រឡង..." />
                <div class="composer-actions">
                  <button class="btn-post" @click="handleCreatePost">Post</button>
                </div>
              </div>

              <div class="d-flex flex-column gap-4">
                <div class="post-card" v-for="post in posts" :key="post.id">
                  <div class="post-header d-flex justify-content-between align-items-center">
                    <div class="d-flex align-items-center">
                      <img :src="authStore.avatarUrl" class="avatar-img me-2" alt="avatar" style="width: 40px; height: 40px; border-radius: 50%;">
                      <div>
                        <h6 class="mb-0">
                          {{ authStore.fullName }} 
                          <span class="role-badge">Teacher</span>
                        </h6>
                        <small class="text-muted">
                          {{ new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) }}, 
                          {{ new Date(post.created_at).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }) }}
                        </small>
                      </div>
                    </div>
                    <div class="post-actions">
                      <button class="btn-action-menu" @click.stop="toggleMenu(post.id)">
                        <i class="fas fa-ellipsis-v"></i>
                      </button>
                      <div class="action-dropdown" v-if="activeMenu === post.id">
                        <button @click="openEditModal(post)"><i class="fas fa-edit me-2"></i>Edit</button>
                        <button class="danger" @click="handleDelete(post.id)"><i class="fas fa-trash me-2"></i>Delete</button>
                      </div>
                    </div>
                  </div>

                  <div class="post-content mt-3">
                    <p>{{ post.message }}</p>
                  </div>

                  <a :href="post.exam_link" target="_blank" rel="noopener noreferrer" class="assignment-card-link d-flex align-items-center border rounded-3 shadow-sm overflow-hidden mt-3 mb-2">
                    <div class="d-flex align-items-center justify-content-center" style="width: 80px; height: 80px; background-color: #f6993f; flex-shrink: 0;">
                      <i class="fas fa-laptop-code text-white fa-2x"></i>
                    </div>
                    <div class="p-3 flex-grow-1">
                      <h6 class="mb-0 fw-bold text-dark">{{ post.title }}</h6>
                      <small class="text-muted">Assignment • Click to open exam</small>
                    </div>
                    <div class="p-3">
                      <span class="btn btn-sm px-3 rounded-pill" style="background-color: #e6fffa; color: #38b2ac; font-weight: 600;">View Details</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="currentTab === 'people'" class="tab-pane active">
          <div class="roster-container">
            <div class="roster-header">
              <h3>Student Roster ({{ students.length }})</h3>
              <button class="btn btn-sm btn-emerald">Invite</button>
            </div>
            <table class="roster-table">
              <thead><tr><th>Student</th></tr></thead>
              <tbody>
                <tr v-for="(student, sIdx) in roomData?.students" :key="student.id">
                  <td>
                    <div class="student-info">
                      <img :src="student.avatar || 'default-avatar-url.jpg'" alt="">
                      <div>
                        <h6>{{ student.first_name }} {{ student.last_name }}</h6>
                        <span>{{ student.student_card_id }}</span>
                      </div>
                    </div>
                  </td>
                  <td class="text-end">
                    <button class="btn-remove-student" @click="openDeleteModal(student)">Remove</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div v-if="currentTab === 'results'" class="tab-pane active">
          <div class="roster-container">
            <div class="roster-header">
              <h3>Student Results</h3>
              <div class="d-flex align-items-center gap-4">
                <span class="small-meta-lbl"><i class="fas fa-users me-1"></i>28 / 32 Submissions</span>
                <span class="small-meta-lbl"><i class="fas fa-chart-line me-1"></i>Avg: <strong class="text-emerald">76%</strong></span>
              </div>
            </div>
            <div class="result-grid-container">
              <div class="rg-header">
                <div>Student</div><div>Status</div><div>Submitted</div><div>Duration</div><div>Score</div><div class="text-end">Action</div>
              </div>
              <div class="rg-row" v-for="(res, rIdx) in studentResults" :key="rIdx">
                <div class="student-info">
                  <img :src="res.avatar" class="student-avatar" alt="">
                  <div>
                    <div class="student-name">{{ res.name }}</div>
                    <div class="student-id">{{ res.id }}</div>
                  </div>
                </div>
                <div>
                  <span class="badge-status" :class="'badge-' + res.statusType">{{ res.status }}</span>
                </div>
                <div class="time-text">{{ res.submitted }}</div>
                <div class="time-muted">{{ res.duration }}</div>
                <div class="score-val" :class="'score-' + res.scoreColor">{{ res.score }}</div>
                <div class="text-end">
                  <button class="btn-row-action" :class="{ 'btn-row-review': res.statusType === 'review' }">
                    {{ res.statusType === 'review' ? 'Review' : 'View' }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="modal-overlay" v-if="isEditModalOpen" @click.self="isEditModalOpen = false">
    <div class="edit-modal">
      <h6>Edit Post</h6>
      <input v-model="editPost.title" class="form-control mb-2" placeholder="ចំណងជើង..." />
      <textarea v-model="editPost.message" class="form-control mb-2" rows="3" placeholder="សរសេរការប្រកាស..."></textarea>
      <input v-model="editPost.exam_link" class="form-control mb-2" placeholder="Link ការប្រឡង..." />
      <div class="d-flex justify-content-end gap-2 mt-3">
        <button class="btn-cancel" @click="isEditModalOpen = false">Cancel</button>
        <button class="btn-post" @click="handleUpdate">Save</button>
      </div>
    </div>
  </div>

  <RemoveStudentModal 
    :is-open="isDeleteModalOpen"
    :student="studentToDelete"
    :loading="loading"
    @close="isDeleteModalOpen = false"
    @confirm="confirmDelete"
  />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { useAuthStore } from '@/stores/auth'

import {
  getOneRoom,
  removeStudentFromRoom,
  createPost,
  getPosts,
  deletePost,
  updatePost
} from '@/api/teacher.api'

import RemoveStudentModal from '@/components/teacher/RemoveStudentModal.vue'

//router
const router = useRouter()
const toast = useToast()
const authStore = useAuthStore()

//props
const props = defineProps(['roomId'])

//state
const roomData = ref(null)
const posts = ref([])

const loading = ref(true)
const currentTab = ref('stream')

const isDeleteModalOpen = ref(false)
const isEditModalOpen = ref(false)

const studentToDelete = ref(null)

const activeMenu = ref(null)

//new post
const newPost = ref({
  title: '',
  message: '',
  examLink: ''
})

//edit post
const editPost = ref({
  id: null,
  title: '',
  message: '',
  exam_link: ''
})

//students
const students = ref([
  {
    name: 'Chloe Navarro',
    id: 'STU-9202',
    online: true,
    date: 'Sep 01, 2024',
    avatar: 'https://i.pravatar.cc/150?img=47'
  }
])

//results
const studentResults = ref([
  {
    name: 'James Reyes',
    id: 'STU-9201',
    status: 'Needs Grading',
    statusType: 'review',
    score: '— / 100'
  }
])

//fetch room
const fetchRoomData = async () => {
  try {
    loading.value = true
    const response = await getOneRoom(props.roomId)
    roomData.value = response.data.data || response.data
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

//fetch posts
const fetchPosts = async () => {
  try {
    const res = await getPosts(props.roomId)
    posts.value = (res.data.data || []).reverse()
  } catch (err) {
    console.error(err)
  }
}

//create post
const handleCreatePost = async () => {
  if (!newPost.value.message.trim()) return

  try {
    await createPost(props.roomId, {
      title: newPost.value.title,
      message: newPost.value.message,
      exam_link: newPost.value.examLink
    })

    toast.success('បានបង្ហោះជោគជ័យ!')

    newPost.value = {
      title: '',
      message: '',
      examLink: ''
    }

    await fetchPosts()

  } catch (err) {
    toast.error('មានកំហុស')
  }
}

//delete post
const handleDelete = async (postId) => {
  try {
    await deletePost(props.roomId, postId)
    toast.success('បានលុបជោគជ័យ!')
    await fetchPosts()
  } catch (err) {
    toast.error('មិនអាចលុបបាន')
  }
}

//update post
const handleUpdate = async () => {
  try {
    await updatePost(editPost.value.id, {
      title: editPost.value.title,
      message: editPost.value.message,
      examLink: editPost.value.exam_link
    })

    toast.success('បានកែប្រែជោគជ័យ!')
    isEditModalOpen.value = false
    await fetchPosts()

  } catch (err) {
    toast.error('មិនអាចកែប្រែបាន')
  }
}

//open delete modal
const openDeleteModal = (student) => {
  studentToDelete.value = student
  isDeleteModalOpen.value = true
}

//confirm delete
const confirmDelete = async () => {
  if (!studentToDelete.value) return

  try {
    await removeStudentFromRoom(
      props.roomId,
      studentToDelete.value.id
    )

    await fetchRoomData()

    toast.success('បានលុបសិស្សជោគជ័យ!')

  } catch (error) {
    toast.error('មិនអាចលុបសិស្សបាន')
  } finally {
    isDeleteModalOpen.value = false
    studentToDelete.value = null
  }
}

//toggle menu
const toggleMenu = (postId) => {
  activeMenu.value =
    activeMenu.value === postId ? null : postId
}

//open edit modal
const openEditModal = (post) => {
  editPost.value = {
    id: post.id,
    title: post.title,
    message: post.message,
    exam_link: post.exam_link
  }

  isEditModalOpen.value = true
  activeMenu.value = null
}

//open exam link
const openExamLink = (url) => {
  if (!url) return

  const fullUrl = url.startsWith('http')
    ? url
    : `https://${url}`

  window.open(fullUrl, '_blank')
}

//go exams
const goToExams = () => {
  router.push({
    name: 'RoomDetail',
    params: {
      roomId: props.roomId
    }
  })
}

//mounted
onMounted(() => {
  fetchRoomData()
  fetchPosts()
  authStore.fetchUserProfile()
})
</script>

<style scoped>

:root {
  --em: #10b981; --em-dk: #059669; --em-mid: #34d399; --em-soft: #ecfdf5;
  --bg: #f8fafc; --surf: #ffffff; --bdr: #e2e8f0; --txt: #1e293b;
  --txt-m: #475569; --txt-mu: #94a3b8; --sh-sm: 0 4px 12px rgba(0,0,0,0.03); --sh-md: 0 8px 24px rgba(0,0,0,0.06);
}

.app-shell { display: flex; height: 100vh; overflow: hidden; width: 100%; } 
.sidebar { width: 240px; border-right: 1px solid var(--bdr); background: #fff; padding: 20px 14px; display: flex; flex-direction: column; flex-shrink: 0; }
.nav-item { display: flex; align-items: center; gap: 10px; padding: 9px 12px; border-radius: 10px; text-decoration: none; color: var(--txt-mu); font-size: .83rem; font-weight: 600; transition: .15s; }
.nav-item.active { background: var(--em-soft); color: var(--em); }
.nav-item:hover:not(.active) { background: #f8fafc; color: var(--txt); }
.class-sidebar { width: 220px; background: #ffffff; border-right: 1px solid var(--bdr); padding: 20px; display: flex; flex-direction: column; gap: 20px; }
.sidebar-header { font-size: 0.75rem; font-weight: 800; color: var(--txt-mu); text-transform: uppercase; }
.class-item { display: flex; align-items: center; gap: 12px; padding: 10px; border-radius: 12px; cursor: pointer; transition: 0.2s; }
.class-item.active { background: var(--em-soft); color: var(--em); }
.class-initial { width: 35px; height: 35px; background: var(--em); color: white; display: flex; align-items: center; justify-content: center; border-radius: 8px; font-weight: 700; }
.class-info h6 { font-size: 0.85rem; margin: 0; font-weight: 700; }
.class-info span { font-size: 0.7rem; color: var(--txt-mu); }
.btn-add-class { margin-top: auto; padding: 10px; border: 2px dashed var(--bdr); background: transparent; border-radius: 12px; font-weight: 700; cursor: pointer; }
.main-col { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
.topbar { height: 70px; background: rgba(255,255,255,0.85); backdrop-filter: blur(12px); border-bottom: 1px solid var(--bdr); display: flex; align-items: center; justify-content: space-between; padding: 12px 28px; }
.search-bar { background: white; border-radius: 30px; padding: 8px 16px; border: 1px solid var(--bdr); max-width: 320px; display: flex; align-items: center; gap: 10px; }
.search-bar input { border: none; outline: none; font-size: 0.8rem; width: 100%; }

.profile-pill { display: flex; align-items: center; gap: 10px; padding: 6px; border-radius: 30px; background: #fff; border: 1px solid var(--bdr); }
.profile-pill img { width: 34px; height: 34px; border-radius: 50%; object-fit: cover; }

.workspace {flex: 1; overflow-y: auto; padding: 24px; }
.class-banner { background: linear-gradient(135deg, rgba(16, 185, 129, 0.95), rgba(5, 150, 105, 0.95)); border-radius: 24px; padding: 36px; color: white; margin-bottom: 24px; box-shadow: 0 10px 30px rgba(16, 185, 129, 0.15); }
.class-title { font-size: 1.8rem; font-weight: 700; margin-bottom: 6px; }
.class-meta { font-size: 0.9rem; opacity: 0.9; }

/* Tabs */
.class-tabs-container { margin-bottom: 24px; }
.class-tabs { display: inline-flex; background: #fff; padding: 6px; border-radius: 30px; border: 1px solid var(--bdr); gap: 4px; box-shadow: var(--sh-sm); }
.class-tab { padding: 8px 20px; font-size: 0.82rem; font-weight: 700; color: var(--txt-mu); cursor: pointer; border-radius: 24px; transition: 0.2s; }
.class-tab.active { color: #fff; background: var(--em); box-shadow: 0 4px 12px rgba(16,185,129,0.2); }

/* Stream Layout Grid */
.stream-grid { display: grid; grid-template-columns: 260px 1fr; gap: 24px; align-items: start; }
@media (max-width: 992px) { .stream-grid { grid-template-columns: 1fr; } }

.side-panel { background: rgba(255, 255, 255, 0.8); backdrop-filter: blur(16px); border-radius: 20px; border: 1px solid var(--bdr); padding: 20px; box-shadow: var(--sh-md); }
.overview-lbl { font-size: 0.68rem; font-weight: 700; color: var(--txt-mu); text-transform: uppercase; letter-spacing: 0.5px; }
.stat-num { font-weight: 700; color: var(--txt); font-size: 1.15rem; }
.stat-lbl { font-size: 0.62rem; color: var(--txt-mu); font-weight: 600; }
.panel-title { font-size: 0.85rem; font-weight: 700; color: var(--txt); margin-bottom: 12px; }
.upcoming-item { display: flex; gap: 10px; align-items: flex-start; margin-bottom: 12px; }
.upcoming-icon { width: 30px; height: 30px; border-radius: 8px; background: var(--em-soft); color: var(--em); display: flex; align-items: center; justify-content: center; font-size: 0.75rem; flex-shrink: 0; }
.upcoming-text h6 { font-size: 0.78rem; font-weight: 700; margin: 0; color: var(--txt); }
.upcoming-text p { font-size: 0.68rem; margin: 0; color: var(--txt-mu); }

.feed-container { display: flex; flex-direction: column; gap: 24px; }
.composer-card { background: #fff; border-radius: 20px; border: 1px solid var(--bdr); padding: 20px; box-shadow: var(--sh-md); }
.avatar-img { width: 38px; height: 38px; border-radius: 50%; object-fit: cover; }
.composer-input { width: 100%; border: none; background: transparent; outline: none; font-size: 0.92rem; resize: none; }
.composer-actions { display: flex; justify-content: space-between; align-items: center; margin-top: 14px; padding-top: 14px; border-top: 1px solid var(--bdr); }
.attach-btns { display: flex; gap: 10px; }
.btn-attach { border: 1px solid var(--bdr); background: #fff; font-size: 0.75rem; font-weight: 700; padding: 6px 14px; border-radius: 30px; color: var(--txt-m); }
.btn-attach.quiz { color: #2563eb; } .btn-attach.assignment { color: #d97706; }
.btn-post { background: var(--em); color: #fff; border: none; padding: 8px 20px; border-radius: 30px; font-weight: 700; font-size: 0.8rem; box-shadow: 0 4px 12px rgba(16,185,129,0.25); cursor: pointer; }

.post-card { background: #fff; border-radius: 20px; border: 1px solid var(--bdr); padding: 20px; box-shadow: var(--sh-md); }
.pinned-banner { background: var(--em-soft) !important; border-color: var(--em-mid) !important; }
.pin-wrap { width: 30px; height: 30px; border-radius: 8px; background: var(--em); color: #fff; display: flex; align-items: center; justify-content: center; font-size: 0.8rem; flex-shrink: 0; }
.pinned-text { font-size: 0.85rem; font-weight: 700; color: var(--txt); }
.pinned-meta { font-size: 0.68rem; color: var(--txt-mu); margin-top: 2px; }

.post-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }
.post-author { display: flex; align-items: center; gap: 10px; }
.post-author-info h6 { margin: 0; font-size: 0.9rem; font-weight: 700; }
.post-author-info span { font-size: 0.72rem; color: var(--txt-mu); }
.role-badge { font-size: 0.58rem; font-weight: 700; padding: 1px 5px; border-radius: 4px; background: var(--em-soft); color: var(--em); margin-left: 4px; }
.post-content { font-size: 0.9rem; color: var(--txt-m); line-height: 1.5; }

/* TAB 2: People Roster Table */
.roster-container { background: #fff; border: 1px solid var(--bdr); border-radius: 16px; padding: 24px; box-shadow: var(--sh-sm); }
.roster-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.roster-header h3 { font-size: 1.15rem; font-weight: 700; margin: 0; }
.btn-emerald { background: var(--em); color: #fff; font-weight: 700; font-size: 0.8rem; border: none; padding: 8px 16px; border-radius: 8px; }
.roster-table { width: 100%; border-collapse: collapse; }
.roster-table th { padding: 12px 16px; font-size: 0.7rem; text-transform: uppercase; color: var(--txt-mu); font-weight: 700; border-bottom: 1px solid var(--bdr); text-align: left; }
.roster-table td { padding: 14px 16px; border-bottom: 1px solid var(--bdr); vertical-align: middle; }
.student-info { display: flex; align-items: center; gap: 10px; }
.student-info img { width: 36px; height: 36px; border-radius: 8px; object-fit: cover; }
.student-info h6 { margin: 0; font-size: 0.88rem; font-weight: 700; }
.student-info span { font-size: 0.7rem; color: var(--txt-mu); }
.bg-online { background: rgba(16, 185, 129, 0.1); color: var(--em-dk); }
.bg-offline { background: #f1f5f9; color: #64748b; }
.date-lbl { font-size: 0.8rem; font-weight: 600; color: var(--txt-m); }
.btn-remove-student { padding: 4px 12px; border-radius: 6px; border: 1px solid rgba(239,68,68,0.25); background: #fff; color: #ef4444; font-size: 0.7rem; font-weight: 700; cursor: pointer; }

/* TAB 3: Results Grid View */
.small-meta-lbl { font-size: 0.78rem; font-weight: 600; color: var(--txt-m); }
.result-grid-container { display: flex; flex-direction: column; width: 100%; border: 1px solid var(--bdr); border-radius: 12px; overflow: hidden; margin-top: 12px; }
.rg-header { display: grid; grid-template-columns: 2.5fr 1.5fr 1.5fr 1.2fr 1fr 100px; padding: 12px 16px; font-size: 0.65rem; font-weight: 700; text-transform: uppercase; color: var(--txt-mu); background: #f8fafc; border-bottom: 1px solid var(--bdr); }
.rg-row { display: grid; grid-template-columns: 2.5fr 1.5fr 1.5fr 1.2fr 1fr 100px; padding: 12px 16px; border-bottom: 1px solid var(--bdr); align-items: center; font-size: 0.82rem; }
.rg-row:last-child { border-bottom: none; }
.badge-status { display: inline-flex; align-items: center; padding: 4px 8px; border-radius: 6px; font-size: 0.68rem; font-weight: 700; }
.badge-review { background: #fef3c7; color: #b45309; }
.badge-graded { background: var(--em-soft); color: var(--em-dk); }
.time-text { font-weight: 600; color: var(--txt); }
.time-muted { color: var(--txt-mu); }
.score-val { font-weight: 700; font-size: 1rem; }
.score-green { color: var(--em); } .score-orange { color: #f59e0b; } .score-muted { color: var(--txt-mu); }
.btn-row-action { padding: 5px 12px; border-radius: 6px; font-size: 0.72rem; font-weight: 700; background: #fff; border: 1px solid var(--bdr); color: var(--txt-m); cursor: pointer; }
.btn-row-review { background: var(--em-soft); color: var(--em-dk); border-color: transparent; }
.btn-exams-link {
  background: transparent;
  color: #10b981; /* ពណ៌បៃតង */
  border: 1px solid #10b981;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.82rem;
  font-weight: 700;
  transition: all 0.3s ease;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.btn-exams-link:hover {
  background: #10b981;
  color: white;
}

.assignment-card-link {
  display: flex !important; /* បង្ខំឱ្យវាបង្ហាញជា Flex */
  cursor: pointer !important; /* បង្ខំឱ្យ Cursor ចេញជាដៃ */
  text-decoration: none !important;
  color: inherit !important;
  transition: all 0.3s ease;
}

/* ធានាថាគ្រប់ Child element មិនបាំងការចុច */
.assignment-card-link * {
  cursor: pointer !important;
}

.post-actions { position: relative; }
.btn-action-menu { background: none; border: none; color: var(--txt-mu); padding: 4px 8px; cursor: pointer; border-radius: 6px; }
.btn-action-menu:hover { background: #f1f5f9; }
.action-dropdown { position: absolute; right: 0; top: 100%; background: #fff; border: 1px solid var(--bdr); border-radius: 10px; box-shadow: var(--sh-md); z-index: 100; min-width: 130px; overflow: hidden; }
.action-dropdown button { display: flex; align-items: center; width: 100%; padding: 10px 14px; border: none; background: none; font-size: 0.8rem; font-weight: 600; cursor: pointer; color: var(--txt); }
.action-dropdown button:hover { background: #f8fafc; }
.action-dropdown button.danger { color: #ef4444; }
.modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.4); z-index: 999; display: flex; align-items: center; justify-content: center; }
.edit-modal { background: #fff; border-radius: 20px; padding: 28px; width: 480px; box-shadow: var(--sh-md); }
.edit-modal h6 { font-size: 1rem; font-weight: 700; margin-bottom: 16px; }
.btn-cancel { padding: 8px 20px; border-radius: 30px; border: 1px solid var(--bdr); background: #fff; font-weight: 700; font-size: 0.8rem; cursor: pointer; }
</style>