<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div
        v-if="show"
        class="modal-overlay"
        @click.self="$emit('close')"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modalTitle"
      >
        <div class="modal-dialog modal-dialog-centered modal-xl custom-modal-dialog">
          <div class="modal-content custom-modal-content">

            <div class="row g-0 h-100">
              <div class="col-lg-4 sidebar-col">
                <div class="sidebar-inner h-100 d-flex flex-column align-items-center justify-content-center py-5 px-4 text-center">

                  <span class="blob blob-1" aria-hidden="true"></span>
                  <span class="blob blob-2" aria-hidden="true"></span>

                  <div class="avatar-ring mb-4">
                    <img
                      :src="avatarSrc"
                      :alt="user.fullName"
                      class="avatar-img"
                    />
                    <span
                      class="status-dot"
                      :class="user.is_active ? 'dot-active' : 'dot-inactive'"
                      :title="user.is_active ? 'Active' : 'Inactive'"
                    ></span>
                  </div>

                  <h4 class="sidebar-name mb-2">{{ user.fullName }}</h4>

                  <span class="role-badge mb-2">
                    <i :class="roleIcon" class="me-1"></i>
                    {{ capitalise(user.role) }}
                  </span>

                  <span class="code-badge mb-4">
                    <i class="bi bi-hash me-1"></i>{{ user.user_code }}
                  </span>

                  <div class="sidebar-divider w-75 mb-4"></div>

                  <p class="joined-text mb-0">
                    <i class="bi bi-calendar3 me-1"></i>
                    Joined {{ formatDate(user.created_at) }}
                  </p>
                </div>
              </div>

              <div class="col-lg-8 content-col d-flex flex-column">

                <div class="content-header d-flex align-items-center justify-content-between px-5 pt-4 pb-3">
                  <div>
                    <p class="content-eyebrow mb-0">ប្រវត្តិរូបអ្នកប្រើប្រាស់</p>
                    <h4 id="modalTitle" class="content-title mb-0">ព័ត៌មានគណនី</h4>
                  </div>
                  <button
                    type="button"
                    class="modal-close-btn"
                    @click="$emit('close')"
                    aria-label="Close modal"
                  >
                    <i class="bi bi-x-lg"></i>
                  </button>
                </div>

                <div class="px-5 pb-3 d-flex align-items-center gap-2">
                  <span class="info-pill">
                    <i class="bi bi-circle-fill me-1" :class="user.is_active ? 'text-success' : 'text-secondary'"></i>
                    {{ user.is_active ? 'គណនីសកម្ម' : 'គណនីអសកម្ម' }}
                  </span>
                  <span class="info-pill" :class="statusPillClass">
                    <i class="bi bi-shield-check me-1"></i>
                    {{ capitalise(user.status) }}
                  </span>
                </div>

                <div class="content-body px-5 py-2 flex-grow-1 overflow-auto">
                  <div class="row g-3">

                    <div class="col-md-6">
                      <label class="field-label">នាមខ្លួន </label>
                      <div class="input-group custom-input-group">
                        <span class="input-group-text"><i class="bi bi-person-fill"></i></span>
                        <input
                          type="text"
                          class="form-control custom-input"
                          :value="firstName"
                          disabled
                          placeholder="នាមខ្លួន​"
                        />
                      </div>
                    </div>

                    <div class="col-md-6">
                      <label class="field-label">នាមត្រកូល </label>
                      <div class="input-group custom-input-group">
                        <span class="input-group-text"><i class="bi bi-person-fill"></i></span>
                        <input
                          type="text"
                          class="form-control custom-input"
                          :value="lastName"
                          disabled
                          placeholder="នាមត្រកូល"
                        />
                      </div>
                    </div>

                    <div class="col-12">
                      <label class="field-label">អាសយដ្ឋានអ៊ីមែល </label>
                      <div class="input-group custom-input-group">
                        <span class="input-group-text"><i class="bi bi-envelope-fill"></i></span>
                        <input
                          type="email"
                          class="form-control custom-input"
                          :value="user.email ?? ''"
                          disabled
                          placeholder="អ៊ីមែល"
                        />
                      </div>
                    </div>

                    <div class="col-md-6">
                      <label class="field-label">លេខទូរស័ព្ទ </label>
                      <div class="input-group custom-input-group">
                        <span class="input-group-text"><i class="bi bi-telephone-fill"></i></span>
                        <input
                          type="text"
                          class="form-control custom-input"
                          :value="user.phone ?? ''"
                          disabled
                          placeholder="លេខទូរស័ព្ទ"
                        />
                      </div>
                    </div>

                    <div class="col-md-6">
                      <label class="field-label">ភេទ</label>
                      <div class="input-group custom-input-group">
                        <span class="input-group-text"><i class="bi bi-gender-ambiguous"></i></span>
                        <input
                          type="text"
                          class="form-control custom-input"
                          :value="user.gender ?? ''"
                          disabled
                          placeholder="ភេទ"
                        />
                      </div>
                    </div>

                    <div class="col-12">
                      <label class="field-label">អាសយដ្ឋាន </label>
                      <div class="input-group custom-input-group">
                        <span class="input-group-text"><i class="bi bi-geo-alt-fill"></i></span>
                        <input
                          type="text"
                          class="form-control custom-input"
                          :value="user.address ?? ''"
                          disabled
                          placeholder="អាសយដ្ឋាន"
                        />
                      </div>
                    </div>

                    <div class="col-md-6">
                      <label class="field-label">តួនាទីក្នុងប្រព័ន្ធ</label>
                      <div class="input-group custom-input-group">
                        <span class="input-group-text"><i class="bi bi-shield-fill"></i></span>
                        <input
                          type="text"
                          class="form-control custom-input"
                          :value="capitalise(user.role)"
                          disabled
                          placeholder="តួនាទី"
                        />
                      </div>
                    </div>

                    <div class="col-md-6">
                      <label class="field-label">លេខសម្គាល់គណនី</label>
                      <div class="input-group custom-input-group">
                        <span class="input-group-text"><i class="bi bi-fingerprint"></i></span>
                        <input
                          type="text"
                          class="form-control custom-input"
                          :value="`#${user.id}`"
                          disabled
                        />
                      </div>
                    </div>

                  </div></div><div class="content-footer px-5 py-4 d-flex justify-content-between align-items-center">
                  <p class="footer-meta mb-0">
                    <i class="bi bi-pencil-square me-1"></i>
                    ធ្វើបច្ចុប្បន្នភាពចុងក្រោយ៖ {{ formatDate(user.updated_at) }}
                  </p>
                  <button
                    type="button"
                    class="btn btn-close-custom"
                    @click="$emit('close')"
                  >
                    <i class="bi bi-x-circle me-2"></i>បិទ
                  </button>
                </div>

              </div></div></div></div></div></Transition>
  </Teleport>
</template>


<script setup>
import { computed } from 'vue'

const props = defineProps({
  user: {
    type: Object,
    required: true,
    default: () => ({
      id: 2,
      fullName: 'Vit Socheata',
      user_code: 'T0001',
      email: 'socheatavit@gmail.com',
      role: 'teacher',
      gender: null,
      status: 'pending',
      created_at: '2026-06-02T09:25:28.000Z',
      updated_at: '2026-06-07T15:27:08.000Z',
      is_active: 1,
      avatar: 'default.png',
    }),
  },
  show: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['close'])

const DEFAULT_AVATAR = 'https://ui-avatars.com/api/?background=3fba7f&color=fff&size=128&bold=true'

const avatarSrc = computed(() => {
  const av = props.user.avatar
  if (!av || av === 'default.png') {
    return `${DEFAULT_AVATAR}&name=${encodeURIComponent(props.user.fullName)}`
  }
  return av
})

const nameParts = computed(() => (props.user.fullName ?? '').trim().split(/\s+/))
const firstName = computed(() => nameParts.value.slice(1).join(' ') || nameParts.value[0] || '')
const lastName  = computed(() => nameParts.value[0] || '')

const capitalise = (str) => str ? str.charAt(0).toUpperCase() + str.slice(1) : ''

const formatDate = (iso) => {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
}

const roleIcon = computed(() => {
  const map = { teacher: 'bi bi-person-workspace', student: 'bi bi-mortarboard-fill', admin: 'bi bi-shield-lock-fill' }
  return map[props.user.role] ?? 'bi bi-person-fill'
})

const statusPillClass = computed(() => ({
  'pill-success' : props.user.status === 'active',
  'pill-warning' : props.user.status === 'pending',
  'pill-danger'  : props.user.status === 'inactive' || props.user.status === 'banned',
}))
</script>


<style scoped>
:root,
.custom-modal-content {
  --mint-50:  #f0fdf6;
  --mint-100: #dcfce9;
  --mint-200: #bbf7d4;
  --mint-400: #3fba7f;
  --mint-500: #22a066;
  --mint-600: #166d45;
  --sidebar-bg: linear-gradient(160deg, #e8f8f0 0%, #c8f0dc 100%);
  --radius-card: 12px;
  --radius-modal: 20px;
  --shadow-modal: 0 24px 60px rgba(34, 160, 102, 0.18), 0 4px 16px rgba(0,0,0,0.08);
  --font-body: 'Kantumruy Pro', 'DM Sans', sans-serif;
}

.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 1055;
  background: rgba(10, 30, 20, 0.45);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.custom-modal-dialog {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
}

.custom-modal-content {
  border: none;
  border-radius: var(--radius-modal);
  overflow: hidden;
  box-shadow: var(--shadow-modal);
  min-height: 520px;
  font-family: var(--font-body);
}

.sidebar-col {
  background: var(--sidebar-bg);
  position: relative;
  overflow: hidden;
}

.sidebar-inner {
  position: relative;
  z-index: 1;
}

.blob {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  opacity: 0.35;
}
.blob-1 {
  width: 200px; height: 200px;
  background: radial-gradient(circle, #3fba7f55, transparent 70%);
  top: -60px; right: -60px;
}
.blob-2 {
  width: 160px; height: 160px;
  background: radial-gradient(circle, #22a06640, transparent 70%);
  bottom: 40px; left: -50px;
}

.avatar-ring {
  position: relative;
  width: 125px; height: 125px;
  border-radius: 50%;
  padding: 4px;
  background: linear-gradient(135deg, #3fba7f, #22a066);
  box-shadow: 0 8px 28px rgba(63, 186, 127, 0.3);
}
.avatar-img {
  width: 100%; height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #fff;
}
.status-dot {
  position: absolute;
  bottom: 8px; right: 8px;
  width: 18px; height: 18px;
  border-radius: 50%;
  border: 2.5px solid #fff;
}
.dot-active   { background: #22c55e; }
.dot-inactive { background: #94a3b8; }

.sidebar-name {
  font-size: 1.3rem;
  font-weight: 700;
  color: #1a3d2b;
}


.role-badge {
  display: inline-flex;
  align-items: center;
  background: #3fba7f;
  color: #fff;
  font-size: 0.8rem;
  font-weight: 600;
  padding: 5px 14px;
  border-radius: 20px;
  letter-spacing: 0.03em;
}

.code-badge {
  display: inline-flex;
  align-items: center;
  background: #fff;
  color: #22a066;
  font-size: 0.8rem;
  font-weight: 700;
  padding: 4px 12px;
  border-radius: 20px;
  border: 1.5px solid #bbf7d4;
  letter-spacing: 0.05em;
}

.sidebar-divider {
  height: 1.5px;
  background: linear-gradient(90deg, transparent, #3fba7f55, transparent);
  border: none;
}

.joined-text {
  font-size: 0.8rem;
  color: #6b8a78;
  font-weight: 500;
}

.content-col {
  background: #ffffff;
}

.content-header {
  border-bottom: 1.5px solid #f0fdf6;
}
.content-eyebrow {
  font-size: 0.72rem;
  font-weight: 600;
  color: #3fba7f;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}
.content-title {
  font-size: 1.25rem;
  font-weight: 800;
  color: #1a3d2b;
}

.modal-close-btn {
  width: 36px; height: 36px;
  border: none;
  background: #f0fdf6;
  color: #3fba7f;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background 0.15s, color 0.15s, transform 0.15s;
}
.modal-close-btn:hover {
  background: #3fba7f;
  color: #fff;
  transform: rotate(90deg);
}

.info-pill {
  display: inline-flex;
  align-items: center;
  font-size: 0.73rem;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 20px;
  background: #f0fdf6;
  color: #22a066;
  border: 1.5px solid #bbf7d4;
}
.pill-success { background: #f0fdf6; color: #22a066; border-color: #86efac; }
.pill-warning { background: #fffbeb; color: #b45309; border-color: #fde68a; }
.pill-danger  { background: #fff1f2; color: #be123c; border-color: #fecdd3; }

.field-label {
  font-size: 0.74rem;
  font-weight: 700;
  color: #3fba7f;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: 5px;
  display: block;
}

.custom-input-group {
  border-radius: var(--radius-card);
  overflow: hidden;
  box-shadow: 0 1px 4px rgba(63,186,127,0.07);
}
.custom-input-group .input-group-text {
  background: #f0fdf6;
  border: 1.5px solid #bbf7d4;
  border-right: none;
  color: #3fba7f;
  font-size: 0.88rem;
  padding: 0 14px;
}
.custom-input {
  border: 1.5px solid #bbf7d4;
  border-left: none;
  background: #fafffe;
  color: #334155;
  font-size: 0.88rem;
  font-family: var(--font-body);
  padding: 9px 14px;
}
.custom-input:disabled {
  background: #fafffe;
  color: #334155;
  opacity: 1;
  cursor: default;
}
.custom-input::placeholder {
  color: #b0c4bb;
  font-style: italic;
}

.content-body {
  max-height: 380px;
}

.content-footer {
  border-top: 1.5px solid #f0fdf6;
}
.footer-meta {
  font-size: 0.74rem;
  color: #94a3b8;
}

.btn-close-custom {
  background: #f0fdf6;
  color: #22a066;
  border: 1.5px solid #bbf7d4;
  border-radius: var(--radius-card);
  font-size: 0.85rem;
  font-weight: 600;
  padding: 8px 20px;
  transition: background 0.18s, color 0.18s, box-shadow 0.18s;
}
.btn-close-custom:hover {
  background: #3fba7f;
  color: #fff;
  border-color: #3fba7f;
  box-shadow: 0 4px 14px rgba(63,186,127,0.30);
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.25s ease;
}
.modal-fade-enter-active .custom-modal-dialog,
.modal-fade-leave-active .custom-modal-dialog {
  transition: transform 0.28s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.25s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
.modal-fade-enter-from .custom-modal-dialog {
  transform: scale(0.92) translateY(20px);
  opacity: 0;
}
.modal-fade-leave-to .custom-modal-dialog {
  transform: scale(0.95) translateY(10px);
  opacity: 0;
}

@media (max-width: 991px) {
  .custom-modal-dialog { max-width: 98vw; }
  .sidebar-col {
    border-radius: var(--radius-modal) var(--radius-modal) 0 0;
  }
  .content-body { max-height: none; }
  .sidebar-inner { padding-top: 3rem !important; padding-bottom: 3rem !important; }
}
</style>