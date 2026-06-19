<template>
  <div class="main-content">
    <div class="topbar">
      <div class="d-flex align-items-center gap-3">
        <div class="icon-box">
          <i class="bi bi-person-circle"></i> </div>
        <div class="welcome-meta">
          <div class="fw-bold" style="font-size:1.15rem;color:var(--txt);letter-spacing:-0.3px;line-height:1.1;">
            សូមស្វាគមន៍, {{ authStore.profile?.lastName }} {{ authStore.profile?.firstName }}
          </div>
          <div  style="font-size:0.78rem;color:var(--txt-mu);font-weight:600;">
            របាយការណ៍សិក្សាបច្ចុប្បន្នរបស់អ្នក
          </div>
        </div>
      </div>

      <BaseProfile />
    </div>
  </div>
</template>

<script setup>
import BaseProfile from "@/components/common/BaseProfile.vue";
import { useAuthStore } from "@/stores/authStore";
import { onMounted } from "vue";
const authStore = useAuthStore();

onMounted(async () => {
    await authStore.fetchProfile();
});
</script>
<style scoped>

.icon-box {
  width: 44px;
  height: 44px;
  border-radius: 13px;
  background: #f0fff4; 
  color: #38a169;      
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
}
</style>