<template>
    <div class="main-content">
        <div class="topbar">
            <div class="tb-section grow border-0 align-items-center justify-content-start gap-2 w-100 flex-wrap">
                <button class="btn btn-light d-lg-none shadow-sm p-1 px-2" data-bs-toggle="offcanvas"
                    data-bs-target="#sidebarMenu">
                    <i class="fas fa-bars"></i>
                </button>
                <div class="d-flex align-items-center gap-2">
                    <h4 class="mb-0 fw-bold text-truncate"
                        style="font-size: 1.25rem; color: var(--txt); letter-spacing: -0.3px; line-height: 1.1;">{{
                        pageTitle }}</h4>
                </div>
            </div>

            <!-- Extra settings/info -->
            <div class="tb-section border-0 gap-3">
                <!-- Status Dropdown -->
                <select class="form-select form-select-sm border-0 fw-bold shadow-none cursor-pointer"
                    style="background-color: var(--em-soft); color: var(--em); font-size:.75rem; border-radius: 8px;">
                    <option>ស្ថានភាព: ព្រាង</option>
                    <option>ស្ថានភាព: សកម្ម</option>
                </select>

                <!-- Timer -->
                <div class="d-flex align-items-center gap-1 text-muted fw-bold" style="font-size:.75rem;">
                    <i class="fa-regular fa-clock text-warning" style="font-size:.85rem;"></i>
                    <input type="number"
                        class="form-control form-control-sm border text-dark fw-bold text-center shadow-none px-1 py-0 mx-1"
                        :value="timeValue" min="0"
                        style="width:45px; height:24px; font-size:.75rem; border-color:var(--bdr);">
                    <span>{{ timeUnit }}</span>
                </div>
            </div>

            <!-- Saved Status -->
            <div class="tb-section border-0">
                <span class="text-muted fw-bold" style="font-size:.75rem;"><i
                        class="fas fa-check-circle text-success me-1"></i> បានរក្សាទុក</span>
            </div>

            <!-- Actions + profile -->
            <div class="tb-section gap-3 pe-0 border-0">


                <!-- Profile Dropdown -->
                <div class="d-flex align-items-center gap-2 p-1 pe-3 rounded-pill"
                    style="border: 1px solid var(--bdr); background: #ffffff; cursor: pointer; transition: .2s; box-shadow: var(--sh-sm);"
                    onmouseover="this.style.borderColor='#cbd5e1'; this.style.boxShadow='0 4px 12px rgba(0,0,0,.05)'"
                    onmouseout="this.style.borderColor='var(--bdr)'; this.style.boxShadow='var(--sh-sm)'">
                    <img src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQTs4Gaz2D9hyLPSjUFHdcLhwoP5JbyaMy3-CXKrYPU4oJnTeRW"
                        alt="avatar" style="width: 32px; height: 32px; border-radius: 50%; object-fit: cover;" />
                    <div class="d-flex flex-column justify-content-center" style="line-height: 1.1;">
                        <span class="fw-bold" style="font-size: .8rem; color: var(--txt);">Hean Liza</span>
                        <span style="font-size: .65rem; color: var(--txt-mu); font-weight: 500;">Instructor</span>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>
<script setup>
defineProps({
    pageTitle: String,
    timeValue: [String, Number],
    timeUnit: { type: String, default: 'mins' }, // ដាក់ default ឱ្យវាងាយស្រួលប្រើ
    status: { type: String, default: 'Draft' }
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
</style>
