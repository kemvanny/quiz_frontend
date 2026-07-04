<template>
  <div class="quiz-builder-container">
    <TeacherExamDetail
      :roomName="examData.room_name || 'Room'"
      :examCount="questions.length"
      :pageTitle="examData.title || 'Today Exams'"
      currentTabLabel="វិញ្ញាសា"
      style="flex-shrink: 0"
    />

    <div class="app-shell flex-grow-1 overflow-hidden">
      <div v-if="loading" class="text-center py-5">
        <div class="spinner-border text-success" role="status"></div>
        <p class="mt-3 text-muted small">កំពុងផ្ទុកទិន្នន័យ...</p>
      </div>

      <div v-else-if="questions.length > 0" class="workspace">
        <div class="panel d-flex flex-column">
          <div class="panel-head">
            <span class="panel-lbl">បញ្ជីសំណួរ</span>
            <span class="panel-count">{{ questions.length }} សំណួរ</span>
          </div>
          <div class="q-nav-scroll overflow-y-auto">
            <div
              v-for="(q, idx) in questions"
              :key="q.id"
              class="q-nav-item"
              :class="{ active: selectedQuestionIndex === idx }"
              @click="selectQuestion(idx)"
            >
              <span>សំណួរទី {{ getKhmerNumber(idx + 1) }}</span>
              <span class="q-nav-pts-badge">{{ q.pts || 0 }} ភ.</span>
            </div>
          </div>
        </div>

        <div class="feed-col">
          <div
            v-for="(q, qIdx) in questions"
            :key="q.id"
            class="q-card"
            :class="{ 'active-card': selectedQuestionIndex === qIdx }"
            @click="selectedQuestionIndex = qIdx"
          >
            <div
              class="q-card-header d-flex justify-content-between align-items-center px-4 py-3 border-bottom bg-light bg-opacity-50"
            >
              <span class="fw-extrabold text-dark fs-6"
                >សំណួរទី {{ getKhmerNumber(qIdx + 1) }}</span
              >

              <div class="pts-pill">
                <label>ពិន្ទុ</label>
                <input
                  type="number"
                  v-model.number="q.pts"
                  class="pts-input"
                  min="0"
                />
              </div>
            </div>

            <div class="p-4">
              <div class="mb-3 text-start">
                <label class="form-label small fw-bold text-muted mb-2"
                  >ខ្លឹមសារសំណួរ</label
                >
                <textarea
                  v-model="q.text"
                  class="q-field"
                  rows="3"
                  placeholder="សរសេរសំណួររបស់អ្នកនៅទីនេះ..."
                ></textarea>
              </div>

              <div class="mb-2 text-start">
                <label class="form-label small fw-bold text-muted mb-2"
                  >ជម្រើសចម្លើយ</label
                >
                <div class="d-flex flex-column gap-3">
                  <div
                    v-for="(choice, cIdx) in q.choices"
                    :key="cIdx"
                    class="choice-row"
                    :class="{ 'correct-highlight': choice.isCorrect }"
                  >
                    <div class="choice-lbl">
                      {{ String.fromCharCode(65 + cIdx) }}
                    </div>

                    <input
                      type="radio"
                      :name="`q_${q.id}`"
                      class="form-check-input cr"
                      :checked="choice.isCorrect"
                      @change="setCorrectChoice(qIdx, cIdx)"
                    />

                    <input
                      type="text"
                      v-model="choice.text"
                      class="choice-input"
                      placeholder="សរសេរចម្លើយ..."
                    />

                    <button
                      class="remove-choice-btn text-muted"
                      @click="removeChoice(qIdx, cIdx)"
                      title="លុបចម្លើយ"
                    >
                      <i class="fas fa-trash-alt"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div
              class="px-4 pb-4 pt-2 d-flex justify-content-end gap-2 border-top border-light-subtle"
            >
              <button
                class="btn btn-sm btn-action-delete"
                @click="openDeleteModal(q.id, qIdx)"
              >
                <i class="fas fa-trash-alt me-1"></i> លុបសំណួរ
              </button>
              <button
                class="btn btn-sm btn-action-update text-white"
                @click="handleSingleQuestionSave(qIdx)"
                :disabled="savingMap[qIdx]"
              >
                <span
                  v-if="savingMap[qIdx]"
                  class="spinner-border spinner-border-sm me-1 text-white"
                ></span>

                <i v-else class="fas fa-save me-1"></i>

                {{
                  savingMap[qIdx] ? "កំពុងរក្សាទុក..." : "ធ្វើបច្ចុប្បន្នភាព"
                }}
              </button>
            </div>
          </div>
        </div>

        <div class="panel overview-panel p-4 d-flex flex-column">
          <div class="panel-head border-0 pb-0 pt-0 px-0">
            <span class="panel-lbl">
              <i class="fas fa-chart-pie me-2 text-success"></i>
              ទិដ្ឋភាពទូទៅនៃវិញ្ញាសា
            </span>
          </div>

          <div class="gauge-container mx-auto my-4">
            <svg class="svg-ring" viewBox="0 0 120 120">
              <circle class="ring-bg" cx="60" cy="60" r="50" />
              <circle
                class="ring-fill"
                cx="60"
                cy="60"
                r="50"
                :style="{ strokeDashoffset: strokeDashoffset }"
              />
            </svg>
            <div class="gauge-label-content">
              <h3 class="mb-0 fw-extrabold text-dark">{{ totalPoints }}</h3>
              <span class="gauge-denominator text-muted"> ពិន្ទុសរុប</span>
            </div>
          </div>

          <div class="metrics-grid mb-4">
            <div class="metric-box">
              <span class="metric-label">ចំនួនសំណួរ</span>
              <span class="metric-value">{{ questions.length }} សំណួរ</span>
            </div>
            <div class="metric-box">
              <span class="metric-label">ពិន្ទុ/សំណួរ</span>
              <span class="metric-value">
                {{
                  questions.length > 0
                    ? (totalPoints / questions.length).toFixed(1)
                    : 0
                }}
                ពិន្ទុ
              </span>
            </div>
          </div>

          <div class="info-callout mb-4">
            <i class="fas fa-info-circle text-success me-2 mt-1"></i>
            <span>ពិន្ទុសរុបនឹងត្រូវគណនាជាក់ស្តែងផ្អែកលើសំណួរដែលបានបញ្ចូល</span>
          </div>

          <div class="d-flex flex-column gap-2 mt-auto">
            <button class="btn btn-outline-back w-100 fw-bold" @click="goBack">
              <i class="fas fa-arrow-left me-1"></i> ត្រឡប់ក្រោយ
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showDeleteModal" class="modal-overlay">
      <div class="modal-box" @click.stop>
        <div class="modal-icon danger">
          <i class="fas fa-trash-alt"></i>
        </div>

        <h3 class="modal-title fw-semibold">លុបសំណួរ</h3>

        <p class="modal-desc mb-2">តើអ្នកប្រាកដថាចង់លុបសំណួរនេះមែនទេ?</p>
        <p class="modal-desc text-danger fw-semibold">
          សកម្មភាពនេះមិនអាចត្រឡប់វិញបានទេ
        </p>

        <div class="modal-actions">
          <button
            class="btn-cancel"
            :disabled="isDeleting"
            @click="showDeleteModal = false"
          >
            បោះបង់
          </button>

          <button
            class="btn-delete"
            :disabled="isDeleting"
            @click="confirmDeleteQuestion"
          >
            <span
              v-if="isDeleting"
              class="spinner-border spinner-border-sm me-1"
            ></span>
            លុបសំណួរ
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import api from "@/api/axiosInstance";
import { useExamStore } from "@/stores/examStore";
import {
  getQuestionsForTeacher,
  updateQuestion,
  deleteQuestion,
} from "@/api/exam.api";

const route = useRoute();
const router = useRouter();
const examStore = useExamStore();
const toast = useToast();
const examId = route.params.examId;

const examData = ref({});
const questions = ref([]);
const loading = ref(false);
const selectedQuestionIndex = ref(0);
const showDeleteModal = ref(false);
const deletingQuestionId = ref(null);
const deletingIndex = ref(null);
const isDeleting = ref(false);
const savingMap = ref({});

const strokeDashoffset = computed(() => {
  const maxPoints = Number(examData.value.total_points) || 100;
  const ratio = Math.min(1, totalPoints.value / maxPoints);
  const circumference = 314;
  return circumference - ratio * circumference;
});
const getKhmerNumber = (num) => {
  const khmerNumbers = ["១", "២", "៣", "៤", "៥", "៦", "៧", "៨", "៩", "១០"];
  return khmerNumbers[num - 1] || num.toString();
};

const setCorrectChoice = (qIdx, cIdx) => {
  questions.value[qIdx].choices.forEach((c, idx) => {
    c.isCorrect = idx === cIdx;
  });
};

const removeChoice = (qIdx, cIdx) => {
  if (questions.value[qIdx].choices.length <= 2) {
    toast.warning("សំណួរត្រូវតែមានចម្លើយយ៉ាងហោចណាស់ពីរ!");
    return;
  }
  questions.value[qIdx].choices.splice(cIdx, 1);
};

const fetchAll = async () => {
  loading.value = true;
  try {
    const [examRes, qRes] = await Promise.all([
      api.get(`/exams/${examId}`),
      getQuestionsForTeacher(examId),
    ]);

    const data = examRes.data?.data || examRes.data;
    const rawData = qRes.data?.data || qRes.data;

    examData.value = data;

    if (data) {
      examStore.setExamTitle(data.title || "គ្មានចំណងជើង");
      examStore.setRoomName(data.room_name || "ថ្នាក់រៀន");
      examStore.setQuestionCount(rawData.length);
    }

    questions.value = rawData.map((q) => {
      let opts = [];
      try {
        opts =
          typeof q.options === "string" ? JSON.parse(q.options) : q.options;
      } catch (e) {
        opts = [];
      }

      return {
        id: q.id,
        text: q.question,
        pts: q.points || 0,
        choices: opts.map((opt) => ({
          text: opt,
          isCorrect: q.correct_answer && q.correct_answer.includes(opt),
        })),
      };
    });
  } catch (e) {
    console.error(e);
    toast.error("ទាញយកទិន្នន័យបរាជ័យ");
  } finally {
    loading.value = false;
  }
};

const totalPoints = computed(() =>
  questions.value.reduce((sum, q) => sum + (Number(q.pts) || 0), 0),
);
const selectQuestion = (idx) => {
  selectedQuestionIndex.value = idx;
};

const handleSingleQuestionSave = async (idx) => {
  const q = questions.value[idx];

  savingMap.value[idx] = true;

  try {
    const payload = {
      question: q.text,
      question_type: "multiple_choice",
      options: q.choices.map((c) => c.text),
      correct_answer: q.choices.find((c) => c.isCorrect)?.text || "",
      points: Number(q.pts) || 0,
    };

    await updateQuestion(q.id, payload);
    toast.success("រក្សាទុកជោគជ័យ!");
  } catch (e) {
    toast.error("បរាជ័យ!");
  } finally {
    savingMap.value[idx] = false;
  }
};

const openDeleteModal = (qId, idx) => {
  deletingQuestionId.value = qId;
  deletingIndex.value = idx;
  showDeleteModal.value = true;
};
const confirmDeleteQuestion = async () => {
  if (isDeleting.value) return;

  isDeleting.value = true;

  try {
    await deleteQuestion(deletingQuestionId.value);

    questions.value.splice(deletingIndex.value, 1);
    examStore.setQuestionCount(questions.value.length);

    toast.success("បានលុបសំណួរជោគជ័យ!");

    if (selectedQuestionIndex.value >= questions.value.length) {
      selectedQuestionIndex.value = Math.max(0, questions.value.length - 1);
    }

    showDeleteModal.value = false;
  } catch (e) {
    toast.error("បរាជ័យក្នុងការលុប!");
  } finally {
    isDeleting.value = false;
  }
};

const goBack = () => router.push("/teacher/room-management");

onMounted(() => {
  fetchAll();
});
</script>

<style scoped>
.quiz-builder-container {
  --em: #10b981;
  --em-dk: #059669;
  --em-soft: #ecfdf5;
  --em-mid: rgba(16, 185, 129, 0.12);
  --txt: #0f172a;
  --txt-m: #334155;
  --txt-mu: #64748b;
  --surf: #ffffff;
  --bdr: #e2e8f0;
  --r-md: 12px;
  --r-lg: 16px;
  --r-xl: 20px;
  --sh-sm: 0 4px 18px rgba(0, 0, 0, 0.03);
  --sh-md: 0 8px 24px rgba(0, 0, 0, 0.06);

  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  font-family: "Kantumruy Pro", "Inter", sans-serif;
  color: var(--txt);
}

.app-shell {
  display: flex;
  height: 100%;
  overflow: hidden;
}

/* Three-column Dashboard Grid */
.workspace {
  flex: 1;
  display: grid;
  grid-template-columns: 250px 1fr 280px;
  gap: 16px;
  padding: 24px;
  height: calc(100vh - 70px);
  overflow: hidden;
}

/* Left & Right Sidebar Panels */
.panel {
  background: var(--surf);
  border: 1px solid var(--bdr);
  border-radius: var(--r-xl);
  box-shadow: var(--sh-sm);
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}

.panel-head {
  flex-shrink: 0;
  padding: 16px;
  border-bottom: 1px solid var(--bdr);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.panel-lbl {
  font-size: 0.72rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1.2px;
  color: var(--txt-mu);
}

.panel-count {
  font-size: 0.75rem;
  font-weight: 800;
  color: var(--em-dk);
  background: var(--em-soft);
  padding: 3px 10px;
  border-radius: 20px;
}
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.55);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99999;
  animation: fadeIn 0.18s ease;
}

.modal-box {
  width: 420px;
  background: rgba(255, 255, 255, 0.92);
  border-radius: 18px;
  padding: 26px 24px;
  text-align: center;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25);
  transform: translateY(0);
  animation: popIn 0.22s ease;
}

.modal-icon {
  width: 58px;
  height: 58px;
  margin: 0 auto 12px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
}

.modal-icon.danger {
  background: #fee2e2;
  color: #ef4444;
}

.modal-title {
  font-size: 1.25rem;
  color: #0f172a;
  margin-bottom: 8px;
}

.modal-desc {
  font-size: 0.9rem;
  color: #64748b;
  line-height: 1.5;
}

.modal-actions {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.btn-cancel {
  flex: 1;
  border: 1px solid #e2e8f0;
  background: #fff;
  padding: 10px 14px;
  border-radius: 10px;
  font-weight: 600;
  color: #334155;
  transition: 0.2s;
}

.btn-cancel:hover {
  background: #f1f5f9;
}

.btn-delete {
  flex: 1;
  border: none;
  background: linear-gradient(135deg, #ef4444, #dc2626);
  color: white;
  padding: 10px 14px;
  border-radius: 10px;
  font-weight: 600;
  box-shadow: 0 8px 20px rgba(239, 68, 68, 0.25);
  transition: 0.2s;
}

.btn-delete:hover {
  transform: translateY(-1px);
  box-shadow: 0 12px 26px rgba(239, 68, 68, 0.35);
}

/* animations */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes popIn {
  from {
    transform: scale(0.9);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

/* Question Selection List */
.q-nav-scroll {
  flex: 1;
  overflow-y: auto;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.q-nav-item {
  padding: 10px 14px;
  border-radius: var(--r-md);
  border: 1px solid var(--bdr);
  background: #fdfdfd;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--txt-m);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  flex-shrink: 0;
}

.q-nav-item:hover {
  border-color: var(--em-mid);
  background: var(--em-soft);
  color: var(--em-dk);
}

.q-nav-item.active {
  background: linear-gradient(135deg, var(--em), var(--em-dk));
  border-color: transparent;
  color: #ffffff;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.22);
}

.q-nav-pts-badge {
  font-size: 0.68rem;
  font-weight: 800;
  padding: 2px 8px;
  border-radius: 20px;
  background: var(--em-soft);
  color: var(--em);
}

.q-nav-item.active .q-nav-pts-badge {
  background: rgba(255, 255, 255, 0.2);
  color: #ffffff;
}

/* Center Column: Questions Feed */
.feed-col {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-right: 4px;
}
/* Circular Gauge Styling */
.gauge-container {
  position: relative;
  width: 130px;
  height: 130px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.svg-ring {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
  overflow: visible;
}

.ring-bg {
  fill: none;
  stroke: #f1f5f9;
  stroke-width: 9;
}

.ring-fill {
  fill: none;
  stroke: var(--em);
  stroke-width: 9;
  stroke-linecap: round;
  stroke-dasharray: 314; /* 2 * PI * r (50) ≈ 314 */
  transition: stroke-dashoffset 0.45s ease;
}

.gauge-label-content {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  line-height: 1.1;
  user-select: none;
}

.gauge-label-content h3 {
  font-size: 1.6rem;
  font-weight: 800;
  color: var(--txt);
}

.gauge-denominator {
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--txt-mu);
  margin-top: 2px;
}

/* Metadata breakdowns grid */
.metrics-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.metric-box {
  background: #f8fafc;
  border: 1px solid var(--bdr);
  border-radius: 12px;
  padding: 10px 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.metric-label {
  font-size: 0.68rem;
  font-weight: 700;
  color: var(--txt-mu);
  margin-bottom: 4px;
}

.metric-value {
  font-size: 0.82rem;
  font-weight: 800;
  color: var(--txt-m);
}

/* Info Banner callout */
.info-callout {
  background: var(--em-soft);
  border: 1px solid rgba(16, 185, 129, 0.15);
  border-radius: 12px;
  padding: 10px 14px;
  font-size: 0.74rem;
  font-weight: 600;
  color: #065f46;
  display: flex;
  align-items: flex-start;
  text-align: start;
  line-height: 1.4;
}

/* Back Button styling */
.btn-outline-back {
  border: 1px solid var(--bdr);
  background: #ffffff;
  color: var(--txt-m);
  font-size: 0.8rem;
  font-weight: 700;
  border-radius: 10px;
  padding: 8px 16px;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.btn-outline-back:hover {
  background-color: #f1f5f9;
  border-color: #cbd5e1;
  color: var(--txt);
}

.feed-col::-webkit-scrollbar {
  width: 5px;
}

.feed-col::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}

/* Question Editor Cards */
.q-card {
  background: var(--surf);
  border: 1px solid var(--bdr);
  border-radius: var(--r-xl);
  box-shadow: var(--sh-sm);
  overflow: hidden;
  flex-shrink: 0;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.q-card.active-card {
  border-color: var(--em-dk);
  box-shadow:
    0 0 0 3px rgba(16, 185, 129, 0.08),
    var(--sh-md);
}

/* Editable Points Pill Wrapper */
.pts-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: var(--em-soft);
  border-radius: 8px;
  padding: 4px 10px;
  border: 1px solid rgba(16, 185, 129, 0.15);
}

.pts-pill label {
  font-size: 0.68rem;
  font-weight: 800;
  color: var(--em-dk);
  margin: 0;
}

.pts-input {
  width: 36px;
  border: none;
  background: transparent;
  font-weight: 700;
  color: var(--em-dk);
  text-align: center;
  outline: none;
  font-size: 14px;
}

/* Textareas & Inputs */
.q-field {
  width: 100%;
  border: 1px solid var(--bdr);
  padding: 10px 14px;
  border-radius: var(--r-md);
  outline: none;
  font-size: 0.88rem;
  font-weight: 500;
  color: var(--txt);
  background: #fafbfc;
  transition: all 0.2s ease;
}

.q-field:focus {
  border-color: var(--em);
  background: #ffffff;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.08);
}

/* Choice Rows */
.choice-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
  border: 1px solid var(--bdr);
  border-radius: var(--r-md);
  background: #fafbfc;
  transition: all 0.18s ease;
}

.choice-row:hover {
  border-color: var(--em-mid);
  background: #ffffff;
}

.choice-row.correct-highlight {
  border-color: var(--em);
  background: var(--em-soft);
}

.choice-lbl {
  width: 26px;
  height: 26px;
  flex-shrink: 0;
  border-radius: 6px;
  background: var(--em-soft);
  color: var(--em-dk);
  font-weight: 800;
  font-size: 0.72rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.choice-row.correct-highlight .choice-lbl {
  background: var(--em-dk);
  color: #ffffff;
}

.choice-input {
  flex: 1;
  border: none;
  background: transparent;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--txt);
  outline: none;
  padding: 2px 4px;
}

.form-check-input.cr {
  width: 18px;
  height: 18px;
  cursor: pointer;
  border: 2px solid #cbd5e1;
  border-radius: 50%;
  transition: all 0.15s ease;
  margin: 0;
}

.form-check-input.cr:checked {
  background-color: var(--em-dk) !important;
  border-color: var(--em-dk) !important;
}

.remove-choice-btn {
  font-size: 0.85rem;
  background: transparent;
  border: none;
  color: var(--txt-mu);
  cursor: pointer;
  transition: color 0.15s ease;
  padding: 4px;
}

.remove-choice-btn:hover {
  color: #ef4444 !important;
}

.btn-action-delete {
  background-color: #fff;
  border: 1px solid #fee2e2;
  color: #ef4444;
  font-weight: 600;
  font-size: 0.78rem;
  border-radius: 8px;
  padding: 6px 14px;
  transition: all 0.2s;
}

.btn-action-delete:hover {
  background-color: #fef2f2;
  color: #ef4444;
  border: 1px solid #fee2e2;
}

.btn-action-update {
  background: linear-gradient(135deg, var(--em), var(--em-dk));
  color: #ffffff;
  border: none;
  font-weight: 600;
  font-size: 0.78rem;
  border-radius: 8px;
  padding: 6px 16px;
  transition: all 0.2s;
  box-shadow: 0 2px 8px rgba(16, 185, 129, 0.15);
}

.btn-action-update:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.25);
  color: #ffffff;
}

.overview-panel {
  height: fit-content;
}

.progress-circle {
  width: 110px;
  height: 110px;
  border-radius: 50%;
  border: 6px solid var(--em-soft);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--em-dk);
  background: var(--em-soft);
  box-shadow: inset 0 2px 6px rgba(16, 185, 129, 0.05);
}

.btn-outline-back {
  border: 1px solid var(--bdr);
  background: #ffffff;
  color: var(--txt-m);
  font-size: 0.8rem;
  border-radius: 10px;
  padding: 8px 16px;
  transition: all 0.2s;
}

.btn-outline-back:hover {
  background-color: #f1f5f9;
  border-color: #cbd5e1;
}

/* Adaptive Screens rulesets */
@media (max-width: 992px) {
  .workspace {
    grid-template-columns: 1fr;
    height: auto;
    overflow-y: auto;
  }
}
</style>
