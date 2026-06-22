<template>
    <div class="take-exam-root">
        <!-- Toast Notification -->
        <!-- <div class="toast-container position-fixed top-0 end-0 " style="z-index: 1085;">
            <div v-if="toast.show" class="toast show align-items-center text-white border-0 shadow-lg"
                :class="toast.type === 'success' ? 'bg-success' : toast.type === 'warning' ? 'bg-warning text-dark' : 'bg-danger'"
                role="alert">
                <div class="d-flex">
                    <div class="toast-body d-flex align-items-center gap-2 fs-6">
                        <i
                            :class="toast.type === 'success' ? 'fa-solid fa-circle-check' : 'fa-solid fa-circle-exclamation'"></i>
                        {{ toast.message }}
                    </div>
                    <button type="button" class="btn-close btn-close-white ms-auto me-2 m-auto"
                        @click="toast.show = false"></button>
                </div>
            </div>
        </div> -->
        <!-- ផ្ទាំង Toast Message បែប Modern ស្លីមស្អាត -->
        <div v-if="toast.show" class="custom-toast-wrapper" :class="toast.type">
            <div class="toast-content-box">
                <!-- បង្ហាញ Icon ទៅតាមប្រភេទ Message -->
                <i v-if="toast.type === 'success'" class="fa-solid fa-circle-check toast-icon"></i>
                <i v-else-if="toast.type === 'error'" class="fa-solid fa-circle-exclamation toast-icon"></i>
                <i v-else class="fa-solid fa-triangle-exclamation toast-icon"></i>

                <span class="toast-text">{{ toast.message }}</span>
            </div>
            <button class="toast-close-btn" @click="toast.show = false">
                <i class="fa-solid fa-xmark"></i>
            </button>
        </div>

        <div class="app-background-grid"></div>
        <nav class="navbar-custom sticky-top">
            <div class="container">
                <!-- <div class="d-flex align-items-center">
                    <div>
                        <a href="#"> <img :src="logoImage" alt="Pralong Logo" class="brand-logo" /></a>
                    </div>
                </div> -->

                <div v-if="currentStep > 2" class="d-flex align-items-center gap-3 ms-auto" id="header-student-profile">
                    <img :src="logoImage" class="logo-exam-header"/>
                    <div class="live-status-badge d-inline-flex align-items-center gap-2 me-2">
                        <span class="pulse-indicator"></span>
                        កំពុងប្រឡង
                    </div>
                    <div class="d-flex align-items-center border-start ps-3 gap-2">
                        <div class="text-end">
                            <span class="fw-semibold text-dark d-block" style="font-size: 0.9rem;">{{ studentInfo.name
                            }}</span>
                            <small class="text-muted d-block" style="font-size: 11px;">ID: {{ studentInfo.student_code
                            }}</small>
                        </div>
                        <div class="user-avatar-circle d-flex align-items-center justify-content-center border">
                            <i class="fa-regular fa-user"></i>
                        </div>
                    </div>
                </div>
            </div>
        </nav>

        <main class="container py-5 my-auto main-content-area">
            <div v-if="currentStep === 1" class="text-center py-5 my-5">
                <div class="spinner-border text-theme-green" role="status" style="width: 3rem; height: 3rem;"></div>
                <h4 class="mt-4 fw-bold text-dark">កំពុងត្រួតពិនិត្យលេខកូដវិញ្ញាសា</h4>
                <p class="text-muted">សូមរង់ចាំបន្តិច កំពុងតែដំណើរការការប្រឡង</p>
            </div>

            <div v-else-if="currentStep === 2" class="row align-items-center g-5" id="lobby-workspace">
                <div class="col-lg-5 col-md-8 mx-auto">
                    <div class="lobby-form-card p-4 p-md-5 bg-white border-0">
                        <div class="text-center mb-4 pb-2">
                            <div class="brand-icon mx-auto mb-3"
                                style="width: 56px; height: 56px; font-size: 1.6rem; border-radius: 16px;">
                                <!-- <i class="fa-solid fa-graduation-cap"></i> -->
                                 <img :src="logoImage" class="logo-exam"/>
                            </div>
                            <h3 class="fw-semibold text-dark mb-1" style="font-size: 1.5rem;">ចុះឈ្មោះចូលប្រឡង</h3>
                            <p class="text-secondary small mb-0">បំពេញព័ត៌មានឱ្យបានត្រឹមត្រូវដើម្បីចាប់ផ្តើមការប្រឡង</p>
                        </div>

                        <form @submit.prevent="startExamSession">
                            <div class="input-group-custom mb-3">
                                <label class="form-label-small">ឈ្មោះពេញ</label>
                                <div class="position-relative">
                                    <input type="text" v-model="studentInfo.name" placeholder="បញ្ចូលឈ្មោះពេញរបស់អ្នក"
                                        required class="form-control-custom">
                                    <i class="fa-regular fa-user input-icon-left"></i>
                                </div>
                            </div>

                            <div class="input-group-custom mb-3">
                                <label class="form-label-small">លេខកូដសិស្ស</label>
                                <div class="position-relative">
                                    <input type="text" v-model="studentInfo.student_code"
                                        placeholder="បញ្ចូលលេខកូដសិស្ស" required class="form-control-custom">
                                    <i class="fa-solid fa-id-card input-icon-left"></i>
                                </div>
                            </div>

                            <div class="input-group-custom mb-4">
                                <label class="form-label-small">បន្ទប់រៀន</label>
                                <div class="position-relative">
                                    <select v-model="studentInfo.room" required class="form-select-custom">
                                        <option value="" disabled selected>ជ្រើសរើសបន្ទប់រៀន</option>
                                        <option v-for="room in roomList" :key="room.id" :value="room.name">
                                            {{ room.name }}
                                        </option>
                                    </select>
                                    <i class="fa-solid fa-door-open input-icon-left"></i>
                                </div>
                            </div>

                            <button type="submit"
                                class="btn btn-theme-submit w-100 py-3 d-flex align-items-center justify-content-center gap-2"
                                :disabled="isLobbyLoading">
                                <span><i class="fa-solid fa-rocket me-1"></i> {{ lobbyBtnText }}</span>
                                <div v-if="isLobbyLoading" class="spinner-border spinner-border-sm" role="status"></div>
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <!-- Step 3: Exam Workspace -->
            <div v-else-if="currentStep === 3" class="row" id="exam-workspace">
                <div class="col-lg-3 mb-4">
                    <div class="sidebar-card p-4 h-100 d-flex flex-column justify-content-between bg-white border-0">
                        <div>
                            <div class="d-flex align-items-center justify-content-between mb-3">
                                <h6 class="fw-bold text-dark mb-0">បញ្ជីសំណួរ</h6>
                                <span class="badge-count-status">
                                    {{ answeredCount }} / {{ examQuestions.length }}
                                </span>
                            </div>

                            <div class="d-grid gap-2" style="grid-template-columns: repeat(5, 1fr);">
                                <button v-for="(q, idx) in examQuestions" :key="q.id" :id="`nav-btn-${idx}`"
                                    class="question-nav-btn"
                                    :class="{ 'active': currentIdx === idx, 'answered': userAnswers[q.id] }"
                                    @click="loadQuestion(idx)">
                                    {{ idx + 1 }}
                                </button>
                            </div>
                        </div>

                        <div>
                            <hr class="my-4" style="border-color: #f0f0f0;">
                            <div class="legend-box mb-1">
                                <div class="d-flex align-items-center gap-2 mb-2">
                                    <span class="legend-dot active-dot"></span>
                                    <span class="small text-secondary">កំពុងមើល</span>
                                </div>
                                <div class="d-flex align-items-center gap-2 mb-2">
                                    <span class="legend-dot answered-dot"></span>
                                    <span class="small text-secondary">បានឆ្លើយ</span>
                                </div>
                                <div class="d-flex align-items-center gap-2">
                                    <span class="legend-dot unanswered-dot"></span>
                                    <span class="small text-secondary">មិនទាន់ឆ្លើយ</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-lg-9">
                    <div
                        class="exam-header-card p-4 mb-4 d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-3 bg-white border-0">
                        <div>
                            <span class="text-theme-green fw-bold text-uppercase d-flex align-items-center gap-1"
                                style="font-size: 0.75rem; letter-spacing: 0.5px;">
                                <i class="fa-solid fa-circle-notch fa-spin"></i> ដំណើរការប្រឡង
                            </span>
                            <h4 class="fw-bold text-dark mt-1 mb-0">បន្ទប់៖ {{ studentInfo.room }}</h4>
                        </div>

                        <div class="d-flex align-items-center gap-3 timer-container-box px-3 py-2 border border-light">
                            <div class="text-end">
                                <span class="text-muted d-block"
                                    style="font-size: 10px; font-weight: 600; text-transform: uppercase;">ពេលវេលានៅសល់</span>
                                <span class="h5 fw-bold text-dark mb-0"
                                    :class="{ 'text-danger-custom': totalSeconds < 120 }">
                                    {{ formattedTime }}
                                </span>
                            </div>
                            <div class="progress-ring-container">
                                <svg width="50" height="50">
                                    <circle class="text-light" stroke-width="3.5" stroke="#f1f5f9" fill="transparent"
                                        r="21" cx="25" cy="25" />
                                    <circle class="progress-ring-circle" stroke-width="3.5"
                                        :stroke="totalSeconds < 120 ? '#ef4444' : '#5cb85c'" fill="transparent" r="21"
                                        cx="25" cy="25"
                                        :style="{ strokeDashoffset: timerStrokeDashoffset * (42 / 52) }" />
                                </svg>
                                <div class="progress-timer-text"
                                    :class="totalSeconds < 120 ? 'text-danger' : 'text-success'">{{ timerPercent }}%
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Question Card -->
                    <div class="question-display-card p-4 p-md-5 mb-4 bg-white border-0" v-if="currentQuestion">
                        <div class="d-flex justify-content-between align-items-center mb-4">
                            <span class="badge-type-question">
                                {{ currentQuestion.question_type === 'multiple_choice' ? 'ពហុជ្រើសរើស (Multiple Choice)'
                                    : 'សំណួរវិញ្ញាសា' }}
                            </span>
                            <span class="text-secondary fw-semibold" style="font-size: 0.9rem;">ពិន្ទុ: {{
                                currentQuestion.points }}</span>
                        </div>

                        <div class="question-content mb-4">
                            <h4 class="fw-bold text-dark question-title">{{ currentIdx + 1 }}. {{
                                currentQuestion.question }}</h4>
                            <p class="text-muted small mb-0"><i class="fa-solid fa-circle-info me-1"></i>
                                សូមជ្រើសរើសចម្លើយដែលត្រឹមត្រូវតែមួយគត់</p>
                        </div>

                        <div class="choices-list-wrapper">
                            <div v-for="(opt, idx) in currentQuestion.options" :key="idx" class="choice-item-card"
                                :class="{ 'selected': userAnswers[currentQuestion.id] === opt }"
                                @click="selectOption(currentQuestion.id, opt)">
                                <div class="choice-prefix-badge">{{ String.fromCharCode(65 + idx) }}</div>
                                <div class="choice-main-text fw-medium">{{ opt }}</div>
                                <div class="ms-auto d-flex align-items-center">
                                    <div class="custom-radio-indicator"
                                        :class="{ 'checked': userAnswers[currentQuestion.id] === opt }"></div>
                                </div>
                            </div>
                        </div>

                        <div class="d-flex justify-content-between align-items-center mt-5 pt-4 border-top"
                            style="border-color: #f5f5f5 !important;">
                            <button class="btn btn-action-outline px-4" :disabled="currentIdx === 0"
                                @click="changeQuestion(-1)">
                                <i class="fa-solid fa-arrow-left me-2"></i> ថយក្រោយ
                            </button>
                            <button class="btn btn-action-outline px-4"
                                :disabled="currentIdx === examQuestions.length - 1" @click="changeQuestion(1)">
                                បន្ទាប់ <i class="fa-solid fa-arrow-right ms-2"></i>
                            </button>
                        </div>
                    </div>

                    <div
                        class="submit-trigger-card p-4 d-flex flex-column flex-md-row justify-content-between align-items-center gap-3 bg-white border-0">
                        <div class="text-center text-md-start">
                            <h6 class="fw-bold text-dark mb-1">តើបានរួចរាល់ក្នុងការបញ្ជូនចម្លើយហើយឬនៅ?</h6>
                            <p class="text-secondary small mb-0">
                                សូមពិនិត្យឡើងវិញឲ្យបានច្បាស់លាស់មុននឹងចុចបញ្ជូនវិញ្ញាសា។</p>
                        </div>

                        <button class="btn btn-theme-submit px-5 py-3 shadow-none border-0" @click="showConfirmModal">
                            <i class="fa-solid fa-paper-plane me-2"></i> បញ្ជូនវិញ្ញាសា
                        </button>
                    </div>
                </div>
            </div>

            <!-- Step 4: Result Workspace -->
            <div v-else-if="currentStep === 4" class="row" id="result-workspace">
                <div class="col-xl-6 mx-auto">
                    <div class="result-success-card p-5 text-center bg-white border-0">
                        <div class="mb-4">
                            <div class="success-icon-animation-container">
                                <i class="fa-solid fa-circle-check"></i>
                            </div>
                        </div>
                        <h2 class="fw-bold text-dark mb-2">ជោគជ័យ!</h2>
                        <p class="text-secondary small">ការប្រឡងរបស់អ្នកត្រូវបានរក្សាទុកដោយជោគជ័យ។</p>

                        <div class="row g-3 my-4">
                            <div class="col-4">
                                <div class="metric-score-card p-3 border-0">
                                    <span class="text-muted d-block mb-1"
                                        style="font-size: 0.75rem; font-weight: 600;">SCORE</span>
                                    <span class="h4 fw-bold text-success-theme mb-0">{{ reportData.score }}</span>
                                </div>
                            </div>
                            <div class="col-4">
                                <div class="metric-score-card p-3 border-0">
                                    <span class="text-muted d-block mb-1"
                                        style="font-size: 0.75rem; font-weight: 600;">CORRECT</span>
                                    <span class="h4 fw-bold text-success-theme mb-0">{{ reportData.correctCount }} / {{
                                        examQuestions.length }}</span>
                                </div>
                            </div>
                            <div class="col-4">
                                <div class="metric-score-card p-3 border-0">
                                    <span class="text-muted d-block mb-1"
                                        style="font-size: 0.75rem; font-weight: 600;">TIME USED</span>
                                    <span class="h4 fw-bold text-dark mb-0" style="color: #4b5563 !important;">{{
                                        reportData.timeSpent }}</span>
                                </div>
                            </div>
                        </div>

                        <div class="student-report-details-box p-4 text-start mb-4">
                            <h6 class="fw-bold text-dark mb-3 border-bottom pb-2"
                                style="border-color: #eaeaea !important;">របាយការណ៍បេក្ខជន</h6>
                            <div class="row g-2">
                                <div class="col-sm-6">
                                    <span class="text-muted small">ឈ្មោះសិស្ស</span>
                                    <div class="fw-bold text-dark mt-0.5">{{ studentInfo.name }}</div>
                                </div>
                                <div class="col-sm-6">
                                    <span class="text-muted small">លេខកូដសិស្ស</span>
                                    <div class="fw-bold text-dark mt-0.5">{{ studentInfo.student_code }}</div>
                                </div>
                                <div class="col-sm-6 mt-3">
                                    <span class="text-muted small">បន្ទប់រៀន</span>
                                    <div class="fw-bold text-dark mt-0.5">{{ studentInfo.room }}</div>
                                </div>
                                <div class="col-sm-6 mt-3">
                                    <span class="text-muted small">ស្ថានភាព</span>
                                    <div class="text-success-theme fw-bold mt-0.5 d-flex align-items-center gap-1">
                                        <i class="fa-solid fa-circle-check"></i> បានបញ្ជូនរួចរាល់
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="d-flex justify-content-center gap-3 actions-buttons-group">
                            <button class="btn btn-theme-submit px-4 py-2.5 border-0" @click="goToLobby">
                                <i class="fa-solid fa-house me-2"></i> ទៅកាន់ទំព័រដើម
                            </button>
                            <button class="btn btn-action-outline px-4 py-2.5" @click="printResult">
                                <i class="fa-solid fa-print me-2"></i> បោះពុម្ភលទ្ធផល
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
        <div class="modal fade" id="submitConfirmModal" tabindex="-1" aria-hidden="true" ref="confirmModalRef"
            data-bs-backdrop="static">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content border-0 custom-modal-radius shadow-lg">
                    <div class="modal-header border-0 pb-0 justify-content-end">
                        <button type="button" class="btn-close shadow-none" data-bs-dismiss="modal" aria-label="Close"
                            ref="closeModalBtnRef" :disabled="isSubmitting"></button>
                    </div>

                    <div class="modal-body text-center px-4 pb-4">
                        <div v-if="isSubmitting" class="py-4">
                            <div class="spinner-border text-success mb-3" role="status"
                                style="width: 3.5rem; height: 3.5rem;"></div>
                            <h5 class="fw-bold text-dark mb-1">កំពុងរក្សាទុក និងបញ្ជូនចម្លើយ</h5>
                            <p class="text-muted small mb-0">សូមរង់ចាំមួយភ្លែត ប្រព័ន្ធកំពុងដំណើរការទិន្នន័យ...</p>
                        </div>
                        <div v-else>
                            <div class="warning-icon-box mb-3 mx-auto">
                                <i class="fa-solid fa-circle-exclamation"></i>
                            </div>
                            <h4 class="fw-bold text-dark mb-2">បញ្ជូនវិញ្ញាសានេះ?</h4>
                            <p class="text-muted small px-2">តើអ្នកពិតជាប្រាកដថាចង់បញ្ចប់ការប្រឡង និងបញ្ជូនចម្លើយមែនទេ?
                                នៅពេលបញ្ជូនរួចរាល់ អ្នកមិនអាចកែប្រែចម្លើយបានឡើយ។</p>

                            <div class="modal-summary-box p-3 mb-4 text-start border-0">
                                <div class="d-flex justify-content-between mb-2 pb-2 border-bottom"
                                    style="border-color: #e5e7eb !important;">
                                    <span class="text-secondary"><i
                                            class="fa-solid fa-circle-check text-success me-1.5"></i>
                                        ចំនួនឆ្លើយរួច</span>
                                    <strong class="text-success">{{ answeredCount }} / {{ examQuestions.length
                                    }}</strong>
                                </div>
                                <div class="d-flex justify-content-between pt-1">
                                    <span class="text-secondary"><i
                                            class="fa-solid fa-circle-xmark text-danger me-1.5"></i> មិនទាន់ឆ្លើយ</span>
                                    <strong class="text-danger">{{ examQuestions.length - answeredCount }} / {{
                                        examQuestions.length }}</strong>
                                </div>
                            </div>

                            <div class="d-flex gap-3 justify-content-center">
                                <button type="button" class="btn btn-cancel-custom w-100 py-2.5 fw-semibold"
                                    data-bs-dismiss="modal">Cancel</button>
                                <button type="button" class="btn btn-theme-submit w-100 py-2.5 fw-semibold border-0"
                                    @click="performSubmit">Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { examApi } from '@/api/student.api.js';
import logoImage from '@/assets/images/pralong-logo.png';

const route = useRoute();
const examCode = ref('');
const examId = ref(null);

const currentStep = ref(1);
const isLobbyLoading = ref(false);
const lobbyBtnText = computed(() => isLobbyLoading.value ? 'កំពុងផ្ទៀងផ្ទាត់...' : 'ចូលប្រឡង');

const roomList = ref([]);
const confirmModalRef = ref();
const closeModalBtnRef = ref();
const isSubmitting = ref(false);
let bsModalInstance = null;

const toast = ref({ show: false, message: '', type: 'success' });
const showToast = (message, type = 'success') => {
    toast.value = { show: true, message, type };
    setTimeout(() => { toast.value.show = false; }, 4000);
};

const studentInfo = ref({
    name: '',
    student_code: '',
    room: ''
});

const examQuestions = ref([]);
const currentIdx = ref(0);
const currentQuestion = computed(() => examQuestions.value[currentIdx.value] || null);
const userAnswers = ref({});
const answeredCount = computed(() => Object.keys(userAnswers.value).length);
const reportData = ref({ score: 0, correctCount: 0, timeSpent: '00:00' });

const totalSeconds = ref(1800);
const formattedTime = ref('30:00');
const timerPercent = ref(100);
const timerStrokeDashoffset = ref(0);
let intervalId = null;

onMounted(async () => {
    let code = route.params.examCode;
    if (!code) {
        const pathSegments = window.location.pathname.split('/');
        code = pathSegments[pathSegments.length - 1] || '';
    }
    examCode.value = code;

    if (!examCode.value) {
        showToast('រកមិនឃើញលេខកូដវិញ្ញាសាឡើយ!', 'error');
        return;
    }
    try {
        const response = await examApi.checkExamCode(examCode.value);
        const examData = response.exam; 
        examId.value = examData?.id;
        if (examData?.duration) {
            totalSeconds.value = examData.duration * 60;
        }
        const roomsResponse = await examApi.getRooms();
        roomList.value = roomsResponse.data.data;
        currentStep.value = 2;
        
    }catch (error) {
        const rawMsg = error.response?.data?.msg || error.response?.data?.message || '';
        let khmerMessage = '';

        if (rawMsg.includes('Exam is not start.') || rawMsg.includes('yet')) {
            khmerMessage = 'វិញ្ញាសានេះមិនទាន់ដល់ម៉ោងចាប់ផ្តើមប្រឡងឡើយ!';
        } else if (rawMsg.includes('ended') || rawMsg.includes('expired') || rawMsg.includes('finished')) {
            khmerMessage = 'ការប្រឡងត្រូវបានបញ្ចប់រួចរាល់ហើយ!';
        } else if (rawMsg.includes('invalid') || rawMsg.includes('not found')) {
            khmerMessage = 'លេខកូដវិញ្ញាសាមិនត្រឹមត្រូវ ឬរកមិនឃើញឡើយ!';
        } else if (rawMsg) {
            khmerMessage = `${rawMsg}`; 
        } else {
            khmerMessage = 'មានបញ្ហាក្នុងការតភ្ជាប់ទៅកាន់ប្រព័ន្ធ!';
        }
        showToast(khmerMessage, 'error');
    }
});

const startExamSession = async () => {
    if (!studentInfo.value.name.trim() || !studentInfo.value.student_code.trim() || !studentInfo.value.room) {
        showToast('សូមបំពេញព័ត៌មានរបស់អ្នក', 'warning');
        return;
    }
    isLobbyLoading.value = true;
    const nameParts = studentInfo.value.name.trim().split(/\s+/);
    let firstName = nameParts[0] || '';
    let lastName = nameParts.slice(1).join(' ') || firstName;

    const payload = {
        exam_id: Number(examId.value),
        room: studentInfo.value.room,
        student_code: studentInfo.value.student_code,
        first_name: firstName,
        last_name: lastName
    };

    try {
        await examApi.startExam(payload);
        const targetIdentifier = examId.value || examCode.value;
        const response = await examApi.getQuestions(targetIdentifier);
        const responseData = response.data || response;
        const questionsArray = responseData.questions || [];

        if (questionsArray.length === 0) {
            showToast('វិញ្ញាសានេះមិនទាន់មានសំណួរនៅឡើយទេ!', 'warning');
            return;
        }

        examQuestions.value = questionsArray;
        currentStep.value = 3;
        startTimer();
    } catch (error) {
        showToast('មិនអាចចាប់ផ្តើមបានទេ៖ ' + (error.response?.data?.message || error.message), 'error');
    } finally {
        isLobbyLoading.value = false;
    }
};

const showConfirmModal = () => {
    if (window.bootstrap && window.bootstrap.Modal) {
        bsModalInstance = new window.bootstrap.Modal(confirmModalRef.value);
        bsModalInstance.show();
    } else {
        performSubmit();
    }
};

const performSubmit = async () => {
    isSubmitting.value = true;
    try {
        if (intervalId) clearInterval(intervalId);

        const formattedAnswers = Object.keys(userAnswers.value).map((qId) => {
            return {
                question_id: Number(qId),
                selected_option: userAnswers.value[qId]
            };
        });

        const submissionPayload = {
            exam_id: Number(examId.value),
            answers: formattedAnswers
        };

        const response = await examApi.submitExam(submissionPayload);
        const responseData = response.data || response;

        reportData.value = {
            score: responseData.score !== undefined ? responseData.score : 0,
            correctCount: responseData.correctCount !== undefined ? responseData.correctCount : 0,
            timeSpent: responseData.timeSpent || calculateTimeSpent()
        };
        if (bsModalInstance) {
            bsModalInstance.hide();
        } else if (closeModalBtnRef.value) {
            closeModalBtnRef.value.click();
        }
        currentStep.value = 4;
    } catch (error) {
        showToast('មានបញ្ហាក្នុងការបញ្ជូនចម្លើយ៖ ' + (error.response?.data?.message || error.message), 'error');
    } finally {
        isSubmitting.value = false;
    }
};

const calculateTimeSpent = () => {
    const usedSeconds = 1800 - totalSeconds.value;
    const mins = Math.floor(usedSeconds / 60).toString().padStart(2, '0');
    const secs = (usedSeconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
};

const loadQuestion = (idx) => { currentIdx.value = idx; };
const changeQuestion = (dir) => { currentIdx.value += dir; };
const selectOption = (qId, optValue) => { userAnswers.value[qId] = optValue; };

const startTimer = () => {
    const total = totalSeconds.value;
    intervalId = setInterval(() => {
        if (totalSeconds.value <= 0) {
            clearInterval(intervalId);
            performSubmit();
            return;
        }
        totalSeconds.value--;
        const mins = Math.floor(totalSeconds.value / 60).toString().padStart(2, '0');
        const secs = (totalSeconds.value % 60).toString().padStart(2, '0');
        formattedTime.value = `${mins}:${secs}`;
        timerPercent.value = Math.round((totalSeconds.value / total) * 100);
        timerStrokeDashoffset.value = 163.36 - (163.36 * timerPercent.value) / 100;
    }, 1000);
};

const goToLobby = () => { window.location.reload(); };
const printResult = () => { window.print(); };
</script>

<style scoped>
.logo-exam{
    width: 200px;
    height: 200px;
    margin-bottom: 1rem;
}
.logo-exam-header{
    width: 40px;
    height: 40px;
    transform: scale(3.5);
    margin-right: 5rem;
}

.brand-logo {
    height: 180px;
    width: auto;
    object-fit: contain;
    border-radius: 6px;
    transition: transform 0.2s ease;
}

.brand-logo:hover {
    transform: scale(1.04);
}

.navbar-custom {
    background-color: #ffffff;
    border-bottom: 1px solid rgba(220, 235, 228, 0.8);
    box-shadow: 0 4px 12px rgba(42, 110, 80, 0.03);
    padding: 16px 0px;
}

.take-exam-root {
    font-family: 'Inter', 'Kantumruy Pro', sans-serif;
    color: #2c3e50;
    min-height: 100vh;
    position: relative;
    background-color: #f6faf8;
}

.app-background-grid {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    background-image:
        linear-gradient(to right, rgba(26, 188, 156, 0.05) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(26, 188, 156, 0.05) 1px, transparent 1px);
    background-size: 20px 20px;
    pointer-events: none;
}

.main-content-area,
.modal {
    position: relative;
    z-index: 10;
}

.logo-text {
    font-size: 1.3rem;
    color: #42b983;
}

.brand-icon {
    color: #42b983;
    width: 100px;
    height: 40px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
}

.live-status-badge {
    background-color: #fff4e5;
    color: #f0932b;
    font-size: 12px;
    font-weight: 600;
    padding: 6px 14px;
    border-radius: 30px;
}

.pulse-indicator {
    width: 7px;
    height: 7px;
    background-color: #f0932b;
    border-radius: 50%;
    display: inline-block;
    box-shadow: 0 0 0 0 rgba(240, 147, 43, 0.4);
    animation: indicator-pulse 1.5s infinite;
}

@keyframes indicator-pulse {
    0% {
        transform: scale(0.95);
        box-shadow: 0 0 0 0 rgba(240, 147, 43, 0.7);
    }

    70% {
        transform: scale(1);
        box-shadow: 0 0 0 6px rgba(240, 147, 43, 0);
    }

    100% {
        transform: scale(0.95);
        box-shadow: 0 0 0 0 rgba(240, 147, 43, 0);
    }
}

.user-avatar-circle {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    background-color: #f3f4f6;
    color: #6b7280;
}

.lobby-form-card,
.sidebar-card,
.exam-header-card,
.question-display-card,
.submit-trigger-card,
.result-success-card {
    border-radius: 20px !important;
    border: 1px solid rgba(220, 235, 228, 0.7) !important;
    box-shadow: 0 10px 25px -5px rgba(42, 110, 80, 0.04) !important;
}

.form-label-small {
    font-size: 13px;
    font-weight: 600;
    color: #4b5563;
    margin-bottom: 6px;
    display: block;
}

.form-control-custom,
.form-select-custom {
    width: 100%;
    padding: 12px 16px 12px 42px;
    font-size: 14.5px;
    border-radius: 12px;
    border: 1px solid #dcdcdc;
    background-color: #fafafa;
    transition: all 0.2s ease;
    outline: none;
}

.form-control-custom:focus,
.form-select-custom:focus {
    border-color: #42b983;
    background-color: #ffffff;
    box-shadow: 0 0 0 3px rgba(66, 185, 131, 0.1);
}

.input-icon-left {
    position: absolute;
    left: 15px;
    top: 50%;
    transform: translateY(-50%);
    color: #a0aec0;
    font-size: 15px;
}

.btn-theme-submit {
    background-color: #42b983 !important;
    color: #ffffff !important;
    font-weight: 600;
    font-size: 15px;
    border-radius: 12px;
    transition: all 0.2s ease;
}

.btn-theme-submit:hover {
    background-color: #38a171 !important;
}

.badge-count-status {
    background-color: #eef9f4;
    color: #42b983;
    font-weight: 700;
    padding: 4px 10px;
    border-radius: 30px;
    font-size: 13px;
}

.question-nav-btn {
    aspect-ratio: 1;
    border-radius: 10px;
    font-weight: 600;
    font-size: 14px;
    border: 1px solid #e5e7eb;
    background-color: #ffffff;
    color: #4b5563;
}

.question-nav-btn.active {
    background-color: #42b983 !important;
    color: #ffffff !important;
    border-color: #42b983 !important;
}

.question-nav-btn.answered {
    background-color: #eef9f4;
    color: #42b983;
    border-color: #c2eed9;
}

.question-nav-btn.active.answered {
    background-color: #42b983 !important;
    color: #ffffff !important;
}

.legend-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    display: inline-block;
}

.active-dot {
    background-color: #42b983;
}

.answered-dot {
    background-color: #eef9f4;
    border: 1px solid #c2eed9;
}

.unanswered-dot {
    background-color: #ffffff;
    border: 1px solid #e5e7eb;
}

.badge-type-question {
    background-color: #f3f4f6;
    color: #374151;
    font-weight: 600;
    font-size: 12px;
    padding: 6px 14px;
    border-radius: 8px;
}

.question-title {
    font-size: 1.25rem;
    line-height: 1.6;
}

.choice-item-card {
    display: flex;
    align-items: center;
    padding: 14px 18px;
    background-color: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    margin-bottom: 12px;
    cursor: pointer;
}

.choice-item-card.selected {
    border-color: #42b983;
    background-color: #eef9f4;
}

.choice-prefix-badge {
    width: 28px;
    height: 28px;
    background-color: #f3f4f6;
    color: #4b5563;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 13px;
    margin-right: 14px;
}

.choice-item-card.selected .choice-prefix-badge {
    background-color: #42b983;
    color: #ffffff;
}

.custom-radio-indicator {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 2px solid #cbd5e1;
    position: relative;
}

.custom-radio-indicator.checked {
    border-color: #42b983;
    background-color: #42b983;
}

.custom-radio-indicator.checked::after {
    content: '';
    position: absolute;
    width: 6px;
    height: 6px;
    background-color: #ffffff;
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.btn-action-outline {
    background-color: transparent;
    border: 1px solid #dcdcdc;
    color: #4b5563;
    font-weight: 500;
    padding: 10px 20px;
    border-radius: 10px;
}

.success-icon-animation-container {
    color: #42b983;
    font-size: 4.5rem;
    display: inline-block;
}

.text-success-theme {
    color: #42b983 !important;
}

.metric-score-card {
    background-color: #fafafa;
    border: 1px solid #f0f0f0 !important;
    border-radius: 14px;
}

.student-report-details-box {
    background-color: #f9fbf9;
    border: 1px solid #eef4f1;
    border-radius: 14px;
}

.timer-container-box {
    border-radius: 14px;
    background-color: #ffffff;
}

.progress-ring-container {
    position: relative;
    width: 50px;
    height: 50px;
}

.progress-ring-circle {
    transform: rotate(-90deg);
    transform-origin: 25px 25px;
    transition: stroke-dashoffset 0.35s;
    stroke-linecap: round;
}

.progress-timer-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 11px;
    font-weight: 700;
}

.custom-modal-radius {
    border-radius: 24px !important;
}

.warning-icon-box {
    width: 65px;
    height: 65px;
    background-color: #fffbeb;
    color: #d97706;
    font-size: 2rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal-summary-box {
    background-color: #f9fafb;
    border-radius: 14px;
}

.btn-cancel-custom {
    background-color: #f3f4f6;
    color: #4b5563;
    border-radius: 12px;
}
/* ── CUSTOM SLIM TOAST CONTAINER ── */
.custom-toast-wrapper {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 9999;
  min-width: 280px;
  max-width: 380px;
  padding: 12px 16px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  box-shadow: 0 10px 25px rgba(15, 23, 42, 0.15);
  backdrop-filter: blur(8px);
  animation: toastSlideUp 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
}
.toast-content-box {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-grow: 1;
}

.toast-icon {
  font-size: 1.15rem;
  flex-shrink: 0;
}

.toast-text {
  font-size: 0.85rem;
  font-weight: 500;
  line-height: 1.4;
}
.toast-close-btn {
  background: none;
  border: none;
  padding: 0;
  color: inherit;
  opacity: 0.6;
  font-size: 0.85rem;
  cursor: pointer;
  transition: opacity 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}
.toast-close-btn:hover {
  opacity: 1;
}

/* toast msg */
.custom-toast-wrapper.success {
  background-color: rgba(16, 185, 129, 0.95); 
  color: #ffffff;
  border: 1px solid rgba(16, 185, 129, 0.2);
}

.custom-toast-wrapper.error {
  background-color: rgba(239, 68, 68, 0.95);
  color: #ffffff;
  border: 1px solid rgba(239, 68, 68, 0.2);
}

.custom-toast-wrapper.warning {
  background-color: rgba(245, 158, 11, 0.95);
  color: #ffffff;
  border: 1px solid rgba(245, 158, 11, 0.2);
}
@keyframes toastSlideUp {
  from {
    transform: translateY(30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>