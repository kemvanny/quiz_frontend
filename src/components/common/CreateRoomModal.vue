<template>
  <BaseModal
    :is-open="isOpen"
    title="បង្កើតថ្នាក់រៀនថ្មី"
    subtitle="រៀបចំបង្កើតបន្ទប់សិក្សាសម្រាប់សិស្សរបស់អ្នក។"
    tag="ការគ្រប់គ្រងថ្នាក់រៀន"
    width="550px"
    @close="$emit('close')"
  >
    <div class="glass-body p-4">
      <div class="mb-4">
        <label class="form-label small fw-bold text-muted text-uppercase" style="letter-spacing: .5px;">ឈ្មោះបន្ទប់ <span class="text-danger">*</span></label>
        <div class="input-group shadow-sm border border-light rounded-3 overflow-hidden">
          <span class="input-group-text bg-light border-0"><i class="fas fa-door-open text-muted"></i></span>
          <input type="text" v-model="form.name" class="form-control border-0 shadow-none px-2 focus-ring-emerald" placeholder="ឧទាហរណ៍៖ គណិតវិទ្យា - ថ្នាក់ទី ១០" style="font-size: .95rem; background: #fafbfc;">
        </div>
      </div>

      <div class="mb-4">
        <label class="form-label small fw-bold text-muted text-uppercase" style="letter-spacing: .5px;">អញ្ជើញសិស្ស (អ៊ីមែល)</label>
        <textarea v-model="form.studentEmails" class="form-control border-light shadow-sm shadow-none px-3 py-2 focus-ring-emerald" rows="3" placeholder="វាយបញ្ចូលអ៊ីមែលសិស្ស (ឧទាហរណ៍៖ sok@gmail.com, dara@gmail.com...)" style="font-size: .95rem; background: #fafbfc; resize: none;"></textarea>
      </div>

      <div class="p-3 border rounded-3 bg-light d-flex gap-3 align-items-center mt-2">
        <div class="flex-shrink-0">
          <div class="rounded-circle d-flex align-items-center justify-content-center shadow-sm" style="width: 42px; height: 42px; background: #eff6ff; color: #3b82f6;">
            <i class="fas fa-link"></i>
          </div>
        </div>
        <div>
          <div class="fw-bold" style="font-size: .85rem; color: var(--txt);">តំណភ្ជាប់សម្រាប់ចូលថ្នាក់រៀន</div>
          <div class="text-muted" style="font-size: .75rem;">កូដសម្រាប់ចូលរួមថ្នាក់រៀនជាក់លាក់មួយនឹងត្រូវបានបង្កើតឡើងដោយស្វ័យប្រវត្តិកោរយពេលបង្កើតរួចរាល់ ដើម្បីងាយស្រួលក្នុងការចែករំលែកទៅកាន់សិស្ស។</div>
        </div>
      </div>
    </div>

    <template #footer>
      <button class="btn btn-light rounded-3 fw-bold px-4" @click="$emit('close')">បោះបង់</button>
      <button class="btn text-white rounded-3 fw-bold px-4 shadow-sm" style="background: linear-gradient(135deg, #10b981, #059669);" @click="handleCreateRoom" :disabled="loading">
        <i class="fas fa-spinner fa-spin me-1" v-if="loading"></i>
        <i class="fas fa-check-circle me-1" v-else></i>
        បង្កើតថ្នាក់រៀន
      </button>
    </template>
  </BaseModal>
</template>
  
  <script setup>
  import { ref, reactive } from 'vue';
  import { createRoom, inviteStudent } from '@/api/teacher.api';
  import BaseModal from './BaseModal.vue';
  
  const props = defineProps({
    isOpen: {
      type: Boolean,
      required: true
    }
  });
  
  const emit = defineEmits(['close', 'created']);
  
  const loading = ref(false);
  
  const form = reactive({
    name: '',
    studentEmails: ''
  });
  
  const handleCreateRoom = async () => {
    if (!form.name.trim()) {
        alert("សូមបញ្ចូលឈ្មោះបន្ទប់!");
        return;
    }
  
    try {
        loading.value = true;
        
        // 1. Endpoint: POST Create Room 
        const roomRes = await createRoom({ name: form.name.trim() });
        const newRoomId = roomRes.data?.data?.id || roomRes.data?.id || "N/A";
  
        // 2. Endpoint: POST Invite Student (Via Email)
        if (form.studentEmails.trim() && newRoomId !== "N/A") {
            const emails = form.studentEmails.split(',').map(e => e.trim()).filter(e => e);
            if (emails.length > 0) {
                // You can restructure the payload { room_id, emails } perfectly matching your backend requirement
                try {
                    await inviteStudent({ room_id: newRoomId, emails: emails });
                } catch(e) {
                    console.log("Invite failed but room created.", e);
                }
            }
        }
  
        // Emit event to notify parent (like TeacherSidebar or a global state manager)
        emit('created', { name: form.name, invitedEmails: form.studentEmails, roomId: newRoomId });
        
        // Reset form setup for next time
        form.name = '';
        form.studentEmails = '';
        
        emit('close');
    } catch(err) {
        console.error("Create room error:", err);
        alert("មានបញ្ហាក្នុងការបង្កើតថ្នាក់រៀន សូមព្យាយាមម្ដងទៀត។");
    } finally {
        loading.value = false;
    }
  };
  </script>
