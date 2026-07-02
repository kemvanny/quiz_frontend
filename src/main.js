import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Toast, { POSITION } from "vue-toastification";

import App from './App.vue'
import router from './router'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import '@fontsource/plus-jakarta-sans'
import './assets/main.css' 
import "vue-toastification/dist/index.css";


import BaseSidebar from './components/common/BaseSidebar.vue'
import BaseNavbar from './components/common/BaseNavbar.vue'
import DataTable from './components/common/DataTable.vue'
import SearchFilter from './components/common/SearchFilter.vue'
import BaseButton from './components/common/BaseButton.vue'
import BaseModal from './components/common/BaseModal.vue'
import StatusBadge from './components/common/StatusBadge.vue'
import TeacherNavbarExam from './components/layout/navbar/teacher/TeacherNavbarExam.vue'
import CreateRoomModal from '@/components/teacher/CreateRoomModal.vue'
import BasePagination from '@/components/common/BasePagination.vue'
import LogoutModal from '@/components/common/LogoutModal.vue'
import BaseProfile from '@/components/common/BaseProfile.vue'

const app = createApp(App)

app.component('BaseSidebar',BaseSidebar)
app.component('BaseNavbar',BaseNavbar)
app.component('DataTable',DataTable)
app.component('SearchFilter',SearchFilter)
app.component('BaseButton',BaseButton)
app.component('BaseModal',BaseModal)
app.component('StatusBadge',StatusBadge)
app.component('TeacherNavbarExam',TeacherNavbarExam)
app.component('CreateRoomModal',CreateRoomModal)
app.component('BasePagination',BasePagination)
app.component('LogoutModal',LogoutModal)
app.component('BaseProfile',BaseProfile)

app.use(createPinia())

app.use(Toast, {
  position: POSITION.BOTTOM_RIGHT,
  transition: "Vue-Toastification__bounce",
  timeout: 3000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  draggable: true,
});
app.use(router)

app.mount('#app')