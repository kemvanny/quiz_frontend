import { createRouter, createWebHistory } from 'vue-router'
import AdminLayout from '@/layouts/AdminLayout.vue'
import AdminDashboard from '@/views/dashboard/AdminDashboard.vue'
import UserManagement from '@/views/admin/UserManagement.vue'
import QuizManagement from '@/views/admin/QuizManagement.vue'
import ResultSubmission from '@/views/admin/ResultSubmission.vue'
import SystemHealth from '@/views/admin/SystemHealth.vue'
import Login from '@/views/auth/Login.vue'
import TeacherLayout from '@/layouts/TeacherLayout.vue'
import TeacherDashboard from '@/views/dashboard/TeacherDashboard.vue'
import StudentLayout from '@/layouts/StudentLayout.vue'
import StudentDashboard from '@/views/dashboard/StudentDashboard.vue'
import Quizzes from '@/views/teacher/Quizzes.vue'
import FinalExam from '@/views/teacher/FinalExam.vue'
import RoomManagement from '@/views/teacher/RoomManagement.vue'
import RoomDetails from '@/views/teacher/RoomDetail.vue'
import ExamDetailView from '@/views/teacher/ExamDetailView.vue'
import ClassStream from '@/views/teacher/ClassStream.vue'
import StudentResults from '@/views/teacher/StudentResults.vue'
import Profile from '@/views/teacher/Profile.vue'
import AnalyticsResult from '@/views/student/AnalyticsResult.vue'
import ProfileSetting from '@/views/student/ProfileSetting.vue'
import Classroom from '@/views/student/Classroom.vue'
import Assignment from '@/views/student/Assignment.vue'
import Assignments from '@/views/teacher/Assignments.vue'
import ProfileAdmin from '@/views/admin/ProfileAdmin.vue'
import homeScreen from '@/views/landing/homepage.vue'
import aboutScreen from '@/views/landing/aboutUs.vue'
import featuresScreen from '@/views/landing/feature.vue'
import NotFound from '@/views/landing/NotFound.vue'
import AcceptRoom from '@/views/student/AcceptRoom.vue'
import ForgetPassword from '@/views/auth/ForgetPassword.vue'
import ResetPassword from '@/views/auth/ResetPassword.vue'
import CheckEmail from '@/views/auth/CheckEmail.vue'
import TakeExam from '@/views/student/TakeExam.vue'
import RoomManagements from '@/views/admin/RoomManagements.vue'
import RoomDetailStudent from '@/views/student/RoomDetail.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: homeScreen,
    },
    {
      path: '/about',
      name: 'About',
      component: aboutScreen,
    },
    {
      path: '/features',
      name: 'Features',
      component: featuresScreen,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: { title: "Login" }
    },
    {
      path: '/forget-password',
      name: 'ForgetPassword',
      component: ForgetPassword,
      meta: { title: "Forget Password" }
    },
    {
      path: '/reset-password',
      name: 'ResetPassword',
      component: ResetPassword,
      meta: { title: "Reset Password" }
    },
    {
      path: '/check-email',
      name: "CheckEmail",
      component: CheckEmail,
      meta: { title: "Check Email" }
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
          meta: { title: "Dashboard" }
        },
        {
          path: 'users-management',
          name: 'UserManagement',
          component: UserManagement,
          meta: { title: "User Management" }
        },
        {
          path: 'quizzes',
          name: 'QuizManagement',
          component: QuizManagement,
          meta: { title: "Quiz Management" }
        },
        {
          path: 'results-submissions',
          name: 'ResultSubmission',
          component: ResultSubmission,
          meta: { title: "Results & Submissions" }
        },
        {
          path: 'profile-admin',
          name: 'ProfileAdmin',
          component: ProfileAdmin,
          meta: { title: "Profile Admin" }
        },
        {
          path: 'room-managements',
          name: 'RoomManagements',
          component: RoomManagements,
          meta: { title: "Room Managements" }
        }
      ]
    },
    {
      path: '/teacher',
      component: TeacherLayout,
      meta: { requiresAuth: true, role: 'teacher' },
      children: [
        {
          path: 'dashboard',
          name: 'TeacherDashboard',
          component: TeacherDashboard,
          meta: { title: "Teacher Dashboard" }
        },
        {
          path: 'quizzes',
          name: 'Quizzes',
          component: Quizzes,
          meta: { title: "Quizzes", customHeader: true, fullscreen: true }
        },
        {
          path: 'assignments',
          name: 'Assignments',
          component: Assignments,
          meta: { title: "Assignments" }
        },
        {
          path: 'final-exam',
          name: 'FinalExam',
          component: FinalExam,
          meta: { title: "Final Exam" }
        },
        {
          path: 'room-management',
          name: 'RoomManagement',
          component: RoomManagement
        },
        {
          path: 'room-management/:roomId/stream',
          name: 'ClassStream',
          component: ClassStream,
          props: true
        },
        {
          path: 'room-management/:roomId/exams',
          name: 'RoomDetails',
          component: RoomDetails,
          props: true
        },
        {
          path: 'room-management/:roomId/exams/:examId',
          name: 'TeacherExamDetail',
          component: ExamDetailView,
          props: true
        },
        {
          path: 'student-results',
          name: 'StudentResults',
          component: StudentResults,
          meta: { title: "Student Results" }
        },
        {
          path: 'profile',
          name: 'Profile',
          component: Profile,
          meta: { title: "Profile" }
        }
      ]
    },
    {
      path: '/student',
      component: StudentLayout,
      meta: { requiresAuth: true, role: 'student' },
      children: [
        {
          path: 'dashboard',
          name: 'StudentDashboard',
          component: StudentDashboard,
          meta: { title: 'Student Dashboard' }
        },
        {
          path: 'assignment',
          name: 'Assignment',
          component: Assignment,
          meta: { title: 'Assignment' }
        },
        {
          path: 'classroom',
          name: 'Classroom',
          component: Classroom,
          meta: { title: 'Classroom' }
        },
        {
          path: 'analytics-result',
          name: 'AnalyticsResult',
          component: AnalyticsResult,
          meta: { title: 'AnalyticsResult' }
        },
        {
          path: 'profile-setting',
          name: 'ProfileSetting',
          component: ProfileSetting,
          meta: { title: 'ProfileSetting' }
        },
        {
          path: 'room-detail/:room_id',
          name: 'RoomDetail',
          component: RoomDetailStudent,
          meta: { title: 'RoomDetail' }
        }
      ]

    },
    {
      path: '/invitations/:id/accept',
      name: 'AcceptInvitation',
      component: AcceptRoom,
      meta: { title: 'Accept Class Invitation' }
    },
    {
      path: '/take-exam/:codeExam',
      name: 'TakeExam',
      component: TakeExam,
      meta: { title: 'Take Exam' }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound
    },

  ]
});

router.beforeEach((to, from) => {
  const isLoggedIn = !!localStorage.getItem('user_token');
  const userRoleId = localStorage.getItem('user_role');
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const requiredRole = to.meta.role;

  const rolePaths = {
    '1': 'admin',
    '2': 'teacher',
    '3': 'student'
  };

  const publicPages = ['Home', 'About', 'Features', 'Login', 'ForgetPassword', 'ResetPassword', 'CheckEmail'];
  const isPublicPage = publicPages.includes(to.name);

  const userRoleName = rolePaths[userRoleId];

  if (to.name === 'AcceptInvitation') {
    return true;
  }

  if (isLoggedIn) {
    if (isPublicPage) {
      return { path: `/${userRoleName}/dashboard` };
    }

    const requiredRole = to.meta.role;
    if (requiredRole && userRoleName !== requiredRole) {
      return { path: `/${userRoleName}/dashboard` };
    }
  } 
  else if (requiresAuth) {
    return { path: '/login' };
  }

  return true;
});

router.afterEach((to) => {
  const pageName = to.meta.title || to.name || 'Unknown Page';

  document.title = `${pageName} | PraLong`;

  localStorage.setItem('current_page', pageName);

});
export default router