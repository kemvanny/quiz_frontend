<template>
  <div class="modal-overlay" v-if="isOpen">
    <div class="clean-modal">
      <div class="icon-box">
        <i class="fas fa-trash-alt"></i>
      </div>

      <h4 class="title">លុបសិស្សចេញពីថ្នាក់?</h4>

      <p class="message">
        តើអ្នកពិតជាចង់លុប
        <strong>
          {{ student?.first_name || "" }} {{ student?.last_name || "" }}
        </strong>
        ចេញពីថ្នាក់នេះមែនទេ?
        សកម្មភាពនេះមិនអាចលុបចោលបានទេ។
      </p>

      <div class="actions">
        <button class="btn-cancel" @click="$emit('close')">
          បោះបង់
        </button>

        <button
          class="btn-remove"
          @click="$emit('confirm')"
          :disabled="loading"
        >
          {{ loading ? "កំពុងលុប..." : "លុបសិស្ស" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  isOpen: Boolean,
  student: Object,
  loading: Boolean
});

defineEmits(["close", "confirm"]);
</script>

<style scoped>
.modal-overlay {
  position: fixed; inset: 0; background: rgba(0,0,0,0.4);
  display: flex; align-items: center; justify-content: center; z-index: 1050;
}
.clean-modal {
  background: white; padding: 2rem; border-radius: 16px;
  width: 100%; max-width: 400px; text-align: center;
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
}
.icon-box {
  width: 50px; height: 50px; background: #fff5f5; color: #e53e3e;
  display: flex; align-items: center; justify-content: center;
  border-radius: 50%; margin: 0 auto 1rem; font-size: 1.25rem;
}
.title { font-weight: 700; margin-bottom: 0.5rem; }
.message { color: #666; font-size: 0.95rem; margin-bottom: 1.5rem; }
.actions { display: flex; gap: 10px; }
.btn-cancel { flex: 1; padding: 10px; border: 1px solid #ddd; background: #f9f9f9; border-radius: 8px; }
.btn-remove { flex: 1; padding: 10px; border: none; background: #e53e3e; color: white; border-radius: 8px; }
</style>