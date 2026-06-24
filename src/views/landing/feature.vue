<template>
  <div>
    <NavbarLandingPage />

    <header class="hero-banner">
      <div class="hero-image-side"></div>
      <div class="container hero-content">
        <div class="row align-items-center">
          <div class="col-lg-6">
            <span
              class="badge bg-opacity-10 border px-4 py-2 rounded-pill fw-800 uppercase tracking-widest mb-4"
              style="
                font-size: 11px;
                background-color: rgba(16, 185, 129, 0.1);
                color: #059669;
                border-color: rgba(16, 185, 129, 0.25);
              "
              >វេទិកាវាយតម្លៃចំណេះដឹងឆ្លាតវៃ</span
            >
            <h1 class="fw-semibold display-4 mb-5 mt-3">
              <span class="mb-4">វាស់ស្ទង់ចំណេះដឹង</span><br />
              <span style="color: #10b981;">ប្រកបដោយប្រសិទ្ធភាព</span>
            </h1>
            <p class="lead mb-5 fw-500 text-muted col-lg-11 lh-2">
              បំប្លែងការរៀនសូត្រទៅជាការកំសាន្ត។ Pralong ជួយអ្នកបង្កើតកម្រងសំណួរ
              វាយតម្លៃសមត្ថភាព
              និងទទួលបានរបាយការណ៍លទ្ធផលភ្លាមៗតាមរយៈល្បែងកំសាន្តខួរក្បាលដ៏សម្បូរបែប
            </p>

            <div class="d-flex gap-3">
              <router-link
                to="/login"
                class="btn-modern d-inline-flex align-items-center gap-2"
              >
                ចាប់ផ្តើមប្រឡងឥឡូវនេះ
                <i class="bi bi-arrow-right-short fs-4"></i>
              </router-link>
            </div>
          </div>
          <div class="col-lg-5 offset-lg-1 d-none d-lg-block">
            <div class="floating-container">
              <div class="floating-node node-1">
                <i class="fas fa-trophy"></i> ចំណាត់ថ្នាក់លេខ ១
              </div>
              <div class="floating-node node-2">
                <i class="fas fa-clock"></i> ពេលដែលនៅសល់៖ ០៥ នាទី
              </div>
              <div class="floating-node node-3">
                <i class="fas fa-star"></i> ពិន្ទុ +១៥០
              </div>

              <div class="floating-mockup">
                <div
                  class="d-flex justify-content-between align-items-center mb-4"
                >
                  <div class="fw-800 text-dark">សំណួរប្រឡងបច្ចុប្បន្ន</div>
                  <i class="fas fa-graduation-cap text-muted"></i>
                </div>

                <div class="mockup-item">
                  <div class="check-box">A</div>
                  <div class="flex-grow-1">
                    <div class="fw-700 small">ជម្រើសទីមួយ</div>
                  </div>
                </div>

                <div class="mockup-item active">
                  <div class="check-box"><i class="fas fa-check"></i></div>
                  <div class="flex-grow-1">
                    <div class="fw-700 small">ចម្លើយត្រឹមត្រូវបំផុត</div>
                    <div class="x-small text-muted">+៥០ ពិន្ទុបន្ថែម</div>
                  </div>
                  <span class="badge rounded-pill bg-success x-small"
                    >True</span
                  >
                </div>

                <div class="mockup-item">
                  <div class="check-box">C</div>
                  <div class="flex-grow-1">
                    <div class="fw-700 small">ជម្រើសទីបី</div>
                  </div>
                </div>

                <div
                  class="mt-4 pt-3 border-top d-flex justify-content-between align-items-center"
                >
                  <div class="x-small fw-800" style="color: #059669">
                    ឆ្លើយបាន ៨/១០ សំណួរ
                  </div>
                  <div class="d-flex">
                    <div
                      style="
                        width: 25px;
                        height: 25px;
                        background: #e2e8f0;
                        border-radius: 50%;
                        border: 2px solid white;
                        margin-right: -10px;
                      "
                    ></div>
                    <div
                      style="
                        width: 25px;
                        height: 25px;
                        background: #10b981;
                        border-radius: 50%;
                        border: 2px solid white;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: white;
                        font-size: 8px;
                      "
                    >
                      +12
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <section class="container feature-container">
      <div class="row g-4 flex-wrap">
        <div class="col-lg-8 animate-on-scroll">
          <div class="bento-card">
            <div
              class="icon-circle"
              style="background: #f0fdf4; color: #10b981"
            >
              <i class="fas fa-cubes"></i>
            </div>
            <h3 class="fw-semibold mb-3">របៀបបង្កើតកម្រងសំណួរកម្រិតខ្ពស់</h3>
            <p class="text-muted fw-500 mb-4">
              Pralong Wep ផ្ដល់នូវឧបករណ៍ងាយស្រួលក្នុងការបង្កើត
              និងគ្រប់គ្រងរាល់ទម្រង់សំណួរ ដើម្បីបំពេញតម្រូវការសិក្សា
              និងការកំសាន្ត៖
            </p>

            <div class="row g-3">
              <div class="col-md-6">
                <div class="p-4 bg-light rounded-4 h-100">
                  <span
                    class="x-small fw-semibold uppercase d-block mb-3"
                    style="color: #059669"
                    >ទម្រង់សំណួរចម្រុះ</span
                  >
                  <div class="d-flex flex-column gap-3 small fw-700 text-muted">
                    <div>
                      <i
                        class="fas fa-check-circle me-2"
                        style="color: #10b981"
                      ></i>
                      Multiple Choice
                    </div>
                    <div>
                      <i
                        class="fas fa-check-circle me-2"
                        style="color: #10b981"
                      ></i>
                      True/False
                    </div>
                    <div>
                      <i
                        class="fas fa-check-circle me-2"
                        style="color: #10b981"
                      ></i>
                      Short Answer
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div
                  class="p-4 bg-light rounded-4 h-100 d-flex flex-column justify-content-between"
                >
                  <div>
                    <span
                      class="x-small fw-semibold uppercase d-block mb-3"
                      style="color: #059669"
                      >ប្រព័ន្ធគ្រប់គ្រងសំណួរ</span
                    >
                    <p class="x-small text-muted mb-0 lh-base">
                      អ្នកអាច បង្កើត មើល កែប្រែ ឬលុប
                      កម្រងសំណួរបានភ្លាមៗក្នុងពេលជាក់ស្តែង។
                      ប្រព័ន្ធរក្សាទុកស្វ័យប្រវត្តិនូវរាល់ការផ្លាស់ប្តូររបស់អ្នក។
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-lg-4 animate-on-scroll">
          <div
            class="bento-card highlight-card"
            style="background: #f0fdf4; border-color: #dcfce7"
          >
            <div class="icon-circle text-white" style="background: #059669">
              <i class="fas fa-history"></i>
            </div>
            <h4 class="fw-semibold">កំណត់ពេលវេលាច្បាស់លាស់</h4>
            <p class="text-muted small">
              បង្កើតការប្រកួតប្រជែងដ៏ជក់ចិត្ត។ អ្នកអាចកំណត់ការរាប់ថយក្រោយ
             សម្រាប់សំណួរនីមួយៗ ឬសម្រាប់ Quiz
              ទាំងមូលដើម្បីវាស់ស្ទង់ភាពរហ័សរហួន។
            </p>

            <div
              class="alert-bubble mt-auto shadow-sm border"
              style="
                background: rgba(16, 185, 129, 0.1);
                color: #059669;
                border-color: rgba(16, 185, 129, 0.25);
              "
            >
              <i class="fas fa-stopwatch fs-4 me-2" style="color: #10b981"></i>
              <div>
                <p class="mb-0 fw-semibold x-small">ប្រព័ន្ធម៉ោងរាប់ថយក្រោយ</p>
                <p class="mb-0 x-small opacity-75">
                  ប្រយ័ត្ន៖ សល់ពេលត្រឹមតែ ៣០ វិនាទីចុងក្រោយប៉ុណ្ណោះ!
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="col-lg-4 animate-on-scroll">
          <div class="bento-card">
            <div
              class="icon-circle"
              style="background: #f0fdf4; color: #10b981"
            >
              <i class="fas fa-chalkboard-teacher"></i>
            </div>
            <h4 class="fw-semibold">គ្រប់គ្រងបន្ទប់សិក្សាឆ្លាតវៃ</h4>
            <p class="text-muted small mb-4">
              ប្រព័ន្ធគ្រប់គ្រងសាលា និងថ្នាក់រៀនដ៏ទូលំទូលាយ。 Admin អាចបង្កើតគណនីគ្រូ និងសិស្ស 
              ហើយគ្រូអាចបង្កើតបន្ទប់សិក្សា  បង្កើត Quiz និងបញ្ចូលសិស្សដោយផ្ទាល់
            </p>
            <div
              class="mt-auto p-3 border border-dashed rounded-4 bg-light"
            >
              <div class="d-flex align-items-center gap-2 mb-2">
                <i class="fas fa-user-shield x-small" style="color: #059669"></i>
                <span class="x-small fw-800 text-dark">Admin: បង្កើតគ្រូ & សិស្ស</span>
              </div>
              <div class="d-flex align-items-center gap-2">
                <i class="fas fa-door-open x-small" style="color: #10b981"></i>
                <span class="x-small fw-700 text-muted">គ្រូ: បង្កើតបន្ទប់សិក្សា & បញ្ចូលសិស្ស</span>
              </div>
            </div>
          </div>
        </div>

        <div class="col-lg-4 animate-on-scroll">
          <div class="bento-card">
            <div
              class="icon-circle"
              style="background: #f0fdf4; color: #10b981"
            >
              <i class="fas fa-chart-bar"></i>
            </div>
            <h4 class="fw-semibold">វិភាគលទ្ធផលភ្លាមៗ</h4>
            <p class="text-muted small mb-4">
              មើលឃើញការរីកចម្រើនរបស់អ្នក។ ប្រព័ន្ធនឹងបង្ហាញក្រាហ្វិកស្ថិតិ
              អត្រាឆ្លើយត្រូវ និងពិន្ទុសរុបភ្លាមៗបន្ទាប់ពីបញ្ចប់
            </p>
            <div class="progress-hud mt-auto">
              <div class="d-flex justify-content-between x-small fw-800 mb-2">
                <span>អត្រាឆ្លើយត្រូវ</span>
                <span style="color: #059669">៨៥%</span>
              </div>
              <div class="bar-container">
                <div class="bar-fill" style="background: #10b981"></div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-lg-4 animate-on-scroll">
          <div class="bento-card">
            <div
              class="icon-circle"
              style="background: #f0fdf4; color: #10b981"
            >
              <i class="fas fa-user-graduate"></i>
            </div>
            <h4 class="fw-semibold">ប្រវត្តិ និងគណនីផ្ទាល់ខ្លួន</h4>
            <p class="text-muted small">
              រក្សាទុករាល់សមិទ្ធផលដែលអ្នកសម្រេចបាន។ តាមដានប្រវត្តិនៃការលេង Quiz
              ពិន្ទុខ្ពស់បំផុត និងមេដាយកិត្តិយសដែលអ្នកធ្លាប់ទទួលបាន
            </p>
            <div
              class="mt-auto pt-3 border-top d-flex align-items-center gap-2"
            >
              <div
                class="badge bg-success bg-opacity-10 text-success rounded-pill px-3 py-2 x-small fw-800"
              >
                <i class="fas fa-medal me-1"></i> Level 12 បានផ្ទៀងផ្ទាត់
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <Footer />
  </div>
</template>

<script setup>
import Footer from "@/components/layout/navbar/landing/FooterLandingPage.vue";
import NavbarLandingPage from "@/components/layout/navbar/landing/LandingPageNavebar.vue";
</script>

<style scoped>


.lh-2 {
  line-height: 1.8;
}
.pill-tag {
  display: inline-flex;
  padding: 8px 20px;
  background: var(--primary-soft);
  color: #10b981;
  border-radius: 100px;
  font-weight: 700;
  font-size: 0.85rem;
  margin-bottom: 24px;
}
.btn-modern {
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  padding: 16px 36px;
  border-radius: 18px;
  font-weight: 700;
  border: none;
  transition: var(--transition);
  text-decoration: none;
}

/* --- Refined Banner Style --- */
.hero-banner {
  position: relative;
  background: radial-gradient(
    circle at 20% 50%,
    #f0fdf4 0%,
    rgba(16, 185, 129, 0.1) 100%
  );
  min-height: 95vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  border-radius: 0 0 80px 80px;
  padding-top: 5%;
}

.hero-banner::after {
  content: "";
  position: absolute;
  top: -10%;
  right: -5%;
  width: 40%;
  height: 120%;
  background: #10b981;
  opacity: 0.03;
  filter: blur(100px);
  transform: rotate(-15deg);
}

.hero-image-side {
  position: absolute;
  right: 0;
  top: 0;
  width: 45%;
  height: 100%;
  background: url("https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop") center/cover no-repeat;
  z-index: 1;
  mask-image: linear-gradient(to right, transparent, black 40%);
  -webkit-mask-image: linear-gradient(to right, transparent, black 40%);
}

.hero-image-side::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, #f0fdf4 0%, rgba(240, 253, 244, 0) 60% );
  z-index: 2;
}

.hero-content {
  position: relative;
  z-index: 10;
  padding: 120px 0;
}

/* --- Main Floating Card --- */
.floating-container {
  position: relative;
  perspective: 1200px;
}

.floating-mockup {
  background: #ffffff;
  border: 1px solid rgba(16, 185, 129, 0.2);
  border-radius: 28px;
  padding: 24px;
  box-shadow: 0 40px 80px -15px rgba(16, 185, 129, 0.25);
  transform: rotateY(-15deg) rotateX(5deg);
  animation: floatMain 6s ease-in-out infinite;
  max-width: 400px;
  position: relative;
  z-index: 5;
}

/* Secondary Floating Elements */
.floating-node {
  position: absolute;
  background: white;
  padding: 10px 18px;
  border-radius: 14px;
  font-size: 11px;
  font-weight: 800;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(16, 185, 129, 0.1);
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 8px;
  animation: floatNode 8s ease-in-out infinite;
}

.node-1 {
  top: -20px;
  right: -40px;
  animation-delay: 0s;
  color: #10b981;
}

.node-2 {
  bottom: 40px;
  left: -60px;
  animation-delay: -2s;
  color: #f43f5e;
}

.node-3 {
  top: 120px;
  right: -80px;
  animation-delay: -4s;
  color: #10b981;
}

@keyframes floatMain {
  0%,
  100% {
    transform: rotateY(-15deg) rotateX(5deg) translateY(0);
  }
  50% {
    transform: rotateY(-10deg) rotateX(3deg) translateY(-25px);
  }
}

@keyframes floatNode {
  0%,
  100% {
    transform: translateY(0) translateX(0);
  }
  33% {
    transform: translateY(-15px) translateX(10px);
  }
  66% {
    transform: translateY(10px) translateX(-10px);
  }
}

.mockup-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 12px;
  background: #f8fafc;
  border-radius: 16px;
  margin-bottom: 12px;
  border: 1px solid #f1f5f9;
  transition: 0.3s;
}

.mockup-item.active {
  border-color: #10b981;
  background: #f0fdf4;
}

.check-box {
  width: 22px;
  height: 22px;
  border: 2px solid #cbd5e1;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: #94a3b8;
}

.mockup-item.active .check-box {
  background: #10b981;
  border-color: #10b981;
  color: white;
}

/* --- Navigation --- */
.nav-glass {
  position: fixed;
  top: 24px;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  max-width: 1200px;
  background: var(--glass);
  backdrop-filter: blur(20px);
  border: 1px solid var(--glass-border2);
  border-radius: 30px;
  padding: 12px 30px;
  z-index: 2000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
}

.nav-link-custom {
  color: var(--text-main);
  text-decoration: none;
  font-size: 14px;
  font-weight: 700;
  opacity: 0.7;
  transition: 0.3s;
}

.nav-link-custom:hover {
  opacity: 1;
  color: #10b981;
}

/* --- Bento Feature Grid Style --- */
.feature-container {
  margin-top: -60px;
  padding-bottom: 60px;
  position: relative;
  z-index: 20;
}

.bento-card {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 24px;
  padding: 35px;
  box-shadow: 0 10px 30px -15px rgba(0, 0, 0, 0.05);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: relative;
  overflow: hidden;
}

.bento-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px -15px rgba(16, 185, 129, 0.15);
  border-color: #10b981;
}

.highlight-card {
  background: #f0fdf4;
  border-color: #dcfce7;
}

.icon-circle {
  width: 54px;
  height: 54px;
  background: #f0fdf4;
  color: #10b981;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  margin-bottom: 20px;
  transition: transform 0.5s ease;
}

.bento-card:hover .icon-circle {
  transform: scale(1.05);
}

.alert-bubble {
  padding: 14px 18px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.progress-hud {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  padding: 16px;
  border-radius: 16px;
}

.bar-container {
  background: #e2e8f0;
  height: 8px;
  border-radius: 100px;
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  background: #10b981;
  width: 85%;
}

.display-large {
  font-weight: 800;
  letter-spacing: -3px;
  line-height: 1;
  color: var(--text-main);
}

.gradient-accent {
  background: linear-gradient(135deg, #10b981, #059669);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.lh-base {
  line-height: 1.6;
}

/* --- Added Scroll Animation Logic --- */
@keyframes revealOnScroll {
  from {
    opacity: 0;
    transform: translateY(50px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.animate-on-scroll {
  /* Using native scroll-driven view timelines */
  view-timeline-name: --card-reveal;
  view-timeline-axis: block;
  animation-timeline: --card-reveal;
  animation-name: revealOnScroll;
  animation-range: entry 10% cover 40%;
  animation-fill-mode: both;
}
</style>