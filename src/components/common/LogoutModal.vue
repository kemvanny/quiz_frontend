<template>
  <Teleport to="body">
    <div v-if="show">
      <div class="modal-backdrop fade show"></div>

      <div class="modal fade show d-block" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-dialog-centered modal-sm" role="document">
          <div class="modal-content border-0 shadow rounded-4 p-3 animate-pop">
            <div class="modal-body text-center">
              <div class="text-danger mb-3">
                <i class="bi bi-box-arrow-right" style="font-size: 3rem;"></i>
              </div>

              <h5 class="fw-bold text-dark mb-2">ចាកចេញពីប្រព័ន្ធ?</h5>
              <p class="text-muted small mb-4">តើបងពិតជាចង់ចាកចេញពីគណនី Pralong {{ title }} នេះមែនទេ?</p>

              <div class="d-flex gap-2 justify-content-center">
                <button type="button" class="btn btn-light rounded-3 w-50 fw-semibold text-muted" @click="$emit('close')">
                  បោះបង់
                </button>
                <button type="button" class="btn btn-logout rounded-3 w-75 fw-semibold text-white"
                  @click="$emit('confirm')" :disabled="isLoading">
                  <span v-if="isLoading" style="font-size: 16px;">
                    <i class="fas fa-spinner fa-spin"></i>ចាកចេញ...
                  </span>
                  <span v-else>ចាកចេញ</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
defineProps({
  show: { type: Boolean, required: true },
  title: { type: String },
  isLoading: { type: Boolean, default: false }
});

defineEmits(['close', 'confirm']);
</script>

<style scoped>
.modal-backdrop {
  background-color: rgba(15, 23, 42, 0.874);
  z-index: 9998; 
}

.modal.show {
  z-index: 9999;
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

.animate-pop {
  animation: modalPop 0.25s ease-out;
}

@keyframes modalPop {
  0% {
    transform: scale(0.9);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>