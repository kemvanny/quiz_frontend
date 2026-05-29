<template>
  <div class="help-container">
    <div class="page-header">
      <h2>មជ្ឈមណ្ឌលជំនួយ (Help Center)</h2>
      <p>ស្វែងយល់ពីរបៀបប្រើប្រាស់ប្រព័ន្ធ និងដំណោះស្រាយចំពោះបញ្ហាដែលជួបប្រទះញឹកញាប់</p>
    </div>

    <div class="support-banner">
      <div class="banner-info">
        <i class="bi bi-headset"></i>
        <div>
          <h4>ជួបបញ្ហាបច្ចេកទេស ឬគាំង Web មែនទេ?</h4>
          <p>ក្រុមការងារបច្ចេកទេសរបស់ Pralong រង់ចាំជួយសម្របសម្រួលជូនអ្នករៀងរាល់ម៉ោងធ្វើការ។</p>
        </div>
      </div>
      <a href="https://t.me/your_support_link" target="_blank" class="btn-contact">
        <i class="bi bi-telegram"></i> ទាក់ទងតាម Telegram
      </a>
    </div>

    <div class="faq-section">
      <h3>សំណួរដែលជួបប្រទះញឹកញាប់ (FAQs)</h3>
      
      <div class="faq-list">
        <details class="faq-item">
          <summary>តើធ្វើដូចម្តេចបើសិស្សដាច់អ៊ីនធឺណិតពេលកំពុងប្រឡង?</summary>
          <p>ប្រព័ន្ធ Pralong មានមុខងាររក្សាទុកចម្លើយស្វ័យប្រវត្ត (Auto-save)។ នៅពេលសិស្សភ្ជាប់អ៊ីនធឺណិតវិញ ពួកគេអាចចូលមកធ្វើបន្តពីសំណួរដែលបានធ្វើចុងក្រោយបានភ្លាមៗ ដោយមិនបាត់បង់ទិន្នន័យឡើយ។</p>
        </details>

        <details class="faq-item">
          <summary>តើអាចកំណត់មិនឱ្យសិស្សបើក Tab ផ្សេងបានទេ?</summary>
          <p>បាន! អ្នកអាចចូលទៅកាន់ទំព័រ <strong>"ការកំណត់" ➔ ផ្ទាំង "សុវត្ថិភាព & បទបញ្ជា"</strong> រួចបើកមុខងារ <em>"ការការពារការចាកចេញពីផ្ទាំងប្រឡង"</em> ជាការស្រេច។</p>
        </details>
      </div>
    </div>
  </div>
</template>

<style scoped>
.help-container { display: flex; flex-direction: column; gap: 24px; }
.page-header h2 { font-size: 24px; font-weight: 800; color: #1e4635; margin: 0 0 4px; }
.page-header p { font-size: 14px; color: #666; margin: 0; }

.support-banner {
  background: linear-gradient(135deg, #e8f8f0, #d2f3e2);
  border: 1px solid rgba(63, 186, 127, 0.15);
  border-radius: 16px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
}
.banner-info { display: flex; align-items: center; gap: 16px; }
.banner-info i { font-size: 32px; color: #3fba7f; }
.banner-info h4 { font-size: 15px; font-weight: 800; color: #1e4635; margin: 0 0 2px; }
.banner-info p { font-size: 13px; color: #444; margin: 0; }

.btn-contact {
  background: #0088cc;
  color: white;
  text-decoration: none;
  padding: 10px 18px;
  border-radius: 10px;
  font-weight: 700;
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 4px 12px rgba(0, 136, 204, 0.2);
}

.faq-section h3 { font-size: 16px; font-weight: 800; color: #1e4635; margin: 0 0 16px; }
.faq-list { display: flex; flex-direction: column; gap: 10px; }
.faq-item { background: #fcfdfe; border: 1px solid rgba(0, 0, 0, 0.04); border-radius: 12px; padding: 14px; }
.faq-item summary { font-size: 14px; font-weight: 700; color: #222; cursor: pointer; outline: none; }
.faq-item p { font-size: 13px; color: #555; line-height: 1.6; margin: 10px 0 0; padding-left: 14px; border-left: 2px solid #3fba7f; }
</style>