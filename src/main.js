import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import '@fontsource/plus-jakarta-sans'
import './assets/main.css' 

import DataTable from './components/common/DataTable.vue'
import SearchFilter from './components/common/SearchFilter.vue'
import BaseButton from './components/common/BaseButton.vue'
import BaseModal from './components/common/BaseModal.vue'

const app = createApp(App)

app.component('DataTable',DataTable)
app.component('SearchFilter',SearchFilter)
app.component('BaseButton',BaseButton)
app.component('BaseModal',BaseModal)

app.use(createPinia())
app.use(router)

app.mount('#app')