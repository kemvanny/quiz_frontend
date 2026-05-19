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
