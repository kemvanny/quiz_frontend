<template>
  <div class="app-layout">
    <BaseSidebar :mainMenus="studentMainMenus" />
    <div class="main-wrapper">
        <component :is="activeNavbar"/>
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
import { computed } from "vue";
import { useRoute } from "vue-router";
import DashboardNav from "@/components/navbar/student/DashboardNav.vue";
import ClassroomNav from "@/components/navbar/student/ClassroomNav.vue";
import AnalyticsResultNav from "@/components/navbar/student/AnalyticsResultNav.vue";
import ProfilesettingNav from "@/components/navbar/student/ProfilesettingNav.vue";
import AssignmentNav from "@/components/navbar/student/AssignmentNav.vue";

const route = useRoute();

const studentMainMenus = [
  {
    name: "ផ្ទាំងគ្រប់គ្រង",
    routeName: "StudentDashboard",
    icon: "bi bi-grid-fill",
  },
  {
    name: "ថ្នាក់រៀនរបស់ខ្ញុំ",
    routeName: "Classroom",
    icon: "bi bi-door-open-fill",
  },
  { name: "បញ្ជីកិច្ចការ", routeName: "Assignment", icon: "bi bi-list-task" },
  {
    name: "ការវិភាគ និងលទ្ធផល",
    routeName: "AnalyticsResult",
    icon: "bi bi-bar-chart-fill",
  },
  {
    name: "ការកំណត់គណនី",
    routeName: "ProfileSetting",
    icon: "bi bi-person-circle",
  },
];

const activeNavbar = computed(() => {
  switch (route.name) {
    case "StudentDashboard":
      return DashboardNav;
    case "Assignment":
      return AssignmentNav;
    case "Classroom":
      return ClassroomNav;
    case "AnalyticsResult":
      return AnalyticsResultNav;
    case "ProfileSetting":
      return ProfilesettingNav;
  }
});
</script>
<style>
.welcome-meta h1 {
  font-size: 16px;
  font-weight: 700;
  letter-spacing: -0.4px;
  color: var(--txt);
}

.welcome-meta p {
  font-size: 10px;
  color: var(--txt-mu);
  margin-top: 2px;
}

/* add new */
:root {
  --em: #10b981;
  --em-dk: #059669;
  --em-soft: #ecfdf5;
  --txt: #0f172a;
  --txt-m: #475569;
  --txt-mu: #94a3b8;
  --surf: #ffffff;
  --bdr: #e2e8f0;
  --sh-sm: 0 4px 12px rgba(0, 0, 0, 0.03);
  --sh-md: 0 10px 25px rgba(0, 0, 0, 0.05);
  --sh-hover: 0 20px 40px rgba(16, 185, 129, 0.13);
}

.content-body {
  background-image:
    radial-gradient(at 0% 0%, hsla(158, 76%, 76%, 0.6) 0, transparent 50%),
    radial-gradient(at 100% 100%, hsla(209, 43%, 80%, 0.6) 0, transparent 50%);
}
/* add new */

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
