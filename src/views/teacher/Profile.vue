<template>
  <div class="layout">
    <div class="left-card">
      <div class="avatar-wrapper">
        <img
          :src="profileData.avatarUrl"
          id="profileImagePreview"
          @error="handleImageError"
          alt="Avatar"
        />
        <button
          class="btn-upload"
          @click="triggerFileInput"
          title="ប្តូររូបភាព"
        >
          <i class="fas fa-upload"></i>
        </button>
        <button
          v-if="
            profileData.avatarUrl &&
            !profileData.avatarUrl.includes('ui-avatars.com')
          "
          class="btn-delete-avatar"
          @click="openDeleteModal"
          :disabled="loadingAvatar"
        >
          <i class="fas fa-spinner fa-spin" v-if="loadingAvatar"></i>
          <i class="fas fa-trash-alt" v-else></i>
        </button>
        <input
          ref="fileInput"
          type="file"
          hidden
          accept="image/*"
          @change="handleAvatarUpload"
        />
      </div>

      <h4 class="user-name">
        {{ profileData.firstName }} {{ profileData.lastName }}
      </h4>

      <div class="mb-4">
        <span class="role-badge">
          <i
            :class="
              profileData.role?.toUpperCase() === 'STUDENT'
                ? 'fas fa-graduation-cap'
                : 'fas fa-chalkboard-teacher'
            "
          ></i>
          {{ profileData.role?.toUpperCase() === 'STUDENT' ? 'សិស្ស' : 'គ្រូបង្រៀន' }}
        </span>
      </div>

      <div class="action-buttons">
        <button
          type="button"
          :class="[
            'btn',
            currentTab === 'general' ? 'btn-green' : 'btn-outline',
          ]"
          @click="currentTab = 'general'"
        >
          <i class="fas fa-edit"></i> ព័ត៌មានផ្ទាល់ខ្លួន
        </button>
        <button
          type="button"
          :class="[
            'btn',
            currentTab === 'security' ? 'btn-purple' : 'btn-outline',
          ]"
          @click="currentTab = 'security'"
        >
          <i class="fas fa-lock"></i> ផ្លាស់ប្តូរលេខសម្ងាត់
        </button>
        <button type="button" class="btn btn-danger" @click="openLogoutModal">
          <i class="fas fa-trash-alt"></i> លុបគណនី
        </button>
      </div>
    </div>

    <div class="right-card">
      <div
        v-if="currentTab === 'general'"
        id="tab-general"
        class="fade-in-panel w-100"
      >
        <div class="mb-4">
          <h2 class="m-0">ព័ត៌មានរបស់ខ្ញុំ</h2>
        </div>

        <div v-if="loadingData" class="text-center py-5">
          <div class="spinner-border text-success" role="status"></div>
        </div>

        <form v-else @submit.prevent="handleSaveProfile">
          <div class="info-grid">
            <div class="info-item">
              <label class="info-label">ID គណនី</label>
              <div class="input-wrapper">
                <i class="fas fa-id-badge input-icon"></i>
                <input
                  type="text"
                  class="info-input"
                  v-model="profileData.userId"
                  disabled
                />
              </div>
            </div>

            <div class="info-item">
              <label class="info-label">ភេទ</label>
              <div class="input-wrapper">
                <i class="fas fa-venus-mars input-icon"></i>
                <select
                  class="info-input selector-custom"
                  v-model="profileData.gender"
                  :disabled="!isEditing"
                >
                  <option value="" disabled>ជ្រើសរើសភេទ</option>
                  <option value="MALE">ប្រុស</option>
                  <option value="FEMALE">ស្រី</option>
                  <option value="OTHER">ផ្សេងៗ</option>
                </select>
              </div>
            </div>

            <div class="info-item">
              <label class="info-label">នាមត្រកូល</label>
              <div class="input-wrapper">
                <i class="fas fa-user input-icon"></i>
                <input
                  type="text"
                  class="info-input"
                  v-model="profileData.firstName"
                  placeholder="បញ្ចូលនាមត្រកូល"
                  :disabled="!isEditing"
                />
              </div>
            </div>

            <div class="info-item">
              <label class="info-label">នាមខ្លួន</label>
              <div class="input-wrapper">
                <i class="fas fa-user input-icon"></i>
                <input
                  type="text"
                  class="info-input"
                  v-model="profileData.lastName"
                  placeholder="បញ្ចូលនាមខ្លួន"
                  :disabled="!isEditing"
                />
              </div>
            </div>

            <div class="info-item">
              <label class="info-label">អាសយដ្ឋានអ៊ីមែល</label>
              <div class="input-wrapper">
                <i class="fas fa-envelope input-icon"></i>
                <input
                  type="email"
                  class="info-input"
                  v-model="profileData.email"
                  disabled
                />
              </div>
            </div>

            <div class="info-item">
              <label class="info-label">លេខទូរសព្ទ</label>
              <div class="input-wrapper">
                <i class="fas fa-phone input-icon"></i>
                <input
                  type="text"
                  class="info-input"
                  v-model="profileData.phone"
                  placeholder="បញ្ចូលលេខទូរសព្ទ"
                  :disabled="!isEditing"
                />
              </div>
            </div>

            <div class="info-item" style="grid-column: span 2">
              <label class="info-label">អាសយដ្ឋាន</label>
              <div class="input-wrapper">
                <i class="fas fa-map-marker-alt input-icon"></i>
                <input
                  type="text"
                  class="info-input"
                  v-model="profileData.address"
                  placeholder="បញ្ចូលអាសយដ្ឋាន"
                  :disabled="!isEditing"
                />
              </div>
            </div>
          </div>

          <div class="d-flex justify-content-end gap-3 mt-5 pt-4 border-top">
            <button
              v-if="!isEditing"
              type="button"
              class="btn btn-green"
              style="width: auto; padding: 10px 24px"
              @click="isEditing = true"
            >
              <i class="fas fa-edit me-1"></i> កែប្រែព័ត៌មាន
            </button>

            <template v-else>
              <button
                type="button"
                class="btn btn-outline"
                style="width: auto; padding: 10px 24px"
                @click="cancelEditing"
              >
                បោះបង់
              </button>
              <button
                type="submit"
                class="btn btn-green"
                style="
                  width: auto;
                  padding: 10px 24px;
                  background-color: #38a169;
                  color: white;
                "
                :disabled="updatingProfile"
              >
                <i
                  class="fas fa-spinner fa-spin me-2"
                  v-if="updatingProfile"
                ></i>
                រក្សាទុកព័ត៌មាន
              </button>
            </template>
          </div>
        </form>
      </div>

      <div
        v-if="currentTab === 'security'"
        id="tab-security"
        class="fade-in-panel w-100"
      >
        <h2>សុវត្ថិភាព និងពាក្យសម្ងាត់</h2>
        <form @submit.prevent>
          <div
            class="profile-form"
            style="display: grid; grid-template-columns: 1fr; gap: 20px"
          >
            <div class="profile-field">
              <label>ពាក្យសម្ងាត់បច្ចុប្បន្ន</label>
              <div class="password-input">
                <input type="password" placeholder="••••••••••••" />
              </div>
            </div>
            <div
              style="
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 20px;
              "
            >
              <div class="profile-field">
                <label>ពាក្យសម្ងាត់ថ្មី</label>
                <div class="password-input">
                  <input type="password" placeholder="បញ្ចូលពាក្យសម្ងាត់ថ្មី" />
                </div>
              </div>
              <div class="profile-field">
                <label>បញ្ជាក់ពាក្យសម្ងាត់ថ្មី</label>
                <div class="password-input">
                  <input
                    type="password"
                    placeholder="បញ្ចូលពាក្យសម្ងាត់ថ្មីម្តងទៀត"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="d-flex justify-content-end mt-5 pt-4 border-top">
            <button
              type="button"
              class="btn btn-purple"
              style="width: auto; padding: 10px 24px"
            >
              ធ្វើបច្ចុប្បន្នភាពពាក្យសម្ងាត់
            </button>
          </div>
        </form>
      </div>
    </div>

    <BaseModal
      :isOpen="isDeleteModalOpen"
      @close="isDeleteModalOpen = false"
      width="350px"
    >
      <div class="p-3 text-center">
        <div class="modal-icon-alert text-danger mb-3">
          <i class="fas fa-exclamation-circle fa-2x"></i>
        </div>
        <h5 class="fw-bold text-dark mb-2" style="font-size: 1.1rem">
          លុបរូបភាពប្រវត្តិរូប?
        </h5>
        <p class="text-muted mb-4 small" style="line-height: 1.5">
          តើអ្នកពិតជាចង់លុបរូបភាពបច្ចុប្បន្ននេះមែនទេ?
          សកម្មភាពនេះមិនអាចទាញត្រឡប់មកវិញបានឡើយ។
        </p>
        <div class="d-flex gap-2 w-100">
          <button
            class="btn btn-outline flex-fill"
            @click="isDeleteModalOpen = false"
          >
            បោះបង់
          </button>
          <button
            class="btn btn-danger flex-fill"
            style="margin-top: 0"
            @click="confirmDeleteAvatar"
            :disabled="loadingAvatar"
          >
            <span
              v-if="loadingAvatar"
              class="spinner-border spinner-border-sm me-1"
            ></span>លុបចេញ
          </button>
        </div>
      </div>
    </BaseModal>

    <BaseModal
      :isOpen="isLogoutModalOpen"
      @close="isLogoutModalOpen = false"
      width="350px"
    >
      <div class="p-3 text-center">
        <div class="modal-icon-alert text-warning mb-3">
          <i class="fas fa-sign-out-alt fa-2x"></i>
        </div>
        <h5 class="fw-bold text-dark mb-2" style="font-size: 1.1rem">
          ចាកចេញពីប្រព័ន្ធ?
        </h5>
        <p class="text-muted mb-4 small" style="line-height: 1.5">
          តើអ្នកពិតជាចង់បញ្ចប់ការងារ និងចាកចេញពីគណនីបច្ចុប្បន្ននេះមែនទេ?
        </p>
        <div class="d-flex gap-2 w-100">
          <button
            class="btn btn-outline flex-fill"
            @click="isLogoutModalOpen = false"
          >
            បោះបង់
          </button>
          <button
            class="btn btn-danger flex-fill"
            style="margin-top: 0"
            @click="confirmSignOut"
          >
            ចាកចេញ
          </button>
        </div>
      </div>
    </BaseModal>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useToast } from "vue-toastification";
import {
  getProfile,
  updateProfile,
  updateAvatar,
  deleteAvatar,
} from "@/api/teacher.api";

import { logoutAPI } from "@/api/auth.api";
import BaseModal from "@/components/common/BaseModal.vue";
import { useAuthStore } from "@/stores/auth";
const toast = useToast();
const authStore = useAuthStore();

const currentTab = ref("general");
const isEditing = ref(false);
const loadingData = ref(false);
const updatingProfile = ref(false);
const loadingAvatar = ref(false);

const fileInput = ref(null);
const localUploadedUrl = ref("");

const isDeleteModalOpen = ref(false);
const isLogoutModalOpen = ref(false);

const profileData = reactive({
  userId: "",
  firstName: "",
  lastName: "",
  gender: "",
  email: "",
  phone: "",
  address: "",
  avatarUrl: "",
});

const toastConfig = {
  position: "bottom-right",
  timeout: 3000,
  closeOnClick: true,
  pauseOnHover: true,
};

const fetchUserProfile = async () => {
  if (loadingData.value) return;

  try {
    loadingData.value = true;
    const res = await getProfile();
    const responseData = res.data;

    if (responseData?.result === false) {
      toast.error(responseData?.msg || 'សូមចូលប្រើប្រាស់ប្រព័ន្ធជាមុនសិន!', toastConfig);
      return;
    }

    const user = responseData?.data || responseData;

    if (user) {
      profileData.userId = user.code || 'N/A';
      profileData.firstName = user.firstName || '';
      profileData.lastName = user.lastName || '';
      
      // FIX: Standardize value to uppercase to match template option keys
      profileData.gender = user.gender ? user.gender.toUpperCase() : '';
      
      profileData.email = user.email || '';
      profileData.phone = user.phone || '';
      profileData.address = user.address || '';
      profileData.role = user.role || user.user_role || user.roleName || '';

      if (localUploadedUrl.value) {
        profileData.avatarUrl = localUploadedUrl.value;
      } 
      else if (user.avatar && user.avatar !== 'default.png') {
        if (user.avatar.startsWith('http')) {
          profileData.avatarUrl = user.avatar;
        } else {
          const url = new URL(import.meta.env.VITE_BASE_URL);
          const serverOrigin = url.origin; 
          const cleanAvatarPath = user.avatar.startsWith('/') ? user.avatar.slice(1) : user.avatar;
          profileData.avatarUrl = `${serverOrigin}/${cleanAvatarPath}`;
        }
      } else {
        profileData.avatarUrl = `https://ui-avatars.com/api/?name=${profileData.firstName}+${profileData.lastName}&background=random`;
      }
    }
  } catch (err) {
    console.error("Fetch profile error:", err);
    toast.error('មិនអាចទាញយកទិន្នន័យប្រវត្តិរូបបានទេ!', toastConfig);
  } finally {
    loadingData.value = false;
  }
};

const cancelEditing = () => {
  isEditing.value = false;
  fetchUserProfile();
};

const handleImageError = () => {
  profileData.avatarUrl = `https://ui-avatars.com/api/?name=${profileData.firstName}+${profileData.lastName}&background=random`;
};

onMounted(() => {
  fetchUserProfile();
});

const handleSaveProfile = async () => {
  try {
    updatingProfile.value = true;

    const payload = {
      firstName: profileData.firstName.trim(),
      lastName: profileData.lastName.trim(),
      gender: profileData.gender || null,
      phone: profileData.phone ? profileData.phone.trim() : null,
      address: profileData.address ? profileData.address.trim() : null,
    };

    await updateProfile(payload);
    toast.success("រក្សាទុកព័ត៌មានផ្ទាល់ខ្លួនជោគជ័យ", toastConfig);

    isEditing.value = false;
    await fetchUserProfile();
    await authStore.fetchUserProfile(true);
  } catch (err) {
    console.error(err);
    toast.error("ការកែប្រែព័ត៌មានបានបរាជ័យ!", toastConfig);
  } finally {
    updatingProfile.value = false;
  }
};

const triggerFileInput = () => {
  if (fileInput.value) {
    fileInput.value.click();
  }
};

const handleAvatarUpload = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const previewUrl = URL.createObjectURL(file);
  localUploadedUrl.value = previewUrl;
  profileData.avatarUrl = previewUrl;

  const formData = new FormData();
  formData.append("avatar", file);

  try {
    loadingAvatar.value = true;
    await updateAvatar(formData);
    toast.success("ផ្លាស់ប្តូររូបភាពប្រវត្តិរូបជោគជ័យ", toastConfig);

    await fetchUserProfile();
    await authStore.fetchUserProfile(true);
  } catch (err) {
    console.error(err);
    toast.error("ការបង្ហោះរូបភាពបានបរាជ័យ!", toastConfig);
  } finally {
    loadingAvatar.value = false;
  }
};

const openDeleteModal = () => {
  isDeleteModalOpen.value = true;
};

const confirmDeleteAvatar = async () => {
  isDeleteModalOpen.value = false;
  try {
    loadingAvatar.value = true;
    await deleteAvatar();
    localUploadedUrl.value = "";
    toast.success("លុបរូបភាពប្រវត្តិរូបជោគជ័យ", toastConfig);

    await fetchUserProfile();
    await authStore.fetchUserProfile(true);
  } catch (err) {
    console.error(err);
    toast.error("ការលុបរូបភាពបានបរាជ័យ!", toastConfig);
  } finally {
    loadingAvatar.value = false;
  }
};

const openLogoutModal = () => {
  isLogoutModalOpen.value = true;
};

const confirmSignOut = async () => {
  isLogoutModalOpen.value = false;
  try {
    await logoutAPI();
  } catch (err) {
    console.error("Logout API Error:", err);
  } finally {
    localStorage.clear();
    toast.success("ចាកចេញពីប្រព័ន្ធបានជោគជ័យ!", toastConfig);
    setTimeout(() => {
      window.location.href = "/login";
    }, 1500);
  }
};
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
  max-width: 1140px;
  margin: 0;
  padding: 24px;
  display: grid;
  grid-template-columns: 290px 810px;
  gap: 24px;
  align-items: start;
}

.left-card {
  background: var(--card);
  border-radius: 18px;
  box-shadow: var(--shadow);
  min-height: 580px;
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

.role-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: linear-gradient(135deg, #39c97c, #2eb583);
  color: white;
  font-size: 0.72rem;
  font-weight: 600;
  text-transform: uppercase;
  padding: 0.32rem 0.85rem;
  border-radius: 50px;
  box-shadow: 0 3px 10px rgba(5, 150, 105, 0.3);
}

.avatar-wrapper img {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #cbf8de;
  display: block;
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

.btn-upload i {
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

.btn-delete-avatar i {
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

.action-buttons {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
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

.btn i {
  width: 16px;
  height: 16px;
  flex: 0 0 auto;
}

.btn-outline:hover {
  background: #f7fafc;
}

.btn-green {
  background-color: #f0fff4 !important;
  border: 1px solid #c6f6d5 !important;
  color: #38a169 !important;
}

.btn-green:hover {
  background-color: #e6fffa !important;
}

.btn-outline {
  background-color: #faf5ff !important;
  border: 1px solid #e9d8fd !important;
  color: #6b46c1 !important;
}

.btn-purple:hover {
  background-color: #f3e8ff !important;
}

.btn-danger {
  background-color: #ffffff !important;
  border: 1px solid #e53e3e !important;
  color: #e53e3e !important;
  margin-top: 8px;
}

.btn-danger:hover {
  background-color: #fff5f5 !important;
}

.right-card {
  background: var(--card);
  border-radius: 18px;
  box-shadow: var(--shadow);
  min-height: 580px;
  padding: 28px 30px 32px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.right-card h2 {
  font-family: "Kantumruy Pro", "Noto Sans Khmer", sans-serif;
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1.35;
  margin-bottom: 20px;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-top: 20px;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.info-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: #4a5568;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 14px;
  color: #38a169;
  font-size: 0.9rem;
  pointer-events: none;
  z-index: 2;
}

.info-input {
  width: 100%;
  padding: 12px 16px 12px 42px;
  border-radius: 10px;
  border: 1px solid #e2e8f0;
  background-color: #ecfdf5;
  color: #1a202c;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  outline: none;
}

/* FIX: Refined styling setup for native dropdown alignment issues */
.selector-custom {
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2338a169' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 14px center;
  background-size: 16px;
  cursor: pointer;
  line-height: normal;
  vertical-align: middle;
  padding-top: 0;
  padding-bottom: 0;
  height: 48px;
}

.info-input:disabled {
  background-color: #ecfdf5;
  color: #1a202c;
  cursor: not-allowed;
  opacity: 1;
}

.info-input:focus:not(:disabled) {
  border-color: #38a169;
  box-shadow: 0 0 0 3px rgba(56, 161, 105, 0.15);
}

@media (max-width: 600px) {
  .info-grid {
    grid-template-columns: 1fr;
  }
}

@media (min-width: 1280px) {
  .layout {
    grid-template-columns: 290px 810px;
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

.profile-form {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.profile-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.profile-field label {
  font-family: "Kantumruy Pro", "Noto Sans Khmer", sans-serif;
  font-size: 0.86rem;
  font-weight: 600;
  color: #6f7788;
}

.profile-field input {
  width: 100%;
  height: 42px;
  border: 1px solid #e1e7f0;
  border-radius: 10px;
  padding: 0 14px;
  color: #1f2937;
  background: #ffffff;
  outline: none;
}

.fade-in-panel {
  animation: fadeIn 0.22s ease-out;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(3px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>