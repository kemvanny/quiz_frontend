<template>
  <div class="main-content">
    <header class="topbar">
    <h4 class="m-0 fw-bold" style="font-size: 1.3rem; color: var(--txt); letter-spacing: -0.3px">
      Account Setting
    </h4>
    <div class="d-flex align-items-center gap-2 p-1 pe-3 rounded-pill" style="
          border: 1px solid var(--em-soft);
          background: var(--em-soft);
          cursor: pointer;
          transition: 0.2s;
        ">
      <img src="https://ui-avatars.com/api/?name=Sok+Vibol&background=random" alt="avatar" style="
            width: 36px;
            height: 36px;
            border-radius: 50%;
            object-fit: cover;
            border: 2px solid #fff;
          " />
      <div class="d-flex flex-column justify-content-center" style="line-height: 1.1">
        <span class="fw-bold" style="font-size: 0.85rem; color: var(--em-dk)">Sok Vibol</span>
        <span style="font-size: 0.7rem; color: var(--em); font-weight: 600">Student</span>
      </div>
    </div>
  </header>
  </div>
</template>

<style scoped>
.topbar {
  height: 76px;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--bdr);
  display: flex;
  align-items: center;
  padding: 0 32px;
  justify-content: space-between;
  flex-shrink: 0;
  z-index: 10;
}
</style>
