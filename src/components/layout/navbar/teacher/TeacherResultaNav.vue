<template>
    <div class="main-content">
        <div class="topbar">
            <div class="tb-section grow align-items-center justify-content-start gap-2 flex-grow-1"
                style="min-width: 0;">
                <button class="btn btn-light d-lg-none shadow-sm p-1 px-2 flex-shrink-0" data-bs-toggle="offcanvas"
                    data-bs-target="#sidebarMenu">
                    <i class="fas fa-bars"></i>
                </button>
                <div class="d-flex align-items-center gap-3" style="min-width: 0;">
                    <div style="min-width: 0;">
                        <h4 class="mb-1 fw-bold text-dark text-truncate"
                            style="font-size:1.15rem; line-height:1; letter-spacing: -0.2px;">លទ្ធផលសិស្ស</h4>
                        <div class="text-muted fw-bold d-none d-sm-flex align-items-center gap-2"
                            style="font-size:.7rem; letter-spacing:0.5px;">
                            <span
                                style="color:var(--em); background:var(--em-soft); border: 1px solid rgba(16,185,129,.2); padding: 2px 6px; border-radius: 4px; font-weight:700;"><i
                                    class="fas fa-chart-bar me-1"></i> គ្រប់គ្រងពិន្ទុ</span>
                            <span>ការពិនិត្យ និងវិភាគ</span>
                        </div>
                    </div>
                </div>
            </div>


            <div class="tb-section pe-0 ms-2 flex-shrink-0">
                <div class="d-flex align-items-center gap-2 p-1 pe-2 rounded-pill"
                    style="border: 1px solid var(--bdr); background: #ffffff; cursor: pointer; transition: .2s; box-shadow: var(--sh-sm);"
                    onmouseover="this.style.borderColor='var(--em-mid)';"
                    onmouseout="this.style.borderColor='var(--bdr)';">
                    
                    <img :src="authStore.avatarUrl"
                        alt="avatar"
                        style="width: 32px; height: 32px; border-radius: 50%; object-fit: cover; border: 1.5px solid var(--em-mid);" />
                    
                    <div class="d-none d-sm-flex flex-column justify-content-center pe-2" style="line-height: 1.1;">
                        <span class="fw-bold" style="font-size: .8rem; color: var(--txt);">{{ authStore.fullName }}</span>
                        <span style="font-size: .65rem; color: var(--txt-mu); font-weight: 500;">គ្រូបង្រៀន</span>
                    </div>
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
.tb-section {
    display: flex;
    align-items: center;
    padding: 0 18px;
    gap: 12px;
}

.tb-section:first-child {
    padding-left: 0;
}

.tb-section:last-child {
    padding-right: 0;
}

.tb-section.grow {
    flex: 1;
}

.btn-outline-ink {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    border-radius: 8px;
    border: 1px solid var(--bdr);
    background: #fff;
    color: var(--txt);
    font-size: 0.8rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.15s;
}

.btn-outline-ink:hover {
    background: var(--bg);
    border-color: var(--txt-mu);
}

.btn-accent {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 20px;
    border-radius: 8px;
    background: var(--em);
    color: #fff;
    font-size: 0.8rem;
    font-weight: 600;
    cursor: pointer;
    border: none;
    transition: all 0.18s;
}

.btn-accent:hover {
    background: var(--em-dk);
}
</style>