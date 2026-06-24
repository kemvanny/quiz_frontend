<template>
  <div class="email-container">

    <div class="email-card">
      <div class="icon-circle">
       <i class="bi bi-mortarboard-fill"></i>
      </div>

      <h2>ពិនិត្យអ៊ីមែលរបស់អ្នក</h2>
      <p>យើងបានផ្ញើតំណភ្ជាប់សម្រាប់កំណត់ពាក្យសម្ងាត់ថ្មីទៅកាន់អ៊ីមែលរបស់អ្នកហើយ។</p>
      <p class="sub-text">សូមចូលទៅកាន់ Inbox ឬ Spam ដើម្បីចុចលើតំណភ្ជាប់នោះ។</p>

      <router-link to="/login" class="btn-back">
        <i class="fas fa-arrow-left me-2"></i> ត្រឡប់ទៅការចូលគណនី
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.email-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #f3f7fb;
  font-family: 'Kantumruy Pro', sans-serif;
  padding: 20px;
  position: relative;
}


.brand-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 40px;
}

.brand-logo {
  width: 40px;
  height: 40px;
  object-fit: contain;
}

.brand-name {
  font-size: 1.5rem;
  font-weight: 800;
  color: #222;
  letter-spacing: 0.5px;
}


.email-card {
  background: #fff;
  padding: 50px 40px;
  border-radius: 30px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.05);
  max-width: 450px;
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.03);
  text-align: center;
}

.icon-circle {
  width: 90px;
  height: 90px;
  background: linear-gradient(135deg, #e8f7f0, #d1efe9);
  color: #3cbfae;
  border-radius: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 35px;
  margin: 0 auto 30px;
  box-shadow: 0 10px 20px rgba(60, 191, 174, 0.15);
}

h2 {
  font-size: 1.6rem;
  color: #111;
  margin-bottom: 15px;
  font-weight: 700;
}

p {
  color: #666;
  line-height: 1.6;
  margin-bottom: 8px;
}

.sub-text {
  font-size: 0.9rem;
  color: #999;
  margin-bottom: 40px;
}

.btn-back {
  display: inline-block;
  padding: 14px 30px;
  background: #f3f7fb;
  color: #10b981;
  text-decoration: none;
  border-radius: 50px;
  font-weight: 700;
  transition: all 0.3s ease;
}

.btn-back:hover {
  background: #059669;
  color: #fff;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(60, 191, 174, 0.2);
}
</style>