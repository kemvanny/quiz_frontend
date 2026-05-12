<template>
  <div class="main-content">
    <div class="topbar">
      <div class="search-wrap">
        <i class="bi bi-search"></i>
        <input type="text" placeholder="ស្វែងរកអ្នកប្រើប្រាស់, វិញ្ញាសា, ​បន្ទប់" />
      </div>
      <div class="user-info">
        <button class="notif-btn">
          <i class="bi bi-bell"></i>
          <span class="dot"></span>
        </button>
        <img
          src="https://ui-avatars.com/api/?name=Admin+User&background=3fba7f&color=fff&bold=true"
          class="avatar"
          alt="Admin"
        />
        <div>
          <div class="user-name">អ្នកគ្រប់គ្រង</div>
          <div class="user-role">អ្នកគ្រប់គ្រងជាន់ខ្ពស់</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style >

.topbar {
  background: var(--white);
  border-bottom: 1.5px solid var(--green-mid);
  padding: 19.2px 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 50;
  box-shadow: var(--shadow-sm);
}

.topbar .search-wrap {
  position: relative;
  width: 280px;
}

.topbar .search-wrap i {
  position: absolute;
  left: 13px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-muted);
  font-size: 15px;
}

.topbar .search-wrap input {
  width: 100%;
  padding: 9px 14px 9px 38px;
  border: 1.5px solid var(--green-mid);
  border-radius: 10px;
  font-size: 13.5px;
  background: var(--green-light);
  color: var(--text-main);
  outline: none;
  transition: border 0.2s;
  font-family: inherit;
}

.topbar .search-wrap input:focus {
  border-color: var(--green-primary);
}

.topbar .user-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.topbar .notif-btn {
  width: 38px;
  height: 38px;
  background: var(--green-light);
  border-radius: 10px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--green-primary);
  font-size: 17px;
  position: relative;
  cursor: pointer;
  transition: background 0.2s;
}

.topbar .notif-btn:hover {
  background: var(--green-mid);
}

.topbar .notif-btn .dot {
  width: 8px;
  height: 8px;
  background: #e05c5c;
  border-radius: 50%;
  position: absolute;
  top: 7px;
  right: 8px;
  border: 2px solid #fff;
}

.topbar .avatar {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  object-fit: cover;
  border: 2.5px solid var(--green-primary);
}

.topbar .user-name {
  font-size: 14px;
  font-weight: 700;
}

.topbar .user-role {
  font-size: 11px;
  color: var(--text-muted);
  font-weight: 500;
}
</style>
