<template>
  <div>
      <div style="max-width: 1000px; ">
        <!-- Tabs -->
        <div class="tab-row">
          <div class="tab-pills">
            <button class="tab-pill active">
              To-Do
              <span class="count-badge" style="background: #fef2f2; color: #dc2626">{{ todoCount }}</span>
            </button>
            <button class="tab-pill">Completed</button>
            <button class="tab-pill">Overdue</button>
          </div>
          <div style="font-size: 0.8rem; color: var(--txt-mu); font-weight: 600">
            <i class="fas fa-calendar-week me-1"></i> Week of May 18, 2026
          </div>
        </div>

        <!-- SECTION: Urgent -->
        <div class="section-label">Urgent — Due Today</div>

        <!-- Exam card from join code -->
        <div v-if="isExamLoading" class="task-card task-card-static type-exam">
          <div class="task-icon" style="background: #fef2f2; color: #ef4444">
            <i class="fas fa-circle-notch fa-spin"></i>
          </div>
          <div class="flex-grow-1">
            <div class="task-meta">
              <span class="meta-chip" style="background: #fef2f2; color: #dc2626"><i
                  class="fas fa-cloud-download-alt"></i> Loading Exam</span>
            </div>
            <div class="task-title">Fetching assignment exam...</div>
            <div class="task-details">
              <span class="task-detail" style="font-weight: 400"><i class="fas fa-link"></i> Code {{ examJoinCode
                }}</span>
            </div>
          </div>
        </div>

        <a v-else-if="joinedExam" href="#" class="task-card type-exam" @click.prevent>
          <div class="task-icon" style="background: #fef2f2; color: #ef4444">
            <i class="fas fa-bolt"></i>
          </div>
          <div class="flex-grow-1">
            <div class="task-meta">
              <span class="meta-chip" style="background: #fef2f2; color: #dc2626"><i class="fas fa-check-circle"></i>
                Ready</span>
              <span class="meta-chip" style="background: #f1f5f9; color: var(--txt-m)">{{ examTypeLabel }}</span>
              <span class="meta-chip" style="background: var(--em-soft); color: var(--em-dk)"><i
                  class="fas fa-link"></i> {{ examJoinCode }}</span>
            </div>
            <div class="task-title">{{ joinedExam.title }}</div>
            <div class="task-details">
              <span class="task-detail" style="color: #dc2626; font-weight: 400"><i class="fas fa-clipboard-check"></i>
                {{ examResponseMessage || "Exam is correct. You can start exam." }}</span>
              <span class="task-detail" style="font-weight: 400"><i class="fas fa-stopwatch"></i>
                {{ joinedExam.duration }} minutes</span>
              <span class="task-detail" style="font-weight: 400"><i class="fas fa-star"></i>
                {{ joinedExam.total_points }} points</span>
            </div>
          </div>
          <button class="task-cta cta-red" type="button" @click.stop.prevent="startExam">
            Start Exam
          </button>
        </a>

        <div v-else class="task-card task-card-static type-exam">
          <div class="task-icon" style="background: #fef2f2; color: #ef4444">
            <i class="fas fa-triangle-exclamation"></i>
          </div>
          <div class="flex-grow-1">
            <div class="task-meta">
              <span class="meta-chip" style="background: #fef2f2; color: #dc2626"><i
                  class="fas fa-circle-exclamation"></i> Unable to Load</span>
              <span class="meta-chip" style="background: #f1f5f9; color: var(--txt-m)">{{ examJoinCode }}</span>
            </div>
            <div class="task-title">Exam assignment is not available</div>
            <div class="task-details">
              <span class="task-detail" style="color: #dc2626; font-weight: 400"><i class="fas fa-info-circle"></i> {{
                examError }}</span>
            </div>
          </div>
          <button class="task-cta cta-red" type="button" @click="fetchJoinedExam">
            Retry
          </button>
        </div>
      </div>
    </div>
</template>
<script setup>
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { joinExam } from "@/api/exam.api";

const route = useRoute();

const defaultExamCode = "e104abc7";
const joinedExam = ref(null);
const isExamLoading = ref(false);
const examError = ref("");
const examResponseMessage = ref("");

const examJoinCode = computed(() => {
  const code = route.query.code || route.query.examCode || defaultExamCode;
  return Array.isArray(code) ? code[0] : String(code);
});

const examTypeLabel = computed(() => {
  const type = joinedExam.value?.type || "exam";
  return type.charAt(0).toUpperCase() + type.slice(1);
});

const todoCount = computed(() => (joinedExam.value || isExamLoading.value ? 3 : 2));

function getExamFromResponse(payload) {
  return payload?.exam || payload?.data?.exam || payload?.data || null;
}

async function fetchJoinedExam() {
  const code = examJoinCode.value.trim();

  if (!code) {
    examError.value = "Missing exam code.";
    joinedExam.value = null;
    return;
  }

  try {
    isExamLoading.value = true;
    examError.value = "";

    const response = await joinExam(code);
    const payload = response.data;
    const exam = getExamFromResponse(payload);

    if (payload?.result === false || !exam) {
      throw new Error(payload?.msg || payload?.message || "No exam data returned.");
    }

    joinedExam.value = exam;
    examResponseMessage.value = payload?.msg || payload?.message || "";
  } catch (error) {
    joinedExam.value = null;
    examError.value =
      error.response?.data?.msg ||
      error.response?.data?.message ||
      error.message ||
      "Failed to fetch exam.";
  } finally {
    isExamLoading.value = false;
  }
}

function startExam() {
  if (!joinedExam.value) return;

  sessionStorage.setItem("active_exam_id", joinedExam.value.id);
  sessionStorage.setItem("active_exam", JSON.stringify(joinedExam.value));
  alert(`Starting ${joinedExam.value.title}`);
}

onMounted(fetchJoinedExam);
</script>
<style scoped>
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

:root {
  --em: #10b981;
  --em-dk: #059669;
  --em-soft: #ecfdf5;
  --txt: #0f172a;
  --txt-m: #475569;
  --txt-mu: #94a3b8;
  --surf: #ffffff;
  --bdr: #e2e8f0;
  --sh-sm: 0 4px 12px rgba(0, 0, 0, 0.03);
  --sh-hover: 0 16px 36px rgba(0, 0, 0, 0.07);
}

body {
  font-family: "Inter", sans-serif;
  background-color: #f4f7fe;
  background-image:
    radial-gradient(at 0% 0%, hsla(158, 76%, 76%, 0.6) 0, transparent 50%),
    radial-gradient(at 100% 100%, hsla(209, 43%, 80%, 0.6) 0, transparent 50%);
  height: 100vh;
  overflow: hidden;
  color: var(--txt);
}

a {
  text-decoration: none;
  color: inherit;
}

.workspace {
  flex: 1;
  overflow-y: auto;
  padding: 36px 40px;
}

/* ── TABS ── */
.tab-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 28px;
}

.tab-pills {
  display: flex;
  gap: 6px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border: 1px solid var(--bdr);
  border-radius: 14px;
  padding: 5px;
  box-shadow: var(--sh-sm);
}

.tab-pill {
  padding: 7px 20px;
  border-radius: 10px;
  font-size: 0.83rem;
  font-weight: 700;
  color: var(--txt-mu);
  cursor: pointer;
  border: none;
  background: transparent;
  transition: 0.18s;
  display: flex;
  align-items: center;
  gap: 7px;
}

.tab-pill.active {
  background: #fff;
  color: var(--em-dk);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.tab-pill:hover:not(.active) {
  color: var(--txt);
}

.count-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  font-size: 0.65rem;
  font-weight: 800;
}

/* ── SECTION LABEL ── */
.section-label {
  font-size: 0.73rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--txt-mu);
  margin-bottom: 14px;
  margin-top: 32px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.section-label::after {
  content: "";
  flex: 1;
  height: 1px;
  background: var(--bdr);
}

/* ── TASK CARD ── */
.task-card {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border: 1px solid var(--bdr);
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px 24px;
  margin-bottom: 12px;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: var(--sh-sm);
  position: relative;
  overflow: hidden;
  cursor: pointer;
}

/* Left accent stripe */
.task-card::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 5px;
  border-radius: 20px 0 0 20px;
  transition: width 0.2s;
}

.task-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--sh-hover);
}

.task-card:hover::before {
  width: 6px;
}

.task-card-static {
  cursor: default;
}

.task-card-static:hover {
  transform: none;
}

.task-card-static:hover .task-icon {
  transform: none;
}

.task-card-static .task-cta {
  cursor: pointer;
}

.task-card.type-exam::before {
  background: #ef4444;
}

.task-card.type-exam:hover {
  border-color: rgba(239, 68, 68, 0.2);
  box-shadow: 0 16px 36px rgba(239, 68, 68, 0.1);
}

.task-card.type-assign::before {
  background: #3b82f6;
}

.task-card.type-assign:hover {
  border-color: rgba(59, 130, 246, 0.2);
  box-shadow: 0 16px 36px rgba(59, 130, 246, 0.1);
}

.task-card.type-done::before {
  background: var(--em);
}

.task-card.type-done:hover {
  border-color: rgba(16, 185, 129, 0.2);
  box-shadow: 0 16px 36px rgba(16, 185, 129, 0.1);
}

/* Icon */
.task-icon {
  width: 52px;
  height: 52px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  flex-shrink: 0;
  transition: transform 0.25s;
}

.task-card:hover .task-icon {
  transform: scale(1.08) rotate(-4deg);
}

/* Meta */
.task-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 7px;
  flex-wrap: wrap;
}

.meta-chip {
  padding: 3px 10px;
  border-radius: 7px;
  font-size: 0.72rem;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.task-title {
  font-size: 1rem;
  font-weight: 700;
  color: var(--txt);
  margin-bottom: 8px;
  line-height: 1.3;
}

.task-details {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.task-detail {
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--txt-mu);
  display: flex;
  align-items: center;
  gap: 5px;
}

/* CTA Button */
.task-cta {
  margin-left: auto;
  flex-shrink: 0;
  padding: 10px 22px;
  border-radius: 13px;
  font-weight: 700;
  font-size: 0.83rem;
  border: none;
  cursor: pointer;
  transition: all 0.22s;
  white-space: nowrap;
}

.task-cta:hover {
  transform: scale(1.04);
}

.cta-red {
  background: #fef2f2;
  color: #dc2626;
  border: 1.5px solid #fee2e2;
}

.cta-red:hover {
  background: #ef4444;
  color: #fff;
}

.cta-blue {
  background: #eff6ff;
  color: #2563eb;
  border: 1.5px solid #dbeafe;
}

.cta-blue:hover {
  background: #3b82f6;
  color: #fff;
}

.cta-green {
  background: var(--em-soft);
  color: var(--em-dk);
  border: 1.5px solid #bbf7d0;
}

.cta-green:hover {
  background: var(--em);
  color: #fff;
}

/* Scrollbar */
::-webkit-scrollbar {
  width: 5px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: #e2e8f0;
  border-radius: 99px;
}
</style>
