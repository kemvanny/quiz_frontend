<template>
  <header
    class="header-container"
    :class="{ 'is-scrolled': isScrolled, 'is-mobile-open': isMobileOpen }"
  >
    <div class="header-wrapper">
      <!-- LOGO -->
      <router-link
        class="logo-link"
        :to="{ name: 'Home' }"
        aria-label="ទំព័រដើម Prolong"
        @click="isMobileOpen = false"
      >
        <div class="logo-badge">
          <span class="logo-char">E</span>
          <div class="logo-glow"></div>
        </div>
        <span class="logo-title">Prolong</span>
      </router-link>

      <!-- DESKTOP NAVIGATION -->
      <nav class="desktop-nav" aria-label="ការរុករកចម្បង">
        <router-link
          class="nav-item"
          :to="{ name: 'Home' }"
          active-class="nav-active"
        >
          <i class="fas fa-house nav-icon"></i>
          <span class="nav-text">ទំព័រដើម</span>
        </router-link>

        <router-link
          class="nav-item"
          :to="{ name: 'About' }"
          active-class="nav-active"
        >
          <i class="fas fa-circle-info nav-icon"></i>
          <span class="nav-text">អំពី</span>
        </router-link>

        <router-link
          class="nav-item"
          :to="{ name: 'Features' }"
          active-class="nav-active"
        >
          <i class="fas fa-layer-group nav-icon"></i>
          <span class="nav-text">មុខងារ</span>
        </router-link>
      </nav>

      <!-- ACTIONS -->
      <div class="header-actions">
        <router-link class="btn-login" :to="{ name: 'Login' }">
          <span class="btn-inner">
            <i class="fas fa-right-to-bracket"></i>
            ចូលប្រើ
          </span>
          <div class="btn-glow-layer"></div>
        </router-link>

        <button
          class="menu-hamburger"
          :class="{ 'is-active': isMobileOpen }"
          @click="isMobileOpen = !isMobileOpen"
          aria-label="Toggle Menu"
        >
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
        </button>
      </div>
    </div>

    <!-- MOBILE MENU -->
    <transition name="drawer-slide">
      <div v-if="isMobileOpen" class="mobile-drawer">
        <nav class="mobile-nav">
          <router-link
            class="mobile-nav-item"
            :to="{ name: 'Home' }"
            active-class="nav-active"
            @click="isMobileOpen = false"
          >
            <i class="fas fa-house"></i>
            <span>ទំព័រដើម</span>
          </router-link>

          <router-link
            class="mobile-nav-item"
            :to="{ name: 'About' }"
            active-class="nav-active"
            @click="isMobileOpen = false"
          >
            <i class="fas fa-circle-info"></i>
            <span>អំពី</span>
          </router-link>

          <router-link
            class="mobile-nav-item"
            :to="{ name: 'Features' }"
            active-class="nav-active"
            @click="isMobileOpen = false"
          >
            <i class="fas fa-layer-group"></i>
            <span>មុខងារ</span>
          </router-link>

          <div class="mobile-nav-divider"></div>

          <div class="mobile-actions-wrapper">
            <router-link
              class="mobile-cta-btn"
              :to="{ name: 'Login' }"
              @click="isMobileOpen = false"
            >
              <i class="fas fa-right-to-bracket"></i>
              <span>ចូលប្រើប្រាស់ឥឡូវនេះ</span>
            </router-link>
          </div>
        </nav>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const isScrolled = ref(false);
const isMobileOpen = ref(false);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
/* ==========================================================================
   HEADER CONTAINER & DESIGN SYSTEM
   ========================================================================== */
.header-container {
  /* Design system variables local scoping to guarantee cross-browser support */
  --brand-primary: #10b981;
  --brand-secondary: #059669;
  --brand-glow: rgba(16, 185, 129, 0.35);
  --bg-glass: rgba(255, 255, 255, 0.75);
  --border-glass: rgba(255, 255, 255, 0.5);
  --text-primary: #111827;
  --text-secondary: #4b5563;
  --font-khmer:
    "Kantumruy Pro", "Koh Santepheap", "Preahvihear", system-ui, -apple-system,
    sans-serif;

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  padding: 20px 24px;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  font-family: var(--font-khmer), sans-serif;
}

/* ICON STYLES */
.nav-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.nav-icon {
  font-size: 14px;
  transition: all 0.3s ease;
}

.nav-item:hover .nav-icon {
  transform: scale(1.15);
}

.btn-inner {
  display: flex;
  align-items: center;
  gap: 8px;
}

.mobile-nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.mobile-nav-item i {
  width: 20px;
  text-align: center;
  color: #10b981;
  font-size: 16px;
}

.mobile-cta-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.nav-item.nav-active i {
  color: white;
}

/* Scroll Modifier: shrinks padding and refines glassmorphism */
.header-container.is-scrolled {
  padding: 12px 24px;
}

.header-wrapper {
  max-width: 1280px;
  margin: 0 auto;
  height: 76px; /* Slightly taller for larger font legibility */
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--bg-glass);
  backdrop-filter: blur(20px) saturate(190%);
  -webkit-backdrop-filter: blur(20px) saturate(190%);
  border: 1px solid var(--border-glass);
  border-radius: 24px;
  padding: 0 28px;
  box-shadow:
    0 1px 2px rgba(0, 0, 0, 0.02),
    0 8px 32px rgba(0, 0, 0, 0.04),
    inset 0 1px 0 rgba(255, 255, 255, 0.6);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.header-container.is-scrolled .header-wrapper {
  height: 72px;
  background: rgba(255, 255, 255, 0.88);
  border-radius: 20px;
  box-shadow:
    0 1px 2px rgba(0, 0, 0, 0.02),
    0 12px 40px rgba(0, 0, 0, 0.06),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
}

/* ==========================================================================
   BRAND LOGO (E-Prolong)
   ========================================================================== */
.logo-link {
  display: flex;
  align-items: center;
  gap: 14px;
  text-decoration: none;
  cursor: pointer;
}

.logo-badge {
  position: relative;
  width: 46px; /* Made slightly bigger to balance larger font sizes */
  height: 46px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  background: linear-gradient(
    135deg,
    var(--brand-primary),
    var(--brand-secondary)
  );
  color: #ffffff;
  font-size: 22px; /* Bigger logo character */
  font-weight: 800;
  box-shadow: 0 4px 14px var(--brand-glow);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.logo-glow {
  position: absolute;
  inset: -2px;
  background: inherit;
  filter: blur(10px);
  opacity: 0;
  border-radius: 17px;
  z-index: -1;
  transition: opacity 0.4s ease;
}

.logo-link:hover .logo-badge {
  transform: translateY(-2px) scale(1.03);
  box-shadow: 0 8px 24px rgba(16, 185, 129, 0.4);
}

.logo-link:hover .logo-glow {
  opacity: 0.6;
}

.logo-title {
  font-size: 24px; /* Increased from 20px for high premium visibility */
  font-weight: 800;
  color: var(--text-primary);
  letter-spacing: -0.03em;
  background: linear-gradient(
    to right,
    var(--text-primary) 60%,
    var(--brand-secondary)
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  transition: all 0.3s ease;
}

/* ==========================================================================
   DESKTOP NAV LINKS
   ========================================================================== */
.desktop-nav {
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(0, 0, 0, 0.03);
  padding: 6px;
  border-radius: 99px;
  border: 1px solid rgba(0, 0, 0, 0.02);
}

.nav-item {
  position: relative;
  text-decoration: none;
  padding: 12px 26px; /* More padding for larger click area and text */
  color: var(--text-secondary);
  font-size: 16px; /* Increased from 14px for improved readability */
  font-weight: 700;
  border-radius: 99px;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1.4;
}

/* Hover background pill animation */
.nav-item::before {
  content: "";
  position: absolute;
  inset: 0;
  background: rgba(16, 185, 129, 0.08);
  border-radius: 99px;
  transform: scale(0.85);
  opacity: 0;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: -1;
}

.nav-item:hover {
  color: var(--brand-secondary);
}

.nav-item:hover::before {
  transform: scale(1);
  opacity: 1;
}

/* Active navigation status - matched with the primary brand green gradient */
.nav-item.nav-active {
  color: #ffffff;
  background: linear-gradient(
    135deg,
    var(--brand-primary),
    var(--brand-secondary)
  );
  box-shadow: 0 4px 14px var(--brand-glow);
}

.nav-item.nav-active::before {
  display: none;
}

/* ==========================================================================
   HEADER ACTIONS (Primary Login CTA Style)
   ========================================================================== */
.header-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

/* Redesigned: Premium Large Login CTA Button */
.btn-login {
  position: relative;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 28px;
  border-radius: 15px;
  background: linear-gradient(
    135deg,
    var(--brand-primary),
    var(--brand-secondary)
  );
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 4px 14px var(--brand-glow);
  cursor: pointer;
}

.btn-inner {
  color: #ffffff;
  font-size: 16px; /* Increased from 14px for bold presentation */
  font-weight: 700;
  z-index: 2;
  position: relative;
}

/* Smooth dark overlay transition on hover */
.btn-glow-layer {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, var(--brand-secondary), #047857);
  opacity: 0;
  z-index: 1;
  transition: opacity 0.3s ease;
}

.btn-login:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 22px rgba(16, 185, 129, 0.45);
}

.btn-login:hover .btn-glow-layer {
  opacity: 1;
}

.btn-login:active {
  transform: translateY(0) scale(0.98);
}

/* ==========================================================================
   MOBILE HAMBURGER TRIGGER
   ========================================================================== */
.menu-hamburger {
  display: none;
  flex-direction: column;
  justify-content: space-around;
  width: 26px;
  height: 22px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 1001;
}

.hamburger-line {
  width: 26px;
  height: 2.5px;
  background-color: var(--text-primary);
  border-radius: 10px;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.menu-hamburger.is-active .hamburger-line:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
  background-color: var(--brand-secondary);
}

.menu-hamburger.is-active .hamburger-line:nth-child(2) {
  opacity: 0;
  transform: translateX(-10px);
}

.menu-hamburger.is-active .hamburger-line:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
  background-color: var(--brand-secondary);
}

/* ==========================================================================
   MOBILE DRAWER SLIDEOVER
   ========================================================================== */
.mobile-drawer {
  position: absolute;
  top: 88px;
  left: 16px;
  right: 16px;
  background: rgba(255, 255, 255, 0.96);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 24px;
  padding: 26px;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.12);
  z-index: 1000;
  overflow: hidden;
}

/* Handle drawer positioning when the header is in scrolled state */
.header-container.is-scrolled .mobile-drawer {
  top: 80px;
}

.mobile-nav {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.mobile-nav-item {
  text-decoration: none;
  font-size: 18px; /* Increased from 16px for comfortable mobile reading */
  font-weight: 700;
  color: #374151;
  padding: 14px 20px;
  border-radius: 14px;
  transition: all 0.25s ease;
}

.mobile-nav-item:hover,
.mobile-nav-item.nav-active {
  background: rgba(16, 185, 129, 0.08);
  color: var(--brand-secondary);
  padding-left: 24px;
}

.mobile-nav-divider {
  height: 1px;
  background: rgba(0, 0, 0, 0.06);
  margin: 6px 0;
}

.mobile-actions-wrapper {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 8px;
}

.mobile-cta-btn {
  text-decoration: none;
  text-align: center;
  font-size: 17px; /* Increased from 15px */
  font-weight: 700;
  color: #ffffff;
  padding: 16px;
  border-radius: 16px;
  background: linear-gradient(
    135deg,
    var(--brand-primary),
    var(--brand-secondary)
  );
  box-shadow: 0 8px 20px rgba(16, 185, 129, 0.25);
  transition: all 0.3s ease;
}

.mobile-cta-btn:active {
  transform: scale(0.98);
}

/* Transitions classes for mobile drawer toggles */
.drawer-slide-enter-active,
.drawer-slide-leave-active {
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.drawer-slide-enter-from,
.drawer-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.98);
}

/* ==========================================================================
   RESPONSIVE LAYOUT SYSTEM
   ========================================================================== */
@media (max-width: 900px) {
  .desktop-nav {
    display: none;
  }

  .menu-hamburger {
    display: flex;
  }

  .btn-login {
    display: none;
  }

  .header-container {
    padding: 16px 16px;
  }

  .header-container.is-scrolled {
    padding: 10px 16px;
  }
}
</style>