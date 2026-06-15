<template>
  <!-- ក្បាលទំព័រ -->
  <Navbar />

  <main>
    <!-- ផ្នែកដំបូង -->
    <section class="hero">
      <div class="hero-bg"></div>
      <div class="hero-inner">
        <!-- ខ្លឹមសារខាងឆ្វេង -->
        <div>
          <p class="hero-badge">
            <span class="hero-badge-dot"></span>
            រឿងរ៉ាវរបស់យើង
          </p>

          <h1 class="hero-title">
            អំពី
            <span class="hero-title-gradient">Prolong</span>
          </h1>

          <p class="hero-desc">
            យើងជួយសាលារៀនឆ្លងផុតការងារក្រដាស និងភាពច្របូកច្របល់
            ដោយបង្កើតការប្រឡងឌីជីថលសម័យថ្មីដែលមានសុវត្ថិភាព និងសាមញ្ញសម្រាប់គ្រូ
            សិស្ស និងអ្នកគ្រប់គ្រង។
          </p>

          <div class="hero-buttons">
            <a href="#features" class="btn-primary">ស្វែងយល់ពីមុខងារ</a>
            <a href="#workflow" class="btn-secondary">មើលលំហូរការងារ</a>
          </div>
        </div>

        <!-- រូបភាពខាងស្តាំ -->
        <div class="hero-image-wrap">
          <div class="hero-image-glow"></div>

          <img
            src="@/assets/images/imageLanding.png"
            alt="សិស្សកំពុងសិក្សាតាមអនឡាញ"
            class="hero-image"
          />

          <div class="hero-card-trust">
            <div class="hero-card-trust-inner">
              <div class="hero-card-icon" aria-hidden="true">
                <i class="fa-solid fa-check"></i>
              </div>
              <div>
                <p>សាលារៀនទុកចិត្ត</p>
                <p>លំហូរការប្រឡងមានសុវត្ថិភាព និងងាយស្រួល</p>
              </div>
            </div>
          </div>

          <div class="hero-card-stats">
            <p>សកម្មភាពផ្ទាល់</p>
            <p>12k+</p>
            <p>សិស្សកំពុងសកម្ម</p>
          </div>
        </div>
      </div>
    </section>

    <!-- មុខងារស្នូល -->
    <section id="features" class="section-py scroll-mt">
      <div class="container">
        <div class="max-w-2xl text-center">
          <p class="section-label">មុខងារស្នូល</p>
          <h2 class="section-title">
            អ្វីៗគ្រប់យ៉ាងសម្រាប់ដំណើរការប្រឡងពីដើមដល់ចប់
          </h2>
          <p class="section-desc">
            ឧបករណ៍មានថាមពលដែលរចនាសម្រាប់សិស្ស គ្រូ និងអ្នកគ្រប់គ្រង។
          </p>
        </div>

        <div class="card-grid-3">
          <article class="card card-green">
            <span class="card-icon" aria-hidden="true"
              ><i class="fa-solid fa-clipboard-list"></i
            ></span>
            <h3>បង្កើតបន្ទប់ប្រឡង</h3>
            <p>រៀបចំសំណួរ កំណត់ពេល និងច្បាប់ចូលប្រើក្នុងប៉ុន្មាននាទី។</p>
          </article>

          <article class="card card-blue">
            <span class="card-icon" aria-hidden="true"
              ><i class="fa-solid fa-lock"></i
            ></span>
            <h3>កូដចូលប្រើមានសុវត្ថិភាព</h3>
            <p>ចែករំលែកកូដ តាមដានអ្នកចូលរួម និងគ្រប់គ្រងការដាក់ស្នើ។</p>
          </article>

          <article class="card card-purple">
            <span class="card-icon" aria-hidden="true"
              ><i class="fa-solid fa-stopwatch"></i
            ></span>
            <h3>ការត្រួតពិនិត្យជាពេលវេលាពិត</h3>
            <p>មើលវឌ្ឍនភាព និងសកម្មភាពការប្រឡងនៅពេលវាកំពុងកើតឡើង។</p>
          </article>

          <article class="card card-yellow">
            <span class="card-icon" aria-hidden="true"
              ><i class="fa-solid fa-chart-column"></i
            ></span>
            <h3>លទ្ធផល និងការវិភាគ</h3>
            <p>ពិន្ទុភ្លាមៗ និន្នាការ និងការយល់ដឹងអំពីសមិទ្ធផល។</p>
          </article>

          <article class="card card-green">
            <span class="card-icon" aria-hidden="true"
              ><i class="fa-solid fa-comments"></i
            ></span>
            <h3>មតិកែលម្អសម្រាប់សិស្ស</h3>
            <p>មតិយោបល់ ពិន្ទុ និងការណែនាំលើចម្លើយនីមួយៗ។</p>
          </article>

          <article class="card card-blue">
            <span class="card-icon" aria-hidden="true"
              ><i class="fa-solid fa-mobile-screen-button"></i
            ></span>
            <h3>ដំណើរការលើឧបករណ៍គ្រប់ប្រភេទ</h3>
            <p>គាំទ្រទូរស័ព្ទ ថេប្លេត Chromebook និងកុំព្យូទ័រលើតុ។</p>
          </article>
        </div>
      </div>
    </section>

    <!-- គ្រូ -->
    <section id="teachers" class="section-py bg-white scroll-mt">
      <div class="container">
        <div class="section-head">
          <div class="max-w-xl">
            <p class="section-label section-label-blue">សម្រាប់គ្រូ</p>
            <h2 class="section-title">សន្សំពេលវេលា បង្រៀនបានកាន់តែប្រសើរ</h2>
            <p class="section-desc">
              ឧបករណ៍ដែលរចនាតាមរបៀបដែលអ្នកអប់រំដំណើរការការវាយតម្លៃពិតប្រាកដ។
            </p>
          </div>
          <span class="section-badge badge-blue">គ</span>
        </div>

        <div class="card-grid-2">
          <div class="card card-blue">
            <span
              class="card-icon-sm"
              style="background-color: #5b82ed"
              aria-hidden="true"
              ><i class="fa-solid fa-bolt"></i
            ></span>
            <h3>រៀបចំបានរហ័ស</h3>
            <p>បើកបន្ទប់ប្រឡង និងប្រមូលការដាក់ស្នើក្នុងប៉ុន្មាននាទី។</p>
          </div>

          <div class="card card-purple">
            <span
              class="card-icon-sm"
              style="background-color: #8b6ee8"
              aria-hidden="true"
              ><i class="fa-solid fa-users"></i
            ></span>
            <h3>គ្រប់គ្រងក្រុម</h3>
            <p>រៀបចំថ្នាក់ និងកំណត់ការប្រឡងទៅកាន់សិស្សដែលត្រឹមត្រូវ។</p>
          </div>

          <div class="card card-yellow">
            <span
              class="card-icon-sm"
              style="background-color: #e6a817"
              aria-hidden="true"
              ><i class="fa-solid fa-chart-line"></i
            ></span>
            <h3>របាយការណ៍លម្អិត</h3>
            <p>នាំចេញលទ្ធផល និងនិន្នាការសម្រាប់កិច្ចប្រជុំ និងកំណត់ត្រា។</p>
          </div>

          <div class="card card-green">
            <span
              class="card-icon-sm"
              style="background-color: #43a557"
              aria-hidden="true"
              ><i class="fa-solid fa-rotate"></i
            ></span>
            <h3>គំរូអាចប្រើឡើងវិញ</h3>
            <p>
              រក្សាទុកការប្រឡង ហើយប្រើឡើងវិញសម្រាប់វគ្គសិក្សា និងថ្នាក់ផ្សេងៗ។
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- សិស្ស -->
    <section id="students" class="section-py scroll-mt">
      <div class="container">
        <div class="section-head">
          <div class="max-w-xl">
            <p class="section-label section-label-green">សម្រាប់សិស្ស</p>
            <h2 class="section-title">វិធីល្អជាងមុនក្នុងការធ្វើការប្រឡង</h2>
            <p class="section-desc">
              សាមញ្ញ ច្បាស់លាស់ និងគ្មានសម្ពាធចាប់ពីចូលរួមដល់ដាក់ស្នើ។
            </p>
          </div>
          <span class="section-badge badge-green">សិ</span>
        </div>

        <div class="card-grid-2">
          <div class="card card-green">
            <span
              class="card-icon-sm"
              style="background-color: #43a557"
              aria-hidden="true"
              ><i class="fa-solid fa-wand-magic-sparkles"></i
            ></span>
            <h3>ចូលរួមបានសាមញ្ញ</h3>
            <p>
              បញ្ចូលកូដ រង់ចាំចាប់ផ្តើម ហើយចាប់ផ្តើមធ្វើ
              ដោយមិនចាំបាច់ចូលប្រើស្មុគស្មាញ។
            </p>
          </div>

          <div class="card card-blue">
            <span
              class="card-icon-sm"
              style="background-color: #5b82ed"
              aria-hidden="true"
              ><i class="fa-solid fa-clock"></i
            ></span>
            <h3>ពេលវេលាច្បាស់លាស់</h3>
            <p>មើលឃើញពេលវេលានៅសល់មុនដាក់ស្នើជានិច្ច។</p>
          </div>

          <div class="card card-purple">
            <span
              class="card-icon-sm"
              style="background-color: #8b6ee8"
              aria-hidden="true"
              ><i class="fa-solid fa-file-lines"></i
            ></span>
            <h3>សេចក្តីណែនាំច្បាស់លាស់</h3>
            <p>សំណួរនីមួយៗត្រូវបានរៀបចំឱ្យងាយអាន និងឆ្លើយ។</p>
          </div>

          <div class="card card-yellow">
            <span
              class="card-icon-sm"
              style="background-color: #e6a817"
              aria-hidden="true"
              ><i class="fa-solid fa-envelope-open-text"></i
            ></span>
            <h3>ការបញ្ជាក់ភ្លាមៗ</h3>
            <p>ដឹងថាការប្រឡងរបស់អ្នកបានដាក់ស្នើ និងពេលណាលទ្ធផលរួចរាល់។</p>
          </div>
        </div>
      </div>
    </section>

    <!-- អ្នកគ្រប់គ្រង -->
    <section id="admins" class="section-py bg-white scroll-mt">
      <div class="container">
        <div class="section-head">
          <div class="max-w-xl">
            <p class="section-label section-label-purple">
              សម្រាប់អ្នកគ្រប់គ្រង
            </p>
            <h2 class="section-title">ការបញ្ជា និងត្រួតពិនិត្យកណ្តាល</h2>
            <p class="section-desc">
              គ្រប់គ្រងអ្នកប្រើ សុវត្ថិភាព និងការមើលឃើញទូទាំងស្ថាប័ន។
            </p>
          </div>
          <span class="section-badge badge-purple">អ</span>
        </div>

        <div class="card-grid-2">
          <div class="card card-purple">
            <span
              class="card-icon-sm"
              style="background-color: #8b6ee8"
              aria-hidden="true"
              ><i class="fa-solid fa-user-gear"></i
            ></span>
            <h3>គ្រប់គ្រងអ្នកប្រើ</h3>
            <p>បង្កើតគណនី កំណត់តួនាទី និងគ្រប់គ្រងសិទ្ធិ។</p>
          </div>

          <div class="card card-blue">
            <span
              class="card-icon-sm"
              style="background-color: #5b82ed"
              aria-hidden="true"
              ><i class="fa-solid fa-shield-halved"></i
            ></span>
            <h3>ការគ្រប់គ្រងសុវត្ថិភាព</h3>
            <p>គោលការណ៍ ការរក្សាទុក និងការអនុលោមតាមសម្រាប់ស្ថាប័នរបស់អ្នក។</p>
          </div>

          <div class="card card-yellow">
            <span
              class="card-icon-sm"
              style="background-color: #e6a817"
              aria-hidden="true"
              ><i class="fa-solid fa-chart-pie"></i
            ></span>
            <h3>ការវិភាគប្រព័ន្ធ</h3>
            <p>តាមដានការប្រើប្រាស់ អត្រាបញ្ចប់ និងនិន្នាការទូទាំងសាលា។</p>
          </div>

          <div class="card card-green">
            <span
              class="card-icon-sm"
              style="background-color: #43a557"
              aria-hidden="true"
              ><i class="fa-solid fa-screwdriver-wrench"></i
            ></span>
            <h3>ការកំណត់រចនាសម្ព័ន្ធ</h3>
            <p>ប្ដូរការកំណត់ និងលំហូរការងារសម្រាប់សាលារបស់អ្នក។</p>
          </div>
        </div>
      </div>
    </section>

    <!-- លំហូរការងារ -->
    <section id="workflow" class="section-py scroll-mt">
      <div class="container">
        <div class="max-w-2xl text-center">
          <p class="section-label">លំហូរការងារ</p>
          <h2 class="section-title">បួនជំហានពីការរៀបចំដល់លទ្ធផល</h2>
          <p class="section-desc">
            ដំណើរការរលូនដែលបង្កើតឡើងសម្រាប់គ្រូ សិស្ស និងអ្នកគ្រប់គ្រង។
          </p>
        </div>

        <div class="card-grid-4">
          <article class="card card-green card-workflow">
            <span class="workflow-num workflow-num-green">1</span>
            <h3>បង្កើត</h3>
            <p>បង្កើតបន្ទប់ប្រឡង និងភ្ជាប់សំណួររបស់អ្នក។</p>
            <span class="workflow-tag tag-green">រៀបចំ</span>
          </article>

          <article class="card card-blue card-workflow">
            <span class="workflow-num workflow-num-blue">2</span>
            <h3>អញ្ជើញ</h3>
            <p>ចែករំលែកការចូលប្រើទៅកាន់ក្រុមសិស្សដែលត្រឹមត្រូវ។</p>
            <span class="workflow-tag tag-blue">ចូលប្រើ</span>
          </article>

          <article class="card card-purple card-workflow">
            <span class="workflow-num workflow-num-purple">3</span>
            <h3>តាមដាន</h3>
            <p>តាមដានវឌ្ឍនភាពផ្ទាល់ និងសញ្ញាសុវត្ថិភាព។</p>
            <span class="workflow-tag tag-purple">ផ្ទាល់</span>
          </article>

          <article class="card card-yellow card-workflow">
            <span class="workflow-num workflow-num-yellow">4</span>
            <h3>ពិនិត្យ</h3>
            <p>ប្រមូលលទ្ធផល មតិកែលម្អ និងកំណត់ត្រា។</p>
            <span class="workflow-tag tag-yellow">លទ្ធផល</span>
          </article>
        </div>
      </div>
    </section>

    <!-- ការអំពាវនាវ -->
    <section id="auth" class="cta-section">
      <div class="cta-box">
        <div class="cta-bg-radial"></div>
        <div class="cta-glow-left"></div>
        <div class="cta-glow-right"></div>

        <div class="cta-inner">
          <div class="max-w-xl">
            <p class="cta-label">ចាប់ផ្តើមថ្ងៃនេះ</p>
            <h2 class="cta-title">
              បើកផតថលប្រឡងរបស់អ្នក ហើយគ្រប់គ្រងការវាយតម្លៃដោយទំនុកចិត្ត។
            </h2>
            <p class="cta-desc">
              ចូលរួមជាមួយសាលារៀនដែលកំពុងប្រើ Prolong
              ដើម្បីដំណើរការការប្រឡងអនឡាញប្រកបដោយសុវត្ថិភាព និងរៀបចំបានល្អ។
            </p>
          </div>
          <a class="btn-cta" href="#">ចាប់ផ្តើមឥឡូវនេះ</a>
        </div>
      </div>
    </section>
  </main>

  <!-- បាតទំព័រ -->
  <Footer />

</template>

<script setup>
  import Navbar from "@/components/layout/navbar/landing/LandingPageNavebar.vue";
  import Footer from "@/components/layout/navbar/landing/FooterLandingPage.vue";
</script>

<style scoped>
/* ===== CSS VARIABLES ===== */
:root {
  --font-sans: "Noto Sans Khmer", "Inter", system-ui, sans-serif;

  --brand-50: #f4faf6;
  --brand-100: #e8f5ec;
  --brand-500: #43a557;
  --brand-600: #3a9349;
  --brand-700: #2d7a3e;
  --brand-dark: #102117;

  --green-border: #b8e8c4;
  --green-bg-from: #f4fff6;
  --green-bg-to: #d4f0dc;
  --green-text-dark: #1a4d27;
  --green-text-mid: #2d6b3a;

  --blue-border: #adc8f5;
  --blue-bg-from: #f5f9ff;
  --blue-bg-to: #d6e4f9;
  --blue-accent: #5b82ed;
  --blue-text-dark: #1a2f6b;
  --blue-text-mid: #2d4a9e;

  --purple-border: #c4aef5;
  --purple-bg-from: #faf7ff;
  --purple-bg-to: #e5dcf9;
  --purple-accent: #8b6ee8;
  --purple-text-dark: #3b1a7a;
  --purple-text-mid: #5a3aaa;

  --yellow-border: #f5cc6e;
  --yellow-bg-from: #fff8e7;
  --yellow-bg-to: #fde8a0;
  --yellow-accent: #e6a817;
  --yellow-text-dark: #5a3d00;
  --yellow-text-mid: #7a5500;

  --text-muted: #536173;
}

/* ===== GLOBAL ===== */

a {
  text-decoration: none;
  color: inherit;
}

img {
  display: block;
  max-width: 100%;
}

ul {
  list-style: none;
}

/* ===== LAYOUT UTILITIES ===== */
.container {
  max-width: 72rem; /* 1152px */
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
}

@media (min-width: 640px) {
  .container {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
}

/* ===== HERO SECTION ===== */
.hero {
  position: relative;
  overflow: hidden;
  padding-top: 4rem;
  border-bottom: 1px solid rgba(65, 150, 79, 0.1);
  background: linear-gradient(135deg, #f4fff6, white, #e8f7eb);
}

.hero-bg {
  pointer-events: none;
  position: absolute;
  inset: 0;
  background:
    radial-gradient(
      circle at top left,
      rgba(67, 165, 87, 0.16),
      transparent 35%
    ),
    radial-gradient(
      circle at bottom right,
      rgba(91, 130, 237, 0.12),
      transparent 35%
    );
}

.hero-inner {
  position: relative;
  max-width: 72rem;
  margin: 0 auto;
  padding: 4rem 1rem;
  display: grid;
  gap: 3.5rem;
  align-items: center;
}

@media (min-width: 640px) {
  .hero-inner {
    padding: 4rem 1.5rem;
  }
}

@media (min-width: 768px) {
  .hero-inner {
    padding: 6rem 1.5rem;
  }
}

@media (min-width: 1024px) {
  .hero-inner {
    grid-template-columns: 1fr 1fr;
  }
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  border: 1px solid #b8e8c4;
  background-color: white;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--brand-500);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.hero-badge-dot {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 9999px;
  background-color: #43a557;
  flex-shrink: 0;
}

.hero-title {
  margin-top: 1.25rem;
  font-size: clamp(1.9rem, 3.2vw, 2.8rem);
  font-weight: 900;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: var(--brand-dark);
}

.hero-title-gradient {
  background: linear-gradient(to right, #43a557, #74c878);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-desc {
  margin-top: 1.5rem;
  max-width: 36rem;
  font-size: 1.125rem;
  line-height: 1.7;
  color: #536173;
}

.hero-buttons {
  margin-top: 2rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 1.75rem;
  border-radius: 1rem;
  background: linear-gradient(to right, #43a557, #5cc56f);
  color: white;
  font-size: 0.875rem;
  font-weight: 700;
  box-shadow: 0 10px 15px rgba(67, 165, 87, 0.25);
  transition: transform 0.2s;
}

.btn-primary:hover {
  transform: translateY(-4px);
}

.btn-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 1.75rem;
  border-radius: 1rem;
  border: 1px solid #dbe7df;
  background-color: white;
  color: #1a4d27;
  font-size: 0.875rem;
  font-weight: 700;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  transition:
    border-color 0.15s,
    background-color 0.15s;
}

.btn-secondary:hover {
  border-color: rgba(67, 165, 87, 0.3);
  background-color: #f4fff6;
}

/* ===== HERO IMAGE ===== */
.hero-image-wrap {
  position: relative;
}

.hero-image-glow {
  position: absolute;
  inset: 1.5rem;
  border-radius: 2rem;
  background: linear-gradient(
    135deg,
    rgba(116, 200, 120, 0.25),
    rgba(91, 130, 237, 0.2)
  );
  filter: blur(3rem);
}

.hero-image {
  position: relative;
  z-index: 10;
  width: 100%;
  aspect-ratio: 4/3;
  border-radius: 2rem;
  object-fit: cover;
  box-shadow: 0 25px 50px rgba(67, 165, 87, 0.15);
  outline: 1px solid rgba(255, 255, 255, 0.7);
}

.hero-card-trust {
  position: absolute;
  bottom: -1.25rem;
  left: 1.25rem;
  z-index: 20;
  border-radius: 1rem;
  border: 1px solid #b8e8c4;
  background-color: white;
  padding: 1rem;
  box-shadow: 0 20px 25px rgba(0, 0, 0, 0.1);
}

.hero-card-trust-inner {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.hero-card-icon {
  display: grid;
  place-items: center;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 0.75rem;
  background-color: #43a557;
  color: white;
  flex-shrink: 0;
}

.hero-card-icon i {
  line-height: 1;
}

.hero-card-trust p:first-child {
  font-size: 0.875rem;
  font-weight: 700;
  color: #1a4d27;
}

.hero-card-trust p:last-child {
  font-size: 0.75rem;
  color: #536173;
}

.hero-card-stats {
  position: absolute;
  top: 1.5rem;
  right: -1rem;
  z-index: 20;
  border-radius: 1rem;
  border: 1px solid #adc8f5;
  background-color: white;
  padding: 1rem;
  box-shadow: 0 20px 25px rgba(0, 0, 0, 0.1);
}

.hero-card-stats p:first-child {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #5b82ed;
}

.hero-card-stats p:nth-child(2) {
  margin-top: 0.25rem;
  font-size: 1.5rem;
  font-weight: 900;
  color: #1a2f6b;
}

.hero-card-stats p:last-child {
  font-size: 0.75rem;
  color: #536173;
}

/* ===== SECTION SHARED ===== */
.section-py {
  padding-top: 5rem;
  padding-bottom: 5rem;
}

@media (min-width: 768px) {
  .section-py {
    padding-top: 6rem;
    padding-bottom: 6rem;
  }
}

.section-label {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--brand-500);
}

.section-title {
  margin-top: 0.75rem;
  font-size: 1.875rem;
  font-weight: 900;
  letter-spacing: -0.02em;
  color: var(--brand-dark);
}

@media (min-width: 768px) {
  .section-title {
    font-size: 2.25rem;
  }
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
  margin-left: auto;
  margin-right: auto;
}
.max-w-xl {
  max-width: 36rem;
}

/* ===== CARD GRID ===== */
.card-grid-3 {
  margin-top: 3rem;
  display: grid;
  gap: 1.25rem;
}

@media (min-width: 640px) {
  .card-grid-3 {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .card-grid-3 {
    grid-template-columns: repeat(3, 1fr);
  }
}

.card-grid-2 {
  margin-top: 2.5rem;
  display: grid;
  gap: 1.25rem;
}

@media (min-width: 640px) {
  .card-grid-2 {
    grid-template-columns: repeat(2, 1fr);
  }
}

.card-grid-4 {
  margin-top: 3rem;
  display: grid;
  gap: 1.5rem;
}

@media (min-width: 640px) {
  .card-grid-4 {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .card-grid-4 {
    grid-template-columns: repeat(4, 1fr);
  }
}

/* ===== FEATURE CARD BASE ===== */
.card {
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  transition:
    transform 0.3s,
    box-shadow 0.3s;
}

.card:hover {
  transform: translateY(-4px);
}

.card-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border-radius: 0.75rem;
  font-size: 1.25rem;
  color: white;
}

.card-icon-sm {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 0.75rem;
  color: white;
  margin-bottom: 1rem;
}

.card-icon i,
.card-icon-sm i {
  line-height: 1;
}

.card h3 {
  margin-top: 1.25rem;
  font-size: 1.125rem;
  font-weight: 700;
}

.card-icon-sm + h3 {
  margin-top: 0;
}

.card p {
  margin-top: 0.5rem;
  font-size: 0.875rem;
  line-height: 1.6;
}

/* ===== GREEN CARD ===== */
.card-green {
  border: 1px solid var(--green-border);
  background: linear-gradient(135deg, var(--green-bg-from), var(--green-bg-to));
}

.card-green:hover {
  box-shadow: 0 10px 15px rgba(67, 165, 87, 0.2);
}
.card-green .card-icon,
.card-green .card-icon-sm {
  background-color: var(--brand-500);
}
.card-green h3 {
  color: var(--green-text-dark);
}
.card-green p {
  color: var(--green-text-mid);
}

/* ===== BLUE CARD ===== */
.card-blue {
  border: 1px solid var(--blue-border);
  background: linear-gradient(135deg, var(--blue-bg-from), var(--blue-bg-to));
}

.card-blue:hover {
  box-shadow: 0 10px 15px rgba(91, 130, 237, 0.2);
}
.card-blue .card-icon,
.card-blue .card-icon-sm {
  background-color: var(--blue-accent);
}
.card-blue h3 {
  color: var(--blue-text-dark);
}
.card-blue p {
  color: var(--blue-text-mid);
}

/* ===== PURPLE CARD ===== */
.card-purple {
  border: 1px solid var(--purple-border);
  background: linear-gradient(
    135deg,
    var(--purple-bg-from),
    var(--purple-bg-to)
  );
}

.card-purple:hover {
  box-shadow: 0 10px 15px rgba(139, 110, 232, 0.2);
}
.card-purple .card-icon,
.card-purple .card-icon-sm {
  background-color: var(--purple-accent);
}
.card-purple h3 {
  color: var(--purple-text-dark);
}
.card-purple p {
  color: var(--purple-text-mid);
}

/* ===== YELLOW CARD ===== */
.card-yellow {
  border: 1px solid var(--yellow-border);
  background: linear-gradient(
    135deg,
    var(--yellow-bg-from),
    var(--yellow-bg-to)
  );
}

.card-yellow:hover {
  box-shadow: 0 10px 15px rgba(230, 168, 23, 0.2);
}
.card-yellow .card-icon,
.card-yellow .card-icon-sm {
  background-color: var(--yellow-accent);
}
.card-yellow h3 {
  color: var(--yellow-text-dark);
}
.card-yellow p {
  color: var(--yellow-text-mid);
}

/* ===== SECTION HEADER WITH BADGE ===== */
.section-head {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

@media (min-width: 640px) {
  .section-head {
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
  }
}

.section-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 1rem;
  font-size: 1.125rem;
  font-weight: 900;
  color: white;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  flex-shrink: 0;
}

.badge-blue {
  background: linear-gradient(135deg, #5b82ed, #7ea0ff);
  box-shadow: 0 10px 15px rgba(91, 130, 237, 0.2);
}
.badge-green {
  background: linear-gradient(135deg, #43a557, #74c878);
  box-shadow: 0 10px 15px rgba(67, 165, 87, 0.2);
}
.badge-purple {
  background: linear-gradient(135deg, #8b6ee8, #b39bff);
  box-shadow: 0 10px 15px rgba(139, 110, 232, 0.2);
}

.section-label-blue {
  color: #5b82ed;
}
.section-label-green {
  color: #43a557;
}
.section-label-purple {
  color: #8b6ee8;
}

/* ===== WORKFLOW CARD (centered) ===== */
.card-workflow {
  text-align: center;
}

.workflow-num {
  margin: 0 auto;
  display: grid;
  place-items: center;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 1rem;
  font-size: 1.125rem;
  font-weight: 900;
  color: white;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.15);
}

.workflow-num-green {
  background-color: var(--brand-500);
  box-shadow: 0 10px 15px rgba(67, 165, 87, 0.25);
}
.workflow-num-blue {
  background-color: var(--blue-accent);
  box-shadow: 0 10px 15px rgba(91, 130, 237, 0.25);
}
.workflow-num-purple {
  background-color: var(--purple-accent);
  box-shadow: 0 10px 15px rgba(139, 110, 232, 0.25);
}
.workflow-num-yellow {
  background-color: var(--yellow-accent);
  box-shadow: 0 10px 15px rgba(230, 168, 23, 0.25);
}

.workflow-tag {
  display: inline-block;
  margin-top: 1rem;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 700;
}

.tag-green {
  background-color: #e8f7eb;
  color: var(--brand-500);
}
.tag-blue {
  background-color: #eff5ff;
  color: var(--blue-accent);
}
.tag-purple {
  background-color: #ede8ff;
  color: var(--purple-accent);
}
.tag-yellow {
  background-color: #fff1cc;
  color: var(--yellow-accent);
}

/* ===== BG WHITE ===== */
.bg-white {
  background-color: white;
}

/* ===== SCROLL MARGIN ===== */
.scroll-mt {
  scroll-margin-top: 6rem;
}

/* ===== CTA SECTION ===== */
.cta-section {
  padding: 0 1rem 5rem;
}

@media (min-width: 640px) {
  .cta-section {
    padding: 0 1.5rem 6rem;
  }
}

.cta-box {
  position: relative;
  max-width: 72rem;
  margin: 5rem auto 0;
  overflow: hidden;
  border-radius: 1.5rem;
  border: 1px solid rgba(157, 217, 170, 0.5);
  background: linear-gradient(135deg, #b9efc4, #d8f8df, #cfe4ff);
  padding: 4rem 2rem;
  text-align: center;
  box-shadow: 0 25px 50px rgba(67, 165, 87, 0.15);
}

@media (min-width: 768px) {
  .cta-box {
    padding: 3.5rem;
    text-align: left;
  }
}

.cta-bg-radial {
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
  pointer-events: none;
}

.cta-glow-left {
  position: absolute;
  top: 0;
  left: -4rem;
  width: 20rem;
  height: 20rem;
  border-radius: 9999px;
  background-color: rgba(67, 165, 87, 0.25);
  filter: blur(3rem);
  pointer-events: none;
}

.cta-glow-right {
  position: absolute;
  bottom: 0;
  right: -2.5rem;
  width: 18rem;
  height: 18rem;
  border-radius: 9999px;
  background-color: rgba(91, 130, 237, 0.15);
  filter: blur(3rem);
  pointer-events: none;
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
  font-size: 1.5rem;
  font-weight: 900;
  line-height: 1.3;
  color: #163522;
}

@media (min-width: 768px) {
  .cta-title {
    font-size: 1.875rem;
  }
}

.cta-desc {
  margin-top: 0.75rem;
  font-size: 0.875rem;
  color: #4c5f57;
}

.btn-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 50px;
  flex-shrink: 0;
  padding: 0 2rem;
  border-radius: 0.75rem;
  background: linear-gradient(to right, #43a557, #5fc972);
  color: white;
  font-weight: 700;
  box-shadow: 0 10px 15px rgba(67, 165, 87, 0.25);
  transition: transform 0.2s;
}

.btn-cta:hover {
  transform: translateY(-4px);
}
</style>
