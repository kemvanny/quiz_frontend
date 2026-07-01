<template>
  <div class="quiz-builder-container" ref="containerRef" :style="{ height: containerHeight }">
    <div class="app-shell flex-grow-1 overflow-hidden">
      <div class="main-col">
        <div class="workspace">
          <div class="panel d-flex flex-column">
            <div class="panel-head flex-shrink-0">
              <span class="panel-lbl">បញ្ជីសំណួរ</span>
              <span class="panel-count" id="qCountLabel">{{ questions.length }} សំណួរ</span>
            </div>

            <div class="q-nav-scroll" ref="qNavScrollRef">
              <div v-for="(q, idx) in questions" :key="idx" :id="`qnav-${idx}`" class="q-nav-item slide-in"
                :class="{ active: selectedQuestionIndex === idx }" @click="selectQuestion(idx)">
                <span class="d-flex align-items-center gap-1">
                  <i :class="q.question_type === 'true_false' ? 'fas fa-toggle-on' : 'fas fa-list-ul'"
                    style="font-size: 0.62rem"></i>
                  សំណួរទី {{ getKhmerNumber(idx + 1) }}
                </span>
                <span class="q-badge">{{ q.pts }} ពិន្ទុ</span>
              </div>
            </div>

            <div class="p-2 border-top bg-white flex-shrink-0 d-flex flex-column gap-2">
              <button class="btn btn-sm fw-bold rounded-3 border-0 add-q-btn w-100 py-2" style="
                  border: 1.5px dashed rgba(16, 185, 129, 0.35) !important;
                  background: rgba(16, 185, 129, 0.04);
                  color: var(--em);
                  font-size: 0.78rem;
                " @click="addNewQuestion('multiple_choice')">
                <i class="fas fa-plus-circle me-1"></i> សំណួរជ្រើសរើសចម្លើយ
              </button>
              <button class="btn btn-sm fw-bold rounded-3 border-0 add-q-btn-tf w-100 py-2" style="
                  border: 1.5px dashed rgba(59, 130, 246, 0.35) !important;
                  background: rgba(59, 130, 246, 0.04);
                  color: #3b82f6;
                  font-size: 0.78rem;
                " @click="addNewQuestion('true_false')">
                <i class="fas fa-toggle-on me-1"></i> សំណួរ​ true/false
              </button>
            </div>
          </div>

          <div class="feed-col" id="questionFeed">
            <div class="quiz-info-card p-4 rounded-4 border-0 mb-4"
              style="background-color: #f8fafc; border: 1px solid #e2e8f0">
              <h5 class="fw-bold text-dark mb-3 d-flex align-items-center">
                <i class="fas fa-edit me-2" style="color: var(--em)"></i>
                ព័ត៌មានវិញ្ញាសា
              </h5>

              <div class="mb-3">
                <label class="form-label fw-bold small text-uppercase text-muted">ចំណងជើងវិញ្ញាសា</label>
                <input type="text" v-model="quizTitle" class="form-control rounded-3 py-2 px-3 border-0 shadow-sm"
                  placeholder="សូមសរសេរចំណងជើងវិញ្ញាសា" />
              </div>

              <div class="mb-3">
                <label class="form-label fw-bold small text-uppercase text-muted">ការណែនាំ</label>
                <textarea v-model="quizInstructions" class="form-control rounded-3 py-2 px-3 border-0 shadow-sm"
                  rows="2" placeholder="សូមសរសេរការណែនាំខ្លីៗសម្រាប់សិស្ស"></textarea>
              </div>
              <div class="mb-3">
                <label class="form-label fw-bold small text-uppercase text-muted">រយៈពេលប្រឡង-នាទី</label>
                <input type="number" v-model.number="quizDuration"
                  class="form-control rounded-3 py-2 px-3 border-0 shadow-sm" min="1" placeholder="ឧ. 60" />
              </div>

              <div class="mb-3">
                <label class="form-label fw-bold small text-uppercase text-muted">
                  ម៉ោងចាប់ផ្ដើម
                </label>
                <input type="datetime-local" v-model="startTime"
                  class="form-control rounded-3 py-2 px-3 border-0 shadow-sm" />
              </div>

              <div class="mb-3">
                <label class="form-label fw-bold small text-uppercase text-muted">
                  ម៉ោងបញ្ចប់
                </label>
                <input type="datetime-local" v-model="endTime" readonly
                  class="form-control rounded-3 py-2 px-3 border-0 shadow-sm bg-light" />
              </div>

              <div>
                <label class="form-label fw-bold small text-uppercase text-muted">ជ្រើសរើសថ្នាក់រៀន</label>
                <select v-model="selectedRoomId" class="form-select rounded-3 py-2 px-3 border-0 shadow-sm">
                  <option value="" disabled>-- ជ្រើសរើសថ្នាក់រៀន --</option>
                  <option v-for="room in allRooms" :key="room.id" :value="room.id">
                    {{ room.name }}
                  </option>
                </select>
              </div>
            </div>

            <div v-for="(q, qIdx) in questions" :key="qIdx" :id="`qcard-${qIdx}`" class="q-card slide-in"
              :class="{ 'active-card': selectedQuestionIndex === qIdx }" @click="selectedQuestionIndex = qIdx">
              <div class="d-flex align-items-center justify-content-between px-3 py-2 border-bottom bg-light flex-wrap gap-2">
                <div class="d-flex align-items-center gap-2">
                  <div class="q-num-badge">{{ qIdx + 1 }}</div>
                  <span class="fw-bold" style="font-size: 0.85rem; color: var(--txt)">
                    សំណួរទី {{ getKhmerNumber(qIdx + 1) }}
                  </span>
                </div>

                <div class="type-toggle" @click.stop>
                  <button type="button" class="type-toggle-btn" :class="{ active: q.question_type !== 'true_false' }"
                    @click="setQuestionType(qIdx, 'multiple_choice')">
                    <i class="fas fa-list-ul me-1"></i>ជ្រើសរើស
                  </button>
                  <button type="button" class="type-toggle-btn" :class="{ active: q.question_type === 'true_false' }"
                    @click="setQuestionType(qIdx, 'true_false')">
                    <i class="fas fa-toggle-on me-1"></i>ture/false
                  </button>
                </div>

                <div class="pts-pill">
                  <label>​ពិន្ទុ</label>
                  <input type="number" v-model.number="q.pts" min="0" class="pts-input" />
                </div>
              </div>

              <div class="p-3 d-flex flex-column gap-2">
                <textarea v-model="q.text" class="q-field" rows="3" placeholder="សូមវាយបញ្ចូលសំណួរនៅទីនេះ..."></textarea>
                <div class="text-uppercase fw-bold text-muted" style="font-size: 0.6rem; letter-spacing: 1.1px">
                  ចម្លើយ និងជម្រើស
                </div>

                <!-- Multiple choice UI -->
                <div v-if="q.question_type !== 'true_false'" class="d-flex flex-column gap-2">
                  <div v-for="(choice, cIdx) in q.choices" :key="cIdx" class="choice-row"
                    :class="{ 'correct-highlight': choice.isCorrect }">
                    <div class="choice-lbl">{{ getKhmerAlphabet(cIdx) }}</div>
                    <input type="text" v-model="choice.text" class="choice-input" placeholder="បញ្ចូលខ្លឹមសារចម្លើយ…" />

                    <div class="d-flex align-items-center gap-2 flex-shrink-0">
                      <span class="text-muted correct-label">ត្រឹមត្រូវ?</span>
                      <input class="form-check-input cr shadow-none m-0" type="radio" :name="`q_correct_${qIdx}`"
                        :checked="choice.isCorrect" @change="setCorrectChoice(qIdx, cIdx)" />
                      <button class="btn btn-sm p-1 text-secondary border-0 remove-choice-btn"
                        @click="removeChoice(qIdx, cIdx)">
                        <i class="fas fa-times-circle"></i>
                      </button>
                    </div>
                  </div>
                </div>

                <!-- True / False UI -->
                <div v-else class="d-flex flex-column gap-2">
                  <div v-for="(choice, cIdx) in q.choices" :key="cIdx" class="tf-choice-row"
                    :class="{ 'correct-highlight': choice.isCorrect }" @click="setCorrectChoice(qIdx, cIdx)">
                    <div class="tf-icon">
                      <i :class="cIdx === 0 ? 'fas fa-check' : 'fas fa-times'"></i>
                    </div>
                    <span class="tf-label">{{ choice.text }}</span>
                    <input class="form-check-input cr shadow-none m-0 ms-auto" type="radio"
                      :name="`q_correct_${qIdx}`" :checked="choice.isCorrect" @click.stop
                      @change.stop="setCorrectChoice(qIdx, cIdx)" />
                  </div>
                </div>
              </div>

              <div class="d-flex align-items-center justify-content-between px-3 pb-3">
                <button v-if="q.question_type !== 'true_false'"
                  class="btn btn-sm fw-bold rounded-3 border-0 bg-transparent"
                  style="color: var(--em); font-size: 0.76rem" @click="addChoice(qIdx)">
                  <i class="fas fa-plus-circle me-1"></i> បន្ថែមជម្រើស
                </button>
                <span v-else></span>
                <button v-if="questions.length > 1" class="btn btn-sm btn-outline-danger rounded-3 fw-bold"
                  style="font-size: 0.72rem" @click.stop="removeQuestion(qIdx)">
                  <i class="fas fa-trash-alt me-1"></i> លុប
                </button>
              </div>
            </div>
          </div>

          <div class="panel">
            <div class="panel-head">
              <span class="panel-lbl">វឌ្ឍនភាពនៃការធ្វើតេស្ត</span>
            </div>

            <div class="flex-grow-1 p-3 d-flex flex-column gap-3 progress-fixed" style="padding: 16px 14px">
              <div class="d-flex justify-content-center">
                <div style="position: relative; width: 120px; height: 120px">
                  <svg width="120" height="120" viewBox="0 0 120 120" class="svg-ring">
                    <circle cx="60" cy="60" r="50" class="ring-bg" />
                    <circle cx="60" cy="60" r="50" class="ring-fill" :style="{
                      strokeDashoffset: circleStrokeDashoffset,
                      stroke: progressColor,
                    }" />
                  </svg>
                  <div class="position-absolute top-50 start-50 translate-middle text-center">
                    <div class="fw-bold" :style="{ color: progressColor }" style="font-size: 1.4rem; line-height: 1">
                      {{ totalPoints }}
                    </div>
                    <div style="
                        font-size: 0.62rem;
                        font-weight: 700;
                        color: var(--txt-mu);
                      ">
                      ពិន្ទុសរុប
                    </div>
                  </div>
                </div>
              </div>

              <div class="text-center">
                <div class="fw-bold" style="font-size: 0.88rem; color: var(--txt)">
                  ពិន្ទុតេស្ត
                </div>
                <div class="text-muted" style="font-size: 0.7rem; line-height: 1.5">
                  ពិន្ទុសរុបដែលគណនាបង្កើតដោយស្វ័យប្រវត្តិផ្អែកតាមវិញ្ញាសា
                </div>
              </div>

              <hr class="my-1" />

              <div class="d-flex flex-column gap-2 mb-2">
                <div class="d-flex justify-content-between align-items-center">
                  <span style="
                      font-size: 0.73rem;
                      font-weight: 600;
                      color: var(--txt-mu);
                    ">
                    <i class="fas fa-layer-group me-1" style="color: var(--em)"></i>សំណួរ
                  </span>
                  <span class="fw-bold" style="font-size: 0.77rem; color: var(--txt)">{{ questions.length }}</span>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                  <span style="
                      font-size: 0.73rem;
                      font-weight: 600;
                      color: var(--txt-mu);
                    ">
                    <i class="fas fa-star me-1" style="color: var(--em)"></i>ពិន្ទុសរុប
                  </span>
                  <span class="fw-bold" style="font-size: 0.77rem; color: var(--txt)">{{ totalPoints }} ពិន្ទុ</span>
                </div>
              </div>

              <button class="btn btn-sm rounded-3 fw-bold text-white w-100 save-publish-btn" style="
                  background: linear-gradient(135deg, var(--em), var(--em-dk));
                  box-shadow: 0 4px 14px rgba(16, 185, 129, 0.3);
                " @click="finalizePublish" :disabled="isSubmitting">
                <span v-if="isSubmitting" class="spinner-border spinner-border-sm me-1"></span>
                <i v-else class="fas fa-paper-plane me-1"></i> ដាក់ប្រើប្រាស់
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="modal-overlay" v-if="showPreviewModal" @click.self="showPreviewModal = false">
      <div class="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
        <div class="modal-content border-0 rounded-4 shadow-lg overflow-hidden" style="background: #f8fafc">
          <div style="
              height: 6px;
              background: linear-gradient(90deg, var(--em), var(--em-dk));
            "></div>

          <div class="modal-header border-0 pb-0 px-4 pt-4">
            <h5 class="modal-title fw-bold text-dark d-flex align-items-center gap-2">
              <i class="fas fa-eye" style="color: var(--em)"></i> Student
              Preview
            </h5>
            <button type="button" class="btn-close shadow-none" @click="showPreviewModal = false"></button>
          </div>

          <div class="modal-body p-4" style="
              user-select: none;
              -webkit-user-select: none;
              max-height: 60vh;
              overflow-y: auto;
            ">
            <div class="mb-4 pb-3 border-bottom text-center">
              <h3 class="fw-bold" style="color: var(--txt)">
                {{ quizTitle || "Untitled Quiz" }}
              </h3>
              <p class="text-muted small mb-1" v-if="quizInstructions">
                {{ quizInstructions }}
              </p>
              <p class="text-muted small mb-0">
                This is exactly how students will see the exam.
              </p>
            </div>

            <div v-if="questions.length === 0" class="text-center py-5 text-muted">
              <i class="fas fa-inbox fa-3x mb-3 opacity-50"></i>
              <p>No questions added yet.</p>
            </div>

            <div v-else>
              <div v-for="(q, index) in questions" :key="index" class="mb-4">
                <div class="d-flex justify-content-between align-items-center mb-3">
                  <span class="badge bg-secondary text-white rounded-pill px-3 py-2">Question {{ index + 1 }}</span>
                  <span class="text-muted fw-bold" style="font-size: 0.85rem">{{ q.pts }} Points</span>
                </div>
                <h5 class="fw-bold mb-3" style="color: var(--txt); line-height: 1.5">
                  {{ q.text || "(Empty Question)" }}
                </h5>
                <div class="options-container">
                  <div v-for="(choice, cIdx) in q.choices" :key="cIdx"
                    class="p-3 mb-2 bg-white rounded-3 shadow-sm border option-preview-row">
                    <div class="form-check m-0 d-flex align-items-center gap-2">
                      <input class="form-check-input mt-0 shadow-none" type="radio" :name="`preview_q${index}`" />
                      <label class="form-check-label w-100" style="color: var(--txt); font-size: 0.95rem">
                        {{ choice.text || `Option ${getKhmerAlphabet(cIdx)}` }}
                      </label>
                    </div>
                  </div>
                </div>
                <hr v-if="index < questions.length - 1" class="my-4" style="border-color: var(--bdr); opacity: 1" />
              </div>
            </div>
          </div>

          <div class="modal-footer border-0 pt-0 pb-4 px-4 bg-white"
            style="border-top: 1px solid var(--bdr) !important">
            <button class="btn btn-light rounded-3 fw-bold px-4" @click="showPreviewModal = false">
              Exit Preview
            </button>
            <button class="btn text-white rounded-3 fw-bold px-4 disabled" style="background: var(--em)">
              Submit Exam
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showCodeModal" class="modal-backdrop-custom d-flex align-items-center justify-content-center"
      @click.self="showCodeModal = false">
      <div class="modal-dialog-custom p-4 bg-white rounded-4 shadow-lg text-center slide-in"
        style="width: 100%; max-width: 480px; z-index: 9999">
        <div
          class="success-icon-wrapper mb-3 mx-auto d-flex align-items-center justify-content-center rounded-circle bg-success bg-opacity-10 text-success"
          style="width: 56px; height: 56px">
          <i class="fas fa-check-circle fa-2x"></i>
        </div>

        <h4 class="fw-bold text-dark mb-1">បង្កើតវិញ្ញាសាជោគជ័យ!</h4>
        <p class="text-muted small mb-4">
          វិញ្ញាសារបស់អ្នកត្រូវបានដាក់ផ្សាយជាផ្លូវការរួចរាល់ហើយ។
          សូមចម្លងតំណភ្ជាប់ខាងក្រោមដើម្បីផ្ញើជូនសិស្សានុសិស្ស៖
        </p>

        <div class="d-flex align-items-center justify-content-between p-2.5 mb-4 rounded-3 border bg-light text-start">
          <span class="text-dark text-truncate me-2 fw-medium" style="font-size: 0.88rem; max-width: 320px">{{
            generatedExamLink }}</span>
          <button class="btn btn-sm btn-dark rounded-2 px-3 fw-bold d-flex align-items-center gap-1 flex-shrink-0"
            @click="copyLinkToClipboard">
            <i class="far fa-copy"></i> Copy Link
          </button>
        </div>

        <div class="w-100">
          <button class="btn btn-light w-100 rounded-3 fw-bold py-2 text-muted" @click="showCodeModal = false">
            បិទផ្ទាំងនេះ
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick, onMounted, onUnmounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { useAuthStore } from "@/stores/auth";
import { createExam, createQuestion } from "@/api/exam.api";
import { getMyRooms } from "@/api/teacher.api";

const route = useRoute();
const router = useRouter();
const toast = useToast();
const authStore = useAuthStore();

const containerRef = ref(null);
const qNavScrollRef = ref(null);
const isSubmitting = ref(false);
const showPreviewModal = ref(false);
const selectedQuestionIndex = ref(0);

const showCodeModal = ref(false);
const generatedExamLink = ref("");

const quizTitle = ref("");
const quizInstructions = ref("");
const quizDuration = ref(60);

const startTime = ref("");
const endTime = ref("");
watch([startTime, quizDuration], ([newStart, newDuration]) => {
  if (!newStart || !newDuration) return;

  const start = new Date(newStart);

  start.setMinutes(start.getMinutes() + parseInt(newDuration || 0));

  const year = start.getFullYear();
  const month = String(start.getMonth() + 1).padStart(2, "0");
  const day = String(start.getDate()).padStart(2, "0");
  const hours = String(start.getHours()).padStart(2, "0");
  const minutes = String(start.getMinutes()).padStart(2, "0");

  endTime.value = `${year}-${month}-${day}T${hours}:${minutes}`;
});

const roomId = route.params.roomId;
const allRooms = ref([]);
const selectedRoomId = ref("");

const KH = ["ក", "ខ", "គ", "ឃ", "ង", "ច"];
const KH_N = ["១", "២", "៣", "៤", "៥", "៦", "៧", "៨", "៩", "១០"];

const questions = ref([
  {
    text: "",
    pts: 10,
    question_type: "multiple_choice",
    choices: [
      { text: "", isCorrect: true },
      { text: "", isCorrect: false },
    ],
  },
]);

// --- Fix the component to exactly the remaining viewport height,
// no matter what header/topbar sits above it. This guarantees the
// whole page never scrolls; only the center feed column scrolls.
const containerHeight = ref("100vh");

const updateContainerHeight = () => {
  if (!containerRef.value) return;
  const top = containerRef.value.getBoundingClientRect().top;
  containerHeight.value = `${window.innerHeight - top}px`;
};

let resizeObserver;
onMounted(async () => {
  await nextTick();
  updateContainerHeight();
  window.addEventListener("resize", updateContainerHeight);
  // Also react if fonts/late content shift the header height slightly
  resizeObserver = new ResizeObserver(() => updateContainerHeight());
  if (containerRef.value?.parentElement) {
    resizeObserver.observe(containerRef.value.parentElement);
  }

  await getAllRooms();
  if (!authStore.user) {
    authStore.fetchUserProfile();
  }
});

onUnmounted(() => {
  window.removeEventListener("resize", updateContainerHeight);
  resizeObserver?.disconnect();
});

const getKhmerNumber = (num) => {
  return KH_N[num - 1] || num.toString();
};

const getKhmerAlphabet = (idx) => {
  return KH[idx] || String.fromCharCode(65 + idx);
};

const selectQuestion = (idx) => {
  selectedQuestionIndex.value = idx;
  const card = document.getElementById(`qcard-${idx}`);
  if (card) {
    card.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  const navItem = document.getElementById(`qnav-${idx}`);
  if (navItem && qNavScrollRef.value) {
    navItem.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
};

// Dynamically counts total points from whatever values the teacher adds
const totalPoints = computed(() => {
  return questions.value.reduce((sum, q) => sum + (parseInt(q.pts) || 0), 0);
});

// Visual dynamic properties for the tracking ring UI component
const circleStrokeDashoffset = computed(() => {
  // Since the base maximum is exactly totalPoints, the ring layout will show 100% full configuration
  return totalPoints.value > 0 ? 0 : 314;
});

const progressColor = computed(() => {
  return "var(--em)";
});

// type can be "multiple_choice" or "true_false"; both use the same createQuestion API
const addNewQuestion = (type = "multiple_choice") => {
  const isTF = type === "true_false";
  questions.value.push({
    text: "",
    pts: 10,
    question_type: type,
    choices: isTF
      ? [
          { text: "True", isCorrect: true },
          { text: "False", isCorrect: false },
        ]
      : [
          { text: "", isCorrect: true },
          { text: "", isCorrect: false },
        ],
  });
  const newIndex = questions.value.length - 1;
  selectedQuestionIndex.value = newIndex;

  nextTick(() => {
    const card = document.getElementById(`qcard-${newIndex}`);
    if (card) card.scrollIntoView({ behavior: "smooth", block: "start" });
    if (qNavScrollRef.value) {
      qNavScrollRef.value.scrollTo({
        top: qNavScrollRef.value.scrollHeight,
        behavior: "smooth",
      });
    }
  });
};

// Switch an existing question's type; converts its choices accordingly
const setQuestionType = (qIdx, type) => {
  const q = questions.value[qIdx];
  if (q.question_type === type) return;

  q.question_type = type;

  if (type === "true_false") {
    q.choices = [
      { text: "ត្រូវ", isCorrect: true },
      { text: "ខុស", isCorrect: false },
    ];
  } else if (q.choices.length < 2 || q.choices.some((c) => ["ត្រូវ", "ខុស"].includes(c.text))) {
    q.choices = [
      { text: "", isCorrect: true },
      { text: "", isCorrect: false },
    ];
  }
};

const removeQuestion = (idx) => {
  if (questions.value.length > 1) {
    questions.value.splice(idx, 1);
    if (selectedQuestionIndex.value >= questions.value.length) {
      selectedQuestionIndex.value = questions.value.length - 1;
    }
  }
};

const addChoice = (qIdx) => {
  const q = questions.value[qIdx];
  if (q.choices.length < KH.length) {
    q.choices.push({ text: "", isCorrect: false });
  }
};

const removeChoice = (qIdx, cIdx) => {
  const q = questions.value[qIdx];
  if (q.choices.length > 1) q.choices.splice(cIdx, 1);
};

const setCorrectChoice = (qIdx, cIdx) => {
  questions.value[qIdx].choices.forEach((choice, idx) => {
    choice.isCorrect = idx === cIdx;
  });
};

const openPreviewModal = () => {
  showPreviewModal.value = true;
};

const getAllRooms = async () => {
  try {
    const res = await getMyRooms();
    allRooms.value = res?.data?.data || [];
  } catch (err) {
    console.error("មិនអាចទាញយកបញ្ជីថ្នាក់រៀនបានទេ:", err);
  }
};
const formatDateTime = (dateTime) => {
  return dateTime.replace("T", " ") + ":00";
};

const finalizePublish = async () => {
  if (isSubmitting.value) return;
  if (!quizTitle.value.trim()) return toast.error("សូមបញ្ចូលចំណងជើងវិញ្ញាសា!");
  if (!selectedRoomId.value) return toast.error("សូមជ្រើសរើសថ្នាក់រៀនសិន!");
  if (!startTime.value) return toast.error("សូមជ្រើសរើស Start Time!");

  if (!endTime.value) return toast.error("សូមជ្រើសរើស End Time!");

  if (new Date(startTime.value) >= new Date(endTime.value))
    return toast.error("End Time ត្រូវតែធំជាង Start Time!");

  for (let i = 0; i < questions.value.length; i++) {
    const q = questions.value[i];
    if (!q.text.trim()) return toast.error(`សូមបំពេញសំណួរទី ${i + 1}`);

    if (q.choices.some((c) => !c.text.trim()))
      return toast.error(`សូមបំពេញជម្រើសចម្លើយក្នុងសំណួរទី ${i + 1}`);

    if (!q.choices.some((c) => c.isCorrect))
      return toast.error(`សូមជ្រើសរើសចម្លើយត្រឹមត្រូវសម្រាប់សំណួរទី ${i + 1}`);
  }

  try {
    isSubmitting.value = true;

    const examPayload = {
      room_id: parseInt(selectedRoomId.value),
      title: quizTitle.value.trim(),
      type: "quiz",
      description: quizInstructions.value || "គ្មានការពិពណ៌នា",
      duration: parseInt(quizDuration.value) || 60,
      total_points: totalPoints.value,
      status: "active",

      start_time: formatDateTime(startTime.value),
      end_time: formatDateTime(endTime.value),
    };

    const createRes = await createExam(examPayload);
    const examId = createRes.data?.data?.examId || createRes.data?.id;

    if (!examId) throw new Error("មិនទទួលបាន Exam ID ពី Server");

    for (const q of questions.value) {
      await createQuestion({
        exam_id: examId,
        question: q.text,
        question_type: q.question_type,
        options: q.choices.map((c) => c.text),
        correct_answer: [q.choices.find((c) => c.isCorrect)?.text],
        points: q.pts,
      });
    }

    generatedExamLink.value = createRes.data?.data?.link || "";
    showCodeModal.value = true;
    toast.success("វិញ្ញាសាត្រូវបានដាក់ផ្សាយជោគជ័យ!");
  } catch (err) {
    console.error("កំហុសលម្អិតពី Server:", err.response?.data || err);
    const errorMsg =
      err.response?.data?.message || "មានកំហុសក្នុងការផ្សព្វផ្សាយវិញ្ញាសា!";
    toast.error(errorMsg);
  } finally {
    isSubmitting.value = false;
  }
};

const copyLinkToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(generatedExamLink.value);
    toast.success("បានចម្លងតំណភ្ជាប់វិញ្ញាសារួចរាល់!");
  } catch (err) {
    toast.error("មិនអាចចម្លងតំណភ្ជាប់បានទេ!");
  }
};
</script>

<style scoped>
.quiz-builder-container {
  --em: #10b981;
  --em-dk: #059669;
  --em-soft: #ecfdf5;
  --em-mid: rgba(16, 185, 129, 0.25);
  --txt: #1e293b;
  --txt-m: #334155;
  --txt-mu: #64748b;
  --surf: #ffffff;
  --bdr: #e2e8f0;
  --r-md: 10px;
  --r-lg: 14px;
  --r-xl: 20px;
  --sh-sm: 0 2px 8px rgba(0, 0, 0, 0.04);
  --sh-md: 0 8px 24px rgba(0, 0, 0, 0.08);

  display: flex;
  flex-direction: column;
  /* height is set dynamically via :style binding to exactly fill
     whatever space is left below your app's header — see containerHeight */
  width: 100%;
  overflow: hidden;
  font-family: "Kantumruy Pro", "Poppins", sans-serif;
  color: var(--txt);
  box-sizing: border-box;
}

.quiz-builder-container *,
.quiz-builder-container *::before,
.quiz-builder-container *::after {
  box-sizing: border-box;
}

.app-shell {
  display: flex;
  height: 100%;
  min-height: 0;
  overflow: hidden;
}

.main-col {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
  overflow: hidden; /* the page itself never scrolls */
}

/* Grid layout is ALWAYS on, at every screen size — side panels stay
   pinned to the container's fixed height; only the center feed scrolls */
.workspace {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 220px 1fr 190px;
  grid-template-rows: 100%;
  gap: 12px;
  padding: 12px;
  overflow: hidden;
}

@media (max-width: 991px) {
  .workspace {
    grid-template-columns: 150px 1fr 130px;
    gap: 8px;
    padding: 8px;
  }
}

@media (max-width: 767px) {
  .workspace {
    grid-template-columns: 120px 1fr 110px;
    gap: 6px;
    padding: 6px;
  }

  .panel-lbl {
    font-size: 0.52rem;
  }

  .q-nav-item span:first-child {
    font-size: 0.68rem;
  }
}

.quiz-info-card .form-control,
.quiz-info-card .form-select {
  background-color: #ffffff;
  transition: all 0.3s ease;
}

.quiz-info-card .form-control:focus,
.quiz-info-card .form-select:focus {
  border: 1px solid var(--em) !important;
  box-shadow: 0 0 0 0.2rem rgba(16, 185, 129, 0.15) !important;
}

.panel {
  background: var(--surf);
  border: 1px solid var(--bdr);
  border-radius: var(--r-xl);
  box-shadow: var(--sh-sm);
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
  overflow: hidden; /* panel is fixed as a block, never scrolls itself, never resizes with center content */
}

.panel-head {
  flex-shrink: 0;
  padding: 12px 14px;
  border-bottom: 1px solid var(--bdr);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.panel-lbl {
  font-size: 0.6rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.2px;
  color: var(--txt-mu);
}

.panel-count {
  font-size: 0.62rem;
  font-weight: 700;
  color: var(--em);
}

/* Left panel: only this inner list scrolls; header + add-buttons stay fixed */
.q-nav-scroll {
  flex: 1 1 0%;
  height: 0;
  min-height: 0;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.q-nav-item {
  padding: 9px 12px;
  border-radius: var(--r-md);
  border: 1.5px solid var(--bdr);
  background: #fafafa;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--txt-m);
  transition: 0.15s;
  flex-shrink: 0;
}

.q-nav-item:hover {
  border-color: var(--em-mid);
  background: var(--em-soft);
  color: var(--em);
}

.q-nav-item.active {
  background: linear-gradient(135deg, var(--em), var(--em-dk));
  border-color: transparent;
  color: #fff;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.22);
}

.q-badge {
  font-size: 0.63rem;
  font-weight: 700;
  padding: 2px 7px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
}

.q-nav-item:not(.active) .q-badge {
  background: var(--em-soft);
  color: var(--em);
}

/* Center column: this is the ONLY thing that scrolls */
.feed-col {
  min-height: 0;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-bottom: 20px;
}

.q-card {
  background: var(--surf);
  border: 1.5px solid var(--bdr);
  border-radius: var(--r-xl);
  box-shadow: var(--sh-sm);
  overflow: hidden;
  flex-shrink: 0;
  transition: box-shadow 0.17s;
  cursor: pointer;
}

.q-card:hover {
  box-shadow: var(--sh-md);
}

.q-card.active-card {
  border-color: var(--em-mid);
  box-shadow:
    0 0 0 3px rgba(16, 185, 129, 0.08),
    var(--sh-md);
}

.q-num-badge {
  width: 28px;
  height: 28px;
  border-radius: 8px;
  background: linear-gradient(135deg, var(--em), var(--em-dk));
  color: #fff;
  font-weight: 800;
  font-size: 0.72rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 3px 8px rgba(16, 185, 129, 0.28);
}

.pts-pill {
  display: flex;
  align-items: center;
  gap: 6px;
  background: var(--em-soft);
  border-radius: 8px;
  padding: 5px 10px;
}

.pts-pill label {
  font-size: 0.65rem;
  font-weight: 700;
  color: var(--em);
  margin: 0;
}

.pts-input {
  width: 40px;
  border: none;
  background: #fff;
  border-radius: 6px;
  padding: 3px 5px;
  text-align: center;
  font-weight: 800;
  font-size: 0.8rem;
  color: var(--em);
  outline: none;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
}

.q-field {
  width: 100%;
  border: 1.5px solid var(--bdr);
  border-radius: var(--r-lg);
  padding: 10px 13px;
  font-size: 0.87rem;
  font-weight: 500;
  color: var(--txt);
  outline: none;
  resize: none;
  background: #fafbfc;
  transition: 0.17s;
  line-height: 1.6;
}

.q-field:focus {
  border-color: var(--em);
  background: #fff;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.08);
}

.q-field::placeholder {
  color: #b0bec5;
}

.choice-row {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 11px;
  border: 1.5px solid var(--bdr);
  border-radius: var(--r-md);
  background: #fafbfc;
  transition: 0.13s;
}

.choice-row:hover {
  border-color: var(--em-mid);
  background: #fff;
}

.choice-row.correct-highlight {
  border-color: var(--em);
  background: var(--em-soft);
}

.choice-lbl {
  width: 28px;
  height: 28px;
  flex-shrink: 0;
  border-radius: 7px;
  background: var(--em-soft);
  color: var(--em);
  font-weight: 800;
  font-size: 0.74rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.choice-input {
  flex: 1;
  border: none;
  background: transparent;
  font-size: 0.81rem;
  font-weight: 500;
  color: var(--txt);
  outline: none;
}

.choice-input::placeholder {
  color: #b0bec5;
}

.form-check-input.cr {
  width: 16px;
  height: 16px;
  cursor: pointer;
  border: 2px solid #cbd5e1;
}

.form-check-input.cr:checked {
  background-color: var(--em) !important;
  border-color: var(--em) !important;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.14);
}

/* Type toggle (multiple choice / true-false) */
.type-toggle {
  display: flex;
  background: #f1f5f9;
  border-radius: 999px;
  padding: 3px;
  gap: 2px;
}

.type-toggle-btn {
  border: none;
  background: transparent;
  font-size: 0.68rem;
  font-weight: 700;
  padding: 5px 10px;
  border-radius: 999px;
  color: var(--txt-mu);
  cursor: pointer;
  transition: 0.15s;
  white-space: nowrap;
}

.type-toggle-btn.active {
  background: var(--em);
  color: #fff;
  box-shadow: 0 2px 6px rgba(16, 185, 129, 0.28);
}

/* True/False choice rows */
.tf-choice-row {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 13px;
  border: 1.5px solid var(--bdr);
  border-radius: var(--r-md);
  background: #fafbfc;
  cursor: pointer;
  transition: 0.13s;
}

.tf-choice-row:hover {
  border-color: var(--em-mid);
  background: #fff;
}

.tf-choice-row.correct-highlight {
  border-color: var(--em);
  background: var(--em-soft);
}

.tf-icon {
  width: 28px;
  height: 28px;
  flex-shrink: 0;
  border-radius: 7px;
  background: #e2e8f0;
  color: #64748b;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.78rem;
}

.tf-choice-row.correct-highlight .tf-icon {
  background: var(--em);
  color: #fff;
}

.tf-label {
  flex: 1;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--txt);
}

.add-q-btn-tf:hover {
  background: rgba(59, 130, 246, 0.08) !important;
}

/* Right panel: fully fixed, no internal scroll at all */
.progress-fixed {
  min-height: 0;
  overflow: hidden;
}

.svg-ring {
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
  stroke-width: 9;
  stroke-linecap: round;
  stroke-dasharray: 314;
  transition:
    stroke-dashoffset 0.45s ease,
    stroke 0.3s ease;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.slide-in {
  animation: slideUp 0.22s ease;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(15, 23, 42, 0.4);
  backdrop-filter: blur(4px);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.modal-dialog {
  width: 100%;
  max-width: 550px;
  margin: 0;
}

.modal-dialog-scrollable {
  max-height: 90vh;
  display: flex;
  flex-direction: column;
}

.modal-content {
  background: #ffffff;
}

.correct-label {
  font-size: 0.63rem;
  font-weight: 700;
}

.remove-choice-btn {
  font-size: 0.8rem;
  transition: 0.13s;
  background: transparent;
}

.remove-choice-btn:hover {
  color: #ef4444 !important;
}

.option-preview-row:hover {
  border-color: var(--em) !important;
  background: var(--em-soft) !important;
}

.modal-backdrop-custom {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(15, 23, 42, 0.3);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  z-index: 9999;
}

.slide-in {
  animation: modalSlideEntrance 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes modalSlideEntrance {
  from {
    opacity: 0;
    transform: translateY(12px) scale(0.98);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
</style>