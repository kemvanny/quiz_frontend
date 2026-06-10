<template>
  <section class="student-dashboard">
    <!-- STATS -->
    <div class="stats">
      <a href="4.st-results.html" class="stat">
        <div class="stat-icon" style="background: var(--em-soft); color: var(--em)">
          <i class="bi bi-check-circle"></i>
        </div>
        <div>
          <div class="stat-label">Exams Done</div>
          <div class="stat-value">34</div>
          <div class="stat-trend" style="color: var(--em)">↑ 3 this week</div>
        </div>
      </a>

      <a href="2.st-my-rooms.html" class="stat">
        <div class="stat-icon" style="background: var(--blue-soft); color: #3b82f6">
          <i class="bi bi-door-open"></i>
        </div>
        <div>
          <div class="stat-label">Enrolled Rooms</div>
          <div class="stat-value">6</div>
          <div class="stat-trend" style="color: var(--txt-lt)">
            Active semester
          </div>
        </div>
      </a>

      <a href="4.st-results.html" class="stat">
        <div class="stat-icon" style="background: #f8fafc; color: var(--txt-mu)">
          <i class="bi bi-graph-up-arrow"></i>
        </div>
        <div>
          <div class="stat-label">Overall Avg.</div>
          <div class="stat-value">89%</div>
          <div class="stat-trend" style="color: #ef4444">
            ↓ 1.2% vs last month
          </div>
        </div>
      </a>
    </div>

    <!-- GRID -->
    <div class="grid">
      <!-- LEFT -->
      <div class="left-col">
        <!-- Quick Actions -->
        <div class="card">
          <div class="qa-wrap">
            <div>
              <div class="card-title no-margin">Quick Actions</div>
            </div>
            <div class="qa-btns">
              <button class="btn primary" @click="openModal">
                <i class="bi bi-plus-lg"></i> Join a Class
              </button>
              <a href="3.st-assignments.html" class="btn">
                <i class="bi bi-clipboard-check"></i> Pending Tasks
              </a>
              <a href="5.st-readiness.html" class="btn">
                <i class="bi bi-laptop"></i> System Check
              </a>
            </div>
          </div>
        </div>

        <!-- Performance -->
        <div class="card">
          <div class="perf-head">
            <div>
              <div class="card-title">Performance by Subject</div>
            </div>
            <div class="gpa-block">
              <div class="gpa-val">A–</div>
              <div class="gpa-lbl">Current GPA</div>
              <a href="4.st-results.html" class="view-link" style="display: block; margin-top: 6px">Full Report →</a>
            </div>
          </div>

          <div class="subj-row">
            <div class="subj-dot" style="background: #10b981"></div>
            <div class="subj-info">
              <div class="subj-name">Java Programming</div>
            </div>
            <div class="subj-track">
              <div class="subj-fill" style="width: 95%; background: #10b981"></div>
            </div>
            <div class="subj-pct">95%</div>
          </div>
          <div class="subj-row">
            <div class="subj-dot" style="background: #3b82f6"></div>
            <div class="subj-info">
              <div class="subj-name">Web Development</div>
            </div>
            <div class="subj-track">
              <div class="subj-fill" style="width: 92%; background: #3b82f6"></div>
            </div>
            <div class="subj-pct">92%</div>
          </div>
          <div class="subj-row">
            <div class="subj-dot" style="background: #8b5cf6"></div>
            <div class="subj-info">
              <div class="subj-name">Physics</div>
            </div>
            <div class="subj-track">
              <div class="subj-fill" style="width: 90%; background: #8b5cf6"></div>
            </div>
            <div class="subj-pct">90%</div>
          </div>
          <div class="subj-row">
            <div class="subj-dot" style="background: #f59e0b"></div>
            <div class="subj-info">
              <div class="subj-name">Biology</div>
            </div>
            <div class="subj-track">
              <div class="subj-fill" style="width: 85%; background: #f59e0b"></div>
            </div>
            <div class="subj-pct">85%</div>
          </div>
          <div class="subj-row">
            <div class="subj-dot" style="background: #ef4444"></div>
            <div class="subj-info">
              <div class="subj-name">Mathematics</div>
            </div>
            <div class="subj-track">
              <div class="subj-fill" style="width: 75%; background: #ef4444"></div>
            </div>
            <div class="subj-pct">75%</div>
          </div>

          <div class="perf-footer">
            <span class="badge badge-green">⭐ Top 15% of class</span>
            Based on 34 verified academic assessments
          </div>
        </div>
      </div>

      <!-- RIGHT -->
      <div class="right-col">
        <!-- Deadlines -->
        <div class="card" style="border-top: 3px solid #f59e0b; border-radius: 0 0 14px 14px">
          <div class="section-head">
            <div>
              <div class="card-title">Upcoming Deadlines</div>
            </div>
            <a href="3.st-assignments.html" class="view-link">View all</a>
          </div>

          <a href="3.st-assignments.html" class="dl-item" style="
              background: var(--amber-soft);
              border: 1px solid var(--amber-border);
            ">
            <div class="dl-icon" style="background: #fef3c7; color: #b45309">
              <i class="bi bi-hourglass-split"></i>
            </div>
            <div style="flex: 1">
              <div class="dl-name" style="color: #92400e">Midterm — PHP</div>
              <div class="dl-time" style="color: #b45309">Due in 2 hours</div>
            </div>
            <i class="bi bi-chevron-right" style="color: #d97706; font-size: 15px"></i>
          </a>

          <a href="3.st-assignments.html" class="dl-item" style="
              background: var(--red-soft);
              border: 1px solid var(--red-border);
            ">
            <div class="dl-icon" style="background: #fee2e2; color: #dc2626">
              <i class="bi bi-exclamation-triangle"></i>
            </div>
            <div style="flex: 1">
              <div class="dl-name" style="color: #991b1b">Quiz — SQL Joins</div>
              <div class="dl-time" style="color: #dc2626">Due in 15 mins!</div>
            </div>
            <i class="bi bi-chevron-right" style="color: #ef4444; font-size: 15px"></i>
          </a>
        </div>

        <!-- Feedback -->
        <div class="card">
          <div class="section-head">
            <div>
              <div class="card-title">Recent Feedback</div>
            </div>
            <a href="4.st-results.html" class="view-link">History</a>
          </div>

          <div class="fb-row">
            <div class="fb-left">
              <div class="fb-icon" style="background: var(--em-soft); color: var(--em)">
                <i class="bi bi-award"></i>
              </div>
              <div>
                <div class="fb-quiz">Java Basics Quiz</div>
                <div class="fb-when">Graded 2 hrs ago</div>
              </div>
            </div>
            <span class="badge badge-green">95/100</span>
          </div>

          <div class="fb-row">
            <div class="fb-left">
              <div class="fb-icon" style="background: var(--em-soft); color: var(--em)">
                <i class="bi bi-check-circle"></i>
              </div>
              <div>
                <div class="fb-quiz">Web Layouts Assg.</div>
                <div class="fb-when">Graded yesterday</div>
              </div>
            </div>
            <span class="badge badge-green">88/100</span>
          </div>

          <div class="fb-row">
            <div class="fb-left">
              <div class="fb-icon" style="background: var(--amber-soft); color: var(--amber-text)">
                <i class="bi bi-exclamation-circle"></i>
              </div>
              <div>
                <div class="fb-quiz">HTML Tags Quiz</div>
                <div class="fb-when">Needs review</div>
              </div>
            </div>
            <span class="badge badge-amber">72/100</span>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-wrap" :class="{ open: isModalOpen }" @click.self="closeModal">
      <div class="modal-box">
        <div class="modal-title">Join a Class</div>
        <div class="modal-sub">Enter the code provided by your instructor.</div>
        <label class="modal-label" for="classCode">Class Code</label>
        <input class="modal-input" :class="{ invalid: classCodeError }" id="classCode" ref="classCodeInput"
          v-model="classCode" type="text" placeholder="e.g. AB12-CD34" maxlength="12" autocomplete="off"
          @input="classCodeError = false" @keyup.enter="joinClass" />
        <div class="modal-actions">
          <button class="btn primary" type="button" style="justify-content: center; padding: 12px; font-size: 15px"
            @click="joinClass">
            <i class="bi bi-door-open"></i> Join Now
          </button>
          <button class="btn" type="button" style="justify-content: center; padding: 11px; color: var(--txt-mu)"
            @click="closeModal">
            Cancel
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { nextTick, ref } from "vue";

const isModalOpen = ref(false);
const classCode = ref("");
const classCodeError = ref(false);
const classCodeInput = ref(null);

async function openModal() {
  classCode.value = "";
  classCodeError.value = false;
  isModalOpen.value = true;

  await nextTick();
  classCodeInput.value?.focus();
}

function closeModal() {
  isModalOpen.value = false;
}

function joinClass() {
  const code = classCode.value.trim();

  if (!code) {
    classCodeError.value = true;
    classCodeInput.value?.focus();
    return;
  }

  alert("Successfully joined class: " + code.toUpperCase());
  closeModal();
}


</script>


<style scoped>
.student-dashboard {
  --em: #10b981;
  --em-dk: #059669;
  --em-soft: #ecfdf5;
  --em-text: #065f46;
  --blue-soft: #eff6ff;
  --amber-soft: #fffbeb;
  --amber-border: #fde68a;
  --amber-text: #b45309;
  --red-soft: #fef2f2;
  --red-border: #fee2e2;
  --txt: #0f172a;
  --txt-mu: #64748b;
  --txt-lt: #94a3b8;
  --border: #e2e8f0;
  /* --bg: #f1f5f9; */
  --surf: #ffffff;
  --radius: 14px;
  --radius-sm: 9px;

  display: flex;
  flex-direction: column;
  gap: 20px;
  /* background: var(--bg); */
  color: var(--txt);
  font-family: "Inter", sans-serif;
  min-width: 0;
}

.student-dashboard * {
  box-sizing: border-box;
}

.student-dashboard a {
  text-decoration: none;
  color: inherit;
}

::-webkit-scrollbar {
  width: 5px;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 99px;
}

/* ── STATS ── */
.stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
}

.stat {
  background: var(--surf);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 20px 22px;
  display: flex;
  gap: 16px;
  align-items: center;
  cursor: pointer;
  transition: 0.15s;
}

.stat:hover {
  border-color: #cbd5e1;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.05);
}

.stat-icon {
  width: 46px;
  height: 46px;
  border-radius: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 21px;
  flex-shrink: 0;
}

.stat-label {
  font-size: 12px;
  font-weight: 600;
  color: var(--txt-lt);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 5px;
}

.stat-value {
  font-size: 26px;
  font-weight: 700;
  line-height: 1;
  margin-bottom: 4px;
  color: var(--txt);
}

.stat-trend {
  font-size: 12px;
  font-weight: 600;
}

/* ── GRID ── */
.grid {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 16px;
}

.left-col {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.right-col {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

/* Modal */
.modal-wrap {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.4);
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.modal-wrap.open {
  display: flex;
}

.modal-box {
  background: var(--surf);
  border-radius: 16px;
  padding: 30px;
  width: 360px;
  border: 1px solid var(--border);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.12);
}

.modal-title {
  font-size: 17px;
  font-weight: 700;
  margin-bottom: 3px;
}

.modal-sub {
  font-size: 13px;
  color: var(--txt-mu);
  margin-bottom: 20px;
  line-height: 1.5;
}

.modal-label {
  font-size: 12px;
  font-weight: 700;
  color: var(--txt-mu);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
  display: block;
}

.modal-input {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  background: #f8fafc;
  color: var(--txt);
  outline: none;
  font-family: inherit;
  transition: 0.15s;
}

.modal-input:focus {
  border-color: var(--em);
  background: var(--surf);
}

.modal-input.invalid {
  border-color: #ef4444;
}

.modal-actions {
  display: flex;
  flex-direction: column;
  gap: 9px;
  margin-top: 18px;
}

/* ── CARD ── */
.card {
  background: var(--surf);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 22px;
}

.card-title {
  font-size: 16px;
  font-weight: 700;
  color: var(--txt);
  margin-bottom: 14px;
}

.card-title.no-margin {
  margin-bottom: 0;
}

/* ── BUTTONS ── */
.qa-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
}

.qa-btns {
  display: flex;
  gap: 9px;
  flex-wrap: wrap;
}

.btn {
  padding: 10px 18px;
  border-radius: var(--radius-sm);
  font-size: 14px;
  font-weight: 600;
  border: 1px solid var(--border);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  transition: 0.15s;
  background: var(--surf);
  color: var(--txt);
  font-family: inherit;
}

.btn:hover {
  background: #f8fafc;
  border-color: #cbd5e1;
}

.btn i {
  font-size: 16px;
}

.btn.primary {
  background: var(--em);
  color: #fff;
  border-color: var(--em);
}

.btn.primary:hover {
  background: var(--em-dk);
  border-color: var(--em-dk);
}

/* ── PERFORMANCE ── */
.perf-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 18px;
}

.gpa-block {
  text-align: right;
}

.gpa-val {
  font-size: 26px;
  font-weight: 700;
  color: var(--txt);
  line-height: 1;
}

.gpa-lbl {
  font-size: 12px;
  color: var(--txt-lt);
  font-weight: 500;
}

.view-link {
  font-size: 13px;
  color: var(--em);
  font-weight: 600;
}

.view-link:hover {
  color: var(--em-dk);
}

.subj-row {
  display: flex;
  align-items: center;
  gap: 13px;
  padding: 11px 0;
  border-bottom: 1px solid #f1f5f9;
}

.subj-row:last-child {
  border-bottom: none;
}

.subj-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.subj-info {
  flex: 1;
}

.subj-name {
  font-size: 14px;
  font-weight: 600;
  color: var(--txt);
}

.subj-track {
  flex: 2;
  height: 5px;
  background: #f1f5f9;
  border-radius: 99px;
  overflow: hidden;
}

.subj-fill {
  height: 100%;
  border-radius: 99px;
}

.subj-pct {
  font-size: 13px;
  font-weight: 700;
  min-width: 36px;
  text-align: right;
  color: var(--txt-mu);
}

.perf-footer {
  margin-top: 16px;
  padding-top: 14px;
  border-top: 1px solid #f1f5f9;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  color: var(--txt-lt);
}

.badge {
  padding: 4px 12px;
  border-radius: 99px;
  font-size: 12px;
  font-weight: 700;
}

.badge-green {
  background: var(--em-soft);
  color: var(--em-text);
}

.badge-amber {
  background: var(--amber-soft);
  color: #92400e;
}

/* ── DEADLINES ── */
.section-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 16px;
}

.dl-item {
  display: flex;
  align-items: center;
  gap: 13px;
  padding: 13px;
  border-radius: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: 0.1s;
}

.dl-item:last-child {
  margin-bottom: 0;
}

.dl-item:hover {
  opacity: 0.88;
}

.dl-icon {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 17px;
  flex-shrink: 0;
}

.dl-name {
  font-size: 14px;
  font-weight: 700;
}

.dl-time {
  font-size: 12px;
  font-weight: 700;
}

/* ── FEEDBACK ── */
.fb-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid #f1f5f9;
}

.fb-row:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.fb-left {
  display: flex;
  align-items: center;
  gap: 11px;
}

.fb-icon {
  width: 36px;
  height: 36px;
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 17px;
  flex-shrink: 0;
}

.fb-quiz {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 2px;
}

.fb-when {
  font-size: 12px;
  color: var(--txt-lt);
}
</style>
