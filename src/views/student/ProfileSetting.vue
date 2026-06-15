<template>
  <div class="layout" v-if="authStore.profile">
    <div class="left-card">
      <div class="avatar-wrapper">
        <img :src="`${imgBaseUrl}${authStore.profile.avatar}?t=${imageRefresh}`" alt="Profile photo"
          class="avatar-image" />
        <input ref="avatarInput" type="file" accept="image/*" hidden @change="uploadAvatar" />

        <button class="btn-upload" title="Upload photo" @click="avatarInput.click()">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
            stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 12V4m0 0L8 8m4-4l4 4" />
          </svg>
        </button>

        <button class="btn-delete-avatar" title="Delete photo" :disabled="avatarDeleting || !authStore.profile.avatar"
          @click="deleteAvatar">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
            stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" />
          </svg>
        </button>
      </div>

      <div class="user-name">
        {{ authStore.profile.firstName }} {{ authStore.profile.lastName }}
      </div>
      <div class="user-email">{{ authStore.profile.email }}</div>
      <div class="badge">{{ authStore.profile.role }}</div>

      <div class="action-buttons">
        <button class="btn btn-green" @click="openEditModal">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
            stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          កែប្រែព័ត៌មាន
        </button>

        <button class="btn btn-purple" @click="openPasswordModal">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
            stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          ផ្លាស់ប្តូរលេខសម្ងាត់
        </button>

        <button class="btn btn-danger" @click="openDeleteAccountModal">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
            stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" />
          </svg>
          លុបគណនី
        </button>
      </div>
    </div>

    <div class="right-card">
      <h2>ព័ត៌មានរបស់ខ្ញុំ</h2>

      <div class="info-grid">
        <div class="info-item">
          <div class="info-label">
            <svg class="icon-green" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
              stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            នាមត្រកូល
          </div>
          <div class="info-value">{{ authStore.profile.firstName }}</div>
        </div>

        <div class="info-item">
          <div class="info-label">
            <svg class="icon-green" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
              stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            នាមខ្លួន
          </div>
          <div class="info-value">{{ authStore.profile.lastName }}</div>
        </div>

        <div class="info-item">
          <div class="info-label">
            <svg class="icon-green" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
              stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            អាសយដ្ឋាន
          </div>
          <div class="info-value">{{ authStore.profile.address }}</div>
        </div>

        <div class="info-item">
          <div class="info-label">
            <svg class="icon-green" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
              stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498A1 1 0 0121 15.72V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            លេខទូរស័ព្ទ
          </div>
          <div class="info-value">{{ authStore.profile.phone }}</div>
        </div>

        <div class="info-item">
          <div class="info-label">
            <svg class="icon-green" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
              stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            ស្ថានភាពគណនី
          </div>
          <span class="status-badge">សកម្ម</span>
        </div>
      </div>
    </div>

    <!-- modal for edit profile -->
    <BaseModal :is-open="isEditModalOpen" title="កែប្រែព័ត៌មាន" width="500px" @close="closeEditModal">
      <div class="profile-form">
        <div class="profile-field">
          <label>នាមខ្លួន</label>
          <input v-model="editForm.firstName" type="text" />
        </div>

        <div class="profile-field">
          <label>នាមត្រកូល</label>
          <input v-model="editForm.lastName" type="text" />
        </div>

        <div class="profile-field">
          <label>លេខទូរស័ព្ទ</label>
          <input v-model="editForm.phone" type="text" />
        </div>

        <div class="profile-field">
          <label>អាសយដ្ឋាន</label>
          <input v-model="editForm.address" type="text" />
        </div>
      </div>

      <template #footer>
        <button class="btn btn-outline" @click="closeEditModal">បោះបង់</button>

        <button class="btn btn-green" @click="handleUpdateProfile">
          រក្សាទុក
        </button>
      </template>
    </BaseModal>

    <!-- modal for change password -->
    <BaseModal :is-open="isPasswordModalOpen" title="ផ្លាស់ប្តូរលេខសម្ងាត់" width="500px" @close="closePasswordModal">
      <div class="profile-field">
        <label>លេខសម្ងាត់ចាស់</label>

        <div class="password-input">
          <input v-model="passwordForm.oldPassword" :type="showPassword.oldPassword ? 'text' : 'password'"
            :class="{ 'input-error': oldPasswordError }" @input="oldPasswordError = ''" />

          <button type="button" class="password-eye" @click="togglePassword('oldPassword')">
            <i :class="showPassword.oldPassword ? 'bi bi-eye-slash' : 'bi bi-eye'
              "></i>
          </button>
        </div>

        <p v-if="oldPasswordError" class="field-error-text">
          {{ oldPasswordError }}
        </p>
      </div>

      <div class="profile-field">
        <label>លេខសម្ងាត់ថ្មី</label>

        <div class="password-input">
          <input v-model="passwordForm.newPassword" :type="showPassword.newPassword ? 'text' : 'password'"
            :class="{ 'input-error': newPasswordError }" @input="newPasswordError = ''" />

          <button type="button" class="password-eye" @click="togglePassword('newPassword')">
            <i :class="showPassword.newPassword ? 'bi bi-eye-slash' : 'bi bi-eye'
              "></i>
          </button>
        </div>

        <p v-if="newPasswordError" class="field-error-text">
          {{ newPasswordError }}
        </p>
      </div>

      <div class="profile-field">
        <label>បញ្ជាក់លេខសម្ងាត់ថ្មី</label>

        <div class="password-input">
          <input v-model="passwordForm.confirmPassword" :type="showPassword.confirmPassword ? 'text' : 'password'"
            :class="{ 'input-error': confirmPasswordError }" @input="confirmPasswordError = ''" />

          <button type="button" class="password-eye" @click="togglePassword('confirmPassword')">
            <i :class="showPassword.confirmPassword ? 'bi bi-eye-slash' : 'bi bi-eye'
              "></i>
          </button>
        </div>

        <p v-if="confirmPasswordError" class="field-error-text">
          {{ confirmPasswordError }}
        </p>
      </div>

      <template #footer>
        <button class="btn btn-outline" @click="closePasswordModal">
          បោះបង់
        </button>

        <button class="btn btn-green" :disabled="passwordLoading" @click="handleChangePassword">
          {{ passwordLoading ? "កំពុងរក្សាទុក..." : "រក្សាទុក" }}
        </button>
      </template>
    </BaseModal>

    <!-- Delete account modal -->
    <BaseModal :is-open="isDeleteAccountModalOpen" title="លុបគណនី" width="500px" @close="closeDeleteAccountModal">
      <div class="profile-field">
        <label>លេខសម្ងាត់</label>

        <div class="password-input">
          <input v-model="deleteAccountForm.password" :type="showDeleteAccountPassword ? 'text' : 'password'"
            :class="{ 'input-error': deleteAccountError }" @input="deleteAccountError = ''" />

          <button type="button" class="password-eye" @click="showDeleteAccountPassword = !showDeleteAccountPassword">
            <i :class="showDeleteAccountPassword ? 'bi bi-eye-slash' : 'bi bi-eye'
              "></i>
          </button>
        </div>
      </div>
      <p v-if="deleteAccountError" class="form-error mt-2">
        {{ deleteAccountError }}
      </p>
      <template #footer>
        <button class="btn btn-outline" @click="closeDeleteAccountModal">
          បោះបង់
        </button>

        <button class="btn btn-green" :disabled="deleteAccountLoading" @click="handleDeleteAccount">
          {{ deleteAccountLoading ? "កំពុងលុប..." : "លុបគណនី" }}
        </button>
      </template>
    </BaseModal>
  </div>
  <div class="toast-wrap">
    <div class="toast-msg" :class="{ 'show': toast.show }">
      <i :class="toast.icon"></i>
      <span>{{ toast.message }}</span>
    </div>
  </div>
</template>
<script setup>
import { useAuthStore } from "@/stores/authStore";
import { useFormValidation } from "@/composables/useFormValidation";
import { onMounted, ref, computed, reactive } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const authStore = useAuthStore();

const imgBaseUrl = import.meta.env.VITE_BASE_URL_FOR_IMAGE;

const avatarInput = ref(null);
const isEditModalOpen = ref(false);

const toast = reactive({
  show: false,
  message: '',
  icon: ''
});

const triggerToast = (msg, iconClass) => {
  toast.message = msg;
  toast.icon = iconClass;
  toast.show = true;
  setTimeout(() => {
    toast.show = false;
  }, 3000);
}

const isPasswordModalOpen = ref(false);
const passwordLoading = ref(false);
const passwordError = ref("");
const passwordSuccess = ref("");

const imageRefresh = ref(Date.now());

const oldPasswordError = ref("");
const newPasswordError = ref("");
const confirmPasswordError = ref("");

const avatarDeleting = ref(false);
const isDeleteAccountModalOpen = ref(false);
const deleteAccountLoading = ref(false);
const deleteAccountError = ref("");
const showDeleteAccountPassword = ref(false);

const deleteAccountForm = ref({
  password: "",
});
const { errors: validationErrors, validatePassword } = useFormValidation();


const showPassword = ref({
  oldPassword: false,
  newPassword: false,
  confirmPassword: false,
});

const togglePassword = (field) => {
  showPassword.value[field] = !showPassword.value[field];
};

const passwordForm = ref({
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
});

const openPasswordModal = () => {
  passwordForm.value = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };
  passwordError.value = "";
  isPasswordModalOpen.value = true;
  passwordSuccess.value = "";
};

const closePasswordModal = () => {
  isPasswordModalOpen.value = false;
};

const handleChangePassword = async () => {
  passwordError.value = "";
  oldPasswordError.value = "";
  newPasswordError.value = "";
  confirmPasswordError.value = "";

  if (!passwordForm.value.oldPassword) {
    oldPasswordError.value = "សូមបញ្ចូលលេខសម្ងាត់ចាស់!";
  }

  if (!passwordForm.value.newPassword) {
    newPasswordError.value = "សូមបញ្ចូលលេខសម្ងាត់ថ្មី!";
  }

  if (!passwordForm.value.confirmPassword) {
    confirmPasswordError.value = "សូមបញ្ជាក់លេខសម្ងាត់ថ្មី!";
  }

  if (
    oldPasswordError.value ||
    newPasswordError.value ||
    confirmPasswordError.value
  ) {
    return;
  }

  validatePassword(passwordForm.value.newPassword);

  if (validationErrors.value.password) {
    newPasswordError.value = validationErrors.value.password;
    return;
  }

  if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
    confirmPasswordError.value = "លេខសម្ងាត់ថ្មី និងការបញ្ជាក់មិនដូចគ្នា!";
    return;
  }

  try {
    passwordLoading.value = true;

    await authStore.changePassword(
      passwordForm.value.oldPassword,
      passwordForm.value.newPassword,
    );

    closePasswordModal();
  } catch (err) {
    oldPasswordError.value = "លេខសម្ងាត់ចាស់មិនត្រឹមត្រូវ!";
  } finally {
    passwordLoading.value = false;
  }
};
// ===================== Upload Avatar ======================
const uploadAvatar = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  if (file.size > 2 * 1024 * 1024) {
    triggerToast('ទំហំរូបភាពត្រូវតែតូចជាង 2MB', 'fa-solid fa-circle-xmark');
    return;
  }

  try {
    triggerToast('កំពុងផ្ទុកឡើងរូបភាព...', 'fa-solid fa-spinner fa-spin');

    if (authStore.error) authStore.error = null;

    await authStore.uploadAvatar(file);

    if (typeof authStore.fetchProfile === 'function') {
      await authStore.fetchProfile();
    }

    imageRefresh.value = Date.now();

    triggerToast('ផ្លាស់ប្តូររូបភាពប្រវត្តិរូបជោគជ័យ!', 'fa-solid fa-circle-check');

  } catch (err) {
    console.error("Student upload error:", err);
    const errorMsg = err.response?.data?.msg || 'មិនអាចផ្ទុកឡើងរូបភាពបានទេ';
    triggerToast(errorMsg, 'fa-solid fa-circle-xmark');
  } finally {
    event.target.value = '';
  }
};

// ===================== Delete Avatar ======================
const deleteAvatar = async () => {
  if (!authStore.profile?.avatar) return;

  try {
    avatarDeleting.value = true;

    await authStore.deleteAvatar();

    imageRefresh.value = Date.now();

    if (avatarInput.value) {
      avatarInput.value.value = "";
    }
  } catch (err) {
    console.log("Delete avatar error status:", err.response?.status);
    console.log("Delete avatar error data:", err.response?.data);
    console.log("Delete avatar error message:", err.message);
  } finally {
    avatarDeleting.value = false;
  }
};

// ===================== Update Profile ======================
const editForm = ref({
  firstName: "",
  lastName: "",
  phone: "",
  address: "",
});

const showValue = (value) => {
  return value === null || value === undefined ? "null" : value;
};

const saveValue = (value) => {
  return value === "null" || value === "" ? null : value;
};

const openEditModal = () => {
  const profile = authStore.profile;

  editForm.value = {
    firstName: showValue(profile?.firstName),
    lastName: showValue(profile?.lastName),
    phone: showValue(profile?.phone),
    address: showValue(profile?.address),
  };

  isEditModalOpen.value = true;
};

const closeEditModal = () => {
  isEditModalOpen.value = false;
};

const handleUpdateProfile = async () => {
  try {
    await authStore.updateProfile({
      firstName: saveValue(editForm.value.firstName),
      lastName: saveValue(editForm.value.lastName),
      phone: saveValue(editForm.value.phone),
      address: saveValue(editForm.value.address),
    });

    closeEditModal();
  } catch (err) {
    console.error("Update profile failed:", err);
  }
};

// ===================== Delete Account ======================
const openDeleteAccountModal = () => {
  deleteAccountForm.value.password = "";
  deleteAccountError.value = "";
  showDeleteAccountPassword.value = false;
  isDeleteAccountModalOpen.value = true;
};

const closeDeleteAccountModal = () => {
  if (deleteAccountLoading.value) return;
  isDeleteAccountModalOpen.value = false;
};

const handleDeleteAccount = async () => {
  deleteAccountError.value = "";

  if (!deleteAccountForm.value.password) {
    deleteAccountError.value = "សូមបញ្ចូលលេខសម្ងាត់!";
    return;
  }

  try {
    deleteAccountLoading.value = true;

    await authStore.deleteAccount(deleteAccountForm.value.password);

    sessionStorage.removeItem("user_token");
    sessionStorage.removeItem("user_role");

    router.replace("/login");
  } catch (err) {
    deleteAccountError.value =
      authStore.error || err.message || "លេខសម្ងាត់មិនត្រឹមត្រូវ!";
  } finally {
    deleteAccountLoading.value = false;
  }
};

onMounted(async () => {
  await authStore.fetchProfile();
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
  max-width: 1140px;
  /* 🎯 Fix ទំហំទទឹងសរុបត្រឹម ១១៤០px (ទំហំស្តង់ដារពេញអេក្រង់ធំល្មម) */
  margin: 0;
  /* ផ្អែកនៅកៀកខាងឆ្វេងជាប់ Sidebar ដដែល */
  padding: 24px;

  display: grid;
  grid-template-columns: 290px 810px;
  /* 🎯 Fix ទំហំ Card ឆ្វេង ២៩០px និង Card ស្តាំ ៨១០px ជាប់ត្រឹមហ្នឹងតែម្តង */
  gap: 24px;
  /* គម្លាតចន្លោះ Card ទាំងពីរ */

  align-items: start;
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

.profile-field input.input-error {
  border-color: #e53e3e;
  box-shadow: 0 0 0 3px rgba(229, 62, 62, 0.12);
}

.modal-errors {
  display: grid;
  gap: 6px;
  margin-bottom: 12px;
}

.form-error {
  color: #e53e3e;
  font-size: 0.9rem;
  font-weight: 600;
  margin: 0;
}

.field-error-text {
  color: #e53e3e !important;
  font-size: 0.85rem;
  font-weight: 600;
  margin-top: 4px;
}

.password-input {
  position: relative;
}

.password-input input {
  padding-right: 46px;
}

.password-eye {
  position: absolute;
  top: 50%;
  right: 12px;
  transform: translateY(-50%);
  border: none;
  background: transparent;
  color: #6b7280;
  font-size: 1.1rem;
  cursor: pointer;
}

.password-eye:hover {
  color: #1f2937;
}

.left-card {
  background: var(--card);
  border-radius: 18px;
  box-shadow: var(--shadow);
  min-height: 560px;
  padding: 28px 24px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

/* RIGHT CARD */
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

.avatar-wrapper {
  position: relative;
  margin-bottom: 16px;
}

.avatar-wrapper img {
  width: 96px;
  height: 96px;
  border-radius: 50%;
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
  border: 1.5px solid var(--red);
  margin-top: 8px;
  color: var(--red);
}

/* RIGHT CARD */


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
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.info-item {
  min-height: 82px;
  background: #fbfcfe;
  border: 1px solid #e1e7f0;
  border-radius: 14px;
  padding: 14px 18px;
  transition:
    box-shadow 0.2s,
    border-color 0.2s;
}

.info-item:hover {
  box-shadow: var(--shadow);
  border-color: #d6e0ec;
}

.info-label {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: "Kantumruy Pro", "Noto Sans Khmer", sans-serif;
  font-size: 0.9rem;
  font-weight: 700;
  color: #6f7788;
  line-height: 1.5;
  margin-bottom: 8px;
}

.info-label svg {
  width: 30px;
  height: 30px;
  padding: 7px;
  flex: 0 0 auto;
  border-radius: 9px;
  background: #eef7ef;
}

.icon-green {
  color: var(--green);
}

.icon-blue {
  color: var(--blue);
}

.info-value {
  font-family: "Kantumruy Pro", "Noto Sans Khmer", sans-serif;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.55;
  color: #4b5563;
  overflow-wrap: anywhere;
}

.status-badge {
  display: inline-block;
  background: var(--green-light);
  color: var(--green);
  border: 1px solid var(--green-border);
  border-radius: 20px;
  padding: 3px 14px;
  font-family: "Kantumruy Pro", "Noto Sans Khmer", sans-serif;
  font-size: 0.82rem;
  font-weight: 600;
  line-height: 1.45;
}

@media (min-width: 1280px) {
  .layout {
    /* 🎯 បង្ខំឱ្យ Fix ទំហំដដែល ទោះជាអេក្រង់រីកធំប៉ុនណាក៏ដោយ */
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

/* Modal */
:deep(.glass-box) {
  border-radius: 14px;
  background: #ffffff;
}

:deep(.glass-header) {
  padding: 18px 22px;
  background: #5f8173;
  align-items: center;
}

:deep(.glass-header h3) {
  margin: 0;
  font-family: "Kantumruy Pro", "Noto Sans Khmer", sans-serif;
  font-size: 1.35rem;
  font-weight: 700;
  line-height: 1.35;
}

:deep(.glass-close) {
  width: 34px;
  height: 34px;
  border-radius: 10px;
}

:deep(.glass-body) {
  padding: 22px 24px 20px;
}

:deep(.glass-footer) {
  padding: 14px 24px;
  background: #f8faf9;
  border-top: 1px solid #e8eee9;
  align-items: center;
}

:deep(.glass-footer) .btn {
  width: auto;
  min-width: 88px;
  min-height: 38px;
  padding: 8px 18px;
  border-radius: 8px;
  font-size: 0.88rem;
}

:deep(.glass-footer) .btn-outline {
  border-color: transparent;
  background: transparent;
  color: #4b5563;
}

:deep(.glass-footer) .btn-green {
  border-color: transparent;
  background: #8dad95;
  color: #ffffff;
  box-shadow: 0 6px 14px rgba(95, 129, 115, 0.2);
}

.profile-form {
  display: grid;
  gap: 14px;
}

.profile-field {
  display: grid;
  gap: 7px;
}

.profile-field label {
  font-family: "Kantumruy Pro", "Noto Sans Khmer", sans-serif;
  font-size: 0.86rem;
  font-weight: 600;
  color: #6f7788;
  line-height: 1.4;
}

.profile-field input,
.profile-field select {
  width: 100%;
  height: 42px;
  border: 1px solid #e1e7f0;
  border-radius: 10px;
  padding: 0 14px;
  font-family: "Kantumruy Pro", "Noto Sans Khmer", sans-serif;
  font-size: 0.95rem;
  color: #1f2937;
  background: #ffffff;
  outline: none;
}

.profile-field input:focus,
.profile-field select:focus {
  border-color: #86b293;
  box-shadow: 0 0 0 3px rgba(134, 178, 147, 0.18);
}

:deep(.glass-footer) {
  padding: 22px 30px;
  background: #f8faf9;
  border-top: 1px solid #edf1ee;
}

:deep(.glass-footer) .btn {
  width: 100%;
  min-height: 66px;
  border-radius: 14px;
  font-family: "Kantumruy Pro", "Noto Sans Khmer", sans-serif;
  font-size: 1rem;
  font-weight: 800;
  line-height: 1.4;
  box-shadow: none;
}

:deep(.glass-footer) .btn-outline {
  background: #ffffff;
  color: #1f2a37;
  border: 2px solid #1f2937;
}

:deep(.glass-footer) .btn-outline:hover {
  background: #f9fafb;
  border-color: #111827;
}

:deep(.glass-footer) .btn-green {
  background: #ecf8f0;
  color: #20352a;
  border: 2px solid transparent;
}

:deep(.glass-footer) .btn-green:hover {
  background: #dff3e7;
}

:deep(.glass-footer) .btn-green:disabled {
  cursor: not-allowed;
  opacity: 0.65;
}
</style>
