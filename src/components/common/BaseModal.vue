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
            
            <div v-if="title !== 'Modal Title' || subtitle || tag || $slots.header" class="glass-header">
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

            <button v-else class="glass-close-minimal" @click="$emit('close')">
              <i class="fas fa-times"></i>
            </button>

            <div class="glass-body">
              <slot></slot>
            </div>

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
  title: { type: String, default: "Modal Title" }, // បើមិនបោះ title មក វានឹងដឹងខ្លួនលាក់ Header
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
  background: rgba(15, 23, 42, 0.4); /* បន្ថយពណ៌ងងឹតឱ្យមើលទៅស្រាលភ្នែក */
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.glass-box {
  width: 100%;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 24px; /* បង្កើនភាពមូលស្អាតបែប Modern */
  box-shadow: 0 25px 70px rgba(15, 23, 42, 0.12); /* ស្រមោលបែបស្រាល Soft Shadow */
  overflow: hidden;
  position: relative;
  transition: all 0.3s ease;
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

.glass-close {
  background: none;
  border: none;
  color: #fff;
  font-size: 1.2rem;
  cursor: pointer;
  opacity: 0.8;
  transition: 0.2s;
}
.glass-close:hover {
  opacity: 1;
}

/* 💡 ប៊ូតុងខ្វែងខ្នាតតូចសម្រាប់ម៉ូដគ្មាន Header */
.glass-close-minimal {
  position: absolute;
  top: 16px;
  right: 16px;
  background: #f1f5f9;
  border: none;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  color: #64748b;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s;
  z-index: 10;
}
.glass-close-minimal:hover {
  background: #e2e8f0;
  color: #1e293b;
}

.glass-body {
  padding: 24px; /* បន្ថែមគម្លាតខាងក្នុងឱ្យមើលទៅ Clean */
}

/* FOOTER */
.glass-footer {
  padding: 14px 20px;
  border-top: 1px solid #eef6f1;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
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