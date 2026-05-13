<!-- SearchFilter.vue -->
<template>
  <div class="dash-card mb-3">
    <div class="row g-2 align-items-center">
      <div class="col-md-4">
        <div class="input-group">
          <span class="input-group-text bg-white border-end-0" style="border: 1.5px solid var(--green-mid); border-radius: 10px 0 0 10px;">
            <i class="bi bi-search" style="color: var(--text-muted)"></i>
          </span>
          <input 
            type="text" 
            class="form-control border-start-0" 
            :placeholder="placeholder"
            style="border-radius: 0 10px 10px 0"
            @input="$emit('update:search', $event.target.value)"
          />
        </div>
      </div>
      
      <!-- Slot សម្រាប់ដាក់ Filter បន្ថែមតាម Page នីមួយៗ (ដូចជា select role ឬ status) -->
      <slot name="filters"></slot>
      <slot name="status"></slot>
      
      <div class="col text-end">
        <slot name="right-side"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  placeholder: { type: String, default: 'ស្វែងរក...' }
});
defineEmits(['update:search']);
</script>