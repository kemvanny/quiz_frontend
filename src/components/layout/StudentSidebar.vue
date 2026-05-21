<template>
  <nav class="sidebar shadow-sm">
    <div class="d-flex align-items-center gap-2 fw-bold fs-4 mb-5 px-2"
      style="color: var(--em); letter-spacing: -0.5px">
      <i class="bi bi-mortarboard-fill"></i> Prolong
    </div>
    <div class="d-flex flex-column gap-2">
      <router-link :to="{name: 'StudentDashboard'}"  class="nav-item"><i class="fas fa-th-large"></i> Dashboard</router-link>
      <router-link :to="{ name: 'EnrolledRoom'}" class="nav-item"><i class="fas fa-door-open"></i> My Enrolled Rooms</router-link>
      <router-link :to="{name: 'Assignment',}" class="nav-item"><i class="fas fa-tasks"></i> Assignments</router-link>
      <router-link :to="{ name: 'AnalyticsResult'}" class="nav-item"><i class="fas fa-chart-bar"></i> Analytics & Results</router-link>
      <router-link :to="{name: 'ProfileSetting'}" class="nav-item active"><i class="fas fa-user-circle"></i> Profile Setting</router-link>
    </div>
  </nav>
</template>

<style scoped>
.sidebar {
  width: 240px;
  flex-shrink: 0;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(12px);
  border-right: 1px solid var(--bdr);
  display: flex;
  flex-direction: column;
  padding: 24px 16px;
  overflow-y: auto;
  z-index: 100;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  border-radius: 12px;
  color: var(--txt-mu);
  font-size: 0.85rem;
  font-weight: 600;
  transition: all 0.2s ease;
  margin-bottom: 4px;
}

.nav-item i {
  width: 20px;
  text-align: center;
  font-size: 1rem;
}

.nav-item.active {
  background: var(--em-soft);
  color: var(--em);
}

.nav-item:hover:not(.active) {
  background: #f1f5f9;
  color: var(--txt);
  transform: translateX(4px);
}
</style>