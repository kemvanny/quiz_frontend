<template>
    <div class="main-content">
        <div class="topbar">
            <div class="d-flex align-items-center gap-3 flex-grow-1" style="min-width: 0;">
                <button class="btn btn-light d-lg-none shadow-sm p-1 px-2 flex-shrink-0" data-bs-toggle="offcanvas"
                    data-bs-target="#sidebarMenu">
                    <i class="fas fa-bars"></i>
                </button>
                <div class="d-none d-sm-flex align-items-center justify-content-center flex-shrink-0"
                    style="width: 42px; height: 42px; border-radius: 12px; background: var(--em-soft); color: var(--em-dk); font-size: 1.2rem;">
                    <i class="fas fa-users-cog"></i>
                </div>
                <div class="d-flex flex-column justify-content-center" style="min-width: 0;">
                    <h4 class="mb-0 fw-bold text-truncate"
                        style="font-size: 1.25rem; color: var(--txt); letter-spacing: -0.3px; line-height: 1.1;">ការគ្រប់គ្រងថ្នាក់រៀន</h4>
                    <div class="d-none d-md-block text-truncate"
                        style="font-size: 0.75rem; color: var(--txt-mu); font-weight: 600; margin-top: 2px;">គ្រប់គ្រងថ្នាក់រៀន និងសិស្សដែលបានចុះឈ្មោះ</div>
                </div>
            </div>
            <div class="d-flex align-items-center gap-3 flex-shrink-0">
                <button class="btn btn-sm text-white fw-bold d-flex align-items-center gap-2 shadow-sm"
                    @click="isCreateRoomOpen = true"
                    style="background: linear-gradient(135deg, var(--em), var(--em-dk)); border: none; border-radius: 10px; padding: 8px 18px; transition: .2s;"
                    onmouseover="this.style.transform='translateY(-1px)'; this.style.boxShadow='0 4px 12px rgba(16,185,129,.3)';"
                    onmouseout="this.style.transform='none'; this.style.boxShadow='var(--sh-sm)';">
                    <i class="fas fa-plus"></i> <span class="d-none d-sm-inline">ថ្នាក់ថ្មី</span>
                </button>

                <div class="d-none d-sm-block" style="width: 1px; height: 24px; background: var(--bdr); margin: 0 8px;">
                </div>

                <div class="d-flex align-items-center gap-2"
                    style="cursor: pointer; padding: 4px; border-radius: 12px; transition: .2s;"
                    onmouseover="this.style.background='var(--bg)';" onmouseout="this.style.background='transparent';">
                    <img src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQTs4Gaz2D9hyLPSjUFHdcLhwoP5JbyaMy3-CXKrYPU4oJnTeRW"
                        alt="avatar"
                        style="width: 36px; height: 36px; border-radius: 50%; object-fit: cover; border: 2px solid var(--em-soft);" />
                    <div class="d-none d-sm-flex flex-column justify-content-center" style="line-height: 1.1;">
                        <span class="fw-bold" style="font-size: .85rem; color: var(--txt);">Hean Liza</span>
                        <span style="font-size: .65rem; color: var(--txt-mu); font-weight: 600;">Instructor</span>
                    </div>
                    <i class="fas fa-chevron-down ms-1 text-muted d-none d-sm-block" style="font-size: 0.7 flex;"></i>
                </div>
            </div>
        </div>
    </div>

    <CreateRoomModal 
        :is-open="isCreateRoomOpen" 
        @close="isCreateRoomOpen = false" 
        @created="onRoomCreated" 
    />
</template>

<script setup>
import { ref } from 'vue';
import CreateRoomModal from '@/components/common/CreateRoomModal.vue';
const isCreateRoomOpen = ref(false);
const emit = defineEmits(['room-created']);

const onRoomCreated = (roomData) => {
    isCreateRoomOpen.value = false;
    console.log("Room created successfully from topbar:", roomData);
    emit('room-created', roomData);
};
</script>