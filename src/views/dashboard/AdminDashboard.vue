<template>
  <div class="page-body">
    <!-- ══ DASHBOARD SECTION ══ -->
    <div id="section-dashboard">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <div>
          <div class="page-title">ទិដ្ឋភាពទូទៅនៃផ្ទាំងគ្រប់គ្រង</div>
          <div class="page-subtitle">
            ស្វាគមន៍ការត្រឡប់មកវិញ! នេះគឺជាអ្វីដែលកំពុងកើតឡើងនៅថ្ងៃនេះ
          </div>
        </div>
      </div>

      <!-- STAT CARDS -->
      <div class="row g-3 mb-4">
        <div class="col-md-3 col-sm-6">
          <div class="stat-card">
            <div class="icon-wrap ic-green">
              <i class="bi bi-people-fill"></i>
            </div>
            <div class="stat-label">អ្នកប្រើប្រាស់សរុប</div>
            <div class="stat-value">
              {{ dashboardTotal?.total_users?.count }}
            </div>
            <span class="stat-badge badge-up"><i class="bi bi-arrow-up-short"></i>
              {{
                dashboardTotal?.total_users?.this_week_count
              }}
              នាក់ក្នុងសប្តាហ៍នេះ</span>
          </div>
        </div>
        <div class="col-md-3 col-sm-6">
          <div class="stat-card">
            <div class="icon-wrap ic-teal">
              <i class="bi bi-door-open-fill"></i>
            </div>
            <div class="stat-label">សរុបបន្ទប់</div>
            <div class="stat-value">
              {{ dashboardTotal?.total_rooms?.count }}
            </div>
            <span class="stat-badge badge-up"><i class="bi bi-arrow-up-short"></i>{{
              dashboardTotal?.total_rooms?.new_count }} បន្ថែមថ្មី</span>
          </div>
        </div>
        <div class="col-md-3 col-sm-6">
          <div class="stat-card">
            <div class="icon-wrap ic-blue">
              <i class="bi bi-journal-check"></i>
            </div>
            <div class="stat-label">វិញ្ញាសាសរុប</div>
            <div class="stat-value">
              {{ dashboardTotal?.total_exams?.count }}
            </div>
            <span class="stat-badge badge-up"><i class="bi bi-arrow-up-short"></i>
              {{
                dashboardTotal?.total_exams?.active_count
              }}
              កំពុងដំណើរការ</span>
          </div>
        </div>
        <div class="col-md-3 col-sm-6">
          <div class="stat-card">
            <div class="icon-wrap ic-orange">
              <i class="bi bi-send-check-fill"></i>
            </div>
            <div class="stat-label">ការដាក់ស្នើ</div>
            <div class="stat-value">
              {{ dashboardTotal?.submissions?.count }}%
            </div>
            <span class="stat-badge badge-down"><i class="bi bi-arrow-down-short"></i>
              {{ dashboardTotal?.submissions?.change_percent }}% ធ្លាក់ចុះ</span>
          </div>
        </div>
      </div>

      <!-- CHART + PROMO -->
      <div class="row g-3 mb-4">
        <div class="col-lg-12">
          <div class="dash-card">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <div>
                <div class="section-title mb-0">ការបញ្ជូនចម្លើយប្រចាំខែ</div>
                <div style="
                    font-size: 28px;
                    font-weight: 800;
                    letter-spacing: -1px;
                    color: var(--text-main);
                  ">
                  {{ monthlyData?.total_attempts?.toLocaleString() || 0 }}
                  <span style="
                      font-size: 13px;
                      color: var(--text-muted);
                      font-weight: 600;
                    ">ដងនៃការចូលរួមធ្វើវិញ្ញាសា</span>
                </div>
              </div>

              <select class="form-select" style="width: 120px; font-size: 12px">
                <option>{{ monthlyData?.year || 2026 }}</option>
              </select>
            </div>

            <div class="bar-chart" id="barChart" style="
                display: flex;
                align-items: flex-end;
                justify-content: space-between;
                height: 200px;
                padding-top: 20px;
              ">
              <div v-for="(item, index) in monthlyData?.months" :key="index" class="chart-bar-item" style="
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  flex: 1;
                  margin: 0 4px;
                  height: 100%;
                  justify-content: flex-end;
                ">
                <div class="main-bar" :style="{
                  height: calculateBarHeight(item.count),
                  width: '100%',
                  backgroundColor: '#10b981',
                  borderRadius: '4px 4px 0 0',
                  position: 'relative',
                  transition: 'height 0.3s ease',
                }" :title="`${item.month}: ${item.count} ដង`">
                  <span v-if="item.count > 0" style="
                      position: absolute;
                      top: -18px;
                      left: 50%;
                      transform: translateX(-50%);
                      font-size: 10px;
                      font-weight: bold;
                      color: var(--text-main);
                    ">
                    {{ item.count }}
                  </span>
                </div>
              </div>
            </div>

            <div style="
                display: flex;
                justify-content: space-around;
                margin-top: 6px;
              " id="barLabels">
              <div v-for="(item, index) in monthlyData?.months" :key="index" style="
                  font-size: 11px;
                  color: var(--text-muted);
                  text-align: center;
                  flex: 1;
                ">
                {{ item.month }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ACTIVITY + RECENT SUBMISSIONS -->
      <div class="row g-3">
        <div class="col-lg-5">
          <div class="dash-card d-flex flex-column h-100">
            <div class="section-title">សកម្មភាពថ្មីៗ</div>

            <div id="activityFeed" class="flex-grow-1">
              <div v-for="(activity, index) in recentActivitiesList" :key="index" class="activity-item">
                <div class="activity-icon"
                  :style="{ backgroundColor: getActivityStyle(activity.message).bg, color: getActivityStyle(activity.message).color }">
                  <i class="bi" :class="getActivityStyle(activity.message).icon"></i>
                </div>
                <div>
                  <div class="activity-text">{{ activity.message }}</div>
                  <div class="activity-time">
                    {{ formatDate(activity.created_at) }}
                  </div>
                </div>
              </div>

              <div v-if="!recentActivitiesList || recentActivitiesList.length === 0" class="text-center text-muted py-4"
                style="font-size: 13px">
                មិនទាន់មានសកម្មភាពថ្មីៗនៅឡើយទេ
              </div>
            </div>

            <div class="mt-3 pt-2 ">
              <BasePagination v-if="totalRecords > 0" :current-page="currentPage" :limit="limit" :total="totalRecords"
                @update:page="changePage" />
            </div>

          </div>
        </div>

        <div class="col-lg-7">
          <div class="dash-card">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <div class="section-title mb-0">ការដាក់ស្នើថ្មីៗ</div>
              <router-link :to="{ name: 'ResultSubmission' }" class="btn-outline-green text-decoration-none">
                មើលទាំងអស់
              </router-link>
            </div>

            <DataTable :headers="submissionHeaders" :items="submissionList" :is-loading="isLoading"
              :current-page="currentPageExam" :limit="limitExam" :total="totalRecordsExam"
              @update:page="changePageExam">
              <template #row="{ item }">
                <td>{{ item.user_name }}</td>
                <td>{{ item.quiz_title }}</td>
                <td>
                  <strong>{{ item.score }}</strong>
                </td>
                <td>{{ formatDate(item.submitted_at) }}</td>
                <td>
                  <StatusBadge :type="item.status" />
                </td>
              </template>
            </DataTable>
          </div>
        </div>
      </div>

      <!-- SYSTEM HEALTH -->
      <div class="row g-3 mt-0">
        <div class="col-12 mt-3">
          <div class="dash-card system-health-card">
            <div class="section-title mb-4 d-flex align-items-center gap-2">
              <i class="bi bi-cpu text-success"></i> ទិដ្ឋភាពទូទៅនៃស្ថានភាពប្រព័ន្ធ
            </div>

            <div v-if="isLoading" class="text-center py-5 text-muted">
              <div class="spinner-border spinner-border-sm text-success me-2" role="status"></div>
              <span>កំពុងទាញទិន្នន័យស្ថានភាពប្រព័ន្ធ...</span>
            </div>

            <div v-else class="row align-items-center">
              <div class="col-md-6 d-flex justify-content-around py-3 border-end border-light">
                <div v-for="(h, index) in healthBars" :key="index" class="text-center position-relative circular-box">
                  <div class="circular-progress-wrapper mb-2">
                    <div class="progress-circle" :style="{
                      background: `conic-gradient(${getBarColor(h.label, h.value)} ${h.value * 3.6}deg, #f1f5f9 0deg)`
                    }">
                      <div class="progress-inner">
                        <span class="fs-5 fw-extrabold text-dark">{{ h.value }}%</span>
                      </div>
                    </div>
                  </div>
                  <div class="health-label fw-bold text-secondary" style="font-size: 13px;">{{ translateLabel(h.label)
                    }}
                  </div>
                </div>
              </div>

              <div class="col-md-6 ps-md-4">
                <div class="row g-3">
                  <div v-for="(c, index) in statsCards" :key="index" class="col-6">
                    <div class="modern-stat-box p-3 d-flex align-items-center gap-3">
                      <div class="icon-avatar d-flex align-items-center justify-content-center">
                        <i :class="['bi', getIcon(c.label)]"></i>
                      </div>
                      <div>
                        <div class="stat-box-label text-muted small fw-bold">{{ translateLabel(c.label) }}</div>
                        <div class="stat-box-value fs-4 fw-black text-dark">{{ c.value }}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { recentActivity, getDashboardData, getSubmissionMonthly, getAllSubmissions, getSystemHealth } from "@/api/admin.api";
import DataTable from "@/components/common/DataTable.vue";
import { useDate } from "@/composables/useDate";
import StatusBadge from "@/components/common/StatusBadge.vue";

const { formatDate } = useDate();

const dashboardTotal = ref([]);
const submissionList = ref([]);
const isLoading = ref(false);

const currentPage = ref(1);
const limit = ref(7);
const totalRecords = ref(0);
const recentActivitiesList = ref([]);
const currentPageExam = ref(1);
const limitExam = ref(7);
const totalRecordsExam = ref(0);

const healthBars = ref([]);
const statsCards = ref([]);

const changePage = async (newPage) => {
  currentPage.value = newPage;
  await fetchRecentActivity();
};
const changePageExam = async (newPage) => {
  currentPageExam.value = newPage;
  await fetchResultSubmission();
};

const getBarColor = (label, value) => {
  if (label.toLowerCase().includes("storage")) {
    if (value > 85) return "#dc3545";
    if (value > 60) return "#ffc107";
  }
  return "var(--green-primary, #3fba7f)";
};

const submissionHeaders = [
  { key: "student", label: "សិស្ស" },
  { key: "quiz", label: "វិញ្ញាសា" },
  { key: "score", label: "ពិន្ទុ" },
  { key: "date", label: "កាលបរិច្ឆេទ" },
  { key: "status", label: "ស្ថានភាព" },
];

const monthlyData = ref({
  year: 2026,
  total_attempts: 0,
  months: [],
});

const getIcon = (label) => {
  const text = label.toLowerCase();
  if (text.includes("user")) return "bi-people-fill";
  if (text.includes("exam")) return "bi-journal-check";
  if (text.includes("submission")) return "bi-file-earmark-arrow-up-fill";
  return "bi-activity";
};

const translateLabel = (label) => {
  if (!label) return '';

  const translations = {
    'user activity': 'សកម្មភាពអ្នកប្រើប្រាស់',
    'storage used': 'ទំហំផ្ទុកទិន្នន័យដែលបានប្រើ',
    'exam activity': 'សកម្មភាពប្រឡង',
    'total submissions': 'ការដាក់ស្នើសរុប'
  };

  const key = label.toLowerCase().trim();

  return translations[key] || label;
};

const fetchHealthData = async () => {
  try {
    isLoading.value = true;
    const res = await getSystemHealth();

    if (res.data && res.data.result) {
      const metrics = res.data.data.data.metrics || [];

      healthBars.value = metrics.filter(m => {
        const label = m.label ? m.label.toLowerCase() : '';
        return label.includes('storage') || label.includes('user');
      });

      statsCards.value = metrics.filter(m => {
        const label = m.label ? m.label.toLowerCase() : '';
        return label.includes('exam') || label.includes('submission');
      });
    }
  } catch (error) {
    console.error("មិនអាចទាញទិន្នន័យពី API ស្ថានភាពប្រព័ន្ធបានទេ:", error);
  } finally {
    isLoading.value = false;
  }
};

const getActivityStyle = (message) => {
  const msg = message ? message.toLowerCase() : "";

  if (msg.includes("joined") || msg.includes("ចូលរួម")) {
    return {
      icon: "bi-person-plus-fill",
      bg: "#e8f8f0",
      color: "#10b981",
    };
  }

  if (msg.includes("room") || msg.includes("បន្ទប់")) {
    return {
      icon: "bi-door-open-fill",
      bg: "#e8f0fd",
      color: "#3b7ef0",
    };
  }

  if (
    msg.includes("quiz") ||
    msg.includes("exam") ||
    msg.includes("វិញ្ញាសា")
  ) {
    return {
      icon: "bi-journal-check",
      bg: "#fff8e0",
      color: "#c89a00",
    };
  }

  if (
    msg.includes("deactivated") ||
    msg.includes("delete") ||
    msg.includes("បិទ")
  ) {
    return {
      icon: "bi-person-dash-fill",
      bg: "#fce8e8",
      color: "#e05c5c",
    };
  }

  return {
    icon: "bi-bell-fill",
    bg: "#f3f4f6",
    color: "#6b7280",
  };
};

const fetchRecentActivity = async () => {
  try {
    const res = await recentActivity({
      page: currentPage.value,
      limit: limit.value
    });

    if (res.data && res.data.result) {
      recentActivitiesList.value = res.data.data.activities || [];

      totalRecords.value = res.data.data.total || 0;

      currentPage.value = res.data.data.page || 1;
      limit.value = res.data.data.limit || 10;
    }
  } catch (error) {
    console.log(error);
  }
};

const fetchDashboardTotal = async () => {
  try {
    const res = await getDashboardData();
    dashboardTotal.value = res.data.data;
  } catch (error) {
    console.log("Failed to fetch dashboard total", error);
  }
};

const fetchMonthlySubmissions = async () => {
  try {
    const res = await getSubmissionMonthly();
    if (res.data && res.data.result) {
      monthlyData.value = res.data.data;
    }
  } catch (error) {
    console.log(error);
  }
};

const calculateBarHeight = (count) => {
  if (!count || count === 0) return "4px";

  const maxCount = Math.max(...monthlyData.value.months.map((m) => m.count), 0);

  if (maxCount === 0) return "4px";

  const percentage = (count / maxCount) * 100;
  return `${Math.max(percentage, 5)}%`;
};

const fetchAllSubmissions = async () => {
  try {
    const res = await getAllSubmissions({
      page: currentPageExam.value,
      limit: limitExam.value
    });
   if (res.data && res.data.result) {
      submissionList.value = res.data.data.submissions || [];
      
      totalRecordsExam.value = res.data.data.total || 0;
      currentPageExam.value = res.data.data.page || 1;
      limitExam.value = res.data.data.limit || 10;
      
      console.log("Recent Submissions:", submissionList.value);
    }
  } catch (error) {
    console.error("Error fetching all submissions:", error);
  }

}

onMounted(() => {
  fetchRecentActivity();
  fetchDashboardTotal();
  fetchMonthlySubmissions();
  fetchHealthData();
  fetchAllSubmissions();
});
</script>

<style>
.page-title {
  font-size: 22px;
  font-weight: 800;
  letter-spacing: -0.5px;
}

.page-subtitle {
  font-size: 15px;
  color: var(--text-muted);
  font-weight: 500;
}

/* ── STAT CARDS ── */
.stat-card {
  background: var(--white);
  border-radius: var(--card-radius);
  padding: 22px 22px 18px;
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
  gap: 6px;
  transition: transform 0.18s, box-shadow 0.18s;
  border: 1.5px solid transparent;
}

.stat-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow);
  border-color: var(--green-mid);
}

.stat-card .icon-wrap {
  width: 42px;
  height: 42px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  margin-bottom: 4px;
}

.stat-card .stat-label {
  font-size: 12.5px;
  font-weight: 600;
  color: var(--text-muted);
}

.stat-card .stat-value {
  font-size: 30px;
  font-weight: 800;
  color: var(--text-main);
  letter-spacing: -1px;
}

.stat-card .stat-badge {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  font-size: 11.5px;
  font-weight: 700;
  padding: 2px 9px;
  border-radius: 20px;
}

.badge-up {
  background: #e8f8f0;
  color: var(--green-dark);
}

.badge-down {
  background: #fff0f0;
  color: #e05c5c;
}

.badge-neu {
  background: var(--green-light);
  color: var(--green-primary);
}

.ic-green {
  background: var(--green-light);
  color: var(--green-primary);
}

.ic-teal {
  background: #e0f7f3;
  color: #1aad8d;
}

.ic-blue {
  background: #e8f0fd;
  color: #3b7ef0;
}

.ic-orange {
  background: #fff4e8;
  color: #f07a3b;
}

/* ── SECTION TITLE ── */
.section-title {
  font-size: 15px;
  font-weight: 800;
  letter-spacing: -0.3px;
  margin-bottom: 14px;
}

/* ── CARD ── */
.dash-card {
  background: var(--white);
  border-radius: var(--card-radius);
  padding: 22px;
  box-shadow: var(--shadow-sm);
  border: 1.5px solid transparent;
}

/* ── CHART BARS ── */
.bar-chart {
  display: flex;
  align-items: flex-end;
  gap: 10px;
  height: 120px;
}

.bar-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  flex: 1;
}

.bar {
  width: 100%;
  border-radius: 8px 8px 0 0;
  background: var(--green-light);
  transition: height 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  cursor: pointer;
}

.bar.active {
  background: var(--green-primary);
}

.bar:hover {
  opacity: 0.85;
}

.bar-label {
  font-size: 10.5px;
  color: var(--text-muted);
  font-weight: 600;
}

.bar-tooltip {
  position: absolute;
  top: -32px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--text-main);
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 6px;
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.2s;
}

.bar:hover .bar-tooltip {
  opacity: 1;
}

/* ── TABLE ── */
.dash-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
}

.dash-table th {
  font-size: 15px;
  font-weight: 700;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.8px;
  padding: 8px 12px;
  border-bottom: 1.5px solid var(--green-mid);
}

.dash-table td {
  font-size: 15px;
  padding: 12px 12px;
  border-bottom: 1px solid var(--green-light);
  vertical-align: middle;
}

.dash-table tr:last-child td {
  border-bottom: none;
}

.dash-table tr:hover td {
  background: var(--green-light);
}

.pill {
  display: inline-block;
  padding: 3px 11px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 700;
}

.pill-active {
  background: #e8f8f0;
  color: var(--green-dark);
}

.pill-inactive {
  background: #f5f5f5;
  color: #999;
}

.pill-draft {
  background: #fff8e0;
  color: #c89a00;
}

.pill-closed {
  background: #fce8e8;
  color: #c0392b;
}

.pill-teacher {
  background: #e8f0fd;
  color: #3b7ef0;
}

.pill-student {
  background: var(--green-light);
  color: var(--green-dark);
}

.pill-admin {
  background: #f3e8ff;
  color: #7c3aed;
}

/* ── ACTIVITY FEED ── */
.activity-item {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  padding: 10px 0;
  border-bottom: 1px solid var(--green-light);
}

.activity-item:last-child {
  border-bottom: none;
}

.activity-icon {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  flex-shrink: 0;
}

.activity-text {
  font-size: 13px;
  line-height: 1.5;
}

.activity-text strong {
  font-weight: 700;
}

.activity-time {
  font-size: 11px;
  color: var(--text-muted);
  margin-top: 2px;
}

/* ── PROMO BANNER ── */
.promo-banner {
  background: linear-gradient(135deg,
      var(--green-primary) 0%,
      #1aad8d 60%,
      #00c67a 100%);
  border-radius: var(--card-radius);
  padding: 28px 24px;
  color: #fff;
  position: relative;
  overflow: hidden;
}

.promo-banner::before {
  content: "";
  position: absolute;
  right: -30px;
  top: -30px;
  width: 140px;
  height: 140px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
}

.promo-banner::after {
  content: "";
  position: absolute;
  right: 30px;
  bottom: -40px;
  width: 100px;
  height: 100px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 50%;
}

.promo-banner .badge-new {
  background: rgba(255, 255, 255, 0.22);
  color: #fff;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.8px;
  padding: 3px 10px;
  border-radius: 20px;
  display: inline-block;
  margin-bottom: 10px;
}

.promo-banner h5 {
  font-size: 17px;
  font-weight: 800;
  margin-bottom: 8px;
}

.promo-banner p {
  font-size: 13px;
  opacity: 0.88;
  margin-bottom: 20px;
}

.promo-banner .btn-promo {
  background: #fff;
  color: var(--green-dark);
  font-weight: 800;
  font-size: 13px;
  padding: 9px 22px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  transition: transform 0.15s;
  display: inline-block;
}

.promo-banner .btn-promo:hover {
  transform: scale(1.03);
}

/* ── HEALTH INDICATORS ── */
.health-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.health-label {
  font-size: 13px;
  font-weight: 600;
  width: 110px;
}

.health-bar-bg {
  flex: 1;
  height: 8px;
  background: var(--green-light);
  border-radius: 20px;
  overflow: hidden;
}

.health-bar-fill {
  height: 100%;
  border-radius: 20px;
  background: var(--green-primary);
  transition: width 0.5s ease;
}

.health-pct {
  font-size: 12px;
  font-weight: 700;
  color: var(--green-dark);
  width: 36px;
  text-align: right;
}

/* ── TABS ── */
.dash-tabs .nav-link {
  font-size: 13px;
  font-weight: 700;
  color: var(--text-muted);
  border: none;
  padding: 8px 18px;
  border-radius: 8px;
  transition: all 0.15s;
}

.dash-tabs .nav-link.active,
.dash-tabs .nav-link:hover {
  background: var(--green-light);
  color: var(--green-dark);
}

/* ── ACTION BUTTONS ── */
.btn-green {
  background: var(--green-primary);
  color: #fff;
  font-weight: 700;
  font-size: 15px;
  border: none;
  padding: 8px 18px;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.15s, transform 0.12s;
}

.btn-green:hover {
  background: var(--green-dark);
  transform: translateY(-1px);
}

.btn-outline-green {
  background: transparent;
  color: var(--green-primary);
  font-weight: 700;
  font-size: 13px;
  border: 1.5px solid var(--green-primary);
  padding: 7px 16px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.15s;
}

.btn-outline-green:hover {
  background: var(--green-light);
}

.btn-icon {
  width: 30px;
  height: 30px;
  border-radius: 8px;
  border: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.15s;
}

.btn-icon-edit {
  background: #e8f0fd;
  color: #3b7ef0;
}

.btn-icon-del {
  background: #fce8e8;
  color: #e05c5c;
}

.btn-icon-view {
  background: var(--green-light);
  color: var(--green-dark);
}

.btn-icon:hover {
  opacity: 0.8;
}

/* ── SECTION TABS CONTENT ── */
.tab-pane {
  animation: fadeIn 0.25s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(6px);
  }

  to {
    opacity: 1;
    transform: none;
  }
}

/* ── SCROLLBAR ── */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: var(--green-mid);
  border-radius: 10px;
}

/* ── MODAL ── */
.modal-content {
  border-radius: 18px;
  border: 1.5px solid var(--green-mid);
}

.modal-header {
  border-bottom: 1.5px solid var(--green-mid);
}

.modal-footer {
  border-top: 1.5px solid var(--green-mid);
}

.form-control,
.form-select {
  border: 1.5px solid var(--green-mid) !important;
  font-family: inherit !important;
  font-size: 13.5px !important;
}

.form-control:focus,
.form-select:focus {
  border-color: var(--green-primary) !important;
  box-shadow: 0 0 0 3px rgba(69, 235, 155, 0.15) !important;
}

@media (max-width: 768px) {
  .sidebar {
    display: none;
  }

  .main-content {
    margin-left: 0;
  }

  .page-body {
    padding: 16px;
  }
}


.modern-modal {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.45);
  backdrop-filter: blur(5px);
  z-index: 9999;
  display: none;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.modern-modal-box {
  width: 100%;
  max-width: 520px;
  background: #fff;
  border-radius: 22px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.18);
  animation: modalFade 0.2s ease;
}

@keyframes modalFade {
  from {
    opacity: 0;
    transform: translateY(10px) scale(0.98);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.modern-modal-header {
  padding: 18px 22px;
  background: linear-gradient(135deg, #3fba7f 0%, #00c67a 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.modern-modal-header h3 {
  margin: 0;
  font-size: 22px;
  font-weight: 800;
}

.modern-modal-header p {
  margin: 3px 0 0;
  font-size: 12px;
  opacity: 0.9;
}

.modern-close-btn {
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.18);
  color: white;
  cursor: pointer;
  transition: 0.2s;
}

.modern-close-btn:hover {
  background: rgba(255, 255, 255, 0.28);
}

.modern-modal-body {
  padding: 20px 22px;
}

.modern-label {
  display: block;
  margin-bottom: 6px;
  font-size: 12px;
  font-weight: 700;
}

.modern-input-wrap {
  position: relative;
}

.modern-input-wrap i {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-muted);
}

.modern-input,
.modern-select {
  width: 100%;
  height: 48px;
  border-radius: 14px;
  border: 1.5px solid var(--green-mid);
  font-size: 14px;
  outline: none;
  transition: 0.2s;
}

.modern-input {
  padding: 0 14px 0 42px;
}

.modern-select {
  padding: 0 14px;
}

.modern-input:focus,
.modern-select:focus {
  border-color: var(--green-primary);
  box-shadow: 0 0 0 4px rgba(63, 186, 127, 0.12);
}

.modern-modal-footer {
  padding: 16px 22px;
  border-top: 1px solid var(--green-light);
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.btn-cancel {
  height: 44px;
  padding: 0 18px;
  border-radius: 12px;
  border: 1.5px solid var(--green-mid);
  background: white;
  font-weight: 700;
}

.btn-create {
  height: 44px;
  padding: 0 20px;
  border: none;
  border-radius: 12px;
  background: linear-gradient(135deg, #3fba7f 0%, #00c67a 100%);
  color: white;
  font-weight: 800;
  box-shadow: 0 10px 20px rgba(63, 186, 127, 0.18);
}

.glass-modal {
  position: fixed;
  inset: 0;
  display: none;
  align-items: center;
  justify-content: center;
  background: rgba(15, 23, 42, 0.55);
  backdrop-filter: blur(10px);
  z-index: 9999;
  padding: 20px;
}

.glass-box {
  width: 100%;
  max-width: 520px;
  background: rgba(255, 255, 255, 0.92);
  border-radius: 20px;
  box-shadow: 0 25px 70px rgba(0, 0, 0, 0.18);
  overflow: hidden;
}

.glass-header {
  padding: 18px 20px;
  background: linear-gradient(135deg, #3fba7f, #00c67a);
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.glass-tag {
  font-size: 10px;
  letter-spacing: 2px;
  opacity: 0.85;
  font-weight: 700;
}

.glass-header h3 {
  margin: 4px 0 0;
  font-size: 22px;
  font-weight: 800;
}

.glass-header p {
  margin: 3px 0 0;
  font-size: 12px;
  opacity: 0.9;
}

.glass-close {
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
  cursor: pointer;
}

.glass-body {
  padding: 18px 20px;
}

.glass-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.glass-field.full {
  grid-column: span 2;
}

.glass-field label {
  font-size: 12px;
  font-weight: 700;
  margin-bottom: 6px;
  display: block;
}

.glass-field input {
  width: 100%;
  height: 46px;
  border-radius: 12px;
  border: 1.5px solid #dbe7e0;
  padding: 0 12px;
  outline: none;
  transition: 0.2s;
  font-size: 14px;
}

.glass-field input:focus {
  border-color: #3fba7f;
  box-shadow: 0 0 0 3px rgba(63, 186, 127, 0.15);
}

.role-chips {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.chip {
  padding: 8px 12px;
  border-radius: 999px;
  border: 1.5px solid #dbe7e0;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  background: #fff;
  transition: 0.2s;
}

.chip i {
  font-size: 14px;
}

.chip.active {
  background: #e8f8f0;
  border-color: #3fba7f;
  color: #2a9d6a;
}

.glass-footer {
  padding: 14px 20px;
  border-top: 1px solid #eef6f1;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.btn-cancel {
  height: 42px;
  padding: 0 16px;
  border-radius: 10px;
  border: 1.5px solid #dbe7e0;
  background: #fff;
  font-weight: 700;
}

.btn-create {
  height: 42px;
  padding: 0 18px;
  border-radius: 10px;
  border: none;
  background: linear-gradient(135deg, #3fba7f, #00c67a);
  color: #fff;
  font-weight: 800;
  box-shadow: 0 10px 20px rgba(63, 186, 127, 0.2);
}

.system-health-card {
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
  padding: 24px;
}

.progress-circle {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  transition: all 0.3s ease;
}

.progress-inner {
  width: 74px;
  height: 74px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.05);
}

.modern-stat-box {
  background: var(--green-light);
  border: 1px solid #f1f5f9;
  border-radius: 12px;
  transition: transform 0.2s;
}

.modern-stat-box:hover {
  transform: translateY(-2px);
}

.icon-avatar {
  width: 45px;
  height: 45px;
  border-radius: 10px;
  background: #e8f8f0;
  color: #10b981;
  font-size: 20px;
}

.fw-black {
  font-weight: 800;
}

.fw-extrabold {
  font-weight: 700;
}

/* responsive */
@media (max-width: 600px) {
  .glass-grid {
    grid-template-columns: 1fr;
  }

  .glass-field.full {
    grid-column: auto;
  }
}
</style>
