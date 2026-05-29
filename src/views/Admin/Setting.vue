<template>
  <div class="settings-viewport">
    <header class="settings-page-header">
      <div class="header-content">
        <h1>ការកំណត់ប្រព័ន្ធ</h1>
        <p>គ្រប់គ្រងការកំណត់រួម របៀបរៀបចំវិញ្ញាសា និងប្រព័ន្ធសុវត្ថិភាពនៃការប្រឡង</p>
      </div>
    </header>

    <nav class="settings-pill-tabs">
      <button 
        v-for="tab in tabs" 
        :key="tab.id"
        :class="['pill-tab-btn', { active: activeTab === tab.id }]"
        @click="activeTab = tab.id"
      >
        <i :class="tab.icon"></i>
        <span>{{ tab.name }}</span>
      </button>
    </nav>

    <main class="settings-content-wrapper">
      
      <transition name="fade-slide" mode="out-in">
        <section v-if="activeTab === 'general'" class="settings-card glass-cardPane">
          <div class="card-section-header">
            <div class="section-icon">
              <i class="bi bi-sliders"></i>
            </div>
            <div class="section-title-group">
              <h3>ការកំណត់ការប្រឡងរួម</h3>
              <p>កំណត់លក្ខខណ្ឌលំនាំដើមពេលបង្កើតវិញ្ញាសាថ្មីៗ</p>
            </div>
          </div>

          <div class="card-section-body">
            <div class="form-grid-compact">
              <div class="form-group-compact">
                <label>រយៈពេលប្រឡងលំនាំដើម</label>
                <div class="input-with-unit">
                  <input type="number" v-model="settings.defaultDuration" min="1" />
                  <span class="unit">នាទី</span>
                </div>
              </div>
              <div class="form-group-compact">
                <label>ភាគរយពិន្ទុសម្រាប់ជាប់</label>
                <div class="input-with-unit">
                  <input type="number" v-model="settings.passingScore" min="0" max="100" />
                  <span class="unit">%</span>
                </div>
              </div>
            </div>

            <div class="separator-line"></div>

            <div class="switch-list-compact">
              <label class="switch-row-item">
                <div class="switch-row-text">
                  <span class="title">ចៃដន្យលំដាប់សំណួរ (Shuffle Questions)</span>
                  <p class="desc">ប្តូរលំដាប់សំណួរស្វ័យប្រវត្តសម្រាប់បេក្ខជនម្នាក់ៗដើម្បីការពារការលួចចម្លើយ</p>
                </div>
                <div class="switch-wrapper">
                  <input type="checkbox" v-model="settings.shuffleQuestions" class="ios-switch-modern" />
                </div>
              </label>

              <label class="switch-row-item">
                <div class="switch-row-text">
                  <span class="title">បង្ហាញលទ្ធផលភ្លាមៗ</span>
                  <p class="desc">អនុញ្ញាតឱ្យសិស្សមើលពិន្ទុ និងចម្លើយត្រូវ/ខុស ភ្លាមៗក្រោយពេលប្រឡងរួច</p>
                </div>
                <div class="switch-wrapper">
                  <input type="checkbox" v-model="settings.showResultImmediately" class="ios-switch-modern" />
                </div>
              </label>
            </div>
          </div>
        </section>

        <section v-else-if="activeTab === 'security'" class="settings-card glass-cardPane">
          <div class="card-section-header header-red">
            <div class="section-icon">
              <i class="bi bi-shield-lock"></i>
            </div>
            <div class="section-title-group">
              <h3>ប្រព័ន្ធការពារការលួចចម្លើយ</h3>
              <p>បង្កើនសន្តិសុខ និងកម្រិតសុក្រឹតភាពនៃការប្រឡងតាមអនឡាញ</p>
            </div>
          </div>

          <div class="card-section-body">
            <div class="switch-list-compact">
              <label class="switch-row-item">
                <div class="switch-row-text">
                  <span class="title">ការការពារការចាកចេញពីផ្ទាំងប្រឡង (Tab Switching Protection)</span>
                  <p class="desc">ព្រមាន ឬចាក់សោវិញ្ញាសាស្វ័យប្រវត្ត បើសិស្សលួចបើក Tab ផ្សេង ឬចាកចេញពីកម្មវិធី</p>
                </div>
                <div class="switch-wrapper">
                  <input type="checkbox" v-model="settings.antiCheating" class="ios-switch-modern" />
                </div>
              </label>

              <label class="switch-row-item">
                <div class="switch-row-text">
                  <span class="title">បិទមុខងារចម្លង (Disable Copy-Paste & Right Click)</span>
                  <p class="desc">មិនអនុញ្ញាតឱ្យសិស្សចុច Copy សំណួរ ឬចុចស្តាំដើម្បីស្វែងរកចម្លើយលើ Google ឡើយ</p>
                </div>
                <div class="switch-wrapper">
                  <input type="checkbox" v-model="settings.disableCopyPaste" class="ios-switch-modern" />
                </div>
              </label>
            </div>
          </div>
        </section>

        <section v-else-if="activeTab === 'notifications'" class="settings-card glass-cardPane">
          <div class="card-section-header header-blue">
            <div class="section-icon">
              <i class="bi bi-bell"></i>
            </div>
            <div class="section-title-group">
              <h3>ប្រព័ន្ធប្រកាសដំណឹង</h3>
              <p>គ្រប់គ្រងការផ្ញើសារដំណឹងស្វ័យប្រវត្តទៅកាន់សិស្ស និងលោកគ្រូអ្នកគ្រូ</p>
            </div>
          </div>

          <div class="card-section-body">
            <div class="switch-list-compact">
              <label class="switch-row-item">
                <div class="switch-row-text">
                  <span class="title">ផ្ញើលទ្ធផលទៅអ៊ីមែលរបស់សិស្ស</span>
                  <p class="desc">ផ្ញើរបាយការណ៍ពិន្ទុលម្អិតទៅកាន់អ៊ីមែលរបស់បេក្ខជនបន្ទាប់ពីការប្រឡងត្រូវបានបញ្ចប់</p>
                </div>
                <div class="switch-wrapper">
                  <input type="checkbox" v-model="settings.emailNotification" class="ios-switch-modern" />
                </div>
              </label>

              <label class="switch-row-item">
                <div class="switch-row-text">
                  <span class="title">ជូនដំណឹងទៅកាន់គ្រូ (Teacher Alerts)</span>
                  <p class="desc">ផ្ញើសារដំណឹងទៅកាន់គ្រូគ្រប់គ្រងថ្នាក់ នៅពេលមានសិស្សបញ្ជូន (Submit) កិច្ចការប្រឡង</p>
                </div>
                <div class="switch-wrapper">
                  <input type="checkbox" v-model="settings.teacherAlert" class="ios-switch-modern" />
                </div>
              </label>
            </div>
          </div>
        </section>
      </transition>
    </main>

    <footer class="settings-page-footer">
      <button class="btn-primary-modern" @click="saveSettings">
        <i class="bi bi-check-circle"></i>
        <span>រក្សាទុកការកំណត់</span>
      </button>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeTab = ref('general')

const tabs = [
  { id: 'general', name: 'ការកំណត់ទូទៅ', icon: 'bi bi-sliders' },
  { id: 'security', name: 'សុវត្ថិភាព & បទបញ្ជា', icon: 'bi bi-shield-lock' },
  { id: 'notifications', name: 'ការប្រកាសដំណឹង', icon: 'bi bi-bell' }
]

// រក្សាទុកទិន្នន័យ settings ទាំងអស់
const settings = ref({
  defaultDuration: 60,
  passingScore: 50,
  shuffleQuestions: true,
  showResultImmediately: false,
  antiCheating: true,
  disableCopyPaste: true,
  emailNotification: false,
  teacherAlert: true
})

const saveSettings = () => {

  console.log('Saved Settings:', settings.value)
}
</script>

<style scoped>

.settings-viewport {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  gap: 24px;
}


.settings-page-header {
  padding-bottom: 8px;
}

.settings-page-header h1 {
  font-size: 28px;
  font-weight: 800;
  color: var(--text-main, #1e4635);
  margin: 0 0 6px 0;
  letter-spacing: -1px;
}

.settings-page-header p {
  font-size: 15px;
  color: #6c757d;
  margin: 0;
  max-width: 600px;
}

.settings-pill-tabs {
  display: flex;
  gap: 8px;
  padding: 6px;
  background-color: #f1f3f5;
  border-radius: 100px;
  width: fit-content;
  box-shadow: inset 0 2px 5px rgba(0,0,0,0.03);
}

.pill-tab-btn {
  background: none;
  border: none;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 700;
  color: #6c757d;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  border-radius: 100px;
  transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
}

.pill-tab-btn i {
  font-size: 16px;
}

.pill-tab-btn:hover {
  color: #333;
}

.pill-tab-btn.active {
  background-color: #ffffff;
  color: var(--green-dark, #1e4635);
  box-shadow: 0 4px 10px rgba(0,0,0,0.06);
}

.settings-content-wrapper {
  flex-grow: 1;
}

.settings-card {
  width: 100%;
}

.glass-cardPane {
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(63, 186, 127, 0.05);
  border: 1px solid rgba(63, 186, 127, 0.08);
  overflow: hidden;
}

.card-section-header {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 24px 30px;
  background-color: rgba(63, 186, 127, 0.03);
  border-bottom: 1px solid rgba(63, 186, 127, 0.05);
}

.section-icon {
  width: 52px;
  height: 52px;
  background-color: #ffffff;
  color: var(--green-primary, #3fba7f);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  box-shadow: 0 4px 12px rgba(63, 186, 127, 0.1);
}

.header-red .section-icon {
  color: #e05c5c;
  box-shadow: 0 4px 12px rgba(224, 92, 92, 0.1);
}
.header-blue .section-icon {
  color: #3b82f6;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.1);
}

.section-title-group h3 {
  font-size: 18px;
  font-weight: 800;
  color: var(--text-main, #1e4635);
  margin: 0 0 3px 0;
}

.section-title-group p {
  font-size: 13px;
  color: #6c757d;
  margin: 0;
}

.card-section-body {
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.form-grid-compact {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

.form-group-compact {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group-compact label {
  font-size: 14px;
  font-weight: 700;
  color: #495057;
}

.input-with-unit {
  position: relative;
  display: flex;
  align-items: center;
}

.input-with-unit input {
  width: 100%;
  height: 48px;
  border-radius: 12px;
  border: 1.5px solid rgba(63, 186, 127, 0.12);
  padding: 0 16px;
  font-size: 15px;
  font-weight: 600;
  color: #333;
  outline: none;
  background-color: #fcfdfe;
  transition: all 0.2s ease;
}

.input-with-unit input:focus {
  border-color: var(--green-primary, #3fba7f);
  background-color: #ffffff;
  box-shadow: 0 0 0 3px rgba(63, 186, 127, 0.08);
}

.input-with-unit .unit {
  position: absolute;
  right: 16px;
  font-size: 14px;
  font-weight: 700;
  color: #7f8c8d;
  background-color: #f1f3f5;
  padding: 4px 10px;
  border-radius: 8px;
}

.separator-line {
  height: 1px;
  background-color: #eef6f1;
}

.switch-list-compact {
  display: flex;
  flex-direction: column;
}

.switch-row-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0;
  border-bottom: 1px solid #eef6f1;
  cursor: pointer;
}

.switch-row-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.switch-row-item:first-child {
  padding-top: 0;
}

.switch-row-text {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding-right: 30px;
}

.switch-row-text .title {
  font-size: 15px;
  font-weight: 700;
  color: #212529;
}

.switch-row-text .desc {
  font-size: 13px;
  color: #6c757d;
  margin: 0;
  max-width: 600px;
  line-height: 1.5;
}

.switch-wrapper {
  flex-shrink: 0;
}

.ios-switch-modern {
  appearance: none;
  width: 50px;
  height: 28px;
  background-color: #e2e8f0;
  border-radius: 100px;
  position: relative;
  cursor: pointer;
  transition: background-color 0.3s ease;
  flex-shrink: 0;
}

.ios-switch-modern::before {
  content: "";
  position: absolute;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background-color: white;
  top: 3px;
  left: 3px;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
}

.ios-switch-modern:checked {
  background-color: var(--green-primary, #3fba7f);
}

.ios-switch-modern:checked::before {
  transform: translateX(22px);
}

.settings-page-footer {
  margin-top: 12px;
  padding-bottom: 24px;
  display: flex;
  justify-content: flex-start;
}

.btn-primary-modern {
  height: 50px;
  padding: 0 30px;
  border-radius: 14px;
  border: none;
  background: linear-gradient(135deg, #3fba7f, #00c67a);
  color: #fff;
  font-weight: 800;
  font-size: 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 8px 25px rgba(63, 186, 127, 0.2);
  transition: all 0.3s ease;
}

.btn-primary-modern:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(63, 186, 127, 0.3);
}

.fade-slide-enter-active, .fade-slide-leave-active {
  transition: all 0.4s cubic-bezier(0.3, 1, 0.6, 1);
}
.fade-slide-enter-from, .fade-slide-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>