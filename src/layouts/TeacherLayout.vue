<template>
  <div class="app-layout">
    <SideBar roleName="Teacher" :mainMenus="teacherMainMenus" :systemMenus="teacherSystemMenus" @logout="handleLogout"/>
    
     <div class="main-wrapper">
      <Navbar searchPlaceholder="ស្វែងរកឈ្មោះសិស្ស, លទ្ធផលប្រឡង, កិច្ចការងារ..." 
    userName="លោកគ្រូ វណ្ណា" 
    userRole="សាស្ត្រាចារ្យដេប៉ាតាម៉ង់"/>

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

const teacherMainMenus = [
  { name: 'ផ្ទាំងគ្រប់គ្រង', routeName: 'TeacherDashboard', icon: 'bi bi-grid-1x2-fill' },
  { name: 'បង្កើតការប្រឡង', routeName: 'CreateExam', icon: 'bi bi-pencil-square' }, 
  { name: 'កម្រងសំណួរ', routeName: 'Quizzes', icon: 'bi bi-lightning-charge-fill' },
  { name: 'កិច្ចការងារ', routeName: 'Assignment', icon: 'bi bi-file-earmark-text-fill' },
  { name: 'ប្រឡងបញ្ចប់ចុងគ្រា', routeName: 'FinalExam', icon: 'bi bi-mortarboard-fill' },
  { name: 'គ្រប់គ្រងបន្ទប់រៀន', routeName: 'RoomManagement', icon: 'bi bi-door-open-fill' },
  { name: 'បន្ទាត់ព័ត៌មានថ្នាក់', routeName: 'ClassStream', icon: 'bi bi-chat-square-text-fill' },
  { name: 'លទ្ធផលសិស្ស', routeName: 'StudentResults', icon: 'bi bi-clipboard-data-fill' },
  { name: 'ការផ្ទៀងផ្ទាត់', routeName: 'TeacherValidations', icon: 'bi bi-shield-check' }
]

const teacherSystemMenus = [
  { name: 'ព័ត៌មានផ្ទាល់ខ្លួន', routeName: 'Profile', icon: 'bi bi-person-bounding-box' }
]

const handleLogout = () => {
  sessionStorage.clear()
  router.push('/login')
}
</script>
