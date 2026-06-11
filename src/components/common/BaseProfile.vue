<template>
    <div class="d-flex align-items-center gap-3">
        <div style="width:1px;height:26px;background:var(--bdr);"></div>
        <router-link :to="{ name: 'ProfileSetting' }" class="d-flex align-items-center gap-2 p-1 pe-3 rounded-pill bg-white"
            style="border:1px solid var(--bdr);box-shadow:var(--sh-sm);">

            <img :src="`${imgBaseUrl}${authStore.profile?.avatar}`"
                style="width:34px;height:34px;border-radius:50%;border:2px solid var(--em-soft);">

            <div style="line-height:1.15;">
                <div class="fw-bold" style="font-size:.83rem;">{{ authStore.profile?.lastName }} {{
                    authStore.profile?.firstName }}</div>
                <div style="font-size:.7rem;color:var(--txt-mu);font-weight:600;">{{ authStore.profile?.role }}</div>
            </div>
        </router-link>
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