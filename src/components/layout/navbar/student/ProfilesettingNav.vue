<template>
  <div class="main-content">
    <div class="topbar">
      <h4
        class="m-0 fw-bold"
        style="font-size: 1.3rem; color: var(--txt); letter-spacing: -0.3px"
      >
        Account Settings
      </h4>

      <div
        class="d-flex align-items-center gap-2 p-1 pe-3 rounded-pill"
        style="
          border: 1px solid var(--em-soft);
          background: var(--em-soft);
          cursor: pointer;
          transition: 0.2s;
        "
      >
        <img
          :src="`${imgBaseUrl}${authStore.profile?.avatar}`"
          alt="avatar"
          style="
            width: 36px;
            height: 36px;
            border-radius: 50%;
            object-fit: cover;
            border: 2px solid #fff;
          "
        />
        <div
          class="d-flex flex-column justify-content-center"
          style="line-height: 1.1"
        >
          <span class="fw-bold" style="font-size: 0.85rem; color: var(--em-dk)">
            {{ authStore.profile?.firstName }} {{ authStore.profile?.lastName }}
          </span>
          <span style="font-size: 0.7rem; color: var(--em); font-weight: 600">
            {{ authStore.profile?.role }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from "@/stores/authStore"; 
import { onMounted } from "vue";

const imgBaseUrl = import.meta.env.VITE_BASE_URL_FOR_IMAGE;
const authStore = useAuthStore();

onMounted(async () => {
  await authStore.fetchProfile();
});
</script>