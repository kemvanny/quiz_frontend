<template>
  <div class="quiz-builder-container">
    <div class="app-shell flex-grow-1 overflow-hidden">
      <div class="main-col">
        <div class="workspace">
          
          <div class="panel d-flex flex-column" style="height: 100%; max-height: calc(100vh - 120px);">
            <div class="panel-head flex-shrink-0">
              <span class="panel-lbl">Question List</span>
              <span class="panel-count" id="qCountLabel">{{ questions.length }} Q</span>
            </div>
            
            <div class="q-nav-scroll flex-grow-1 overflow-y-auto" ref="qNavScrollRef" style="max-height: calc(100% - 100px);">
              <div v-for="(q, idx) in questions" 
                   :key="idx"
                   :id="`qnav-${idx}`"
                   class="q-nav-item slide-in" 
                   :class="{ active: selectedQuestionIndex === idx }"
                   @click="selectQuestion(idx)">
                <span>សំណួរទី {{ getKhmerNumber(idx + 1) }}</span>
                <span class="q-badge">{{ q.pts }}pt</span>
              </div>
            </div>

            <div class="p-2 border-top bg-white flex-shrink-0">
              <button class="btn btn-sm fw-bold rounded-3 border-0 add-q-btn w-100 py-2"
                style="border:1.5px dashed rgba(16,185,129,.35)!important; background:rgba(16,185,129,.04); color:var(--em); font-size:.78rem;"
                @click="addNewQuestion">
                <i class="fas fa-plus-circle me-1"></i> បន្ថែមសំណួរថ្មី
              </button>
            </div>
          </div>

          <div class="feed-col" id="questionFeed">
            <div class="flex-shrink-0 mb-2 p-3 position-relative overflow-hidden quiz-info-header">
              <div class="position-absolute decoration-circle"></div>
              <div class="position-relative z-1 d-flex flex-column gap-1">
                <div class="d-flex align-items-center gap-2 mb-1">
                  <div class="d-flex align-items-center justify-content-center rounded-circle icon-circle">
                    <i class="fas fa-feather-alt" style="font-size: .6rem;"></i>
                  </div>
                  <div class="quiz-info-lbl">Quiz Info</div>
                </div>
                <input type="text" v-model="quizTitle" class="w-100 border-0 fw-bold p-0 text-dark quiz-title-input" onfocus="this.style.color='var(--em)'" onblur="this.style.color='var(--txt)'" placeholder="Please Input Quiz Title...">
                <textarea v-model="quizInstructions" class="w-100 border-0 p-0 m-0 quiz-desc-input" rows="1" placeholder="Provide optional instructions..." @input="autoGrowTextarea"></textarea>
              </div>
            </div>

            <div v-for="(q, qIdx) in questions" 
                 :key="qIdx" 
                 :id="`qcard-${qIdx}`"
                 class="q-card slide-in" 
                 :class="{ 'active-card': selectedQuestionIndex === qIdx }"
                 @click="selectedQuestionIndex = qIdx">
              
              <div class="d-flex align-items-center justify-content-between px-3 py-2 border-bottom bg-light">
                <div class="d-flex align-items-center gap-2">
                  <div class="q-num-badge">{{ qIdx + 1 }}</div>
                  <span class="fw-bold" style="font-size:.85rem;color:var(--txt)">សំណួរទី {{ getKhmerNumber(qIdx + 1) }}</span>
                </div>
                <div class="pts-pill">
                  <label>pts</label>
                  <input type="number" v-model.number="q.pts" min="0" class="pts-input">
                </div>
              </div>

              <div class="p-3 d-flex flex-column gap-2">
                <textarea v-model="q.text" class="q-field" rows="3" placeholder="Type your question here…"></textarea>
                <div class="text-uppercase fw-bold text-muted" style="font-size:.6rem;letter-spacing:1.1px">Answers &amp; Choices</div>
                
                <div class="d-flex flex-column gap-2">
                  <div v-for="(choice, cIdx) in q.choices" 
                       :key="cIdx" 
                       class="choice-row" 
                       :class="{ 'correct-highlight': choice.isCorrect }">
                    <div class="choice-lbl">{{ getKhmerAlphabet(cIdx) }}</div>
                    <input type="text" v-model="choice.text" class="choice-input" placeholder="បញ្ចូលខ្លឹមសារចម្លើយ…">
                    
                    <div class="d-flex align-items-center gap-2 flex-shrink-0">
                      <span class="text-muted correct-label">Correct?</span>
                      <input class="form-check-input cr shadow-none m-0" 
                             type="radio" 
                             :name="`q_correct_${qIdx}`" 
                             :checked="choice.isCorrect"
                             @change="setCorrectChoice(qIdx, cIdx)">
                      <button class="btn btn-sm p-1 text-secondary border-0 remove-choice-btn" 
                              @click="removeChoice(qIdx, cIdx)">
                        <i class="fas fa-times-circle"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div class="d-flex align-items-center justify-content-between px-3 pb-3">
                <button class="btn btn-sm fw-bold rounded-3 border-0 bg-transparent text-emerald" style="color:var(--em);font-size:.76rem" @click="addChoice(qIdx)">
                  <i class="fas fa-plus-circle me-1"></i> បន្ថែមជម្រើស
                </button>
                <button v-if="questions.length > 1" class="btn btn-sm btn-outline-danger rounded-3 fw-bold" style="font-size:.72rem" @click.stop="removeQuestion(qIdx)">
                  <i class="fas fa-trash-alt me-1"></i> Remove
                </button>
              </div>
            </div>
          </div>

          <div class="panel">
            <div class="panel-head">
              <span class="panel-lbl">Quiz Progress</span>
            </div>
            <div class="flex-grow-1 overflow-y-auto p-3 d-flex flex-column gap-3" style="padding:16px 14px">
              <div class="d-flex justify-content-center">
                <div style="position:relative;width:120px;height:120px">
                  <svg width="120" height="120" viewBox="0 0 120 120" class="svg-ring">
                    <circle cx="60" cy="60" r="50" class="ring-bg"/>
                    <circle cx="60" cy="60" r="50" class="ring-fill" :style="{ strokeDashoffset: circleStrokeDashoffset, stroke: progressColor }"/>
                  </svg>
                  <div class="position-absolute top-50 start-50 translate-middle text-center">
                    <div class="fw-bold" :style="{ color: progressColor }" style="font-size:1.4rem;line-height:1">{{ totalPoints }}</div>
                    <div style="font-size:.62rem;font-weight:700;color:var(--txt-mu)">/ 100 PT</div>
                  </div>
                </div>
              </div>

              <div class="text-center">
                <div class="fw-bold" style="font-size:.88rem;color:var(--txt)">Quiz Progress</div>
                <div class="text-muted" style="font-size:.7rem;line-height:1.5">Accumulated points across all questions.</div>
              </div>

              <hr class="my-1"/>

              <div class="d-flex flex-column gap-2 mb-2">
                <div class="d-flex justify-content-between align-items-center">
                  <span style="font-size:.73rem;font-weight:600;color:var(--txt-mu)"><i class="fas fa-layer-group me-1" style="color:var(--em)"></i>Questions</span>
                  <span class="fw-bold" style="font-size:.77rem;color:var(--txt)">{{ questions.length }}</span>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                  <span style="font-size:.73rem;font-weight:600;color:var(--txt-mu)"><i class="fas fa-star me-1" style="color:var(--em)"></i>Total Pts</span>
                  <span class="fw-bold" style="font-size:.77rem;color:var(--txt)">{{ totalPoints }} / 100</span>
                </div>
              </div>
              <button class="btn btn-outline-secondary btn-sm rounded-3 fw-bold w-100" @click="openPreviewModal">
                <i class="fas fa-eye me-1"></i> Preview
              </button>
              
              <button class="btn btn-sm rounded-3 fw-bold text-white w-100 save-publish-btn" style="background:linear-gradient(135deg,var(--em),var(--em-dk));box-shadow:0 4px 14px rgba(16,185,129,.3)" @click="finalizePublish" :disabled="isSubmitting">
                <span v-if="isSubmitting" class="spinner-border spinner-border-sm me-1"></span>
                <i v-else class="fas fa-paper-plane me-1"></i> Publish
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>

    <div class="modal-overlay" v-if="showPreviewModal" @click.self="showPreviewModal = false">
      <div class="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
        <div class="modal-content border-0 rounded-4 shadow-lg overflow-hidden" style="background: #f8fafc;">
          <div style="height: 6px; background: linear-gradient(90deg, var(--em), var(--em-dk));"></div>
          <div class="modal-header border-0 pb-0 px-4 pt-4">
            <h5 class="modal-title fw-bold text-dark d-flex align-items-center gap-2">
              <i class="fas fa-eye" style="color: var(--em);"></i> Student Preview
            </h5>
            <button type="button" class="btn-close shadow-none" @click="showPreviewModal = false"></button>
          </div>
          <div class="modal-body p-4" style="user-select: none; -webkit-user-select: none; max-height: 60vh; overflow-y: auto;">
            <div class="mb-4 pb-3 border-bottom text-center">
              <h3 class="fw-bold" style="color: var(--txt);">{{ quizTitle || 'Untitled Quiz' }}</h3>
              <p class="text-muted small mb-1" v-if="quizInstructions">{{ quizInstructions }}</p>
              <p class="text-muted small mb-0">This is exactly how students will see the exam.</p>
            </div>
            <div v-if="questions.length === 0" class="text-center py-5 text-muted">
              <i class="fas fa-inbox fa-3x mb-3 opacity-50"></i>
              <p>No questions added yet.</p>
            </div>
            <div v-else>
              <div v-for="(q, index) in questions" :key="index" class="mb-4">
                <div class="d-flex justify-content-between align-items-center mb-3">
                  <span class="badge bg-secondary text-white rounded-pill px-3 py-2">Question {{ index + 1 }}</span>
                  <span class="text-muted fw-bold" style="font-size: .85rem;">{{ q.pts }} Points</span>
                </div>
                <h5 class="fw-bold mb-3" style="color: var(--txt); line-height: 1.5;">{{ q.text || '(Empty Question)' }}</h5>
                <div class="options-container">
                  <div v-for="(choice, cIdx) in q.choices" 
                       :key="cIdx" 
                       class="p-3 mb-2 bg-white rounded-3 shadow-sm border option-preview-row">
                    <div class="form-check m-0 d-flex align-items-center gap-2">
                      <input class="form-check-input mt-0 shadow-none" type="radio" :name="`preview_q${index}`">
                      <label class="form-check-label w-100" style="color: var(--txt); font-size: .95rem;">
                        {{ choice.text || `Option ${getKhmerAlphabet(cIdx)}` }}
                      </label>
                    </div>
                  </div>
                </div>
                <hr v-if="index < questions.length - 1" class="my-4" style="border-color: var(--bdr); opacity: 1;"/>
              </div>
            </div>
          </div>
          <div class="modal-footer border-0 pt-0 pb-4 px-4 bg-white" style="border-top: 1px solid var(--bdr) !important;">
            <button class="btn btn-light rounded-3 fw-bold px-4" @click="showPreviewModal = false">Exit Preview</button>
            <button class="btn text-white rounded-3 fw-bold px-4 disabled" style="background: var(--em);">Submit Exam</button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showCodeModal" class="modal-backdrop-custom d-flex align-items-center justify-content-center" @click.self="showCodeModal = false">
      <div class="modal-dialog-custom p-4 bg-white rounded-4 shadow-lg text-center slide-in" style="width: 100%; max-width: 480px; z-index: 9999;">
        
        <div class="success-icon-wrapper mb-3 mx-auto d-flex align-items-center justify-content-center rounded-circle bg-success bg-opacity-10 text-success" style="width: 56px; height: 56px;">
          <i class="fas fa-check-circle fa-2x"></i>
        </div>

        <h4 class="fw-bold text-dark mb-1">បង្កើតវិញ្ញាសាជោគជ័យ!</h4>
        <p class="text-muted small mb-4">វិញ្ញាសារបស់អ្នកត្រូវបានដាក់ផ្សាយជាផ្លូវការរួចរាល់ហើយ។ សូមចម្លងតំណភ្ជាប់ខាងក្រោមដើម្បីផ្ញើជូនសិស្សានុសិស្ស៖</p>

        <div class="d-flex align-items-center justify-content-between p-2.5 mb-4 rounded-3 border bg-light text-start">
          <span class="text-dark text-truncate me-2 fw-medium" style="font-size: 0.88rem; max-width: 320px;">{{ generatedExamLink }}</span>
          <button class="btn btn-sm btn-dark rounded-2 px-3 fw-bold d-flex align-items-center gap-1 flex-shrink-0" @click="copyLinkToClipboard">
            <i class="far fa-copy"></i> Copy Link
          </button>
        </div>

        <div class="w-100">
          <button class="btn btn-light w-100 rounded-3 fw-bold py-2 text-muted" @click="showCodeModal = false">
            បិទផ្ទាំងនេះ (Close)
          </button>
        </div>

      </div>
    </div>

  </div>
</template>


<script setup>
import { ref, computed, nextTick, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { useAuthStore } from '@/stores/auth' 
import { createExam, createQuestion } from '@/api/exam.api'

const route = useRoute()
const router = useRouter()
const toast = useToast()
const authStore = useAuthStore() 

// គ្រប់គ្រងស្ថានភាពការបង្ហាញ UI
const qNavScrollRef = ref(null)
const isSubmitting = ref(false)
const showPreviewModal = ref(false)
const selectedQuestionIndex = ref(0)

// គ្រប់គ្រងស្ថានភាពផ្ទាំងបង្ហាញតំណភ្ជាប់វិញ្ញាសា (Exam Link Modal)
const showCodeModal = ref(false)
const generatedExamLink = ref('')

// ទិន្នន័យ Form នៃវិញ្ញាសា
const quizTitle = ref('')
const quizInstructions = ref('')
const quizDuration = ref(60)

// អក្សរ និងលេខខ្មែរសម្រាប់ប្រើប្រាស់លើ Interface
const KH = ["ក", "ខ", "គ", "ឃ", "ង", "ច"]
const KH_N = ["១", "២", "៣", "៤", "៥", "៦", "៧", "៨", "៩", "១០"]

// កម្រងសំណួរ និងជម្រើសចម្លើយលំនាំដើម
const questions = ref([
  {
    text: '',
    pts: 10,
    question_type: 'multiple_choice',
    choices: [
      { text: '', isCorrect: true },
      { text: '', isCorrect: false }
    ]
  }
])

const getKhmerNumber = (num) => {
  return KH_N[num - 1] || num.toString()
}

const getKhmerAlphabet = (idx) => {
  return KH[idx] || String.fromCharCode(65 + idx)
}

// មុខងាររុករក និងរំកិល Scroll ទៅកាន់សំណួរដែលបានជ្រើសរើស
const selectQuestion = (idx) => {
  selectedQuestionIndex.value = idx
  const card = document.getElementById(`qcard-${idx}`)
  if (card) {
    card.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  const navItem = document.getElementById(`qnav-${idx}`)
  if (navItem && qNavScrollRef.value) {
    navItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }
}

// គណនាពិន្ទុ និងគំនូសរង្វង់ Progress 
const totalPoints = computed(() => {
  return questions.value.reduce((sum, q) => sum + (parseInt(q.pts) || 0), 0)
})

const progressPercent = computed(() => {
  return Math.min(Math.round((totalPoints.value / 100) * 100), 100)
})

const circleStrokeDashoffset = computed(() => {
  return Math.max(0, 314 - (progressPercent.value / 100) * 314)
})

const progressColor = computed(() => {
  if (totalPoints.value === 100) return 'var(--em)'
  if (totalPoints.value > 100) return '#ef4444'
  return '#f59e0b'
})

// បន្ថែម និងលុបសំណួរចេញពី Array
const addNewQuestion = () => {
  questions.value.push({
    text: '',
    pts: 10,
    question_type: 'multiple_choice',
    choices: [
      { text: '', isCorrect: true },
      { text: '', isCorrect: false }
    ]
  })
  const newIndex = questions.value.length - 1
  selectedQuestionIndex.value = newIndex

  nextTick(() => {
    const card = document.getElementById(`qcard-${newIndex}`)
    if (card) card.scrollIntoView({ behavior: 'smooth', block: 'start' })
    if (qNavScrollRef.value) {
      qNavScrollRef.value.scrollTo({
        top: qNavScrollRef.value.scrollHeight,
        behavior: 'smooth'
      })
    }
  })
}

const removeQuestion = (idx) => {
  if (questions.value.length > 1) {
    questions.value.splice(idx, 1)
    if (selectedQuestionIndex.value >= questions.value.length) {
      selectedQuestionIndex.value = questions.value.length - 1
    }
  }
}

// បន្ថែម និងលុបជម្រើសចម្លើយ
const addChoice = (qIdx) => {
  const q = questions.value[qIdx]
  if (q.choices.length < KH.length) {
    q.choices.push({ text: '', isCorrect: false })
  }
}

const removeChoice = (qIdx, cIdx) => {
  const q = questions.value[qIdx]
  if (q.choices.length > 1) q.choices.splice(cIdx, 1)
}

const setCorrectChoice = (qIdx, cIdx) => {
  questions.value[qIdx].choices.forEach((choice, idx) => {
    choice.isCorrect = (idx === cIdx)
  })
}

// គ្រប់គ្រងការបើក Preview
const openPreviewModal = () => {
  showPreviewModal.value = true
}

// មុខងារចម្បង៖ ដាក់ផ្សាយវិញ្ញាសា និងសំណួរចម្លើយ (Dynamic Mode)
const finalizePublish = async () => {
  
  // ═══════════════════════════════════════════════  ផ្នែកទប់ទិន្នន័យទទេ (FRONTEND VALIDATION)
  
  // ១. ឆែកចំណងជើងវិញ្ញាសា
  if (!quizTitle.value || quizTitle.value.trim() === '' || quizTitle.value.trim() === 'Create Quiz') {
    toast.error("សូមបញ្ចូលចំណងជើងវិញ្ញាសាថ្មីឱ្យបានត្រឹមត្រូវ!")
    return
  }

  // ២. រុករកឆែកមើលខ្លឹមសារក្នុងសំណួរ និងចម្លើយនីមួយៗ
  for (let i = 0; i < questions.value.length; i++) {
    const q = questions.value[i]
    
    // បើប្រអប់សំណួរទទេ
    if (!q.text || q.text.trim() === '') {
      toast.error(`សូមបញ្ចូលខ្លឹមសារសំណួរ សម្រាប់សំណួរទី ${i + 1}!`)
      selectQuestion(i) // រំកិលអេក្រង់ទៅរកសំណួរដែលមានបញ្ហា
      return
    }

    // បើប្រអប់ជម្រើសចម្លើយណាមួយទំនេរទទេ
    for (let cIdx = 0; cIdx < q.choices.length; cIdx++) {
      if (!q.choices[cIdx].text || q.choices[cIdx].text.trim() === '') {
        toast.error(`សូមបំពេញខ្លឹមសារចម្លើយ ចំណុច ${getKhmerAlphabet(cIdx)} ក្នុងសំណួរទី ${i + 1}!`)
        selectQuestion(i)
        return
      }
    }

    // ឆែកមើលថាតើមានគ្រីសយកចម្លើយត្រឹមត្រូវ (Radio Button) ហើយឬនៅ
    const hasCorrect = q.choices.some(c => c.isCorrect)
    if (!hasCorrect) {
      toast.error(`សូមជ្រើសរើសចម្លើយដែលត្រឹមត្រូវ (Correct?) មួយ សម្រាប់សំណួរទី ${i + 1}!`)
      selectQuestion(i)
      return
    }
  }

  // ═══════════════════════════════════════════════ ផ្នែកបាញ់បញ្ចូល API ទៅកាន់ SERVER
  try {
    isSubmitting.value = true
    console.log("=== ចាប់ផ្តើមបាញ់បង្កើតវិញ្ញាសា ===")

    const today = new Date()
    const start_date_only = today.toISOString().split('T')[0]
    
    const nextWeek = new Date()
    nextWeek.setDate(today.getDate() + 7)
    const end_date_only = nextWeek.toISOString().split('T')[0]

    const examPayload = {
      title: quizTitle.value.trim(),
      type: 'quiz',
      description: quizInstructions.value ? quizInstructions.value.trim() : 'គ្មានការពិពណ៌នា',
      duration: parseInt(quizDuration.value) || 60,
      total_points: totalPoints.value,
      status: 'active',
      start_time: start_date_only, 
      end_time: end_date_only
    }

    const createRes = await createExam(examPayload)
    const createdExam = createRes.data?.data || createRes.data

    if (!createdExam || !createdExam.examId) {
      toast.error("ការបង្កើតវិញ្ញាសាបានបរាជ័យ!")
      return
    }

    // វាយបញ្ចូលសំណួរចម្លើយម្តងមួយៗទៅតាមទម្រង់ Postman Array ផ្ទាល់
    for (const q of questions.value) {
      const parsedOptions = q.choices.map(c => c.text.trim())
      const correctChoiceObj = q.choices.find(c => c.isCorrect)
      const parsedCorrectAnswer = correctChoiceObj ? correctChoiceObj.text.trim() : parsedOptions[0]

      const questionPayload = {
        exam_id: createdExam.examId,
        question: q.text.trim(),
        question_type: 'multiple_choice',  
        options: parsedOptions,             
        correct_answer: [parsedCorrectAnswer], 
        points: parseInt(q.pts) || 5
      }
      
      console.log("បាញ់សំណួរទៅកាន់ Server:", questionPayload)
      await createQuestion(questionPayload)
    }

    // បើកផ្ទាំងបង្ហាញតំណភ្ជាប់ Link ពិតប្រាកដដែលបានមកពី API
    if (createdExam.link) {
      generatedExamLink.value = createdExam.link 
      showCodeModal.value = true               
      toast.success("វិញ្ញាសាត្រូវបានដាក់ផ្សាយជោគជ័យ!")
    } else {
      toast.warning("បង្កើតជោគជ័យ ប៉ុន្តែរកមិនឃើញតំណភ្ជាប់ Link ពី Backend ទេ")
    }

  } catch (err) {
    console.error("Error status:", err)
    toast.error("ការផ្សព្វផ្សាយវិញ្ញាសាបានបរាជ័យ!")
  } finally {
    isSubmitting.value = false
  }
}

// មុខងារចម្លងតំណភ្ជាប់វិញ្ញាសាទៅកាន់ Clipboard
const copyLinkToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(generatedExamLink.value)
    toast.success("បានចម្លងតំណភ្ជាប់វិញ្ញាសារួចរាល់!")
  } catch (err) {
    toast.error("មិនអាចចម្លងតំណភ្ជាប់បានទេ!")
  }
}

// ពង្រីកទំហំ Textarea ស្វ័យប្រវត្តទៅតាមខ្លឹមសារអក្សរ
const autoGrowTextarea = (event) => {
  const el = event.target
  el.style.height = 'auto'
  el.style.height = el.scrollHeight + 'px'
}

onMounted(() => {
  if (!authStore.user) {
    authStore.fetchUserProfile()
  }
})
</script>
<style scoped>
.quiz-builder-container {
  --em:      #10b981;
  --em-dk:   #059669;
  --em-soft: #ecfdf5;
  --em-mid:  rgba(16,185,129,.25);
  --txt:     #1e293b;
  --txt-m:   #334155;
  --txt-mu:  #64748b;
  --surf:    #ffffff;
  --bdr:     #e2e8f0;
  --r-md:    10px;
  --r-lg:    14px;
  --r-xl:    20px;
  --sh-sm:   0 2px 8px rgba(0,0,0,.04);
  --sh-md:   0 8px 24px rgba(0,0,0,.08);

  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  overflow: hidden;
  font-family: "Kantumruy Pro", "Poppins", sans-serif;
  color: var(--txt);
}

/* ── Layout shell ── */
.app-shell { 
  display: flex; 
  height: 100%; 
  overflow: hidden; 
}

/* ── Main column ── */
.main-col { 
  flex: 1; 
  min-width: 0; 
  display: flex; 
  flex-direction: column; 
  height: 100%; 
  overflow: hidden; 
}

/* Workspace 3-col grid */
.workspace {
  flex: 1; 
  min-height: 0;
  display: flex; 
  flex-direction: column;
  gap: 12px;
  padding: 12px;
  overflow-y: auto; 
  overflow-x: hidden;
}

@media (min-width: 992px) {
  .workspace {
    display: grid;
    grid-template-columns: 220px 1fr 190px;
    overflow: hidden;
  }
}

@media (max-width: 991px) {
  .panel { 
    min-height: 250px; 
    flex-shrink: 0; 
    overflow: visible !important; 
  }
  .main-col { 
    overflow-y: auto; 
    overflow-x: hidden; 
  }
  .workspace { 
    overflow: visible; 
  }
}

.panel {
  background: var(--surf);
  border: 1px solid var(--bdr);
  border-radius: var(--r-xl);
  box-shadow: var(--sh-sm);
  display: flex; 
  flex-direction: column;
  min-height: 0; 
  overflow: hidden;
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
  font-size: .6rem; 
  font-weight: 700; 
  text-transform: uppercase; 
  letter-spacing: 1.2px; 
  color: var(--txt-mu); 
}
.panel-count { 
  font-size: .62rem; 
  font-weight: 700; 
  color: var(--em); 
}

/* Question nav list (left panel) */
.q-nav-scroll { 
  flex: 1; 
  min-height: 0; 
  overflow-y: auto; 
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
  font-size: .8rem; 
  font-weight: 600; 
  color: var(--txt-m);
  transition: .15s; 
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
  box-shadow: 0 4px 12px rgba(16,185,129,.22); 
}
.q-badge { 
  font-size: .63rem; 
  font-weight: 700; 
  padding: 2px 7px; 
  border-radius: 999px; 
  background: rgba(255,255,255,.2); 
  color: #fff; 
}
.q-nav-item:not(.active) .q-badge { 
  background: var(--em-soft); 
  color: var(--em); 
}

/* Center feed */
.feed-col { 
  min-height: 0; 
  overflow-y: auto; 
  display: flex; 
  flex-direction: column; 
  gap: 12px; 
  padding-bottom: 20px;
}

/* Question card */
.q-card {
  background: var(--surf);
  border: 1.5px solid var(--bdr);
  border-radius: var(--r-xl);
  box-shadow: var(--sh-sm);
  overflow: hidden; 
  flex-shrink: 0;
  transition: box-shadow .17s;
  cursor: pointer;
}
.q-card:hover { 
  box-shadow: var(--sh-md); 
}
.q-card.active-card { 
  border-color: var(--em-mid); 
  box-shadow: 0 0 0 3px rgba(16,185,129,.08), var(--sh-md); 
}

.q-num-badge {
  width: 28px; 
  height: 28px; 
  border-radius: 8px;
  background: linear-gradient(135deg, var(--em), var(--em-dk));
  color: #fff; 
  font-weight: 800; 
  font-size: .72rem;
  display: flex; 
  align-items: center; 
  justify-content: center;
  box-shadow: 0 3px 8px rgba(16,185,129,.28);
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
  font-size: .65rem; 
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
  font-size: .8rem; 
  color: var(--em); 
  outline: none; 
  box-shadow: 0 1px 3px rgba(0,0,0,.06); 
}

.q-field {
  width: 100%; 
  border: 1.5px solid var(--bdr); 
  border-radius: var(--r-lg);
  padding: 10px 13px; 
  font-size: .87rem; 
  font-weight: 500; 
  color: var(--txt);
  outline: none; 
  resize: none; 
  background: #fafbfc;
  transition: .17s; 
  line-height: 1.6;
}
.q-field:focus { 
  border-color: var(--em); 
  background: #fff; 
  box-shadow: 0 0 0 3px rgba(16,185,129,.08); 
}
.q-field::placeholder { 
  color: #b0bec5; 
}

/* Choice rows */
.choice-row { 
  display: flex; 
  align-items: center; 
  gap: 8px; 
  padding: 8px 11px; 
  border: 1.5px solid var(--bdr); 
  border-radius: var(--r-md); 
  background: #fafbfc; 
  transition: .13s; 
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
  font-size: .74rem; 
  display: flex; 
  align-items: center; 
  justify-content: center; 
}
.choice-input { 
  flex: 1; 
  border: none; 
  background: transparent; 
  font-size: .81rem; 
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
  box-shadow: 0 0 0 3px rgba(16,185,129,.14); 
}

/* Right panel progress ring */
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
  transition: stroke-dashoffset .45s ease, stroke .3s ease; 
}

/* Animations */
@keyframes slideUp { 
  from { opacity:0; transform:translateY(10px); } 
  to { opacity:1; transform:translateY(0); } 
}
.slide-in { 
  animation: slideUp .22s ease; 
}

/* Glass header info card */
.quiz-info-header {
  background: rgba(255, 255, 255, 0.6); 
  backdrop-filter: blur(24px); 
  -webkit-backdrop-filter: blur(24px); 
  border-radius: var(--r-xl); 
  border: 1px solid rgba(255, 255, 255, 0.8); 
  box-shadow: 0 4px 15px rgba(0,0,0,.02);
}

.decoration-circle {
  width: 100px; 
  height: 100px; 
  background: radial-gradient(circle, var(--em-soft) 0%, transparent 70%); 
  top: -30px; 
  right: -20px; 
  z-index: 0; 
  pointer-events: none;
}

.icon-circle {
  width: 20px; 
  height: 20px; 
  background: var(--em-soft); 
  color: var(--em);
}

.quiz-info-lbl {
  font-size: .6rem; 
  font-weight: 800; 
  color: var(--em); 
  letter-spacing: 1px; 
  text-transform: uppercase;
}

.quiz-title-input {
  font-size: 1.3rem; 
  letter-spacing: -0.3px; 
  outline: none; 
  background: transparent; 
  transition: color .2s;
}

.quiz-desc-input {
  font-size: .85rem; 
  color: #64748b; 
  outline: none; 
  resize: none; 
  background: transparent; 
  line-height: 1.4;
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
  font-size:.63rem;
  font-weight:700;
}

.remove-choice-btn {
  font-size:.8rem;
  transition:.13s;
  background: transparent;
}
.remove-choice-btn:hover {
  color: #ef4444 !important;
}

.option-preview-row:hover {
  border-color: var(--em) !important;
  background: var(--em-soft) !important;
}
</style>

<style>
/* Clean layout overrides when Quiz Builder is active to make it full bleed on the right of the sidebar */
.content-body:has(.quiz-builder-container) {
  padding: 0 !important;
  overflow: hidden !important;
  height: calc(100vh - 80px) !important;
  background-color: #f4f7fe;
}

.content-body:has(.quiz-builder-container) .page-body {
  padding: 0 !important;
  height: 100% !important;
}

.content-body:has(.quiz-builder-container) .main-content {
  height: 100% !important;
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

/* Micro Animation Entrance Specs */
.slide-in {
  animation: modalSlideEntrance 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes modalSlideEntrance {
  from { opacity: 0; transform: translateY(12px) scale(0.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
</style>

