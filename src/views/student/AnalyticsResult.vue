<template>
  <div>
    <div class="workspace">
      <!-- Stat strip -->
      <div class="stat-strip">
        <div class="stat-card">
          <div class="arc-wrap">
            <svg viewBox="0 0 44 44" width="50" height="50">
              <circle class="arc-track" cx="22" cy="22" r="20" />
              <circle class="arc-fill" cx="22" cy="22" r="20" />
            </svg>
            <div class="arc-label">89%</div>
          </div>
          <div>
            <div class="stat-label">មធ្យមភាគសរុប</div>
            <div class="stat-value" style="color: var(--em)">A–</div>
            <div class="stat-sub">GPA ប្រចាំឆមាស</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon ic-blue"><i class="fas fa-trophy"></i></div>
          <div>
            <div class="stat-label">ពិន្ទុខ្ពស់បំផុត</div>
            <div class="stat-value">98%</div>
            <div class="stat-sub" style="color: #3b82f6">ប្រឡងពាក់កណ្តាលឆមាស រូបវិទ្យា</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon ic-purple">
            <i class="fas fa-check-double"></i>
          </div>
          <div>
            <div class="stat-label">បានដាក់ពិន្ទុសរុប</div>
            <div class="stat-value">34</div>
            <div class="stat-sub" style="color: #9333ea">
              ការប្រឡង និងកិច្ចការ
            </div>
          </div>
        </div>
      </div>

      <!-- Table Card -->
      <div class="table-card">
        <div class="table-head">
          <h6>ពិន្ទុប្រចាំឆមាស</h6>
          <button class="download-btn">
            <i class="fas fa-download"></i> ប្រតិចារិក
          </button>
        </div>

        <div class="filter-row">
          <button class="filter-btn active">ទាំងអស់</button>
          <button class="filter-btn">រូបវិទ្យា</button>
          <button class="filter-btn">អភិវឌ្ឍវេប 101</button>
          <button class="filter-btn">ថ្នាក់ទី 12-A</button>
        </div>

        <table>
          <thead>
            <tr>
              <th>ការវាយតម្លៃ</th>
              <th>វគ្គសិក្សា</th>
              <th>បានដាក់ស្នើ</th>
              <th>ពិន្ទុ</th>
              <th>និទ្ទេស</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div class="d-flex align-items-center gap-3">
                  <div
                    class="assess-icon"
                    style="background: #fef9c3; color: #a16207"
                  >
                    <i class="fas fa-bolt"></i>
                  </div>
                  <div class="assess-name">សំណួរ៖ មូលដ្ឋាន Java</div>
                </div>
              </td>
              <td><span class="course-tag">ថ្នាក់ទី 12-A</span></td>
              <td style="color: var(--txt-mu)">12 តុលា 2023</td>
              <td>
                <div class="score-wrap" style="min-width: 120px">
                  <div class="score-bar">
                    <div
                      class="score-bar-fill"
                      style="width: 95%; background: var(--em)"
                    ></div>
                  </div>
                  <span class="score-num" style="color: var(--em)">95</span>
                </div>
              </td>
              <td><span class="grade-badge grade-a">A</span></td>
              <td class="text-end">
                <button class="action-btn">ពិនិត្យមើល</button>
              </td>
            </tr>
            <tr>
              <td>
                <div class="d-flex align-items-center gap-3">
                  <div
                    class="assess-icon"
                    style="background: #e0f2fe; color: #0284c7"
                  >
                    <i class="fas fa-code"></i>
                  </div>
                  <div class="assess-name">ប្លង់ HTML និង CSS</div>
                </div>
              </td>
              <td><span class="course-tag">អភិវឌ្ឍវេប 101</span></td>
              <td style="color: var(--txt-mu)">08 តុលា 2023</td>
              <td>
                <div class="score-wrap" style="min-width: 120px">
                  <div class="score-bar">
                    <div
                      class="score-bar-fill"
                      style="width: 88%; background: var(--em)"
                    ></div>
                  </div>
                  <span class="score-num" style="color: var(--em)">88</span>
                </div>
              </td>
              <td><span class="grade-badge grade-a">A</span></td>
              <td class="text-end">
                <button class="action-btn">ពិនិត្យមើល</button>
              </td>
            </tr>
            <tr>
              <td>
                <div class="d-flex align-items-center gap-3">
                  <div
                    class="assess-icon"
                    style="background: #fee2e2; color: #dc2626"
                  >
                    <i class="fas fa-graduation-cap"></i>
                  </div>
                  <div class="assess-name">ប្រឡងពាក់កណ្តាលឆមាស៖ រូបវិទ្យា</div>
                </div>
              </td>
              <td><span class="course-tag">ថ្នាក់ទី 11-B</span></td>
              <td style="color: var(--txt-mu)">25 កញ្ញា 2023</td>
              <td>
                <div class="score-wrap" style="min-width: 120px">
                  <div class="score-bar">
                    <div
                      class="score-bar-fill"
                      style="width: 78%; background: #f59e0b"
                    ></div>
                  </div>
                  <span class="score-num" style="color: #d97706">78</span>
                </div>
              </td>
              <td><span class="grade-badge grade-b">B</span></td>
              <td class="text-end">
                <button class="action-btn">ពិនិត្យមើល</button>
              </td>
            </tr>
            <tr>
              <td>
                <div class="d-flex align-items-center gap-3">
                  <div
                    class="assess-icon"
                    style="background: #f3f4f6; color: #6b7280"
                  >
                    <i class="fas fa-vial"></i>
                  </div>
                  <div class="assess-name">របាយការណ៍មន្ទីរពិសោធន៍ 1</div>
                </div>
              </td>
              <td><span class="course-tag">ថ្នាក់ទី 11-B</span></td>
              <td style="color: var(--txt-mu)">15 កញ្ញា 2023</td>
              <td>
                <div class="score-wrap" style="min-width: 120px">
                  <div class="score-bar">
                    <div
                      class="score-bar-fill"
                      style="width: 65%; background: #ef4444"
                    ></div>
                  </div>
                  <span class="score-num" style="color: #ef4444">65</span>
                </div>
              </td>
              <td><span class="grade-badge grade-c">C</span></td>
              <td class="text-end">
                <button class="action-btn">ពិនិត្យមើល</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup></script>
<style  scoped>
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
  --bg: #f8fafc;
  --sh-sm: 0 4px 12px rgba(0, 0, 0, 0.03);
  --sh-md: 0 10px 25px rgba(0, 0, 0, 0.05);
  --sh-hover: 0 15px 35px rgba(16, 185, 129, 0.1);
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
a {
  text-decoration: none;
  color: inherit;
}

.workspace {
  flex: 1;
  overflow-y: auto;
  padding: 2rem 2.5rem;
  font-family: "Kantumruy Pro", "Noto Sans Khmer", "Inter", sans-serif;
}

/* ── Stat Strip ── */
.stat-strip {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 24px;
}
.stat-card {
  background: #fff;
  border: 1px solid var(--bdr);
  border-radius: 18px;
  padding: 22px 24px;
  display: flex;
  align-items: center;
  gap: 18px;
  box-shadow: var(--sh-sm);
  transition: 0.25s;
}
.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--sh-hover);
  border-color: rgba(16, 185, 129, 0.3);
}
.stat-icon {
  width: 50px;
  height: 50px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  flex-shrink: 0;
}
.ic-blue {
  background: #eff6ff;
  color: #3b82f6;
}
.ic-purple {
  background: #f3e8ff;
  color: #9333ea;
}
.stat-label {
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  color: var(--txt-mu);
  margin-bottom: 4px;
}
.stat-value {
  font-size: 1.6rem;
  font-weight: 800;
  color: var(--txt);
  line-height: 1;
}
.stat-sub {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--txt-mu);
  margin-top: 3px;
}

/* Progress arc for average */
.arc-wrap {
  width: 50px;
  height: 50px;
  position: relative;
  flex-shrink: 0;
}
.arc-wrap svg {
  transform: rotate(-90deg);
}
.arc-track {
  fill: none;
  stroke: var(--em-soft);
  stroke-width: 5;
}
.arc-fill {
  fill: none;
  stroke: var(--em);
  stroke-width: 5;
  stroke-linecap: round;
  stroke-dasharray: 126;
  stroke-dashoffset: 14;
  transition: stroke-dashoffset 1s ease;
}
.arc-label {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  font-weight: 800;
  color: var(--em-dk);
}

/* ── Table Card ── */
.table-card {
  background: #fff;
  border: 1px solid var(--bdr);
  border-radius: 20px;
  box-shadow: var(--sh-sm);
  overflow: hidden;
}
.table-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 22px 28px 0;
}
.table-head h6 {
  font-size: 0.95rem;
  font-weight: 800;
  color: var(--txt);
  margin: 0;
}

.filter-row {
  display: flex;
  gap: 8px;
  padding: 16px 28px;
  border-bottom: 1px solid var(--bdr);
}
.filter-btn {
  border: 1px solid var(--bdr);
  background: var(--bg);
  color: var(--txt-mu);
  font-size: 0.78rem;
  font-weight: 700;
  padding: 6px 16px;
  border-radius: 20px;
  cursor: pointer;
  transition: 0.2s;
}
.filter-btn.active,
.filter-btn:hover {
  border-color: var(--em);
  color: var(--em);
  background: var(--em-soft);
}

table {
  width: 100%;
  border-collapse: collapse;
}
thead th {
  padding: 14px 20px;
  font-size: 0.7rem;
  font-weight: 700;
  color: var(--txt-mu);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  background: #fafafa;
  border-bottom: 1px solid var(--bdr);
}
tbody tr {
  transition: background 0.15s;
  cursor: pointer;
}
tbody tr:hover td {
  background: #f8fffe;
}
tbody tr:not(:last-child) td {
  border-bottom: 1px solid #f1f5f9;
}
td {
  padding: 18px 20px;
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--txt);
  vertical-align: middle;
}

.assess-icon {
  width: 34px;
  height: 34px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  flex-shrink: 0;
}
.assess-name {
  font-weight: 700;
  font-size: 0.9rem;
  color: var(--txt);
}
.course-tag {
  display: inline-block;
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--txt-mu);
}

/* Score bar */
.score-wrap {
  display: flex;
  align-items: center;
  gap: 10px;
}
.score-bar {
  flex: 1;
  height: 5px;
  border-radius: 99px;
  background: #f1f5f9;
}
.score-bar-fill {
  height: 100%;
  border-radius: 99px;
}
.score-num {
  font-size: 0.85rem;
  font-weight: 800;
  min-width: 36px;
  text-align: right;
}

.grade-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: 800;
}
.grade-a {
  background: #dcfce7;
  color: #166534;
}
.grade-b {
  background: #fef9c3;
  color: #92400e;
}
.grade-c {
  background: #fee2e2;
  color: #991b1b;
}

.action-btn {
  opacity: 0;
  border: 1px solid var(--bdr);
  background: #fff;
  color: var(--txt-m);
  font-size: 0.75rem;
  font-weight: 700;
  padding: 5px 14px;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}
tbody tr:hover .action-btn {
  opacity: 1;
  border-color: var(--em);
  color: var(--em);
  background: var(--em-soft);
}

.download-btn {
  background: var(--em);
  color: #fff;
  border: none;
  font-size: 0.8rem;
  font-weight: 700;
  padding: 8px 20px;
  border-radius: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: 0.2s;
}
.download-btn:hover {
  background: var(--em-dk);
}
</style>
