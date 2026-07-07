<template>
  <div class="workspace">

    <!-- ── LEFT: EXAM STRUCTURE + NAVIGATOR ── -->
    <div class="panel slide-in">
      <div class="panel-head">
        <span class="panel-lbl"><i class="fas fa-layer-group em-i"></i> Exam Structure</span>
      </div>

      <!-- Exam Config -->
      <div class="config-box">
        <div class="field-group">
          <label class="field-label">Exam Title <span class="req">*</span></label>
          <input v-model="exam.title" type="text" class="q-field" placeholder="e.g., Computer Science Final" />
        </div>
        <div class="field-group mt-3">
          <label class="field-label">Subject <span class="req">*</span></label>
          <select v-model="exam.subject" class="q-field q-select">
            <option value="">Select Subject</option>
            <option>Computer Science</option>
            <option>Mathematics</option>
            <option>Data Structures</option>
            <option>Networking</option>
          </select>
        </div>
      </div>

      <!-- Question Navigator -->
      <div class="nav-list">
        <div v-for="sec in SECTIONS" :key="sec.id">
          <!-- Section Header -->
          <div class="sec-header">
            <div>
              <div class="sec-title">{{ sec.title }}</div>
              <div class="sec-pts">
                <input
                  type="number"
                  class="pts-input"
                  :value="sec.pts"
                  @input="sec.pts = parseInt($event.target.value) || 0; updateSummary()"
                />
                <span class="pts-lbl">pt</span>
              </div>
            </div>
            <button class="btn-add-q" @click="addQuestion(sec.type)" :title="'Add ' + sec.type">
              <i class="fas fa-plus-circle"></i>
            </button>
          </div>

          <!-- Questions in section -->
          <div v-if="questionsOf(sec.type).length === 0" class="no-q">No questions yet.</div>
          <div
            v-for="(q, idx) in questionsOf(sec.type)"
            :key="q.id"
            class="q-nav-item"
            :class="{ active: q.id === currentQId }"
            @click="loadQuestion(q.id)"
          >
            <div class="q-nav-inner">
              <i :class="'fas ' + iconFor(q.type)" :style="{ color: q.id === currentQId ? 'var(--em-dk)' : 'var(--txt-mu)' }"></i>
              <span>Question {{ idx + 1 }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ── CENTER: QUESTION EDITOR ── -->
    <div class="panel slide-in editor-panel" style="animation-delay:.1s">
      <div class="panel-head">
        <div class="panel-lbl">
          <span class="q-badge-pill">{{ currentBadge }}</span>
          <span>{{ currentTypeName }}</span>
        </div>
      </div>

      <div class="editor-body" v-if="currentQ">
        <!-- Prompt -->
        <div class="field-group mb-4">
          <label class="field-label">Question Prompt <span class="req">*</span></label>
          <textarea
            v-model="currentQ.prompt"
            class="q-field"
            rows="4"
            placeholder="Write the examination question or prompt here..."
          ></textarea>
        </div>

        <label class="field-label mb-3">Expected Answer / Options</label>

        <!-- MCQ -->
        <template v-if="currentQ.type === 'mcq'">
          <div
            v-for="(choice, idx) in currentQ.choices"
            :key="idx"
            class="choice-row"
            :class="{ 'correct-hl': idx === currentQ.correctChoice }"
          >
            <div class="choice-lbl" :class="{ 'correct-lbl': idx === currentQ.correctChoice }">
              {{ 'ABCDEF'[idx] }}
            </div>
            <input
              v-model="currentQ.choices[idx]"
              type="text"
              class="choice-input"
              placeholder="Option answer..."
            />
            <div class="choice-actions">
              <span class="cr-label">Correct</span>
              <input
                type="radio"
                class="cr"
                :name="'correct_' + currentQ.id"
                :value="idx"
                :checked="idx === currentQ.correctChoice"
                @change="currentQ.correctChoice = idx"
              />
              <button
                v-if="currentQ.choices.length > 2"
                class="btn-remove"
                @click="removeChoice(idx)"
              >
                <i class="fas fa-times-circle"></i>
              </button>
            </div>
          </div>
          <button class="btn-add-choice" @click="addChoice" v-if="currentQ.choices.length < 6">
            <i class="fas fa-plus-circle me-1"></i> Add Option
          </button>
        </template>

        <!-- True/False -->
        <template v-else-if="currentQ.type === 'tf'">
          <div class="tf-row">
            <label
              class="choice-row flex-1"
              :class="{ 'correct-hl': currentQ.correctChoice === 0 }"
              style="cursor:pointer"
            >
              <input type="radio" class="cr" :name="'tf_' + currentQ.id" :value="0" v-model="currentQ.correctChoice" />
              <span class="fw-bold ms-2">True</span>
            </label>
            <label
              class="choice-row flex-1"
              :class="{ 'correct-hl': currentQ.correctChoice === 1 }"
              style="cursor:pointer"
            >
              <input type="radio" class="cr" :name="'tf_' + currentQ.id" :value="1" v-model="currentQ.correctChoice" />
              <span class="fw-bold ms-2">False</span>
            </label>
          </div>
        </template>

        <!-- Short Answer -->
        <template v-else-if="currentQ.type === 'short'">
          <input
            v-model="currentQ.choices[0]"
            type="text"
            class="q-field"
            placeholder="Enter the exact correct keyword or phrase..."
          />
          <p class="hint-text">Auto-grading will check if the student's answer matches this keyword.</p>
        </template>

        <!-- Essay -->
        <template v-else-if="currentQ.type === 'essay'">
          <div class="essay-placeholder">
            <i class="fas fa-file-signature"></i>
            <h6>Manual Grading Required</h6>
            <p>Students will be provided a rich-text editor and file upload area to submit their long-form answer.</p>
          </div>
        </template>
      </div>

      <div class="editor-footer">
        <button class="btn-delete" @click="deleteQuestion">
          <i class="fas fa-trash-alt me-2"></i> Delete
        </button>
      </div>
    </div>

    <!-- ── RIGHT: SUMMARY & PUBLISH ── -->
    <div class="right-col slide-in" style="animation-delay:.2s">

      <!-- Publish Card -->
      <div class="panel publish-card">
        <div class="pub-badge">
          <span class="spinner-dot"></span> Ready to Publish
        </div>
        <h5 class="pub-title">Publish Final Exam</h5>
        <p class="pub-sub">Finalize settings and deploy to students.</p>
        <button class="btn-publish" @click="showPublishModal = true">
          <i class="fas fa-paper-plane"></i> Publish Now
        </button>
        <button class="btn-preview" @click="openPreview">
          <i class="fas fa-eye"></i> Preview First
        </button>
      </div>

      <!-- Summary -->
      <div class="panel">
        <div class="panel-head">
          <span class="panel-lbl"><i class="fas fa-chart-pie em-i"></i> Exam Summary</span>
        </div>
        <div class="p-4">
          <div class="sum-row">
            <span class="sum-k"><i class="fas fa-layer-group em-i"></i> Total Questions</span>
            <span class="sbdg sb-b">{{ questions.length }} {{ questions.length === 1 ? 'Question' : 'Questions' }}</span>
          </div>
          <div class="sum-row">
            <span class="sum-k"><i class="fas fa-star em-i"></i> Total Points</span>
            <span class="sbdg sb-g">{{ totalPoints }} Pts</span>
          </div>
          <div class="sum-row">
            <span class="sum-k"><i class="fas fa-clock em-i"></i> Duration</span>
            <span class="sbdg sb-s">{{ exam.duration }} Mins</span>
          </div>
        </div>
      </div>

    </div>

    <!-- ── PUBLISH MODAL ── -->
    <Teleport to="body">
      <div v-if="showPublishModal" class="modal-overlay" @click.self="showPublishModal = false">
        <div class="modal-box">
          <div class="modal-hdr">
            <h5><i class="fas fa-paper-plane em-i"></i> Publish Final Exam</h5>
            <button class="modal-close" @click="showPublishModal = false">&times;</button>
          </div>
          <div class="modal-bd">
            <p class="modal-sub">Review your exam details before publishing to students.</p>
            <div class="modal-stats">
              <div class="mstat green">
                <div class="mstat-val" style="color:var(--em)">{{ totalPoints }} Pts</div>
                <div class="mstat-lbl">Points</div>
              </div>
              <div class="mstat blue">
                <div class="mstat-val" style="color:#3b82f6">{{ questions.length }}</div>
                <div class="mstat-lbl">Questions</div>
              </div>
              <div class="mstat yellow">
                <div class="mstat-val" style="color:#f59e0b">100%</div>
                <div class="mstat-lbl">Completion</div>
              </div>
            </div>

            <div class="field-group mb-4">
              <label class="field-label mb-2" style="letter-spacing:.8px">Assign to Room</label>
              <div class="room-row">
                <select class="q-field q-select room-sel">
                  <option>Select classroom…</option>
                  <option>Grade 12-A · 32 students</option>
                  <option>Grade 11-B · 28 students</option>
                  <option>IT Foundation A · 40 students</option>
                </select>
                <button class="btn-room" type="button" @click="$emit('new-room')">
                  <i class="fas fa-plus"></i> New Room
                </button>
              </div>
            </div>

            <div class="pub-notice">
              <i class="fas fa-info-circle me-2"></i>
              Students will be notified immediately once published.
            </div>
          </div>
          <div class="modal-ftr">
            <button class="btn-cancel" @click="showPublishModal = false">Cancel</button>
            <button class="btn-confirm" @click="confirmPublish">
              <i class="fas fa-paper-plane me-1"></i> Publish Now
            </button>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- ── PREVIEW MODAL ── -->
    <Teleport to="body">
      <div v-if="showPreviewModal" class="modal-overlay" @click.self="showPreviewModal = false">
        <div class="modal-box modal-xl-box">
          <div class="modal-hdr">
            <div>
              <h5>{{ exam.title || 'Exam Preview' }}</h5>
              <div class="preview-sub"><i class="fas fa-graduation-cap em-i"></i> Student View</div>
            </div>
            <button class="modal-close" @click="showPreviewModal = false">&times;</button>
          </div>
          <div class="preview-body">
            <div v-if="previewSections.length === 0" class="empty-preview">
              <i class="fas fa-folder-open"></i>
              <h5>No Questions Yet</h5>
              <p>Add questions to your exam to see the preview.</p>
            </div>
            <template v-else>
              <div v-for="sec in previewSections" :key="sec.id" class="preview-section">
                <div class="preview-sec-head">
                  <h5>{{ sec.title }}</h5>
                  <div class="text-muted" style="font-size:.8rem;font-weight:600">{{ sec.pts }} points per question</div>
                </div>
                <div v-for="(q, idx) in sec.questions" :key="q.id" class="preview-q">
                  <div class="preview-q-num">{{ idx + 1 }}</div>
                  <div class="preview-q-content">
                    <div class="preview-prompt">{{ q.prompt || 'No prompt provided...' }}</div>
                    <!-- MCQ -->
                    <div v-if="q.type === 'mcq'" class="preview-choices">
                      <label v-for="(c, ci) in q.choices.filter(x => x.trim())" :key="ci" class="preview-choice">
                        <input type="radio" :name="'pv_' + q.id" class="cr" />
                        <span class="choice-letter">{{ 'ABCDEF'[ci] }}.</span>
                        <span>{{ c }}</span>
                      </label>
                    </div>
                    <!-- T/F -->
                    <div v-else-if="q.type === 'tf'" class="tf-row">
                      <label class="choice-row flex-1" style="cursor:pointer"><input type="radio" :name="'pv_' + q.id" class="cr" /> <span class="fw-bold ms-2">True</span></label>
                      <label class="choice-row flex-1" style="cursor:pointer"><input type="radio" :name="'pv_' + q.id" class="cr" /> <span class="fw-bold ms-2">False</span></label>
                    </div>
                    <!-- Short -->
                    <input v-else-if="q.type === 'short'" type="text" class="q-field mt-2" placeholder="Type your answer here..." />
                    <!-- Essay -->
                    <template v-else-if="q.type === 'essay'">
                      <textarea class="q-field mt-2" rows="4" placeholder="Write your long-form response here..."></textarea>
                      <div class="essay-upload-zone mt-2">
                        <i class="fas fa-cloud-upload-alt"></i>
                        <div>Click to upload supporting files</div>
                      </div>
                    </template>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </Teleport>

  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'

const emit = defineEmits(['new-room'])
const exam = reactive({ title: '', subject: '', duration: 120 })
const SECTIONS = reactive([
  { id: 'mcq',   title: 'Part 1: Multiple Choice',   type: 'mcq',   pts: 5 },
  { id: 'tf',    title: 'Part 2: True/False',         type: 'tf',    pts: 2 },
  { id: 'short', title: 'Part 3: Short Answer',       type: 'short', pts: 10 },
  { id: 'essay', title: 'Part 4: Essay / File Upload',type: 'essay', pts: 20 },
])

const questions = reactive([
  { id: 1, type: 'mcq', prompt: '', choices: ['', ''], correctChoice: 0 }
])
const currentQId = ref(1)

const currentQ = computed(() => questions.find(q => q.id === currentQId.value) || null)

const currentBadge = computed(() => {
  if (!currentQ.value) return 'Q1'
  const same = questions.filter(q => q.type === currentQ.value.type)
  return 'Q' + (same.findIndex(q => q.id === currentQId.value) + 1)
})

const currentTypeName = computed(() => {
  const map = { mcq: 'Multiple Choice', tf: 'True / False', short: 'Short Answer', essay: 'Essay / File' }
  return currentQ.value ? map[currentQ.value.type] : ''
})

const totalPoints = computed(() =>
  SECTIONS.reduce((acc, sec) => acc + questions.filter(q => q.type === sec.type).length * sec.pts, 0)
)

function questionsOf(type) { return questions.filter(q => q.type === type) }

function iconFor(type) {
  return { mcq: 'fa-list-ul', tf: 'fa-adjust', short: 'fa-align-left', essay: 'fa-file-alt' }[type] || 'fa-question'
}

function loadQuestion(id) { currentQId.value = id }

function addQuestion(type) {
  const newId = Date.now()
  questions.push({ id: newId, type, prompt: '', choices: type === 'mcq' ? ['', ''] : [''], correctChoice: 0 })
  currentQId.value = newId
}

function deleteQuestion() {
  if (questions.length <= 1) { alert('You must have at least one question.'); return }
  if (!confirm('Delete this question?')) return
  const idx = questions.findIndex(q => q.id === currentQId.value)
  questions.splice(idx, 1)
  currentQId.value = questions[0].id
}

function addChoice() {
  if (currentQ.value && currentQ.value.choices.length < 6) currentQ.value.choices.push('')
}
function removeChoice(idx) {
  if (!currentQ.value) return
  currentQ.value.choices.splice(idx, 1)
  if (currentQ.value.correctChoice >= currentQ.value.choices.length) currentQ.value.correctChoice = 0
}

function updateSummary() {} 

// ── Modals ──
const showPublishModal = ref(false)
const showPreviewModal = ref(false)

function confirmPublish() {
  showPublishModal.value = false
  alert('Exam Published Successfully!')
}

const previewSections = computed(() =>
  SECTIONS.map(sec => ({ ...sec, questions: questions.filter(q => q.type === sec.type) }))
          .filter(sec => sec.questions.length > 0)
)

function openPreview() { showPreviewModal.value = true }
</script>

<style scoped>
:root {
  --em:      #10b981;
  --em-dk:   #059669;
  --em-soft: #ecfdf5;
  --em-mid:  #a7f3d0;
  --txt:     #0f172a;
  --txt-m:   #475569;
  --txt-mu:  #94a3b8;
  --bdr:     #e2e8f0;
}

.workspace {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  overflow-y: auto;
  font-family: "Kantumruy Pro", "Poppins", sans-serif;
}
@media (min-width: 992px) {
  .workspace {
    display: grid;
    grid-template-columns: 280px 1fr 300px;
    align-items: start;
  }
}

/* ── Panel ── */
.panel {
  background: #fff;
  border-radius: 20px;
  border: 0;
  box-shadow: 0 4px 12px rgba(0,0,0,.03);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.panel-head {
  padding: 16px 24px;
  border-bottom: 1px solid var(--bdr);
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.panel-lbl {
  font-size: .85rem; font-weight: 700; color: #0f172a;
  display: flex; align-items: center; gap: 8px;
}
.em-i { color: #10b981; }

/* ── Config box ── */
.config-box {
  padding: 16px;
  border-bottom: 1px solid var(--bdr);
  background: #f8fafc;
}
.field-group { display: flex; flex-direction: column; }
.field-label {
  font-size: .7rem; font-weight: 700; text-transform: uppercase;
  letter-spacing: .5px; color: var(--txt-mu); margin-bottom: 6px;
}
.req { color: #ef4444; }

.q-field {
  width: 100%; border: 1.5px solid var(--bdr); border-radius: 12px;
  padding: 10px 14px; font-size: .88rem; color: #0f172a;
  background: #f8fafc; transition: .2s; outline: none;
  font-weight: 500; font-family: inherit; box-sizing: border-box;
}
.q-field:focus { border-color: #10b981; background: #fff; box-shadow: 0 0 0 3px rgba(16,185,129,.08); }
.q-select { padding-left: 14px; }

/* ── Nav list ── */
.nav-list { padding: 12px; background: #f8fafc; flex: 1; overflow-y: auto; }
.sec-header {
  display: flex; align-items: flex-end; justify-content: space-between;
  margin-top: 18px; margin-bottom: 8px; padding: 0 4px;
}
.sec-title {
  font-size: .65rem; font-weight: 700; text-transform: uppercase;
  letter-spacing: .5px; color: var(--txt-mu); margin-bottom: 4px;
}
.sec-pts { display: flex; align-items: center; gap: 4px; }
.pts-input {
  width: 36px; height: 22px; font-size: .7rem; font-weight: 700;
  text-align: center; border: 1px solid var(--bdr); border-radius: 6px;
  outline: none; padding: 0;
}
.pts-lbl { font-size: .65rem; font-weight: 700; color: var(--txt-mu); }
.btn-add-q {
  background: none; border: none; color: #10b981;
  font-size: 1.1rem; cursor: pointer; padding: 0;
}
.no-q { font-size: .7rem; font-style: italic; color: var(--txt-mu); padding: 0 8px 8px; }

.q-nav-item {
  display: flex; align-items: center;
  padding: 10px 14px; border-radius: 12px;
  cursor: pointer; transition: .2s;
  border: 1.5px solid transparent;
  margin-bottom: 6px; background: #fff;
  box-shadow: 0 2px 6px rgba(0,0,0,.02);
}
.q-nav-item:hover { border-color: var(--bdr); transform: translateY(-1px); }
.q-nav-item.active { border-color: #10b981; background: #ecfdf5; box-shadow: 0 4px 12px rgba(16,185,129,.1); }
.q-nav-inner { display: flex; align-items: center; gap: 8px; font-size: .85rem; font-weight: 700; color: #0f172a; }

/* ── Editor ── */
.editor-panel { display: flex; flex-direction: column; }
.q-badge-pill {
  background: #10b981; color: #fff;
  padding: 4px 12px; border-radius: 8px; font-size: .85rem; font-weight: 700;
}
.editor-body { padding: 24px; flex: 1; overflow-y: auto; }
.editor-footer {
  padding: 12px 16px; border-top: 1px solid var(--bdr);
  background: #f8fafc; display: flex; justify-content: flex-end;
}
.btn-delete {
  background: #fff; color: #ef4444;
  border: 1.5px solid #fecaca; border-radius: 10px;
  padding: 8px 20px; font-weight: 700; font-size: .85rem;
  cursor: pointer; font-family: inherit; transition: .2s;
}
.btn-delete:hover { background: #fef2f2; }

/* ── Choice rows ── */
.choice-row {
  display: flex; align-items: center; gap: 10px;
  margin-bottom: 10px; padding: 8px 12px;
  border-radius: 14px; border: 1.5px solid var(--bdr);
  background: #fff; transition: .2s;
}
.choice-row.correct-hl { border-color: #10b981; background: #ecfdf5; }
.choice-lbl {
  width: 36px; height: 36px; border-radius: 10px; background: #f1f5f9;
  display: flex; align-items: center; justify-content: center;
  font-weight: 800; color: var(--txt-m); font-size: .9rem; flex-shrink: 0;
}
.correct-lbl { background: #10b981; color: #fff; }
.choice-input { flex: 1; border: none; outline: none; background: transparent; font-size: .88rem; font-weight: 500; color: #0f172a; }
.choice-actions { display: flex; align-items: center; gap: 6px; flex-shrink: 0; }
.cr-label { font-size: .63rem; font-weight: 700; color: var(--txt-mu); }
.cr {
  width: 20px; height: 20px; border: 2px solid #cbd5e1; border-radius: 50%;
  cursor: pointer; appearance: none; position: relative; transition: .2s;
}
.cr:checked { border-color: #10b981; background: #10b981; }
.cr:checked::after {
  content: ''; position: absolute; width: 5px; height: 9px;
  border: solid white; border-width: 0 2px 2px 0;
  top: 50%; left: 50%; transform: translate(-50%, -60%) rotate(45deg);
}
.btn-remove { background: none; border: none; color: #ef4444; cursor: pointer; padding: 0; font-size: .9rem; }
.btn-add-choice {
  background: #ecfdf5; color: #059669; border: none; border-radius: 8px;
  padding: 8px 16px; font-weight: 700; font-size: .8rem;
  cursor: pointer; font-family: inherit; margin-top: 4px;
}

.tf-row { display: flex; gap: 12px; }

.hint-text { font-size: .7rem; color: var(--txt-mu); margin-top: 8px; }

.essay-placeholder {
  padding: 24px; border-radius: 12px;
  border: 1px solid var(--bdr); background: #f8fafc; text-align: center;
}
.essay-placeholder i { font-size: 1.8rem; color: var(--txt-mu); display: block; margin-bottom: 8px; }
.essay-placeholder h6 { font-weight: 700; margin-bottom: 6px; }
.essay-placeholder p { font-size: .8rem; color: var(--txt-mu); margin: 0; }

/* ── Right col ── */
.right-col { display: flex; flex-direction: column; gap: 16px; }

/* ── Publish card ── */
.publish-card {
  padding: 24px; text-align: center;
  display: flex; flex-direction: column; align-items: center;
  box-shadow: 0 10px 30px rgba(16,185,129,.08) !important;
}
.pub-badge {
  display: inline-flex; align-items: center; gap: 6px;
  background: #ecfdf5; color: #10b981; font-size: .7rem; font-weight: 700;
  border: 1px solid rgba(16,185,129,.2); border-radius: 999px; padding: 4px 12px; margin-bottom: 12px;
}
.spinner-dot {
  width: 6px; height: 6px; border-radius: 50%; background: #10b981;
  animation: pulse 1.2s ease-in-out infinite;
}
@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.3} }
.pub-title { font-size: 1rem; font-weight: 800; color: #0f172a; margin: 0 0 4px; }
.pub-sub   { font-size: .75rem; color: var(--txt-mu); margin: 0 0 16px; }
.btn-publish {
  width: 100%; border: none; border-radius: 10px; padding: 10px;
  font-weight: 700; font-size: .87rem;
  background: linear-gradient(135deg,#10b981,#059669); color: #fff;
  cursor: pointer; margin-bottom: 8px; transition: .2s; font-family: inherit;
}
.btn-publish:hover { transform: translateY(-2px); box-shadow: 0 6px 15px rgba(16,185,129,.3); }
.btn-preview {
  width: 100%; border: 1px solid var(--bdr); border-radius: 10px; padding: 10px;
  font-weight: 700; font-size: .87rem; background: #f8fafc; color: var(--txt-m);
  cursor: pointer; transition: .2s; font-family: inherit;
}
.btn-preview:hover { background: #f1f5f9; }

/* ── Summary ── */
.sum-row {
  display: flex; align-items: center; justify-content: space-between;
  padding: 12px 0; border-bottom: 1px solid #f1f5f9;
}
.sum-row:last-child { border-bottom: none; padding-bottom: 0; }
.sum-k { display: flex; align-items: center; gap: 8px; font-size: .75rem; color: var(--txt-mu); font-weight: 600; }
.sbdg  { font-size: .75rem; font-weight: 700; padding: 4px 12px; border-radius: 999px; }
.sb-b  { background: #dbeafe; color: #1d4ed8; }
.sb-g  { background: #dcfce7; color: #16a34a; }
.sb-s  { background: #f1f5f9; color: #475569; }

/* ── Modal ── */
.modal-overlay {
  position: fixed; inset: 0;
  background: rgba(0,0,0,.35); backdrop-filter: blur(4px);
  display: flex; align-items: center; justify-content: center;
  z-index: 1000; padding: 16px;
}
.modal-box {
  background: #fff; border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0,0,0,.15);
  width: 480px; max-width: 100%;
  display: flex; flex-direction: column;
  max-height: 90vh;
}
.modal-xl-box { width: 860px; }
.modal-hdr {
  display: flex; align-items: flex-start; justify-content: space-between;
  padding: 20px 24px 0; flex-shrink: 0;
}
.modal-hdr h5 { font-size: 1rem; font-weight: 800; color: #0f172a; display: flex; align-items: center; gap: 8px; margin: 0; }
.modal-close { background: none; border: none; font-size: 1.5rem; color: #94a3b8; cursor: pointer; line-height: 1; }
.modal-bd { padding: 16px 24px; overflow-y: auto; flex: 1; }
.modal-sub { color: var(--txt-mu); font-size: .85rem; margin-bottom: 16px; }
.modal-stats { display: flex; gap: 10px; margin-bottom: 20px; }
.mstat { flex: 1; border-radius: 12px; padding: 14px; text-align: center; }
.mstat.green  { background: #ecfdf5; }
.mstat.blue   { background: #eff6ff; }
.mstat.yellow { background: #fefce8; }
.mstat-val { font-size: 1.1rem; font-weight: 800; }
.mstat-lbl { font-size: .65rem; font-weight: 700; text-transform: uppercase; color: var(--txt-mu); margin-top: 4px; }
.pub-notice { background: #ecfdf5; color: #10b981; padding: 12px 16px; border-radius: 10px; font-size: .82rem; font-weight: 600; }
.modal-ftr { display: flex; justify-content: flex-end; gap: 10px; padding: 12px 24px 20px; flex-shrink: 0; }
.btn-cancel {
  background: #f1f5f9; border: none; border-radius: 10px;
  padding: 9px 18px; font-weight: 700; font-size: .85rem;
  cursor: pointer; font-family: inherit;
}
.btn-confirm {
  background: linear-gradient(135deg,#10b981,#059669); color: #fff;
  border: none; border-radius: 10px; padding: 9px 20px;
  font-weight: 700; font-size: .85rem; cursor: pointer; font-family: inherit;
}

/* ── Classroom room row ── */
.room-row { display: flex; }
.room-sel { border-radius: 12px 0 0 12px !important; border-right: none !important; }
.btn-room {
  background: #ecfdf5; color: #059669;
  border: 1.5px solid rgba(16,185,129,.25); border-left: none;
  border-radius: 0 12px 12px 0; padding: 0 16px;
  font-weight: 700; font-size: .82rem; cursor: pointer;
  white-space: nowrap; font-family: inherit; transition: .2s;
}
.btn-room:hover { background: #d1fae5; }

/* ── Preview ── */
.preview-body { padding: 24px 32px; overflow-y: auto; flex: 1; }
.preview-sub { font-size: .75rem; font-weight: 600; color: var(--txt-mu); margin-top: 2px; }
.preview-section { margin-bottom: 36px; }
.preview-sec-head { border-bottom: 1px solid var(--bdr); padding-bottom: 10px; margin-bottom: 16px; }
.preview-sec-head h5 { font-weight: 700; font-size: .9rem; text-transform: uppercase; letter-spacing: .5px; margin: 0 0 2px; }
.preview-q {
  display: flex; gap: 14px; align-items: flex-start;
  background: #fff; border-radius: 16px;
  padding: 18px; margin-bottom: 14px;
  box-shadow: 0 2px 8px rgba(0,0,0,.03);
}
.preview-q-num {
  width: 30px; height: 30px; border-radius: 50%;
  background: #f1f5f9; display: flex; align-items: center; justify-content: center;
  font-weight: 800; font-size: .85rem; flex-shrink: 0;
}
.preview-q-content { flex: 1; }
.preview-prompt { font-weight: 700; font-size: .95rem; line-height: 1.6; margin-bottom: 12px; color: #0f172a; }
.preview-choices { display: flex; flex-direction: column; gap: 8px; }
.preview-choice {
  display: flex; align-items: center; gap: 10px;
  padding: 10px 14px; border-radius: 10px;
  border: 1px solid var(--bdr); background: #fff; cursor: pointer; font-weight: 500;
}
.choice-letter { font-weight: 700; color: var(--txt-mu); width: 20px; }
.essay-upload-zone {
  border: 2px dashed #cbd5e1; border-radius: 12px;
  padding: 16px; text-align: center;
  color: var(--txt-mu); font-size: .8rem; font-weight: 600;
}
.essay-upload-zone i { font-size: 1.4rem; display: block; margin-bottom: 6px; }

.empty-preview { text-align: center; padding: 48px 0; color: var(--txt-mu); }
.empty-preview i { font-size: 2.5rem; display: block; margin-bottom: 12px; opacity: .3; }
.empty-preview h5 { font-weight: 700; }

/* ── Animations ── */
@keyframes slideIn { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
.slide-in { animation: slideIn .3s ease both; }

::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
</style>