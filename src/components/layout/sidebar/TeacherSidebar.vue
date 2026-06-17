<template>
    <aside class="sidebar">
       <div class="sidebar-brand">
      <a href="#"> <img :src="logoImage" alt="Pralong Logo" class="brand-logo" />
      </a>
    </div>


        <div class="sidebar-nav-container">
            <div class="d-flex flex-column gap-1 fw-normal">
                <router-link :to="{ name: 'TeacherDashboard' }" class="nav-link">
                    <i class="fas fa-th-large"></i> ផ្ទាំងគ្រប់គ្រង
                </router-link>

                <a class="nav-link justify-content-between" @click="isOpen = !isOpen" style="cursor: pointer;">
                    <span><i class="fas fa-edit"></i> បង្កើតការប្រឡង</span>
                    <i :class="['fas', isOpen ? 'fa-chevron-up' : 'fa-chevron-down']"
                        style="font-size:.68rem;opacity:.5"></i>
                </a>
                <transition name="dropdown">
                    <div v-if="isOpen" class="ps-3 d-flex flex-column gap-1">
                        <router-link :to="{ name: 'Quizzes' }" class="nav-link"><i class="fas fa-bolt"></i> កម្រងសំណួរ</router-link>
                        <router-link :to="{ name: 'Assignments' }" class="nav-link"><i class="fas fa-tasks"></i> កិច្ចការ</router-link>
                        <router-link :to="{ name: 'FinalExam' }" class="nav-link"><i class="fas fa-graduation-cap"></i> ការប្រឡងបញ្ចប់វគ្គ</router-link>
                    </div>
                </transition>

                <router-link 
                :to="{ name: 'RoomManagement' }" 
                class="nav-link" 
                active-class="active"
                :class="{ 'active': $route.name === 'ClassStream' || $route.name === 'RoomDetail' }"
            >
                <i class="fas fa-users"></i> គ្រប់គ្រងថ្នាក់រៀន
            </router-link>
                <!-- <router-link :to="{ name: 'ClassStream' }" class="nav-link">
                    <i class="fas fa-users"></i> ព័ត៌មានក្នុងថ្នាក់រៀន
                </router-link> -->
                <router-link :to="{ name: 'StudentResults' }" class="nav-link">
                    <i class="fas fa-chart-bar"></i> លទ្ធផលសិក្សារបស់សិស្ស
                </router-link>
                <router-link :to="{ name: 'TeacherValidations' }" class="nav-link">
                    <i class="fas fa-shield-alt"></i> ការផ្ទៀងផ្ទាត់
                </router-link>
                <router-link :to="{ name: 'Profile' }" class="nav-link">
                    <i class="fas fa-user-circle"></i> ប្រវត្តិរូប
                </router-link>
            </div>
        </div>

        <div class="sidebar-cta p-3 text-center" style="cursor: pointer;" @click="isCreateRoomOpen = true">
            <div class="bg-white rounded-circle d-flex align-items-center justify-content-center shadow-sm mx-auto mb-2"
                style="width:38px;height:38px">
                <i class="fas fa-plus text-success"></i>
            </div>
            <div class="fw-medium text-dark mb-1" style="font-size:.85rem">បង្កើតថ្នាក់រៀនថ្មី</div>
            <div class="text-muted mb-2" style="font-size:.7rem;line-height:1.3">បង្កើតថ្នាក់រៀនសម្រាប់សិស្សចូលរួម</div>
            <span class="badge bg-success rounded-pill w-100 py-2 fw-normal"
                style="font-size:.72rem;letter-spacing:.5px">ចាប់ផ្ដើមបង្កើត</span>
        </div>

        <CreateRoomModal 
            :is-open="isCreateRoomOpen" 
            @close="isCreateRoomOpen = false" 
            @created="onRoomCreated" 
        />
    </aside>
</template>

<script setup>
import { ref } from 'vue';
import logoImage from '../../../assets/images/pralong-logo.png'


const isOpen = ref(false);
const isCreateRoomOpen = ref(false);

const onRoomCreated = (roomData) => {
    console.log("Room created:", roomData);
    // Optionally trigger a refresh of the rooms list if global state is used,
    // or navigate to the new room, etc.
};
</script>

<style scoped>
.sidebar-nav-container {
    flex: 1;
    overflow-y: auto;
    padding-bottom: 20px;
}

.nav-link {
    font-weight: 550 !important;
}
.nav-link.active {
    background-color: #10b981 !important; 
    color: white !important;              
    border-radius: 8px;                  
    font-weight: 600;
}

.nav-link.active i {
    color: white !important;
}
.dropdown-enter-active,
.dropdown-leave-active {
    transition: all 0.7s ease;
    max-height: 200px;
    overflow: hidden;
}

.dropdown-enter-from,
.dropdown-leave-to {
    max-height: 0;
    opacity: 0;
}

.dropdown-enter-to,
.dropdown-leave-from {
    max-height: 200px;
    opacity: 1;
}

.sidebar-nav-container::-webkit-scrollbar {
  display: none; 
}

.sidebar-nav-container {
  flex: 1;
  overflow-y: auto;
  padding-bottom: 20px;
  -ms-overflow-style: none;  
  scrollbar-width: none;  
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.7s ease;
  max-height: 200px;
  overflow: hidden;
}

.dropdown-enter-from,
.dropdown-leave-to {
  max-height: 0;
  opacity: 0;
}

.dropdown-enter-to,
.dropdown-leave-from {
  max-height: 200px;
  opacity: 1;
}

.sidebar-cta {
  width: 85% !important;
  margin: 0 auto 20px auto;
  border: 2px dashed rgba(16, 185, 129, .25);
  border-radius: 14px;
  background: var(--em-soft);
  cursor: pointer;
  transition: .2s;
}

.sidebar-cta:hover {
  background: #d1fae5;
}

.sidebar-cta:hover {
    background: #d1fae5;
}
.sidebar-brand {
  padding: 39px 20px; 
  display: flex;
  align-items: center; 
  justify-content: flex-start; 
  border-bottom: 1.5px solid var(--green-mid);
  height: 60px; 
  margin-bottom: 20px; 
  gap: 0;              
}

.brand-logo {
  max-width: 190px;   
  height: auto; 
  display: block;      
 
}

</style>