<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="isOpen"
        class="glass-modal-overlay"
        @click.self="$emit('close')"
      >
        <Transition name="zoom">
          <div v-if="isOpen" class="glass-box" :style="{ maxWidth: width }">
            <!-- HEADER -->
            <div class="glass-header">
              <slot name="header">
                <div>
                  <div v-if="tag" class="glass-tag">{{ tag }}</div>
                  <h3>{{ title }}</h3>
                  <p v-if="subtitle">{{ subtitle }}</p>
                </div>
              </slot>
              <button class="glass-close" @click="$emit('close')">
                <i class="bi bi-x-lg"></i>
              </button>
            </div>

            <!-- BODY -->
            <div class="glass-body">
              <slot></slot>
            </div>

            <!-- FOOTER -->
            <div v-if="$slots.footer" class="glass-footer">
              <slot name="footer"></slot>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
defineProps({
  isOpen: { type: Boolean, required: true },
  title: { type: String, default: "Modal Title" },
  subtitle: { type: String, default: "" },
  tag: { type: String, default: "" },
  width: { type: String, default: "500px" },
});

defineEmits(["close"]);
</script>

<style scoped>
.glass-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(15, 23, 42, 0.45);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.glass-box {
  width: 100%;
  max-width: 520px;
  background: rgba(255, 255, 255, 0.92);
  border-radius: 20px;
  box-shadow: 0 25px 70px rgba(0, 0, 0, 0.18);
  overflow: hidden;
}

.glass-header {
  padding: 18px 20px;
  background: linear-gradient(135deg, #3fba7f, #00c67a);
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.glass-tag {
  font-size: 10px;
  letter-spacing: 2px;
  opacity: 0.85;
  font-weight: 700;
}

.glass-header h3 {
  margin: 4px 0 0;
  font-size: 22px;
  font-weight: 800;
}

.glass-header p {
  margin: 3px 0 0;
  font-size: 12px;
  opacity: 0.9;
}

/* ROLE CHIPS */
.role-chips {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.chip {
  padding: 8px 12px;
  border-radius: 999px;
  border: 1.5px solid #dbe7e0;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  background: #fff;
  transition: 0.2s;
}

.chip i {
  font-size: 14px;
}

.chip.active {
  background: #e8f8f0;
  border-color: #3fba7f;
  color: #2a9d6a;
}

/* FOOTER */
.glass-footer {
  padding: 14px 20px;
  border-top: 1px solid #eef6f1;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.btn-cancel {
  height: 44px;
  padding: 0 18px;
  border-radius: 12px;
  border: 1.5px solid var(--green-mid);
  background: white;
  font-weight: 700;
}

.btn-create {
  height: 42px;
  padding: 0 18px;
  border-radius: 10px;
  border: none;
  background: linear-gradient(135deg, #3fba7f, #00c67a);
  color: #fff;
  font-weight: 800;
  box-shadow: 0 10px 20px rgba(63, 186, 127, 0.2);
}

/* glass responsive */
@media (max-width: 600px) {
  .glass-grid {
    grid-template-columns: 1fr;
  }

  .glass-field.full {
    grid-column: auto;
  }
}

/* Animations */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.zoom-enter-active,
.zoom-leave-active {
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.zoom-enter-from,
.zoom-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
