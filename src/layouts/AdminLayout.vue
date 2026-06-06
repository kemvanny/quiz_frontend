<template>
  <div class="app-layout">
    <BaseSidebar roleName="Admin" :userProfile="adminProfile" :mainMenus="adminMainMenus" :systemMenus="adminSystemMenus" @logout="handleLogout">
      <template #main-menus>
        <div class="nav-section-label">មុខងារ</div>
      </template>
      <template #system-menus>
        <div class="nav-section-label" style="margin-top: 12px">ប្រព័ន្ធ</div>
      </template>
    </BaseSidebar>

    <div class="main-wrapper">
      <BaseNavbar>
        <template #left>
          <div class="search-wrap">
            <i class="bi bi-search"></i>
            <input type="text" placeholder="ស្វែងរកអ្នកប្រើប្រាស់, វិញ្ញាសា, ​បន្ទប់..." />
          </div>
        </template>
        <template #right>
          <div class="user-info">
            <button class="notif-btn">
              <i class="bi bi-bell"></i>
              <span class="dot"></span>
            </button>
            <img :src="`${imgBaseUrl}${adminProfile.avatar}`" class="avatar" alt="Admin" />
            <div>
              <div class="user-name">{{ adminProfile.firstName }} {{ adminProfile.lastName }}</div>
              <div class="user-role">{{ adminProfile.role }}</div>
            </div>
          </div>
        </template>
      </BaseNavbar>

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
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getProfile } from '@/api/auth.api'

const router = useRouter()

const imgBaseUrl = import.meta.env.VITE_BASE_URL_FOR_IMAGE;

const adminProfile = ref({
  fullName: '',
  email: '',
  role: ''
})

const adminMainMenus = [
  { name: 'ផ្ទាំងគ្រប់គ្រង', routeName: 'AdminDashboard', icon: 'bi bi-grid-1x2-fill' },
  { name: 'គ្រប់គ្រងអ្នកប្រើប្រាស់', routeName: 'UserManagement', icon: 'bi bi-people-fill' },
  { name: 'គ្រប់គ្រងការប្រឡង', routeName: 'QuizManagement', icon: 'bi bi-journal-check' },
  { name: 'លទ្ធផល និងការបញ្ជូន', routeName: 'ResultSubmission', icon: 'bi bi-bar-chart-fill' }
]

const adminSystemMenus = [
  { name: 'ការកំណត់', routeName: 'Settings', icon: 'bi bi-gear-fill' },
  { name: 'ស្ថានភាពប្រព័ន្ធ', routeName: 'SystemHealth', icon: 'bi bi-shield-check' },
]


const handleLogout = () => {
  sessionStorage.clear()
  router.push('/login')
}

const fetchAdminProfile = async () => {
  try {
    const res = await getProfile()

    if (res.data && res.data.data) {
      adminProfile.value = res.data.data
    }
  } catch (error) {
    console.error("មិនអាចទាញទិន្នន័យ Profile បានទេ:", error)

    if (error.response && error.response.status === 401) {
      handleLogout()
    }
  }
}

onMounted(() => {
  fetchAdminProfile()
})
</script>

<style scoped>
.user-role {
  font-size: 12px;
  color: var(--text-muted);
  text-transform: uppercase; 
}
</style>
