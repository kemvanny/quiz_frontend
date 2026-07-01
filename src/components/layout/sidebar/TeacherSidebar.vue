<template>
  <aside class="sidebar">
    <div class="sidebar-brand">
      <a href="#">
        <img :src="logoImage" alt="Pralong Logo" class="brand-logo" />
      </a>
    </div>

    <div class="sidebar-nav-container">
      <div class="d-flex flex-column gap-1 fw-normal">
        <router-link :to="{ name: 'TeacherDashboard' }" class="nav-link">
          <i class="fas fa-th-large"></i> ផ្ទាំងគ្រប់គ្រង
        </router-link>

        <router-link :to="{ name: 'Quizzes' }" class="nav-link">
          <i class="fas fa-edit"></i>
          <span>បង្កើតការប្រឡង</span>
        </router-link>

        <router-link
          :to="{ name: 'RoomManagement' }"
          class="nav-link"
          active-class="active"
          :class="{
            active:
              $route.name === 'ClassStream' || $route.name === 'RoomDetail',
          }"
        >
          <i class="fas fa-users"></i> គ្រប់គ្រងថ្នាក់រៀន
        </router-link>
        <router-link :to="{ name: 'AllExams' }" class="nav-link">
          <i class="fas fa-file-alt"></i> បញ្ជីវិញ្ញាសា
        </router-link>
        <router-link :to="{ name: 'StudentResults' }" class="nav-link">
          <i class="fas fa-chart-bar"></i> លទ្ធផលសិស្ស
        </router-link>
        <router-link :to="{ name: 'Profile' }" class="nav-link">
          <i class="fas fa-user-circle"></i> ប្រវត្តិរូប
        </router-link>
      </div>
    </div>

    <div class="sidebar-footer">
      <button type="button" class="btn-logout" @click="openLogoutModal">
        <i class="fas fa-sign-out-alt"></i> 
        <span>ចាកចេញពីគណនី</span>
      </button>
    </div>
  </aside>

  <BaseModal
      :isOpen="isLogoutModalOpen"
      @close="isLogoutModalOpen = false"
      width="350px"
    >
      <div class="p-3 text-center">
        <div class="modal-icon-alert text-warning mb-3">
          <i class="fas fa-sign-out-alt fa-2x"></i>
        </div>
        <h5 class="fw-bold text-dark mb-2" style="font-size: 1.1rem">
          ចាកចេញពីប្រព័ន្ធ?
        </h5>
        <p class="text-muted mb-4 small" style="line-height: 1.5">
          តើអ្នកពិតជាចង់បញ្ចប់ការងារ និងចាកចេញពីគណនីបច្ចុប្បន្ននេះមែនទេ?
        </p>
        <div class="d-flex gap-2 w-100">
          <button
            class="btn btn-outline flex-fill"
            @click="isLogoutModalOpen = false"
          >
            បោះបង់
          </button>
          <button
            class="btn btn-danger flex-fill"
            style="margin-top: 0"
            @click="confirmSignOut"
          >
            ចាកចេញ
          </button>
        </div>
      </div>
    </BaseModal>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { logoutAPI } from "@/api/auth.api";
import { useAuthStore } from "@/stores/auth";
import logoImage from "../../../assets/images/pralong-logo.png";

const router = useRouter();
const toast = useToast();
const authStore = useAuthStore();

const toastConfig = {
  position: "bottom-right",
  timeout: 3000,
  closeOnClick: true,
  pauseOnHover: true,
};

const isLogoutModalOpen = ref(false);
const openLogoutModal = () => {
  isLogoutModalOpen.value = true;
};

const confirmSignOut = async () => {
  isLogoutModalOpen.value = false;

  try {
    await logoutAPI(); 
  } catch (err) {
    console.error("Logout API error (Safe to ignore):", err);
  }

  try {
    if (typeof authStore.$reset === 'function') {
      authStore.$reset();
    }
  } catch (e) {
    console.error("Store reset failed:", e);
  }
  
  localStorage.clear();
  sessionStorage.clear();

  toast.success("ចាកចេញជោគជ័យ", toastConfig);

  setTimeout(() => {
    router.replace({ name: "Home" }).catch((err) => {
      console.error("Vue Router blocked navigation. Forcing hard redirect...", err);
      window.location.href = "/";
    });
  }, 1200);
};
</script>

<style scoped>
/* Ensure the sidebar acts as a flex container so footer stays at bottom */
.sidebar {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.sidebar-nav-container {
  flex: 1;
  overflow-y: auto;
  padding-bottom: 20px;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.sidebar-nav-container::-webkit-scrollbar {
  display: none;
}

.nav-link {
  font-weight: 550 !important;
}

.nav-link.active {
  background-color: #10b981 !important;
  color: white !important;
  border-radius: 8px;
  font-weight: 600;
}

.nav-link.active i {
  color: white !important;
}

/* ================= MODERN LOGOUT BUTTON STYLES ================= */
.sidebar-footer {
  padding: 15px 16px;
  border-top: 1px solid #f1f5f9; /* Subtle top border separator */
  background-color: #ffffff;
}

.btn-logout {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 12px 16px;
  background-color: transparent;
  border: none;
  border-radius: 8px;
  color: #ef4444; /* Modern tailwind crimson red */
  font-weight: 550;
  font-size: 0.95rem;
  text-align: left;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
}

.btn-logout i {
  font-size: 1.1rem;
  transition: transform 0.2s ease;
}

/* Elegant hover state matching modern application menus */
.btn-logout:hover {
  background-color: #fef2f2; /* Soft tint red background */
  color: #dc2626;
}

.btn-logout:hover i {
  transform: translateX(-2px); /* Subtle nudge animation on sign-out icon */
}

.btn-logout:active {
  transform: scale(0.98);
}

/* ================= UTILITY / CARRIED OVER STYLES ================= */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.7s ease;
  max-height: 200px;
  overflow: hidden;
}

.dropdown-enter-from,
.dropdown-leave-to {
  max-height: 0;
  opacity: 0;
}

.dropdown-enter-to,
.dropdown-leave-from {
  max-height: 200px;
  opacity: 1;
}

.sidebar-cta {
  width: 85% !important;
  margin: 0 auto 20px auto;
  border: 2px dashed rgba(16, 185, 129, 0.25);
  border-radius: 14px;
  background: var(--em-soft);
  cursor: pointer;
  transition: 0.2s;
}

.sidebar-cta:hover {
  background: #d1fae5;
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

.btn-danger {
  background-color: #ef4444 !important;
  border: 1px solid #ef4444 !important;
  color: #ffffff !important;
}
.btn-danger:hover {
  background-color: #dc2626 !important;
}
</style>