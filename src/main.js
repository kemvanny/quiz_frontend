import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import '@fontsource/plus-jakarta-sans'
import './assets/main.css' 

import AdminNavbar from './components/layout/AdminNavbar.vue'
import AdminSidebar from './components/layout/AdminSidebar.vue'
import TeacherSidebar from './components/layout/TeacherSidebar.vue'
import DataTable from './components/common/DataTable.vue'
import SearchFilter from './components/common/SearchFilter.vue'
import BaseButton from './components/common/BaseButton.vue'
import BaseModal from './components/common/BaseModal.vue'
import StatusBadge from './components/common/StatusBadge.vue'

const app = createApp(App)

app.component('AdminNavbar',AdminNavbar)
app.component('AdminSidebar',AdminSidebar)
app.component('TeacherSidebar',TeacherSidebar)
app.component('DataTable',DataTable)
app.component('SearchFilter',SearchFilter)
app.component('BaseButton',BaseButton)
app.component('BaseModal',BaseModal)
app.component('StatusBadge',StatusBadge)

app.use(createPinia())
app.use(router)

app.mount('#app')