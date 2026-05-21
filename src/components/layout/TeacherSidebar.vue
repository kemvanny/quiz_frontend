<script setup lang="ts">
import router from '@/router';

</script>

<template>
    <div>
        <nav class="sidebar offcanvas-lg offcanvas-start" id="sidebarMenu">
            <!-- Logo -->
            <div class="d-flex align-items-center justify-content-between fw-bold fs-5 mb-4 px-1"
                style="color:var(--em)">
                <div class="d-flex align-items-center gap-2"><i class="bi bi-mortarboard-fill"></i> Prolong</div>
                <button class="btn-close d-lg-none shadow-none" data-bs-dismiss="offcanvas"
                    data-bs-target="#sidebarMenu"></button>
            </div>

            <div class="d-flex flex-column gap-1">
                <router-link :to="{ name: 'TeacherDashboard' }" class="nav-item active"><i class="fas fa-th-large"></i>
                    Dashboard</router-link>

                <router-link to="" class="nav-item justify-content-between" data-bs-toggle="collapse"
                    data-bs-target="#createMenu">
                    <span><i class="fas fa-edit"></i> Create Exam</span>
                    <i class="fas fa-chevron-down" style="font-size:.68rem;opacity:.5"></i>
                </router-link>
                <div class="collapse ps-3 d-flex flex-column gap-1" id="createMenu">
                    <router-link :to="{ name: 'Quizzes' }" class="nav-item"><i class="fas fa-bolt"></i>
                        Quiz</router-link>
                    <router-link :to="{ name: 'Assignment' }" class="nav-item"><i class="fas fa-tasks"></i>
                        Assignment</router-link>
                    <router-link :to="{ name: 'FinalExam' }" class="nav-item"><i class="fas fa-graduation-cap"></i> Final
                        Exam</router-link>
                </div>

                <router-link :to="{ name: 'RoomManagement' }" class="nav-item"><i class="fas fa-users"></i> Room
                    Management</router-link>
                <router-link :to="{  name: 'ClassStream' }" class="nav-item"><i class="fas fa-users"></i> Classroom
                    Stream</router-link>
                <router-link :to="{ name: 'StudentResults' }" class="nav-item"><i class="fas fa-chart-bar"></i> Student
                    Results</router-link>

                <router-link :to="{ name: 'TeacherValidations' }" class="nav-item"><i class="fas fa-shield-alt"></i>
                    Validations</router-link>
                <router-link :to="{ name: 'Profile' }" class="nav-item"><i class="fas fa-user-circle"></i>
                    Profile</router-link>
            </div>

            <!-- CTA -->
            <div class="mt-auto sidebar-cta p-3 text-center" onclick="openRoomModal()">
                <div class="bg-white rounded-circle d-flex align-items-center justify-content-center shadow-sm mx-auto mb-2"
                    style="width:38px;height:38px">
                    <i class="fas fa-plus text-success"></i>
                </div>
                <div class="fw-bold text-dark mb-1" style="font-size:.85rem">New Class Room</div>
                <div class="text-muted mb-2" style="font-size:.7rem;line-height:1.3">Create a space for students to
                    join.</div>
                <span class="badge bg-success rounded-pill w-100 py-2"
                    style="font-size:.72rem;letter-spacing:.5px">START CREATING</span>
            </div>
        </nav>
    </div>
</template>

<style scoped>
body {
    font-family: "Kantumruy Pro", "Poppins", sans-serif;
    background-color: #f4f7fe;
    background-image: radial-gradient(at 0% 0%, hsla(158, 76%, 76%, 0.6) 0, transparent 50%),
        radial-gradient(at 100% 100%, hsla(209, 43%, 80%, 0.6) 0, transparent 50%);
    height: 100vh;
    overflow: hidden;
}

.sidebar {
    width: 240px;
    flex-shrink: 0;
    background: #ffffff !important;
    border-right: 1px solid var(--white);
    display: flex;
    flex-direction: column;
    padding: 20px 14px;
    overflow-y: auto;
}

.nav-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 9px 12px;
    border-radius: 10px;
    text-decoration: none;
    color: var(--txt-mu);
    font-size: .83rem;
    font-weight: 500;
    transition: .17s;
}

.nav-item i {
    width: 16px;
    text-align: center;
    font-size: .8rem;
}

.nav-item.active {
    background: var(--em-soft);
    color: var(--em);
    font-weight: 700;
}

.nav-item:hover:not(.active) {
    background: #f8fafc;
    color: var(--txt);
}

.sidebar-cta {
    border: 2px dashed rgba(16, 185, 129, .25);
    border-radius: 14px;
    background: var(--em-soft);
    cursor: pointer;
    transition: .2s;
}

.sidebar-cta:hover {
    background: #d1fae5;
}
</style>