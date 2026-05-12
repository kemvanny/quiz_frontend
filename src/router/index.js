import { createRouter, createWebHistory } from 'vue-router'
import AdminLayout from '@/layouts/AdminLayout.vue'
import AdminDashboard from '@/views/dashboard/AdminDashboard.vue'
import UserManagement from '@/views/admin/UserManagement.vue'
import QuizManagement from '@/views/admin/QuizManagement.vue'
import ResultSubmission from '@/views/admin/ResultSubmission.vue'
import Setting from '@/views/admin/Setting.vue'
import SystemHealth from '@/views/admin/SystemHealth.vue'
import Help from '@/views/admin/Help.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/admin/dashboard' 
    },
    {
      path: '/admin',
      component: AdminLayout,
      children: [
        {
          path: 'dashboard', 
          name: 'AdminDashboard',
          component: AdminDashboard,
          meta : {title: "Dashboard"}
        },
        {
          path: 'users-management',
          name: 'UserManagement',
          component: UserManagement,
          meta : {title: "User Management"}
        },
        {
          path: 'quizzes',
          name: 'QuizManagement',
          component: QuizManagement,
          meta : {title: "Quiz Management"}
        },
        {
          path: 'results-submissions',
          name: 'ResultSubmission',
          component: ResultSubmission,
          meta : {title: "Results & Submissions"}
        },
        {
          path: 'settings',
          name: 'Settings',
          component: Setting,
          meta : {title: "Settings"}
        },
        {
          path: 'system-health',
          name: 'SystemHealth',
          component: SystemHealth,
          meta : {title: "System Health"}
        },
        {
          path: 'help',
          name: 'Help',
          component: Help,
          meta : {title: "Help"}
        }

      ]
    },
  ]
})

export default router