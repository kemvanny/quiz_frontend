<template>
  <div>
    <div class="workspace">
      <!-- Filter row -->
      <div class="filter-row">
        <div class="search-pill">
          <i
            class="fas fa-search"
            style="color: var(--txt-mu); font-size: 0.85rem"
          ></i>
          <input type="text" placeholder="Search courses or instructors…" />
        </div>
        <div class="tab-pills">
          <button class="tab-pill active">All Classes</button>
          <button class="tab-pill">In Progress</button>
          <button class="tab-pill">Completed</button>
        </div>
      </div>

      <!-- Room Grid -->
      <div class="room-grid">
        <!-- Card 1 — Java CS -->
        <a href="#" class="room-card">
          <div class="card-banner green">
            <div class="status-chip">
              <div class="status-dot" style="background: #10b981"></div>
              Active
            </div>
            <div
              class="card-icon"
              style="
                background: linear-gradient(135deg, var(--em), var(--em-dk));
              "
            >
              <i class="fas fa-code"></i>
            </div>
          </div>
          <div class="card-body">
            <div class="card-title">Computer Science: Java Basics</div>
            <div class="card-instructor">
              <img
                src="https://ui-avatars.com/api/?name=Hean+Liza&background=10b981&color=fff"
              />
              <span>Hean Liza</span>
            </div>
            <div class="prog-label">
              <span>Course Progress</span
              ><span style="color: var(--em)">65%</span>
            </div>
            <div class="prog-track">
              <div
                class="prog-fill"
                style="
                  width: 65%;
                  background: linear-gradient(90deg, var(--em), #34d399);
                "
              ></div>
            </div>
          </div>
          <div class="card-footer">
            <div class="footer-note">
              <i class="far fa-calendar-alt" style="color: var(--em)"></i> Next
              task due tomorrow
            </div>
            <i
              class="fas fa-arrow-right"
              style="color: var(--txt-mu); font-size: 0.78rem"
            ></i>
          </div>
        </a>

        <!-- Card 2 — Physics -->
        <a href="#" class="room-card">
          <div class="card-banner blue">
            <div class="status-chip">
              <div class="status-dot" style="background: #3b82f6"></div>
              Active
            </div>
            <div
              class="card-icon"
              style="background: linear-gradient(135deg, #3b82f6, #6366f1)"
            >
              <i class="fas fa-atom"></i>
            </div>
          </div>
          <div class="card-body">
            <div class="card-title">Advanced Physics 11-B</div>
            <div class="card-instructor">
              <img
                src="https://ui-avatars.com/api/?name=Kem+Vanny&background=3b82f6&color=fff"
              />
              <span>Kem Vanny</span>
            </div>
            <div class="prog-label">
              <span>Course Progress</span
              ><span style="color: #3b82f6">30%</span>
            </div>
            <div class="prog-track">
              <div
                class="prog-fill"
                style="
                  width: 30%;
                  background: linear-gradient(90deg, #3b82f6, #60a5fa);
                "
              ></div>
            </div>
          </div>
          <div class="card-footer">
            <div class="footer-note">
              <i class="fas fa-bell" style="color: #3b82f6"></i> New assignment
              posted
            </div>
            <i
              class="fas fa-arrow-right"
              style="color: var(--txt-mu); font-size: 0.78rem"
            ></i>
          </div>
        </a>

        <!-- Card 3 — Calculus -->
        <a href="#" class="room-card">
          <div class="card-banner amber">
            <div class="status-chip" style="color: #92400e">
              <div class="status-dot" style="background: #f59e0b"></div>
              Wrapping Up
            </div>
            <div
              class="card-icon"
              style="background: linear-gradient(135deg, #f59e0b, #fbbf24)"
            >
              <i class="fas fa-square-root-alt"></i>
            </div>
          </div>
          <div class="card-body">
            <div class="card-title">Calculus I</div>
            <div class="card-instructor">
              <img
                src="https://ui-avatars.com/api/?name=Som+Chan&background=f59e0b&color=fff"
              />
              <span>Som Chan</span>
            </div>
            <div class="prog-label">
              <span>Course Progress</span
              ><span style="color: #f59e0b">90%</span>
            </div>
            <div class="prog-track">
              <div
                class="prog-fill"
                style="
                  width: 90%;
                  background: linear-gradient(90deg, #f59e0b, #fde047);
                "
              ></div>
            </div>
          </div>
          <div class="card-footer">
            <div class="footer-note">
              <i class="fas fa-flag-checkered" style="color: #f59e0b"></i> Final
              exam upcoming
            </div>
            <i
              class="fas fa-arrow-right"
              style="color: var(--txt-mu); font-size: 0.78rem"
            ></i>
          </div>
        </a>

        <!-- Card 4 — Web Dev -->
        <a href="#" class="room-card">
          <div class="card-banner purple">
            <div class="status-chip">
              <div class="status-dot" style="background: #8b5cf6"></div>
              Active
            </div>
            <div
              class="card-icon"
              style="background: linear-gradient(135deg, #8b5cf6, #a78bfa)"
            >
              <i class="fas fa-globe"></i>
            </div>
          </div>
          <div class="card-body">
            <div class="card-title">Web Development 101</div>
            <div class="card-instructor">
              <img
                src="https://ui-avatars.com/api/?name=Reaksa+Mon&background=8b5cf6&color=fff"
              />
              <span>Reaksa Mon</span>
            </div>
            <div class="prog-label">
              <span>Course Progress</span
              ><span style="color: #8b5cf6">52%</span>
            </div>
            <div class="prog-track">
              <div
                class="prog-fill"
                style="
                  width: 52%;
                  background: linear-gradient(90deg, #8b5cf6, #c4b5fd);
                "
              ></div>
            </div>
          </div>
          <div class="card-footer">
            <div class="footer-note">
              <i class="fas fa-clock" style="color: #8b5cf6"></i> Quiz due in 3
              days
            </div>
            <i
              class="fas fa-arrow-right"
              style="color: var(--txt-mu); font-size: 0.78rem"
            ></i>
          </div>
        </a>

        <!-- Card 5 — Biology -->
        <a href="#" class="room-card">
          <div class="card-banner rose">
            <div class="status-chip">
              <div class="status-dot" style="background: #f43f5e"></div>
              Active
            </div>
            <div
              class="card-icon"
              style="background: linear-gradient(135deg, #f43f5e, #fb7185)"
            >
              <i class="fas fa-dna"></i>
            </div>
          </div>
          <div class="card-body">
            <div class="card-title">Biology — Grade 11</div>
            <div class="card-instructor">
              <img
                src="https://ui-avatars.com/api/?name=Chanda+Pich&background=f43f5e&color=fff"
              />
              <span>Chanda Pich</span>
            </div>
            <div class="prog-label">
              <span>Course Progress</span
              ><span style="color: #f43f5e">78%</span>
            </div>
            <div class="prog-track">
              <div
                class="prog-fill"
                style="
                  width: 78%;
                  background: linear-gradient(90deg, #f43f5e, #fb7185);
                "
              ></div>
            </div>
          </div>
          <div class="card-footer">
            <div class="footer-note">
              <i class="far fa-calendar-check" style="color: #f43f5e"></i> Lab
              report due Friday
            </div>
            <i
              class="fas fa-arrow-right"
              style="color: var(--txt-mu); font-size: 0.78rem"
            ></i>
          </div>
        </a>

        <!-- Card 6 — English -->
        <a href="#" class="room-card">
          <div class="card-banner cyan">
            <div class="status-chip">
              <div class="status-dot" style="background: #06b6d4"></div>
              Active
            </div>
            <div
              class="card-icon"
              style="background: linear-gradient(135deg, #06b6d4, #22d3ee)"
            >
              <i class="fas fa-book-open"></i>
            </div>
          </div>
          <div class="card-body">
            <div class="card-title">English Communication</div>
            <div class="card-instructor">
              <img
                src="https://ui-avatars.com/api/?name=Lina+Sok&background=06b6d4&color=fff"
              />
              <span>Lina Sok</span>
            </div>
            <div class="prog-label">
              <span>Course Progress</span
              ><span style="color: #06b6d4">40%</span>
            </div>
            <div class="prog-track">
              <div
                class="prog-fill"
                style="
                  width: 40%;
                  background: linear-gradient(90deg, #06b6d4, #67e8f9);
                "
              ></div>
            </div>
          </div>
          <div class="card-footer">
            <div class="footer-note">
              <i class="fas fa-pen-nib" style="color: #06b6d4"></i> Essay draft
              due Monday
            </div>
            <i
              class="fas fa-arrow-right"
              style="color: var(--txt-mu); font-size: 0.78rem"
            ></i>
          </div>
        </a>
      </div>
    </div>
    <div
      class="modal-wrap"
      :class="{ open: isJoinModalOpen }"
      @click.self="closeJoinModal"
    >
      <div class="modal-box">
        <div class="modal-title">Join a Room</div>
        <div class="modal-sub">Enter the code provided by your instructor.</div>
        <label class="modal-label" for="roomCode">Room Code</label>
        <input
          class="modal-input"
          :class="{ invalid: roomCodeError }"
          id="roomCode"
          ref="roomCodeInput"
          v-model="roomCode"
          type="text"
          placeholder="e.g. AB12-CD34"
          maxlength="12"
          autocomplete="off"
          @input="roomCodeError = false"
          @keyup.enter="joinRoom"
        />
        <div class="modal-actions">
          <button class="modal-btn primary" type="button" @click="joinRoom">
            <i class="bi bi-door-open"></i> Join Now
          </button>
          <button class="modal-btn" type="button" @click="closeJoinModal">
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { nextTick, onMounted, onUnmounted, ref } from "vue";

const isJoinModalOpen = ref(false);
const roomCode = ref("");
const roomCodeError = ref(false);
const roomCodeInput = ref(null);

async function openJoinModal() {
  roomCode.value = "";
  roomCodeError.value = false;
  isJoinModalOpen.value = true;
  await nextTick();
  roomCodeInput.value?.focus();
}

function closeJoinModal() {
  isJoinModalOpen.value = false;
}

function joinRoom() {
  const code = roomCode.value.trim();
  if (!code) {
    roomCodeError.value = true;
    roomCodeInput.value?.focus();
    return;
  }
  alert("Successfully joined room: " + code.toUpperCase());
  closeJoinModal();
}

function handleKeydown(e) {
  if (e.key === "Escape") closeJoinModal();
}

onMounted(() => {
  window.addEventListener("classroom:open-join-modal", openJoinModal);
  window.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener("classroom:open-join-modal", openJoinModal);
  window.removeEventListener("keydown", handleKeydown);
});
</script>
<style scoped>
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
:root {
  --em: #10b981;
  --em-dk: #059669;
  --em-soft: #ecfdf5;
  --txt: #0f172a;
  --txt-m: #475569;
  --txt-mu: #94a3b8;
  --surf: #ffffff;
  --bdr: #e2e8f0;
  --sh-sm: 0 4px 12px rgba(0, 0, 0, 0.03);
  --sh-md: 0 10px 25px rgba(0, 0, 0, 0.05);
  --sh-hover: 0 20px 40px rgba(16, 185, 129, 0.13);
}
body {
  font-family: "Inter", sans-serif;
  background-color: #f4f7fe;
  background-image:
    radial-gradient(at 0% 0%, hsla(158, 76%, 76%, 0.6) 0, transparent 50%),
    radial-gradient(at 100% 100%, hsla(209, 43%, 80%, 0.6) 0, transparent 50%);
  height: 100vh;
  overflow: hidden;
  color: var(--txt);
}

/* ── WORKSPACE ── */
.workspace {
  flex: 1;
  overflow-y: auto;
  padding: 36px 40px;
}

/* ── FILTER ROW ── */
.filter-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 30px;
}
.search-pill {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #fff;
  border: 1px solid var(--bdr);
  border-radius: 14px;
  padding: 10px 18px;
  width: 280px;
  box-shadow: var(--sh-sm);
}
.search-pill input {
  border: none;
  outline: none;
  background: transparent;
  font-size: 0.85rem;
  color: var(--txt);
  width: 100%;
}
.tab-pills {
  display: flex;
  gap: 6px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border: 1px solid var(--bdr);
  border-radius: 14px;
  padding: 5px;
  box-shadow: var(--sh-sm);
}
.tab-pill {
  padding: 7px 18px;
  border-radius: 10px;
  font-size: 0.83rem;
  font-weight: 700;
  color: var(--txt-mu);
  cursor: pointer;
  border: none;
  background: transparent;
  transition: 0.18s;
}
.tab-pill.active {
  background: #fff;
  color: var(--em-dk);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}
.tab-pill:hover:not(.active) {
  color: var(--txt);
}

/* ── ROOM GRID ── */
.room-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 24px;
}

/* ── ROOM CARD ── */
.room-card {
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(10px);
  border: 1px solid var(--bdr);
  border-radius: 22px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: 318px;
  transition: all 0.28s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: var(--sh-sm);
  cursor: pointer;
}
.room-card:hover {
  border-color: rgba(16, 185, 129, 0.3);
  transform: translateY(-5px);
  box-shadow: var(--sh-hover);
}

/* Banner */
.card-banner {
  height: 110px;
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  padding: 16px;
}
.card-banner.green {
  background: linear-gradient(135deg, #d1fae5, #a7f3d0);
}
.card-banner.blue {
  background: linear-gradient(135deg, #dbeafe, #bfdbfe);
}
.card-banner.amber {
  background: linear-gradient(135deg, #fef9c3, #fde68a);
}
.card-banner.purple {
  background: linear-gradient(135deg, #ede9fe, #ddd6fe);
}
.card-banner.rose {
  background: linear-gradient(135deg, #ffe4e6, #fecdd3);
}
.card-banner.cyan {
  background: linear-gradient(135deg, #cffafe, #a5f3fc);
}

.status-chip {
  background: rgba(255, 255, 255, 0.82);
  backdrop-filter: blur(6px);
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.73rem;
  font-weight: 700;
  color: var(--txt-m);
  display: flex;
  align-items: center;
  gap: 5px;
}
.status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
}

/* Floating icon */
.card-icon {
  position: absolute;
  bottom: -22px;
  left: 22px;
  width: 56px;
  height: 56px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  border: 4px solid #fff;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
  transition: transform 0.28s cubic-bezier(0.4, 0, 0.2, 1);
  color: #fff;
}
.room-card:hover .card-icon {
  transform: scale(1.08) rotate(6deg);
}

/* Body */
.room-card .card-body {
  padding: 42px 26px 20px;
  flex: 1;
  min-width: 0;
}
.room-card .card-title {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--txt);
  margin-bottom: 6px;
  transition: color 0.2s;
  line-height: 1.3;
  min-height: 2.6em;
  overflow-wrap: anywhere;
}
.room-card:hover .card-title {
  color: var(--em-dk);
}
.room-card .card-instructor {
  display: flex;
  align-items: center;
  gap: 7px;
  margin-bottom: 18px;
}
.room-card .card-instructor img {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  object-fit: cover;
}
.room-card .card-instructor span {
  font-size: 0.8rem;
  color: var(--txt-mu);
  font-weight: 600;
}

/* Progress */
.room-card .prog-label {
  display: flex;
  justify-content: space-between;
  font-size: 0.73rem;
  font-weight: 700;
  color: var(--txt-m);
  margin-bottom: 6px;
}
.room-card .prog-track {
  height: 5px;
  background: #f1f5f9;
  border-radius: 99px;
  overflow: hidden;
}
.room-card .prog-fill {
  height: 100%;
  border-radius: 99px;
  transition: width 1s ease-out;
}

/* Footer */
.room-card .card-footer {
  padding: 14px 26px;
  border-top: 1px solid var(--bdr);
  background: #fafbfc;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  margin-top: auto;
}
.room-card .footer-note {
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--txt-mu);
  display: flex;
  align-items: center;
  gap: 6px;
  min-width: 0;
  line-height: 1.3;
}
.room-card .footer-note i {
  font-size: 0.75rem;
  flex-shrink: 0;
}

/* Modal */
.modal-wrap {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: none;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: rgba(15, 23, 42, 0.42);
}
.modal-wrap.open {
  display: flex;
}
.modal-box {
  width: min(380px, 100%);
  background: var(--surf);
  border: 1px solid var(--bdr);
  border-radius: 18px;
  padding: 28px;
  box-shadow: 0 22px 60px rgba(15, 23, 42, 0.18);
}
.modal-title {
  font-size: 1.05rem;
  font-weight: 800;
  color: var(--txt);
  margin-bottom: 4px;
}
.modal-sub {
  font-size: 0.83rem;
  font-weight: 600;
  color: var(--txt-mu);
  line-height: 1.5;
  margin-bottom: 20px;
}
.modal-label {
  display: block;
  font-size: 0.72rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--txt-m);
  margin-bottom: 8px;
}
.modal-input {
  width: 100%;
  border: 1px solid var(--bdr);
  border-radius: 12px;
  background: #f8fafc;
  color: var(--txt);
  font: inherit;
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: 1.5px;
  padding: 12px 14px;
  text-transform: uppercase;
  outline: none;
  transition: 0.16s;
}
.modal-input:focus {
  border-color: var(--em);
  background: #fff;
  box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.12);
}
.modal-input.invalid {
  border-color: #ef4444;
}
.modal-actions {
  display: grid;
  gap: 10px;
  margin-top: 18px;
}
.modal-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: 1px solid var(--bdr);
  border-radius: 12px;
  background: #fff;
  color: var(--txt-mu);
  cursor: pointer;
  font: inherit;
  font-size: 0.9rem;
  font-weight: 800;
  padding: 11px 14px;
  transition: 0.16s;
}
.modal-btn:hover {
  background: #f8fafc;
  border-color: #cbd5e1;
}
.modal-btn.primary {
  background: var(--em);
  border-color: var(--em);
  color: #fff;
}
.modal-btn.primary:hover {
  background: var(--em-dk);
  border-color: var(--em-dk);
}

/* Scrollbar */
::-webkit-scrollbar {
  width: 5px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: #e2e8f0;
  border-radius: 99px;
}
</style>
