<template>
    <div class="main-content">
        <div class="topbar">
            <div class="welcome-meta">
                <h1>សូមស្វាគមន៍, {{ authStore.profile?.lastName}} {{ authStore.profile?.firstName}}</h1>
                <p>របាយការណ៍សិក្សាបច្ចុប្បន្នរបស់អ្នក</p>
            </div>

            <BaseProfile/>
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
.welcome-meta h1 {
    margin-top: 20px;
    font-size: 18px;
    font-weight: 700;
    letter-spacing: -.4px;
    color: var(--txt);
}

.welcome-meta p {
    font-size: 13px;
    color: var(--txt-mu);
    margin-top: 2px;
}
</style>