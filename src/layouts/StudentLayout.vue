<template>
  <div class="app-layout">
    <BaseSidebar :mainMenus="studentMainMenus" />
    <div class="main-wrapper">
        <component :is="activeNavbar"/>

      <!-- <BaseNavbar>
      <template #left>
                    <div class="welcome-meta mb-0">
                        <h1 class="mb-0">Welcome back, Sok Vibol</h1>
                        <p class="mb-0">Here's your real-time academic snapshot.</p>
                    </div>
                </template>
                <template #right>
                    <a href="6.st-profile.html" class="profile-pill">
                        <div class="avatar">SV</div>
                        <div class="user-profile-info">
                            <span class="user-name">Sok Vibol</span>
                            <span class="user-id">ID: 882103 · Monday, 18 May 2026</span>
                        </div>
                    </a>
                </template>
      </BaseNavbar> -->
      <main class="content-body">
        <div class="main-content">
          <div class="page-body">
            <router-view />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import DashboardNav from '@/components/navbar/student/DashboardNav.vue';
import ClassroomNav from '@/components/navbar/student/ClassroomNav.vue';
import AnalyticsResultNav from '@/components/navbar/student/AnalyticsResultNav.vue';
import ProfilesettingNav from '@/components/navbar/student/ProfilesettingNav.vue';
import AssignmentNav from '@/components/navbar/student/AssignmentNav.vue';


const route = useRoute();

const studentMainMenus = [
  { name: 'ផ្ទាំងគ្រប់គ្រង', routeName: 'StudentDashboard', icon: 'bi bi-grid-fill' },
  { name: 'ថ្នាក់រៀនរបស់ខ្ញុំ', routeName: 'Classroom', icon: 'bi bi-door-open-fill' },
  { name: 'បញ្ជីកិច្ចការ', routeName: 'Assignment', icon: 'bi bi-list-task' },
  { name: 'ការវិភាគ និងលទ្ធផល', routeName: 'AnalyticsResult', icon: 'bi bi-bar-chart-fill' },
  { name: 'ការកំណត់គណនី', routeName: 'ProfileSetting', icon: 'bi bi-person-circle' }
]

const activeNavbar = computed(() => {
    switch(route.name) {
        case 'StudentDashboard' : return DashboardNav;
        case 'Assignment' : return AssignmentNav;
        case 'Classroom' : return ClassroomNav;
        case 'AnalyticsResult' : return AnalyticsResultNav;
        case 'ProfileSetting' : return ProfilesettingNav;
    }
})
</script>
<style>
.welcome-meta h1 {
    font-size: 16px;
    font-weight: 700;
    letter-spacing: -.4px;
    color: var(--txt);
}

.welcome-meta p {
    font-size: 10px;
    color: var(--txt-mu);
    margin-top: 2px;
}

.profile-pill {
    display: flex;
    align-items: center;
    gap: 12px;
    background: var(--surf);
    padding: 6px 6px;
    border-radius: 99px;
    border: 1px solid var(--border);
}

.avatar {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: var(--em);
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    font-weight: 600;
}

.user-profile-info {
    display: flex;
    flex-direction: column;
}

.user-name {
    font-size: 10px;
    font-weight: 600;
    color: var(--txt);
}

.user-id {
    font-size: 8px;
    color: var(--txt-lt);
}
</style>