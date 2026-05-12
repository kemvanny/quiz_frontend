<template>
  <div class="admin-layout">
    <SideBar />

    <div class="main-wrapper">
      <Navbar/>

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
  import Navbar from '@/components/common/NavBar.vue';
  import SideBar from '@/components/common/SideBar.vue';
</script>

<style scoped>
.admin-layout {
  display: flex;       
  min-height: 100vh;     
  width: 100%;
  overflow: hidden;      
}

.main-wrapper {
  display: flex;
  flex-direction: column; 
  flex: 1;              
}

.content-body {
  padding: 20px;
  flex: 1;
  overflow-y: auto;
}
.page-body {
  padding: 28px 32px 40px;
}
.main-content {
  margin-left: var(--sidebar-width);
  /* min-height: 100vh; */
  padding: 0;
}
</style>