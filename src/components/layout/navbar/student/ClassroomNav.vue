<template>
    <div class="main-content">
        <div class="topbar">
            <div class="d-flex align-items-center gap-3">
                <div
                    style="width:44px;height:44px;border-radius:13px;background:var(--em-soft);color:var(--em-dk);display:flex;align-items:center;justify-content:center;font-size:1.2rem;">
                    <i class="fas fa-door-open"></i>
                </div>
                <div>
                    <div class="fw-bold"
                        style="font-size:1.15rem;color:var(--txt);letter-spacing:-0.3px;line-height:1.1;">វគ្គសិក្សាដែលបានចុះឈ្មោះ</div>
                    <div style="font-size:0.78rem;color:var(--txt-mu);font-weight:600;">ចូលរៀន និងទស្សនាការផ្សាយផ្ទាល់វគ្គសិក្សារបស់អ្នកនៅទីនេះ</div>
                </div>
            </div>
            <BaseProfile/>
        </div>
    </div>
</template>

<script setup>

import BaseProfile from "@/components/common/BaseProfile.vue";

</script>
