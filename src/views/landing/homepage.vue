<template>
  <div>
    <!-- ═══════════════════ ក្បាលទំព័រ ═══════════════════ -->
    <Navbar />

    <main>
      <!-- ═══════════════════ ផ្នែកដំបូង ═══════════════════ -->
      <section class="hero">
        <div class="hero-bg"></div>
        <div class="hero-orb-right"></div>
        <div class="hero-orb-left"></div>

        <div class="hero-inner container">
          <div>
            <p class="hero-badge">
              <span class="hero-badge-dot"></span>
              សម្រាប់សាលារៀន និងសាកលវិទ្យាល័យ
            </p>
            <h1 class="hero-title reveal-on-load">
              គ្រប់គ្រងការប្រឡង ណែនាំសិស្ស
              <span class="highlight">តាមដានលទ្ធផល</span>
            </h1>
            <p class="hero-desc">
              បង្កើតបន្ទប់ប្រឡង តាមដានសិស្សជាពេលវេលាពិត
              និងពិនិត្យសមិទ្ធផលទាំងអស់ពីផតថលសាមញ្ញតែមួយ។
            </p>
            <div class="hero-cta">
              <a class="btn-hero-primary reveal-on-load" href="#auth"
                >ចាប់ផ្តើម</a
              >
              <a class="btn-hero-secondary reveal-on-load" href="features.html"
                >មើលមុខងារ</a
              >
            </div>
            <dl class="hero-stats">
              <div>
                <dt class="stat-value">50+</dt>
                <dd class="stat-label">សិស្សបានគ្រប់គ្រង</dd>
              </div>
              <div>
                <dt class="stat-value">10k+</dt>
                <dd class="stat-label">ការប្រឡងបានដំណើរការ</dd>
              </div>
              <div>
                <dt class="stat-value">24/7</dt>
                <dd class="stat-label">ចូលប្រើការវាយតម្លៃ</dd>
              </div>
            </dl>
          </div>

          <div class="hero-img-wrap">
            <div class="hero-img-glow"></div>
            <img
              src="@/assets/images/imageLanding.png"
              alt="គ្រូប្រើ Prolong ដើម្បីគ្រប់គ្រងការប្រឡងអនឡាញ"
              loading="lazy"
              decoding="async"
              class="hero-img"
            />
          </div>
        </div>
      </section>

      <!-- ═══════════════════ មុខងារ ═══════════════════ -->
      <section id="features">
        <div class="container">
          <div class="text-center max-w-2xl">
            <p class="section-label">ប្រព័ន្ធស្នូល</p>
            <h2 class="section-title">គ្រប់យ៉ាង មុន ពេល និងក្រោយការប្រឡង</h2>
            <p class="section-desc">
              ឧបករណ៍សំខាន់បីដែលគ្របដណ្តប់វដ្តការប្រឡងទាំងមូលសម្រាប់ស្ថាប័នរបស់អ្នក។
            </p>
          </div>

          <div class="features-grid">
            <!-- Card 01 - Green -->
            <article class="feature-card">
              <div class="card-header">
                <div class="card-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <rect x="3" y="3" width="7" height="7" rx="1" />
                    <rect x="14" y="3" width="7" height="7" rx="1" />
                    <rect x="3" y="14" width="7" height="7" rx="1" />
                    <rect x="14" y="14" width="7" height="7" rx="1" />
                  </svg>
                </div>
              </div>
              <div class="card-body">
                <span class="card-tag">01</span>
                <h3 class="card-title">រៀបចំបន្ទប់បានរហ័ស</h3>
                <p class="card-text">
                  បង្កើតបន្ទប់ ភ្ជាប់សំណួរ កំណត់ពេល
                  និងចែករំលែកកូដចូលប្រើក្នុងរយៈពេលប៉ុន្មាននាទី។
                </p>
              </div>
              <div class="card-footer">
                <span class="dot"></span>
                រួចរាល់ក្នុងប៉ុន្មានវិនាទី
              </div>
            </article>

            <!-- Card 02 - Blue -->
            <article class="feature-card feature-card--blue">
              <div class="card-header card-header--blue">
                <div class="card-icon card-icon--blue">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
              </div>
              <div class="card-body">
                <span class="card-tag card-tag--blue">02</span>
                <h3 class="card-title">ដំណើរការសិស្សមានសុវត្ថិភាព</h3>
                <p class="card-text">
                  សិស្សចូលបន្ទប់ដែលបានកំណត់
                  ហើយបញ្ចប់ការវាយតម្លៃដោយមិនចាំបាច់ប្រើឧបករណ៍ច្រើន។
                </p>
              </div>
              <div class="card-footer">
                <span class="dot dot--blue"></span>
                ចូលប្រើដោយរលូន
              </div>
            </article>

            <!-- Card 03 - Purple -->
            <article class="feature-card feature-card--purple">
              <div class="card-header card-header--purple">
                <div class="card-icon card-icon--purple">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                    <path
                      d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"
                    />
                  </svg>
                </div>
              </div>
              <div class="card-body">
                <span class="card-tag card-tag--purple">03</span>
                <h3 class="card-title">ការត្រួតពិនិត្យរបស់អ្នកគ្រប់គ្រង</h3>
                <p class="card-text">
                  គ្រប់គ្រងអ្នកប្រើ សិទ្ធិ និងសកម្មភាពលើវេទិកាពីតំបន់បញ្ជាតែមួយ។
                </p>
              </div>
              <div class="card-footer">
                <span class="dot dot--purple"></span>
                ផ្ទាំងបញ្ជាពេញលេញ
              </div>
            </article>
          </div>
        </div>
      </section>

      <!-- ═══════════════════ តួនាទី ═══════════════════ -->
      <section id="roles">
        <div class="container">
          <div class="roles-grid">
            <div>
              <p class="section-label">ផ្អែកលើតួនាទី</p>
              <h2 class="section-title">ផ្ទាំងគ្រប់គ្រងសម្រាប់គ្រប់តួនាទី</h2>
              <p class="section-desc">
                សិស្ស គ្រូ
                និងអ្នកគ្រប់គ្រងម្នាក់ៗទទួលបានកន្លែងធ្វើការដែលផ្តោតច្បាស់
                មិនរញ៉េរញ៉ៃ និងមិនច្របូកច្របល់។
              </p>
            </div>

            <div class="role-cards">
              <!-- Student -->
              <article class="role-card role-card--green">
                <span class="role-icon role-icon--green">សិ</span>
                <div>
                  <h3 class="role-name role-name--green">សិស្ស</h3>
                  <p class="role-desc role-desc--green">
                    ចូលបន្ទប់ ធ្វើតេស្ត និងមើលលទ្ធផលភ្លាមៗ។
                  </p>
                </div>
              </article>
              <!-- Teacher -->
              <article class="role-card role-card--blue">
                <span class="role-icon role-icon--blue">គ</span>
                <div>
                  <h3 class="role-name role-name--blue">គ្រូ</h3>
                  <p class="role-desc role-desc--blue">
                    បង្កើតការប្រឡង តាមដានវឌ្ឍនភាព
                    និងពិនិត្យពិន្ទុជាមួយមតិកែលម្អ។
                  </p>
                </div>
              </article>
              <!-- Admin -->
              <article class="role-card role-card--purple">
                <span class="role-icon role-icon--purple">អ</span>
                <div>
                  <h3 class="role-name role-name--purple">អ្នកគ្រប់គ្រង</h3>
                  <p class="role-desc role-desc--purple">
                    គ្រប់គ្រងគណនី គោលការណ៍សុវត្ថិភាព និងការវិភាគទូទាំងស្ថាប័ន។
                  </p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <!-- ═══════════════════ អត្ថប្រយោជន៍ ═══════════════════ -->
      <section id="benefits">
        <div class="container">
          <div class="text-center max-w-2xl">
            <p class="section-label">ហេតុអ្វីជ្រើស Prolong</p>
            <h2 class="section-title">បង្កើតឡើងសម្រាប់ សាលារៀនសម័យថ្មី</h2>
          </div>

          <div class="benefits-grid">
            <div class="b-card b-card--green">
              <div class="b-icon b-icon--green">
                <i class="fas fa-bolt" aria-hidden="true"></i>
              </div>
              <h3 class="b-title b-title--green">លឿនដូចផ្លេកបន្ទោរ</h3>
              <p class="b-text b-text--green">
                ដាក់ដំណើរការការប្រឡងក្នុងប៉ុន្មាននាទី មិនមែនរាប់ម៉ោង។
              </p>
            </div>

            <div class="b-card b-card--blue">
              <div class="b-icon b-icon--blue">
                <i class="fas fa-lock" aria-hidden="true"></i>
              </div>
              <h3 class="b-title b-title--blue">រចនាឡើងដោយគិតពីសុវត្ថិភាព</h3>
              <p class="b-text b-text--blue">
                ការអ៊ិនគ្រីបទិន្នន័យសិស្សកម្រិតសហគ្រាស។
              </p>
            </div>

            <div class="b-card b-card--purple">
              <div class="b-icon b-icon--purple">
                <i class="fas fa-chart-line" aria-hidden="true"></i>
              </div>
              <h3 class="b-title b-title--purple">ការវិភាគផ្ទាល់</h3>
              <p class="b-text b-text--purple">
                តាមដានវឌ្ឍនភាព និងការយល់ដឹងជាពេលវេលាពិត។
              </p>
            </div>

            <div class="b-card b-card--amber">
              <div class="b-icon b-icon--amber">
                <i class="fas fa-graduation-cap" aria-hidden="true"></i>
              </div>
              <h3 class="b-title b-title--amber">ងាយស្រួលសម្រាប់សិស្ស</h3>
              <p class="b-text b-text--amber">
                ផ្ទៃប្រើប្រាស់ច្បាស់លាស់ ដំណើរការលើឧបករណ៍គ្រប់ប្រភេទ។
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- ═══════════════════ ជំហាន ═══════════════════ -->
      <section id="steps">
        <div class="container">
          <div class="text-center max-w-2xl">
            <p class="section-label">របៀបដំណើរការ</p>
            <h2 class="section-title">ចាប់ផ្តើមក្នុងបីជំហានសាមញ្ញ</h2>
          </div>
          <div class="steps-grid" id="stepsGrid">
            <div class="step">
              <div class="step-num step-num--green">1</div>
              <h3 class="step-title">បង្កើតការប្រឡងរបស់អ្នក</h3>
              <p class="step-text">
                រៀបចំបន្ទប់ បន្ថែមសំណួរ និងកំណត់ពេលវេលាក្នុងការចុចតិចតួច។
              </p>
            </div>
            <div class="step">
              <div class="step-num step-num--blue">2</div>
              <h3 class="step-title">អញ្ជើញសិស្ស</h3>
              <p class="step-text">
                ចែករំលែកកូដ ឬតំណ សិស្សអាចចូលពីកម្មវិធីរុករកណាមួយ
                លើឧបករណ៍ណាក៏បាន។
              </p>
            </div>
            <div class="step">
              <div class="step-num step-num--purple">3</div>
              <h3 class="step-title">ពិនិត្យលទ្ធផល</h3>
              <p class="step-text">
                ទទួលបានពិន្ទុភ្លាមៗ ការវិភាគ និងរបាយការណ៍ដែលអាចនាំចេញបាន។
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- ═══════════════════ ការអំពាវនាវ ═══════════════════ -->
      <section id="auth">
        <div class="cta-box">
          <div class="cta-glow"></div>
          <div class="cta-orb-left"></div>
          <div class="cta-orb-right"></div>

          <div class="cta-inner">
            <div class="cta-max">
              <p class="cta-label">ចាប់ផ្តើមថ្ងៃនេះ</p>
              <h2 class="cta-title">
                បើកផតថលប្រឡងរបស់អ្នក ហើយគ្រប់គ្រងការវាយតម្លៃដោយទំនុកចិត្ត។
              </h2>
              <p class="cta-text">
                ចូលរួមជាមួយសាលារៀនដែលកំពុងប្រើ Prolong
                ដើម្បីដំណើរការការប្រឡងអនឡាញប្រកបដោយសុវត្ថិភាព និងរៀបចំបានល្អ។
              </p>
            </div>
            <a class="btn-cta" href="#">ចាប់ផ្តើមឥឡូវនេះ</a>
          </div>
        </div>
      </section>
    </main>

    <!-- ═══════════════════ បាតទំព័រ ═══════════════════ -->
    <footer>
      <div class="footer-orb-tl"></div>
      <div class="footer-orb-br"></div>

      <div class="footer-inner">
        <div class="footer-grid">
          <!-- Brand column -->
          <div>
            <a href="index.html" class="footer-logo">
              <span class="footer-logo-icon">E</span>
              Prolong
            </a>
            <p class="footer-desc">
              បន្ទប់ប្រឡង ការត្រួតពិនិត្យផ្ទាល់ និងលទ្ធផលស្វ័យប្រវត្តិ
              ជាប្រព័ន្ធតែមួយសម្រាប់ស្ថាប័នអប់រំសម័យថ្មី។
            </p>
            <div class="social-links">
              <a href="#" aria-label="Facebook" class="social-btn"
                ><i class="fab fa-facebook-f"></i
              ></a>
              <a href="#" aria-label="LinkedIn" class="social-btn"
                ><i class="fab fa-linkedin-in"></i
              ></a>
              <a href="#" aria-label="X / Twitter" class="social-btn"
                ><i class="fab fa-x-twitter"></i
              ></a>
              <a href="#" aria-label="Instagram" class="social-btn"
                ><i class="fab fa-instagram"></i
              ></a>
            </div>
          </div>

          <!-- Product links -->
          <div>
            <h4 class="footer-col-title">ផលិតផល</h4>
            <ul class="footer-links">
              <li><a href="features.html">មុខងារ</a></li>
              <li><a href="#auth">តម្លៃ</a></li>
              <li><a href="#">សំណួរញឹកញាប់</a></li>
              <li><a href="#">កំណែចេញផ្សាយ</a></li>
            </ul>
          </div>

          <!-- Company links -->
          <div>
            <h4 class="footer-col-title">ក្រុមហ៊ុន</h4>
            <ul class="footer-links">
              <li><a href="about.html">អំពីយើង</a></li>
              <li><a href="#">ការងារ</a></li>
              <li><a href="#">ប្លុក</a></li>
              <li><a href="#">ទំនាក់ទំនង</a></li>
            </ul>
          </div>

          <!-- Newsletter -->
          <div>
            <h4 class="footer-col-title">ទទួលព័ត៌មានថ្មីៗ</h4>
            <p class="newsletter-desc">
              ទទួលព័ត៌មានកែលម្អផលិតផល
              និងសេចក្តីប្រកាសអំពីកំណែថ្មីៗនៅក្នុងប្រអប់សាររបស់អ្នក។
            </p>
            <div class="newsletter-form">
              <input
                type="email"
                placeholder="អ៊ីមែលរបស់អ្នក"
                class="newsletter-input"
              />
              <button
                type="button"
                class="newsletter-btn"
                aria-label="ជាវព័ត៌មាន"
              >
                <i class="fas fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>

        <!-- Bottom bar -->
        <div class="footer-bottom">
          <span>&copy; 2026 Prolong Inc. រក្សាសិទ្ធិគ្រប់យ៉ាង។</span>
          <nav class="footer-legal" aria-label="តំណច្បាប់">
            <a href="#">គោលការណ៍ឯកជនភាព</a>
            <a href="#">លក្ខខណ្ឌប្រើប្រាស់</a>
            <a href="#">សុវត្ថិភាព</a>
          </nav>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
  import Navbar from "@/components/layout/navbar/landing/LandingPageNavebar.vue";
</script>

<style scoped>
/* ─── CSS Variables ─── */
:root {
  --brand-50: #f4faf6;
  --section-bg: #f4faf6;
  --brand-100: #e8f5ec;
  --brand-500: #43a557;
  --brand-600: #3a9349;
  --brand-700: #2d7a3e;
  --brand-dark: #102117;

  --forest: #0e2318;
  --sage: #2e6b46;
  --leaf: #52a96e;
  --mint: #7dcb95;
  --foam: #c3ecd1;
  --mist: #e8f7ed;

  --green-border: #b8e8c4;
  --green-bg: #d4f0dc;
  --blue-border: #adc8f5;
  --blue-bg: #d6e4f9;
  --blue-accent: #5b82ed;
  --purple-border: #c4aef5;
  --purple-bg: #e5dcf9;
  --purple-accent: #8b6ee8;
  --yellow-border: #f5cc6e;
  --yellow-bg: #fde8a0;
  --yellow-accent: #e6a817;

  --text-muted: #536173;
  --radius-xl: 0.75rem;
  --radius-2xl: 1rem;
  --radius-3xl: 1.5rem;
}

a {
  text-decoration: none;
  color: inherit;
}
ul {
  list-style: none;
}
img {
  display: block;
  max-width: 100%;
}

/* ─── Layout Helpers ─── */
.container {
  width: 100%;
  max-width: 72rem; /* 1152px ≈ max-w-6xl */
  margin-inline: auto;
  padding-inline: 1rem;
}
@media (min-width: 640px) {
  .container {
    padding-inline: 1.5rem;
  }
}

/* ─── Hero ─── */
.hero {
  position: relative;
  overflow: hidden;
  border-bottom: 1px solid rgba(65, 150, 79, 0.1);
}
.hero-bg {
  pointer-events: none;
  position: absolute;
  inset: 0;
  background: var(--section-bg);
}
.hero-orb-right {
  pointer-events: none;
  position: absolute;
  right: -6rem;
  top: 0;
  height: 24rem;
  width: 24rem;
  border-radius: 9999px;
  background: rgba(116, 200, 120, 0.2);
  filter: blur(3rem);
}
.hero-orb-left {
  pointer-events: none;
  position: absolute;
  left: -4rem;
  bottom: 0;
  height: 18rem;
  width: 18rem;
  border-radius: 9999px;
  background: rgba(91, 130, 237, 0.1);
  filter: blur(3rem);
}

.hero-inner {
  position: relative;
  max-width: 72rem;
  margin-inline: auto;
  padding: 4rem 1rem;
  display: grid;
  gap: 3rem;
  align-items: center;
}
@media (min-width: 640px) {
  .hero-inner {
    padding-inline: 1.5rem;
  }
}
@media (min-width: 1024px) {
  .hero-inner {
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    padding-block: 7rem;
  }
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  border-radius: 9999px;
  border: 1px solid rgba(67, 165, 87, 0.2);
  background: rgba(255, 255, 255, 0.8);
  padding: 0.375rem 1rem;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--brand-700);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
}
.hero-badge-dot {
  height: 0.375rem;
  width: 0.375rem;
  border-radius: 9999px;
  background: var(--brand-500);
}

.hero-title {
  margin-top: 1.5rem;
  font-size: 2rem;
  font-weight: 900;
  line-height: 1.18;
  letter-spacing: 0;
  color: var(--brand-dark);
  opacity: 0;
  transform: translateY(0.75rem);
  transition:
    opacity 0.7s,
    transform 0.7s;
}
@media (min-width: 640px) {
  .hero-title {
    font-size: 2.4rem;
  }
}
@media (min-width: 1024px) {
  .hero-title {
    font-size: 3rem;
  }
}
.hero-title.visible {
  opacity: 1;
  transform: translateY(0);
}
.hero-title .highlight {
  color: var(--brand-500);
}

.hero-desc {
  margin-top: 1.25rem;
  max-width: 32rem;
  font-size: 1.125rem;
  line-height: 1.7;
  color: #46575f;
}

.hero-cta {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
@media (min-width: 640px) {
  .hero-cta {
    flex-direction: row;
    align-items: center;
  }
}

.btn-hero-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  padding-inline: 1.75rem;
  border-radius: var(--radius-xl);
  background: var(--brand-500);
  font-weight: 700;
  color: #fff;
  box-shadow: 0 6px 20px rgba(67, 165, 87, 0.3);
  opacity: 0;
  transform: translateY(0.75rem);
  transition:
    opacity 0.7s 0.15s,
    transform 0.7s 0.15s,
    background 0.2s;
}
.btn-hero-primary.visible {
  opacity: 1;
  transform: translateY(0);
}
.btn-hero-primary:hover {
  background: var(--brand-600);
}

.btn-hero-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  padding-inline: 1.75rem;
  border-radius: var(--radius-xl);
  border: 1px solid rgba(65, 150, 79, 0.2);
  background: #fff;
  font-weight: 700;
  color: var(--brand-dark);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
  opacity: 0;
  transform: translateY(0.75rem);
  transition:
    opacity 0.7s 0.3s,
    transform 0.7s 0.3s,
    border-color 0.2s,
    color 0.2s;
}
.btn-hero-secondary.visible {
  opacity: 1;
  transform: translateY(0);
}
.btn-hero-secondary:hover {
  border-color: var(--brand-500);
  color: var(--brand-500);
}

.hero-stats {
  margin-top: 3.5rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  border-top: 1px solid rgba(65, 150, 79, 0.1);
  padding-top: 2rem;
}
.stat-value {
  font-size: 1.5rem;
  font-weight: 900;
  color: var(--brand-dark);
}
.stat-label {
  margin-top: 0.25rem;
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--text-muted);
}
@media (min-width: 640px) {
  .stat-label {
    font-size: 0.875rem;
  }
}

.hero-img-wrap {
  position: relative;
  margin-inline: auto;
  width: 100%;
  max-width: 320px;
  aspect-ratio: 4/5;
}
@media (min-width: 640px) {
  .hero-img-wrap {
    max-width: 360px;
  }
}
@media (min-width: 1024px) {
  .hero-img-wrap {
    max-width: none;
    aspect-ratio: auto;
    height: 480px;
  }
}
.hero-img-glow {
  position: absolute;
  inset: 1rem;
  border-radius: 2rem;
  background: linear-gradient(
    135deg,
    rgba(116, 200, 120, 0.3),
    rgba(91, 130, 237, 0.2)
  );
  filter: blur(2rem);
}
.hero-img {
  position: relative;
  z-index: 1;
  height: 100%;
  width: 100%;
  border-radius: 1.75rem;
  object-fit: cover;
  box-shadow: 0 24px 60px rgba(67, 165, 87, 0.15);
  outline: 1px solid rgba(255, 255, 255, 0.8);
}
@media (min-width: 1024px) {
  .hero-img {
    margin-left: -2rem;
  }
}

/* ─── Section common ─── */
section {
  width: 100%;
}
main > section {
  background: var(--section-bg);
}
.section-label {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #43a557;
}
.section-title {
  margin-top: 0.75rem;
  font-size: clamp(1.75rem, 4vw, 2.25rem);
  font-weight: 900;
  letter-spacing: -0.02em;
  color: var(--brand-dark);
}
.section-desc {
  margin-top: 1rem;
  color: var(--text-muted);
}
.text-center {
  text-align: center;
}
.max-w-2xl {
  max-width: 42rem;
  margin-inline: auto;
}

/* ─── Features Section ─── */
#features {
  padding-block: 5rem;
}
@media (min-width: 768px) {
  #features {
    padding-block: 6rem;
  }
}

.features-grid {
  margin-top: 3rem;
  display: grid;
  gap: 1.25rem;
}
@media (min-width: 768px) {
  .features-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.feature-card {
  overflow: hidden;
  border-radius: var(--radius-2xl);
  background: #fff;
  border: 1px solid var(--green-border);
  transition:
    transform 0.25s,
    box-shadow 0.25s;
}
.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 30px rgba(67, 165, 87, 0.1);
}
.feature-card--blue {
  border-color: var(--blue-border);
}
.feature-card--blue:hover {
  box-shadow: 0 12px 30px rgba(91, 130, 237, 0.1);
}
.feature-card--purple {
  border-color: var(--purple-border);
}
.feature-card--purple:hover {
  box-shadow: 0 12px 30px rgba(139, 110, 232, 0.1);
}

.card-header {
  position: relative;
  height: 6rem;
  background: var(--green-bg);
}
.card-header--blue {
  background: var(--blue-bg);
}
.card-header--purple {
  background: var(--purple-bg);
}

.card-icon {
  position: absolute;
  bottom: -1.25rem;
  left: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3rem;
  width: 3rem;
  border-radius: 14px;
  background: #43a557;
  color: #fff;
}
.card-icon--blue {
  background: var(--blue-accent);
}
.card-icon--purple {
  background: var(--purple-accent);
}
.card-icon svg {
  height: 1.5rem;
  width: 1.5rem;
}

.card-body {
  padding: 2.25rem 1.25rem 1rem;
}

.card-tag {
  display: inline-block;
  border-radius: 9999px;
  background: #e8f7eb;
  padding: 0.125rem 0.75rem;
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: #2d7a3c;
}
.card-tag--blue {
  background: #eff5ff;
  color: #3d5fbf;
}
.card-tag--purple {
  background: #f0ebff;
  color: #6344c2;
}

.card-title {
  margin-top: 0.5rem;
  font-size: 1rem;
  font-weight: 700;
  color: var(--brand-dark);
}
.card-text {
  margin-top: 0.5rem;
  font-size: 0.875rem;
  line-height: 1.6;
  color: var(--text-muted);
}
.card-footer {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0 1.25rem 1rem;
  font-size: 0.75rem;
  color: var(--text-muted);
}
.dot {
  height: 0.375rem;
  width: 0.375rem;
  border-radius: 9999px;
  background: #43a557;
  flex-shrink: 0;
}
.dot--blue {
  background: var(--blue-accent);
}
.dot--purple {
  background: var(--purple-accent);
}

/* ─── Roles Section ─── */
#roles {
  background: var(--section-bg);
  padding-block: 5rem;
}
@media (min-width: 768px) {
  #roles {
    padding-block: 6rem;
  }
}

.roles-grid {
  display: grid;
  gap: 3rem;
  align-items: start;
}
@media (min-width: 1024px) {
  .roles-grid {
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
  }
}

.role-cards {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.role-card {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  border-radius: 1.125rem;
  border: 1px solid transparent;
  padding: 1.25rem 1.5rem;
  cursor: default;
  transition:
    transform 0.3s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.3s,
    border-color 0.3s;
}
.role-card:hover {
  transform: translateX(6px);
}
.role-card--green {
  border-color: var(--green-border);
  background: var(--brand-100);
}
.role-card--green:hover {
  box-shadow: 0 8px 28px rgba(67, 165, 87, 0.18);
}
.role-card--blue {
  border-color: rgba(91, 130, 237, 0.2);
  background: #eef4ff;
}
.role-card--blue:hover {
  box-shadow: 0 8px 28px rgba(91, 130, 237, 0.18);
}
.role-card--purple {
  border-color: rgba(139, 110, 232, 0.2);
  background: #f4f0ff;
}
.role-card--purple:hover {
  box-shadow: 0 8px 28px rgba(139, 110, 232, 0.18);
}

.role-icon {
  display: grid;
  place-items: center;
  height: 2.875rem;
  width: 2.875rem;
  flex-shrink: 0;
  border-radius: 0.5rem;
  font-size: 0.8125rem;
  font-weight: 900;
  color: #fff;
}
.role-icon--green {
  background: #43a557;
}
.role-icon--blue {
  background: var(--blue-accent);
}
.role-icon--purple {
  background: var(--purple-accent);
}

.role-name {
  font-size: 0.9375rem;
  font-weight: 700;
}
.role-name--green {
  color: #1a4d27;
}
.role-name--blue {
  color: #1a2f6b;
}
.role-name--purple {
  color: #3b1a7a;
}
.role-desc {
  margin-top: 0.25rem;
  font-size: 0.875rem;
  line-height: 1.55;
}
.role-desc--green {
  color: #2d6b3a;
}
.role-desc--blue {
  color: #2d4a9e;
}
.role-desc--purple {
  color: #5a3aaa;
}

/* ─── Benefits Section ─── */
#benefits {
  padding-block: 6rem;
  background: var(--section-bg);
}

.benefits-grid {
  margin-top: 3.5rem;
  display: grid;
  gap: 1.25rem;
}
@media (min-width: 640px) {
  .benefits-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (min-width: 1024px) {
  .benefits-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.b-card {
  padding: 1.75rem 1.5rem;
  border-radius: var(--radius-2xl);
  text-align: center;
  border: 1px solid transparent;
  cursor: default;
  transition:
    transform 0.3s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.3s;
}
.b-card:hover {
  transform: translateY(-6px);
}
.b-card--green {
  border-color: var(--green-border);
  background: var(--brand-100);
}
.b-card--green:hover {
  box-shadow: 0 12px 32px rgba(67, 165, 87, 0.18);
}
.b-card--blue {
  border-color: rgba(91, 130, 237, 0.18);
  background: #eff5ff;
}
.b-card--blue:hover {
  box-shadow: 0 12px 32px rgba(91, 130, 237, 0.15);
}
.b-card--purple {
  border-color: rgba(139, 110, 232, 0.18);
  background: #f4f0ff;
}
.b-card--purple:hover {
  box-shadow: 0 12px 32px rgba(139, 110, 232, 0.15);
}
.b-card--amber {
  border-color: rgba(230, 168, 23, 0.22);
  background: #fff8ed;
}
.b-card--amber:hover {
  box-shadow: 0 12px 32px rgba(230, 168, 23, 0.15);
}

.b-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2.75rem;
  width: 2.75rem;
  border-radius: 0.75rem;
  margin: 0 auto 1.125rem;
  font-size: 1.125rem;
  color: #fff;
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.b-card:hover .b-icon {
  transform: scale(1.15) rotate(-6deg);
}
.b-icon--green {
  background: var(--brand-500);
}
.b-icon--blue {
  background: var(--blue-accent);
}
.b-icon--purple {
  background: var(--purple-accent);
}
.b-icon--amber {
  background: var(--yellow-accent);
}

.b-title {
  font-size: 0.9375rem;
  font-weight: 700;
}
.b-title--green {
  color: #1a4d27;
}
.b-title--blue {
  color: #1a2f6b;
}
.b-title--purple {
  color: #3b1a7a;
}
.b-title--amber {
  color: #5a3d00;
}
.b-text {
  margin-top: 0.5rem;
  font-size: 0.8125rem;
  line-height: 1.6;
}
.b-text--green {
  color: #2d6b3a;
}
.b-text--blue {
  color: #2d4a9e;
}
.b-text--purple {
  color: #5a3aaa;
}
.b-text--amber {
  color: #7a5500;
}

/* ─── Steps Section ─── */
#steps {
  background: var(--section-bg);
  padding-block: 6rem;
}

.steps-grid {
  position: relative;
  margin-top: 4rem;
  display: grid;
  gap: 2.5rem;
}
@media (min-width: 768px) {
  .steps-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.steps-grid::before,
.steps-grid::after {
  content: "";
  display: none;
  position: absolute;
  top: 1.75rem;
  left: calc(16.66% + 1.75rem);
  right: calc(16.66% + 1.75rem);
  height: 2px;
  border-radius: 1px;
}
.steps-grid::before {
  z-index: 0;
  background: var(--green-border);
}
.steps-grid::after {
  z-index: 1;
  width: 0;
  background: var(--brand-500);
  transition: width 1.4s cubic-bezier(0.22, 1, 0.36, 1);
}
@media (min-width: 768px) {
  .steps-grid::before,
  .steps-grid::after {
    display: block;
  }
}
.steps-grid.line-drawn::after {
  width: calc(66.66% - 3.5rem);
}

.step {
  position: relative;
  z-index: 2;
  text-align: center;
}

.step-num {
  display: grid;
  place-items: center;
  height: 3.5rem;
  width: 3.5rem;
  border-radius: 50%;
  font-size: 1.25rem;
  font-weight: 900;
  color: #fff;
  position: relative;
  margin: 0 auto 1.25rem;
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.step:hover .step-num {
  transform: scale(1.12);
}
.step-num--green {
  background: var(--brand-500);
  box-shadow: 0 6px 20px rgba(67, 165, 87, 0.35);
}
.step-num--blue {
  background: var(--blue-accent);
  box-shadow: 0 6px 20px rgba(91, 130, 237, 0.35);
}
.step-num--purple {
  background: var(--purple-accent);
  box-shadow: 0 6px 20px rgba(139, 110, 232, 0.35);
}

.step-num::after {
  content: "";
  position: absolute;
  inset: -5px;
  border-radius: 50%;
  border: 2px solid currentColor;
  opacity: 0;
  transition:
    opacity 0.3s,
    transform 0.3s;
}
.step-num--green::after {
  color: #8dd4a0;
}
.step-num--blue::after {
  color: var(--blue-accent);
}
.step-num--purple::after {
  color: var(--purple-accent);
}
.step:hover .step-num::after {
  opacity: 0.4;
  transform: scale(1.08);
}

.step-title {
  font-size: 1rem;
  font-weight: 700;
  color: var(--brand-dark);
}
.step-text {
  margin-top: 0.5rem;
  font-size: 0.875rem;
  line-height: 1.65;
  color: var(--text-muted);
}

/* ─── CTA Section ─── */
#auth {
  padding-inline: 1rem;
  padding-bottom: 5rem;
}
@media (min-width: 640px) {
  #auth {
    padding-inline: 1.5rem;
  }
}
@media (min-width: 768px) {
  #auth {
    padding-bottom: 6rem;
  }
}

.cta-box {
  position: relative;
  margin-top: 5rem;
  max-width: 72rem;
  margin-inline: auto;
  overflow: hidden;
  border-radius: 1.5rem;
  border: 1px solid rgba(157, 217, 170, 0.5);
  background: linear-gradient(135deg, #b9efc4 0%, #d8f8df 50%, #cfe4ff 100%);
  padding: 4rem 2rem;
  text-align: center;
  box-shadow: 0 24px 60px rgba(67, 165, 87, 0.15);
}
@media (min-width: 768px) {
  .cta-box {
    padding: 3.5rem;
    text-align: left;
  }
}

.cta-glow {
  pointer-events: none;
  position: absolute;
  inset: 0;
  background:
    radial-gradient(
      circle at top left,
      rgba(67, 165, 87, 0.3),
      transparent 35%
    ),
    radial-gradient(
      circle at bottom right,
      rgba(91, 130, 237, 0.18),
      transparent 35%
    );
}
.cta-orb-left {
  pointer-events: none;
  position: absolute;
  left: -4rem;
  top: 0;
  height: 20rem;
  width: 20rem;
  border-radius: 9999px;
  background: rgba(67, 165, 87, 0.25);
  filter: blur(3rem);
}
.cta-orb-right {
  pointer-events: none;
  position: absolute;
  right: -2.5rem;
  bottom: 0;
  height: 18rem;
  width: 18rem;
  border-radius: 9999px;
  background: rgba(91, 130, 237, 0.15);
  filter: blur(3rem);
}

.cta-inner {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}
@media (min-width: 768px) {
  .cta-inner {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
}

.cta-label {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #2f8c42;
}
.cta-title {
  margin-top: 0.75rem;
  font-size: clamp(1.25rem, 3vw, 1.75rem);
  font-weight: 900;
  line-height: 1.3;
  color: #163522;
}
.cta-text {
  margin-top: 0.75rem;
  font-size: 0.875rem;
  color: #4c5f57;
}
.cta-max {
  max-width: 36rem;
}

.btn-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 50px;
  flex-shrink: 0;
  padding-inline: 2rem;
  border-radius: var(--radius-xl);
  background: linear-gradient(to right, #43a557, #5fc972);
  font-weight: 700;
  color: #fff;
  box-shadow: 0 6px 20px rgba(67, 165, 87, 0.25);
  transition: transform 0.2s;
}
.btn-cta:hover {
  transform: translateY(-4px);
}

/* ─── Footer ─── */
footer {
  position: relative;
  overflow: hidden;
  background: var(--forest);
  color: rgba(255, 255, 255, 0.5);
  padding-top: 5rem;
  padding-bottom: 2.5rem;
  padding-inline: 1.5rem;
}
.footer-orb-tl {
  pointer-events: none;
  position: absolute;
  top: -13rem;
  left: -13rem;
  width: 500px;
  height: 500px;
  border-radius: 9999px;
  background: rgba(82, 169, 110, 0.05);
  filter: blur(100px);
}
.footer-orb-br {
  pointer-events: none;
  position: absolute;
  bottom: 0;
  right: 0;
  width: 350px;
  height: 350px;
  border-radius: 9999px;
  background: rgba(46, 107, 70, 0.1);
  filter: blur(80px);
}

.footer-inner {
  position: relative;
  max-width: 72rem;
  margin-inline: auto;
}

.footer-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  padding-bottom: 3rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}
@media (min-width: 640px) {
  .footer-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (min-width: 1024px) {
  .footer-grid {
    grid-template-columns: 2fr 1fr 1fr 2fr;
  }
}

.footer-logo {
  display: inline-flex;
  align-items: center;
  gap: 0.625rem;
  color: #fff;
  font-weight: 800;
  font-size: 1rem;
}
.footer-logo-icon {
  display: grid;
  place-items: center;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 9px;
  background: linear-gradient(135deg, var(--leaf), var(--sage));
  font-size: 0.875rem;
  font-weight: 900;
  color: #fff;
}
.footer-desc {
  margin-top: 1rem;
  font-size: 0.875rem;
  line-height: 1.7;
  max-width: 260px;
}

.social-links {
  display: flex;
  gap: 0.5rem;
  margin-top: 1.25rem;
}
.social-btn {
  display: grid;
  place-items: center;
  width: 2rem;
  height: 2rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: rgba(255, 255, 255, 0.5);
  transition:
    background 0.2s,
    color 0.2s,
    border-color 0.2s;
}
.social-btn:hover {
  background: rgba(82, 169, 110, 0.2);
  color: var(--mint);
  border-color: rgba(82, 169, 110, 0.3);
}

.footer-col-title {
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--mint);
  margin-bottom: 1rem;
}
.footer-links {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  font-size: 0.875rem;
}
.footer-links a {
  transition:
    color 0.2s,
    transform 0.2s;
  display: inline-block;
}
.footer-links a:hover {
  color: var(--mint);
  transform: translateX(4px);
}

.newsletter-desc {
  font-size: 0.75rem;
  line-height: 1.6;
  margin-bottom: 1rem;
  color: rgba(255, 255, 255, 0.4);
}
.newsletter-form {
  display: flex;
  gap: 0.375rem;
}
.newsletter-input {
  flex: 1;
  min-width: 0;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: var(--radius-xl);
  padding: 0.625rem 0.875rem;
  font-size: 0.75rem;
  color: #fff;
  font-family: inherit;
  outline: none;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;
}
.newsletter-input::placeholder {
  color: rgba(255, 255, 255, 0.3);
}
.newsletter-input:focus {
  border-color: rgba(82, 169, 110, 0.5);
  box-shadow: 0 0 0 3px rgba(82, 169, 110, 0.1);
}
.newsletter-btn {
  display: grid;
  place-items: center;
  width: 2.5rem;
  height: 2.5rem;
  flex-shrink: 0;
  border-radius: var(--radius-xl);
  background: var(--leaf);
  color: #fff;
  border: none;
  cursor: pointer;
  font-size: 0.75rem;
  transition: background 0.2s;
}
.newsletter-btn:hover {
  background: var(--sage);
}

.footer-bottom {
  padding-top: 1.75rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.4);
}
@media (min-width: 640px) {
  .footer-bottom {
    flex-direction: row;
  }
}

.footer-legal {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.25rem;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.4);
}
.footer-legal a {
  transition: color 0.2s;
}
.footer-legal a:hover {
  color: rgba(255, 255, 255, 0.7);
}
</style>
