<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { joinRoom } from '@/api/student.api.js';

const route = useRoute();
const loading = ref(true);
const statusMessage = ref('');
const isSuccess = ref(false);

onMounted(async () => {
    const invitationId = route.params.id;
    const token = route.query.token;

    if (!token || !invitationId) {
        loading.value = false;
        statusMessage.value = "ព័ត៌មានលីងសម្រាប់ចូលរួមបន្ទប់សិក្សាមិនត្រឹមត្រូវឡើយ!";
        return;
    }

    try {
        const response = await joinRoom(invitationId, token);
        if (response.data.success) {
            isSuccess.value = true;
            statusMessage.value = response.data.message = "អ្នកបានចូលរួមបន្ទប់សិក្សាដោយជោគជ័យ!";
        } else {
            isSuccess.value = false;
            statusMessage.value = response.data.error = "ការចូលរួមបន្ទប់សិក្សាត្រូវបានបដិសេធ។";
        }
    } catch (error) {
        isSuccess.value = false;
        statusMessage.value = error.response?.data?.error || "មានបញ្ហាបច្ចេកទេសក្នុងការតភ្ជាប់ទៅកាន់ Server។";
    } finally {
        loading.value = false;
    }
});
</script>

<template>
    <div class="shell">
        <header class="topbar">
            <div class="logo-mark"><i class="fa-solid fa-graduation-cap"></i></div>
            <span class="logo-text">Prolang<span>Student</span></span>
            <div class="topbar-right">
                <router-link :to="{ name: 'StudentDashboard' }" class="nav-pill">
                    <i class="bi bi-grid-1x2"></i> Dashboard
                </router-link>
            </div>
        </header>
        <main class="content-wrapper">
            <div class="scene-card">
                <div v-if="loading" class="state-container animate-fade">
                    <div class="spinner-wrapper mb-4">
                        <div class="spinner-border text-mint" role="status"
                            style="width: 3.5rem; height: 3.5rem; stroke-width: 3px;"></div>
                    </div>
                    <h2 class="state-title text-mint-dark">កំពុងផ្ទៀងផ្ទាត់...</h2>
                    <p class="state-p text-muted">ប្រព័ន្ធកំពុងដំណើរការពិនិត្យមើល ការអញ្ជើញរបស់អ្នក
                        សូមរង់ចាំមួយភ្លែត។</p>
                </div>

                <div v-else class="state-container animate-scale">
                    <div class="illus-wrap" aria-hidden="true">
                        <div class="q-badge q1" :class="isSuccess ? 'bg-mint-light' : 'bg-danger-light'">
                            <i
                                :class="isSuccess ? 'bi bi-mortarboard-fill text-mint' : 'bi bi-exclamation-triangle-fill text-danger'"></i>
                        </div>
                        <div class="q-badge q2">🎓</div>
                        <div class="q-badge q3">⚡</div>

                        <div class="paper" :class="!isSuccess ? 'border-danger-subtle' : ''">
                            <div class="paper-header" :class="isSuccess ? 'bg-mint-header' : 'bg-danger-header'"></div>
                            <div class="rows">
                                <div class="row-item">
                                    <div class="row-num" :class="isSuccess ? 'bg-mint-mid' : 'bg-danger-mid'"></div>
                                    <div class="row-line"></div>
                                </div>
                                <div class="row-item">
                                    <div class="row-num" :class="isSuccess ? 'bg-mint-mid' : 'bg-danger-mid'"></div>
                                    <div class="row-line"></div>
                                </div>
                                <div class="row-item">
                                    <div class="row-num" :class="isSuccess ? 'bg-mint-mid' : 'bg-danger-mid'"></div>
                                    <div class="row-line"></div>
                                </div>
                            </div>
                            <div class="center-status-badge" :class="isSuccess ? 'bg-mint-glow' : 'bg-danger-glow'">
                                <i :class="isSuccess ? 'bi bi-check-lg text-mint' : 'bi bi-x-lg text-danger'"></i>
                            </div>
                        </div>
                    </div>

                    <!-- Title Status -->
                    <h1 class="state-title mt-4" :class="isSuccess ? 'text-mint-gradient' : 'text-danger-dark'">
                        {{ isSuccess ? 'ជោគជ័យ!' : 'បរាជ័យ!' }}
                    </h1>

                    <div class="divider mb-3" :class="!isSuccess ? 'bg-danger-gradient' : ''"></div>

                    <!-- Description Copy -->
                    <p class="state-p text-slate px-2 mb-4">{{ statusMessage }}</p>

                    <!-- Dynamic Action Buttons -->
                    <div class="actions w-100">
                        <router-link :to="{ name: 'StudentDashboard' }" class="btn btn-solid w-100"
                            :class="!isSuccess ? 'btn-danger-solid' : ''">
                            <i class="bi bi-house-door-fill"></i> ទៅកាន់ទំព័រដើម
                        </router-link>
                    </div>

                </div>

            </div>

            <!-- ── QUICK LINKS BELOW CARD -->
            <nav class="quick-links" aria-label="Quick links">
                <div class="quick-label">ផ្ទាំងគ្រប់គ្រង</div>
                <router-link :to="{ name: 'Classroom' }" class="chip"><i class="bi bi-book"></i>
                    ថ្នាក់រៀនរបស់ខ្ញុំ</router-link>
                <router-link :to="{ name: 'AnalyticsResult' }" class="chip"><i class="bi bi-bar-chart"></i> លទ្ធផលប្រឡង</router-link>
            </nav>
        </main>

        <!-- FOOTER -->
        <footer>
            <p>Pralang Learning Platform &nbsp;·&nbsp; Classroom Invitation &nbsp;·&nbsp; 2026</p>
        </footer>
    </div>
</template>

<style scoped>
/* ── Design Tokens */
:root {
    --g50: #f2fbf6;
    --g100: #d8f3e6;
    --g200: #b0e8ce;
    --g300: #78d4a8;
    --g400: #3db882;
    --g500: #10b981;
    --g600: #059669;

    --ink: #091f14;
    --card-border: rgba(16, 185, 129, 0.15);
    --shadow: 0 20px 40px rgba(21, 122, 79, 0.05);
}

/* ── Full Window Core (លុបចោលការ Scroll ទាំងស្រុង) ─────── */
.shell {
    height: 100vh;
    max-height: 100vh;
    display: grid;
    grid-template-rows: auto 1fr auto;
    background-color: #f2fbf6;
    background-image:
        linear-gradient(rgba(176, 232, 206, 0.18) 1px, transparent 1px),
        linear-gradient(90deg, rgba(176, 232, 206, 0.18) 1px, transparent 1px);
    background-size: 40px 40px;
    overflow: hidden;
}

/* ── Topbar Styling ─────────────────────────────────────── */
.topbar {
    padding: 0 2rem;
    height: 60px;
    display: flex;
    align-items: center;
    background: rgba(242, 251, 246, 0.85);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(16, 185, 129, 0.15);
}

.logo-mark {
    width: 34px;
    height: 34px;
    background: #10b981;
    border-radius: 9px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 1.1rem;
}

.logo-text {
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    font-size: 1rem;
    font-weight: 800;
    color: #091f14;
    margin-left: 10px;
}

.logo-text span {
    color: #10b981;
}

.topbar-right {
    margin-left: auto;
}

.nav-pill {
    font-size: .8rem;
    font-weight: 600;
    color: #2d5c42;
    padding: .35rem .95rem;
    border-radius: 99px;
    border: 1px solid rgba(16, 185, 129, 0.15);
    background: #fff;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: .35rem;
}

/* ── Content Body Wrapper ───────────────────────────────── */
.content-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1rem;
}

/* ── Beautiful Scene Card ───────────────────────────────── */
.scene-card {
    background: #ffffff;
    border: 1px solid rgba(16, 185, 129, 0.12);
    border-radius: 24px;
    box-shadow: 0 25px 50px -12px rgba(16, 185, 129, 0.04);
    padding: 3rem 2.5rem 2.5rem;
    max-width: 460px;
    width: 100%;
}

.state-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}

/* ── Mint Loading Spinner ───────────────────────────────── */
.text-mint {
    color: #10b981;
}

.text-mint-dark {
    color: #065f46;
}

/* ── Classroom Illustration Style ────────────────────────── */
.illus-wrap {
    position: relative;
    width: 200px;
    height: 160px;
    margin-bottom: 10px;
}

.paper {
    position: absolute;
    left: 50%;
    top: 10px;
    transform: translateX(-50%) rotate(-2deg);
    width: 120px;
    height: 150px;
    background: #fff;
    border-radius: 12px;
    border: 1.5px solid #b0e8ce;
    box-shadow: 0 10px 25px rgba(21, 122, 79, 0.06);
}

.border-danger-subtle {
    border-color: #fca5a5 !important;
}

.paper-header {
    height: 24px;
    border-radius: 10px 10px 0 0;
    border-bottom: 1.5px solid rgba(0, 0, 0, 0.03);
}

.bg-mint-header {
    background: #d8f3e6;
}

.bg-danger-header {
    background: #ffe4e6;
}

.rows {
    position: absolute;
    top: 36px;
    left: 14px;
    right: 14px;
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.row-item {
    display: flex;
    align-items: center;
    gap: 6px;
}

.row-num {
    width: 10px;
    height: 10px;
    border-radius: 50%;
}

.bg-mint-mid {
    background: #78d4a8;
}

.bg-danger-mid {
    background: #fca5a5;
}

.row-line {
    flex: 1;
    height: 6px;
    background: #f1f5f9;
    border-radius: 4px;
}

.center-status-badge {
    position: absolute;
    bottom: -12px;
    right: -12px;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.3rem;
    font-weight: bold;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.06);
}

.bg-mint-glow {
    background: #ffffff;
    border: 2.5px solid #10b981;
}

.bg-danger-glow {
    background: #ffffff;
    border: 2.5px solid #ef4444;
}

/* Floating Micro Badges */
.q-badge {
    position: absolute;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: floatEffect 3s ease-in-out infinite;
}

.bg-mint-light {
    background: #e6fbf1;
    border: 1px solid #10b981;
}

.bg-danger-light {
    background: #fff1f2;
    border: 1px solid #ef4444;
}

.q-badge.q1 {
    width: 34px;
    height: 34px;
    top: 0px;
    right: 10px;
    animation-delay: 0s;
}

.q-badge.q2 {
    width: 26px;
    height: 26px;
    font-size: .9rem;
    top: 25px;
    left: 10px;
    animation-delay: .8s;
}

.q-badge.q3 {
    width: 22px;
    height: 22px;
    font-size: .75rem;
    bottom: 15px;
    left: 25px;
    animation-delay: 1.5s;
}

@keyframes floatEffect {

    0%,
    100% {
        transform: translateY(0) rotate(-3deg);
    }

    50% {
        transform: translateY(-6px) rotate(3deg);
    }
}
.state-title {
    font-size: 1.5rem;
    font-weight: 800;
    letter-spacing: -0.5px;
}

.text-mint-gradient {
    background: linear-gradient(135deg, #059669 0%, #10b981 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.text-danger-dark {
    color: #9f1239;
}

.text-slate {
    color: #475569;
    font-size: 14px;
    line-height: 1.6;
}

.divider {
    width: 44px;
    height: 3px;
    background: linear-gradient(90deg, #78d4a8, #10b981);
    border-radius: 2px;
}

.bg-danger-gradient {
    background: linear-gradient(90deg, #fca5a5, #ef4444) !important;
}

.btn-solid {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    color: #fff;
    font-weight: 600;
    font-size: 0.95rem;
    border-radius: 12px;
    padding: .65rem 1.5rem;
    border: none;
    box-shadow: 0 8px 16px -4px rgba(16, 185, 129, 0.3) !important;
    transition: all 0.2s ease;
}

.btn-solid:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 20px -4px rgba(16, 185, 129, 0.4) !important;
    color: #fff;
}

.btn-danger-solid {
    background: linear-gradient(135deg, #ef4444 0%, #b91c1c 100%) !important;
    box-shadow: 0 8px 16px -4px rgba(239, 68, 68, 0.3) !important;
}

.btn-danger-solid:hover {
    box-shadow: 0 12px 20px -4px rgba(239, 68, 68, 0.4) !important;
}

.quick-links {
    display: flex;
    flex-wrap: wrap;
    gap: .5rem;
    justify-content: center;
    margin-top: 1.25rem;
}

.quick-label {
    width: 100%;
    font-size: .7rem;
    font-weight: 700;
    letter-spacing: .05em;
    color: #6b9b7e;
    text-transform: uppercase;
    margin-bottom: .2rem;
    text-align: center;
}

.chip {
    display: inline-flex;
    align-items: center;
    gap: .35rem;
    font-size: .78rem;
    color: #2d5c42;
    font-weight: 600;
    background: #ffffff;
    border: 1px solid rgba(16, 185, 129, 0.15);
    border-radius: 99px;
    padding: .3rem .9rem;
    text-decoration: none;
    transition: all 0.15s;
}

.chip:hover {
    background: #d8f3e6;
    color: #059669;
}

footer {
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-top: 1px solid rgba(16, 185, 129, 0.15);
    background: rgba(242, 251, 246, 0.85);
}

footer p {
    font-size: .75rem;
    color: #6b9b7e;
    margin: 0;
}
.animate-scale {
    animation: scaleIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

.animate-fade {
    animation: fadeIn 0.3s ease-out forwards;
}

@keyframes scaleIn {
    0% {
        opacity: 0;
        transform: scale(0.92);
    }

    100% {
        opacity: 1;
        transform: scale(1);
    }
}

@keyframes fadeIn {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}


@media (max-width: 520px) {
    .scene-card {
        padding: 2rem 1.25rem;
    }

    .topbar {
        padding: 0 1rem;
    }

    .q-badge,
    .illus-wrap {
        display: none;
    }
}
</style>