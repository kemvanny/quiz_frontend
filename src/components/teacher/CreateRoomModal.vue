<template>
  <BaseModal
    :is-open="isOpen"
    title="បង្កើតថ្នាក់រៀនថ្មី"
    subtitle="រៀបចំបង្កើតបន្ទប់សិក្សាសម្រាប់សិស្សរបស់អ្នក។"
    tag="ការគ្រប់គ្រងថ្នាក់រៀន"
    width="500px"
    @close="handleClose"
  >
    <div class="glass-body p-4">
      <div class="mb-2">
        <label class="form-label small fw-bold text-muted text-uppercase" style="letter-spacing: .5px;">ឈ្មោះបន្ទប់ <span class="text-danger">*</span></label>
        <div class="input-group shadow-sm border border-light rounded-3 overflow-hidden">
          <span class="input-group-text bg-light border-0"><i class="fas fa-door-open text-muted"></i></span>
          <input 
            type="text" 
            v-model="form.name" 
            @keydown.enter.prevent="handleCreateRoom"
            class="form-control border-0 shadow-none px-2 focus-ring-emerald" 
            placeholder="ឧទាហរណ៍៖ គណិតវិទ្យា - ថ្នាក់ទី ១០" 
            style="font-size: .95rem; background: #fafbfc;"
          >
        </div>
      </div>
    </div>

    <template #footer>
      <button class="btn btn-light rounded-3 fw-bold px-4" @click="handleClose">បោះបង់</button>
      <button 
        class="btn text-white rounded-3 fw-bold px-4 shadow-sm" 
        style="background: linear-gradient(135deg, #10b981, #059669);" 
        @click="handleCreateRoom" 
        :disabled="createLoading || !form.name.trim()"
      >
        <i class="fas fa-spinner fa-spin me-1" v-if="createLoading"></i>
        <i class="fas fa-check-circle me-1" v-else></i>
        បង្កើតថ្នាក់រៀន
      </button>
    </template>
  </BaseModal>
</template>
  
<script setup>
import { ref, reactive } from 'vue';
import { createRoom } from '@/api/teacher.api';
import { useToast } from 'vue-toastification'

const toast = useToast()
defineProps({
  isOpen: { type: Boolean, required: true }
});

const emit = defineEmits(['close', 'created']);
const createLoading = ref(false);
const form = reactive({ name: '' });

const handleCreateRoom = async () => {
  if (!form.name.trim()) return;

  const isDuplicate = existingRooms.value.some(
    room => room.name.trim().toLowerCase() === form.name.trim().toLowerCase()
  )
  if (isDuplicate) {
    toast.error("ឈ្មោះបន្ទប់នេះមានរួចហើយ! សូមប្រើឈ្មោះផ្សេង។")
    return
  }

  try {
    createLoading.value = true;
    const res = await createRoom({ name: form.name.trim() });
    const newRoomData = res.data?.data || res.data;
    emit('created', newRoomData);
    handleClose();
  } catch (err) {
    toast.error("មានបញ្ហាក្នុងការបង្កើតថ្នាក់រៀន សូមព្យាយាមម្ដងទៀត។")
  } finally {
    createLoading.value = false;
  }
};

const handleClose = () => {
  form.name = '';
  emit('close');
};
</script>

<style scoped>
.btn-emerald { background: #10b981; color: white; border-radius: 10px; transition: background 0.2s; }
.btn-emerald:hover:not(:disabled) { background: #059669; }
.invited-section { background: #f8fafc; border: 1px solid #e2e8f0; max-height: 120px; overflow-y: auto; }
.email-chip { background: white; border: 1px solid #e2e8f0; color: #0f172a; font-size: 0.85rem; }
.focus-ring-emerald:focus { border-color: #10b981 !important; box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.15) !important; }
</style>