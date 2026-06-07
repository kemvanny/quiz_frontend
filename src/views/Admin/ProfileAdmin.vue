<template>
  <div class="profile-shell">

    <div class="left-panel">
      <div class="avatar-ring">
        <div v-if="!userProfile.avatar" class="avatar-placeholder">SA</div>
        <img v-else :src="userProfile.avatar" alt="Avatar" />
        <span class="status-dot" title="Online"></span>
      </div>

      <div class="user-name">{{ userProfile.firstName }} {{ userProfile.lastName }}</div>

      <span class="role-badge">
        <i class="fa-solid fa-shield-halved"></i> {{ userProfile.role }}
      </span>

      <span class="code-chip">
        <i class="fa-solid fa-hashtag" style="font-size:.7rem;"></i> {{ userProfile.code }}
      </span>

      <div class="stats-strip">
        <div class="stat-box">
          <span class="stat-num">48</span>
          <span class="stat-label">Quizzes</span>
        </div>
        <div class="stat-box">
          <span class="stat-num">312</span>
          <span class="stat-label">Students</span>
        </div>
        <div class="stat-box">
          <span class="stat-num">99%</span>
          <span class="stat-label">Uptime</span>
        </div>
        <div class="stat-box">
          <span class="stat-num">4.9</span>
          <span class="stat-label">Rating</span>
        </div>
      </div>

      <button class="upload-btn">
        <i class="fa-solid fa-cloud-arrow-up"></i>
        Upload New Photo
      </button>
    </div>

    <div class="right-panel">
      <div class="section-header">
        <div>
          <div class="section-title">Account Information</div>
          <div class="section-sub">Update your personal details below</div>
        </div>
        <button class="edit-pill" @click="toggleEdit">
          <i :class="isEditMode ? 'fa-solid fa-eye' : 'fa-solid fa-pen-to-square'"></i>
          <span>{{ isEditMode ? 'Viewing' : 'Edit Profile' }}</span>
        </button>
      </div>

      <div class="fields-grid">
        <div class="field-group">
          <label class="field-label"><i class="fa-solid fa-user"></i> First Name</label>
          <div class="field-input-wrap">
            <i class="fa-solid fa-user field-icon"></i>
            <input 
              class="field-input" 
              :class="{ 'input-error': errors.firstName }"
              type="text" 
              v-model="userProfile.firstName" 
              @input="validateFirstName(userProfile.firstName)"
              :readonly="!isEditMode" 
            />
          </div>
          <span v-if="errors.firstName" class="error-text">{{ errors.firstName }}</span>
        </div>

        <div class="field-group">
          <label class="field-label"><i class="fa-solid fa-user"></i> Last Name</label>
          <div class="field-input-wrap">
            <i class="fa-solid fa-user-tag field-icon"></i>
            <input 
              class="field-input" 
              :class="{ 'input-error': errors.lastName }"
              type="text" 
              v-model="userProfile.lastName" 
              @input="validateLastName(userProfile.lastName)"
              :readonly="!isEditMode" 
            />
          </div>
          <span v-if="errors.lastName" class="error-text">{{ errors.lastName }}</span>
        </div>

        <div class="field-group field-full">
          <label class="field-label"><i class="fa-solid fa-envelope"></i> Email Address</label>
          <div class="field-input-wrap">
            <i class="fa-solid fa-envelope field-icon" style="color:var(--teal-500);"></i>
            <div class="role-display locked-email-display">
              <span class="role-text">{{ userProfile.email }}</span>
            </div>
          </div>
        </div>

        <div class="field-group">
          <label class="field-label"><i class="fa-solid fa-phone"></i> Phone Number</label>
          <div class="field-input-wrap">
            <i class="fa-solid fa-phone field-icon"></i>
            <input class="field-input" :class="{ 'is-null': !userProfile.phone && !isEditMode }" type="tel"
              v-model="userProfile.phone" placeholder="មិនទាន់មានទិន្នន័យ · Not Provided" :readonly="!isEditMode" />
          </div>
        </div>

        <div class="field-group">
          <label class="field-label"><i class="fa-solid fa-location-dot"></i> Address</label>
          <div class="field-input-wrap">
            <i class="fa-solid fa-location-dot field-icon"></i>
            <input class="field-input" :class="{ 'is-null': !userProfile.address && !isEditMode }" type="text"
              v-model="userProfile.address" placeholder="មិនទាន់មានទិន្នន័យ · Not Provided" :readonly="!isEditMode" />
          </div>
        </div>

        <div class="field-group field-full">
          <label class="field-label"><i class="fa-solid fa-shield-halved"></i> System Role</label>
          <div class="field-input-wrap">
            <i class="fa-solid fa-shield-halved field-icon" style="color:var(--teal-500);"></i>
            <div class="role-display">
              <span class="role-dot"></span>
              <span class="role-text">{{ userProfile.role }}</span>
            </div>
          </div>
        </div>

        <div class="field-group field-full">
          <label class="field-label"><i class="fa-solid fa-id-badge"></i> Account Code</label>
          <div class="field-input-wrap">
            <i class="fa-solid fa-id-badge field-icon"></i>
            <input class="field-input readonly-code" type="text" v-model="userProfile.code" readonly />
          </div>
        </div>
      </div>

      <hr class="section-divider" />

      <div class="action-bar">
        <button v-if="isEditMode" class="btn-cancel" @click="cancelEdit">
          <i class="fa-solid fa-xmark"></i> Cancel
        </button>
        
        <button 
          v-if="isEditMode" 
          class="btn-save" 
          :disabled="!hasChanges || hasErrors" 
          @click="saveChanges"
        >
          <i class="fa-solid fa-floppy-disk"></i> Save Changes
        </button>
        
        <span v-else class="readonly-note">
          <i class="fa-solid fa-lock" style="font-size:.7rem;"></i> Click "Edit Profile" to make changes
        </span>
      </div>

    </div>
  </div>
  
  <div class="toast-wrap">
    <div class="toast-msg" :class="{ 'show': toast.show }">
      <i :class="toast.icon"></i>
      <span>{{ toast.message }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useFormValidation } from '@/composables/useFormValidation'

const { 
  errors, 
  validateFirstName, 
  validateLastName 
} = useFormValidation()

// ២. ទិន្នន័យ Profile
const userProfile = reactive({
  code: "A0001",
  firstName: "System",
  lastName: "Admin",
  email: "quizadmin@gmail.com",
  role: "admin",
  phone: null,
  address: null,
  avatar: "/public/uploads/avatars/avatar-1780392163824-73553033.jpg"
})

// រក្សាទុកទិន្នន័យដើម (Backup ប្រើ ref ដើម្បីងាយស្រួលប្រៀបធៀប)
const originalProfile = ref({ ...userProfile })

// ៣. ទិន្នន័យគ្រប់គ្រង UI State
const isEditMode = ref(false)
const toast = reactive({
  show: false,
  message: '',
  icon: ''
})

// ៤. Computed៖ ពិនិត្យមើលថាតើទិន្នន័យបច្ចុប្បន្នខុសពីទិន្នន័យដើម (មានការកែប្រែ) ឬទេ?
const hasChanges = computed(() => {
  return userProfile.firstName !== originalProfile.value.firstName ||
         userProfile.lastName  !== originalProfile.value.lastName  ||
         userProfile.phone     !== originalProfile.value.phone     ||
         userProfile.address   !== originalProfile.value.address
})

// ៥. Computed៖ ពិនិត្យមើលថាតើមាន Error Validation ដែរឬទេ?
const hasErrors = computed(() => {
  return !!(errors.value.firstName || errors.value.lastName)
})

// មុខងារ៖ បើក/បិទ Edit
const toggleEdit = () => {
  isEditMode.value = !isEditMode.value
  // ពេលបិទមកវិញ ជម្រះ Error ចាស់ចោល
  if (!isEditMode.value) {
    clearErrors()
  }
}

// មុខងារ៖ ជម្រះ Error Messages
const clearErrors = () => {
  errors.value.firstName = ''
  errors.value.lastName = ''
}

// មុខងារ៖ Cancel មិនរក្សាទុក
const cancelEdit = () => {
  Object.assign(userProfile, originalProfile.value)
  clearErrors()
  isEditMode.value = false
  triggerToast('Changes discarded.', 'fa-solid fa-rotate-left')
}

// មុខងារ៖ រក្សាទុកទិន្នន័យ
const saveChanges = () => {
  // ឆែក Validation ម្ដងទៀតមុនពេលហៅទៅកាន់ API ឬរក្សាទុក
  validateFirstName(userProfile.firstName)
  validateLastName(userProfile.lastName)

  if (hasErrors.value) return // បើមាន Error មិនឱ្យទៅមុខទៀតទេ

  originalProfile.value = { ...userProfile }
  isEditMode.value = false
  triggerToast('Profile updated successfully!', 'fa-solid fa-circle-check')
}

// មុខងារ៖ បង្ហាញ Toast
const triggerToast = (msg, iconClass) => {
  toast.message = msg
  toast.icon = iconClass
  toast.show = true
  setTimeout(() => {
    toast.show = false
  }, 3000)
}
</script>

<style scoped>
.profile-shell {
  width: 100%;
  max-width: 1060px;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(18px) saturate(1.4);
  -webkit-backdrop-filter: blur(18px) saturate(1.4);
  border: 1px solid rgba(255, 255, 255, 0.9);
  border-radius: 24px;
  box-shadow: 0 4px 32px rgba(20, 184, 166, 0.10), 0 1px 4px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  display: grid;
  grid-template-columns: 320px 1fr;
  animation: fadeUp .55s cubic-bezier(.22, .68, 0, 1.2) both;
  position: fixed;
}

.left-panel {
  background: linear-gradient(160deg, #d1fae5 0%, #ccfbf1 50%, #b2f5ea 100%);
  padding: 1.75rem 1.75rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  position: relative;
  overflow: hidden;
  border-right: 1px solid rgba(255, 255, 255, 0.7);
}

/* Avatar */
.avatar-ring {
  position: relative;
  width: 110px;
  height: 110px;
  border-radius: 50%;
  padding: 4px;
  background: linear-gradient(135deg, #4ade80, #14b8a6);
  box-shadow: 0 8px 30px rgba(20, 184, 166, 0.3);
  flex-shrink: 0;
  z-index: 1;
}

.avatar-ring img,
.avatar-placeholder {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-placeholder {
  background: linear-gradient(135deg, #86efb8, #5eead4);
  font-size: 2.2rem;
  font-weight: 700;
  color: white;
}

/* Online dot */
.status-dot {
  position: absolute;
  bottom: 6px;
  right: 6px;
  width: 18px;
  height: 18px;
  background: #22c55e;
  border-radius: 50%;
  border: 3px solid white;
  animation: pulse-dot 2s ease-in-out infinite;
}

@keyframes pulse-dot {
  0% {
    box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.55);
  }

  70% {
    box-shadow: 0 0 0 7px rgba(34, 197, 94, 0);
  }

  100% {
    box-shadow: 0 0 0 0 rgba(34, 197, 94, 0);
  }
}

.user-name {
  font-size: 1.35rem;
  font-weight: 700;
  color: #1e293b;
  text-align: center;
  line-height: 1.25;
}

.role-badge {
  display: inline-flex;
  align-items: center;
  gap: .4rem;
  background: linear-gradient(135deg, #0d9488, #059669);
  color: white;
  font-size: .72rem;
  font-weight: 600;
  text-transform: uppercase;
  padding: .32rem .85rem;
  border-radius: 50px;
  box-shadow: 0 3px 10px rgba(5, 150, 105, 0.3);
}

.code-chip {
  display: inline-flex;
  align-items: center;
  gap: .4rem;
  background: rgba(255, 255, 255, 0.8);
  color: #0d9488;
  font-size: .78rem;
  font-weight: 600;
  padding: .3rem .8rem;
  border-radius: 8px;
  border: 1px solid rgba(20, 184, 166, 0.25);
}

.stats-strip {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: .6rem;
  margin-top: .25rem;
}

.stat-box {
  background: rgba(255, 255, 255, 0.75);
  border: 1px solid rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  padding: .75rem .6rem;
  text-align: center;
}

.stat-box .stat-num {
  font-size: 1.1rem;
  font-weight: 700;
  color: #0d9488;
  display: block;
}

.stat-box .stat-label {
  font-size: .65rem;
  color: #64748b;
  text-transform: uppercase;
}

.upload-btn {
  margin-top: .25rem;
  display: inline-flex;
  align-items: center;
  gap: .4rem;
  background: rgba(255, 255, 255, 0.75);
  color: #0d9488;
  border: 1.5px dashed rgba(20, 184, 166, 0.5);
  border-radius: 10px;
  padding: .45rem 1rem;
  font-size: .78rem;
  font-weight: 500;
  cursor: pointer;
  transition: all .2s;
  width: 100%;
  justify-content: center;
}

.upload-btn:hover {
  background: #ffffff;
  border-color: #14b8a6;
}

/* ── Right panel ─────────────────────────────── */
.right-panel {
  padding: 1.75rem 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: .75rem;
  border-bottom: 1px solid #f1f5f9;
}

.section-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #1e293b;
}

.section-sub {
  font-size: .8rem;
  color: #94a3b8;
}

.edit-pill {
  display: inline-flex;
  align-items: center;
  gap: .35rem;
  font-size: .72rem;
  font-weight: 600;
  color: #0d9488;
  background: #dcfce9;
  border: 1px solid #bbf7d4;
  border-radius: 50px;
  padding: .28rem .75rem;
  cursor: pointer;
}

.fields-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: .75rem 1.25rem;
}

.field-full {
  grid-column: 1 / -1;
}

.field-group {
  display: flex;
  flex-direction: column;
  gap: .4rem;
}

.field-label {
  font-size: .72rem;
  font-weight: 600;
  color: #64748b;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: .4rem;
}

.field-label i {
  color: #14b8a6;
}

.field-input-wrap {
  position: relative;
}

.field-icon {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: #14b8a6;
  font-size: .85rem;
  pointer-events: none;
}

.field-input {
  width: 100%;
  padding: .65rem 1rem .65rem 2.5rem;
  background: #f8fafc;
  border: 1.5px solid #e2e8f0;
  border-radius: 12px;
  font-size: .88rem;
  font-weight: 500;
  color: #1e293b;
  transition: all .2s;
  outline: none;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06) inset;
}

.field-input:focus {
  border-color: #14b8a6;
  background: white;
  box-shadow: 0 0 0 3px rgba(20, 184, 166, 0.12);
}

.field-input[readonly] {
  background: #f0fdf6;
  color: #64748b;
}

.field-input.is-null {
  color: #94a3b8;
  font-style: italic;
}

.readonly-code {
  letter-spacing: .1em;
  font-weight: 700;
  color: #0d9488 !important;
}

.role-display {
  display: flex;
  align-items: center;
  gap: .5rem;
  padding: .6rem 1rem .6rem 2.5rem;
  background: #f0fdf6;
  border: 1.5px solid #bbf7d4;
  border-radius: 12px;
}

.role-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #14b8a6;
  box-shadow: 0 0 0 3px rgba(20, 184, 166, 0.2);
}

.role-text {
  font-size: .88rem;
  font-weight: 600;
  color: #334155;
  text-transform: capitalize;
}

.section-divider {
  border: none;
  border-top: 1px solid #f1f5f9;
}

.action-bar {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: .75rem;
}

.btn-cancel {
  padding: .6rem 1.5rem;
  border-radius: 10px;
  border: 1.5px solid #e2e8f0;
  background: white;
  color: #64748b;
  font-weight: 600;
  cursor: pointer;
}

.btn-save {
  padding: .65rem 1.75rem;
  border-radius: 10px;
  border: none;
  background: linear-gradient(135deg, #14b8a6, #059669);
  color: white;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(20, 184, 166, 0.35);
}

.readonly-note {
  font-size: .78rem;
  color: #94a3b8;
  font-weight: 500;
}

/* Toast */
.toast-wrap {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 999;
}

.toast-msg {
  background: #1e293b;
  color: white;
  font-size: .82rem;
  font-weight: 500;
  padding: .7rem 1.2rem;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: .5rem;
  opacity: 0;
  transform: translateY(10px);
  transition: all .3s;
  pointer-events: none;
}

.toast-msg.show {
  opacity: 1;
  transform: translateY(0);
}

.toast-msg i {
  color: #4ade80;
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(22px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 820px) {
  .profile-shell {
    grid-template-columns: 1fr;
  }

  .left-panel {
    border-right: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.7);
  }

  .fields-grid {
    grid-template-columns: 1fr;
  }

  .field-full {
    grid-column: 1;
  }
}
</style>