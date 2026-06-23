<template>
  <div>
    <NavbarLandingPage />

    <div>
      <section class="hero">
        <div class="hero-bg" ref="heroBg">
          <span class="bg-circle circle-1"></span>
          <span class="bg-circle circle-2"></span>
          <span class="bg-circle circle-3"></span>
          <span class="bg-circle circle-4"></span>
          <div class="hero-noise"></div>
        </div>

        <div class="container">
          <div class="row align-items-center">
            <div class="col-lg-6">
              <span class="hero-badge">វាស់ស្ទង់សមត្ថភាពឆ្លាតវៃ</span>
              <h1 class="fw-semibold mb-4">
                ពង្រឹងចំណេះដឹងរបស់អ្នក<br /><span style="color: #10b981"
                  >ដោយភាពជឿជាក់</span
                >
              </h1>
              <p class="text-body mb-5">
                បំប្លែងការរៀនសូត្រទៅជាការកម្សាន្តដ៏មានន័យ។ Pralong 
                ជួយអ្នកបង្កើតកម្រងសំណួរ វាយតម្លៃសមត្ថភាព 
                និងតាមដានការរីកចម្រើននៃខួរក្បាលរបស់អ្នកតាមរយៈជំហានតូចៗជារៀងរាល់ថ្ងៃ។
              </p>
              <div class="btn-group-wrap d-flex flex-wrap gap-3 mb-5">
                <router-link
                  :to="{ name: 'Login' }"
                  class="btn btn-signup-modern py-3 px-5 fs-5 fw-semibold"
                  >ចាប់ផ្តើមប្រឡង <i class="bi bi-arrow-right-short fs-4"></i></router-link
                >
              </div>
              
            </div>
            <div class="col-lg-6 mt-5 mt-lg-0">
              <div class="floating-img-wrap">
                <img
                  :src="BannerImage"
                  alt="ការប្រឡងអនឡាញ"
                  class="img-fluid floating-img"
                />
                <div
                  class="stats-card position-absolute bottom-0 start-0 m-4 shadow-lg d-none d-sm-block"
                  style="width: 280px; transform: translateY(30%)"
                >
                  <div class="d-flex justify-content-between mb-3">
                    <span class="fw-bold">អត្រាឆ្លើយត្រូវ (Accuracy)</span>
                    <span class="fw-bold" style="color: #10b981"
                      >92%</span
                    >
                  </div>
                  <div
                    class="progress"
                    style="
                      height: 8px;
                      background: rgba(255, 255, 255, 0.1);
                      border-radius: 10px;
                    "
                  >
                    <div
                      class="progress-bar"
                      style="
                        width: 92%;
                        background-color: #10b981;
                        border-radius: 10px;
                      "
                    ></div>
                  </div>
                  <p class="small mt-3 mb-0 opacity-75">
                    អ្នកធ្វើបានល្អណាស់សម្រាប់ Quiz ថ្ងៃនេះ! បន្តការខិតខំប្រឹងប្រែងទៀត។
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="py-5 my-5">
        <div class="container">
          <div class="text-center mb-5 pb-3 reveal">
            <h2 class="display-5 mb-4 fw-semibold text-feeling">
              សាមញ្ញ តែមានប្រសិទ្ធភាពខ្ពស់
            </h2>
            <p class="mx-auto" style="max-width: 600px">
              រាល់មុខងារទាំងអស់របស់ QuizApp 
              ត្រូវបានសម្រិតសម្រាំងដើម្បីជួយអ្នកកាត់បន្ថយភាពស្មុគស្មាញក្នុងការសិក្សា 
              បង្កើនការផ្ដោតអារម្មណ៍ និងផ្តល់ឧបករណ៍វាស់ស្ទង់សមត្ថភាពដ៏ល្អឥតខ្ចោះ។
            </p>
          </div>
          <div class="row g-4">
            <div class="col-md-4 reveal">
              <div class="feature-card">
                <div
                  class="icon-box"
                  style="
                    width: 56px;
                    height: 56px;
                    background: rgba(16, 185, 129, 0.1);
                    color: #10b981;
                    border-radius: 16px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 1.5rem;
                  "
                >
                  <i class="fas fa-bolt fs-4"></i>
                </div>
                <h4 class="title-feeling">ទម្រង់សំណួរចម្រុះ</h4>
                <p>
                  បង្កើតកម្រងសំណួរងាយៗ ទាំងជ្រើសរើសចម្លើយ (Multiple Choice) 
                  ខុសឬត្រូវ (True/False) និងសំណួរខ្លីៗយ៉ាងសម្បូរបែប។
                </p>
              </div>
            </div>
            <div class="col-md-4 reveal">
              <div class="feature-card">
                <div
                  class="icon-box"
                  style="
                    width: 56px;
                    height: 56px;
                    background: #fff7ed;
                    color: #ea580c;
                    border-radius: 16px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 1.5rem;
                  "
                >
                  <i class="fas fa-stopwatch fs-4"></i>
                </div>
                <h4 class="title-feeling" style="color: #ea580c">កំណត់ពេលជាក់លាក់</h4>
                <p>
                  បង្កើតការប្រកួតប្រជែងដ៏ជក់ចិត្តដោយកំណត់ប្រព័ន្ធម៉ោងរាប់ថយក្រោយ (Timer) 
                  សម្រាប់សំណួរនីមួយៗ ដើម្បីវាស់ស្ទង់ភាពរហ័សរហួន។
                </p>
              </div>
            </div>
            <div class="col-md-4 reveal">
              <div class="feature-card">
                <div
                  class="icon-box"
                  style="
                    width: 56px;
                    height: 56px;
                    background: #f0fdf4;
                    color: #16a34a;
                    border-radius: 16px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 1.5rem;
                  "
                >
                  <i class="fas fa-chart-line fs-4"></i>
                </div>
                <h4 class="title-feeling" style="color: #16a34a">វិភាគលទ្ធផលភ្លាមៗ</h4>
                <p>
                  ទទួលបានរបាយការណ៍ពិន្ទុ និងការវិភាគក្រាហ្វិកលម្អិតពីចំណុចខ្លាំង 
                  និងចំណុចខ្សោយរបស់អ្នកភ្លាមៗបន្ទាប់ពីបញ្ចប់ការប្រឡង។
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="benefits-section">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-lg-5 mb-5 mb-lg-0 reveal-left">
              <h2 class="display-4 mb-4 fw-semibold">
                ហេតុអ្វី Pralong ជា
                <span style="color: #10b981">ជម្រើសដ៏ល្អបំផុត?</span>
              </h2>
              <p class="mb-5">
                យើងជឿថាការរៀនសូត្រគួរតែមានភាពងាយស្រួល និងរហ័ស។ 
                Pralong ត្រូវបានរចនាឡើងដើម្បីឱ្យលោកគ្រូ អ្នកគ្រូ និងសិស្សានុសិស្ស 
                អាចបង្កើតបន្ទប់សិក្សា និងប្រឡងបានភ្លាមៗដោយមិនបាច់រៀនប្រើច្រើន។
              </p>

              <div class="benefit-item">
                <i class="fas fa-user-shield text-success fs-4"></i>
                <div>
                  <h6 class="mb-1 fw-bold">គ្រប់គ្រងថ្នាក់រៀនឆ្លាតវៃ</h6>
                  <p class="small mb-0">
                    លោកគ្រូអ្នកគ្រូអាចបង្កើតបន្ទប់សិក្សា (Room) និងបញ្ចូលសិស្សដើម្បីធ្វើការប្រឡងដោយសុវត្ថិភាព។
                  </p>
                </div>
              </div>
              <div class="benefit-item">
                <i class="fas fa-sync-alt text-success fs-4"></i>
                <div>
                  <h6 class="mb-1 fw-bold">រក្សាទុកប្រវត្តិពិន្ទុ</h6>
                  <p class="small mb-0">
                    រាល់ការប្រឡង និងមេដាយកិត្តិយសរបស់អ្នកនឹងត្រូវបានរក្សាទុកក្នុងគណនីផ្ទាល់ខ្លួនជានិច្ច។
                  </p>
                </div>
              </div>
              <div class="benefit-item">
                <i class="fas fa-mobile-alt text-success fs-4"></i>
                <div>
                  <h6 class="mb-1 fw-bold">គាំទ្រគ្រប់ឧបករណ៍</h6>
                  <p class="small mb-0">
                    ចូលរួមឆ្លើយសំណួរបានយ៉ាងរលូន មិនថាលើទូរស័ព្ទដៃ ថេប្លេត ឬកុំព្យូទ័រឡើយ។
                  </p>
                </div>
              </div>
            </div>
            <div class="col-lg-7 text-center reveal-right">
              <img
                :src="WhyChooseUsImage"
                alt="គំរូកម្មវិធីប្រឡង"
                class="img-fluid rounded-4 shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <section class="py-5 bg-white overflow-hidden">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-lg-6 mb-5 mb-lg-0 reveal-left">
              <h2 class="display-5 fw-semibold mb-5">
                ពង្រឹងការចងចាំជាមួយ<br />
                <span style="color: #10b981">កម្រងសំណួរ</span>
                ដ៏ច្បាស់លាស់
              </h2>
              <p class="lead text-muted mb-5">
                Pralong មិនមែនគ្រាន់តែជាប្រព័ន្ធប្រឡងធម្មតានោះទេ 
                តែវាជាដៃគូជំនួយការឆ្លាតវៃដែលជួយកាត់បន្ថយភាពតានតឹងពីការរៀនទន្ទេញ 
                និងបង្វែរមេរៀនស្មុគស្មាញឱ្យទៅជាការលេងល្បែងកម្សាន្តខួរក្បាល។
              </p>

              <div
                class="p-4 border-start border-4 border-teal rounded-3"
                style="background: rgba(16, 185, 129, 0.05)"
              >
                <p class="m-0 fst-italic">
                  "បេសកកម្មរបស់យើងគឺជួយឱ្យការវាយតម្លៃសមត្ថភាព និងការក្រេបជញ្ជក់ចំណេះដឹង 
                  ក្លាយជាបទពិសោធន៍ដ៏រីករាយ និងមានប្រសិទ្ធភាពបំផុតសម្រាប់មនុស្សគ្រប់គ្នា។"
                </p>
              </div>
            </div>

            <div class="col-lg-6 ps-lg-5 reveal-right">
              <div class="about-img-stack">
                <div
                  class="floating-badge"
                  style="
                    position: absolute;
                    top: 15%;
                    left: -20px;
                    background: #10b981;
                    color: white;
                    padding: 0.8rem 1.2rem;
                    border-radius: 15px;
                    z-index: 3;
                    box-shadow: 0 10px 20px rgba(16, 185, 129, 0.3);
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    animation: float 4s infinite;
                  "
                >
                  <i class="fas fa-trophy"></i>
                  <span class="fw-bold">ជោគជ័យគ្រប់ការប្រឡង</span>
                </div>
                <img
                  :src="TableImage"
                  class="img-main ms-auto"
                  alt="សិស្សកំពុងសិក្សា"
                />
                <img
                  :src="PhoneImage"
                  class="img-sub"
                  alt="ការបង្ហាញផ្ទាំងសំណួរ"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <Footer />
  </div>
</template>

<script setup>
import NavbarLandingPage from "@/components/layout/navbar/landing/LandingPageNavebar.vue";
import Footer from "@/components/layout/navbar/landing/FooterLandingPage.vue";

import { onMounted, onBeforeUnmount, ref } from "vue";
import BannerImage from "@/assets/images/homepage/banner.png";
import WhyChooseUsImage from "@/assets/images/homepage/whychooseus.png";
import PhoneImage from "@/assets/images/homepage/phone.png";
import TableImage from "@/assets/images/homepage/table_img.png";

const heroBg = ref(null);
let mouseHandler = null;
let scrollObserver = null;

onMounted(() => {
  // 1. Interactive Mouse Move Parallax for Hero Background Blobs
  mouseHandler = (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 40;
    const y = (e.clientY / window.innerHeight - 0.5) * 40;

    heroBg.value?.querySelectorAll(".bg-circle").forEach((blob, i) => {
      const speed = (i + 1) * 0.3;
      blob.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
    });
  };
  window.addEventListener("mousemove", mouseHandler);

  // 2. High Performance Cross-Browser Scroll Reveal Animation Engine
  scrollObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active-reveal");
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
  );

  // Grab targets spanning different animation configurations
  const animatedElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  animatedElements.forEach((el) => scrollObserver.observe(el));
});

onBeforeUnmount(() => {
  if (mouseHandler) window.removeEventListener("mousemove", mouseHandler);
  if (scrollObserver) scrollObserver.disconnect();
});
</script>

<style scoped>
/* --- Core Transition Declarations --- */
.reveal, .reveal-left, .reveal-right {
  opacity: 0;
  transition: all 0.8s cubic-bezier(0.25, 1, 0.5, 1);
  will-change: transform, opacity;
}

.reveal {
  transform: translateY(40px) scale(0.98);
}

.reveal-left {
  transform: translateX(-50px);
}

.reveal-right {
  transform: translateX(50px);
}

/* Intersected Active Trigger States */
.active-reveal {
  opacity: 1 !important;
  transform: translate(0) scale(1) !important;
}

/* Base Stylings & Theme Settings */
.text-feeling {
  color: #333333;
}

.title-feeling {
  color: #059669;
  margin-bottom: 1.3rem;
  font-weight: 600;
}

.hero {
  position: relative;
  overflow: hidden;
  padding: 200px 0 120px;
  background:
    radial-gradient(
      1200px circle at 10% 10%,
      rgba(16, 185, 129, 0.15),
      transparent 40%
    ),
    radial-gradient(
      1000px circle at 90% 20%,
      rgba(5, 150, 105, 0.15),
      transparent 45%
    ),
    linear-gradient(135deg, #f4fbf7 0%, #eefbf4 50%, #f9fdfb 100%);
}

.hero .container {
  position: relative;
  z-index: 3;
}

.hero-bg {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
}

.bg-circle {
  position: absolute;
  border-radius: 50%;
  filter: blur(30px);
  opacity: 0.45;
  animation: floatSlow 14s ease-in-out infinite;
}

.circle-1 {
  width: 300px;
  height: 300px;
  background: #10b981;
  top: -120px;
  left: -120px;
}

.circle-2 {
  width: 460px;
  height: 460px;
  background: #059669;
  top: 15%;
  right: -180px;
  animation-delay: 2s;
}

.circle-3 {
  width: 220px;
  height: 220px;
  background: #34d399;
  bottom: 15%;
  left: 12%;
  animation-delay: 4s;
}

.circle-4 {
  width: 180px;
  height: 180px;
  background: #059669;
  bottom: -80px;
  right: 30%;
  animation-delay: 6s;
}

.hero::after {
  content: "";
  position: absolute;
  inset: 0;
  backdrop-filter: blur(60px);
  -webkit-backdrop-filter: blur(60px);
  background: rgba(255, 255, 255, 0.4);
  z-index: 2;
}

.hero-noise {
  position: absolute;
  inset: 0;
  z-index: 2;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.02'/%3E%3C/svg%3E");
}

@keyframes floatSlow {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  50% {
    transform: translate(30px, -40px) scale(1.06);
  }
}

.floating-img-wrap::before {
  content: "";
  position: absolute;
  inset: -20px;
  background: radial-gradient(
    circle,
    rgba(16, 185, 129, 0.2),
    transparent 70%
  );
  filter: blur(40px);
  z-index: -1;
}

template {
  background-color: white;
  overflow-x: hidden;
}

.hero h1 {
  font-size: 3.8rem;
  line-height: 1.3;
  margin-bottom: 1.5rem;
  opacity: 0;
  animation: fadeInScale 0.8s forwards 0.2s;
}

.hero p {
  opacity: 0;
  animation: fadeInScale 0.8s forwards 0.4s;
}

.hero .btn-group-wrap {
  opacity: 0;
  animation: fadeInScale 0.8s forwards 0.6s;
}

.hero-badge {
  display: inline-block;
  padding: 0.5rem 1rem;
  background: rgba(16, 185, 129, 0.1);
  color: #059669;
  border-radius: 50px;
  font-size: 0.875rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  opacity: 0;
  animation: fadeInScale 0.8s forwards;
}

.floating-img-wrap {
  position: relative;
  animation: float 6s ease-in-out infinite;
}

.btn-signup-modern {
  background: linear-gradient(135deg, #10b981, #059669);
  color: white !important;
  border: none;
  padding: 14px 32px;
  border-radius: 18px;
  transition: all 0.3s ease;
  box-shadow: 0 6px 20px rgba(16, 185, 129, 0.25);
}

.btn-signup-modern:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(16, 185, 129, 0.35);
}

.floating-img {
  border-radius: 24px;
  box-shadow: 0 40px 80px -15px rgba(0, 0, 0, 0.15);
}

.stats-card {
  background: #1e293bc2;
  border-radius: 24px;
  padding: 2rem;
  color: white;
  animation: float-delayed 5s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}

@keyframes float-delayed {
  0%, 100% { transform: translateY(0px) translateX(0px); }
  50% { transform: translateY(-15px) translateX(10px); }
}

@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.feature-card {
  padding: 2.5rem;
  border-radius: 24px;
  border: 1px solid #f1f5f9;
  background: white;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  height: 100%;
  box-shadow: 1px 5px 8px rgba(240, 240, 240, 0.5);
}

.feature-card:hover {
  border-color: rgba(16, 185, 129, 0.3);
  box-shadow: 0 30px 60px rgba(16, 185, 129, 0.12);
  transform: translateY(-12px);
}

.benefits-section {
  background: #f1f5f9;
  border-radius: 60px;
  padding: 100px 0;
  margin: 0 20px;
}

.benefit-item {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  background: white;
  padding: 1.5rem;
  border-radius: 20px;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
}

.benefit-item:hover {
  transform: translateX(10px);
}

.about-img-stack {
  position: relative;
  height: 500px;
  display: flex;
  align-items: center;
}

.img-main {
  width: 80%;
  border-radius: 30px;
  z-index: 1;
  position: relative;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  object-fit: cover;
  height: 400px;
}

.img-sub {
  width: 50%;
  border-radius: 20px;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 2;
  border: 8px solid white;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  object-fit: cover;
  height: 250px;
  animation: float-delayed 7s infinite;
}

.border-teal {
  border-color: #10b981 !important;
}

@media (max-width: 991px) {
  .hero {
    padding: 160px 0 60px;
    text-align: center;
  }
  .hero p { margin: 0 auto 2.5rem; }
  .benefits-section {
    margin: 0;
    border-radius: 0;
    padding: 60px 0;
  }
  .about-img-stack {
    height: 400px;
    margin-top: 3rem;
  }
}
</style>