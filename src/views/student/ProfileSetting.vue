<template>
  <div v-if="studentStore.loading">Loading...</div>

  <div v-else-if="studentStore.error">
    {{ studentStore.error }}
  </div>
  <div class="layout" v-else-if="studentStore.profile">
    <!-- LEFT PANEL -->
    <div class="left-card">
      <div class="avatar-wrapper">
        <div class="avatar-placeholder">វ</div>
        <button class="btn-upload" title="Upload photo">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 12V4m0 0L8 8m4-4l4 4"
            />
          </svg>
        </button>
        <button class="btn-delete-avatar" title="Delete photo">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2"
            />
          </svg>
        </button>
      </div>

      <div class="user-name">{{ studentStore.profile.fullName }}</div>
      <div class="user-email">{{ studentStore.profile.email }}</div>
      <div class="badge">{{ studentStore.profile.role }}</div>

      <div class="action-buttons">
        <button class="btn btn-outline">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
          កែប្រែព័ត៌មាន
        </button>

        <button class="btn btn-purple">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
          ផ្លាស់ប្តូរលេខសម្ងាត់
        </button>

        <button class="btn btn-green">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          ផ្លាស់អ៊ីមែល
        </button>

        <button class="btn btn-danger">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2"
            />
          </svg>
          លុបគណនី
        </button>
      </div>
    </div>

    <!-- RIGHT PANEL -->
    <div class="right-card">
      <h2>ព័ត៌មានរបស់ខ្ញុំ</h2>

      <div class="info-grid">
        <div class="info-item">
          <div class="info-label">
            <svg
              class="icon-green"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            នាមត្រកូល
          </div>
          <div class="info-value">{{ studentStore.profile.fullName }}</div>
        </div>

        <div class="info-item">
          <div class="info-label">
            <svg
              class="icon-green"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            នាមខ្លួន
          </div>
          <div class="info-value">តា</div>
        </div>

        <div class="info-item">
          <div class="info-label">
            <svg
              class="icon-green"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498A1 1 0 0121 15.72V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            អាសយដ្ឋានអ៊ីមែល
          </div>
          <div class="info-value">{{ studentStore.profile.email }}</div>
        </div>

        <div class="info-item">
          <div class="info-label">
            <svg
              class="icon-green"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            តួនាទី
          </div>
          <div class="info-value">{{ studentStore.profile.role }}</div>
        </div>

        <div class="info-item">
          <div class="info-label">
            <svg
              class="icon-green"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            ស្ថានភាពគណនី
          </div>
          <span class="status-badge">សកម្ម</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useStudentStore } from "@/stores/student";
import { onMounted } from "vue";
const studentStore = useStudentStore();
onMounted(async () => {
  await studentStore.getProfile();
  console.log("student profile:", studentStore.profile);
});
</script>

<style scoped>
.layout {
  --bg: #f0f4f8;
  --card: #ffffff;
  --border: #e2e8f0;
  --text-primary: #1a202c;
  --text-secondary: #718096;
  --green: #38a169;
  --green-light: #f0fff4;
  --green-border: #c6f6d5;
  --blue-light: #ebf4ff;
  --blue-border: #bee3f8;
  --blue: #3182ce;
  --orange: #dd6b20;
  --orange-bg: #fffaf0;
  --red: #e53e3e;
  --purple-light: #faf5ff;
  --purple-border: #e9d8fd;
  --shadow: 0 2px 6px rgba(15, 23, 42, 0.12);
  --shadow-md: 0 12px 26px rgba(15, 23, 42, 0.14);
  width: 100%;
  min-height: calc(100vh - 150px);
  display: grid;
  grid-template-columns: 290px 650px;
  gap: 16px;
  align-items: center;
  align-content: center;
  justify-content: center;
  justify-items: stretch;
  max-width: none;
  margin: 0;
  padding: 24px;
  background: transparent;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.page-header {
  margin-bottom: 28px;
}
.page-header h1 {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: -0.01em;
}
.page-header p {
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin-top: 4px;
  font-style: italic;
}

/* LEFT CARD */
.left-card {
  background: var(--card);
  border-radius: 18px;
  box-shadow: var(--shadow);
  min-height: 500px;
  padding: 28px 24px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.avatar-wrapper {
  position: relative;
  margin-bottom: 16px;
}
.avatar-wrapper img {
  width: 96px;
  height: 96px;
  object-fit: cover;
  border: 4px solid #dbe7f7;
  display: block;
}
.avatar-placeholder {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  background: #568bd0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.25rem;
  color: white;
  font-weight: 700;
  border: 4px solid #dbe7f7;
}
.btn-upload {
  position: absolute;
  bottom: 0;
  left: -5px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1.5px solid #d8e0ea;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: var(--shadow);
  transition: box-shadow 0.2s;
}
.btn-upload:hover {
  box-shadow: var(--shadow-md);
}
.btn-upload svg {
  width: 14px;
  height: 14px;
  color: #475569;
}

.btn-delete-avatar {
  position: absolute;
  bottom: 0;
  right: -5px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1.5px solid #fed7d7;
  background: #fff5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: var(--shadow);
  transition: background 0.2s;
}
.btn-delete-avatar:hover {
  background: #fed7d7;
}
.btn-delete-avatar svg {
  width: 14px;
  height: 14px;
  color: var(--red);
}

.user-name {
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--text-primary);
  line-height: 1.2;
  margin-bottom: 6px;
}
.user-email {
  font-size: 0.88rem;
  color: #697392;
  margin-bottom: 10px;
}
.badge {
  background: #ebf4ff;
  color: var(--blue);
  border: 1px solid var(--blue-border);
  border-radius: 20px;
  padding: 3px 13px;
  font-size: 0.78rem;
  font-weight: 500;
  margin-bottom: 22px;
}

.action-buttons {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.btn {
  width: 100%;
  min-height: 44px;
  padding: 10px 14px;
  border-radius: 10px;
  font-size: 0.88rem;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: none;
  transition: all 0.2s;
}
.btn svg {
  width: 16px;
  height: 16px;
  flex: 0 0 auto;
}

.btn-outline {
  background: transparent;
  border: 1.5px solid #1f2937;
  color: var(--text-primary);
}
.btn-outline:hover {
  background: #f7fafc;
}

.btn-purple {
  background: var(--purple-light);
  border: 1.5px solid var(--purple-border);
  color: #6b46c1;
}
.btn-purple:hover {
  background: #e9d8fd;
}

.btn-green {
  background: var(--green-light);
  border: 1.5px solid var(--green-border);
  color: var(--green);
}
.btn-green:hover {
  background: #c6f6d5;
}

.btn-danger {
  background: transparent;
  border: none;
  color: var(--red);
  margin-top: 8px;
}
.btn-danger:hover {
  text-decoration: underline;
}

/* RIGHT CARD */
.right-card {
  background: var(--card);
  border-radius: 18px;
  box-shadow: var(--shadow);
  min-height: 500px;
  padding: 28px 30px 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.right-card h2 {
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--text-primary);
  line-height: 1.25;
  margin-bottom: 20px;
}

.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.info-item {
  min-height: 78px;
  background: #fcfcfd;
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 14px 18px;
  transition: box-shadow 0.2s;
}
.info-item:hover {
  box-shadow: var(--shadow);
}

.info-label {
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 0.78rem;
  color: var(--text-secondary);
  line-height: 1.35;
  margin-bottom: 6px;
}
.info-label svg {
  width: 15px;
  height: 15px;
  flex: 0 0 auto;
}

.icon-green {
  color: var(--green);
}
.icon-blue {
  color: var(--blue);
}

.info-value {
  font-size: 0.98rem;
  font-weight: 700;
  color: var(--text-primary);
}

.status-badge {
  display: inline-block;
  background: var(--green-light);
  color: var(--green);
  border: 1px solid var(--green-border);
  border-radius: 20px;
  padding: 2px 14px;
  font-size: 0.78rem;
  font-weight: 700;
}

@media (min-width: 1280px) {
  .layout {
    grid-template-columns: 300px 660px;
  }
}

@media (max-width: 1100px) {
  .layout {
    grid-template-columns: 1fr;
    max-width: 560px;
    min-height: auto;
    margin: 0 auto;
    padding: 16px 0 32px;
  }

  .left-card,
  .right-card {
    min-height: auto;
  }
}

@media (max-width: 768px) {
  .layout {
    padding: 0 0 32px;
    gap: 18px;
  }

  .left-card,
  .right-card {
    border-radius: 18px;
    padding: 28px 20px;
  }

  .avatar-placeholder,
  .avatar-wrapper img {
    width: 104px;
    height: 104px;
  }

  .user-name {
    font-size: 1.35rem;
  }

  .user-email,
  .btn,
  .info-label {
    font-size: 1rem;
  }

  .right-card h2 {
    font-size: 1.3rem;
  }

  .info-grid {
    grid-template-columns: 1fr;
  }

  .info-item {
    min-height: 90px;
    padding: 18px;
  }

  .info-value {
    font-size: 1.05rem;
  }
}
</style>
