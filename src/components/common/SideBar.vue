<template>
  <!-- ══ SIDEBAR ══ -->
  <aside class="sidebar">
    <div class="sidebar-brand">
      <div class="brand-icon">
        <i class="bi bi-mortarboard-fill"></i>
      </div>
      <div class="brand-name">Pralong <span>Admin</span></div>
    </div>

    <div class="nav-section-label">មឺនុយមេ</div>
    <nav class="nav flex-column">
      <router-link class="nav-link active"  :to="{ name: 'AdminDashboard' }">
        <i class="bi bi-grid-1x2-fill"></i> ផ្ទាំងគ្រប់គ្រង
      </router-link>
      <router-link class="nav-link" :to="{name: 'UserManagement' }">
        <i class="bi bi-people-fill"></i> គ្រប់គ្រងអ្នកប្រើប្រាស់
        <span class="badge-count">24</span>
      </router-link>
      <router-link class="nav-link" :to="{ name: 'QuizManagement' }">
        <i class="bi bi-journal-check"></i> គ្រប់គ្រងការប្រឡង
      </router-link>
      <router-link class="nav-link" :to="{ name: 'ResultSubmission' }">
        <i class="bi bi-bar-chart-fill"></i> លទ្ធផល និងការបញ្ជូន
      </router-link>
    </nav>

    <div class="nav-section-label" style="margin-top: 12px">ប្រព័ន្ធ</div>
    <nav class="nav flex-column">
      <router-link class="nav-link" :to="{ name: 'Settings' }">
        <i class="bi bi-gear-fill"></i> ការកំណត់
      </router-link>
      <router-link class="nav-link" :to="{ name: 'SystemHealth' }">
        <i class="bi bi-shield-check"></i> ស្ថានភាពប្រព័ន្ធ
      </router-link>
      <router-link class="nav-link" :to="{ name: 'Help' }">
        <i class="bi bi-question-circle"></i> ជំនួយ
      </router-link>
    </nav>

    <div class="sidebar-footer">
      <a class="nav-link" href="#">
        <i class="bi bi-box-arrow-left"></i> ចាកចេញ
      </a>
    </div>
  </aside>
</template>
<style>
/* SIDEBAR */
.sidebar {
  width: var(--sidebar-width);
  min-height: 100vh;
  background: var(--white);
  border-right: 1.5px solid var(--green-mid);
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  padding: 0 0 24px 0;
  box-shadow: 4px 0 18px rgba(63, 186, 127, 0.06);
}

.sidebar-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 20px 22px 20px;
  border-bottom: 1.5px solid var(--green-mid);
  margin-bottom: 30px;
}

.sidebar-brand .brand-icon {
  width: 38px;
  height: 38px;
  background: var(--green-primary);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 18px;
}

.sidebar-brand .brand-name {
  font-size: 20px;
  font-weight: 800;
  color: var(--text-main);
  letter-spacing: -0.5px;
}

.sidebar-brand .brand-name span {
  color: var(--green-primary);
}

.nav-section-label {
  font-size: 10px;
  font-weight: 700;
  color: var(--text-muted);
  letter-spacing: 1.2px;
  text-transform: uppercase;
  padding: 12px 22px 4px;
}

.sidebar .nav-link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 11px 22px;
  border-radius: 12px;
  margin: 2px 10px;
  font-size: 14px;
  font-weight: 600;
  color: var(--text-muted);
  transition: all 0.2s;
  position: relative;
}

.sidebar .nav-link i {
  font-size: 17px;
}

.sidebar .nav-link:hover {
  background: var(--green-light);
  color: var(--green-dark);
}

.sidebar .nav-link.active {
  background: var(--green-primary);
  color: #fff;
  box-shadow: 0 4px 14px rgba(63, 186, 127, 0.35);
}

.sidebar .nav-link .badge-count {
  margin-left: auto;
  background: var(--green-accent);
  color: #fff;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 700;
  padding: 1px 8px;
}

.sidebar .nav-link.active .badge-count {
  background: rgba(255, 255, 255, 0.3);
}

.sidebar-footer {
  margin-top: auto;
  padding: 14px 10px 0;
  border-top: 1.5px solid var(--green-mid);
}

.sidebar-footer .nav-link {
  color: #e05c5c;
}

.sidebar-footer .nav-link:hover {
  background: #fff0f0;
  color: #c0392b;
}
</style>