<template>
  <div class="health-viewport">
    <header class="health-page-header">
      <div class="header-main-info">
        <h1>ស្ថានភាពប្រព័ន្ធ (System Health)</h1>
        <p>ពិនិត្យមើលទិន្នន័យបច្ចេកទេស និងស្ថានភាពម៉ាស៊ីនមេជាក់ស្តែងរបស់ Pralong</p>
      </div>
      <button class="btn-refresh" @click="fetchSystemHealth">
        <i class="bi bi-arrow-clockwise"></i>
        <span>ទិន្នន័យបច្ចុប្បន្ន</span>
      </button>
    </header>

    <div :class="['status-banner-card', healthData.status]">
      <div class="banner-left">
        <div class="status-pulse-wrapper">
          <span class="dot-pulse"></span>
        </div>
        <div class="banner-text">
          <h3>ប្រព័ន្ធទាំងមូល៖ {{ healthData.status === 'healthy' ? 'ដំណើរការល្អឥតខ្ចោះ' : 'មានបញ្ហា' }}</h3>
          <p>រាល់សេវាកម្ម និងរចនាសម្ព័ន្ធទិន្នន័យកំពុងដំណើរការជាធម្មតា មិនមានការរំខានឡើយ។</p>
        </div>
      </div>
      <div class="banner-badge">
        <i class="bi bi-shield-check"></i> Secured
      </div>
    </div>

    <main class="health-metrics-grid">
      
      <div class="metric-glass-card">
        <div class="metric-card-header">
          <span class="metric-title">បេក្ខជនកំពុងអនឡាញ (Active)</span>
          <div class="metric-icon icon-green">
            <i class="bi bi-people-fill"></i>
          </div>
        </div>
        <div class="metric-card-body">
          <h2 class="huge-number">{{ healthData.active_users }} <span class="unit-text">នាក់</span></h2>
          <p class="metric-desc">ចំនួនគណនីដែលកំពុងមានសកម្មភាពលើប្រព័ន្ធជាក់ស្តែង</p>
        </div>
      </div>

      <div class="metric-glass-card">
        <div class="metric-card-header">
          <span class="metric-title">ទំហំផ្ទុកទិន្នន័យ (Database)</span>
          <div class="metric-icon icon-blue">
            <i class="bi bi-database-fill"></i>
          </div>
        </div>
        <div class="metric-card-body">
          <h2 class="huge-number">{{ healthData.database_size_mb }} <span class="unit-text">MB</span></h2>
          <p class="metric-desc">ទំហំផ្ទុកសរុបនៃរចនាសម្ព័ន្ធ Table និងទិន្នន័យប្រឡង</p>
        </div>
      </div>

      <div class="metric-glass-card">
        <div class="metric-card-header">
          <span class="metric-title">វិញ្ញាសាជំពាក់ (Pending)</span>
          <div class="metric-icon icon-amber">
            <i class="bi bi-clock-history"></i>
          </div>
        </div>
        <div class="metric-card-body">
          <h2 class="huge-number" :class="{ 'text-danger': healthData.pending_submissions > 0 }">
            {{ healthData.pending_submissions }} <span class="unit-text">កិច្ចការ</span>
          </h2>
          <p class="metric-desc">ចំនួនសន្លឹកកិច្ចការដែលកំពុងរង់ចាំការដំណើរការបញ្ជូន</p>
        </div>
      </div>

    </main>

    <section class="health-logs-card">
      <div class="logs-header">
        <i class="bi bi-journal-text"></i>
        <h3>ប្រវត្តិនៃការផ្អាកដំណើរការ (System Logs)</h3>
      </div>
      <div class="logs-body-empty">
        <div class="icon-wrapper">
          <i class="bi bi-check-all"></i>
        </div>
        <p>មិនមានកំណត់ត្រាខុសប្រក្រតី ឬការគាំងប្រព័ន្ធ (Crash) ឡើយក្នុងខែនេះ</p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// បង្កើត State សម្រាប់ទទួលទិន្នន័យតាមទម្រង់ JSON API របស់អ្នក
const healthData = ref({
  database_size_mb: "0.00",
  active_users: 0,
  pending_submissions: 0,
  status: "healthy"
})

// មុខងារសម្រាប់ទាញទិន្នន័យ (模擬 API Fetching)
const fetchSystemHealth = () => {
  // ឧទាហរណ៍៖ ទិន្នន័យបានមកពី JSON API របស់អ្នក
  const response = {
    "result": true,
    "data": {
      "title": "System Health",
      "data": {
        "database_size_mb": "0.72",
        "active_users": 6,
        "pending_submissions": 0,
        "status": "healthy"
      }
    }
  }

  if (response.result) {
    healthData.value = response.data.data
  }
}

onMounted(() => {
  fetchSystemHealth()
})
</script>

<style scoped>

.health-viewport {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  gap: 24px;
}

/* Page Header */
.health-page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
}

.header-main-info h1 {
  font-size: 28px;
  font-weight: 800;
  color: #1e4635;
  margin: 0 0 6px 0;
  letter-spacing: -1px;
}

.header-main-info p {
  font-size: 15px;
  color: #6c757d;
  margin: 0;
}

.btn-refresh {
  height: 40px;
  padding: 0 16px;
  border-radius: 10px;
  border: 1.5px solid rgba(63, 186, 127, 0.15);
  background: #ffffff;
  color: #1e4635;
  font-weight: 700;
  font-size: 13px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;
}

.btn-refresh:hover {
  background: #f4fbf7;
  border-color: #3fba7f;
}

.status-banner-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-radius: 16px;
  flex-wrap: wrap;
  gap: 16px;
}

.status-banner-card.healthy {
  background: linear-gradient(135deg, #e8f8f0, #d2f3e2);
  border: 1px solid rgba(63, 186, 127, 0.15);
}

.banner-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.status-pulse-wrapper {
  position: relative;
  width: 12px;
  height: 12px;
}

.dot-pulse {
  position: absolute;
  width: 12px;
  height: 12px;
  background-color: #3fba7f;
  border-radius: 50%;
}

.dot-pulse::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #3fba7f;
  border-radius: 50%;
  animation: ripple 1.6s infinite ease-out;
}

.banner-text h3 {
  font-size: 16px;
  font-weight: 800;
  color: #1e4635;
  margin: 0 0 2px 0;
}

.banner-text p {
  font-size: 13px;
  color: #495057;
  margin: 0;
}

.banner-badge {
  font-size: 12px;
  font-weight: 700;
  background: #ffffff;
  color: #1e4635;
  padding: 6px 12px;
  border-radius: 30px;
  display: flex;
  align-items: center;
  gap: 6px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
}

/* Metrics Grid UI ថ្មី */
.health-metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}

.metric-glass-card {
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 10px 40px rgba(63, 186, 127, 0.04);
  border: 1px solid rgba(63, 186, 127, 0.08);
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.metric-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.metric-title {
  font-size: 14px;
  font-weight: 700;
  color: #6c757d;
}

.metric-icon {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
}

.icon-green { background-color: #e8f8f0; color: #3fba7f; }
.icon-blue { background-color: #eff6ff; color: #3b82f6; }
.icon-amber { background-color: #fffbeb; color: #f59e0b; }

.huge-number {
  font-size: 32px;
  font-weight: 800;
  color: #212529;
  margin: 0 0 4px 0;
  letter-spacing: -0.5px;
}

.unit-text {
  font-size: 15px;
  font-weight: 700;
  color: #7f8c8d;
  margin-left: 4px;
}

.metric-desc {
  font-size: 12px;
  color: #868e96;
  margin: 0;
  line-height: 1.4;
}

.health-logs-card {
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 10px 40px rgba(63, 186, 127, 0.04);
  border: 1px solid rgba(63, 186, 127, 0.08);
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.logs-header {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #1e4635;
}

.logs-header i {
  font-size: 20px;
}

.logs-header h3 {
  font-size: 16px;
  font-weight: 800;
  margin: 0;
}

.logs-body-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 0;
  color: #6c757d;
  gap: 12px;
}

.logs-body-empty .icon-wrapper {
  width: 48px;
  height: 48px;
  background-color: #e8f8f0;
  color: #3fba7f;
  font-size: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logs-body-empty p {
  font-size: 13px;
  margin: 0;
  font-weight: 600;
}

@keyframes ripple {
  0% { transform: scale(1); opacity: 1; }
  100% { transform: scale(2.5); opacity: 0; }
}

.text-danger {
  color: #e05c5c !important;
}
</style>