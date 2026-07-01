<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div v-if="show" class="custom-modal-overlay" @click="emit('close')">
        <div class="custom-modal-card">
          <div class="modal-header-custom">
            <div class="d-flex align-items-center gap-3">
              <div class="icon-box"><i class="bi bi-person-badge"></i></div>
              <h2 class="h5 mb-0 fw-bold text-emerald-900">
                ប្រវត្តិរូប{{ roleKhmer }}លម្អិត
              </h2>
            </div>
            <button @click="emit('close')" class="btn-close-custom">
              <i class="bi bi-x"></i>
            </button>
          </div>

          <div class="modal-body-custom">
            <div class="top-section">
              <div class="profile-card">
                <div class="avatar-wrapper">
                  <img :src="avatarSrc" :alt="displayName" />
                </div>
                <h3 class="h5 mt-3 mb-1 text-slate-800">{{ displayName }}</h3>
                <span class="badge-role-green">{{ roleKhmer }}</span>
              </div>

              <div class="info-grid">
                <div class="info-item">
                  <label>លេខសម្គាល់</label>
                  <p>{{ detailedUser?.user_code || "N/A" }}</p>
                </div>
                <div class="info-item">
                  <label>គណនី</label>
                  <div class="mt-1">
                    <StatusBadge :type="detailedUser?.status" />
                  </div>
                </div>
                <div class="info-item">
                  <label>ស្ថានភាព</label>
                  <div class="mt-1">
                    <StatusBadge :type="Number(detailedUser?.is_active) === 1
                      ? 'active'
                      : 'inactive'
                      " />
                  </div>
                </div>
                <div class="info-item">
                  <label>ភេទ</label>
                  <p>{{ genderDisplay}}</p>
                </div>
                <div class="info-item">
                  <label>ថ្ងៃបង្កើត</label>
                  <p>{{ formatDate(detailedUser?.created_at) }}</p>
                </div>
              </div>
            </div>

            <div class="bottom-section">
              <label class="section-label">ព័ត៌មានទំនាក់ទំនង</label>

              <div class="contact-row">
                <div class="d-flex flex-column">
                  <label class="contact-label">អ៊ីមែល</label>
                  <span class="contact-value">{{
                    detailedUser?.email || "មិនមានអ៊ីមែល"
                  }}</span>
                </div>
                <button @click="copyToClipboard(detailedUser?.email, 'អ៊ីមែល')" class="btn-copy">
                  <i class="bi bi-clipboard"></i>
                </button>
              </div>

              <div class="contact-row mt-2">
                <div class="d-flex flex-column">
                  <label class="contact-label">លេខទូរស័ព្ទ</label>
                  <span class="contact-value">{{
                    detailedUser?.phone || "មិនមានលេខទូរស័ព្ទ"
                  }}</span>
                </div>
                <button @click="copyToClipboard(detailedUser?.phone, 'លេខទូរស័ព្ទ')" class="btn-copy">
                  <i class="bi bi-clipboard"></i>
                </button>
              </div>

              <div class="contact-row mt-2">
                <div class="d-flex flex-column">
                  <label class="contact-label">អាសយដ្ឋាន</label>
                  <span class="contact-value">{{
                    detailedUser?.address || "មិនទាន់មានអាសយដ្ឋាន"
                  }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useToast } from "vue-toastification";
import { getUserByID } from "@/api/admin.api.js";
import defaultAvatar from "@/assets/images/default.png";
import StatusBadge from "../common/StatusBadge.vue";

const props = defineProps({ user: Object, show: Boolean });
const emit = defineEmits(["close"]);
const toast = useToast();
const imgBaseUrl = import.meta.env.VITE_BASE_URL_FOR_IMAGE;

const loading = ref(false);
const fetchedUser = ref(null);

const fetchUserDetails = async (id) => {
  loading.value = true;
  try {
    const res = await getUserByID(id);
    fetchedUser.value = res.data?.data || res.data || res;
  } catch {
    toast.error("មិនអាចទាញយកព័ត៌មាន!");
  } finally {
    loading.value = false;
  }
};

watch(
  () => props.show,
  (val) =>
    val && props.user?.id
      ? fetchUserDetails(props.user.id)
      : (fetchedUser.value = null),
);

const detailedUser = computed(() => {

  if (fetchedUser.value && Object.keys(fetchedUser.value).length > 0) {
    return fetchedUser.value;
  }
  return props.user || {};
});
const displayName = computed(() => {
  const name =
    detailedUser.value?.fullName ||
    `${detailedUser.value?.firstName || ""} ${detailedUser.value?.lastName || ""}`.trim();

  if (!name || name === "N/A") return "N/A";

  return name
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
});
const roleKhmer = computed(
  () =>
    ({ teacher: "គ្រូបង្រៀន", student: "សិស្ស", admin: "អ្នកគ្រប់គ្រង" })[
    detailedUser.value?.role?.toLowerCase()
    ] ||
    detailedUser.value?.role ||
    "",
);
const avatarSrc = computed(() => {
  const av = detailedUser.value?.avatar;
  return !av || av === "default.png"
    ? defaultAvatar
    : av.startsWith("http")
      ? av
      : `${imgBaseUrl}${av}`;
});
const genderDisplay = computed(() => {
  const g = detailedUser.value?.gender; 
  if (!g) return 'មិនទាន់បំពេញ'; 
  const map = {
    'female': 'ស្រី',
    'male': 'ប្រុស',
    'other': 'ផ្សេងៗ'
  };
  return map[g.toLowerCase()] || 'មិនទាន់បំពេញ';
});
const copyToClipboard = (txt, field) =>
  txt &&
  navigator.clipboard
    .writeText(txt)
    .then(() => toast.success(`ចម្លង${field}ជោគជ័យ!`));

const formatDate = (d) => (d ? new Date(d).toISOString().split("T")[0] : "---");

</script>

<style scoped>
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

.modal-header-custom {
  padding: 1.25rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #e5fdec;
  border-bottom: 1px solid #dcfce7;
}

.icon-box {
  width: 35px;
  height: 35px;
  background: #dcfce7;
  border-radius: 10px;
  display: grid;
  place-items: center;
  color: #15803d;
}

.btn-close-custom {
  border: none;
  background: #dcfce7;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  color: #166534;
}

.modal-body-custom {
  padding: 1.5rem;
}

.top-section {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.profile-card {
  flex: 0 0 200px;
  text-align: center;
  background: #f9fafb;
  padding: 1.5rem;
  border-radius: 16px;
  border: 1px solid #f3f4f6;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.avatar-wrapper img {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.badge-role-green {
  font-size: 0.75rem;
  background: #dcfce7;
  color: #15803d;
  padding: 4px 12px;
  border-radius: 20px;
  font-weight: 600;
  margin-top: 8px;
}

.info-grid {
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.info-item {
  background: #f6fffa;
  padding: 12px 16px;
  border-radius: 12px;
  border: 1px solid #dcfce7;
}

.info-item label {
  font-size: 0.7rem;
  color: #64748b;
  text-transform: uppercase;
  margin-bottom: 4px;
  display: block;
  font-weight: 600;
}

.info-item p {
  font-size: 0.95rem;
  font-weight: 500;
  color: #1e293b;
  margin: 0;
}

.contact-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f8fffc;
  padding: 12px 16px;
  border-radius: 12px;
  border: 1px solid #dcfce7;
}

.contact-label {
  font-size: 0.7rem;
  color: #64748b;
  text-transform: uppercase;
  margin-bottom: 2px;
  display: block;
  font-weight: 600;
}

.contact-value {
  font-size: 0.95rem;
  font-weight: 400;
  color: #1e293b;
}

.btn-copy {
  border: none;
  background: #f0fdf4;
  color: #15803d;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.section-label {
  font-size: 0.8rem;
  font-weight: 600;
  color: #475569;
  margin-bottom: 0.5rem;
  display: block;
}
</style>
