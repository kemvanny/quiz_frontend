<template>
    <div>
        <button :class="['btn-green',extraClass]" :type="type"  @click="$emit('click')">
            <slot></slot>
        </button>
    </div>
</template>

<script setup>
defineProps({
    type: {
        type: String,
        default :'button'
    },
    extraClass: {
        type: String,
        default : ''
    }

})
defineEmits(['click']);
</script>
<style scoped>

.btn-green {
  background-color: var(--green-primary);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: 600;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.btn-green:hover {
  background-color: var(--green-dark);
  transform: translateY(-1px);
}
</style>