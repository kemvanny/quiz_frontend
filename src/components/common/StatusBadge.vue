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
  const val = props.type?.toString().trim().toLowerCase();


  const configs = {
    // Status
    active: { class: 'status-active', text: 'ដំណើរការ' },
    draft: { class: 'status-draft', text: 'ពិនិត្យ' },
    closed: { class: 'status-closed', text: 'បិទ' },
    inactive: { class: 'status-closed', text: 'ផ្អាកដំណើរការ' },

    confirmed: { class: 'status-confirmed', text: 'បានបញ្ជាក់' },
    pending: { class: 'status-pending', text: 'រង់ចាំពិនិត្យ' },
    graded:{class: 'status-graded', text: 'កែរួចរាល់'},
    // Role
    admin: { class: 'role-admin', text: 'អ្នកគ្រប់គ្រង' },
    teacher: { class: 'role-teacher', text: 'គ្រូបង្រៀន' },
    student: { class: 'role-student', text: 'សិស្ស' }
  };

  return configs[val] || { class: 'badge-default', text: props.type };
});
</script>

<style scoped>
.badge-custom {
  padding: 4px 12px;
  border-radius: 50px;
  font-weight: 600;
  font-size: 12px;
  display: inline-block;
  text-align: center;
  letter-spacing: 0.2px;
  backdrop-filter: blur(4px);
}

.status-active { 
  background: linear-gradient(135deg, rgba(232, 245, 233, 0.4) 0%, rgba(200, 230, 201, 0.4) 100%); 
  color: #2e7d32;
}
.status-closed { 
  background: linear-gradient(135deg, rgba(255, 235, 238, 0.4) 0%, rgba(255, 205, 210, 0.4) 100%); 
  color: #c62828;
}


.status-confirmed { 
  background: linear-gradient(135deg, rgba(224, 242, 254, 0.45) 0%, rgba(186, 230, 253, 0.45) 100%); 
  color: #0369a1;
}


.status-pending { 
  background: linear-gradient(135deg, rgba(255, 243, 224, 0.45) 0%, rgba(255, 224, 178, 0.45) 100%); 
  color: #b75100;
}

.status-draft { 
  background: linear-gradient(135deg, rgba(255, 253, 231, 0.4) 0%, rgba(255, 249, 196, 0.4) 100%); 
  color: #f57f17;
}

.role-admin { 
  background: linear-gradient(135deg, rgba(243, 229, 245, 0.45) 0%, rgba(225, 190, 231, 0.45) 100%); 
  color: #6b21a8;
}

.role-teacher { 
  background: linear-gradient(135deg, rgba(232, 234, 246, 0.45) 0%, rgba(197, 202, 233, 0.45) 100%); 
  color: #1a237e;
}

.role-student { 
  background: linear-gradient(135deg, rgba(224, 247, 250, 0.45) 0%, rgba(178, 235, 242, 0.45) 100%); 
  color: #006064;
}

.status-graded { 
  background: linear-gradient(135deg, rgba(232, 245, 233, 0.4) 0%, rgba(200, 230, 201, 0.4) 100%); 
  color: #2e7d32;
}

.badge-default { 
  background: linear-gradient(135deg, rgba(245, 245, 245, 0.5) 0%, rgba(224, 224, 224, 0.5) 100%); 
  color: #616161;
}
</style>