<template>
  <span :class="['badge-custom', badgeConfig.class]">
    {{ badgeConfig.text }}
  </span>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  type: { type: String, required: true }, 
});

const badgeConfig = computed(() => {
  const val = props.type?.toLowerCase();
  
  const configs = {
    // Status
    active: { class: 'status-active', text: 'Active' },
    draft: { class: 'status-draft', text: 'Draft' },
    closed: { class: 'status-closed', text: 'Closed' },
    inactive: { class: 'status-closed', text: 'Inactive' },
    
    // Role
    admin: { class: 'role-admin', text: 'Admin' },
    teacher: { class: 'role-teacher', text: 'Teacher' },
    student: { class: 'role-student', text: 'Student' }
  };

  return configs[val] || { class: 'badge-default', text: props.type };
});
</script>

<style scoped>
.badge-custom {
  padding: 4px 12px;
  border-radius: 50px;
  font-weight: 600;
  font-size: 13px;
  display: inline-block;
  text-align: center;
}

.status-active { background-color: #e6f7ed; color: #26a269; }
.status-draft { background-color: #fff9db; color: #f59f00; }
.status-closed { background-color: #ffeef0; color: #fa5252; }

.role-admin { background-color: #ffe6e6; color: #ff4d4d; }
.role-teacher { background-color: #e6f0ff; color: #3385ff; }
.role-student { background-color: #f0f0f0; color: #666666; }
.badge-default { background-color: #eeeeee; color: #333333; }
</style>