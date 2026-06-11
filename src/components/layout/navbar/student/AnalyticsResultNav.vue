<template>
    <div class="main-content">
        <div class="topbar">
            <div class="d-flex align-items-center gap-3">
                <div
                    style="width:42px;height:42px;border-radius:12px;background:var(--em-soft);color:var(--em);display:flex;align-items:center;justify-content:center;font-size:1.1rem;">
                    <i class="fas fa-chart-bar"></i></div>
                <div>
                    <div class="fw-bold" style="font-size:1.1rem;color:var(--txt);line-height:1.1;">វិភាគ និងលទ្ធផល
                    </div>
                    <div style="font-size:0.75rem;color:var(--txt-mu);font-weight:600;">ពិន្ទុ មតិកែលម្អ និងទិដ្ឋភាពសមត្ថភាព</div>
                </div>
            </div>
            <BaseProfile/>
        </div>
    </div>
</template>

<script setup>
import BaseProfile from '@/components/common/BaseProfile.vue';

</script>
