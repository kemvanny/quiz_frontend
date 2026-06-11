<template>
    <Teleport to="body">
      <div v-if="isOpen" class="modal-backdrop-custom" @click.self="isOpen = false">
        <div class="modal-dialog modal-dialog-centered modal-lg">
          <div class="modal-content modal-content-custom">
            <div class="modal-header-custom">
              <div class="d-flex align-items-center gap-3">
                <div class="quiz-icon-wrap"><i class="bi bi-mortarboard-fill"></i></div>
                <h5 class="modal-title-custom">HTML Quiz 3</h5>
              </div>
              <button class="btn-close-custom" @click="isOpen = false">
                <i class="bi bi-x-lg"></i>
              </button>
            </div>

            <div class="modal-body px-4 pb-4 pt-3" >
              <div class="row g-3 mb-4">
                <div class="col-4" v-for="stat in stats" :key="stat.label">
                  <div class="stat-card">
                    <div class="stat-value">{{ stat.value }}<span class="stat-unit">{{ stat.unit }}</span></div>
                    <div class="stat-label">{{ stat.label }}</div>
                  </div>
                </div>
              </div>

              <p class="section-label">ព័ត៌មានលម្អិតនៃវិញ្ញាសា</p>
              <div class="row g-3">
                <div class="col-md-6" v-for="field in formFields" :key="field.id">
                  <label class="form-label text-muted small fw-bold">{{ field.label }}</label>
                  <div class="input-shadow">
                    <input type="text" class="form-control custom-input" v-model="formData[field.id]">
                  </div>
                </div>
              </div>
            </div>

            <div class="modal-footer-custom">
              <button class="btn btn-outline-green px-4" @click="isOpen = false">បិទ</button>
              <button class="btn btn-solid-green px-4">
                <i class="bi bi-pencil-square me-2"></i>កែសម្រួល
              </button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
</template>
<script setup>
import { ref, reactive } from 'vue';

const isOpen = ref(false);

const stats = ref([
  { label: 'រយៈពេល', value: '60', unit: 'នាទី' },
  { label: 'ការបញ្ជូន', value: '0', unit: 'ដង' },
  { label: 'ពិន្ទុជាមធ្យម', value: '0.0', unit: 'ពិន្ទុ' }
]);

const formFields = ref([
  { id: 'teacher', label: 'គ្រូបង្គោល' },
  { id: 'room', label: 'បន្ទប់រៀន' },
  { id: 'start', label: 'ចាប់ផ្តើម' },
  { id: 'end', label: 'បញ្ចប់' }
]);

const formData = reactive({
  teacher: 'Thoeurn Sokkay',
  room: 'N/A',
  start: '10 មិថុនា 2026, 02:45 PM',
  end: '10 មិថុនា 2026, 03:45 PM'
});
</script>

<style>
  :root {
        --green-bg: #f2fbf6;
        --green-accent: #1f9e67;
        --green-border: #3db882;
        --green-light: #d6f3e6;
        --green-soft: #e8f7f0;
        --green-hover: #17885a;
        --text-primary: #1a2e25;
        --text-muted: #6b8f7c;
        --radius-card: 14px;
        --radius-pill: 100px;
      }

      body {
        background: #eef8f3;
        font-family:
          "Inter",
          system-ui,
          -apple-system,
          sans-serif;
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
      }

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

      .modal-content-custom {
        border: 1.5px solid var(--green-border);
        border-radius: var(--radius-card);
        background: var(--green-bg);
        box-shadow: 0 20px 60px rgba(10, 40, 25, 0.18);
        overflow: hidden;
      }
      .modal-backdrop.show {
        backdrop-filter: blur(4px);
      }
      .modal-header-custom {
        background: #fff;
        border-bottom: 1.5px solid var(--green-light);
        padding: 1rem 1.5rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .quiz-icon-wrap {
        width: 44px;
        height: 44px;
        background: var(--green-soft);
        border: 1.5px solid var(--green-border);
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.4rem;
        color: var(--green-accent);
        flex-shrink: 0;
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
        border: 1px solid var(--green-light);
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