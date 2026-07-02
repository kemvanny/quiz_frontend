<template>
  <BaseModal
    :is-open="isOpen"
    title="បញ្ជីការអញ្ជើញសិស្ស"
    subtitle="គ្រប់គ្រង និងមើលស្ថានភាពសិស្សដែលបានអញ្ជើញចូលរួមថ្នាក់រៀន។"
    width="580px"
    @close="$emit('close')"
  >
    <div class="glass-body p-4">
      <div class="mb-4">
        <label class="form-label mb-3 small fw-bold text-muted text-uppercase" style="letter-spacing: .5px;">អញ្ជើញសិស្ស</label>
        <div class="d-flex gap-2">
          <input 
            type="email" 
            v-model="newEmail" 
            @keydown.enter.prevent="sendSingleInvite"
            class="form-control shadow-none focus-ring-emerald" 
            placeholder="student@gmail.com" 
            style="font-size: .95rem; background: #fafbfc; border-radius: 10px;"
            autocomplete="new-password"
          />
          <button 
            class="btn btn-success fw-bold px-3 d-flex align-items-center gap-1" 
            style="border-radius: 10px;"
            @click="sendSingleInvite"
            :disabled="sending || !newEmail.trim()"
          >
            <i class="fas fa-spinner fa-spin" v-if="sending"></i>
            <i class="fas fa-paper-plane" v-else></i>
            ផ្ញើ
          </button>
        </div>
      </div>

      <hr class="border-light mb-3" />

      <div v-if="fetching" class="text-center py-4">
        <div class="spinner-border text-success spinner-border-sm" role="status"></div>
        <p class="text-muted small mt-2">កំពុងទាញយកបញ្ជីការអញ្ជើញ...</p>
      </div>

      <div v-else>
        <div class="small fw-bold text-muted mb-2 text-uppercase" style="font-size: 0.72rem; letter-spacing: 0.5px;">
          ប្រវត្តិការអញ្ជើញក្នុងថ្នាក់ ({{ invitationsList.length }})
        </div>
        
        <div v-if="invitationsList.length === 0" class="text-center py-3 text-muted small">
          មិនទាន់មានការអញ្ជើញសិស្សក្នុងថ្នាក់នេះនៅឡើយទេ។
        </div>

        <div v-else class="invites-list-container rounded-3 border">
          <table class="table table-hover table-borderless mb-0 align-middle" style="font-size: 0.88rem;">
            <thead class="table-light sticky-top">
              <tr class="text-muted" style="font-size: 0.75rem;">
                <th class="ps-3">ឈ្មោះសិស្ស</th>
                <th>អ៊ីមែល</th>
                <th class="text-end pe-3">ស្ថានភាព</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="invite in invitationsList" :key="invite.id">
                <td class="ps-3 fw-bold text-dark">{{ invite.first_name }} {{ invite.last_name }}</td>
                <td class="text-muted font-monospace" style="font-size: 0.8rem;">{{ invite.email }}</td>
                <td class="text-end pe-3">
                  <span :class="['badge rounded-pill px-2 py-1', invite.status === 'pending' ? 'bg-warning-light text-warning' : 'bg-success-light text-success']">
                    {{ invite.status }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <template #footer>
      <button class="btn btn-light rounded-3 fw-bold px-4" @click="$emit('close')">បិទផ្ទាំង</button>
    </template>
  </BaseModal>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useToast } from 'vue-toastification';
import { getRoomInvitations, inviteStudent } from '@/api/teacher.api';
const props = defineProps({
  isOpen: { type: Boolean, required: true },
  roomData: { type: Object, default: () => null }
});

defineEmits(['close']);

const toast = useToast();

const fetching = ref(false);
const sending = ref(false);
const invitationsList = ref([]);
const newEmail = ref('');

const loadInvitations = async () => {
  if (!props.roomData?.id) return;
  try {
    fetching.value = true;
    const res = await getRoomInvitations(props.roomData.id);
    invitationsList.value = res.data?.data || res.data || [];
  } catch (err) {
    console.error("Error loading invitations:", err);
    toast.error("មិនអាចទាញយកបញ្ជីការអញ្ជើញបានទេ!");
  } finally {
    fetching.value = false;
  }
};

watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    loadInvitations();
  }
});

const sendSingleInvite = async () => {
  const email = newEmail.value.trim().toLowerCase();
  
  if (!props.roomData?.id) {
    toast.error("មិនអាចស្វែងរកលេខសម្គាល់បន្ទប់ (Room ID) ឃើញឡើយ!");
    return;
  }

  if (!email) return;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    toast.warning("សូមបញ្ចូលទម្រង់អ៊ីមែលឱ្យបានត្រឹមត្រូវ!");
    return;
  }

  if (invitationsList.value.some(invite => invite.email.toLowerCase() === email)) {
    toast.warning("អ៊ីមែលសិស្សម្នាក់នេះស្ថិតក្នុងបញ្ជីអញ្ជើញរួចរាល់ហើយ!");
    return;
  }

  try {
    sending.value = true;
    await inviteStudent(props.roomData.id, { student_email: email });
    
    toast.success("បានផ្ញើការអញ្ជើញជោគជ័យ!", { timeout: 3000 });
    
    newEmail.value = '';
    await loadInvitations(); 
  } catch (err) {
    console.error("Error sending single invite:", err);
    toast.error("ការផ្ញើការអញ្ជើញបរាជ័យ! សូមប្រាកដថាអ៊ីមែលសិស្សនេះមាននៅលើប្រព័ន្ធ។");
  } finally {
    sending.value = false;
  }
};
</script>

<style scoped>
.focus-ring-emerald:focus { border-color: #10b981 !important; box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.15) !important; }
.bg-warning-light { background-color: #fff7ed; color: #c2410c; }
.bg-success-light { background-color: #f0fdf4; color: #15803d; }
.table th { padding-top: 10px; padding-bottom: 10px; }
.table td { padding-top: 12px; padding-bottom: 12px; border-bottom: 1px solid #f1f5f9; }

.invites-list-container {
  display: block;
  max-height: 200px;       
  overflow-y: scroll;     
  overflow-x: hidden;    
  border: 1px solid #e2e8f0;
}

.invites-list-container table {
  width: 100%;
}

/* ស្ទីលរបារ Scrollbar */
.invites-list-container::-webkit-scrollbar {
  width: 6px;
}
.invites-list-container::-webkit-scrollbar-track {
  background: #f1f5f9;
}
.invites-list-container::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}
.invites-list-container::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>