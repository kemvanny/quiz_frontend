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
          <div class="search-wrapper">
            <div class="search-wrap">
              <i class="bi bi-search"></i>
              <input 
                type="text" 
                placeholder="ស្វែងរកអ្នកប្រើប្រាស់..." 
                v-model="searchQuery"
                @focus="isDropdownOpen = true"
              />
              <span v-if="isLoading" class="spinner-border spinner-border-sm text-success search-spinner"></span>
            </div>

            <div v-if="isDropdownOpen && searchQuery.trim() !== ''" class="search-dropdown-result">
              <div v-if="isLoading" class="dropdown-status">កំពុងស្វែងរក...</div>
              <div v-else-if="usersList.length === 0" class="dropdown-status">មិនមានទិន្នន័យឡើយ 🔍</div>
              
              <ul v-else class="result-list">
                <li 
                  v-for="user in usersList" 
                  :key="user.id" 
                  @click="handleSelectUser(user)"
                  class="result-item"
                >
                  <img 
                    :src="user.avatar === 'default.png' ? defaultImage : `${imgBaseUrl}${user.avatar}`" 
                    class="user-avatar-sm" 
                    alt="avatar" 
                  />
                  <div class="user-info-meta">
                    <span class="user-name-text">{{ user.fullName }}</span>
                    <span class="user-sub-text">{{ user.user_code }} • {{ user.email }}</span>
                  </div>
                  <span :class="['role-tag', user.role]">{{ user.role }}</span>
                </li>
              </ul>
            </div>
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
import { ref, onMounted ,onUnmounted,watch} from 'vue'
import { useRouter } from 'vue-router'
import { getProfile } from '@/api/auth.api'
import { getSearchUsers } from '@/api/admin.api'
import defaultImage from '../assets/images/default.png';

const router = useRouter()

const imgBaseUrl = import.meta.env.VITE_BASE_URL_FOR_IMAGE;


const adminProfile = ref({
  fullName: '',
  email: '',
  role: ''
})

const usersList = ref([]);
const isLoading = ref(false);
const searchQuery = ref('');
const isDropdownOpen = ref(false);
let searchTimeout = null

const adminMainMenus = [
  { name: 'ផ្ទាំងគ្រប់គ្រង', routeName: 'AdminDashboard', icon: 'bi bi-grid-1x2-fill' },
  { name: 'គ្រប់គ្រងអ្នកប្រើប្រាស់', routeName: 'UserManagement', icon: 'bi bi-people-fill' },
  { name: 'គ្រប់គ្រងការប្រឡង', routeName: 'QuizManagement', icon: 'bi bi-journal-check' },
  { name: 'លទ្ធផល និងការបញ្ជូន', routeName: 'ResultSubmission', icon: 'bi bi-bar-chart-fill' }
]

const adminSystemMenus = [
  { name: 'ព័ត៏មានសង្ខេប', routeName: 'ProfileAdmin', icon: 'bi bi-gear-fill' },
  { name: 'ស្ថានភាពប្រព័ន្ធ', routeName: 'SystemHealth', icon: 'bi bi-shield-check' },
]

const handleLogout = () => {
  sessionStorage.clear();    
  router.push('/login');  
};

const fetchSearchResults = async (search = '') => {
  if (!search) {
    usersList.value = []
    return
  }
  isLoading.value = true
  try {
    const response = await getSearchUsers(search)
    
   
    console.log("លទ្ធផលពី Backend:", response.data)

    
    if (response.data) {
      
      if (response.data.data) {
        usersList.value = response.data.data
      } 
      
      else if (Array.isArray(response.data)) {
        usersList.value = response.data
      }
    }
  } catch (error) {
    console.error("ការស្វែងរកមានបញ្ហា:", error)
  } finally {
    isLoading.value = false
  }
}

watch(searchQuery, (newQuery) => {
  clearTimeout(searchTimeout)
  
  if (newQuery.trim() === '') {
    usersList.value = []
    return
  }
  
  searchTimeout = setTimeout(() => {
    fetchSearchResults(newQuery.trim())
  }, 400)
})

const handleSelectUser = (user) => {
  searchQuery.value = user.fullName
  isDropdownOpen.value = false
}

const handleClickOutside = (event) => {
  const wrapper = document.querySelector('.search-wrapper')
  if (wrapper && !wrapper.contains(event.target)) {
    isDropdownOpen.value = false
  }
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
  document.addEventListener('click', handleClickOutside) 
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.user-role {
  font-size: 12px;
  color: var(--text-muted);
  text-transform: uppercase; 
}
.search-wrapper {
  position: relative;
  width: 320px; 
}

.search-dropdown-result {
  position: absolute;
  top: calc(100% + 8px); 
  left: 0;
  width: 100%;
  background: #ffffff;
  border-radius: 12px; 
  
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 
              0 8px 16px -6px rgba(0, 0, 0, 0.05),
              0 0 1px 0 rgba(0, 0, 0, 0.1);
              
  border: 1px solid rgba(0, 0, 0, 0.04);
  max-height: 280px; 
  overflow-y: auto;
  z-index: 9999; 
}

.dropdown-status {
  padding: 16px;
  text-align: center;
  color: #718096;
  font-size: 13px;
  font-family: 'Kantumruy Pro', 'Hanuman', sans-serif; 
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}


.result-list {
  list-style: none;
  padding: 6px; 
  margin: 0;
}

.result-item {
  display: flex;
  align-items: center;
  padding: 10px 12px;
  cursor: pointer;
  border-radius: 8px; 
  transition: all 0.2s ease;
}

.result-item:hover {
  background-color: #f0fdf4; 
}


.user-avatar-sm {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 12px;
  border: 1px solid #edf2f7;
}

.user-info-meta {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.user-name-text {
  font-size: 13px;
  font-weight: 500;
  color: #2d3748;
  line-height: 1.4;
}

.user-sub-text {
  font-size: 11px;
  color: #a0aec0;
}


.role-tag {
  font-size: 10px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 99px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.role-tag.admin { background: #fee2e2; color: #ef4444; }
.role-tag.teacher { background: #dbeafe; color: #3b82f6; }
.role-tag.student { background: #dcfce7; color: #22c55e; }

.search-dropdown-result::-webkit-scrollbar {
  width: 6px;
}
.search-dropdown-result::-webkit-scrollbar-track {
  background: transparent;
}
.search-dropdown-result::-webkit-scrollbar-thumb {
  background: #cbd5e0;
  border-radius: 99px;
}
</style>
