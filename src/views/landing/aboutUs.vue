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
  <footer>
    <div class="footer-blob1"></div>
    <div class="footer-blob2"></div>
    <div class="footer-blob3"></div>

    <div class="footer-inner">
      <div class="footer-grid">
        <!-- Brand -->
        <div>
          <a href="index.html" class="footer-brand-link">
            <span class="footer-brand-icon">
              <svg
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2.5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </span>
            Prolong
          </a>
          <p class="footer-tagline">
            បន្ទប់ប្រឡង ការត្រួតពិនិត្យផ្ទាល់ និងលទ្ធផលស្វ័យប្រវត្តិ
            ត្រូវបានរចនាឱ្យក្លាយជាប្រព័ន្ធតែមួយសម្រាប់ស្ថាប័នអប់រំសម័យថ្មី។
          </p>
        </div>

        <!-- Links -->
        <div class="footer-links-grid">
          <div class="footer-col">
            <h3>ផលិតផល</h3>
            <ul>
              <li><a href="features.html">មុខងារ</a></li>
              <li><a href="#auth">តម្លៃ</a></li>
              <li><a href="#faq">សំណួរញឹកញាប់</a></li>
              <li><a href="#">កំណែចេញផ្សាយ</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h3>ក្រុមហ៊ុន</h3>
            <ul>
              <li><a href="about.html">អំពីយើង</a></li>
              <li><a href="#">ការងារ</a></li>
              <li><a href="#">ប្លុក</a></li>
              <li><a href="#">ទំនាក់ទំនង</a></li>
            </ul>
          </div>
          <div class="footer-col newsletter-col">
            <h3>ទទួលព័ត៌មានថ្មីៗ</h3>
            <p class="footer-newsletter-desc">
              ទទួលព័ត៌មានកែលម្អផលិតផល និងសេចក្តីប្រកាសអំពីកំណែថ្មីៗ។
            </p>
            <form class="newsletter-form" onsubmit="event.preventDefault()">
              <input
                type="email"
                required
                placeholder="អ៊ីមែលរបស់អ្នក"
                class="newsletter-input"
              />
              <button
                type="submit"
                class="newsletter-btn"
                aria-label="ជាវព័ត៌មាន"
              >
                <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2.5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>

      <!-- Bottom -->
      <div class="footer-bottom">
        <div class="footer-legal">
          <span>&copy; 2026 Prolong Inc.</span>
          <a href="#">គោលការណ៍ឯកជនភាព</a>
          <a href="#">លក្ខខណ្ឌប្រើប្រាស់</a>
          <a href="#">សុវត្ថិភាព</a>
        </div>
        <div class="footer-social">
          <!-- Facebook -->
          <a href="#" class="social-btn" aria-label="Facebook">
            <svg fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
              />
            </svg>
          </a>
          <!-- LinkedIn -->
          <a href="#" class="social-btn" aria-label="LinkedIn">
            <svg fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
              />
            </svg>
          </a>
          <!-- Twitter/X -->
          <a href="#" class="social-btn" aria-label="Twitter/X">
            <svg fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
              />
            </svg>
          </a>
          <!-- Instagram -->
          <a href="#" class="social-btn" aria-label="Instagram">
            <svg fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M12 2.2c3.2 0 3.6 0 4.8.1 3 .1 4.3 1.5 4.4 4.4.1 1.2.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 3-1.5 4.3-4.4 4.4-1.2.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-3-.1-4.3-1.5-4.4-4.4C2.2 15.1 2.2 14.7 2.2 11.5s0-3.6.1-4.8c.1-3 1.5-4.3 4.4-4.4 1.2-.1 1.6-.1 4.8-.1zm0 1.8c-3.1 0-3.5 0-4.7.1-2.1.1-3 .9-3.1 3.1-.1 1.2-.1 1.5-.1 4.7s0 3.5.1 4.7c.1 2.1.9 3 3.1 3.1 1.2.1 1.5.1 4.7.1s3.5 0 4.7-.1c2.1-.1 3-.9 3.1-3.1.1-1.2.1-1.5.1-4.7s0-3.5-.1-4.7c-.1-2.1-.9-3-3.1-3.1-1.2-.1-1.5-.1-4.7-.1zm0 3.3a4.2 4.2 0 110 8.4 4.2 4.2 0 010-8.4zm0 1.8a2.4 2.4 0 100 4.8 2.4 2.4 0 000-4.8zm5.3-2.1a1 1 0 110 2 1 1 0 010-2z"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
  import Navbar from "@/components/layout/navbar/landing/LandingPageNavebar.vue";
</script>

<style scope>
:root {
  --brand-50: #f4faf6;
  --brand-100: #e8f5ec;
  --brand-500: #43a557;
  --brand-600: #3a9349;
  --brand-700: #2d7a3e;
  --brand-dark: #102117;
  --green-light: #74c878;
  --blue-mid: #5b82ed;
  --text-muted: #536173;
  --border-green: #b8e8c4;
  --border-blue: #adc8f5;
  --border-purple: #c4aef5;
  --border-yellow: #f5cc6e;
  --green-dark: #1a4d27;
  --blue-dark: #1a2f6b;
  --purple-dark: #3b1a7a;
  --yellow-dark: #5a3d00;
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: var(--brand-50);
  font-family: "Noto Sans Khmer", "Inter", system-ui, sans-serif;
  color: var(--brand-dark);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

a {
  text-decoration: none;
}
img {
  display: block;
  max-width: 100%;
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

/* ========== Header ========== */
header {
  position: sticky;
  top: 0;
  z-index: 50;
  border-bottom: 1px solid rgba(65, 150, 79, 0.1);
  background-color: rgba(244, 250, 246, 0.9);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  min-height: 72px;
  max-width: 1152px;
  margin-inline: auto;
  padding-inline: 1rem;
}
@media (min-width: 640px) {
  .header-inner {
    padding-inline: 1.5rem;
  }
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  font-weight: 800;
  color: var(--brand-500);
}
.logo-icon {
  display: grid;
  place-items: center;
  height: 2.25rem;
  width: 2.25rem;
  border-radius: 0.75rem;
  background-color: var(--green-light);
  font-size: 0.875rem;
  color: #fff;
  box-shadow: 0 4px 12px rgba(67, 165, 87, 0.25);
}
.logo-text {
  font-size: 1.125rem;
  color: var(--brand-dark);
}

nav {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--text-muted);
}
@media (min-width: 640px) {
  nav {
    gap: 1.5rem;
    font-size: 0.875rem;
  }
}

nav a {
  transition: color 0.2s;
}
nav a:hover {
  color: var(--brand-500);
}
nav a.active {
  color: var(--brand-500);
}

.btn-header {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 42px;
  border-radius: 0.75rem;
  background-color: var(--brand-500);
  padding-inline: 1.25rem;
  font-size: 0.875rem;
  font-weight: 700;
  color: #fff;
  box-shadow: 0 4px 14px rgba(67, 165, 87, 0.3);
  transition: background-color 0.2s;
}
.btn-header:hover {
  background-color: var(--brand-600);
}

/* ========== Hero Section ========== */
.hero {
  position: relative;
  overflow: hidden;
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
  border: 1px solid var(--border-green);
  background: #fff;
  padding: 0.5rem 1rem;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--brand-500);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
}
.badge-dot {
  height: 0.5rem;
  width: 0.5rem;
  border-radius: 50%;
  background-color: var(--brand-500);
  flex-shrink: 0;
}

h1 {
  margin-top: 1.25rem;
  font-size: clamp(1.9rem, 3.2vw, 2.8rem);
  font-weight: 900;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: var(--brand-dark);
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
  color: var(--text-muted);
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
  border: 1px solid var(--border-green);
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
  background-color: var(--brand-500);
  color: #fff;
  flex-shrink: 0;
}
.float-card p.title {
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--green-dark);
}
.float-card p.sub {
  font-size: 0.75rem;
  color: var(--text-muted);
}

.float-card-analytics {
  border-color: var(--border-blue);
}
.float-card-analytics .label {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--blue-mid);
}
.float-card-analytics .number {
  margin-top: 0.25rem;
  font-size: 1.5rem;
  font-weight: 900;
  color: var(--blue-dark);
}
.float-card-analytics .caption {
  font-size: 0.75rem;
  color: var(--text-muted);
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
  color: var(--brand-500);
}

h2 {
  margin-top: 0.75rem;
  font-size: clamp(1.75rem, 3vw, 2.25rem);
  font-weight: 900;
  letter-spacing: -0.02em;
  color: var(--brand-dark);
}

.body-text {
  margin-top: 1.25rem;
  line-height: 1.75;
  color: var(--text-muted);
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
  border: 1px solid var(--border-green);
  background: linear-gradient(135deg, #f4fff6, #d4f0dc);
}
.stat-card.blue {
  border: 1px solid var(--border-blue);
  background: linear-gradient(135deg, #f5f9ff, #d6e4f9);
}
.stat-card.purple {
  border: 1px solid var(--border-purple);
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
  color: var(--green-dark);
}
.stat-card.green .stat-desc {
  color: #2d6b3a;
}
.stat-card.blue .stat-label {
  color: var(--blue-mid);
}
.stat-card.blue .stat-number {
  color: var(--blue-dark);
}
.stat-card.blue .stat-desc {
  color: #2d4a9e;
}
.stat-card.purple .stat-label {
  color: #8b6ee8;
}
.stat-card.purple .stat-number {
  color: var(--purple-dark);
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
  color: var(--text-muted);
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
  border: 1px solid var(--border-green);
  background: linear-gradient(135deg, #f4fff6, #d4f0dc);
}
.value-card.blue {
  border: 1px solid var(--border-blue);
  background: linear-gradient(135deg, #f5f9ff, #d6e4f9);
}
.value-card.purple {
  border: 1px solid var(--border-purple);
  background: linear-gradient(135deg, #faf7ff, #e5dcf9);
}
.value-card.yellow {
  border: 1px solid var(--border-yellow);
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
  color: var(--brand-500);
}
.value-card.blue .value-icon {
  color: var(--blue-mid);
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
  color: var(--green-dark);
}
.value-card.blue h3 {
  color: var(--blue-dark);
}
.value-card.purple h3 {
  color: var(--purple-dark);
}
.value-card.yellow h3 {
  color: var(--yellow-dark);
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
  background: var(--brand-500);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.16);
}
.team-card.blue-role .team-accent {
  background: var(--blue-mid);
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
  color: var(--brand-dark);
}
.team-card .role {
  margin-top: 0.25rem;
  font-size: 0.875rem;
  font-weight: 700;
}
.team-card.green-role .role {
  color: var(--brand-500);
}
.team-card.blue-role .role {
  color: var(--blue-mid);
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
  color: var(--text-muted);
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
  color: var(--brand-500);
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

/* ========== Footer ========== */
footer {
  position: relative;
  overflow: hidden;
  border-top: 1px solid #34d399;
  background: linear-gradient(135deg, #f9fcf8, #eaf8ee 50%, #d6f1e7);
  color: #334155;
}

.footer-blob1 {
  pointer-events: none;
  position: absolute;
  top: -5rem;
  left: -5rem;
  height: 18rem;
  width: 18rem;
  border-radius: 50%;
  background: rgba(110, 231, 183, 0.15);
  filter: blur(48px);
}
.footer-blob2 {
  pointer-events: none;
  position: absolute;
  bottom: 0;
  right: 0;
  height: 20rem;
  width: 20rem;
  border-radius: 50%;
  background: rgba(147, 197, 253, 0.1);
  filter: blur(48px);
}
.footer-blob3 {
  pointer-events: none;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  height: 16rem;
  width: 16rem;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.4);
  filter: blur(48px);
}

.footer-inner {
  position: relative;
  max-width: 80rem;
  margin-inline: auto;
  padding: 4rem 1rem 3rem;
}
@media (min-width: 640px) {
  .footer-inner {
    padding-inline: 1.5rem;
  }
}
@media (min-width: 1024px) {
  .footer-inner {
    padding-top: 6rem;
    padding-inline: 2rem;
  }
}

.footer-grid {
  display: grid;
  gap: 3rem;
}
@media (min-width: 1280px) {
  .footer-grid {
    grid-template-columns: 2fr 3fr;
  }
}

.footer-brand-link {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: #0f172a;
  transition: opacity 0.2s;
}
.footer-brand-link:hover {
  opacity: 0.9;
}

.footer-brand-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2.5rem;
  width: 2.5rem;
  border-radius: 0.75rem;
  background: #059669;
  color: #fff;
  box-shadow: 0 4px 12px rgba(5, 150, 105, 0.2);
}
.footer-brand-icon svg {
  height: 1.25rem;
  width: 1.25rem;
}

.footer-tagline {
  margin-top: 1.5rem;
  max-width: 28rem;
  font-size: 0.875rem;
  line-height: 1.75;
  color: #475569;
}

.footer-links-grid {
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(2, 1fr);
}
@media (min-width: 640px) {
  .footer-links-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.footer-col h3 {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #16a34a;
}

.footer-col ul {
  margin-top: 1rem;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.footer-col a {
  display: inline-flex;
  font-size: 0.875rem;
  color: #334155;
  transition:
    color 0.2s,
    transform 0.2s;
}
.footer-col a:hover {
  color: #059669;
  transform: translateX(4px);
}

.footer-newsletter-desc {
  margin-top: 1rem;
  font-size: 0.75rem;
  line-height: 1.6;
  color: #475569;
}

.newsletter-form {
  margin-top: 0.75rem;
  display: flex;
  max-width: 20rem;
  position: relative;
}
.newsletter-input {
  width: 100%;
  border-radius: 0.75rem;
  border: 1px solid #bbf7d0;
  background: rgba(255, 255, 255, 0.8);
  padding: 0.625rem 0.75rem;
  padding-right: 2.5rem;
  font-size: 0.75rem;
  color: #0f172a;
  outline: none;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;
  font-family: inherit;
}
.newsletter-input::placeholder {
  color: #94a3b8;
}
.newsletter-input:focus {
  border-color: #059669;
  box-shadow: 0 0 0 3px rgba(5, 150, 105, 0.1);
}
.newsletter-btn {
  position: absolute;
  right: 0.375rem;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  border-radius: 0.375rem;
  background: #059669;
  color: #fff;
  padding: 0.25rem;
  cursor: pointer;
  transition:
    background 0.2s,
    transform 0.1s;
  display: flex;
  align-items: center;
}
.newsletter-btn:hover {
  background: #047857;
}
.newsletter-btn:active {
  transform: translateY(-50%) scale(0.95);
}
.newsletter-btn svg {
  height: 0.875rem;
  width: 0.875rem;
}

.footer-bottom {
  margin-top: 4rem;
  padding-top: 2rem;
  border-top: 1px solid #34d399;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}
@media (min-width: 640px) {
  .footer-bottom {
    flex-direction: row;
    justify-content: space-between;
  }
}

.footer-legal {
  order: 2;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0.75rem 1.5rem;
  font-size: 0.75rem;
  color: #64748b;
}
@media (min-width: 640px) {
  .footer-legal {
    order: 1;
  }
}

.footer-legal a {
  color: #64748b;
  transition: color 0.2s;
}
.footer-legal a:hover {
  color: #475569;
}

.footer-social {
  order: 1;
  display: flex;
  align-items: center;
  gap: 1rem;
}
@media (min-width: 640px) {
  .footer-social {
    order: 2;
  }
}

.social-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2rem;
  width: 2rem;
  border-radius: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.7);
  background: rgba(255, 255, 255, 0.8);
  color: #94a3b8;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  transition:
    border-color 0.2s,
    color 0.2s;
}
.social-btn:hover {
  border-color: #cbd5e1;
  color: #475569;
}
.social-btn svg {
  height: 1rem;
  width: 1rem;
}

/* newsletter col span on small */
.newsletter-col {
  grid-column: 1 / -1;
}
@media (min-width: 640px) {
  .newsletter-col {
    grid-column: auto;
  }
}
</style>
