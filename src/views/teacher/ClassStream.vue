<template>
  <div class="app-shell">
    


    <div class="main-col">


      <div class="workspace">
        
        <div class="class-banner">
          <div class="class-banner-content">
            <h1 class="class-title">CS101: Intro to Computer Science</h1>
            <div class="class-meta d-flex align-items-center gap-4 flex-wrap">
              <span><i class="fas fa-layer-group me-2"></i>Section A</span>
              <span><i class="fas fa-users me-2"></i>124 Students</span>
            </div>
          </div>
        </div>

        <div class="class-tabs-container">
          <div class="class-tabs">
            <div class="class-tab" :class="{ active: currentTab === 'stream' }" @click="currentTab = 'stream'">
              <i class="fas fa-stream"></i> Stream
            </div>
            <div class="class-tab" :class="{ active: currentTab === 'people' }" @click="currentTab = 'people'">
              <i class="fas fa-users"></i> All Student
            </div>
            <div class="class-tab" :class="{ active: currentTab === 'results' }" @click="currentTab = 'results'">
              <i class="fas fa-chart-bar"></i> Student Result
            </div>
          </div>
        </div>

        <div v-if="currentTab === 'stream'" class="tab-pane active">
          <div class="stream-grid">
            
            <div class="side-panel">
              <div class="p-3 mb-4 rounded-3 border bg-white bg-opacity-60">
                <div class="d-flex align-items-center justify-content-between mb-2">
                  <span class="overview-lbl">Class Overview</span>
                </div>
                <div class="d-flex gap-2 mt-2">
                  <div class="text-center flex-fill">
                    <div class="stat-num">32</div>
                    <div class="stat-lbl">Students</div>
                  </div>
                  <div class="text-center flex-fill border-start border-end">
                    <div class="stat-num text-emerald">86%</div>
                    <div class="stat-lbl">Avg Grade</div>
                  </div>
                  <div class="text-center flex-fill">
                    <div class="stat-num">14</div>
                    <div class="stat-lbl">Posts</div>
                  </div>
                </div>
              </div>

              <div class="panel-title">Upcoming</div>
              <div class="upcoming-item">
                <div class="upcoming-icon"><i class="fas fa-clock"></i></div>
                <div class="upcoming-text">
                  <h6>Midterm Project</h6>
                  <p>Due Tomorrow, 11:59 PM</p>
                </div>
              </div>
            </div>

            <div class="feed-container">
              <div class="composer-card">
                <div class="d-flex align-items-start gap-3">
                  <img src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQTs4Gaz2D9hyLPSjUFHdcLhwoP5JbyaMy3-CXKrYPU4oJnTeRW" class="avatar-img" alt="avatar">
                  <textarea class="composer-input" v-model="postText" rows="2" placeholder="Announce something to your class..."></textarea>
                </div>
                <div class="composer-actions">
                  <div class="attach-btns">
                    <button class="btn-attach quiz"><i class="fas fa-bolt"></i> Attach Quiz</button>
                    <button class="btn-attach assignment"><i class="fas fa-file-alt"></i> Assignment</button>
                  </div>
                  <button class="btn-post" @click="submitNewPost">Post</button>
                </div>
              </div>

              <div class="d-flex flex-column gap-4">
                <div class="post-card pinned-banner">
                  <div class="d-flex align-items-center gap-3">
                    <div class="pin-wrap"><i class="fas fa-thumbtack"></i></div>
                    <div>
                      <div class="pinned-text">Midterm results are now published. Check Student Results for your score.</div>
                      <div class="pinned-meta">Pinned by Ms. Hean Liza · Oct 28</div>
                    </div>
                  </div>
                </div>

                <div class="post-card" v-for="(post, idx) in posts" :key="idx">
                  <div class="post-header">
                    <div class="post-author">
                      <img src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQTs4Gaz2D9hyLPSjUFHdcLhwoP5JbyaMy3-CXKrYPU4oJnTeRW" class="avatar-img" alt="avatar">
                      <div class="post-author-info">
                        <h6>Hean Liza <span class="role-badge">Teacher</span></h6>
                        <span>{{ post.time }}</span>
                      </div>
                    </div>
                  </div>
                  <div class="post-content">{{ post.content }}</div>
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
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Status</th>
                  <th>Enrolled Date</th>
                  <th class="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(student, sIdx) in students" :key="sIdx">
                  <td>
                    <div class="student-info">
                      <img :src="student.avatar" alt="">
                      <div>
                        <h6>{{ student.name }}</h6>
                        <span>{{ student.id }}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span class="badge px-2 py-1 rounded-2" :class="student.online ? 'bg-online' : 'bg-offline'">
                      <i class="fas fa-circle me-1" style="font-size:0.5rem"></i>{{ student.online ? 'Online' : 'Offline' }}
                    </span>
                  </td>
                  <td class="date-lbl">{{ student.date }}</td>
                  <td class="text-end">
                    <button class="btn-remove-student" @click="removeStudent(sIdx)">Remove</button>
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
                <div>Student</div>
                <div>Status</div>
                <div>Submitted</div>
                <div>Duration</div>
                <div>Score</div>
                <div class="text-end">Action</div>
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
                  <span class="badge-status" :class="'badge-' + res.statusType">
                    {{ res.status }}
                  </span>
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

      </div></div></div>
</template>

<script setup>
import { ref } from 'vue'

// គ្រប់គ្រងការប្តូរផ្ទាំង Tab
const currentTab = ref('stream')

// ទិន្នន័យសម្រាប់ Tab Stream
const postText = ref('')
const posts = ref([
  { content: 'Please review the attached project requirements. Make sure to submit your repository links before the deadline!', time: 'May 17, 10:30 AM' },
  { content: 'Pop quiz! This covers chapters 1 through 3. You have 30 minutes to complete it. Good luck!', time: 'May 10, 02:15 PM' }
])

const submitNewPost = () => {
  if (!postText.value.trim()) return
  posts.value.unshift({
    content: postText.value.trim(),
    time: 'Just now'
  })
  postText.value = ''
}

// ទិន្នន័យសម្រាប់ Tab People
const students = ref([
  { name: 'Chloe Navarro', id: 'STU-9202', online: true, date: 'Sep 01, 2024', avatar: 'https://i.pravatar.cc/150?img=47' },
  { name: 'David Lim', id: 'STU-9203', online: true, date: 'Sep 02, 2024', avatar: 'https://i.pravatar.cc/150?img=33' },
  { name: 'James Miller', id: 'STU-9204', online: false, date: 'Sep 05, 2024', avatar: 'https://i.pravatar.cc/150?img=11' }
])

const removeStudent = (idx) => {
  students.value.splice(idx, 1)
}

// ទិន្នន័យសម្រាប់ Tab Results
const studentResults = ref([
  { name: 'James Reyes', id: 'STU-9201', status: 'Needs Grading', statusType: 'review', submitted: 'Nov 5, 9:22 AM', duration: '41m 08s', score: '— / 100', scoreColor: 'muted', avatar: 'https://i.pravatar.cc/150?img=12' },
  { name: 'Chloe Navarro', id: 'STU-9202', status: 'Graded', statusType: 'graded', submitted: 'Nov 5, 8:47 AM', duration: '36m 52s', score: '97 / 100', scoreColor: 'green', avatar: 'https://i.pravatar.cc/150?img=47' },
  { name: 'David Lim', id: 'STU-9203', status: 'Graded', statusType: 'graded', submitted: 'Nov 5, 10:14 AM', duration: '50m 31s', score: '74 / 100', scoreColor: 'orange', avatar: 'https://i.pravatar.cc/150?img=33' }
])
</script>

<style scoped>
/* ── Variables & Global Core Layout ── */
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

.main-col { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
.topbar { height: 70px; background: rgba(255,255,255,0.85); backdrop-filter: blur(12px); border-bottom: 1px solid var(--bdr); display: flex; align-items: center; justify-content: space-between; padding: 12px 28px; }
.search-bar { background: white; border-radius: 30px; padding: 8px 16px; border: 1px solid var(--bdr); max-width: 320px; display: flex; align-items: center; gap: 10px; }
.search-bar input { border: none; outline: none; font-size: 0.8rem; width: 100%; }

.profile-pill { display: flex; align-items: center; gap: 10px; padding: 6px; border-radius: 30px; background: #fff; border: 1px solid var(--bdr); }
.profile-pill img { width: 34px; height: 34px; border-radius: 50%; object-fit: cover; }

.workspace { flex: 1; }
.class-banner { background: linear-gradient(135deg, rgba(16, 185, 129, 0.95), rgba(5, 150, 105, 0.95)); border-radius: 24px; padding: 36px; color: white; margin-bottom: 24px; box-shadow: 0 10px 30px rgba(16, 185, 129, 0.15); }
.class-title { font-size: 1.8rem; font-weight: 700; margin-bottom: 6px; }
.class-meta { font-size: 0.9rem; opacity: 0.9; }

/* Tabs */
.class-tabs-container { margin-bottom: 24px; }
.class-tabs { display: inline-flex; background: #fff; padding: 6px; border-radius: 30px; border: 1px solid var(--bdr); gap: 4px; box-shadow: var(--sh-sm); }
.class-tab { padding: 8px 20px; font-size: 0.82rem; font-weight: 700; color: var(--txt-mu); cursor: pointer; border-radius: 24px; transition: 0.2s; }
.class-tab.active { color: #fff; background: var(--em); box-shadow: 0 4px 12px rgba(16,185,129,0.2); }

/* TAB 1: Stream Layout Grid */
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
</style>