<template>
  <div class="layout" v-if="authStore.profile">
    <div class="left-card">
      <div class="avatar-wrapper">
        <img :src="authStore.profile?.avatar &&
          authStore.profile?.avatar !== 'default.png'
          ? `${imgBaseUrl}${authStore.profile.avatar}?t=${imageRefresh}`
          : defaultImage
          " alt="Profile photo" class="avatar-image" />
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
      <div class="role-badge">
        <i class="bi bi-mortarboard"></i>{{ authStore.profile.role }}
      </div>

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
      <h2 class="section-title">ព័ត៌មានរបស់ខ្ញុំ</h2>
      <div class="info-grid">
        <div class="info-item">
          <label class="info-label">នាមត្រកូល</label>
          <div class="input-wrapper">
            <i class="fa-solid fa-user field-icon input-icon"></i>
            <input type="text" :value="authStore.profile.firstName || 'មិនទាន់បំពេញ'" disabled class="info-input"
              :class="{ empty: !authStore.profile.firstName }" />
          </div>
        </div>

        <div class="info-item">
          <label class="info-label">នាមខ្លួន</label>
          <div class="input-wrapper">
            <i class="fa-solid fa-user-tag field-icon input-icon"></i>
            <input type="text" :value="authStore.profile.lastName || 'មិនទាន់បំពេញ'" disabled class="info-input"
              :class="{ empty: !authStore.profile.lastName }" />
          </div>
        </div>
        <div class="info-item">
          <label class="info-label">ភេទ</label>
          <div class="input-wrapper">
            <i class="fa-solid fa-venus-mars field-icon input-icon"></i>

            <input type="text" :value="formattedGender" disabled class="info-input"
              :class="{ empty: !authStore.profile.gender }" />
          </div>
        </div>

        <div class="info-item">
          <label class="info-label">អាសយដ្ឋានអ៊ីមែល</label>
          <div class="input-wrapper">
            <i class="fa-solid fa-envelope field-icon input-icon"></i>
            <input type="text" :value="authStore.profile.email || 'មិនទាន់បំពេញ'" disabled class="info-input"
              :class="{ empty: !authStore.profile.email }" />
          </div>
        </div>

        <div class="info-item">
          <label class="info-label">លេខទូរស័ព្ទ</label>
          <div class="input-wrapper">
            <i class="fa-solid fa-phone field-icon input-icon"></i>
            <input type="text" :value="authStore.profile.phone || 'មិនទាន់បំពេញ'" disabled class="info-input"
              :class="{ empty: !authStore.profile.phone }" />
          </div>
        </div>

        <div class="info-item">
          <label class="info-label">ថ្នាក់ឆ្នាំសិក្សា</label>
          <div class="input-wrapper">
            <i class="fa-solid fa-graduation-cap input-icon"></i>
            <input type="text" :value="authStore.profile.gradeLevel || 'មិនទាន់បំពេញ'" disabled class="info-input"
              :class="{ empty: !authStore.profile.gradeLevel }" />
          </div>
        </div>

        <div class="info-item">
          <label class="info-label">ជំនាញ</label>
          <div class="input-wrapper">
            <i class="fa-solid fa-book input-icon"></i>
            <input type="text" :value="authStore.profile.major || 'មិនទាន់បំពេញ'" disabled class="info-input"
              :class="{ empty: !authStore.profile.major }" />
          </div>
        </div>

        <div class="info-item">
          <label class="info-label">អាសយដ្ឋាន</label>
          <div class="input-wrapper">
            <i class="fa-solid fa-location-dot field-icon input-icon"></i>
            <input type="text" :value="authStore.profile.address || 'មិនទាន់បំពេញ'" disabled class="info-input"
              :class="{ empty: !authStore.profile.address }" />
          </div>
        </div>

        <div class="info-item">
          <label class="info-label">លេខគណនី</label>
          <div class="input-wrapper">
            <i class="fa-solid fa-id-badge field-icon input-icon"></i>
            <input type="text" :value="authStore.profile.code || 'មិនទាន់បំពេញ'" disabled class="info-input"
              :class="{ empty: !authStore.profile.code }" />
          </div>
        </div>
      </div>
    </div>

    <!-- modal for edit profile -->
    <BaseModal :is-open="isEditModalOpen" title="កែប្រែព័ត៌មាន" width="500px" @close="closeEditModal">
      <div class="profile-form">
        <div class="profile-field">
          <label>នាមខ្លួន</label>
          <input v-model="editForm.firstName" type="text" />
          <span v-if="errors.firstName" class="error-text">{{
            errors.firstName
          }}</span>
        </div>

        <div class="profile-field">
          <label>នាមត្រកូល</label>
          <input v-model="editForm.lastName" type="text" />
          <span v-if="errors.lastName" class="error-text">{{
            errors.lastName
          }}</span>
        </div>
        <div class="profile-field">
          <label>ភេទ</label>
          <input v-model="editForm.gender" type="text" placeholder="មិនទាន់បំពេញ"/>
          <span v-if="errors.gender" class="error-text">{{
            errors.gender
          }}</span>
        </div>
        <div class="profile-field">
          <label>ឆ្នាំសិក្សា</label>
          <input v-model="editForm.gradeLevel" placeholder="មិនទាន់បំពេញ" type="text" />
          <span v-if="errors.gradeLevel" class="error-text">{{
            errors.gradeLevel
          }}</span>
        </div>
        <div class="profile-field">
          <label>ជំនាញ</label>
          <input v-model="editForm.major" placeholder="មិនទាន់បំពេញ" type="text" />
          <span v-if="errors.major" class="error-text">{{ errors.major }}</span>
        </div>
        <div class="profile-field">
          <label>លេខទូរស័ព្ទ</label>
          <input v-model="editForm.phone" placeholder="មិនទាន់បំពេញ" type="text" />
          <span v-if="errors.phone" class="error-text">{{ errors.phone }}</span>
        </div>

        <div class="profile-field">
          <label>អាសយដ្ឋាន</label>
          <input v-model="editForm.address" placeholder="មិនទាន់បំពេញ" type="text" />
          <span v-if="errors.address" class="error-text">{{
            errors.address
          }}</span>
        </div>
      </div>

      <template #footer>
        <button class="btn btn-outline" @click="closeEditModal">បោះបង់</button>

        <button class="btn btn-green" @click="handleUpdateProfile" :disabled="isSaveDisabled">
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

    <ToastNotification />
  </div>
</template>
<script setup>
import { useAuthStore } from "@/stores/authStore";
import { useFormValidation } from "@/composables/useFormValidation";
import { onMounted, ref, computed, watch } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "@/composables/useToast";
import ToastNotification from "@/components/common/ToastNotification.vue";
import defaultImage from "../../assets/images/default.png";

const router = useRouter();
const authStore = useAuthStore();
const { triggerToast } = useToast();

const {
  errors,
  validateFirstName,
  validateLastName,
  validatePhone,
  validateAddress,
  validateGradeLevel,
  validateMajor,
  validatePassword,
  validateGender
} = useFormValidation();

const imgBaseUrl = import.meta.env.VITE_BASE_URL_FOR_IMAGE;
const avatarInput = ref(null);
const imageRefresh = ref(Date.now());

const isEditModalOpen = ref(false);
const isPasswordModalOpen = ref(false);
const isDeleteAccountModalOpen = ref(false);

const passwordLoading = ref(false);
const avatarDeleting = ref(false);
const deleteAccountLoading = ref(false);

const passwordError = ref("");
const passwordSuccess = ref("");

const oldPasswordError = ref("");
const newPasswordError = ref("");
const confirmPasswordError = ref("");

const editForm = ref({
  firstName: "",
  lastName: "",
  phone: "",
  address: "",
  gradeLevel: "",
  major: "",
  gender: "",
});
const originalProfile = ref({});

const passwordForm = ref({ oldPassword: "", newPassword: "", confirmPassword: "" });
const deleteAccountForm = ref({ password: "" });
const deleteAccountError = ref("");
const showDeleteAccountPassword = ref(false);


const showPassword = ref({ oldPassword: false, newPassword: false, confirmPassword: false });


const showValue = (val) => (val === null || val === undefined || val === "null" ? "" : val);
const saveValue = (val) => (val?.trim() === "" ? null : val);
const togglePassword = (field) => (showPassword.value[field] = !showPassword.value[field]);


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

const formattedGender = computed(() => {
  const g = authStore.profile.gender?.toLowerCase();
  if (!g) return 'មិនទាន់បំពេញ';
  
  return g === 'female' ? 'ស្រី' : (g === 'male' ? 'ប្រុស' : g);
});

//Change Password
const handleChangePassword = async () => {
  oldPasswordError.value = "";
  newPasswordError.value = "";
  confirmPasswordError.value = "";

  validatePassword(passwordForm.value.newPassword);

  if (errors.value.password) {
    newPasswordError.value = errors.value.password;
  }

  if (!passwordForm.value.oldPassword)
    oldPasswordError.value = "សូមបញ្ចូលលេខសម្ងាត់ចាស់!";
  if (!passwordForm.value.newPassword)
    newPasswordError.value = "សូមបញ្ចូលលេខសម្ងាត់ថ្មី!";
  if (!passwordForm.value.confirmPassword)
    confirmPasswordError.value = "សូមបញ្ជាក់លេខសម្ងាត់ថ្មី!";

  if (
    oldPasswordError.value ||
    newPasswordError.value ||
    confirmPasswordError.value
  ) {
    triggerToast(
      "សូមបំពេញព័ត៌មានឱ្យបានត្រឹមត្រូវ!",
      "fa-solid fa-triangle-exclamation",
    );
    return;
  }


  if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
    confirmPasswordError.value = "លេខសម្ងាត់ថ្មី និងការបញ្ជាក់មិនដូចគ្នា!";
    triggerToast("លេខសម្ងាត់មិនដូចគ្នាទេ!", "fa-solid fa-circle-xmark");
    return;
  }

  try {
    passwordLoading.value = true;
    triggerToast(
      "កំពុងផ្លាស់ប្តូរលេខសម្ងាត់...",
      "fa-solid fa-spinner fa-spin",
    );

    await authStore.changePassword(
      passwordForm.value.oldPassword,
      passwordForm.value.newPassword,
    );

    triggerToast("ផ្លាស់ប្តូរលេខសម្ងាត់ជោគជ័យ!", "fa-solid fa-circle-check");
    closePasswordModal();
  } catch (err) {
    oldPasswordError.value = "លេខសម្ងាត់ចាស់មិនត្រឹមត្រូវ!";
    triggerToast("លេខសម្ងាត់ចាស់មិនត្រឹមត្រូវ!", "fa-solid fa-circle-xmark");
  } finally {
    passwordLoading.value = false;
  }
};

//Upload Picture
const uploadAvatar = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  if (file.size > 2 * 1024 * 1024) {
    triggerToast("ទំហំរូបភាពត្រូវតែតូចជាង 2MB", "fa-solid fa-circle-xmark");
    event.target.value = "";
    return;
  }

  try {
    triggerToast("កំពុងផ្ទុកឡើងរូបភាព...", "fa-solid fa-spinner fa-spin");

    if (authStore.error) authStore.error = null;

    await authStore.uploadAvatar(file);

    if (typeof authStore.fetchProfile === "function") {
      await authStore.fetchProfile();
    }

    imageRefresh.value = Date.now();

    triggerToast(
      "ផ្លាស់ប្តូររូបភាពប្រវត្តិរូបជោគជ័យ!",
      "fa-solid fa-circle-check",
      500,
    );
  } catch (err) {
    const errorMsg = err.response?.data?.msg || "មិនអាចផ្ទុកឡើងរូបភាពបានទេ";
    triggerToast(errorMsg, "fa-solid fa-circle-xmark");
  } finally {
    event.target.value = "";
  }
};

//Delete avatar
const deleteAvatar = async () => {
  const avatar = authStore.profile?.avatar;
  if (!avatar || avatar.includes("default")) {
    triggerToast(
      "មិនមានរូបភាពសម្រាប់លុបទេ!",
      "fa-solid fa-triangle-exclamation",
    );
    return;
  }

  try {
    avatarDeleting.value = true;
    triggerToast("កំពុងលុបរូបភាព...", "fa-solid fa-spinner fa-spin");

    await authStore.deleteAvatar();

    if (typeof authStore.fetchProfile === "function") {
      await authStore.fetchProfile();
    }

    imageRefresh.value = Date.now();

    if (avatarInput.value) {
      avatarInput.value.value = "";
    }

    triggerToast("លុបរូបភាពប្រវត្តិរូបជោគជ័យ!", "fa-solid fa-circle-check");
  } catch (err) {
    triggerToast("មានបញ្ហាក្នុងការលុបរូបភាព!", "fa-solid fa-circle-xmark");
  } finally {
    avatarDeleting.value = false;
  }
};


const openEditModal = () => {
  const profile = authStore.profile;

  originalProfile.value = {
    firstName: showValue(profile?.firstName),
    lastName: showValue(profile?.lastName),
    phone: showValue(profile?.phone),
    address: showValue(profile?.address),
    gradeLevel: showValue(profile?.gradeLevel),
    major: showValue(profile?.major),
    gender: showValue(profile?.gender)
  };
  editForm.value = { ...originalProfile.value };
  Object.keys(errors.value).forEach((key) => (errors.value[key] = ""));
  isEditModalOpen.value = true;
};

//Disable Button
const isSaveDisabled = computed(() => {
  const hasChanged =
    JSON.stringify(editForm.value) !== JSON.stringify(originalProfile.value);
  const isFormEmpty = !editForm.value.firstName || !editForm.value.lastName;
  const hasError = Object.values(errors.value).some((err) => err !== "");

  return !hasChanged || hasError || isFormEmpty;
});

//Update info profile
const handleUpdateProfile = async () => {
  validateFirstName(editForm.value.firstName);
  validateLastName(editForm.value.lastName);
  validatePhone(editForm.value.phone);
  validateAddress(editForm.value.address);
  validateGradeLevel(editForm.value.gradeLevel);
  validateMajor(editForm.value.major);
  validateGender(editForm.value.gender)

  const hasErrors = Object.values(errors.value).some(
    (err) => err && err.trim() !== "",
  );

  if (hasErrors) {
    triggerToast(
      "សូមពិនិត្យទិន្នន័យក្នុង Form ឱ្យបានត្រឹមត្រូវ!",
      "fa-solid fa-circle-xmark",
    );
    return;
  }

  try {
    await authStore.updateProfile({
      firstName: saveValue(editForm.value.firstName),
      lastName: saveValue(editForm.value.lastName),
      phone: saveValue(editForm.value.phone),
      address: saveValue(editForm.value.address),
      gradeLevel: saveValue(editForm.value.gradeLevel),
      major: saveValue(editForm.value.major),
      gender: saveValue(editForm.value.gender)
    });
    triggerToast("អាប់ដេតព័ត៌មានជោគជ័យ!", "fa-solid fa-circle-check");
    closeEditModal();
  } catch (err) {
    triggerToast("មានបញ្ហាក្នុងការអាប់ដេត!", "fa-solid fa-circle-xmark");
  }
};

//Delete Account
const handleDeleteAccount = async () => {
  deleteAccountError.value = "";

  if (!deleteAccountForm.value.password) {
    deleteAccountError.value = "សូមបញ្ចូលលេខសម្ងាត់!";
    triggerToast("សូមបញ្ចូលលេខសម្ងាត់!", "fa-solid fa-triangle-exclamation");
    return;
  }

  try {
    deleteAccountLoading.value = true;
    triggerToast("កំពុងលុបគណនី...", "fa-solid fa-spinner fa-spin");
    await authStore.deleteAccount(deleteAccountForm.value.password);

    localStorage.removeItem("user_token");
    localStorage.removeItem("user_role");
    triggerToast("លុបគណនីជោគជ័យ!", "fa-solid fa-circle-check");
    setTimeout(() => {
      router.replace("/login");
    }, 1500);
  } catch (err) {
    deleteAccountError.value =
      authStore.error || err.message || "លេខសម្ងាត់មិនត្រឹមត្រូវ!";
    triggerToast(
      "លុបគណនីបរាជ័យ! លេខសម្ងាត់មិនត្រឹមត្រូវ។",
      "fa-solid fa-circle-xmark",
    );
  } finally {
    deleteAccountLoading.value = false;
  }
};

const closeEditModal = () => {
  isEditModalOpen.value = false;
};

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

watch(
  () => editForm.value.firstName,
  (val) => validateFirstName(val),
);
watch(
  () => editForm.value.lastName,
  (val) => validateLastName(val),
);
watch(
  () => editForm.value.phone,
  (val) => validatePhone(val),
);
watch(
  () => editForm.value.address,
  (val) => validateAddress(val),
);
watch(
  () => editForm.value.gradeLevel,
  (val) => validateGradeLevel(val),
);
watch(
  () => editForm.value.major,
  (val) => validateMajor(val),
);
watch(
  () => editForm.value.gender,
  (val) => {
    validateGender(val)
  }
);

watch(
  () => passwordForm.value.newPassword,
  (val) => {
    validatePassword(val);

    newPasswordError.value = errors.value.password;
  },
);

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
  margin: 0;
  padding: 24px;
  display: grid;
  grid-template-columns: 290px 810px;
  gap: 24px;
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
  min-height: 600px;
  padding: 28px 30px 32px;
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

.error-text {
  color: red;
  font-size: 12px;
  margin-top: 4px;
  display: block;
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

.section-title {
  font-size: 1.5rem;
  color: #1a202c;
  margin-bottom: 24px;
  border-bottom: 2px solid #edf2f7;
  padding-bottom: 10px;
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
}

.info-input {
  width: 100%;
  padding: 12px 16px 12px 42px;
  border-radius: 10px;
  border: 1px solid #e2e8f0;
  background-color: #c3fae044;
  font-size: 0.95rem;
  transition: all 0.3s ease;
}

.info-input.empty {
  color: #a0aec0;
  font-style: italic;
  border-left: 4px solid #cbd5e0;
}

@media (max-width: 600px) {
  .info-grid {
    grid-template-columns: 1fr;
  }
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
