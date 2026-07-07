<template>
  <div class="layout">
    <div class="left-card">
      <div class="avatar-wrapper">
        <img
          :src="avatarSrc"
          class="avatar-image"
          alt="Profile photo"
          @error="($event) => ($event.target.src = defaultImage)"
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
            authStore.profile?.avatar &&
            authStore.profile.avatar !== 'default.png'
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
          {{
            profileData.role?.toUpperCase() === "STUDENT"
              ? "សិស្ស"
              : "គ្រូបង្រៀន"
          }}
        </span>
      </div>

      <div class="action-buttons">
        <button
          type="button"
          :class="[
            'btn',
            currentTab === 'general' ? 'btn-green' : 'btn-green-outline',
          ]"
          @click="currentTab = 'general'"
        >
          <i class="fas fa-edit"></i>
          ព័ត៌មានផ្ទាល់ខ្លួន
        </button>

        <button
          type="button"
          :class="[
            'btn',
            currentTab === 'security' ? 'btn-purple' : 'btn-purple-outline',
          ]"
          @click="currentTab = 'security'"
        >
          <i class="fas fa-lock"></i>
          ផ្លាស់ប្តូរពាក្យសម្ងាត់
        </button>

        <button
          type="button"
          :class="[
            'btn',
            currentTab === 'delete' ? 'btn-danger' : 'btn-danger-outline',
          ]"
          @click="currentTab = 'delete'"
        >
          <i class="fas fa-user-times"></i>
          លុបគណនីចោល
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
                  @input="validateFirstName(profileData.firstName)"
                  placeholder="បញ្ចូលនាមត្រកូល"
                  :disabled="!isEditing"
                />
              </div>
              <span v-if="errors.firstName" class="error-text">{{
                errors.firstName
              }}</span>
            </div>

            <div class="info-item">
              <label class="info-label">នាមខ្លួន</label>
              <div class="input-wrapper">
                <i class="fas fa-user input-icon"></i>
                <input
                  type="text"
                  class="info-input"
                  v-model="profileData.lastName"
                  @input="validateLastName(profileData.lastName)"
                  placeholder="បញ្ចូលនាមខ្លួន"
                  :disabled="!isEditing"
                />
              </div>
              <span v-if="errors.lastName" class="error-text">{{
                errors.lastName
              }}</span>
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
                  @input="validatePhone(profileData.phone)"
                  placeholder="បញ្ចូលលេខទូរសព្ទ"
                  :disabled="!isEditing"
                />
              </div>
              <span v-if="errors.phone" class="error-text">{{
                errors.phone
              }}</span>
            </div>

            <div class="info-item" style="grid-column: span 2">
              <label class="info-label">អាសយដ្ឋាន</label>
              <div class="input-wrapper">
                <i class="fas fa-map-marker-alt input-icon"></i>
                <input
                  type="text"
                  class="info-input"
                  v-model="profileData.address"
                  @input="validateAddress(profileData.address)"
                  placeholder="បញ្ចូលអាសយដ្ឋាន"
                  :disabled="!isEditing"
                />
              </div>
              <span v-if="errors.address" class="error-text">{{
                errors.address
              }}</span>
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
                :disabled="!hasChanges || hasErrors"
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
              <div class="password-input-wrapper" style="position: relative">
                <input
                  :type="showPassword.oldPassword ? 'text' : 'password'"
                  v-model.trim="passwordForm.oldPassword"
                  placeholder="បញ្ចូលលេខសម្ងាត់ចាស់"
                  class="form-control"
                />
                <i
                  :class="
                    showPassword.oldPassword
                      ? 'fa-solid fa-eye-slash'
                      : 'fa-solid fa-eye'
                  "
                  @click="showPassword.oldPassword = !showPassword.oldPassword"
                  style="
                    position: absolute;
                    right: 10px;
                    top: 35%;
                    cursor: pointer;
                  "
                ></i>
              </div>
              <span class="text-danger small">{{ oldPasswordError }}</span>
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

                <div style="position: relative">
                  <input
                    :type="showPassword.newPassword ? 'text' : 'password'"
                    v-model.trim="passwordForm.newPassword"
                    placeholder="បញ្ចូលលេខសម្ងាត់ថ្មី"
                    class="form-control"
                  />

                  <i
                    @click="
                      showPassword.newPassword = !showPassword.newPassword
                    "
                    :class="
                      showPassword.newPassword
                        ? 'fas fa-eye-slash'
                        : 'fas fa-eye'
                    "
                    style="
                      position: absolute;
                      right: 15px;
                      top: 50%;
                      transform: translateY(-50%);
                      cursor: pointer;
                      color: #6c757d;
                    "
                  ></i>
                </div>

                <span class="text-danger small">{{ newPasswordError }}</span>
              </div>

              <div class="profile-field">
                <label>បញ្ជាក់ពាក្យសម្ងាត់ថ្មី</label>
                <div style="position: relative">
                  <input
                    :type="showPassword.confirmPassword ? 'text' : 'password'"
                    v-model.trim="passwordForm.confirmPassword"
                    placeholder="បញ្ជាក់លេខសម្ងាត់ថ្មី"
                    class="form-control"
                  />
                  <i
                    @click="
                      showPassword.confirmPassword =
                        !showPassword.confirmPassword
                    "
                    :class="
                      showPassword.confirmPassword
                        ? 'fas fa-eye-slash'
                        : 'fas fa-eye'
                    "
                    style="
                      position: absolute;
                      right: 15px;
                      top: 50%;
                      transform: translateY(-50%);
                      cursor: pointer;
                      color: #6c757d;
                    "
                  ></i>
                </div>
                <span class="text-danger small">{{
                  confirmPasswordError
                }}</span>
              </div>
            </div>
          </div>

          <div class="d-flex justify-content-end mt-5 pt-4 border-top">
            <button
              type="button"
              class="btn btn-purple"
              @click="handleChangePassword"
              :disabled="passwordLoading"
            >
              {{
                passwordLoading
                  ? "កំពុងរក្សាទុក..."
                  : "ធ្វើបច្ចុប្បន្នភាពពាក្យសម្ងាត់"
              }}
            </button>
          </div>
        </form>
      </div>

      <div
        v-if="currentTab === 'delete'"
        id="tab-delete"
        class="fade-in-panel w-100"
      >
        <h2>លុបគណនីចោល</h2>
        <div class="p-4 border rounded bg-light mt-4">
          <div class="text-danger mb-3">
            <i class="fas fa-exclamation-triangle fa-2x"></i>
          </div>
          <h5 class="fw-bold text-dark mb-2">តើអ្នកប្រាកដជាចង់លុបគណនីមែនទេ?</h5>
          <p class="text-muted mb-4 small" style="line-height: 1.6">
            ការលុបគណនីនឹងលុបព័ត៌មានផ្ទាល់ខ្លួន រូបភាពប្រវត្តិរូប
            និងទិន្នន័យដែលពាក់ព័ន្ធទាំងអស់ចេញពីប្រព័ន្ធជាអចិន្ត្រៃយ៍។
            សកម្មភាពនេះមិនអាចទាញត្រឡប់មកវិញបានឡើយ។
          </p>
          <div class="d-flex justify-content-start">
            <button
              type="button"
              class="btn btn-danger"
              style="width: auto; padding: 10px 24px"
              @click="openDeleteAccountModal"
            >
              <i class="fas fa-user-times me-2"></i> លុបគណនីរបស់ខ្ញុំ
            </button>
          </div>
        </div>
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
              class="spinner-border spinner-border-sm me-2"
              role="status"
            ></span>

            {{ loadingAvatar ? "កំពុងលុប..." : "លុបចេញ" }}
          </button>
        </div>
      </div>
    </BaseModal>

    <BaseModal
      :isOpen="isDeleteAccountModalOpen"
      @close="isDeleteAccountModalOpen = false"
      width="400px"
    >
      <div class="p-3">
        <div class="text-center">
          <div class="modal-icon-alert text-danger mb-3">
            <i class="fas fa-user-slash fa-2x"></i>
          </div>
          <h5 class="fw-bold text-dark mb-2" style="font-size: 1.1rem">
            បញ្ជាក់ការលុបគណនី
          </h5>
          <p class="text-muted mb-4 small" style="line-height: 1.5">
            ដើម្បីសុវត្ថិភាព សូមបញ្ចូលពាក្យសម្ងាត់បច្ចុប្បន្នរបស់អ្នក
            ដើម្បីបន្តដំណើរការលុបគណនីនេះជាអចិន្ត្រៃយ៍។
          </p>
        </div>

        <div class="mb-4">
          <label class="form-label small fw-bold text-secondary mb-1"
            >ពាក្យសម្ងាត់បច្ចុប្បន្ន</label
          >
          <div class="password-input">
            <input
              type="password"
              v-model="deleteAccountPassword"
              placeholder="បញ្ចូលលេខសម្ងាត់បច្ចុប្បន្ន"
              style="
                width: 100%;
                padding: 10px;
                border: 1px solid #ced4da;
                border-radius: 4px;
              "
            />
          </div>
        </div>

        <div class="d-flex gap-2 w-100">
          <button
            class="btn btn-outline flex-fill"
            @click="isDeleteAccountModalOpen = false"
            :disabled="deletingAccount"
          >
            បោះបង់
          </button>
          <button
            class="btn btn-danger flex-fill"
            style="margin-top: 0"
            @click="confirmDeleteAccount"
            :disabled="deletingAccount || !deleteAccountPassword"
          >
            <span
              v-if="deletingAccount"
              class="spinner-border spinner-border-sm me-1"
            ></span>
            លុបជាដាច់ខាត
          </button>
        </div>
      </div>
    </BaseModal>
    <ToastNotification />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch, computed } from "vue";
import { useToast } from "@/composables/useToast";
import { updateProfileAPI } from "@/api/auth.api";
import { getProfileAPI } from "@/api/auth.api";
import { deleteAccountAPI } from "@/api/auth.api";
import BaseModal from "@/components/common/BaseModal.vue";
import { useAuthStore } from "@/stores/authStore";
import defaultImage from "../../assets/images/default.png";
import ToastNotification from "@/components/common/ToastNotification.vue";
import { useFormValidation } from "@/composables/useFormValidation";

const { triggerToast } = useToast();

const authStore = useAuthStore();

const currentTab = ref("general");
const isEditing = ref(false);
const loadingData = ref(false);

const updatingProfile = ref(false);
const loadingAvatar = ref(false);

const deletingAccount = ref(false);

const oldPasswordError = ref("");
const newPasswordError = ref("");
const confirmPasswordError = ref("");
const passwordLoading = ref(false);

const imageRefresh = ref(Date.now());
const deleteAccountPassword = ref("");

const imgBaseUrl = import.meta.env.VITE_BASE_URL_FOR_IMAGE;

const {
  errors,
  validatePassword,
  validateFirstName,
  validateLastName,
  validatePhone,
  validateAddress,
} = useFormValidation();

const passwordForm = ref({
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
});

const showPassword = ref({
  oldPassword: false,
  newPassword: false,
  confirmPassword: false,
});

const fileInput = ref(null);
const localUploadedUrl = ref("");
const avatarDeleting = ref(false);
const isDeleteModalOpen = ref(false);
const isDeleteAccountModalOpen = ref(false);

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

const originalProfile = ref({ ...profileData });

const hasErrors = computed(() => {
  return !!(
    errors.value.firstName ||
    errors.value.lastName ||
    errors.value.gender ||
    errors.value.phone ||
    errors.value.address
  );
});

const hasChanges = computed(() => {
  return JSON.stringify(profileData) !== JSON.stringify(originalProfile.value);
});

const syncProfileData = () => {
  if (authStore.profile) {
    profileData.firstName = authStore.profile.firstName || "";
    profileData.lastName = authStore.profile.lastName || "";
    profileData.gender = authStore.profile.gender
      ? authStore.profile.gender.toUpperCase()
      : "";
    profileData.email = authStore.profile.email || "";
    profileData.phone = authStore.profile.phone || "";
    profileData.address = authStore.profile.address || "";
  }
  originalProfile.value = JSON.parse(JSON.stringify(profileData));
};

const clearErrors = () => {
  errors.value.firstName = "";
  errors.value.lastName = "";
  errors.value.phone = "";
  errors.value.address = "";
};
watch(
  () => authStore.profile,
  () => {
    syncProfileData();
  },
  { immediate: true },
);

const resetPasswordForm = () => {
  passwordForm.value = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  oldPasswordError.value = "";
  newPasswordError.value = "";
  confirmPasswordError.value = "";

  showPassword.value = {
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  };
};
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
    const res = await getProfileAPI();
    const responseData = res.data;

    if (responseData?.result === false) {
      triggerToast(responseData?.msg || "សូមចូលប្រើប្រាស់ប្រព័ន្ធជាមុនសិន!");
      return;
    }

    const user = responseData?.data || responseData;
    if (user) {
      profileData.userId = user.code || "N/A";
      profileData.firstName = user.firstName || "";
      profileData.lastName = user.lastName || "";
      profileData.gender = user.gender ? user.gender.toUpperCase() : "";
      profileData.email = user.email || "";
      profileData.phone = user.phone || "";
      profileData.address = user.address || "";
      profileData.role = user.role || user.user_role || user.roleName || "";

      if (localUploadedUrl.value) {
        profileData.avatarUrl = localUploadedUrl.value;
      } else if (user.avatar && user.avatar !== "default.png") {
        if (user.avatar.startsWith("http")) {
          profileData.avatarUrl = user.avatar;
        } else {
          const url = new URL(import.meta.env.VITE_BASE_URL);
          const serverOrigin = url.origin;
          const cleanAvatarPath = user.avatar.startsWith("/")
            ? user.avatar.slice(1)
            : user.avatar;
          profileData.avatarUrl = `${serverOrigin}/${cleanAvatarPath}`;
        }
      } else {
        profileData.avatarUrl = defaultImage;
      }
    }
  } catch (err) {
    triggerToast("មិនអាចទាញយកទិន្នន័យប្រវត្តិរូបបានទេ!");
  } finally {
    loadingData.value = false;
  }
};

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
    resetPasswordForm();
  } catch (err) {
    oldPasswordError.value = "លេខសម្ងាត់ចាស់មិនត្រឹមត្រូវ!";
    triggerToast("លេខសម្ងាត់ចាស់មិនត្រឹមត្រូវ!", "fa-solid fa-circle-xmark");
  } finally {
    passwordLoading.value = false;
  }
};

const cancelEditing = () => {
  clearErrors();
  isEditing.value = false;
  fetchUserProfile();
};

const handleSaveProfile = async () => {
  validateFirstName(profileData.firstName);
  validateLastName(profileData.lastName);
  validatePhone(profileData.phone);
  validateAddress(profileData.address);

  if (hasErrors.value) return;
  try {
    updatingProfile.value = true;
    const payload = {
      firstName: profileData.firstName.trim(),
      lastName: profileData.lastName.trim(),
      gender: profileData.gender || null,
      phone: profileData.phone ? profileData.phone.trim() : null,
      address: profileData.address ? profileData.address.trim() : null,
    };

    await updateProfileAPI(payload);
    originalProfile.value = { ...profileData };
    triggerToast(
      "រក្សាទុកព័ត៌មានផ្ទាល់ខ្លួនជោគជ័យ",
      "fa-solid fa-circle-check",
    );
    isEditing.value = false;
    await authStore.fetchProfile(true);
    await fetchUserProfile();
  } catch (err) {
    console.error(err);
    triggerToast("ការកែប្រែព័ត៌មានបានបរាជ័យ!", "fa-solid fa-circle-xmark");
  } finally {
    updatingProfile.value = false;
  }
};

const triggerFileInput = () => {
  if (fileInput.value) fileInput.value.click();
};

const handleAvatarUpload = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

  if (!allowedTypes.includes(file.type)) {
    triggerToast(
      "សូមជ្រើសរើសរូបភាពប្រភេទ JPG, PNG ឬ WEBP ប៉ុណ្ណោះ។",
      "fa-solid fa-circle-xmark",
    );
    event.target.value = "";
    return;
  }

  const maxSize = 2 * 1024 * 1024;

  if (file.size > maxSize) {
    triggerToast("ទំហំរូបភាពមិនអាចលើស 2MB បានទេ។", "fa-solid fa-circle-xmark");
    event.target.value = "";
    return;
  }

  try {
    triggerToast("កំពុងផ្ទុកឡើងរូបភាព...", "fa-solid fa-spinner fa-spin");

    if (authStore.error) {
      authStore.error = null;
    }

    await authStore.uploadAvatar(file);

    await authStore.fetchProfile(true);

    imageRefresh.value = Date.now();

    triggerToast(
      "ផ្លាស់ប្តូររូបភាពប្រវត្តិរូបជោគជ័យ!",
      "fa-solid fa-circle-check",
    );
  } catch (err) {
    triggerToast(
      err.response?.data?.msg || "មិនអាចផ្ទុកឡើងរូបភាពបានទេ។",
      "fa-solid fa-circle-xmark",
    );
  } finally {
    event.target.value = "";
  }
};
watch(
  () => passwordForm.value.oldPassword,
  (newValue) => {
    if (!newValue) {
      oldPasswordError.value = "";
      return;
    }

    oldPasswordError.value = "";
  },
);

watch(
  () => passwordForm.value.newPassword,
  (newValue) => {
    if (newValue.length > 0 && newValue.length < 6) {
      newPasswordError.value = "ពាក្យសម្ងាត់ត្រូវមានយ៉ាងតិច ៦ ខ្ទង់!";
    } else {
      newPasswordError.value = "";
    }
  },
);

watch(
  () => passwordForm.value.confirmPassword,
  (newValue) => {
    if (!newValue) {
      confirmPasswordError.value = "";
      return;
    }

    if (newValue !== passwordForm.value.newPassword) {
      confirmPasswordError.value = "លេខសម្ងាត់មិនដូចគ្នាទេ!";
    } else {
      confirmPasswordError.value = "";
    }
  },
);

watch(
  () => passwordForm.value.newPassword,
  (val) => {
    if (!val) {
      newPasswordError.value = "";
      return;
    }

    validatePassword(val);
    newPasswordError.value = errors.value.password;
  },
);

const openDeleteModal = () => {
  isDeleteModalOpen.value = true;
};

const avatarSrc = computed(() => {
  const avatar = authStore.profile?.avatar;

  if (
    !avatar ||
    avatar === "/public/uploads/avatars/default.png" ||
    avatar === "default.png" ||
    avatar.includes("default.png")
  ) {
    return defaultImage;
  }

  if (avatar.startsWith("http")) {
    return `${avatar}?t=${imageRefresh.value}`;
  }

  return `${imgBaseUrl}${avatar}?t=${imageRefresh.value}`;
});

const confirmDeleteAvatar = async () => {
  try {
    loadingAvatar.value = true;

    await authStore.deleteAvatar();

    if (authStore.profile) {
      authStore.profile.avatar = null;
    }

    await authStore.fetchProfile(true);
    await fetchUserProfile();

    imageRefresh.value = Date.now();

    if (fileInput.value) {
      fileInput.value.value = "";
    }

    isDeleteModalOpen.value = false;

    triggerToast(
      "លុបរូបភាពប្រវត្តិរូបជោគជ័យ!",
      "fa-solid util fa-circle-check",
    );
  } catch (err) {
    console.log(err);
  } finally {
    loadingAvatar.value = false;
  }
};

const openDeleteAccountModal = () => {
  deleteAccountPassword.value = "";
  isDeleteAccountModalOpen.value = true;
};

const confirmDeleteAccount = async () => {
  if (!deleteAccountPassword.value?.trim()) {
    triggerToast(
      "សូមបញ្ចូលពាក្យសម្ងាត់បច្ចុប្បន្នរបស់អ្នក!",
      "fa-solid fa-triangle-exclamation",
    );
    return;
  }

  try {
    deletingAccount.value = true;

    const res = await deleteAccountAPI(deleteAccountPassword.value);

    if (res.data?.result === false) {
      triggerToast(
        res.data?.msg || "លេខសម្ងាត់មិនត្រឹមត្រូវ!",
        "fa-solid fa-circle-xmark",
      );
      return;
    }

    isDeleteAccountModalOpen.value = false;

    triggerToast(
      "គណនីរបស់អ្នកត្រូវបានលុបដោយជោគជ័យ!",
      "fa-solid fa-circle-check",
    );
    setTimeout(() => {
      if (authStore?.logout) {
        authStore.logout();
      } else {
        localStorage.clear();
        window.location.href = "/login";
      }
    }, 1000);
  } catch (err) {
    triggerToast(
      err?.response?.data?.msg ||
        "លេខសម្ងាត់មិនត្រឹមត្រូវ ឬការលុបគណនីបានបរាជ័យ!",
      "fa-solid fa-circle-xmark",
    );
  } finally {
    deletingAccount.value = false;
  }
};

onMounted(() => {
  fetchUserProfile();
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
  display: grid;
  grid-template-columns: 290px 810px;
  gap: 24px;
  align-items: start;
  justify-content: center;
  margin-inline: 50px 0px;
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

.btn-danger-outline {
  color: var(--red);
  background-color: #fff5f5;
  border: 1px solid #fed7d7 !important;
}

.btn-danger-outline:hover {
  color: var(--red);
  background-color: #ffe8e8;
  border: 1px solid #fed7d7 !important;
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

.btn-green,
.btn-green-outline {
  background: #d6fee98d;
  color: #217247;
  border: 1px solid #38a16964;
}

.btn-green-outline:hover {
  background-color: #baf9d897 !important;
  color: #217247;
  border: 1px solid #38a169;
}

.btn-green:hover {
  background-color: #5df5856d !important;
  color: #217247;
  border: 1px solid #38a169;
}

.btn-outline {
  background-color: #faf5ff !important;
  border: 1px solid #e9d8fd !important;
  color: #6b46c1 !important;
}

.btn-purple,
.btn-purple-outline {
  background: #ede5fd5b;
  color: #6e47c2;
  border: 1px solid #815ad588;
}

.btn-purple-outline:hover {
  background-color: #f3e8ff !important;
  color: #3a1e7b;
  border: 1px solid #805ad5;
}

.btn-purple:hover {
  background-color: #f3e8ff !important;
  color: #3a1e7b;
  border: 1px solid #805ad5;
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
