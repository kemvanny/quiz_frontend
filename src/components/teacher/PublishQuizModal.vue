<template>
  <div class="modal-overlay" v-if="isOpen" @click.self="emit('close')">
    <div class="modal-card-custom shadow-lg slide-in">
      
      <div class="aurora-top-line"></div>

      <div class="p-4 pt-4">
        
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h5 class="modal-title-custom m-0">
            <span class="icon-wrap-success me-2">
              <i class="fas fa-paper-plane"></i>
            </span>
            Publish Quiz
          </h5>
          <button type="button" class="btn-close-custom" @click="emit('close')">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <p class="text-muted small mb-4 text-start">សូមពិនិត្យមើលព័ត៌មានលម្អិតនៃវិញ្ញាសារបស់អ្នក មុនពេលដាក់ផ្សាយជាផ្លូវការទៅក្នុងប្រព័ន្ធដើម្បីទទួលបានកូដសម្គាល់។</p>
        
        <div class="row g-3 mb-4">
          <div class="col-4">
            <div class="metric-box bg-emerald-soft">
              <div class="metric-val text-emerald">{{ totalPoints }}/100</div>
              <div class="metric-lbl">Total Points</div>
            </div>
          </div>
          <div class="col-4">
            <div class="metric-box bg-blue-soft">
              <div class="metric-val text-blue">{{ questionCount }}</div>
              <div class="metric-lbl">Questions</div>
            </div>
          </div>
          <div class="col-4">
            <div class="metric-box bg-amber-soft">
              <div class="metric-val text-amber">{{ progressPercent }}%</div>
              <div class="metric-lbl">Completion</div>
            </div>
          </div>
        </div>
        
        <div class="mb-4 text-start">
          <label class="form-label small fw-bold text-slate mb-2">Overall Progress</label>
          <div class="progress progress-custom">
            <div class="progress-bar progress-bar-gradient" :style="{ width: progressPercent + '%' }"></div>
          </div>
        </div>

        <div class="info-alert-box text-start mb-2">
          <i class="fas fa-info-circle info-icon-emerald me-2"></i> 
          <span>បន្ទាប់ពីចុចដាក់ផ្សាយ ប្រព័ន្ធនឹងបង្កើតកូដវិញ្ញាសា (Exam Code) ជូនលោកគ្រូ-អ្នកគ្រូស្វ័យប្រវត្តិ ដើម្បីយកទៅចែករំលែកជូនសិស្សានុសិស្ស។</span>
        </div>

        <div class="d-flex gap-2 justify-content-end border-top-custom pt-4 mt-2">
          <button class="btn btn-cancel-custom" @click="emit('close')" :disabled="isSubmitting">Cancel</button>
          <button class="btn btn-publish-custom d-flex align-items-center gap-2" :disabled="isSubmitting" @click="handleConfirm">
            <span v-if="isSubmitting" class="spinner-border spinner-border-sm" role="status"></span>
            <i v-else class="fas fa-paper-plane" style="font-size: 0.8rem;"></i>
            {{ isSubmitting ? 'Publishing...' : 'Publish Now' }}
          </button>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  isOpen: Boolean,
  isSubmitting: Boolean,
  totalPoints: Number,
  questionCount: Number,
  progressPercent: Number
})

const emit = defineEmits(['close', 'confirm'])

const handleConfirm = () => {
  emit('confirm')
}
</script>

<style scoped>
/* Scoped Glassmorphic Backdrop Background Base Overlay Layer */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(15, 23, 42, 0.4);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  z-index: 1060;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Redesigned Modal Card Framework Shell with High Inner Padding Styles */
.modal-card-custom {
  position: relative;
  width: 100%;
  max-width: 480px;
  background: #ffffff;
  border-radius: 24px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.8);
  margin: 1.5rem;
}

/* Aurora Gradient Top Bar Accent Decor Rule Line */
.aurora-top-line {
  height: 6px;
  width: 100%;
  background: linear-gradient(90deg, #10b981, #13707f, #6823ff);
}

/* Typography Headings Base Formats */
.modal-title-custom {
  font-size: 1.2rem;
  font-weight: 700;
  color: #1e293b;
  display: flex;
  align-items: center;
}

.text-slate {
  color: #475569;
}

/* Icon Wrap Accent Containers Styling */
.icon-wrap-success {
  width: 32px;
  height: 32px;
  background: rgba(16, 185, 129, 0.08);
  color: #10b981;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
}

.btn-close-custom {
  background: transparent;
  border: none;
  color: #94a3b8;
  font-size: 1rem;
  cursor: pointer;
  transition: color 0.2s;
  padding: 4px;
}
.btn-close-custom:hover {
  color: #475569;
}

/* High Padding Soft Grid Metric Grid Item Cards Boxes styling */
.metric-box {
  padding: 16px 10px;
  border-radius: 16px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.01);
}

.metric-val {
  font-size: 1.25rem;
  font-weight: 800;
  line-height: 1.1;
}

.metric-lbl {
  font-size: 0.65rem;
  font-weight: 700;
  color: #94a3b8;
  text-transform: uppercase;
  margin-top: 6px;
  letter-spacing: 0.3px;
}

/* Internal Dynamic UI Colors Tokens Mappings */
.bg-emerald-soft { background: rgba(16, 185, 129, 0.05); }
.text-emerald { color: #10b981; }

.bg-blue-soft { background: rgba(59, 130, 246, 0.05); }
.text-blue { color: #3b82f6; }

.bg-amber-soft { background: rgba(245, 158, 11, 0.05); }
.text-amber { color: #f59e0b; }

/* Custom Sleek Progress Trackers Line Parameters */
.progress-custom {
  height: 8px;
  background-color: #f1f5f9;
  border-radius: 20px;
  overflow: hidden;
}

.progress-bar-gradient {
  background: linear-gradient(90deg, #10b981, #34d399);
  border-radius: 20px;
}

/* Info Alert Notification Box Styles */
.info-alert-box {
  background: rgba(16, 185, 129, 0.05);
  border: 1px solid rgba(16, 185, 129, 0.15);
  color: #10b981;
  font-size: 0.78rem;
  line-height: 1.5;
  padding: 14px 16px;
  border-radius: 14px;
  font-weight: 500;
  display: flex;
  align-items: flex-start;
}

.info-icon-emerald {
  font-size: 0.95rem;
  margin-top: 2px;
}

/* Footer Section Rules Borders Separators Custom Elements */
.border-top-custom {
  border-top: 1px solid #f1f5f9;
}

/* Fully Redesigned Rounded-3 High Fidelity Action Controllers Buttons */
.btn-cancel-custom {
  background: #f1f5f9;
  color: #64748b;
  border: none;
  font-weight: 700;
  font-size: 0.82rem;
  padding: 10px 22px;
  border-radius: 12px;
  transition: all 0.2s ease;
}
.btn-cancel-custom:hover {
  background: #e2e8f0;
  color: #475569;
}

.btn-publish-custom {
  background: linear-gradient(135deg, #10b981, #059669);
  color: #ffffff;
  border: none;
  font-weight: 700;
  font-size: 0.82rem;
  padding: 10px 24px;
  border-radius: 12px;
  box-shadow: 0 4px 14px rgba(16, 185, 129, 0.25);
  transition: all 0.2s ease;
}
.btn-publish-custom:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 18px rgba(16, 185, 129, 0.32);
}
.btn-publish-custom:active {
  transform: translateY(0);
}

/* Entering Animation Frames Controls */
.slide-in {
  animation: modalSlideEffect 0.28s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes modalSlideEffect {
  from { opacity: 0; transform: scale(0.95) translateY(12px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}
</style>