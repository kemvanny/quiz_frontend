<template>
  <aside class="sidebar">
    <div class="sidebar-brand">
      <a href="#"> <img :src="logoImage" alt="Pralong Logo" class="brand-logo" />
      </a>
    </div>

    <template v-if="mainMenus && mainMenus.length">
      <slot name="main-menus"></slot>
      <nav class="nav flex-column">
        <router-link v-for="item in mainMenus" :key="item.name" class="nav-link" :to="{ name: item.routeName }">
          <i :class="item.icon"></i> {{ item.name }}
        </router-link>
      </nav>
    </template>

    <template v-if="systemMenus && systemMenus.length">
      <slot name="system-menus"></slot>
      <nav class="nav flex-column">
        <router-link v-for="item in systemMenus" :key="item.name" class="nav-link" :to="{ name: item.routeName }">
          <i :class="item.icon"></i> {{ item.name }}
        </router-link>
      </nav>
    </template>

    <div class="sidebar-footer">
      <slot name="user-profile"></slot>
    </div>
  </aside>
</template>

<script setup>
import logoImage from '@/assets/images/pralong-logo.png';
defineProps({
  roleName: {
    type: String,
    default: 'ADMIN'
  },
  mainMenus: {
    type: Array,
    required: true
  },
  systemMenus: {
    type: Array,
    default: () => []
  }
})

</script>

<style>
.sidebar {
  width: var(--sidebar-width);
  height: 100vh;
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
  padding: 39px 20px; 
  display: flex;
  align-items: center; 
  justify-content: flex-start; 
  border-bottom: 1.5px solid var(--green-mid);
  height: 60px; 
  margin-bottom: 20px; 
  gap: 0;              
}

.brand-logo {
  max-width: 190px;   
  height: auto; 
  display: block;      
  
}


.nav-section-label {
  font-size: 12px;
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
  text-decoration: none;
  cursor: pointer;
}

.sidebar .nav-link i {
  font-size: 17px;
}

.sidebar .nav-link:hover {
  background: var(--green-light);
  color: var(--green-dark);
}

.sidebar .nav-link.router-link-active {
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

.sidebar .nav-link.router-link-active .badge-count {
  background: rgba(255, 255, 255, 0.3);
}

.sidebar-footer {
  margin-top: auto;
  padding: 20px 16px;
}

.profile-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f4fbf7;
  padding: 14px 16px;
  border-radius: 16px;
  border: 1px solid rgba(63, 186, 127, 0.15);
}

.profile-info {
  display: flex;
  align-items: center;
  gap: 14px;
}

.profile-img {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  object-fit: cover;
  background: #ddd;
}

.profile-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.profile-name {
  font-size: 14px;
  font-weight: 700;
  color: var(--green-dark, #1e4635);
  line-height: 1.2;
}

.profile-role {
  font-size: 9px;
  font-weight: 700;
  color: var(--text-muted, #888);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.logout-btn {
  background: #ffffff;
  border: 1px solid rgba(63, 186, 127, 0.2);
  width: 38px;
  height: 38px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #e05c5c;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
}

.logout-btn:hover {
  background: #fff0f0;
  color: #c0392b;
  border-color: #f5c2c2;
  transform: translateY(-1px);
}

.logout-btn i {
  font-size: 18px;
}
</style>