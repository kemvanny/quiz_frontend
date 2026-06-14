<template>
    <div class="main-content">
        <div class="topbar">
            <div class="d-flex align-items-center gap-2 flex-grow-1" style="min-width: 0;">
                <button class="btn btn-light d-lg-none shadow-sm flex-shrink-0" data-bs-toggle="offcanvas"
                    data-bs-target="#sidebarMenu">
                    <i class="fas fa-bars"></i>
                </button>

                <div class="d-flex align-items-center gap-2 p-2 rounded-pill flex-grow-1"
                    style="border: 1px solid var(--bdr); background: #ffffff; max-width: 380px; box-shadow: var(--sh-sm); transition: .2s;"
                    onfocusin="this.style.borderColor='var(--em)'" onfocusout="this.style.borderColor='var(--bdr)'">
                    <i class="fas fa-search text-muted ms-2"></i>
                    <input type="text" class="border-0 bg-transparent shadow-none w-100 ms-2"
                        style="outline: none; font-size: 0.85rem; color: var(--txt); min-width: 0Parent;"
                        placeholder="ស្វែងរកការប្រឡង...">
                </div>
            </div>
            <div class="d-flex align-items-center gap-2 p-1 pe-2 rounded-pill flex-shrink-0"
                style="border: 1px solid var(--bdr); background: #ffffff; cursor: pointer; transition: .2s; box-shadow: var(--sh-sm);"
                onmouseover="this.style.borderColor='#cbd5e1'; this.style.boxShadow='0 4px 12px rgba(0,0,0,.05)'"
                onmouseout="this.style.borderColor='var(--bdr)'; this.style.boxShadow='var(--sh-sm)'">

                <img :src="authStore.avatarUrl" alt="avatar" style="width: 32px; height: 32px; border-radius: 50%; object-fit: cover;" />
            </div>        
                
                <div class="d-none d-sm-flex flex-column justify-content-center pe-2" style="line-height: 1.1;">
                    <span class="fw-bold" style="font-size: .8rem; color: var(--txt);">{{ authStore.fullName }}</span>
                    <span style="font-size: .65rem; color: var(--txt-mu); font-weight: 500;">Instructor</span>
                </div>
            </div>
        </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth'; 

const authStore = useAuthStore();

onMounted(() => {
  authStore.fetchUserProfile();
});
</script>