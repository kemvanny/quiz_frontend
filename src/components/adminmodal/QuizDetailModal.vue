<template>
  <Teleport to="body">
    <div v-if="show" class="custom-modal-overlay" @click="emit('close')">
      <div class="custom-modal-card ">
        <div class="modal-header-custom">
          <div class="d-flex align-items-center gap-3">
            <div class="quiz-logo-wrap">
              <img :src="logo" alt="Logo" class="quiz-logo-img">
            </div>
            <h5 class="modal-title-custom">{{ exam?.title }}</h5>
          </div>

          <button class="btn-close-custom" @click="emit('close')">
            <i class="bi bi-x-lg"></i>
          </button>
        </div>
        <!-- Status Bar -->
        <div class="status-bar">
          <span class="status-pill status-active">
            <span class="status-dot"></span>Active
          </span>
          <span class="status-divider">·</span>
          <span class="status-type"><i class="bi bi-tag me-1"></i>Quiz</span>
        </div>

        <div class="modal-body px-4 pb-4 pt-3">
          <div class="row g-3 mb-4">
            <div class="col-4" v-for="stat in stats" :key="stat.label">
              <div class="stat-card">
                <div class="stat-value">{{ stat.value }}<span class="stat-unit">{{ stat.unit }}</span></div>
                <div class="stat-label">{{ stat.label }}</div>
              </div>
            </div>
          </div>

          <div class="row g-3">
            <div class="col-md-6" v-for="field in formFields" :key="field.id">
              <label class="form-label text-muted small fw-bold">{{ field.label }}</label>
              <div class="input-shadow">
                <input type="text" class="form-control custom-input" v-model="formData[field.id]">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>
<script setup>
import { ref, reactive, watch, computed } from 'vue';
import logo from '@/assets/images/logo.png';

const emit = defineEmits(["close"]);

const props = defineProps({ exam: Object, show: Boolean });

const stats = computed(() => [
  { label: 'រយៈពេល', value: props.exam?.duration || '0', unit: 'នាទី' },
  { label: 'ការបញ្ជូន', value: props.exam?.submissions_count || '0', unit: 'ដង' },
  { label: 'ពិន្ទុជាមធ្យម', value: props.exam?.average_score || '0.0', unit: 'ពិន្ទុ' }
]);

const formFields = ref([
  { id: 'teacher', label: 'គ្រូបង្គោល' },
  { id: 'room', label: 'បន្ទប់រៀន' },
  { id: 'start', label: 'ចាប់ផ្តើម' },
  { id: 'end', label: 'បញ្ចប់' }
]);

const formData = reactive({
  teacher: '',
  room: '',
  start: '',
  end: ''
});

const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);

  return date.toLocaleString('km-KH', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
};
watch(() => props.exam, (newExam) => {
  if (newExam) {
    formData.teacher = newExam.teacher_name || 'N/A';
    formData.room = newExam.room_name || 'N/A';
    formData.start = formatDate(newExam.start_time);
    formData.end = formatDate(newExam.end_time);
  }
}, { immediate: true });
</script>

<style scoped>
.btn-trigger {
  background: var(--green-accent);
  color: #fff;
  border: none;
  border-radius: var(--radius-pill);
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: 0.01em;
  box-shadow: 0 4px 16px rgba(31, 158, 103, 0.28);
  transition:
    background 0.18s,
    transform 0.15s,
    box-shadow 0.18s;
}

.btn-trigger:hover {
  background: var(--green-hover);
  transform: translateY(-1px);
  box-shadow: 0 6px 22px rgba(31, 158, 103, 0.35);
  color: #fff;
}

.custom-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  z-index: 1050;
  display: grid;
  place-items: center;
}

.custom-modal-card {
  background: #fff;
  width: 90%;
  max-width: 700px;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.modal-backdrop-custom {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5) !important;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.modal-body {
  background: var(--emerald-soft) !important;
}

.modal-dialog {
  width: 100%;
  max-width: 800px;
  margin: auto;
  pointer-events: auto;
}

.modal-backdrop.show {
  backdrop-filter: blur(4px);
}

.modal-header-custom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
}

.quiz-logo-wrap {
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background: var(--emerald-soft);
  border-radius: 10px;
  border: 1px solid rgb(87, 222, 137);

}

.quiz-logo-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.modal-title-custom {
  margin: 0;
  font-weight: bold;
  white-space: nowrap;
  
}

.modal-eyebrow {
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--green-accent);
  margin-bottom: 1px;
}

.modal-title-custom {
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: -0.01em;
  margin: 0;
}

.btn-close-custom {
  background: var(--green-soft);
  border: 1px solid var(--green-mid);
  color: var(--green-accent);
  border-radius: 50%;
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  cursor: pointer;
  transition:
    background 0.15s,
    color 0.15s;
  flex-shrink: 0;
}

.btn-close-custom:hover {
  background: var(--green-accent);
  color: #fff;
  border-color: var(--green-accent);
}

.status-bar {
  background: #fff;
  border-bottom: 1px solid var(--green-light);
  padding: 8px 24px;
  font-size: 0.82rem;
  display: flex;
  align-items: center;
  gap: 10px;
}

.status-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 3px 10px;
  border-radius: var(--radius-pill);
  font-weight: 600;
  font-size: 0.78rem;
  letter-spacing: 0.03em;
}

.status-active {
  background: #dcf5ea;
  color: #0f7a4a;
  border: 1px solid #a3e4c3;
}

.status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: currentColor;
  display: inline-block;
}

.status-divider {
  color: var(--text-muted);
  font-size: 1rem;
}

.status-type {
  color: var(--text-muted);
  font-size: 0.8rem;
}

.stat-card {
  background: #fff;
  border: 1.5px solid var(--green-light);
  border-radius: var(--radius-card);
  padding: 14px 10px 12px;
  text-align: center;
  transition:
    border-color 0.15s,
    box-shadow 0.15s;
}

.stat-card:hover {
  border-color: var(--green-border);
  box-shadow: 0 4px 14px rgba(31, 158, 103, 0.12);
}

.stat-value {
  font-size: 1.7rem;
  font-weight: 800;
  color: var(--green-accent);
  line-height: 1;
  letter-spacing: -0.03em;
}

.stat-unit {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--text-muted);
  margin-left: 2px;
  letter-spacing: 0.02em;
}

.stat-label {
  font-size: 0.72rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  color: var(--text-muted);
  margin-top: 4px;
}

.section-label {
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--green-accent);
  margin-bottom: 10px;
}

.detail-grid {
  background: #fff;
  border: 1.5px solid var(--green-light);
  border-radius: var(--radius-card);
  overflow: hidden;
}

.detail-row {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 16px;
  border-bottom: 1px solid var(--green-soft);
  transition: background 0.12s;
}

.detail-row:last-child {
  border-bottom: none;
}

.detail-row:hover {
  background: var(--green-soft);
}

.detail-icon {
  width: 34px;
  height: 34px;
  background: var(--green-soft);
  border: 1px solid var(--green-light);
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--green-accent);
  font-size: 0.95rem;
  flex-shrink: 0;
}

.detail-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  gap: 8px;
}

.detail-key {
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--text-muted);
  min-width: 90px;
}

.detail-val {
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--text-primary);
  text-align: right;
}

.modal-footer-custom {
  background: #fff;
  border-top: 1.5px solid var(--green-light);
  padding: 14px 24px;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.btn-outline-green {
  border: 1.5px solid var(--green-border);
  color: var(--green-accent);
  background: transparent;
  border-radius: var(--radius-pill);
  font-size: 0.88rem;
  font-weight: 600;
  transition:
    background 0.15s,
    color 0.15s;
}

.btn-outline-green:hover {
  background: var(--green-soft);
  color: var(--green-hover);
  border-color: var(--green-accent);
}

.btn-solid-green {
  background: var(--green-accent);
  color: #fff;
  border: none;
  border-radius: var(--radius-pill);
  font-size: 0.88rem;
  font-weight: 600;
  box-shadow: 0 3px 12px rgba(31, 158, 103, 0.28);
  transition:
    background 0.15s,
    transform 0.12s;
}

.btn-solid-green:hover {
  background: var(--green-hover);
  color: #fff;
  transform: translateY(-1px);
}

@media (max-width: 576px) {
  .detail-content {
    flex-direction: column;
    align-items: flex-start;
  }

  .detail-val {
    text-align: left;
  }

  .stat-value {
    font-size: 1.3rem;
  }
}

.custom-input {
  border: 1px solid #d6f3e6;
  border-radius: 10px;
  padding: 10px 15px;
  background: #fff;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.custom-input:focus {
  border-color: var(--green-accent);
  box-shadow: 0 0 0 0.2rem rgba(31, 158, 103, 0.15);
}

.input-shadow {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.03);
  border-radius: 10px;
}
</style>