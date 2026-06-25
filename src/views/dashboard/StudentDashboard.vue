<template>
  <section class="student-dashboard">

    <div v-if="isLoading" class="skeleton-dashboard-wrapper">
      <div class="stats">
        <div v-for="i in 3" :key="'stat-skey-' + i" class="stat skeleton-card">
          <div class="skeleton-element skeleton-icon"></div>
          <div class="w-100" style="margin-top: 15px;">
            <div class="skeleton-element skeleton-line w-50"></div>
            <div class="skeleton-element skeleton-line w-25" style="height: 26px; margin-top: 15px;"></div>
          </div>
        </div>
      </div>

      <div class="grid">
        <div class="left-col">
          <div class="card skeleton-card">
            <div class="qa-wrap">
              <div class="skeleton-element skeleton-line w-25" style="height: 16px;"></div>
              <div class="qa-btns">
                <div class="skeleton-element skeleton-btn" style="width: 130px;"></div>
                <div class="skeleton-element skeleton-btn" style="width: 150px;"></div>
                <div class="skeleton-element skeleton-btn" style="width: 160px;"></div>
              </div>
            </div>
          </div>

          <div class="card skeleton-card">
            <div class="perf-head">
              <div class="w-50">
                <div class="skeleton-element skeleton-line w-75" style="height: 16px; margin-bottom: 14px;"></div>
              </div>
              <div class="gpa-block" style="min-width: 100px;">
                <div class="skeleton-element skeleton-line w-50 ms-auto" style="height: 26px; margin-bottom: 5px;"></div>
                <div class="skeleton-element skeleton-line w-100" style="height: 12px;"></div>
              </div>
            </div>
            
            <div v-for="i in 3" :key="'perf-skey-' + i" class="subj-row align-items-center">
              <div class="skeleton-element skeleton-circle" style="width: 8px; height: 8px;"></div>
              <div class="subj-info">
                <div class="skeleton-element skeleton-line w-50"></div>
              </div>
              <div class="subj-track">
                <div class="skeleton-element w-100 h-100"></div>
              </div>
              <div class="skeleton-element skeleton-line w-10"></div>
            </div>
          </div>
        </div>

        <div class="right-col">
          <div class="card skeleton-card" style="border-top: 3px solid #cbd5e1;">
            <div class="section-head">
              <div class="skeleton-element skeleton-line w-50" style="height: 16px;"></div>
            </div>
            <div v-for="i in 2" :key="'dl-skey-' + i" class="d-flex align-items-center gap-3 p-3 mb-2" style="border-radius: 10px; background: #f8fafc;">
              <div class="skeleton-element skeleton-circle" style="width: 36px; height: 36px; border-radius: 8px;"></div>
              <div class="flex-grow-1">
                <div class="skeleton-element skeleton-line w-75 mb-2"></div>
                <div class="skeleton-element skeleton-line w-50"></div>
              </div>
            </div>
          </div>

          <div class="card skeleton-card">
            <div class="section-head">
              <div class="skeleton-element skeleton-line w-50" style="height: 16px;"></div>
              <div class="skeleton-element skeleton-line w-15" style="height: 14px;"></div>
            </div>
            <div v-for="i in 2" :key="'fb-skey-' + i" class="fb-row">
              <div class="fb-left w-75">
                <div class="skeleton-element skeleton-circle" style="width: 36px; height: 36px; border-radius: 9px;"></div>
                <div class="w-100">
                  <div class="skeleton-element skeleton-line w-60 mb-2"></div>
                  <div class="skeleton-element skeleton-line w-40"></div>
                </div>
              </div>
              <div class="skeleton-element skeleton-line w-15" style="height: 22px; border-radius: 99px;"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="dashboard-real-content d-flex flex-column gap-4">
      <div class="stats">
        <a href="#" class="stat">
          <div class="stat-icon icon-green" >
            <i class="bi bi-check-circle"></i>
          </div>
          <div>
            <div class="stat-label">ការប្រឡងដែលបានធ្វើរួច</div>
            <div class="stat-value">{{ dashboardData.examsDone || 0 }}</div>
          </div>
        </a>

        <a href="#" class="stat">
          <div class="stat-icon icon-blue" >
            <i class="bi bi-door-open"></i>
          </div>
          <div>
            <div class="stat-label">បន្ទប់ដែលបានចូលរួម</div>
            <div class="stat-value">{{ dashboardData.enrolledRooms || 0 }}</div>
          </div>
        </a>

        <a href="#" class="stat">
          <div class="stat-icon icon-orange" >
            <i class="bi bi-graph-up-arrow"></i>
          </div>
          <div>
            <div class="stat-label">ពិន្ទុជាមធ្យមសរុប</div>
            <div class="stat-value">{{ dashboardData.overallAvg || '0%' }}</div>
          </div>
        </a>
      </div>

      <div class="grid">
        <div class="left-col">
          <div class="card">
            <div class="qa-wrap">
              <div>
                <div class="card-title no-margin">សកម្មភាពរហ័ស</div>
              </div>
              <div class="qa-btns">
                <router-link :to="{name: 'Classroom'}" class="btn primary" >
                  <i class="bi bi-building"></i>ថ្នាក់រៀន
                </router-link>
                <router-link :to="{name: 'Assignment'}" class="btn">
                  <i class="bi bi-clipboard-check"></i> ការប្រឡង
                </router-link>
                <router-link :to="{name: 'AnalyticsResult'}" class="btn">
                  <i class="bi bi-laptop"></i> លទ្ធផល
                </router-link>
              </div>
             </div>
          </div>

          <div class="card">
            <div class="perf-head">
              <div>
                <div class="card-title">លទ្ធផលសិក្សាតាមមុខវិជ្ជា</div>
              </div>
              <div class="gpa-block" v-if="performanceList">
                <div class="gpa-val text-center">{{ performanceList.currentGPA }}</div>
                <div class="gpa-lbl">មធ្យមភាគប៉ាន់ស្មាន</div>
              </div>
            </div>

            <div v-if="performanceList.length === 0" class="py-3 text-center text-muted">
              មិនមានទិន្នន័យលទ្ធផលសិក្សាទេ
            </div>
            <div v-else v-for="(subject, index) in performanceList.subjects" :key="index" class="subj-row">
              <div class="subj-dot" :style="{ background: getSubjectColor(index) }"></div>
              <div class="subj-info">
                <div class="subj-name">{{ subject.subjectName }}</div>
              </div>
              <div class="subj-track">
                <div class="subj-fill" :style="{ width: subject.percentage + '%', background: getSubjectColor(index) }">
                </div>
              </div>
              <div class="subj-pct">{{ subject.percentage }}%</div>
            </div>

            <div class="perf-footer">
              ផ្អែកលើការវាយតម្លៃសិក្សាដែលបានផ្ទៀងផ្ទាត់
            </div>
          </div>
        </div>

        <div class="right-col">
          <div class="card" style="border-top: 3px solid #f59e0b; border-radius: 0 0 14px 14px">
            <div class="section-head">
              <div>
                <div class="card-title">កាលកំណត់ជិតដល់</div>
              </div>
            </div>

            <div v-if="deadlineList.length === 0" class="py-4 text-center text-muted">
              <i class="bi bi-calendar-check d-block mb-1 fs-4"></i> គ្មានកាលកំណត់សម្រាប់ថ្ងៃនេះទេ!
            </div>

            <a v-else v-for="dl in deadlineList" :key="dl.examId" href="#" class="dl-item"
              style="
                background: var(--amber-soft);
                border: 1px solid var(--amber-border);
                margin-bottom: 8px;cursor: default;
              ">
              <div class="dl-icon" style="background: #fef3c7; color: #b45309">
                <i class="bi bi-hourglass-split"></i>
              </div>
              <div style="flex: 1">
                <div class="dl-name" style="color: #92400e">{{ dl.title }}</div>
                <div class="dl-time" style="color: #b45309">{{ dl.dueText }}</div>
              </div>
              
            </a>
          </div>

          <div class="card">
            <div class="section-head">
              <div>
                <div class="card-title">មតិកែលម្អថ្មីៗ</div>
              </div>
               <router-link :to="{name: 'AnalyticsResult'}" class="view-link">មើលលម្អិត</router-link>
            </div>

            <div v-if="feedbackList.length === 0" class="py-3 text-center text-muted">
              មិនមានមតិកែលម្អលើការប្រឡងថ្មីៗទេ
            </div>
            <div v-else v-for="fb in feedbackList" :key="fb.id" class="fb-row">
              <div class="fb-left">
                <div class="fb-icon" style="background: var(--em-soft); color: var(--em)">
                  <i class="bi bi-award"></i>
                </div>
                <div>
                  <div class="fb-quiz">{{ fb.examTitle || fb.title }}</div>
                  <div class="fb-when">Graded {{ fb.gradedAt || 'recently' }}</div>
                </div>
              </div>
              <span class="badge" :class="fb.score >= 50 ? 'badge-green' : 'badge-amber'">
                {{ fb.score }}/100
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="modal-wrap" :class="{ open: isModalOpen }" @click.self="closeModal">
      <div class="modal-box">
        <div class="modal-title">ចូលរួមថ្នាក់</div>
        <div class="modal-sub">សូមបញ្ចូលកូដថ្នាក់ដែលគ្រូរបស់អ្នកបានផ្តល់ឱ្យ</div>
        <label class="modal-label" for="classCode">កូដថ្នាក់រៀន</label>
        <input class="modal-input" :class="{ invalid: classCodeError }" id="classCode" ref="classCodeInput"
          v-model="classCode" type="text" placeholder="e.g. AB12-CD34" maxlength="12" autocomplete="off"
          @input="classCodeError = false" @keyup.enter="joinClass" />
        <div class="modal-actions">
          <button class="btn primary" type="button" style="justify-content: center; padding: 12px; font-size: 15px"
            @click="joinClass">
            <i class="bi bi-door-open"></i> ចូលរួមឥឡូវនេះ
          </button>
          <button class="btn" type="button" style="justify-content: center; padding: 11px; color: var(--txt-mu)"
            @click="closeModal">
            Cancel
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { nextTick, onMounted, ref } from "vue";
import {
  getDashboardStats,
  getRecentFeedback,
  getStudentPerformance,
  getUpcomingDeadlines
} from "@/api/student.api";

const isModalOpen = ref(false);
const classCode = ref("");
const classCodeError = ref(false);
const classCodeInput = ref(null);

const isLoading = ref(false);
const dashboardData = ref({ stats: {}, upcomingDeadlines: [] });
const deadlineList = ref([]);
const feedbackList = ref([]);
const performanceList = ref([]);

function getSubjectColor(index) {
  const colors = ["#10b981", "#3b82f6", "#8b5cf6", "#f59e0b", "#ef4444"];
  return colors[index % colors.length];
}

async function loadDashboardContent() {
  try {
    isLoading.value = true;
    const [resStats, resFeedback, resPerformance, resDeadlineList] = await Promise.all([
      getDashboardStats(),
      getRecentFeedback(),
      getStudentPerformance(),
      getUpcomingDeadlines()
    ]);

    if (resStats.data?.success) {
      dashboardData.value = resStats.data.data;
    }

    if (resFeedback.data?.success) {
      feedbackList.value = resFeedback.data.data || [];
    }

    if (resPerformance.data?.success) {
      performanceList.value = resPerformance.data.data || [];
    }
    
    if (resDeadlineList.data?.success) {
      deadlineList.value = resDeadlineList.data.data || [];
    }

  } catch (error) {
    console.error("Error loading student dashboard content:", error);
  } finally {
    setTimeout(() => {
      isLoading.value = false;
    }, 450);
  }
}

async function openModal() {
  classCode.value = "";
  classCodeError.value = false;
  isModalOpen.value = true;
  await nextTick();
  classCodeInput.value?.focus();
}

function closeModal() { isModalOpen.value = false; }

function joinClass() {
  const code = classCode.value.trim();
  if (!code) {
    classCodeError.value = true;
    classCodeInput.value?.focus();
    return;
  }
  alert("Successfully joined class: " + code.toUpperCase());
  closeModal();
}

onMounted(loadDashboardContent);
</script>

<style scoped>
.student-dashboard {
  --em: #10b981;
  --em-dk: #059669;
  --em-soft: #d1fae5;
  --em-text: #065f46;
  --blue-soft: #dbeafe;
  --amber-soft: #fef3c7;
  --amber-border: #fde68a;
  --amber-text: #b45309;
  --red-soft: #fee2e2;
  --red-border: #fee2e2;
  --txt: #0f172a;
  --txt-mu: #64748b;
  --txt-lt: #94a3b8;
  --border: #e2e8f0;
  --surf: #ffffff;
  --radius: 14px;
  --radius-sm: 9px;

  display: flex;
  flex-direction: column;
  gap: 20px;
  color: var(--txt);
  font-family: "Kantumruy Pro", sans-serif;
  min-width: 0;
}

.student-dashboard * {
  box-sizing: border-box;
}

.student-dashboard a {
  text-decoration: none;
  color: inherit;
}

::-webkit-scrollbar {
  width: 5px;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 99px;
}

/* ── 🌟 SKELETON PULSE ANIMATION ── */
.skeleton-dashboard-wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
}

@keyframes skeleton-pulse {
  0% { background-color: #f1f5f9; }
  50% { background-color: #e2e8f0; }
  100% { background-color: #f1f5f9; }
}

.skeleton-element {
  animation: skeleton-pulse 1.5s ease-in-out infinite;
  background-color: #f1f5f9;
  border-radius: 4px;
}

.skeleton-card {
  cursor: default !important;
}

.skeleton-icon {
  width: 46px;
  height: 46px;
  border-radius: 12px;
}

.skeleton-line {
  height: 14px;
  width: 100%;
}

.skeleton-btn {
  height: 38px;
  border-radius: var(--radius-sm);
}

.skeleton-circle {
  border-radius: 50%;
}

/* Helper Utilities */
.w-10 { width: 10%; }
.w-15 { width: 15%; }
.w-25 { width: 25%; }
.w-40 { width: 40%; }
.w-50 { width: 50%; }
.w-60 { width: 60%; }
.w-75 { width: 75%; }
.w-100 { width: 100%; }
.ms-auto { margin-left: auto; }
.mb-2 { margin-bottom: 8px; }

/* ── STATS ── */
.stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
}
.stat {
  background: var(--surf);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 24px 20px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;          
  
  cursor: pointer;
  transition: 0.15s;
}

.stat:hover {
  border-color: #cbd5e1;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.05);
}

.stat-icon {
  width: 46px;
  height: 46px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 21px;
  flex-shrink: 0;
  background: inherit;
}
.icon-green { background: var(--em-soft) !important; color: var(--em) !important; }
.icon-blue { background: var(--blue-soft) !important; color: #3b82f6 !important; }
.icon-orange { 
    background: #ffedd5 !important;
    color: #ea580c !important;     
}

.stat-label {
  font-size: 12.5px;
  font-weight: 600 !important;
  color: var(--txt-mu);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 0px; 
}

.stat-value {
  font-size: 26px;
  font-weight: 700;
  line-height: 1;
  color: var(--txt);
  margin-top: 15px;
}

/* ── GRID ── */
.grid {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 16px;
}

.left-col {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.right-col {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

/* Modal */
.modal-wrap {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.4);
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.modal-wrap.open {
  display: flex;
}

.modal-box {
  background: var(--surf);
  border-radius: 16px;
  padding: 30px;
  width: 360px;
  border: 1px solid var(--border);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.12);
}

.modal-title {
  font-size: 17px;
  font-weight: 700;
  margin-bottom: 3px;
}

.modal-sub {
  font-size: 13px;
  color: var(--txt-mu);
  margin-bottom: 20px;
  line-height: 1.5;
}

.modal-label {
  font-size: 12px;
  font-weight: 700;
  color: var(--txt-mu);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
  display: block;
}

.modal-input {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  background: #f8fafc;
  color: var(--txt);
  outline: none;
  font-family: inherit;
  transition: 0.15s;
}

.modal-input:focus {
  border-color: var(--em);
  background: var(--surf);
}

.modal-input.invalid {
  border-color: #ef4444;
}

.modal-actions {
  display: flex;
  flex-direction: column;
  gap: 9px;
  margin-top: 18px;
}

/* ── CARD ── */
.card {
  background: var(--surf);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 22px;
}

.card-title {
  font-size: 16px;
  font-weight: 700;
  color: var(--txt);
  margin-bottom: 14px;
}

.card-title.no-margin {
  margin-bottom: 0;
}

/* ── BUTTONS ── */
.qa-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
}

.qa-btns {
  display: flex;
  gap: 9px;
  flex-wrap: wrap;
}

.btn {
  padding: 10px 18px;
  border-radius: var(--radius-sm);
  font-size: 14px;
  font-weight: 600;
  border: 1px solid var(--border);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  transition: 0.15s;
  background: var(--surf);
  color: var(--txt);
  font-family: inherit;
}

.btn:hover {
  background: #f8fafc;
  border-color: #cbd5e1;
}

.btn i {
  font-size: 16px;
}

.btn.primary {
  background: var(--em);
  color: #fff;
  border-color: var(--em);
}

.btn.primary:hover {
  background: var(--em-dk);
  border-color: var(--em-dk);
}

/* ── PERFORMANCE ── */
.perf-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 18px;
}

.gpa-block {
  text-align: right;
}

.gpa-val {
  font-size: 26px;
  font-weight: 700;
  color: var(--txt);
  line-height: 1;
}

.gpa-lbl {
  font-size: 12px;
  color: var(--txt-lt);
  font-weight: 500;
}

.view-link {
  font-size: 13px;
  color: var(--em);
  font-weight: 600;
}

.view-link:hover {
  color: var(--em-dk);
}

.subj-row {
  display: flex;
  align-items: center;
  gap: 13px;
  padding: 11px 0;
  border-bottom: 1px solid #f1f5f9;
}

.subj-row:last-child {
  border-bottom: none;
}

.subj-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.subj-info {
  flex: 1;
}

.subj-name {
  font-size: 14px;
  font-weight: 600;
  color: var(--txt);
}

.subj-track {
  flex: 2;
  height: 5px;
  background: #f1f5f9;
  border-radius: 99px;
  overflow: hidden;
}

.subj-fill {
  height: 100%;
  border-radius: 99px;
}

.subj-pct {
  font-size: 13px;
  font-weight: 700;
  min-width: 36px;
  text-align: right;
  color: var(--txt-mu);
}

.perf-footer {
  margin-top: 16px;
  padding-top: 14px;
  border-top: 1px solid #f1f5f9;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  color: var(--txt-lt);
}

.badge {
  padding: 4px 12px;
  border-radius: 99px;
  font-size: 12px;
  font-weight: 700;
}

.badge-green {
  background: var(--em-soft);
  color: var(--em-text);
}

.badge-amber {
  background: var(--amber-soft);
  color: #92400e;
}

/* ── DEADLINES ── */
.section-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 16px;
}

.dl-item {
  display: flex;
  align-items: center;
  gap: 13px;
  padding: 13px;
  border-radius: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: 0.1s;
}

.dl-item:last-child {
  margin-bottom: 0;
}

.dl-item:hover {
  opacity: 0.88;
}

.dl-icon {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 17px;
  flex-shrink: 0;
}

.dl-name {
  font-size: 14px;
  font-weight: 700;
}

.dl-time {
  font-size: 12px;
  font-weight: 700;
}

/* ── FEEDBACK ── */
.fb-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid #f1f5f9;
}

.fb-row:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.fb-left {
  display: flex;
  align-items: center;
  gap: 11px;
}

.fb-icon {
  width: 36px;
  height: 36px;
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 17px;
  flex-shrink: 0;
}

.fb-quiz {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 2px;
}

.fb-when {
  font-size: 12px;
  color: var(--txt-lt);
}
</style>