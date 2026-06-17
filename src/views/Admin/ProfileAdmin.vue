<template>
  <div v-if="authStore && authStore.profile" class="profile-shell">

    <div class="left-panel">
      <div class="avatar-ring">
        <img :src="`${imgBaseUrl}${authStore.profile.avatar}?t=${imageRefresh}`" alt="Avatar" />
        <span class="status-dot" title="Online"></span>
      </div>

      <div class="user-name">{{ authStore.profile.firstName }} {{ authStore.profile.lastName }}</div>

      <span class="role-badge">
        <i class="fa-solid fa-shield-halved"></i> {{ authStore.profile.role }}
      </span>

      <div class="stats-strip">
        <div class="stat-box">
          <span class="stat-num">48</span>
          <span class="stat-label">អ្នកប្រើប្រាស់សរុប</span>
        </div>
        <div class="stat-box">
          <span class="stat-num">312</span>
          <span class="stat-label">គ្រូបង្រៀន</span>
        </div>
        <div class="stat-box">
          <span class="stat-num">99</span>
          <span class="stat-label">និស្សិត</span>
        </div>
        <div class="stat-box">
          <span class="stat-num">9</span>
          <span class="stat-label">ការប្រឡង</span>
        </div>
      </div>

      <input type="file" ref="fileInput" style="display: none" accept="image/*" @change="onFileSelected" />

      <button class="upload-btn" @click="triggerFileInput">
        <i class="fa-solid fa-cloud-arrow-up"></i>
        បញ្ចូលរូបភាពថ្មី
      </button>
    </div>

    <div class="right-panel">
      <div class="section-header">
        <div>
          <div class="section-title">ព័ត៌មានគណនី</div>
          <div class="section-sub">ធ្វើបច្ចុប្បន្នភាពព័ត៌មានលម្អិតផ្ទាល់ខ្លួនរបស់អ្នកនៅខាងក្រោម</div>
        </div>
        <button class="edit-pill" @click="toggleEdit">
          <i :class="isEditMode ? 'fa-solid fa-eye' : 'fa-solid fa-pen-to-square'"></i>
          <span>{{ isEditMode ? 'កំពុងមើល' : 'កែប្រែព័ត៌មាន' }}</span>
        </button>
      </div>

      <div class="fields-grid">
        <div class="field-group">
          <label class="field-label"> នាមត្រកូល</label>
          <div class="field-input-wrap">
            <i class="fa-solid fa-user field-icon"></i>
            <input class="field-input user-email" :class="{ 'input-error': errors.firstName }" type="text"
              v-model="userProfile.firstName" @input="validateFirstName(userProfile.firstName)"
              :readonly="!isEditMode" />
          </div>
          <span v-if="errors.firstName" class="error-text">{{ errors.firstName }}</span>
        </div>

        <div class="field-group">
          <label class="field-label"> នាមខ្លួន</label>
          <div class="field-input-wrap">
            <i class="fa-solid fa-user-tag field-icon"></i>
            <input class="field-input" :class="{ 'input-error': errors.lastName }" type="text"
              v-model="userProfile.lastName" @input="validateLastName(userProfile.lastName)" :readonly="!isEditMode" />
          </div>
          <span v-if="errors.lastName" class="error-text">{{ errors.lastName }}</span>
        </div>

        <div class="field-group field-full">
          <label class="field-label"> អាសយដ្ឋានអ៊ីមែល</label>
          <div class="field-input-wrap">
            <i class="fa-solid fa-envelope field-icon" style="color:var(--teal-500);"></i>
            <div class="role-display locked-email-display">
             {{ authStore.profile.email }}
            </div>
          </div>
        </div>

        <div class="field-group">
          <label class="field-label"> លេខទូរស័ព្ទ</label>
          <div class="field-input-wrap">
            <i class="fa-solid fa-phone field-icon"></i>
            <input class="field-input" :class="{ 'is-null': !userProfile.phone && !isEditMode }" type="tel"
              v-model="userProfile.phone" @input="validatePhone(userProfile.phone)" placeholder="មិនទាន់មានទិន្នន័យ · Not Provided" :readonly="!isEditMode" />
          </div>
          <span v-if="errors.phone" class="error-text">{{ errors.phone }}</span>
        </div>

        <div class="field-group">
          <label class="field-label">អាសយដ្ឋាន</label>
          <div class="field-input-wrap">
            <i class="fa-solid fa-location-dot field-icon"></i>
            <input class="field-input" :class="{ 'is-null': !userProfile.address && !isEditMode }" type="text"
              v-model="userProfile.address" @input="validateAddress(userProfile.address)" placeholder="មិនទាន់មានទិន្នន័យ · Not Provided" :readonly="!isEditMode" />
          </div>
          <span v-if="errors.address" class="error-text">{{ errors.address }}</span>
        </div>

        <div class="field-group field-full">
          <label class="field-label"> តួនាទីក្នុងប្រព័ន្ធ</label>
          <div class="field-input-wrap">
            <i class="fa-solid fa-shield-halved field-icon" style="color:var(--teal-500);"></i>
            <div class="role-display">
              <span class="role-dot"></span>
              <span class="role-text">{{ authStore.profile.role }}</span>
            </div>
          </div>
        </div>

        <div class="field-group field-full">
          <label class="field-label">លេខកូដគណនី</label>
          <div class="field-input-wrap">
            <i class="fa-solid fa-id-badge field-icon"></i>
            <input class="field-input readonly-code" type="text" :value="authStore.profile.code || 'A0001'" readonly />
          </div>
        </div>
      </div>

      <hr class="section-divider" />

      <div class="action-bar">
        <button v-if="isEditMode" class="btn-cancel" @click="cancelEdit">
          <i class="fa-solid fa-xmark"></i> បោះបង់
        </button>

        <button v-if="isEditMode" class="btn-save" :disabled="!hasChanges || hasErrors" @click="saveChanges">
           <i class="fa-solid" :class="authStore.loading ? 'fa-spinner fa-spin' : 'fa-floppy-disk'"></i> 
    {{ authStore.loading ? 'កំពុងរក្សាទុក...' : 'រក្សាទុកព័ត៌មាន' }}
        </button>

        <span v-else class="readonly-note">
          <i class="fa-solid fa-lock" style="font-size:.7rem;"></i> ចុចលើពាក្យ "កែប្រែប្រវត្តិរូប"
          ដើម្បីផ្លាស់ប្តូរព័ត៌មាន
        </span>
      </div>
    </div>
  </div>

  <div v-else class="loading-container">
    <div class="spinner-border text-teal" role="status"></div>
    <p>កំពុងទាញយកទិន្នន័យគណនី...</p>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { useFormValidation } from '@/composables/useFormValidation'
import { useAuthStore } from '@/stores/authStore'
import { getTotalUser } from '@/api/admin.api'

const authStore = useAuthStore()
const imgBaseUrl = import.meta.env.VITE_BASE_URL_FOR_IMAGE

const imageRefresh = ref(Date.now())
const fileInput = ref(null)

const totalUser = ref();

const triggerFileInput = () => {
  fileInput.value.click()
}

const userProfile = reactive({
  firstName: "",
  lastName: "",
  phone: null,
  address: null
})

const originalProfile = ref({ ...userProfile })

const {
  errors,
  validateFirstName,
  validateLastName,
  validatePhone,
  validateAddress
} = useFormValidation()

const hasErrors = computed(() => {
  return !!(errors.value.firstName || errors.value.lastName || errors.value.phone || errors.value.address)
})

const hasChanges = computed(() => {
  return userProfile.firstName !== originalProfile.value.firstName ||
         userProfile.lastName !== originalProfile.value.lastName ||
         userProfile.phone !== originalProfile.value.phone ||
         userProfile.address !== originalProfile.value.address
})

// Upload Image
const onFileSelected = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  if (file.size > 2 * 1024 * 1024) {
    triggerToast('ទំហំរូបភាពត្រូវតែតូចជាង 2MB', 'fa-solid fa-circle-xmark')
    return
  }
try {
  triggerToast('កំពុងផ្ទុកឡើងរូបភាព...', 'fa-solid fa-spinner fa-spin')
  if (authStore.error) authStore.error = null

  await authStore.uploadAvatar(file)

 if (typeof authStore.fetchProfile === 'function') {
      await authStore.fetchProfile()
    }
  
  imageRefresh.value = Date.now()
  
  triggerToast('ផ្លាស់ប្តូររូបភាពប្រវត្តិរូបជោគជ័យ!', 'fa-solid fa-circle-check')

} catch (err) {
  const errorMsg = err.response?.data?.msg || 'មិនអាចផ្ទុកឡើងរូបភាពបានទេ'
  triggerToast(errorMsg, 'fa-solid fa-circle-xmark')
} finally {
  event.target.value = ''
}
}


const syncProfileData = () => {
  if (authStore.profile) {
    userProfile.firstName = authStore.profile.firstName || ""
    userProfile.lastName = authStore.profile.lastName || ""
    userProfile.phone = authStore.profile.phone || null
    userProfile.address = authStore.profile.address || null
    originalProfile.value = { ...userProfile }
  }
}

watch(() => authStore.profile, () => {
  syncProfileData()
}, { immediate: true })

const isEditMode = ref(false)
const toast = reactive({
  show: false,
  message: '',
  icon: ''
})

const toggleEdit = () => {
  isEditMode.value = !isEditMode.value
  if (!isEditMode.value) {
    clearErrors()
  }
}



// Update Profile
const saveChanges = async () => {
  validateFirstName(userProfile.firstName)
  validateLastName(userProfile.lastName)
  validatePhone(userProfile.phone)
  validateAddress(userProfile.address)

  if (hasErrors.value) return

  try {
    await authStore.updateProfile({
      firstName: userProfile.firstName,
      lastName: userProfile.lastName,
      phone: userProfile.phone,
      address: userProfile.address
    })

    originalProfile.value = { ...userProfile }
    isEditMode.value = false
    triggerToast('កែប្រែព័ត៌មាន Admin ជោគជ័យ!', 'fa-solid fa-circle-check')
  } catch (err) {
    const errorMsg = err.response?.data?.message || 'ការកែប្រែព័ត៌មានបរាជ័យ!'
    triggerToast(errorMsg, 'fa-solid fa-circle-xmark')
  }
}

//Get Total User
const fetchTotalUser = async()=>{
  try{
    const res = await getTotalUser();
    totalUser.value = res.data.data;
  }catch(error){
    triggerToast('មិនអាចទាញទិន្នន័យបានទេ','fa-solid fa-circle-xmark')
  }
}

const clearErrors = () => {
  errors.value.firstName = ''
  errors.value.lastName = ''
  errors.value.phone = ''
  errors.value.address = ''
}

const cancelEdit = () => {
  Object.assign(userProfile, originalProfile.value)
  clearErrors()
  isEditMode.value = false
  triggerToast('Changes discarded.', 'fa-solid fa-rotate-left')
}

const triggerToast = (msg, iconClass) => {
  toast.message = msg
  toast.icon = iconClass
  toast.show = true
  setTimeout(() => {
    toast.show = false
  }, 3000)
}

onMounted(async () => {
  await authStore.fetchProfile();
  fetchTotalUser();
})
</script>

<style scoped>
.profile-shell {
  width: 100%;
  max-width: 1140px;
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
  margin: 0;
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
  box-sizing: border-box;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}

.stat-box {
  background: rgba(255, 255, 255, 0.75);
  border: 1px solid rgba(255, 255, 255, 0.9);
  border-radius: 14px;
  padding: 1rem 0.5rem;
  text-align: center;
  width: 100%;
  box-sizing: border-box;
  box-shadow: 0 2px 8px rgba(20, 184, 166, 0.04);
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

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem;
  color: #0d9488;
  gap: 1rem;
}

.text-teal {
  color: #14b8a6;
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