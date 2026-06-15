<template>
  <!-- ក្បាលទំព័រ -->
  <Navbar />

  <main>
    <!-- Hero -->
    <section class="hero">
      <div class="hero-bg"></div>
      <div class="hero-inner">
        <!-- Left -->
        <div>
          <p class="badge"><span class="badge-dot"></span>រឿងរ៉ាវរបស់យើង</p>
          <h1>អំពី <span class="gradient-text">Prolong</span></h1>
          <p class="hero-desc">
            យើងជួយសាលារៀនឆ្លងផុតការងារក្រដាស និងភាពច្របូកច្របល់
            ដោយបង្កើតការប្រឡងឌីជីថលសម័យថ្មីដែលមានសុវត្ថិភាព និងសាមញ្ញសម្រាប់គ្រូ
            សិស្ស និងអ្នកគ្រប់គ្រង។
          </p>
        </div>
        <!-- Right -->
        <div class="hero-image-wrap">
          <div class="hero-glow"></div>
          <img
            src="@/assets/images/imageLanding.png"
            alt="សិស្សកំពុងសិក្សាតាមអនឡាញ"
            class="hero-img"
          />
          <div class="float-card float-card-bottom">
            <div class="float-card-inner">
              <div class="float-icon">✓</div>
              <div>
                <p class="title">សាលារៀនទុកចិត្ត</p>
                <p class="sub">លំហូរការប្រឡងមានសុវត្ថិភាព និងងាយស្រួល</p>
              </div>
            </div>
          </div>
          <div class="float-card float-card-top float-card-analytics">
            <p class="label">សកម្មភាពផ្ទាល់</p>
            <p class="number">12k+</p>
            <p class="caption">សិស្សកំពុងសកម្ម</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Mission -->
    <section class="section-mission">
      <div class="container">
        <div class="two-col">
          <div>
            <p class="section-label">បេសកកម្មរបស់យើង</p>
            <h2>ធ្វើឱ្យការអប់រំទំនើបឡើងតាមរយៈបច្ចេកវិទ្យា</h2>
            <p class="body-text">
              Prolong ចាប់ផ្តើមពីការសង្កេតដ៏សាមញ្ញមួយ៖
              សាលារៀនចំណាយម៉ោងជាច្រើនលើលំហូរការប្រឡងចាស់ៗ ដូចជាក្រដាសបោះពុម្ព
              សិស្សច្របូកច្របល់ និងតារាងសម្រាប់អ្នកគ្រប់គ្រង។
            </p>
            <p class="body-text">
              យើងបានបង្កើតវេទិកាមួយដើម្បីផ្លាស់ប្តូររឿងនោះ។ ថ្ងៃនេះ
              សិស្សរាប់ពាន់នាក់ធ្វើការប្រឡងប្រកបដោយសុវត្ថិភាពរៀងរាល់ខែ
              ហើយគ្រូសន្សំពេលវេលារាប់រយម៉ោងលើការគ្រប់គ្រងការវាយតម្លៃ។
            </p>
          </div>
          <div class="mission-img-wrap">
            <div class="mission-glow"></div>
            <img
              src="@/assets/images/imageLanding.png"
              alt="សិស្សកំពុងសិក្សាជាមួយឧបករណ៍រៀនឌីជីថល"
              class="mission-img"
            />
          </div>
        </div>

        <div class="stats-grid">
          <div class="stat-card green">
            <p class="stat-label">ចាប់តាំងពីដាក់ដំណើរការ</p>
            <p class="stat-number">18+</p>
            <p class="stat-desc">ខែនៃការអភិវឌ្ឍសម្រាប់អ្នកអប់រំ</p>
          </div>
          <div class="stat-card blue">
            <p class="stat-label">ការឈានដល់សកល</p>
            <p class="stat-number">50+</p>
            <p class="stat-desc">សាលារៀននៅជាង 15 ប្រទេស</p>
          </div>
          <div class="stat-card purple">
            <p class="stat-label">ក្រុមរបស់យើង</p>
            <p class="stat-number">12+</p>
            <p class="stat-desc">អ្នកអប់រំ វិស្វករ និងអ្នករចនា</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Values -->
    <section class="section-values">
      <div class="container">
        <div class="section-header">
          <p class="section-label">គុណតម្លៃស្នូល</p>
          <h2>អ្វីដែលជំរុញគ្រប់អ្វីដែលយើងធ្វើ</h2>
          <p class="sub">
            គោលការណ៍ដែលណែនាំរបៀបយើងបង្កើត គាំទ្រ និងធ្វើជាដៃគូជាមួយសាលារៀន។
          </p>
        </div>
        <div class="values-grid">
          <article class="value-card green">
            <span class="value-icon" aria-hidden="true"
              ><i class="fa-solid fa-graduation-cap"></i
            ></span>
            <h3>អប់រំមុនគេ</h3>
            <p>
              សិស្ស និងគ្រូមកជាមុន។ យើងស្តាប់អ្នកអប់រំ
              ហើយបង្កើតអ្វីដែលសាលារៀនត្រូវការពិតប្រាកដ។
            </p>
          </article>
          <article class="value-card blue">
            <span class="value-icon" aria-hidden="true"
              ><i class="fa-solid fa-shield-halved"></i
            ></span>
            <h3>សុវត្ថិភាព និងទំនុកចិត្ត</h3>
            <p>
              ទិន្នន័យសិស្សត្រូវបានការពារដោយសុវត្ថិភាពកម្រិតសហគ្រាសដែលសាលារៀនអាចទុកចិត្តបាន។
            </p>
          </article>
          <article class="value-card purple">
            <span class="value-icon" aria-hidden="true"
              ><i class="fa-solid fa-bolt"></i
            ></span>
            <h3>ភាពសាមញ្ញ</h3>
            <p>
              មុខងារដ៏មានថាមពលនៅពីក្រោយផ្ទៃប្រើប្រាស់ដែលនរណាក៏អាចប្រើបានដោយមិនចាំបាច់បណ្តុះបណ្តាល។
            </p>
          </article>
          <article class="value-card yellow">
            <span class="value-icon" aria-hidden="true"
              ><i class="fa-solid fa-handshake"></i
            ></span>
            <h3>សហគមន៍</h3>
            <p>
              យើងរីកចម្រើនជាមួយគ្រូ និងសាលារៀន តាមរយៈភាពជាដៃគូ មតិកែលម្អ
              និងភាពជោគជ័យរួម។
            </p>
          </article>
        </div>
      </div>
    </section>

    <!-- Team -->
    <section class="section-team">
      <div class="container">
        <div class="section-header">
          <p class="section-label">ក្រុមរបស់យើង</p>
          <h2>មនុស្សនៅពីក្រោយ Prolong</h2>
          <p class="sub">
            អ្នកអប់រំ
            និងអ្នកបង្កើតរួមគ្នាដោយចំណង់ចំណូលចិត្តចំពោះបទពិសោធន៍វាយតម្លៃដែលល្អប្រសើរ។
          </p>
        </div>
        <div class="team-grid">
          <article class="team-card green-role">
            <div class="team-photo-wrap">
              <img
                class="team-photo"
                src="@/assets/images/imageLanding.png"
                alt="Alex Kumar"
                loading="lazy"
              />
              <span class="team-accent"></span>
            </div>
            <div class="team-content">
              <h3>Alex Kumar</h3>
              <p class="role">សហស្ថាបនិក និងនាយកប្រតិបត្តិ</p>
              <p class="bio">
                ដឹកនាំចក្ខុវិស័យផលិតផល និងភាពជាដៃគូជាមួយសាលារៀន។
              </p>
              <div class="team-socials">
                <a
                  class="team-social-btn"
                  href="#"
                  aria-label="Alex Kumar on LinkedIn"
                  ><i class="fab fa-linkedin-in"></i
                ></a>
                <a
                  class="team-social-btn"
                  href="#"
                  aria-label="Alex Kumar on GitHub"
                  ><i class="fab fa-github"></i
                ></a>
                <a class="team-social-btn" href="#" aria-label="Alex Kumar on X"
                  ><i class="fab fa-x-twitter"></i
                ></a>
              </div>
            </div>
          </article>
          <article class="team-card blue-role">
            <div class="team-photo-wrap">
              <img
                class="team-photo"
                src="@/assets/images/imageLanding.png"
                alt="Sarah Chen"
                loading="lazy"
              />
              <span class="team-accent"></span>
            </div>
            <div class="team-content">
              <h3>Sarah Chen</h3>
              <p class="role">សហស្ថាបនិក និងនាយកបច្ចេកវិទ្យា</p>
              <p class="bio">
                គ្រប់គ្រងស្ថាបត្យកម្មប្រព័ន្ធ សុវត្ថិភាព និងការពង្រីកវេទិកា។
              </p>
              <div class="team-socials">
                <a
                  class="team-social-btn"
                  href="#"
                  aria-label="Sarah Chen on LinkedIn"
                  ><i class="fab fa-linkedin-in"></i
                ></a>
                <a
                  class="team-social-btn"
                  href="#"
                  aria-label="Sarah Chen on GitHub"
                  ><i class="fab fa-github"></i
                ></a>
                <a class="team-social-btn" href="#" aria-label="Sarah Chen on X"
                  ><i class="fab fa-x-twitter"></i
                ></a>
              </div>
            </div>
          </article>
          <article class="team-card purple-role">
            <div class="team-photo-wrap">
              <img
                class="team-photo"
                src="@/assets/images/imageLanding.png"
                alt="Marcus Williams"
                loading="lazy"
              />
              <span class="team-accent"></span>
            </div>
            <div class="team-content">
              <h3>Marcus Williams</h3>
              <p class="role">ប្រធានផលិតផល</p>
              <p class="bio">
                បម្លែងមតិអ្នកប្រើទៅជាមុខងារដែលងាយប្រើសម្រាប់គ្រូ និងសិស្ស។
              </p>
              <div class="team-socials">
                <a
                  class="team-social-btn"
                  href="#"
                  aria-label="Marcus Williams on LinkedIn"
                  ><i class="fab fa-linkedin-in"></i
                ></a>
                <a
                  class="team-social-btn"
                  href="#"
                  aria-label="Marcus Williams on GitHub"
                  ><i class="fab fa-github"></i
                ></a>
                <a
                  class="team-social-btn"
                  href="#"
                  aria-label="Marcus Williams on X"
                  ><i class="fab fa-x-twitter"></i
                ></a>
              </div>
            </div>
          </article>
          <article class="team-card yellow-role">
            <div class="team-photo-wrap">
              <img
                class="team-photo"
                src="@/assets/images/imageLanding.png"
                alt="Maya Sok"
                loading="lazy"
              />
              <span class="team-accent"></span>
            </div>
            <div class="team-content">
              <h3>Maya Sok</h3>
              <p class="role">អ្នករចនា UX/UI</p>
              <p class="bio">
                រចនាបទពិសោធន៍ប្រឡងដែលស្អាត ច្បាស់
                និងមិនធ្វើឱ្យអ្នកប្រើច្របូកច្របល់។
              </p>
              <div class="team-socials">
                <a
                  class="team-social-btn"
                  href="#"
                  aria-label="Maya Sok on LinkedIn"
                  ><i class="fab fa-linkedin-in"></i
                ></a>
                <a
                  class="team-social-btn"
                  href="#"
                  aria-label="Maya Sok on Dribbble"
                  ><i class="fab fa-dribbble"></i
                ></a>
                <a class="team-social-btn" href="#" aria-label="Maya Sok on X"
                  ><i class="fab fa-x-twitter"></i
                ></a>
              </div>
            </div>
          </article>
          <article class="team-card green-role">
            <div class="team-photo-wrap">
              <img
                class="team-photo"
                src="@/assets/images/imageLanding.png"
                alt="Dara Vann"
                loading="lazy"
              />
              <span class="team-accent"></span>
            </div>
            <div class="team-content">
              <h3>Dara Vann</h3>
              <p class="role">វិស្វករ Backend</p>
              <p class="bio">
                បង្កើត API ការគ្រប់គ្រងទិន្នន័យ និងប្រព័ន្ធប្រឡងដែលមានស្ថេរភាព។
              </p>
              <div class="team-socials">
                <a
                  class="team-social-btn"
                  href="#"
                  aria-label="Dara Vann on LinkedIn"
                  ><i class="fab fa-linkedin-in"></i
                ></a>
                <a
                  class="team-social-btn"
                  href="#"
                  aria-label="Dara Vann on GitHub"
                  ><i class="fab fa-github"></i
                ></a>
                <a class="team-social-btn" href="#" aria-label="Dara Vann on X"
                  ><i class="fab fa-x-twitter"></i
                ></a>
              </div>
            </div>
          </article>
          <article class="team-card blue-role">
            <div class="team-photo-wrap">
              <img
                class="team-photo"
                src="@/assets/images/imageLanding.png"
                alt="Lina Chou"
                loading="lazy"
              />
              <span class="team-accent"></span>
            </div>
            <div class="team-content">
              <h3>Lina Chou</h3>
              <p class="role">ជំនាញជោគជ័យអតិថិជន</p>
              <p class="bio">
                ជួយសាលារៀនដាក់ប្រើ Prolong ឱ្យរលូន និងទទួលបានលទ្ធផលល្អ។
              </p>
              <div class="team-socials">
                <a
                  class="team-social-btn"
                  href="#"
                  aria-label="Lina Chou on LinkedIn"
                  ><i class="fab fa-linkedin-in"></i
                ></a>
                <a
                  class="team-social-btn"
                  href="#"
                  aria-label="Lina Chou on Facebook"
                  ><i class="fab fa-facebook-f"></i
                ></a>
                <a class="team-social-btn" href="#" aria-label="Lina Chou on X"
                  ><i class="fab fa-x-twitter"></i
                ></a>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section id="auth" class="section-cta">
      <div class="cta-box">
        <div class="cta-bg1"></div>
        <div class="cta-blob1"></div>
        <div class="cta-blob2"></div>
        <div class="cta-inner">
          <div>
            <p class="cta-label">ចាប់ផ្តើមថ្ងៃនេះ</p>
            <h2 class="cta-title">
              បើកផតថលប្រឡងរបស់អ្នក ហើយគ្រប់គ្រងការវាយតម្លៃដោយទំនុកចិត្ត។
            </h2>
            <p class="cta-desc">
              ចូលរួមជាមួយសាលារៀនដែលកំពុងប្រើ Prolong
              ដើម្បីដំណើរការការប្រឡងអនឡាញប្រកបដោយសុវត្ថិភាព និងរៀបចំបានល្អ។
            </p>
          </div>
          <a href="#" class="btn-cta">ចាប់ផ្តើមឥឡូវនេះ</a>
        </div>
      </div>
    </section>
  </main>
  <!-- Footer -->
  <Footer />

</template>

<script setup>
  import Navbar from "@/components/layout/navbar/landing/LandingPageNavebar.vue";
  import Footer from "@/components/layout/navbar/landing/FooterLandingPage.vue";
</script>

<style scope>
a {
  text-decoration: none;
}
img {
  display: block;
  max-width: 100%;
}

.premium-about-section{
  position:relative;
  overflow:hidden;
  padding:120px 0;
  background:#f7fbf8;
}

.premium-bg-circle{
  position:absolute;
  border-radius:50%;
  filter:blur(100px);
}

.circle-1{
  width:350px;
  height:350px;
  background:rgba(67,165,87,.18);
  top:-120px;
  left:-120px;
}

.circle-2{
  width:300px;
  height:300px;
  background:rgba(91,130,237,.18);
  right:-80px;
  bottom:-80px;
}

.premium-header{
  text-align:center;
  max-width:800px;
  margin:auto;
}

.premium-badge{
  display:inline-flex;
  gap:10px;
  padding:10px 18px;
  border-radius:999px;
  background:white;
  border:1px solid #d8efe0;
  color:#43a557;
  font-weight:700;
}

.premium-header h2{
  font-size:2.5rem;
  margin-top:20px;
}

.premium-header p{
  color:#64748b;
  margin-top:10px;
}

.vision-grid{
  display:grid;
  grid-template-columns:repeat(auto-fit,minmax(250px,1fr));
  gap:20px;
  margin-top:60px;
}

.vision-card{
  background:white;
  padding:30px;
  border-radius:20px;
  box-shadow:0 10px 30px rgba(0,0,0,.05);
  transition:.3s;
}

.vision-card:hover{
  transform:translateY(-10px);
}

.vision-icon{
  width:60px;
  height:60px;
  display:flex;
  align-items:center;
  justify-content:center;
  border-radius:15px;
  color:white;
}

.green{background:#43a557;}
.blue{background:#5b82ed;}
.purple{background:#8b6ee8;}

.premium-stats{
  display:grid;
  grid-template-columns:repeat(auto-fit,minmax(200px,1fr));
  gap:20px;
  margin-top:60px;
}

.premium-stat-card{
  background:white;
  padding:30px;
  text-align:center;
  border-radius:20px;
  box-shadow:0 10px 30px rgba(0,0,0,.05);
}

.premium-stat-card h3{
  font-size:2.5rem;
  color:#43a557;
}

/* ========== Layout Utilities ========== */
.container {
  width: 100%;
  max-width: 1152px;
  margin-inline: auto;
  padding-inline: 1rem;
}
@media (min-width: 640px) {
  .container {
    padding-inline: 1.5rem;
  }
}

/* ========== Hero Section ========== */
.hero {
  position: relative;
  overflow: hidden;
  padding-top: 4rem;
  border-bottom: 1px solid rgba(65, 150, 79, 0.1);
  background: linear-gradient(135deg, #f4fff6 0%, #fff 50%, #e8f7eb 100%);
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
  display: grid;
  align-items: center;
  gap: 3.5rem;
  max-width: 1152px;
  margin-inline: auto;
  padding: 4rem 1rem;
}
@media (min-width: 640px) {
  .hero-inner {
    padding: 4rem 1.5rem;
  }
}
@media (min-width: 1024px) {
  .hero-inner {
    grid-template-columns: 1fr 1fr;
    padding: 6rem 1.5rem;
  }
}

.badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  border-radius: 9999px;
  border: 1px solid #b8e8c4;
  background: #fff;
  padding: 0.5rem 1rem;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #43a557;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
}
.badge-dot {
  height: 0.5rem;
  width: 0.5rem;
  border-radius: 50%;
  background-color: #43a557;
  flex-shrink: 0;
}

h1 {
  margin-top: 1.25rem;
  font-size: clamp(1.9rem, 3.2vw, 2.8rem);
  font-weight: 900;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: #102117;
}
.gradient-text {
  background: linear-gradient(90deg, #43a557, #74c878);
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

/* Hero image */
.hero-image-wrap {
  position: relative;
}
.hero-glow {
  position: absolute;
  inset: 1.5rem;
  border-radius: 2rem;
  background: linear-gradient(
    135deg,
    rgba(116, 200, 120, 0.25),
    rgba(91, 130, 237, 0.2)
  );
  filter: blur(48px);
}
.hero-img {
  position: relative;
  z-index: 10;
  width: 100%;
  aspect-ratio: 4/3;
  border-radius: 2rem;
  object-fit: cover;
  box-shadow: 0 24px 64px rgba(67, 165, 87, 0.15);
  outline: 1px solid rgba(255, 255, 255, 0.7);
}

.float-card {
  position: absolute;
  z-index: 20;
  border-radius: 1rem;
  border: 1px solid #b8e8c4;
  background: #fff;
  padding: 1rem;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
}
.float-card-bottom {
  bottom: -1.25rem;
  left: 1.25rem;
}
.float-card-top {
  top: 1.5rem;
  right: -1rem;
}

.float-card-inner {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.float-icon {
  display: grid;
  place-items: center;
  height: 2.75rem;
  width: 2.75rem;
  border-radius: 0.75rem;
  background-color: #43a557;
  color: #fff;
  flex-shrink: 0;
}
.float-card p.title {
  font-size: 0.875rem;
  font-weight: 700;
  color: #1a4d27;
}
.float-card p.sub {
  font-size: 0.75rem;
  color: #536173;
}

.float-card-analytics {
  border-color: #adc8f5;
}
.float-card-analytics .label {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #5b82ed;
}
.float-card-analytics .number {
  margin-top: 0.25rem;
  font-size: 1.5rem;
  font-weight: 900;
  color: #1a2f6b;
}
.float-card-analytics .caption {
  font-size: 0.75rem;
  color: #536173;
}

/* ========== Mission Section ========== */
.section-mission {
  padding: 5rem 0;
}
@media (min-width: 768px) {
  .section-mission {
    padding: 6rem 0;
  }
}

.two-col {
  display: grid;
  align-items: center;
  gap: 3rem;
}
@media (min-width: 1024px) {
  .two-col {
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
  }
}

.section-label {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.075em;
  color: #43a557;
}

h2 {
  margin-top: 0.75rem;
  font-size: clamp(1.75rem, 3vw, 2.25rem);
  font-weight: 900;
  letter-spacing: -0.02em;
  color: #102117;
}

.body-text {
  margin-top: 1.25rem;
  line-height: 1.75;
  color: #536173;
}

.mission-img-wrap {
  position: relative;
}
.mission-glow {
  position: absolute;
  inset: 1rem;
  border-radius: 2rem;
  background: linear-gradient(
    135deg,
    rgba(116, 200, 120, 0.25),
    rgba(91, 130, 237, 0.15)
  );
  filter: blur(32px);
}
.mission-img {
  position: relative;
  z-index: 10;
  width: 100%;
  aspect-ratio: 4/3;
  border-radius: 1rem;
  object-fit: cover;
  box-shadow: 0 16px 48px rgba(67, 165, 87, 0.1);
  outline: 1px solid rgba(255, 255, 255, 0.8);
}

/* Stats row */
.stats-grid {
  margin-top: 4rem;
  display: grid;
  gap: 1.25rem;
}
@media (min-width: 640px) {
  .stats-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.stat-card {
  border-radius: 1rem;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
}
.stat-card.green {
  border: 1px solid #b8e8c4;
  background: linear-gradient(135deg, #f4fff6, #d4f0dc);
}
.stat-card.blue {
  border: 1px solid #adc8f5;
  background: linear-gradient(135deg, #f5f9ff, #d6e4f9);
}
.stat-card.purple {
  border: 1px solid #c4aef5;
  background: linear-gradient(135deg, #faf7ff, #e5dcf9);
}

.stat-label {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.07em;
}
.stat-number {
  margin-top: 0.75rem;
  font-size: 1.875rem;
  font-weight: 900;
}
.stat-desc {
  margin-top: 0.25rem;
  font-size: 0.875rem;
}

.stat-card.green .stat-label {
  color: #43a557;
}
.stat-card.green .stat-number {
  color: #1a4d27;
}
.stat-card.green .stat-desc {
  color: #2d6b3a;
}
.stat-card.blue .stat-label {
  color: #5b82ed;
}
.stat-card.blue .stat-number {
  color: #1a2f6b;
}
.stat-card.blue .stat-desc {
  color: #2d4a9e;
}
.stat-card.purple .stat-label {
  color: #8b6ee8;
}
.stat-card.purple .stat-number {
  color: #3b1a7a;
}
.stat-card.purple .stat-desc {
  color: #5a3aaa;
}

/* ========== Values Section ========== */
.section-values {
  background: #fff;
  padding: 5rem 0;
}
@media (min-width: 768px) {
  .section-values {
    padding: 6rem 0;
  }
}

.section-header {
  max-width: 42rem;
  margin-inline: auto;
  text-align: center;
}
.section-header p.sub {
  margin-top: 1rem;
  color: #536173;
}

.values-grid {
  margin-top: 3rem;
  display: grid;
  gap: 1.5rem;
}
@media (min-width: 640px) {
  .values-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.value-card {
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
}
.value-card.green {
  border: 1px solid #b8e8c4;
  background: linear-gradient(135deg, #f4fff6, #d4f0dc);
}
.value-card.blue {
  border: 1px solid #adc8f5;
  background: linear-gradient(135deg, #f5f9ff, #d6e4f9);
}
.value-card.purple {
  border: 1px solid #c4aef5;
  background: linear-gradient(135deg, #faf7ff, #e5dcf9);
}
.value-card.yellow {
  border: 1px solid #f5cc6e;
  background: linear-gradient(135deg, #fff8e7, #fde8a0);
}

.value-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 3rem;
  width: 3rem;
  border-radius: 0.75rem;
  font-size: 1.25rem;
  margin-bottom: 1rem;
}
.value-card.green .value-icon {
  background: #e8f7eb;
}
.value-card.blue .value-icon {
  background: #eff5ff;
}
.value-card.purple .value-icon {
  background: #f0ebff;
}
.value-card.yellow .value-icon {
  background: #fff3cf;
}
.value-card.green .value-icon {
  color: #43a557;
}
.value-card.blue .value-icon {
  color: #5b82ed;
}
.value-card.purple .value-icon {
  color: #8b6ee8;
}
.value-card.yellow .value-icon {
  color: #d69a00;
}
.value-icon i {
  line-height: 1;
}

.value-card h3 {
  font-size: 1.125rem;
  font-weight: 700;
}
.value-card.green h3 {
  color: #1a4d27;
}
.value-card.blue h3 {
  color: #1a2f6b;
}
.value-card.purple h3 {
  color: #3b1a7a;
}
.value-card.yellow h3 {
  color: #5a3d00;
}

.value-card p {
  margin-top: 0.5rem;
  font-size: 0.875rem;
  line-height: 1.6;
}
.value-card.green p {
  color: #2d6b3a;
}
.value-card.blue p {
  color: #2d4a9e;
}
.value-card.purple p {
  color: #5a3aaa;
}
.value-card.yellow p {
  color: #7a5500;
}

/* ========== Team Section ========== */
.section-team {
  padding: 5rem 0;
}
@media (min-width: 768px) {
  .section-team {
    padding: 6rem 0;
  }
}

.team-grid {
  margin-top: 3rem;
  display: grid;
  gap: 1.5rem;
}
@media (min-width: 640px) {
  .team-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (min-width: 1024px) {
  .team-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.team-card {
  overflow: hidden;
  border-radius: 1rem;
  border: 1px solid rgba(65, 150, 79, 0.1);
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}
.team-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.1);
}

.team-photo-wrap {
  position: relative;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  background: #e8f5ec;
}
.team-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.35s ease;
}
.team-card:hover .team-photo {
  transform: scale(1.05);
}
.team-accent {
  position: absolute;
  left: 1rem;
  bottom: 1rem;
  height: 0.25rem;
  width: 3rem;
  border-radius: 999px;
  background: #43a557;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.16);
}
.team-card.blue-role .team-accent {
  background: #5b82ed;
}
.team-card.purple-role .team-accent {
  background: #8b6ee8;
}
.team-card.yellow-role .team-accent {
  background: #d69a00;
}

.team-content {
  padding: 1.5rem;
}
.team-card h3 {
  font-weight: 800;
  color: #102117;
}
.team-card .role {
  margin-top: 0.25rem;
  font-size: 0.875rem;
  font-weight: 700;
}
.team-card.green-role .role {
  color: #43a557;
}
.team-card.blue-role .role {
  color: #5b82ed;
}
.team-card.purple-role .role {
  color: #8b6ee8;
}
.team-card.yellow-role .role {
  color: #d69a00;
}
.team-card .bio {
  margin-top: 0.75rem;
  font-size: 0.875rem;
  line-height: 1.6;
  color: #536173;
}
.team-socials {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  margin-top: 1.25rem;
}
.team-social-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 2.25rem;
  width: 2.25rem;
  border-radius: 0.625rem;
  border: 1px solid rgba(65, 150, 79, 0.12);
  background: #f8fbf9;
  color: #64748b;
  transition:
    background 0.2s,
    border-color 0.2s,
    color 0.2s,
    transform 0.2s;
}
.team-social-btn:hover {
  border-color: rgba(67, 165, 87, 0.35);
  background: #f4fff6;
  color: #43a557;
  transform: translateY(-2px);
}
.team-social-btn i {
  line-height: 1;
}

/* ========== CTA Section ========== */
.section-cta {
  padding-inline: 1rem;
  padding-bottom: 5rem;
}
@media (min-width: 640px) {
  .section-cta {
    padding-inline: 1.5rem;
  }
}
@media (min-width: 768px) {
  .section-cta {
    padding-bottom: 6rem;
  }
}

.cta-box {
  position: relative;
  overflow: hidden;
  border-radius: 1.5rem;
  border: 1px solid rgba(157, 217, 170, 0.5);
  background: linear-gradient(135deg, #b9efc4, #d8f8df 50%, #cfe4ff);
  padding: 4rem 2rem;
  text-align: center;
  box-shadow: 0 24px 64px rgba(67, 165, 87, 0.15);
  margin-top: 5rem;
  max-width: 1152px;
  margin-inline: auto;
}
@media (min-width: 768px) {
  .cta-box {
    padding: 3.5rem;
    text-align: left;
  }
}

.cta-bg1 {
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
.cta-blob1 {
  pointer-events: none;
  position: absolute;
  top: 0;
  left: -4rem;
  height: 20rem;
  width: 20rem;
  border-radius: 50%;
  background: rgba(67, 165, 87, 0.25);
  filter: blur(48px);
}
.cta-blob2 {
  pointer-events: none;
  position: absolute;
  bottom: 0;
  right: -2.5rem;
  height: 18rem;
  width: 18rem;
  border-radius: 50%;
  background: rgba(91, 130, 237, 0.15);
  filter: blur(48px);
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
  letter-spacing: 0.07em;
  color: #2f8c42;
}
.cta-title {
  margin-top: 0.75rem;
  font-size: clamp(1.25rem, 2.5vw, 1.875rem);
  font-weight: 900;
  line-height: 1.3;
  color: #163522;
  max-width: 36rem;
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
  border-radius: 0.75rem;
  background: linear-gradient(90deg, #43a557, #5fc972);
  padding-inline: 2rem;
  font-weight: 700;
  color: #fff;
  box-shadow: 0 8px 24px rgba(67, 165, 87, 0.25);
  transition: transform 0.2s;
  white-space: nowrap;
}
.btn-cta:hover {
  transform: translateY(-4px);
}
</style>
