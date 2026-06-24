<template>
  <div class="quiz-builder-container">
    <TeacherExamDetail
      :roomName="examData.room_name || 'Room'"
      :examCount="questions.length"
      :pageTitle="examData.title || 'Today Exams'"
      currentTabLabel="វិញ្ញាសា"
      style="flex-shrink: 0;"
    />

    <div class="app-shell flex-grow-1 overflow-hidden">
      <div v-if="loading" class="text-center py-5">កំពុងផ្ទុកទិន្នន័យ...</div>
      
      <div v-else-if="questions.length > 0" class="workspace">
        
        <div class="panel d-flex flex-column">
          <div class="panel-head">
            <span class="panel-lbl">Question List</span>
            <span class="panel-count">{{ questions.length }} Q</span>
          </div>
          <div class="q-nav-scroll overflow-y-auto">
            <div v-for="(q, idx) in questions" :key="q.id"
                 class="q-nav-item" :class="{ active: selectedQuestionIndex === idx }" 
                 @click="selectQuestion(idx)">
              <span>សំណួរទី {{ getKhmerNumber(idx + 1) }}</span>
            </div>
          </div>
        </div>

        <div class="feed-col">
          <div v-for="(q, qIdx) in questions" :key="q.id" 
               class="q-card" :class="{ 'active-card': selectedQuestionIndex === qIdx }"
               @click="selectedQuestionIndex = qIdx">
            
            <div class="d-flex justify-content-between px-3 py-2 border-bottom bg-light">
              <span class="fw-bold">សំណួរទី {{ getKhmerNumber(qIdx + 1) }}</span>
              <div class="pts-pill">
                <label>pts</label>
                <input type="number" v-model.number="q.pts" class="pts-input">
              </div>
            </div>

            <div class="p-3">
              <textarea v-model="q.text" class="q-field" rows="3"></textarea>
              <div class="d-flex flex-column gap-2 mt-2">
                <div v-for="(choice, cIdx) in q.choices" :key="cIdx" class="choice-row">
                  <input type="radio" :name="`q_${q.id}`" :checked="choice.isCorrect" @change="setCorrectChoice(qIdx, cIdx)">
                  <input type="text" v-model="choice.text" class="choice-input">
                  <button class="btn btn-sm text-danger" @click="removeChoice(qIdx, cIdx)"><i class="fas fa-trash"></i></button>
                </div>
              </div>
            </div>

            <div class="px-3 pb-3 d-flex justify-content-end gap-2">
              <button class="btn btn-sm btn-outline-danger" @click="handleDeleteQuestion(q.id, qIdx)">Delete</button>
              <button class="btn btn-sm btn-success" @click="handleSingleQuestionSave(qIdx)">Update</button>
            </div>
          </div>
        </div>

       <div class="panel p-3 d-flex flex-column" style="height: fit-content; background: #fff; border: 1px solid #e2e8f0; border-radius: 12px;">
  <div class="panel-head mb-3 border-0 pb-0">Exam Overview</div>
  
  <div class="progress-circle mx-auto mb-3">
    <h4 class="mb-0 fw-bold">{{ totalPoints }}</h4>
    <small class="text-muted">/ {{ examData.total_points || 100 }} PT</small>
  </div>
  
  <p class="text-muted small text-center mb-4">Sum of points across current items.</p>
  
  <div class="d-flex flex-column gap-2 mt-auto">
    <button class="btn btn-outline-success w-100 fw-bold" @click="openPreviewModal">
      <i class="fas fa-eye me-1"></i> Preview
    </button>
    <button class="btn btn-outline-secondary w-100 fw-bold" @click="goBack">
      <i class="fas fa-arrow-left me-1"></i> Back
    </button>
  </div>
</div>

      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import api from '@/api/axiosInstance';
import { useExamStore } from '@/stores/examStore';
import { getQuestionsForTeacher, updateQuestion, deleteQuestion } from '@/api/exam.api';

const route = useRoute();
const router = useRouter();
const examStore = useExamStore();
const toast = useToast();
const examId = route.params.examId;

const examData = ref({});
const questions = ref([]);
const loading = ref(false);
const selectedQuestionIndex = ref(0);

// បន្ថែមមុខងារនេះត្រឡប់ទៅក្នុង script setup វិញ
const getKhmerNumber = (num) => {
  const khmerNumbers = ["១", "២", "៣", "៤", "៥", "៦", "៧", "៨", "៩", "១០"];
  return khmerNumbers[num - 1] || num.toString();
};

// 1. Fetch Data
const fetchAll = async () => {
  loading.value = true;
  try {
    const [examRes, qRes] = await Promise.all([
      api.get(`/exams/${examId}`),
      getQuestionsForTeacher(examId)
    ]);
    
    const data = examRes.data?.data || examRes.data;
    const rawData = qRes.data?.data || qRes.data;
    
    examData.value = data;
    
    // បញ្ជូនទិន្នន័យទៅ Store តែម្តងគត់នៅទីនេះ
    if (data) {
        examStore.setExamTitle(data.title || 'គ្មានចំណងជើង');
        examStore.setRoomName(data.room_name || 'ថ្នាក់រៀន');
        examStore.setQuestionCount(rawData.length);
    }
    
    questions.value = rawData.map(q => {
      let opts = [];
      try {
        opts = typeof q.options === 'string' ? JSON.parse(q.options) : q.options;
      } catch (e) {
        opts = []; 
      }

      return {
        id: q.id,
        text: q.question,
        pts: q.points || 0,
        choices: opts.map(opt => ({
          text: opt,
          isCorrect: q.correct_answer && q.correct_answer.includes(opt)
        }))
      };
    });
  } catch (e) { 
    console.error(e);
    toast.error("ទាញយកទិន្នន័យបរាជ័យ"); 
  } finally { 
    loading.value = false; 
  }
};

// 2. Computed & Helpers
const totalPoints = computed(() => questions.value.reduce((sum, q) => sum + (Number(q.pts) || 0), 0));
const selectQuestion = (idx) => { selectedQuestionIndex.value = idx; };

// 3. Actions
const handleSingleQuestionSave = async (idx) => {
  const q = questions.value[idx];
  try {
    const payload = {
      question: q.text,
      question_type: "multiple_choice",
      options: q.choices.map(c => c.text),
      correct_answer: q.choices.find(c => c.isCorrect)?.text || "",
      points: Number(q.pts) || 0
    };
    await updateQuestion(q.id, payload);
    toast.success("រក្សាទុកជោគជ័យ!");
  } catch (e) { 
    toast.error("បរាជ័យ!");
  }
};

const handleDeleteQuestion = async (qId, idx) => {
  if (!confirm("តើអ្នកប្រាកដជាចង់លុបសំណួរនេះមែនទេ?")) return;
  try {
    await deleteQuestion(qId);
    questions.value.splice(idx, 1);
    // Update ចំនួនសំណួរក្នុង Store វិញក្រោយលុប
    examStore.setQuestionCount(questions.value.length);
    toast.success("បានលុបសំណួរជោគជ័យ!");
  } catch (e) { 
    toast.error("បរាជ័យក្នុងការលុប!"); 
  }
};

const goBack = () => router.push('/teacher/room-management');

onMounted(fetchAll);
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
.quiz-builder-container { height: 100vh; display: flex; flex-direction: column; width: 100%; }
.app-shell { flex: 1; overflow: hidden; }
.workspace { display: grid; grid-template-columns: 240px 1fr 260px; gap: 16px; padding: 16px; height: 100%; overflow: hidden; }
.feed-col { overflow-y: auto; display: flex; flex-direction: column; gap: 16px; }
.q-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 10px; cursor: pointer; }
.q-card.active-card { border-color: #10b981; box-shadow: 0 0 0 2px rgba(16,185,129,0.2); }
.panel { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; }
.q-nav-item { padding: 10px; border-bottom: 1px solid #f1f5f9; cursor: pointer; }
.q-nav-item.active { background: #ecfdf5; color: #10b981; }
.choice-row { display: flex; align-items: center; gap: 8px; }
.pts-input { width: 50px; border: 1px solid #ddd; border-radius: 4px; text-align: center; }
.q-field { width: 100%; border: 1px solid #ddd; padding: 8px; border-radius: 8px; }

/* 🎯 បន្ថែម CSS នេះដើម្បីទប់ Layout */
.workspace {
  flex: 1;
  display: grid;
  grid-template-columns: 240px 1fr 260px;
  gap: 16px;
  padding: 24px;
  height: calc(100vh - 70px); /* កំណត់កម្ពស់ត្រឹមផ្ទៃខាងក្រោម Header ប៉ុណ្ណោះ */
  overflow: hidden;
}

.app-shell { display: flex; height: 100%; overflow: hidden; }
.main-col { flex: 1; min-width: 0; display: flex; flex-direction: column; height: 100%; overflow: hidden; }

.workspace {
  flex: 1; 
  min-height: 0;
  display: flex; 
  flex-direction: column;
  gap: 16px;
  padding: 24px;
  height: 100%;
}

@media (min-width: 992px) {
  .workspace {
    display: grid;
    grid-template-columns: 240px 1fr 260px;
    height: 100%;
  }
}

/* Panels */
.panel {
  background: var(--surf);
  border: 1px solid var(--bdr);
  border-radius: var(--r-xl);
  box-shadow: var(--sh-sm);
  display: flex; 
  flex-direction: column;
  height: 100%;
  min-height: 0;
}
.panel-head {
  flex-shrink: 0;
  padding: 14px;
  border-bottom: 1px solid var(--bdr);
  display: flex; 
  align-items: center; 
  justify-content: space-between;
}
.panel-lbl { font-size: .62rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1.2px; color: var(--txt-mu); }
.panel-count { font-size: .65rem; font-weight: 700; color: var(--em); }

.q-nav-scroll { flex: 1; min-height: 0; overflow-y: auto; padding: 10px; display: flex; flex-direction: column; gap: 6px; }
.q-nav-item {
  padding: 10px 14px; 
  border-radius: var(--r-md);
  border: 1.5px solid var(--bdr); 
  background: #fafafa;
  cursor: pointer; 
  display: flex; 
  align-items: center; 
  justify-content: space-between;
  font-size: .82rem; 
  font-weight: 600; 
  color: var(--txt-m);
  transition: .15s; 
  flex-shrink: 0;
}
.q-nav-item:hover { border-color: var(--em-mid); background: var(--em-soft); color: var(--em); }
.q-nav-item.active { background: linear-gradient(135deg, var(--em), var(--em-dk)); border-color: transparent; color: #fff; box-shadow: 0 4px 12px rgba(16,185,129,.22); }
.q-badge { font-size: .65rem; font-weight: 700; padding: 2px 7px; border-radius: 999px; background: rgba(255,255,255,.2); color: #fff; }
.q-nav-item:not(.active) .q-badge { background: var(--em-soft); color: var(--em); }

/* 🎯 FIXED UI: Center feed លាតពេញ និង Scroll រលូន */
.feed-col { 
  flex: 1;
  min-height: 0; 
  overflow-y: auto; 
  display: flex; 
  flex-direction: column; 
  gap: 16px; 
  padding-right: 4px;
}
.feed-col::-webkit-scrollbar { width: 5px; }
.feed-col::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }

.q-card { background: var(--surf); border: 1px solid var(--bdr); border-radius: var(--r-xl); box-shadow: var(--sh-sm); overflow: hidden; flex-shrink: 0; transition: box-shadow .17s; cursor: pointer; }
.q-card:hover { box-shadow: var(--sh-md); }
.q-card.active-card { border-color: var(--em-mid); box-shadow: 0 0 0 3px rgba(16,185,129,.08), var(--sh-md); }

.q-num-badge { width: 28px; height: 28px; border-radius: 8px; background: linear-gradient(135deg, var(--em), var(--em-dk)); color: #fff; font-weight: 800; font-size: .72rem; display: flex; align-items: center; justify-content: center; box-shadow: 0 3px 8px rgba(16,185,129,.28); }
.pts-pill { display: flex; align-items: center; gap: 6px; background: var(--em-soft); border-radius: 8px; padding: 5px 10px; }
.pts-pill label { font-size: .65rem; font-weight: 700; color: var(--em); margin: 0; }

.q-field:focus { border-color: var(--em); background: #fff; box-shadow: 0 0 0 3px rgba(16,185,129,.08); }

.choice-row { display: flex; align-items: center; gap: 8px; padding: 10px 14px; border: 1px solid var(--bdr); border-radius: var(--r-md); background: #fafbfc; transition: .13s; }
.choice-row:hover { border-color: var(--em-mid); background: #fff; }
.choice-row.correct-highlight { border-color: var(--em); background: var(--em-soft); }
.choice-lbl { width: 28px; height: 28px; flex-shrink: 0; border-radius: 7px; background: var(--em-soft); color: var(--em); font-weight: 800; font-size: .74rem; display: flex; align-items: center; justify-content: center; }
.choice-input { flex: 1; border: none; background: transparent; font-size: .85rem; font-weight: 500; color: var(--txt); outline: none; }
.form-check-input.cr { width: 17px; height: 17px; cursor: pointer; border: 2px solid #cbd5e1; }
.form-check-input.cr:checked { background-color: var(--em) !important; border-color: var(--em) !important; }

.svg-ring { transform: rotate(-90deg); overflow: visible; }
.ring-bg { fill: none; stroke: #f1f5f9; stroke-width: 9; }
.ring-fill { fill: none; stroke-width: 9; stroke-linecap: round; stroke-dasharray: 314; transition: stroke-dashoffset .45s ease, stroke .3s ease; }

@keyframes slideUp { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
.slide-in { animation: slideUp .22s ease; }

.quiz-info-header { background: rgba(255, 255, 255, 0.6); backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px); border-radius: var(--r-xl); border: 1px solid rgba(255, 255, 255, 0.8); box-shadow: 0 4px 15px rgba(0,0,0,.02); }
.decoration-circle { width: 100px; height: 100px; background: radial-gradient(circle, var(--em-soft) 0%, transparent 70%); top: -30px; right: -20px; z-index: 0; pointer-events: none; }
.icon-circle { width: 20px; height: 20px; background: var(--em-soft); color: var(--em); }
.quiz-info-lbl { font-size: .6rem; font-weight: 800; color: var(--em); letter-spacing: 1px; text-transform: uppercase; }
.quiz-title-input { font-size: 1.3rem; letter-spacing: -0.3px; outline: none; background: transparent; transition: color .2s; }

.modal-overlay { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(15, 23, 42, 0.4); backdrop-filter: blur(4px); z-index: 2000; display: flex; align-items: center; justify-content: center; padding: 20px; }
.modal-dialog { width: 100%; max-width: 550px; margin: 0; }
.modal-dialog-scrollable { max-height: 90vh; display: flex; flex-direction: column; }
.modal-content { background: #ffffff; }
.correct-label { font-size:.65rem; font-weight:700; }
.remove-choice-btn { font-size:.85rem; background: transparent; border: none; }
.remove-choice-btn:hover { color: #ef4444 !important; }
.option-preview-row:hover { border-color: var(--em) !important; background: var(--em-soft) !important; }
.content-body:has(.quiz-builder-container) {
  padding: 0 !important;
  overflow: hidden !important;
  height: calc(100vh - 70px) !important;
  background-color: #f4f7fe;
}
.content-body:has(.quiz-builder-container) .page-body { padding: 0 !important; height: 100% !important; }
.content-body:has(.quiz-builder-container) .main-content { height: 100% !important; }
.panel {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  overflow: hidden;
  display: flex; /* ត្រូវមាន display flex */
  flex-direction: column; /* ត្រូវដាក់ជា column */
  height: 100%; /* ត្រូវដាក់ height 100% ដើម្បីឱ្យស្មើនឹង Panel ខាងឆ្វេង */
}

.panel-head {
  padding: 14px;
  border-bottom: 1px solid #e2e8f0;
  font-weight: 600;
  flex-shrink: 0;
}

.workspace { display: grid; grid-template-columns: 240px 1fr 260px; gap: 16px; padding: 16px; height: 100%; overflow: hidden; }
.progress-circle { 
  width: 120px; height: 120px; border-radius: 50%; border: 8px solid #e2e8f0; 
  display: flex; flex-direction: column; align-items: center; justify-content: center; margin: 0 auto;
}
.q-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; margin-bottom: 16px; }
.panel { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; display: flex; flex-direction: column; }
.feed-col { overflow-y: auto; }

.progress-circle { 
  width: 110px; height: 110px; border-radius: 50%; border: 6px solid #ecfdf5; 
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  color: #059669; background: #f0fdf4;
}
.btn-outline-success { border-color: #10b981; color: #10b981; }
.btn-outline-success:hover { background: #10b981; color: #fff; }
</style>

