<template>
  <div class="main-content">
    <div class="topbar ">
      <slot name="left"></slot>
      <slot name="right"></slot>
    </div>
  </div>
</template>

<!-- <script setup>
import { computed } from 'vue';

const props = defineProps({
  searchPlaceholder: {
    type: String,
    default: 'ស្វែងរក....'
  },
  userName: {
    type: String,
    default: 'គណនីប្រើប្រាស់'
  },
  userRole: {
    type: String,
    default: 'សមាជិក'
  }
})

const avatarUrl = computed(() => {
  const formattedName = props.userName.trim().replace(/\s+/g, '+')
  return `https://ui-avatars.com/api/?name=${formattedName}&background=3fba7f&color=fff&bold=true`
})
</script> -->
