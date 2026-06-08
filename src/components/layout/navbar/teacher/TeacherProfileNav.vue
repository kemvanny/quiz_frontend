<template>
    <div class="main-content">
        <div class="topbar">
            <div class="d-flex align-items-center gap-3 flex-grow-1">
                <button class="btn btn-light d-lg-none shadow-sm p-1 px-2 flex-shrink-0" data-bs-toggle="offcanvas"
                    data-bs-target="#sidebarMenu">
                    <i class="fas fa-bars"></i>
                </button>
                <div style="min-width: 0;">
                    <h4 class="m-0 fw-bold text-dark fs-5 text-truncate">{{ title }}</h4>
                </div>
            </div>

            <div class="profile-pill flex-shrink-0 pe-2">
                <img :src="authStore.avatarUrl" alt="avatar" class="profile-ava" />
                
                <div class="d-none d-sm-flex flex-column justify-content-center" style="line-height: 1.1;">
                    <span class="fw-bold" style="font-size: .8rem; color: var(--txt);">
                        {{ authStore.fullName }}
                    </span>
                    <span style="font-size: .65rem; color: var(--txt-mu); font-weight: 500;">Instructor</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
defineProps(({
    title: { type: String, default: 'ការកំណត់គណនី' }
}))

const authStore = useAuthStore();

onMounted(() => {
  authStore.fetchUserProfile();
});
</script>

<style>
.profile-pill {
      display: flex; align-items: center; gap: 8px;
      padding: 5px 10px 5px 5px;
      border-radius: var(--r-lg);
      border: 1.5px solid var(--bdr);
      cursor: pointer; transition: .17s;
      background: #fff;
    }
    .profile-pill:hover { border-color: #cbd5e1; box-shadow: var(--sh-sm); }
    .profile-ava { width: 30px; height: 30px; border-radius: 8px; object-fit: cover; border: 1.5px solid var(--em-mid); }

</style>