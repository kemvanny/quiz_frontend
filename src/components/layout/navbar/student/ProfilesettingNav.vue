<template>
  <div class="main-content">
    <div class="topbar">
      <div class="d-flex align-items-center gap-3">
        <div
          style="width:42px;height:42px;border-radius:12px;background:var(--em-soft);color:var(--em);display:flex;align-items:center;justify-content:center;font-size:1.1rem;">
          <i class="fas fa-user"></i>
        </div>
        <div>
          <div class="fw-bold" style="font-size:1.1rem;color:var(--txt);line-height:1.1;">ព័ត៌មានផ្ទាល់ខ្លួន</div>
          <div style="font-size:0.75rem;color:var(--txt-mu);font-weight:600;">ពិនិត្យ និងកែប្រែព័ត៌មានគណនីរបស់អ្នក</div>
        </div>
      </div>

      <BaseProfile />
    </div>
  </div>
</template>

<script setup>
import BaseProfile from "@/components/common/BaseProfile.vue";
</script>