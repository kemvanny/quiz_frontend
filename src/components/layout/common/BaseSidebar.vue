<template>
  <aside class="sidebar">
    <div class="sidebar-brand">
      <div class="brand-icon">
        <i class="bi bi-mortarboard-fill"></i>
      </div>
      <div class="brand-name">Pralong <span>{{ roleName }}</span></div>
    </div>

    <template v-if="mainMenus && mainMenus.length">
      <slot name="main-menus"></slot>
      <nav class="nav flex-column">
        <router-link 
          v-for="item in mainMenus" 
          :key="item.name" 
          class="nav-link" 
          :to="{ name: item.routeName }"
        >
          <i :class="item.icon"></i> {{ item.name }}
        </router-link>
      </nav>
    </template>

    <template v-if="systemMenus && systemMenus.length">
      <slot name="system-menus"></slot>
      <nav class="nav flex-column">
        <router-link 
          v-for="item in systemMenus" 
          :key="item.name" 
          class="nav-link" 
          :to="{ name: item.routeName }"
        >
          <i :class="item.icon"></i> {{ item.name }}
        </router-link>
      </nav>
    </template>

    <div class="sidebar-footer">
      <a class="nav-link" href="#" @click.prevent="$emit('logout')">
        <i class="bi bi-box-arrow-left"></i> ចាកចេញ
      </a>
    </div>
  </aside>
</template>

<script setup>
defineProps({
  roleName: {
    type: String,
    default: 'User'
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

defineEmits(['logout'])
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
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 20px 12px 20px;
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