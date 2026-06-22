<template>
  <header class="header-container">

    <!-- TOP BAR -->
    <div class="top-bar">
      <div class="top-content">

        <div class="top-left">
          <div class="top-info">
            <i class="fas fa-envelope"></i>
            <span>quizpralong@gmail.com</span>
          </div>

          <div class="top-info">
            <i class="fas fa-phone"></i>
            <span>+855 96 403 4434</span>
          </div>
        </div>

        <div class="top-right">
          <div class="top-info">
            <i class="fas fa-graduation-cap"></i>
            <span>Interactive Quiz Platform</span>
          </div>
        </div>

      </div>
    </div>

    <!-- NAVBAR -->
    <div class="navbar-main">

      <!-- LOGO -->
      <router-link class="logo-link" to="/">
        <img
          :src="logo"
          alt="Logo"
          class="logo-image"
        />

      </router-link>

      <!-- DESKTOP NAV -->
      <nav class="desktop-nav">

        <router-link
          class="nav-item"
          to="/"
        >
          ទំព័រដើម
        </router-link>

        <router-link
          class="nav-item"
          to="/features"
        >
          មុខងារសំខាន់ៗ
        </router-link>

        <router-link
          class="nav-item"
          to="/about"
        >
          អំពីយើង
        </router-link>

      </nav>

      <!-- RIGHT -->
      <div class="navbar-right">

        <router-link
          class="login-btn"
          :to="{ name: 'Login' }"
        >
          <i class="fas fa-user"></i>
          ចូលប្រើប្រាស់
        </router-link>

        <button
          class="mobile-btn"
          @click="isMobileOpen = !isMobileOpen"
        >
          <i class="fas fa-bars"></i>
        </button>

      </div>

    </div>

    <!-- MOBILE MENU -->
    <transition name="slide">
      <div
        v-if="isMobileOpen"
        class="mobile-menu"
      >
        <router-link
          class="mobile-item"
          to="/"
          @click="closeMenu"
        >
          Home
        </router-link>

        <router-link
          class="mobile-item"
          to="/features"
          @click="closeMenu"
        >
          Features
        </router-link>

        <router-link
          class="mobile-item"
          to="/about"
          @click="closeMenu"
        >
          About Us
        </router-link>

        <router-link
          class="mobile-login"
          :to="{ name: 'Login' }"
          @click="closeMenu"
        >
          Login
        </router-link>
      </div>
    </transition>

  </header>
</template>

<script setup>
import { ref } from "vue";
import logo from "@/assets/images/pralong-logo.png";

const isMobileOpen = ref(false);

const closeMenu = () => {
  isMobileOpen.value = false;
};
</script>

<style scoped>
:root {
  --primary: #10b981;
  --secondary: #059669;
}

.header-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  background: white;
  box-shadow: 0 2px 15px rgba(0,0,0,.05);
}

/* TOP BAR - Kept original solid green gradient */
.top-bar {
  background: linear-gradient(
    135deg,
    #10b981,
    #059669
  );
  color: white;
  height: 42px;
}

.top-content {
  max-width: 1300px;
  margin: auto;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

.top-left,
.top-right {
  display: flex;
  align-items: center;
  gap: 24px;
}

.top-info {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
}

.top-info i {
  font-size: 12px;
}

/* NAVBAR */
.navbar-main {
  max-width: 1300px;
  margin: auto;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
}

/* LOGO */
.logo-link {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
}

.logo-image {
  width: 200px;
  height: 200px;
  object-fit: contain;
}

.logo-title {
  font-size: 24px;
  font-weight: 800;
  color: #111827;
}

/* NAVIGATION */
.desktop-nav {
  display: flex;
  gap: 40px;
}

.nav-item {
  text-decoration: none;
  color: #4b5563; 
  font-weight: 600;
  font-size: 17px;
  letter-spacing: 0.3px;
  padding: 8px 0;
  transition: color 0.25s ease;
  position: relative;
}

.nav-item:hover {
  color: #10b981; /* Smooth hover transition */
}


.nav-item.router-link-active {
  color: #10b981 !important;
}

.nav-item.router-link-active::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 10%;
  width: 80%; /* Shorter, centered underline under the menu text */
  height: 2px; /* Ultra-thin sleek indicator */
  border-radius: 2px;
  background-color: #10b981;
}

/* REMOVED: The green underline line (.router-link-active::after) has been deleted */

/* RIGHT */
.navbar-right {
  display: flex;
  align-items: center;
  gap: 15px;
}

.login-btn {
  text-decoration: none;
  padding: 12px 24px;
  border-radius: 12px;
  background: linear-gradient(
    135deg,
    #10b981,
    #059669
  );
  color: white;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all .3s ease;
  box-shadow: 0 4px 14px rgba(16,185,129,.25);
}

.login-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(16,185,129,.35);
}

.mobile-btn {
  display: none;
  border: none;
  background: none;
  font-size: 24px;
  cursor: pointer;
}

/* MOBILE MENU */
.mobile-menu {
  background: white;
  border-top: 1px solid #eee;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.mobile-item {
  text-decoration: none;
  color: #374151;
  font-weight: 600;
  padding: 12px;
  border-radius: 10px;
}

.mobile-item:hover {
  background: #f3f4f6;
}

.mobile-login {
  text-decoration: none;
  background: #10b981;
  color: white;
  text-align: center;
  padding: 12px;
  border-radius: 12px;
  font-weight: 600;
}

/* ANIMATION */
.slide-enter-active,
.slide-leave-active {
  transition: .3s;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* RESPONSIVE */
@media (max-width: 992px) {
  .desktop-nav {
    display: none;
  }

  .login-btn {
    display: none;
  }

  .mobile-btn {
    display: block;
  }
}

@media (max-width: 768px) {
  .top-content {
    flex-direction: column;
    gap: 5px;
    padding: 8px 15px;
  }

  .top-left {
    flex-direction: column;
    gap: 4px;
  }

  .top-right {
    display: none;
  }

  .top-bar {
    height: auto;
    padding: 6px 0;
  }

  .navbar-main {
    height: 70px;
  }

  .logo-title {
    font-size: 20px;
  }
}
</style>