<template>
  <div class="app-layout">
    <SideBar roleName="Admin" :mainMenus="adminMainMenus" :systemMenus="adminSystemMenus" @logout="handleLogout"/>
     
    <div class="main-wrapper">
    <Navbar searchPlaceholder="ស្វែងរកអ្នកប្រើប្រាស់, វិញ្ញាសា, ​បន្ទប់..." 
    userName="ជី​ វ៉ាន់យូ" 
    userRole="អ្នកគ្រប់គ្រងជាន់ខ្ពស់"/>

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
import { useRouter } from 'vue-router'

const router = useRouter()

const adminMainMenus = [
  { name: 'ផ្ទាំងគ្រប់គ្រង', routeName: 'AdminDashboard', icon: 'bi bi-grid-1x2-fill' },
  { name: 'គ្រប់គ្រងអ្នកប្រើប្រាស់', routeName: 'UserManagement', icon: 'bi bi-people-fill' },
  { name: 'គ្រប់គ្រងការប្រឡង', routeName: 'QuizManagement', icon: 'bi bi-journal-check' },
  { name: 'លទ្ធផល និងការបញ្ជូន', routeName: 'ResultSubmission', icon: 'bi bi-bar-chart-fill' }
]

const adminSystemMenus = [
  { name: 'ការកំណត់', routeName: 'Settings', icon: 'bi bi-gear-fill' },
  { name: 'ស្ថានភាពប្រព័ន្ធ', routeName: 'SystemHealth', icon: 'bi bi-shield-check' },
  { name: 'ជំនួយ', routeName: 'Help', icon: 'bi bi-question-circle' }
]

const handleLogout = () => {
  sessionStorage.clear()
  router.push('/login')
}
</script>
