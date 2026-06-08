<template>
    <div class="main-content">
        <div class="topbar">
            <div class="d-flex align-items-center gap-3 flex-grow-1" style="min-width: 0;">
                <button class="btn btn-light d-lg-none shadow-sm p-1 px-2 flex-shrink-0" data-bs-toggle="offcanvas"
                    data-bs-target="#sidebarMenu">
                    <i class="fas fa-bars"></i>
                </button>
                <a href="6.te-room-mana.html"
                    class="btn btn-sm btn-light border shadow-sm rounded-3 d-flex align-items-center justify-content-center flex-shrink-0"
                    style="width: 34px; height: 34px;">
                    <i class="fas fa-arrow-left text-muted"></i>
                </a>
                <div class="search-bar mb-0 flex-grow-1 d-none d-sm-flex" style="min-width: 0;">
                    <i class="fas fa-search text-muted"></i>
                    <input type="text" placeholder="ស្វែងរកក្នុង CS101 Stream...">
                </div>
            </div>
            <div class="d-flex align-items-center gap-2 p-1 pe-2 rounded-pill"
                style="border: 1px solid var(--bdr); background: #ffffff; cursor: pointer; transition: .2s; box-shadow: var(--sh-sm);"
                onmouseover="this.style.borderColor='var(--em-mid)';"
                onmouseout="this.style.borderColor='var(--bdr)';">
                
                <img :src="authStore.avatarUrl"
                    alt="avatar"
                    style="width: 32px; height: 32px; border-radius: 50%; object-fit: cover; border: 1.5px solid var(--em-mid);" />
                
                <div class="d-none d-sm-flex flex-column justify-content-center pe-2" style="line-height: 1.1;">
                    <span class="fw-bold" style="font-size: .8rem; color: var(--txt);">{{ authStore.fullName }}</span>
                    <span style="font-size: .65rem; color: var(--txt-mu); font-weight: 500;">Instructor</span>
                </div>
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

<style scoped>
.search-bar {
    background: white;
    border-radius: 30px;
    padding: 10px 20px;
    border: 1px solid var(--bdr);
    max-width: 350px;
    display: flex;
    align-items: center;
    gap: 10px;
    box-shadow: var(--sh-sm);
    transition: .2s;
    width: 350px;
}

.search-bar:focus-within {
    border-color: var(--em);
}

.search-bar input {
    border: none;
    outline: none;
    font-size: 0.85rem;
    width: 100%;
    color: var(--txt);
}

.profile-pill {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 6px 16px 6px 6px;
    border-radius: 30px;
    background: #fff;
    border: 1px solid var(--bdr);
    cursor: pointer;
    box-shadow: var(--sh-sm);
    transition: .2s;
}

.profile-pill:hover {
    box-shadow: var(--sh-md);
}

.profile-pill img {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    object-fit: cover;
}
</style>