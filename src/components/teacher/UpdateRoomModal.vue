<template>
  <BaseModal
    :is-open="isOpen"
    title="កែប្រែព័ត៌មានថ្នាក់"
    subtitle="ផ្លាស់ប្តូរ ឬធ្វើបច្ចុប្បន្នភាពឈ្មោះបន្ទប់សិក្សារបស់អ្នក។"
    tag="ការគ្រប់គ្រងថ្នាក់រៀន"
    width="550px"
    @close="$emit('close')"
  >
    <div class="glass-body p-4">
      <div class="mb-2">
        <label class="form-label small fw-bold text-muted text-uppercase" style="letter-spacing: .5px;">
          ឈ្មោះបន្ទប់ថ្មី <span class="text-danger">*</span>
        </label>
        <div class="input-group shadow-sm border border-light rounded-3 overflow-hidden">
          <span class="input-group-text bg-light border-0">
            <i class="fas fa-edit text-muted"></i>
          </span>
          <input 
            type="text" 
            v-model="form.name" 
            class="form-control border-0 shadow-none px-2 focus-ring-emerald" 
            placeholder="ឧទាហរណ៍៖ គណិតវិទ្យា - ថ្នាក់ទី ១១" 
            style="font-size: .95rem; background: #fafbfc;"
          >
        </div>
      </div>
    </div>

    <template #footer>
      <button class="btn btn-light rounded-3 fw-bold px-4" @click="$emit('close')">បោះបង់</button>
      <button 
        class="btn text-white rounded-3 fw-bold px-4 shadow-sm" 
        style="background: linear-gradient(135deg, #10b981, #059669);" 
        @click="handleUpdateRoom" 
        :disabled="loading || !form.name.trim()"
      >
        <i class="fas fa-spinner fa-spin me-1" v-if="loading"></i>
        <i class="fas fa-save me-1" v-else></i>
        រក្សាទុក
      </button>
    </template>
  </BaseModal>
</template>

<script setup>
import { ref, reactive, watch } from 'vue';
import { updateRoom } from '@/api/teacher.api';

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  },
  roomData: {
    type: Object,
    default: () => ({ id: null, name: '' })
  }
});

const emit = defineEmits(['close', 'updated']);
const loading = ref(false);

const form = reactive({
  name: ''
});

// តាមដានរាល់ពេលបើក Modal ឱ្យវាចាប់យកឈ្មោះបន្ទប់ចាស់មកបំពេញក្នុង Input ភ្លាមៗ
watch(() => props.isOpen, (newVal) => {
  if (newVal && props.roomData) {
    form.name = props.roomData.name || '';
  }
});

const handleUpdateRoom = async () => {
  if (!form.name.trim()) return;

  try {
    loading.value = true;
    
    // ហៅទៅកាន់ Endpoint: PUT /api/teacher/rooms/:id
    await updateRoom(props.roomData.id, { name: form.name.trim() });

    // ផ្ញើ Event ទៅកាន់ Parent Component ដើម្បី Reload បញ្ជីបន្ទប់ឡើងវិញ
    emit('updated');
    emit('close');
  } catch (err) {
    console.error("Update room error:", err);
    alert("មានបញ្ហាក្នុងការកែប្រែថ្នាក់រៀន សូមព្យាយាមម្ដងទៀត។");
  } finally {
    loading.value = false;
  }
};
</script>