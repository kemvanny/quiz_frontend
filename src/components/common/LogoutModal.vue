<template>
  <div v-if="show" class="modal-backdrop fade show"></div>

  <div v-if="show" class="modal fade show d-block" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-dialog-centered modal-sm" role="document">
      <div class="modal-content border-0 shadow rounded-4 p-3 animate-pop">
        <div class="modal-body text-center">
          <div class="text-danger mb-3">
            <i class="bi bi-box-arrow-right" style="font-size: 3rem;"></i>
          </div>
          
          <h5 class="fw-bold text-dark mb-2" style="font-family: 'Kantumruuy Pro', sans-serif;">ចាកចេញពីប្រព័ន្ធ?</h5>
          <p class="text-muted small mb-4">តើបងពិតជាចង់ចាកចេញពីគណនីភ្នំពេញ Pralong Admin នេះមែនទេ?</p>

          <div class="d-flex gap-2 justify-content-center">
            <button type="button" class="btn btn-light rounded-3 w-50 fw-semibold text-muted" @click="$emit('close')">
              បោះបង់
            </button>
            <button type="button" class="btn btn-logout rounded-3 w-50 fw-semibold text-white" @click="$emit('confirm')">
              ចាកចេញ
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  show: { type: Boolean, required: true }
});

defineEmits(['close', 'confirm']);
</script>

<style scoped>

.modal-backdrop {
  background-color: rgba(15, 23, 42, 0.4); 
  backdrop-filter: blur(4px);
}

.btn-logout {
  background-color: #dc3545; 
  transition: all 0.2s ease;
}
.btn-logout:hover {
  background-color: #bd2130;
  box-shadow: 0 4px 6px -1px rgba(220, 53, 69, 0.2);
}

.btn-light {
  background-color: #f1f5f9;
  border: 1px solid #e2e8f0;
}
.btn-light:hover {
  background-color: #e2e8f0;
}

/* Effect ពេល Modal លោតចេញមក */
.animate-pop {
  animation: modalPop 0.25s ease-out;
}

@keyframes modalPop {
  0% { transform: scale(0.9); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}
</style>