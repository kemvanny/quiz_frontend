<template>
  <div>
    <NavbarLandingPage />

    <main class="hero-section">
      <div class="container">
        <div class="hero-decor hero-circle"></div>
        <div class="hero-decor hero-line"></div>
        <div class="hero-decor hero-triangle"></div>
        <div class="hero-decor hero-pulse"></div>
        <div class="row align-items-center g-5">
          <div class="col-lg-6 text-center text-lg-start" data-fade-up>
            <div class="pill-tag">វេទិកាវាយតម្លៃចំណេះដឹងឆ្លាតវៃ</div>
            <h1 class="hero-title fw-semibold">
              ប្រឡង និងវាស់ស្ទង់
              <span style="color: #10b981">សមត្ថភាពកាន់តែរហ័ស</span>
            </h1>
            <p class="lead text-muted mb-5">
              Pralong គឺជាប្រព័ន្ធបង្កើតកម្រងសំណួរ
              និងគ្រប់គ្រងការប្រឡងអនឡាញដ៏រលូន ដែលត្រូវបានរចនាឡើងដើម្បីជួយសាលារៀន
              គ្រូបង្រៀន និងសិស្សានុសិស្ស
              ប្រែក្លាយការវាយតម្លៃបែបប្រពៃណីឱ្យទៅជាការតេស្តចំណេះដឹងដែលមានអន្តរកម្មខ្ពស់
            </p>
            <div
              class="d-flex flex-column flex-sm-row gap-3 justify-content-center justify-content-lg-start"
            >
              <router-link
                to="/login"
                class="btn-modern d-inline-flex align-items-center gap-2"
              >
                ចាប់ផ្តើមប្រឡងឥឡូវនេះ
                <i class="bi bi-arrow-right-short fs-4"></i>
              </router-link>
            </div>
          </div>
          <div class="col-lg-6" data-fade-up>
            <div class="hero-img-container">
              <img
                :src="book"
                class="hero-main-img"
                alt="Quiz Dashboard Preview"
              />
              <div
                class="position-absolute bottom-0 start-0 translate-middle-y bg-white p-3 rounded-4 shadow-lg d-none d-md-block floating-badge"
                style="margin-left: -20px"
              >
                <div class="d-flex align-items-center gap-3">
                  <div
                    class="benefit-icon m-0"
                    style="width: 40px; height: 40px"
                  >
                    <i class="bi bi-check2-circle"></i>
                  </div>
                  <div>
                    <h6 class="mb-0 fw-bold">លទ្ធផលភ្លាមៗ</h6>
                    <small class="text-muted"
                      >កែសន្លឹកកិច្ចការដោយស្វ័យប្រវត្ត</small
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <section id="why-us" class="why-section">
      <div class="container">
        <div class="row justify-content-center text-center mb-5" data-fade-up>
          <div class="col-lg-8">
            <h2 class="display-5 mb-4 fw-semibold">
              ចក្ខុវិស័យរបស់យើង
              <span style="color: #0f766e">Pralong</span>
            </h2>
            <p class="text-muted fs-5">
              យើងចង់ឃើញការអប់រំ និងការវាយតម្លៃសមត្ថភាពមានភាពងាយស្រួល យុត្តិធម៌
              និងមានប្រសិទ្ធភាពខ្ពស់។ Pralong
              ត្រូវបានបង្កើតឡើងដើម្បីក្លាយជាជំនួយការឌីជីថលឈានមុខគេ
              ក្នុងការជួយជម្រុញស្មារតីសិក្សាតាមរយៈកម្រងសំណួរឆ្លាតវៃ។
            </p>
          </div>
        </div>
        <div class="row g-4">
          <div class="col-md-4" data-fade-up>
            <div class="benefit-card">
              <div class="benefit-icon"><i class="bi bi-bullseye"></i></div>
              <h4 class="fw-semibold mb-3">បេសកកម្មចម្បង</h4>
              <p class="text-muted">
                ផ្ដល់ជូននូវឧបករណ៍បង្កើតកម្រងសំណួរ និងការប្រឡងដ៏សាមញ្ញ
                ប៉ុន្តែមានសុវត្ថិភាពខ្ពស់ អាចរៀបចំការតេស្ត
                និងចូលរួមឆ្លើយបានគ្រប់ពេលវេលា គ្រប់ទីកន្លែង
                តាមរយៈឧបករណ៍គ្រប់ប្រភេទ។
              </p>
            </div>
          </div>
          <div class="col-md-4" data-fade-up>
            <div class="benefit-card">
              <div class="benefit-icon">
                <i class="bi bi-award"></i>
              </div>
              <h4 class="fw-semibold mb-3">បទពិសោធន៍សិក្សាដ៏ទាក់ទាញ</h4>
              <p class="text-muted">
                យើងអភិវឌ្ឍប្រព័ន្ធដោយផ្ដោតលើអន្តរកម្មរស់រវើក
                ដើម្បីជួយឱ្យសិស្សានុសិស្សមានភាពសប្បាយរីករាយក្នុងការឆ្លើយសំណួរ
                កាត់បន្ថយភាពតានតឹង និងបង្កើនការចងចាំបានកាន់តែល្អប្រសើរ។
              </p>
            </div>
          </div>
          <div class="col-md-4" data-fade-up>
            <div class="benefit-card">
              <div class="benefit-icon">
                <i class="bi bi-graph-up-arrow"></i>
              </div>
              <h4 class="fw-semibold mb-3">ការវិភាគលទ្ធផលច្បាស់លាស់</h4>
              <p class="text-muted">
                បង្ហាញលទ្ធផល និងពិន្ទុភ្លាមៗបន្ទាប់ពីប្រឡងរួច
                ព្រមទាំងផ្តល់នូវទិន្នន័យវិភាគលម្អិត ដើម្បីជួយឱ្យគ្រូបង្រៀន
                និងសិស្សផ្ទាល់អាចដឹងពីចំណុចខ្វះខាត និងចំណុចខ្លាំងបានភ្លាមៗ។
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="how-it-works" class="how-section">
      <div class="container">
        <div class="row justify-content-center text-center mb-5" data-fade-up>
          <div class="col-lg-8">
            <div class="pill-tag">ដំណើរការដ៏សាមញ្ញ</div>
            <h2 class="display-5 mb-3 fw-semibold">
              តេស្តសមត្ថភាពក្នុងរយៈពេល
              <span style="color: var(--primary)">តែប៉ុន្មានវិនាទី</span>
            </h2>
            <p class="text-muted fs-5">
              ចូលរួមប្រឡង និងវាស់ស្ទង់ចំណេះដឹងរបស់អ្នកបានយ៉ាងរហ័ស តាមរយៈ ៣
              ជំហានងាយៗ
            </p>
          </div>
        </div>
        <div class="row g-4 position-relative">
          <div class="col-lg-4" data-fade-up>
            <div class="step-card">
              <div class="connector-line"></div>
              <div class="step-badge">01</div>
              <span class="step-visual"></span>
              <h4 class="fw-semibold mb-3">បង្កើតគណនី ឬចូលប្រើប្រាស់</h4>
              <p class="text-muted">
                ចុះឈ្មោះចូលប្រើប្រាស់ភ្លាមៗជាគ្រូបង្រៀន ឬសិស្សានុសិស្ស
                គ្មានទម្រង់បែបបទស្មុគស្មាញ រួចរាល់សម្រាប់ការបង្កើត
                ឬចូលរួមការប្រឡង។
              </p>
            </div>
          </div>
          <div class="col-lg-4" data-fade-up style="transition-delay: 0.1s">
            <div class="step-card">
              <div class="connector-line"></div>
              <div class="step-badge">02</div>
              <span class="step-visual"></span>
              <h4 class="fw-semibold mb-3">ជ្រើសរើស ឬបង្កើតកម្រងសំណួរ</h4>
              <p class="text-muted">
                គ្រូបង្រៀនអាចបង្កើតកម្រងសំណួរឆ្លាតវៃបានយ៉ាងងាយស្រួល
                ចំណែកឯសិស្សានុសិស្ស គ្រាន់តែបញ្ចូលកូដ
                ឬជ្រើសរើសវិញ្ញាសាដែលត្រូវប្រឡងជាការស្រេច។
              </p>
            </div>
          </div>
          <div class="col-lg-4" data-fade-up style="transition-delay: 0.2s">
            <div class="step-card">
              <div class="step-badge">03</div>
              <span class="step-visual"></span>
              <h4 class="fw-semibold mb-3">ទទួលបានលទ្ធផលភ្លាមៗ</h4>
              <p class="text-muted">
                ធ្វើការឆ្លើយសំណួរផ្អែកលើពេលវេលាកំណត់។ នៅពេលបញ្ចប់
                ប្រព័ន្ធនឹងបង្ហាញពិន្ទុ អមដោយការបង្ហាញចម្លើយត្រូវ
                ឬខុសយ៉ាងលម្អិតបំផុត។
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="team" class="team-section">
      <div class="container">
        <div class="text-center mb-5" data-fade-up>
          <h2 class="display-6 fw-semibold">
            ជួបជាមួយ
            <span style="color: var(--primary)">ក្រុមអ្នកអភិវឌ្ឍន៍របស់យើង</span>
          </h2>
          <p class="text-muted">
            អ្នកនៅពីក្រោយការបង្កើតប្រព័ន្ធប្រឡងអនឡាញដ៏ទំនើប និងមានអន្តរកម្មរបស់
            Pralong
          </p>
        </div>
        <div class="row g-4 justify-content-center">
          <div class="col-md-6 col-lg-4" data-fade-up>
            <div class="team-card text-center">
              <div class="team-img-wrapper">
                <img :src="vanny" class="team-img" alt="Kem Vanny" />
              </div>

              <span class="team-role">Project Leader & Full Stack Developer</span>
              <h4 class="fw-bold mb-1">Kem Vanny</h4>

              <p class="text-muted small">
                អ្នកដឹកនាំគម្រោង
                និងទទួលបន្ទុកផ្នែករចនារចនាសម្ព័ន្ធប្រព័ន្ធគ្រប់គ្រងការប្រឡង
              </p>

              <div class="team-social mt-3">
                <a
                  href="https://t.me/Vanny_Kem"
                  target="_blank"
                  class="social-icon"
                >
                  <i class="bi bi-telegram"></i>
                </a>
                <a
                  href="https://www.facebook.com/share/1CHRhLasWe/?mibextid=wwXIfr"
                  target="_blank"
                  class="social-icon"
                >
                  <i class="bi bi-facebook"></i>
                </a>
                <a
                  href="https://www.instagram.com/alexcer_vn?igsh=Z253OHFiaHNyNzY1&utm_source=qr"
                  target="_blank"
                  class="social-icon"
                >
                  <i class="bi bi-instagram"></i>
                </a>
              </div>
            </div>
          </div>

          <div class="col-md-6 col-lg-4" data-fade-up>
            <div class="team-card">
              <div class="team-img-wrapper">
                <img :src="votey" class="team-img" alt="Limchhen Revotey" />
              </div>
              <span class="team-role">Full Stack Developer</span>
              <h4 class="fw-bold mb-1">Limchhen Revotey</h4>
              <p class="text-muted small">
                អ្នកជំនាញក្នុងការបម្លែងការរចនាប្រព័ន្ធប្រឡងឱ្យទៅជាកូដដែលដំណើរការបានល្អ
              </p>
              <div class="team-social mt-3">
                <a
                  href="https://t.me/yourusername"
                  target="_blank"
                  class="social-icon"
                >
                  <i class="bi bi-telegram"></i>
                </a>
                <a
                  href="https://facebook.com/yourprofile"
                  target="_blank"
                  class="social-icon"
                >
                  <i class="bi bi-facebook"></i>
                </a>
                <a
                  href="https://www.instagram.com/revoteytey?igsh=M2V5MGlsaW9iN3Ni&utm_source=qr"
                  target="_blank"
                  class="social-icon"
                >
                  <i class="bi bi-instagram"></i>
                </a>
              </div>
            </div>
          </div>

          <div class="col-md-6 col-lg-4" data-fade-up>
            <div class="team-card">
              <div class="team-img-wrapper">
                <img :src="socheata" class="team-img" alt="Vit Socheata" />
              </div>
              <span class="team-role">Full Stack Developer</span>
              <h4 class="fw-bold mb-1">Vit Socheata</h4>
              <p class="text-muted small">
                ចូលរួមក្នុងការអភិវឌ្ឍ
                និងកែលម្អគុណភាពនៃការបង្ហាញផ្ទាំងគ្រប់គ្រងពិន្ទុ
              </p>
              <div class="team-social mt-3">
                <a
                  href="https://t.me/socheatavit"
                  target="_blank"
                  class="social-icon"
                >
                  <i class="bi bi-telegram"></i>
                </a>
                <a
                  href="https://www.facebook.com/share/1BzRnmvp6o/?mibextid=wwXIfr"
                  target="_blank"
                  class="social-icon"
                >
                  <i class="bi bi-facebook"></i>
                </a>
                <a
                  href="https://github.com/yourusername"
                  target="_blank"
                  class="social-icon"
                >
                  <i class="bi bi-instagram"></i>
                </a>
              </div>
            </div>
          </div>

          <div class="col-md-6 col-lg-4" data-fade-up>
            <div class="team-card">
              <div class="team-img-wrapper">
                <img :src="liza" class="team-img" alt="Hean Liza" />
              </div>
              <span class="team-role">Full Stack Developer</span>
              <h4 class="fw-bold mb-1">Hean Liza</h4>
              <p class="text-muted small">
                ឯកទេសខាងរចនាចំណុចប្រទាក់អ្នកប្រើប្រាស់
                និងអភិវឌ្ឍផ្ទាំងទំព័រវិញ្ញាសាប្រឡង
              </p>
              <div class="team-social mt-3">
                <a
                  href="https://t.me/yourusername"
                  target="_blank"
                  class="social-icon"
                >
                  <i class="bi bi-telegram"></i>
                </a>
                <a
                  href="https://facebook.com/yourprofile"
                  target="_blank"
                  class="social-icon"
                >
                  <i class="bi bi-facebook"></i>
                </a>
                <a
                  href="https://github.com/yourusername"
                  target="_blank"
                  class="social-icon"
                >
                  <i class="bi bi-instagram"></i>
                </a>
              </div>
            </div>
          </div>

          <div class="col-md-6 col-lg-4" data-fade-up>
            <div class="team-card">
              <div class="team-img-wrapper">
                <img :src="sokkay" class="team-img" alt="Thoeurn Sokkay" />
              </div>
              <span class="team-role">Full Stack Developer</span>
              <h4 class="fw-bold mb-1">Thoeurn Sokkay</h4>
              <p class="text-muted small">
                ផ្តោតលើការបង្កើតបទពិសោធន៍អ្នកប្រើប្រាស់សម្រាប់ការឆ្លើយ Quiz
                ឱ្យរលូន និងទាក់ទាញ
              </p>
              <div class="team-social mt-3">
                <a
                  href="https://t.me/Thoeurn_Sokkay"
                  target="_blank"
                  class="social-icon"
                >
                  <i class="bi bi-telegram"></i>
                </a>
                <a
                  href="https://facebook.com/thoeurn.sokkay"
                  target="_blank"
                  class="social-icon"
                >
                  <i class="bi bi-facebook"></i>
                </a>
                <a
                  href="https://www.instagram.com/thoeurn.sokkay?utm_source=qr"
                  target="_blank"
                  class="social-icon"
                >
                  <i class="bi bi-instagram"></i>
                </a>
              </div>
            </div>
          </div>

          <div class="col-md-6 col-lg-4" data-fade-up>
            <div class="team-card">
              <div class="team-img-wrapper">
                <img :src="samat" class="team-img" alt="Thoeurn Sokkay" />
              </div>
              <span class="team-role">Full Stack Developer</span>
              <h4 class="fw-bold mb-1">Toem Samat</h4>
              <p class="text-muted small">
                ទទួលបន្ទុកលើការត្រួតពិនិត្យ
                និងអភិវឌ្ឍមុខងារឆ្លើយសំណួរឱ្យមានភាពត្រឹមត្រូវខ្ពស់
              </p>
              <div class="team-social mt-3">
                <a href="https://t.me/toemsamat" target="_blank" class="social-icon">
                  <i class="bi bi-telegram"></i>
                </a>
                <a
                  href="https://www.facebook.com/thisuserisnotavailable404?mibextid=ZbWKwL"
                  target="_blank"
                  class="social-icon"
                >
                  <i class="bi bi-facebook"></i>
                </a>
                <a
                  href="https://www.instagram.com/toemsamat?igsh=MTFuNTB5ZXdjZDdjYw=="
                  target="_blank"
                  class="social-icon"
                >
                  <i class="bi bi-instagram"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="thank-you" class="thank-you">
      <div class="container card-thank-you">
        <div class="row justify-content-center text-center mb-5" data-fade-up>
          <div class="col-lg-8">
            <div class="pill-tag fw-semibold">សេចក្តីថ្លែងអំណរគុណ</div>
            <h2 class="display-5 mb-3 fw-semibold">សេចក្តីថ្លែងអំណរគុណចំពោះ</h2>
            <p class="text-muted fs-5 text-des">
              <span style="color: #0d9488; font-weight: bold">
                ក្រសួងប្រៃសណីយ៍និងទូរគមនាគមន៍ មូលនិធិ ស.អ.
                និងថ្នាក់បណ្តុះបណ្តាលបច្ចេកវិទ្យាអាន ANT</span
              >
              ព្រមទាំងលោកគ្រូ
              <span style="color: #0d9488; font-weight: bold"
                >ជិន សុវណ្ណមិនា </span
              >។
              ក្រុមរបស់យើងមានអារម្មណ៍សោមនស្សរីករាយយ៉ាងខ្លាំងដែលទទួលបានអាហារូបករណ៍លើជំនាញការអភិវឌ្ឍន៍គេហទំព័រនេះ។
              អាហារូបករណ៍នេះពិតជាបានជួយសម្រាលបន្ទុកហិរញ្ញវត្ថុសម្រាប់ការសិក្សាដល់ក្រុមយើងខ្ញុំទាំងអស់គ្នា។
              ក្រោមការណែនាំពីលោកគ្រូអ្នកគ្រូ
              ក្រុមយើងខ្ញុំប្តេជ្ញាខិតខំប្រឹងប្រែងសិក្សាដើម្បីកសាងសមត្ថភាពឱ្យបានខ្លាំងពូកែ
              ដើម្បីអាចចូលរួមចំណែកជួយដល់សង្គមជាតិទៅថ្ងៃអនាគត។
            </p>
          </div>
        </div>

        <div class="row g-4">
          <div class="col-lg-4" data-fade-up>
            <div class="card h-50 card-image-wrapper border-0 shadow-sm">
              <img :src="logoMPCT" alt="Logo" class="card-img-fit" />
            </div>
          </div>

          <div class="col-lg-4" data-fade-up>
            <div class="card h-50 card-image-wrapper border-0 shadow-sm">
              <img :src="logoCBRD" alt="Logo" class="card-img-fit" />
            </div>
          </div>

          <div class="col-lg-4" data-fade-up>
            <div class="card h-50 card-image-wrapper border-0 shadow-sm">
              <img :src="logoAnt" alt="Logo" class="card-img-fit" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <Footer />
  </div>
</template>

<script setup>
import Footer from "@/components/landing/FooterLandingPage.vue";
import NavbarLandingPage from "@/components/landing/LandingPageNavebar.vue";
import socheata from "@/assets/images/team/socheata.jpg";
import votey from "@/assets/images/team/votey.png";
import liza from "@/assets/images/team/liza.JPG";
import samat from "@/assets/images/team/samat.png";
import vanny from "@/assets/images/team/vanny.JPG";
import sokkay from "@/assets/images/team/sokkay.JPEG";
import logoAnt from "@/assets/images/scholarship/ant_logo.png";
import logoCBRD from "@/assets/images/scholarship/cbrd_fund_logo.png";
import logoMPCT from "@/assets/images/scholarship/logo_mptc.png";
import book from "@/assets/images/book.png";
</script>

<style scoped>
.team-social {
  display: flex;
  justify-content: center;
  gap: 15px;
}

.social-icon {
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f4f6f9;
  border-radius: 50%;
  font-size: 18px;
  color: #0f766e; /* teal */
  transition: all 0.3s ease;
  text-decoration: none;
}

.social-icon:hover {
  background: #0f766e;
  color: #fff;
  transform: translateY(-4px);
  box-shadow: 0 8px 18px rgba(15, 118, 110, 0.3);
}

.text-des {
  text-align: justify;
  text-justify: inter-word;
  text-align-last: justify;
  line-height: 38px;
  margin-top: 5%;
}
template {
  font-family: "Inter", sans-serif;
  color: var(--text-dark);
  background-color: var(--bg-main);
  overflow-x: hidden;
  letter-spacing: -0.01em;
  scroll-behavior: smooth;
}

.why-section {
  padding: 120px 0;
  background: #ffffff;
}

.benefit-icon {
  width: 60px;
  height: 60px;
  background: #f0faf6;
  color: #0f766e;
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin-bottom: 25px;
}

.benefit-card {
  padding: 40px;
  border-radius: 32px;
  background: white;
  border: 1px solid rgba(19, 112, 127, 0.1);
  transition: var(--transition);
  height: 100%;
}

.benefit-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.08);
  border-color: var(--primary);
}

/* ===== HERO ===== */
.hero-decor {
  position: absolute;
  z-index: 0;
  pointer-events: none;
  opacity: 0.2;
}

/* Circle Shape */
.hero-circle {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.15);
  top: 10%;
  left: 15%;
  animation: float 8s ease-in-out infinite alternate;
}

/* Line Shape */
.hero-line {
  width: 200px;
  height: 4px;
  background: linear-gradient(90deg, #14b8a6, #0d9488);
  top: 40%;
  right: 10%;
  border-radius: 2px;
  animation: moveLine 6s ease-in-out infinite alternate;
}

/* Triangle Shape */
.hero-triangle {
  width: 60px;
  height: 60px;
  background: rgba(255, 255, 255, 0.1);
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
  bottom: 15%;
  left: 25%;
  animation: float 7s ease-in-out infinite alternate-reverse;
}

/* Pulse / Glowing Circle */
.hero-pulse {
  width: 100px;
  height: 100px;
  background: rgba(20, 184, 166, 0.25);
  border-radius: 50%;
  top: 60%;
  right: 30%;
  animation: pulse 5s ease-in-out infinite;
}

/* Animations */
@keyframes float {
  0% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-25px) rotate(15deg);
  }
  100% {
    transform: translateY(0) rotate(0deg);
  }
}

@keyframes moveLine {
  0% {
    transform: translateX(0) rotate(0deg);
  }
  50% {
    transform: translateX(-30px) rotate(10deg);
  }
  100% {
    transform: translateX(0) rotate(0deg);
  }
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
    opacity: 0.25;
  }
  50% {
    transform: scale(1.3);
    opacity: 0.5;
  }
}

.hero-section {
  padding: 180px 0 100px;
  background:
    radial-gradient(
      circle at 90% 10%,
      rgba(19, 112, 127, 0.1) 0%,
      transparent 40%
    ),
    radial-gradient(
      circle at 10% 90%,
      rgba(30, 159, 179, 0.05) 0%,
      transparent 40%
    );
}

.hero-title {
  font-size: 3.8rem;
  line-height: 1.5;
  margin-bottom: 30px;
  background: linear-gradient(180deg, var(--text-dark) 30%, #475569 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-img-container {
  position: relative;
  animation: float 6s ease-in-out infinite;
}

.hero-main-img {
  width: 100%;
  border-radius: 40px;
  box-shadow: 0 40px 80px -15px rgba(15, 23, 42, 0.15);
  transition: var(--transition);
}

.hero-main-img:hover {
  transform: scale(1.02);
}

.floating-badge {
  animation: floatBadge 4s ease-in-out infinite;
  z-index: 10;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-20px);
  }
}

@keyframes floatBadge {
  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-10px);
  }
}

.pill-tag {
  display: inline-flex;
  padding: 8px 20px;
  background: #9dffde89;
  color: #087954;
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
}

.nav-link-modern {
  color: var(--text-muted) !important;
  font-weight: 600;
  font-size: 0.95rem;
  padding: 10px 16px !important;
  border-radius: 14px;
  transition: var(--transition);
}

/* ===== HOW IT WORKS (With Background Color) ===== */
.how-section {
  padding: 120px 0;
  background-color: var(--bg-alt);
  position: relative;
  overflow: hidden;
  border-top: 1px solid #f1f5f9;
  border-bottom: 1px solid #f1f5f9;
}

.step-card {
  background: white;
  border: 1px solid transparent;
  border-radius: 32px;
  padding: 48px;
  position: relative;
  z-index: 1;
  transition: var(--transition);
  height: 100%;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
}

.step-card:hover {
  border-color: var(--primary);
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.04);
}

.step-badge {
  width: 54px;
  height: 54px;
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 1.25rem;
  margin-bottom: 30px;
  box-shadow: 0 10px 20px rgba(19, 112, 127, 0.2);
}

.step-visual {
  font-size: 3rem;
  margin-bottom: 20px;
  display: block;
}

.connector-line {
  position: absolute;
  top: 50px;
  left: 100%;
  width: 100%;
  height: 2px;
  background: repeating-linear-gradient(
    to right,
    var(--primary) 0,
    var(--primary) 10px,
    transparent 10px,
    transparent 20px
  );
  opacity: 0.15;
  z-index: 0;
  display: none;
}

@media (min-width: 992px) {
  .connector-line {
    display: block;
  }
}

/* ===== TEAM ===== */
.team-section {
  padding: 100px 0;
  background: #ffffff;
}

.team-card {
  background: white;
  border-radius: 30px;
  padding: 40px 25px;
  text-align: center;
  border: 1px solid #f1f5f9;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  height: 100%;
  box-shadow: 0px 10px 50px rgba(42, 42, 42, 0.02) !important;
}

.team-card:hover {
  border-color: var(--primary);
  box-shadow: 0px 25px 50px rgba(19, 112, 127, 0.12);
  transform: translateY(-10px);
}

.team-img-wrapper {
  position: relative;
  width: 120px;
  height: 120px;
  margin: 0 auto 25px;
}

.team-img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid white;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.team-role {
  display: inline-block;
  padding: 4px 14px;
  background: var(--primary-soft);
  color: var(--primary);
  border-radius: 100px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 15px;
}

/* thanksyou */

.thank-you {
  padding: 120px;
  position: relative;
  background: linear-gradient(120deg, #bddee8, #b7e9eacf, #f0bdd9);
  background-size: 400% 400%;
  animation: gradientMove 15s ease infinite;
  overflow: hidden;
}

@keyframes gradientMove {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}

.card-thank-you {
  padding: 20px 50px;
  background: #ffffff;
  border-radius: 50px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.card-image-wrapper {
  overflow: hidden;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 250px;
  padding: 10px;
}

.card-img-fit {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform 0.3s ease;
}

.card-img-fit:hover {
  transform: scale(1.05);
}
</style>
