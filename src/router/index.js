import { createRouter, createWebHistory } from 'vue-router'
import AdminLayout from '@/layouts/AdminLayout.vue'
import AdminDashboard from '@/views/dashboard/AdminDashboard.vue'
import UserManagement from '@/views/admin/UserManagement.vue'
import QuizManagement from '@/views/admin/QuizManagement.vue'
import ResultSubmission from '@/views/admin/ResultSubmission.vue'
import Setting from '@/views/admin/Setting.vue'
import SystemHealth from '@/views/admin/SystemHealth.vue'
import Help from '@/views/admin/Help.vue'
import Login from '@/views/auth/Login.vue'
import TeacherLayout from '@/layouts/TeacherLayout.vue'
import TeacherDashboard from '@/views/dashboard/TeacherDashboard.vue'
import StudentLayout from '@/layouts/StudentLayout.vue'
import StudentDashboard from '@/views/dashboard/StudentDashboard.vue'
import Quizzes from '@/views/teacher/Quizzes.vue'
import Assignment from '@/views/teacher/Assignment.vue'
import FinalExam from '@/views/teacher/FinalExam.vue'
import RoomManagement from '@/views/teacher/RoomManagement.vue'
import ClassStream from '@/views/teacher/ClassStream.vue'
import StudentResults from '@/views/teacher/StudentResults.vue'
import TeacherValidations from '@/views/teacher/TeacherValidations.vue'
import Profile from '@/views/teacher/Profile.vue'
import AnalyticsResult from '@/views/student/AnalyticsResult.vue'
import ProfileSetting from '@/views/student/ProfileSetting.vue'
import Classroom from '@/views/student/Classroom.vue'
import Assignmentt from '@/views/student/Assignment.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login' 
    },
    {
      path: '/login',
      name: 'Login',
      component:Login,
      meta: {title:"Login"}
    },
    {
      path: '/admin',
      component: AdminLayout,
      meta: { requiresAuth: true, role: 'admin' },
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
    {
      path:'/teacher',
      component:TeacherLayout,
      meta: { requiresAuth: true, role: 'teacher' },
      children: [
      {
        path: 'dashboard',
        name: 'TeacherDashboard',
        component: TeacherDashboard,
        meta: {title: "Teacher Dashboard"}
      },
      {
        path: 'quizzes',
        name: 'Quizzes',
        component: Quizzes,
        meta: {title: "Quizzes"}
      },
      {
        path: 'assignment',
        name: 'Assignment',
        component: Assignment,
        meta: {title: "Assignment"}
      },
      {
        path: 'final-exam',
        name: 'FinalExam',
        component: FinalExam,
        meta: {title: "Final Exam"}
      },
      {
        path: 'room-management',
        name: 'RoomManagement',
        component: RoomManagement,
        meta: {title: "Room Management"}
      },
      {
        path: 'class-stream',
        name: 'ClassStream',
        component: ClassStream,
        meta: {title: "Class Stream"}
      },
      {
        path: 'student-results',
        name: 'StudentResults',
        component: StudentResults,
        meta: {title: "Student Results"}
      },
      {
        path: 'teacher-validations',
        name: 'TeacherValidations',
        component: TeacherValidations,
        meta: {title: "Teacher Validations"}
      },
      {
        path: 'profile',
        name: 'Profile',
        component: Profile,
        meta: {title: "Profile"}
      }
    ]
    },
    {
      path: '/student',
      component: StudentLayout,
      meta: { requiresAuth: true, role: 'student'},
      children: [
        {
          path: 'dashboard',
          name: 'StudentDashboard',
          component: StudentDashboard,
          meta: {title: 'Student Dashboard'}
        },
        {
          path: 'assignment',
          name: 'Assignment',
          component: Assignmentt,
          meta: {title: 'Assignment'}
        },
        {
          path: 'classroom',
          name: 'Classroom',
          component: Classroom,
          meta: {title: 'Classroom'}
        },
        {
          path: 'analytics-result',
          name: 'AnalyticsResult',
          component: AnalyticsResult,
          meta: {title: 'AnalyticsResult'}
        },
        {
          path: 'profile-setting',
          name: 'ProfileSetting',
          component: ProfileSetting,
          meta: {title: 'ProfileSetting'}
        }
      ]

    }
  ]
});

router.beforeEach((to, from) => {
  const isLoggedIn = !!sessionStorage.getItem('user_token');
  const userRoleId = sessionStorage.getItem('user_role'); 
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  
  const requiredRole = to.meta.role; 

  const rolePaths = {
    '1': 'admin',
    '2': 'teacher',
    '3': 'student'
  };

  const userRoleName = rolePaths[userRoleId]; 

  if (requiresAuth && !isLoggedIn) {
    return { path: '/login' };
  }


  if (isLoggedIn) {
    
    if (to.path === '/login' && userRoleName) {
      return { path: `/${userRoleName}/dashboard` };
    }

    if (requiredRole && userRoleName !== requiredRole) {
      return { path: `/${userRoleName}/dashboard` };
    }
  }

  return true;
});

export default router