<template>
  <div class="exam-detail-view-container p-4">
    <div class="header-banner-modern d-flex align-items-center justify-content-between p-4 mb-4">
      <div class="d-flex align-items-center gap-3">
        <button class="btn-back-aurora d-flex align-items-center justify-content-center" @click="goBack">
          <i class="fas fa-chevron-left"></i>
        </button>
        <div>
          <div class="d-flex align-items-center gap-2">
            <span class="badge-id-neon">Exam ID: #{{ examId }}</span>
          </div>
          <h3 class="exam-title-premium mt-2 mb-0">{{ examData.title || 'កំពុងទាញយកចំណងជើង...' }}</h3>
        </div>
      </div>
      
      <div class="d-flex gap-3 meta-info-header">
        <div class="meta-glass-pill text-start">
          <div class="meta-icon-neon icon-purple">
            <i class="far fa-clock"></i>
          </div>
          <div>
            <div class="meta-label-sub">Duration</div>
            <div class="meta-value-main">{{ examData.duration || 0 }} នាទី</div>
          </div>
        </div>
        
        <div class="meta-glass-pill text-start">
          <div class="meta-icon-neon icon-teal">
            <i class="fas fa-chart-pie"></i>
          </div>
          <div>
            <div class="meta-label-sub">Total Weight</div>
            <div class="meta-value-main">{{ examData.total_points || 0 }} PT</div>
          </div>
        </div>
      </div>
    </div>

    <div class="row justify-content-center">
      <div class="col-12 col-xl-10" id="questionFeed">
        
        <div v-if="loading" class="text-center py-5 state-card-glass">
          <div class="spinner-aurora mx-auto" role="status"></div>
          <p class="text-slate-muted small mt-3 mb-0 fw-medium">កំពុងទាញយកសំណួរ និងចម្លើយពីប្រព័ន្ធ...</p>
        </div>

        <div v-else-if="questionsList.length === 0" class="text-center py-5 state-card-glass text-muted">
          <div class="empty-neon-box mb-3 mx-auto">
            <i class="fas fa-folder-open"></i>
          </div>
          <p class="mb-0 fw-semibold text-slate-dark">វិញ្ញាសានេះមិនទាន់មានសំណួរណាមួយឡើយ。</p>
        </div>

        <div v-else>
          <div v-for="(q, index) in questionsList" :key="q.id" class="question-premium-card mb-4 slide-in">
            <div class="q-card-header-top d-flex align-items-center justify-content-between px-4 py-3">
              <div class="d-flex align-items-center gap-3">
                <div class="q-index-neon-badge">{{ index + 1 }}</div>
                <span class="q-khmer-title-bold">សំណួរទី {{ getKhmerNumber(index + 1) }}</span>
              </div>
              <span class="badge-points-neon-pill">{{ q.points || 5 }} points</span>
            </div>

            <div class="p-4 d-flex flex-column gap-3">
              <h5 class="question-heading-text-style mb-1">{{ q.question }}</h5>
              
              <div class="section-divider-lbl-modern">ជម្រើសចម្លើយ និងចម្លើយត្រឹមត្រូវ</div>
              
              <div class="d-flex flex-column gap-2.5">
                <div v-for="(choiceText, cIdx) in q.options" 
                     :key="cIdx" 
                     class="modern-interactive-choice-row px-4 py-3 d-flex align-items-center justify-content-between"
                     :class="{ 'choice-row-correct-neon': isCorrectAnswer(q.correct_answer, choiceText) }">
                  
                  <div class="d-flex align-items-center gap-3">
                    <div class="choice-alpha-neon-badge">{{ getKhmerAlphabet(cIdx) }}</div>
                    <span class="choice-text-label-content">{{ choiceText }}</span>
                  </div>

                  <span v-if="isCorrectAnswer(q.correct_answer, choiceText)" class="badge-correct-neon-indicator">
                    <i class="fas fa-check-circle me-1.5"></i> Correct Choice
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import api from '@/api/axiosInstance'

const props = defineProps({
  examId: {
    type: String,
    required: true
  }
})

const router = useRouter()
const toast = useToast()

const examData = ref({})
const questionsList = ref([])
const loading = ref(false)

const KH_N = ["១", "២", "៣", "៤", "៥", "៦", "៧", "៨", "៩", "១០"]
const KH = ["ក", "ខ", "គ", "ឃ", "ង", "ច"]

const getKhmerNumber = (num) => KH_N[num - 1] || num.toString()
const getKhmerAlphabet = (idx) => KH[idx] || String.fromCharCode(65 + idx)

const isCorrectAnswer = (correctAnswer, currentChoice) => {
  if (!correctAnswer) return false
  if (Array.isArray(correctAnswer)) {
    return correctAnswer.map(String).includes(String(currentChoice).trim())
  }
  return String(correctAnswer).trim() === String(currentChoice).trim()
}

const fetchExamAndQuestions = async () => {
  try {
    loading.value = true
    
    const examRes = await api.get(`/exams/${props.examId}`)
    examData.value = examRes.data?.data || examRes.data || {}

    const questionsRes = await api.get(`/exams/question/teacher/${props.examId}`)
    const rawQuestions = questionsRes.data?.data || questionsRes.data?.questions || []
    
    questionsList.value = rawQuestions.map(q => {
      let opts = q.options
      let ans = q.correct_answer
      if (typeof opts === 'string') { try { opts = JSON.parse(opts) } catch (e) { opts = [] } }
      if (typeof ans === 'string') { try { ans = JSON.parse(ans) } catch (e) { ans = [ans] } }
      return { ...q, options: opts, correct_answer: ans }
    })

  } catch (err) {
    console.error("Failed to load exam details:", err)
    toast.error("មិនអាចទាញយកសំណួរនៃវិញ្ញាសានេះបានទេ!")
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchExamAndQuestions()
})

const goBack = () => router.go(-1)
</script>

<style scoped>
.exam-detail-view-container {
  background-color: #f8fafc;
  min-height: 100vh;
  font-family: 'Inter', system-ui, sans-serif;
}
.header-banner-modern {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  border-radius: 24px;
  border: 1px solid rgba(226, 232, 240, 0.8);
}
.btn-back-aurora {
  width: 44px;
  height: 44px;
  border-radius: 14px;
  border: 1px solid #e2e8f0;
  background: #ffffff;
  color: #475569;
}
.badge-id-neon {
  background: rgba(104, 35, 255, 0.06);
  color: #6823ff;
  font-weight: 700;
  padding: 6px 14px;
  border-radius: 100px;
}
.exam-title-premium {
  color: #0f172a;
  font-weight: 800;
}
.meta-glass-pill {
  display: flex;
  align-items: center;
  gap: 14px;
  background: #ffffff;
  padding: 10px 20px;
  border-radius: 16px;
  border: 1px solid #edf2f7;
}
.meta-icon-neon {
  width: 36px;
  height: 36px;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.icon-purple { background: rgba(104, 35, 255, 0.07); color: #6823ff; }
.icon-teal { background: rgba(19, 112, 127, 0.07); color: #13707F; }
.meta-label-sub {
  font-size: 0.65rem;
  font-weight: 700;
  color: #94a3b8;
  text-transform: uppercase;
}
.meta-value-main {
  font-size: 1rem;
  font-weight: 800;
  color: #1e293b;
}
.state-card-glass {
  background: #ffffff;
  border-radius: 24px;
  border: 1px solid #edf2f7;
  padding: 50px 20px;
}
.spinner-aurora {
  width: 28px;
  height: 28px;
  border: 3px solid rgba(19, 112, 127, 0.12);
  border-top-color: #13707F;
  border-radius: 50%;
  animation: spinEffect 0.8s linear infinite;
}
@keyframes spinEffect { to { transform: rotate(360deg); } }
.empty-neon-box {
  width: 60px;
  height: 60px;
  background: rgba(148, 163, 184, 0.08);
  color: #94a3b8;
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.question-premium-card {
  background: #ffffff;
  border-radius: 24px;
  border: 1px solid #edf2f7;
  overflow: hidden;
}
.q-card-header-top {
  background-color: #fcfdfe;
  border-bottom: 1px solid #f1f5f9;
}
.q-index-neon-badge {
  background: linear-gradient(135deg, #13707F, #0e5460);
  color: #ffffff;
  width: 28px;
  height: 28px;
  border-radius: 10px;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
}
.q-khmer-title-bold {
  font-weight: 700;
  color: #1e293b;
}
.badge-points-neon-pill {
  background: rgba(16, 185, 129, 0.06);
  color: #10b981;
  font-weight: 700;
  font-size: 0.72rem;
  padding: 5px 14px;
  border-radius: 100px;
}
.question-heading-text-style {
  color: #0f172a;
  font-weight: 700;
  line-height: 1.6;
  text-align: left;
}
.section-divider-lbl-modern {
  font-size: 0.65rem;
  font-weight: 700;
  color: #94a3b8;
  text-transform: uppercase;
  text-align: left;
}
.modern-interactive-choice-row {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
}
.choice-alpha-neon-badge {
  background: #f1f5f9;
  color: #64748b;
  width: 26px;
  height: 26px;
  border-radius: 8px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
}
.choice-text-label-content {
  color: #334155;
  font-weight: 500;
}
.choice-row-correct-neon {
  background-color: rgba(16, 185, 129, 0.02) !important;
  border-color: rgba(16, 185, 129, 0.28) !important;
}
.choice-row-correct-neon .choice-alpha-neon-badge {
  background: #10b981 !important;
  color: #ffffff !important;
}
.choice-row-correct-neon .choice-text-label-content {
  color: #065f46 !important;
  font-weight: 600;
}
.badge-correct-neon-indicator {
  background: rgba(16, 185, 129, 0.08);
  color: #10b981;
  font-weight: 700;
  font-size: 0.68rem;
  padding: 5px 14px;
  border-radius: 100px;
}
.slide-in {
  animation: cardEntranceSmooth 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
@keyframes cardEntranceSmooth {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>