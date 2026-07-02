<template>
  <BaseModal
    :is-open="isOpen"
    title="លុបថ្នាក់រៀន"
    subtitle="សូមប្រាកដប្រជាមុននឹងធ្វើការសម្រេចចិត្តលុបថ្នាក់រៀននេះ។"
    tag="ការព្រមានប្រព័ន្ធ"
    width="480px"
    @close="$emit('close')"
  >
    <div class="glass-body p-4 text-center">
      <div
        class="d-flex align-items-center justify-content-center mx-auto mb-3 rounded-circle bg-danger-light"
        style="width: 60px; height: 60px"
      >
        <i class="fas fa-exclamation-triangle text-danger fs-3"></i>
      </div>

      <h5 class="fw-bold text-dark mb-2">
        តើអ្នកពិតជាចង់លុបថ្នាក់រៀននេះមែនទេ?
      </h5>
      <p class="text-muted small mb-0 px-2" style="line-height: 1.5">
        ការលុបថ្នាក់រៀន
        <strong class="text-danger">"{{ roomData?.name }}"</strong>
        នឹងធ្វើឱ្យរាល់ទិន្នន័យសិក្សា
        និងបញ្ជីឈ្មោះសិស្សទាំងអស់នៅក្នុងថ្នាក់នេះត្រូវបាត់បង់ជារៀងរហូត
        ដោយមិនអាចទាញយកមកវិញបានឡើយ។
      </p>
    </div>

    <template #footer>
      <button
        class="btn btn-light rounded-3 fw-bold px-4"
        @click="$emit('close')"
        :disabled="loading"
      >
        បោះបង់
      </button>
      <button
        class="btn btn-danger rounded-3 fw-bold px-4 shadow-sm"
        @click="handleDeleteRoom"
        :disabled="loading"
      >
        <i class="fas fa-spinner fa-spin me-1" v-if="loading"></i>
        <i class="fas fa-trash-alt me-1" v-else></i>
        យល់ព្រមលុប
      </button>
    </template>
  </BaseModal>
</template>

<script setup>
import { ref } from 'vue';
import { deleteRoomApi } from '@/api/teacher.api';

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

const emit = defineEmits(['close', 'deleted']);
const loading = ref(false);

const handleDeleteRoom = async () => {
  if (!props.roomData?.id) return;

  try {
    loading.value = true;
    await deleteRoomApi(props.roomData.id);

    emit('deleted');
    emit('close');
  } catch (err) {
 
  alert(err.response?.data?.message || "Delete failed");
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.bg-danger-light {
  background-color: #fef2f2;
}
</style>
