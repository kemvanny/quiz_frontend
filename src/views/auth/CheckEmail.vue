<template>
  <div class="email-container">
    <div class="email-card">
      <div class="icon-circle">
        <i class="fas fa-envelope-open-text"></i>
      </div>
      
      <h2>ពិនិត្យអ៊ីមែលរបស់អ្នក</h2>
      <p>យើងបានផ្ញើតំណភ្ជាប់សម្រាប់កំណត់ពាក្យសម្ងាត់ថ្មីទៅកាន់អ៊ីមែលរបស់អ្នកហើយ។</p>
      <p class="sub-text">សូមចូលទៅកាន់ Inbox ឬ Spam ដើម្បីចុចលើតំណភ្ជាប់នោះ។</p>

      <router-link to="/login" class="btn-back">
        ត្រឡប់ទៅការចូលគណនី
      </router-link>
    </div>
  </div>
</template>
<style scoped>
.email-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f3f7fb;
  font-family: 'Kantumruy Pro', sans-serif;
  padding: 20px;
}

.email-card {
  background: #fff;
  padding: 50px;
  border-radius: 30px;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.08);
  text-align: center;
  max-width: 450px;
  width: 100%;
}

.icon-circle {
  width: 80px;
  height: 80px;
  background: #e8f7f0;
  color: #3cbfae;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  margin: 0 auto 25px;
}

h2 {
  font-size: 1.8rem;
  color: #222;
  margin-bottom: 15px;
}

p {
  color: #666;
  line-height: 1.6;
  margin-bottom: 5px;
}

.sub-text {
  font-size: 0.9rem;
  color: #999;
  margin-bottom: 30px;
}

.btn-back {
  display: inline-block;
  padding: 12px 30px;
  background: #f3f7fb;
  color: #3cbfae;
  text-decoration: none;
  border-radius: 50px;
  font-weight: 700;
  transition: 0.3s;
}

.btn-back:hover {
  background: #3cbfae;
  color: #fff;
}
</style>