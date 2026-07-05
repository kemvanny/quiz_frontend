<template>
    <div class="container py-5" style="max-width: 1000px;">
        <div class="d-flex align-items-center justify-content-between mb-5">
            <router-link to="/student/analytics-result" class="btn back-btn d-flex align-items-center gap-2">
                <i class="bi bi-arrow-left-short fs-5"></i> ត្រឡប់ក្រោយ
            </router-link>
            <span class="badge status-badge px-4 py-2 rounded-pill" :class="getStatusBadgeClass(scoreSummary?.status)">
                <i class="bi me-2"
                    :class="scoreSummary?.status === 'graded' ? 'bi-check-circle-fill' : 'bi-hourglass-split'"></i>
                {{ scoreSummary?.status === 'graded' ? 'កែរួចរាល់' : 'កំពុងដំណើរការ' }}
            </span>
        </div>

        <div v-if="scoreSummary && reviewDetails.length > 0">
            <div class="card main-score-card border-0 mb-5">
                <div class="card-body p-4 p-md-5">
                    <div class="row g-4 align-items-center">
                        <div class="col-12 col-md-4 text-center border-end-md">
                            <div class="score-radial-progess mx-auto mb-3">
                                <div class="score-circle-inner mt-3">
                                    <span class="score-number">{{ scoreSummary.total_score }}</span>
                                    <p class="score-label">ពិន្ទុរួម</p>
                                </div>
                            </div>
                            <div class="total-questions-tag">សរុបសំណួរ៖ {{ scoreSummary.total_questions }}</div>
                        </div>

                        <div class="col-12 col-md-8 ps-md-4">
                            <h5 class="fw-bold text-dark dashboard-title mb-4 text-center text-md-start">របាយការណ៍លទ្ធផល
                            </h5>
                            <div class="row g-3">
                                <div class="col-4">
                                    <div class="stat-card correct-card">
                                        <div class="stat-icon"><i class="bi bi-check-lg"></i></div>
                                        <div class="stat-num">{{ scoreSummary.correct_count }}</div>
                                        <div class="stat-label">ឆ្លើយត្រូវ</div>
                                    </div>
                                </div>
                                <div class="col-4">
                                    <div class="stat-card incorrect-card">
                                        <div class="stat-icon"><i class="bi bi-x-lg"></i></div>
                                        <div class="stat-num">{{ scoreSummary.incorrect_count }}</div>
                                        <div class="stat-label">ឆ្លើយខុស</div>
                                    </div>
                                </div>
                                <div class="col-4">
                                    <div class="stat-card unanswered-card">
                                        <div class="stat-icon"><i class="bi bi-dash-square"></i></div>
                                        <div class="stat-num">{{ scoreSummary.unanswered_count }}</div>
                                        <div class="stat-label">មិនបានឆ្លើយ</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="d-flex align-items-center gap-2 mb-4 ps-2">
                <div class="section-indicator-dot"></div>
                <h6 class="fw-bold m-0 text-dark dashboard-title">ពិនិត្យមើលចម្លើយឡើងវិញ</h6>
            </div>

            <div v-for="(item, index) in reviewDetails" :key="item.question_id" class="card question-card border-0 mb-4"
                :class="item.status">
                <div class="card-body p-4 p-md-5">

                    <div class="d-flex justify-content-between align-items-center mb-4">
                        <span class="question-number-tag">សំណួរទី {{ index + 1 }}</span>
                        <span class="badge question-status-badge rounded-pill px-3 py-1.5" :class="item.status">
                            <i class="bi me-1.5"
                                :class="item.status === 'correct' ? 'bi-patch-check-fill' : (item.status === 'incorrect' ? 'bi-x-circle-fill' : 'bi-exclamation-circle-fill')"></i>
                            {{ getQuestionStatusLabel(item.status) }}
                        </span>
                    </div>

                    <p class="text-dark fw-bold mb-4 fs-6 lh-base question-heading">{{ item.question_text }}</p>

                    <div class="row g-3 mb-4">
                        <div v-for="option in item.options" :key="option" class="col-12 col-md-6">
                            <div class="mini-option-box p-3 px-3 rounded-4 d-flex align-items-center justify-content-between"
                                :class="getOptionBorderClass(item, option)">

                                <div class="d-flex align-items-center gap-2">
                                    <div class="option-indicator-dot"></div>
                                    <span class="small option-text">{{ option }}</span>
                                </div>
                                <i v-if="getOptionBorderClass(item, option) === 'option-correct'"
                                    class="bi bi-check-circle-fill text-success fs-6"></i>
                                <i v-else-if="getOptionBorderClass(item, option) === 'option-incorrect'"
                                    class="bi bi-x-circle-fill text-danger fs-6"></i>
                            </div>
                        </div>
                    </div>

                    <div v-if="item.status === 'correct'"
                        class="banner-premium correct-p-banner d-flex align-items-center gap-3 p-3 rounded-4">
                        <div class="banner-p-icon correct-i"><i class="bi bi-emoji-smile-fill"></i></div>
                        <div class="banner-content small text-success">
                            <span class="fw-bold">ចម្លើយត្រឹមត្រូវ!</span> បានជ្រើសរើសចម្លើយ៖ <span
                                class="fw-bold text-dark p-1 m-2 bg-white rounded shadow-sm m-1">{{ item.student_answer
                                }}</span>
                        </div>
                    </div>

                    <div v-else-if="item.status === 'incorrect'"
                        class="banner-premium incorrect-p-banner d-flex align-items-start gap-3 p-3 rounded-4">
                        <div class="banner-p-icon incorrect-i"><i class="bi bi-exclamation-diamond-fill"></i></div>
                        <div class="banner-content small text-danger-deep">
                            <div class="fw-bold mb-1 fs-6-sm">មិនត្រឹមត្រូវទេ!</div>
                            <div class="lh-base">ចម្លើយរបស់អ្នក៖ <span
                                    class="text-decoration-line-through fw-bold text-muted me-3">{{ item.student_answer
                                    }}</span> ចម្លើយត្រឹមត្រូវគឺ៖ <span
                                    class="fw-bold text-success bg-white px-2 py-0.5 rounded shadow-sm border border-success-subtle">{{
                                        Array.isArray(item.correct_answer) ? item.correct_answer.join(', ') :
                                    item.correct_answer }}</span></div>
                        </div>
                    </div>

                    <div v-else-if="item.status === 'unanswered'"
                        class="banner-premium unanswered-p-banner d-flex align-items-start gap-3 p-3 rounded-4">
                        <div class="banner-p-icon unanswered-i"><i class="bi bi-info-circle-fill"></i></div>
                        <div class="banner-content small text-warning-deep">
                            <div class="fw-bold mb-1">អ្នកមិនបានឆ្លើយសំណួរនេះទេ!</div>
                            <div>ចម្លើយត្រឹមត្រូវគឺ៖ <span
                                    class="fw-bold text-success bg-white px-2 py-0.5 rounded shadow-sm border border-warning-subtle">{{
                                        Array.isArray(item.correct_answer) ? item.correct_answer.join(', ') :
                                    item.correct_answer }}</span></div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getExamResult } from '@/api/student.api';

const route = useRoute();
const isLoading = ref(true);
const scoreSummary = ref(null);
const reviewDetails = ref([]);

const fetchResult = async () => {
    try {
        isLoading.value = true;

        const examId = route.params.examId;
        const studentId = route.params.studentId;

        const response = await getExamResult(examId, studentId);
        if (response.data && response.data.result === true) {
            scoreSummary.value = response.data.data.score_summary;
            reviewDetails.value = response.data.data.review_details;

        } else {
            console.warn("Backend ត្រឡប់តម្លៃមក result: false");
        }

    } catch (error) {
        console.error(error);
    } finally {
        isLoading.value = false;
    }
};

onMounted(() => {
    fetchResult();
});
defineProps({
    isLoading: Boolean,
    scoreSummary: Object,
    reviewDetails: Array
});

const getQuestionStatusLabel = (status) => {
    if (status === 'correct') return 'ត្រឹមត្រូវ';
    if (status === 'incorrect') return 'ខុសជម្រើស';
    return 'មិនបានឆ្លើយ';
};

const getStatusBadgeClass = (status) => {
    return status === 'graded' ? 'bg-success-subtle text-success' : 'bg-warning-subtle text-warning';
};

const getOptionBorderClass = (item, option) => {
  const correctAnswers = Array.isArray(item.correct_answer) 
    ? item.correct_answer 
    : [item.correct_answer];
  if (correctAnswers.includes(option)) {
    return 'option-correct';
  }
  if (item.status === 'incorrect' && item.student_answer === option) {
    return 'option-incorrect';
  }
  return 'option-normal';
};
</script>



<style scoped>
.container {
    font-family: 'Kantumruy Pro', 'Inter', system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;

}

.mini-option-box, .option-item-premium {
  background-color: #ffffff;
  color: #334155;
  border: 1px solid #e2e8f0 !important;
  transition: all 0.2s ease;
}

.option-correct {
  background-color: #f0faf4 !important;
  border-color: #198754 !important;
  color: #146c43 !important;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(25, 135, 84, 0.04);
}
.option-correct .option-indicator-dot {
  background-color: #198754 !important;
}

.option-incorrect {
  background-color: #fff5f5 !important;
  border-color: #dc3545 !important;
  color: #b02a37 !important;
  font-weight: 500;
}
.option-incorrect .option-indicator-dot {
  background-color: #dc3545 !important;
}

.dashboard-title,
.question-heading {
    font-family: 'Kantumruy Pro', sans-serif;
    letter-spacing: -0.2px;
}

.back-btn {
    background: #ffffff;
    color: #495057;
    border: 1px solid #eef1f6;
    font-size: 0.85rem;
    font-weight: 600;
    padding: 0.6rem 1.2rem;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);
    transition: all 0.25s ease;
}

.back-btn:hover {
    background-color: #f8fafc;
    border-color: #e2e8f0;
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.04);
}

.status-badge {
    font-weight: 600;
    font-size: 0.825rem;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.02);
}

.status-badge.graded {
    background: linear-gradient(135deg, #e8f5e9, #c8e6c9);
    color: #1b5e20;
}

.status-badge.pending {
    background: linear-gradient(135deg, #fff3cd, #ffe082);
    color: #744210;
}

.main-score-card {
    background: #ffffff;
    border-radius: 24px;
    box-shadow: 0 15px 40px rgba(24, 50, 90, 0.04);
    border: 1px solid #f0f4f8 !important;
}

.border-end-md {
    border-bottom: 1px solid #f1f5f9;
    padding-bottom: 2rem;
}

@media (min-width: 768px) {
    .border-end-md {
        border-bottom: 0;
        border-right: 1px solid #f1f5f9 !important;
        padding-bottom: 0;
    }
}

.score-radial-progess {
    width: 140px;
    height: 140px;
    border-radius: 50%;
    background: linear-gradient(145deg, #ffffff, #f0faf3);
    display: flex;
    align-items: center;
    justify-content: center;
    border: 6px solid #e1f5eb;
    box-shadow: inset 0 4px 10px rgba(0, 0, 0, 0.01), 0 8px 24px rgba(25, 135, 84, 0.08);
}

.score-number {
    font-family: 'Inter', sans-serif;
    font-size: 1.5rem;
    font-weight: 800;
    color: #198754;
    line-height: 1;
}

.score-label {
    font-size: 0.75rem;
    color: #7e8b9b;
    font-weight: 600;
    margin-top: 4px;
}

.total-questions-tag {
    background-color: #f1f5f9;
    color: #475569;
    padding: 4px 16px;
    border-radius: 20px;
    display: inline-block;
    font-size: 0.75rem;
    font-weight: 600;
}

.stat-card {
    background: #ffffff;
    border: 1px solid #f1f5f9;
    padding: 1.25rem 0.5rem;
    border-radius: 16px;
    text-align: center;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.01);
    transition: transform 0.2s;
}

.stat-card:hover {
    transform: translateY(-2px);
}

.stat-icon {
    font-size: 1.1rem;
    margin-bottom: 0.25rem;
}

.stat-num {
    font-family: 'Inter', sans-serif;
    font-size: 1.65rem;
    font-weight: 700;
    line-height: 1.2;
}

.stat-label {
    font-size: 0.75rem;
    font-weight: 600;
    color: #64748b;
}

.correct-card {
    background: linear-gradient(180deg, #ffffff 0%, #f4fbf7 100%);
    border-bottom: 4px solid #198754;
}

.correct-card .stat-icon,
.correct-card .stat-num {
    color: #198754;
}

.incorrect-card {
    background: linear-gradient(180deg, #ffffff 0%, #fff8f8 100%);
    border-bottom: 4px solid #dc3545;
}

.incorrect-card .stat-icon,
.incorrect-card .stat-num {
    color: #dc3545;
}

.unanswered-card {
    background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
    border-bottom: 4px solid #64748b;
}

.unanswered-card .stat-icon,
.unanswered-card .stat-num {
    color: #64748b;
}

.section-indicator-dot {
    width: 8px;
    height: 8px;
    background-color: #198754;
    border-radius: 50%;
    box-shadow: 0 0 0 4px #e1f5eb;
}

.question-card {
    background: #ffffff;
    border-radius: 24px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.02);
    border: 1px solid #f1f5f9 !important;
    transition: all 0.3s ease;
}

.question-card:hover {
    box-shadow: 0 15px 35px rgba(24, 50, 90, 0.05);
}

.question-number-tag {
    font-size: 0.8rem;
    font-weight: 700;
    color: #64748b;
    background-color: #f1f5f9;
    padding: 4px 12px;
    border-radius: 8px;
}

.question-heading {
    color: #1e293b;
    font-size: 1.05rem !important;
}

.question-status-badge {
    font-size: 0.75rem;
    font-weight: 600;
}

.question-status-badge.correct {
    background-color: #e8f5e9;
    color: #198754;
}

.question-status-badge.incorrect {
    background-color: #fde8e8;
    color: #e11d48;
}

.question-status-badge.unanswered {
    background-color: #fef3c7;
    color: #d97706;
}

.option-item-premium {
    background-color: #ffffff;
    color: #334155;
    border: 1px solid #e2e8f0 !important;
    transition: all 0.2s ease;
    cursor: default;
}

.option-indicator-dot {
    width: 6px;
    height: 6px;
    background-color: #cbd5e1;
    border-radius: 50%;
}

.option-correct {
    background: linear-gradient(145deg, #ffffff, #f0faf4) !important;
    border-color: #a3cfbb !important;
    color: #146c43 !important;
    font-weight: 600;
    box-shadow: 0 4px 12px rgba(25, 135, 84, 0.05);
}

.option-correct .option-indicator-dot {
    background-color: #198754;
}

.option-incorrect {
    background: linear-gradient(145deg, #ffffff, #fff5f5) !important;
    border-color: #f5c2c7 !important;
    color: #b02a37 !important;
}

.option-incorrect .option-indicator-dot {
    background-color: #dc3545;
}

.banner-premium {
    border: 1px solid transparent;
}

.banner-p-icon {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1rem;
    flex-shrink: 0;
}

.correct-p-banner {
    background-color: #f4fbf7;
    border-color: #d1e7dd;
}

.correct-i {
    background-color: #e1f5eb;
    color: #198754;
}

.incorrect-p-banner {
    background-color: #fff8f8;
    border-color: #f8d7da;
}

.incorrect-i {
    background-color: #ffebee;
    color: #dc3545;
}

.text-danger-deep {
    color: #991b1b;
}

.unanswered-p-banner {
    background-color: #fffbf2;
    border-color: #fff3cd;
}

.unanswered-i {
    background-color: #fef3c7;
    color: #d97706;
}

.text-warning-deep {
    color: #92400e;
}
</style>
