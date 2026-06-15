<template>
  <div class="landing-page-wrapper">
    <Navbar />

    <main>
      <section class="hero">
        <div class="hero-mesh-bg">
          <div class="mesh-blob blob-1"></div>
          <div class="mesh-blob blob-2"></div>
          <div class="mesh-blob blob-3"></div>
        </div>
        <div class="dot-grid-pattern"></div>
        <div class="tech-wave-overlay">
          <svg viewBox="0 0 1440 320" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,192 C240,224 480,256 720,224 C960,192 1200,96 1440,128 L1440,320 L720,320 L0,320 Z" fill="rgba(16, 185, 129, 0.02)"/>
            <path d="M0,128 C240,160 480,192 720,160 C960,128 1200,32 1440,64 L1440,320 L720,320 L0,320 Z" fill="rgba(59, 130, 246, 0.01)"/>
          </svg>
        </div>

        <div class="hero-inner container">
          <div class="hero-content reveal reveal-left">
            <p class="hero-badge">
              <span class="hero-badge-dot"></span>
              ប្រព័ន្ធវាយតម្លៃសិក្សាជំនាន់ថ្មី
            </p>
            <h1 class="hero-title">
              គ្រប់គ្រងការប្រឡង <br>
              ណែនាំសិស្ស និង <br>
              <span class="highlight">តាមដានលទ្ធផល</span>
            </h1>
            <p class="hero-desc">
              បង្កើតបន្ទប់ប្រឡងអនឡាញដែលមានសុវត្ថិភាពខ្ពស់ តាមដានសកម្មភាពសិស្សជាពេលវេលាពិត និងពិនិត្យមើលលទ្ធផលនៃការវាយតម្លៃយ៉ាងងាយស្រួលក្នុងប្រព័ន្ធតែមួយ។
            </p>
            <div class="hero-cta">
              <a href="#" class="btn-hero-primary">
                ចាប់ផ្ដើមឥឡូវនេះ
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="cta-arrow-icon">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
              <a class="btn-hero-secondary" href="#features">
                ស្វែងយល់បន្ថែម
              </a>
            </div>
            
            <!-- ស្ថិតិ -->
            <dl class="hero-stats">
              <div class="stat-item">
                <dt class="stat-value">50k+</dt>
                <dd class="stat-label">សិស្សប្រើប្រាស់</dd>
              </div>
              <div class="stat-item">
                <dt class="stat-value">10k+</dt>
                <dd class="stat-label">ការប្រឡងរួចរាល់</dd>
              </div>
              <div class="stat-item">
                <dt class="stat-value">99.9%</dt>
                <dd class="stat-label">ស្ថិរភាពប្រព័ន្ធ</dd>
              </div>
            </dl>
          </div>
          <div class="hero-visual reveal reveal-right">
            <div class="hero-mockup-container">
              <!-- Animated Background Ring -->
              <div class="animated-ring"></div>
              
              <div class="dashboard-mockup">
                <div class="mockup-mesh"></div>
                
                <div class="dashboard-header">
                  <div class="window-dots">
                    <span class="window-dot red"></span>
                    <span class="window-dot yellow"></span>
                    <span class="window-dot green"></span>
                  </div>
                  <div class="live-indicator">
                    <span class="live-dot"></span>
                    ផ្សាយផ្ទាល់ • ការប្រឡងកំពុងដំណើរការ
                  </div>
                </div>
                
              </div>
              
              <!-- Subtle decorative illustration representing digital exam growth -->
              <div class="floating-illustration">
                <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 100 L40 70 L60 85 L100 30" stroke="url(#gradient-line)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                  <circle cx="100" cy="30" r="6" fill="#10b981" />
                  <defs>
                    <linearGradient id="gradient-line" x1="20" y1="100" x2="100" y2="30" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stop-color="#3b82f6" />
                      <stop offset="100%" stop-color="#10b981" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ═══════════════════ មុខងារស្នូល (Features) ═══════════════════ -->
      <section id="features" class="section-padding premium-bg">
        <div class="container">
          <div class="text-center section-header reveal reveal-up">
            <p class="section-label">ប្រព័ន្ធស្នូល</p>
            <h2 class="section-title">គ្រប់យ៉ាង មុន ពេល និងក្រោយការប្រឡង</h2>
            <p class="section-desc">
              កម្រងឧបករណ៍វាយតម្លៃដ៏ទំនើបដែលគ្របដណ្ដប់ការរៀបចំការប្រឡងទាំងមូលសម្រាប់ស្ថាប័នរបស់អ្នក។
            </p>
          </div>

          <div class="features-grid">
            <!-- Card 01 - Green (Reveal Up with Stagger Delay) -->
            <article class="feature-card green reveal reveal-up" style="transition-delay: 150ms;">
              <div class="card-top">
                <!-- Premium High-Quality Modern Vector Image Overlay representing room setup -->
                <div class="card-vector-overlay">
                  <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg" class="feature-vector-img">
                    <rect x="30" y="20" width="140" height="80" rx="12" fill="rgba(16, 185, 129, 0.03)" stroke="rgba(16, 185, 129, 0.1)" stroke-width="1.5"/>
                    <line x1="50" y1="45" x2="110" y2="45" stroke="rgba(16, 185, 129, 0.2)" stroke-width="3" stroke-linecap="round"/>
                    <line x1="50" y1="60" x2="150" y2="60" stroke="rgba(16, 185, 129, 0.15)" stroke-width="3" stroke-linecap="round"/>
                    <line x1="50" y1="75" x2="130" y2="75" stroke="rgba(16, 185, 129, 0.15)" stroke-width="3" stroke-linecap="round"/>
                    <circle cx="160" cy="35" r="10" fill="rgba(16, 185, 129, 0.08)"/>
                    <path d="M157 35 L159 38 L163 33" stroke="#10b981" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
                <div class="feature-icon-wrapper">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div class="card-body">
                <span class="card-number">០១ / បន្ទប់ប្រឡង</span>
                <h3 class="card-title">រៀបចំបន្ទប់បានរហ័ស</h3>
                <p class="card-text">
                  បង្កើតបន្ទប់ប្រឡង បញ្ចូលកម្រងសំណួរ កំណត់ពេលវេលា និងចែករំលែកកូដសម្ងាត់ទៅកាន់សិស្សក្នុងរយៈពេលតែប៉ុន្មានវិនាទីប៉ុណ្ណោះ។
                </p>
                <div class="card-footer">
                  <span class="card-footer-dot"></span>
                  ដំណើរការរហ័ស និងងាយស្រួល
                </div>
              </div>
            </article>

            <!-- Card 02 - Blue (Reveal Up with Stagger Delay) -->
            <article class="feature-card blue reveal reveal-up" style="transition-delay: 300ms;">
              <div class="card-top">
                <!-- Premium High-Quality Modern Vector Image Overlay representing security shield -->
                <div class="card-vector-overlay">
                  <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg" class="feature-vector-img">
                    <path d="M100 20 C120 20 150 25 150 55 C150 85 100 105 100 105 C100 105 50 85 50 55 C50 25 80 20 100 20 Z" fill="rgba(59, 130, 246, 0.03)" stroke="rgba(59, 130, 246, 0.1)" stroke-width="1.5"/>
                    <circle cx="100" cy="58" r="16" fill="rgba(59, 130, 246, 0.08)"/>
                    <path d="M93 58 L98 63 L107 53" stroke="#3b82f6" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
                <div class="feature-icon-wrapper">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
              </div>
              <div class="card-body">
                <span class="card-number">០២ / សុវត្ថិភាពខ្ពស់</span>
                <h3 class="card-title">ដំណើរការសិស្សមានសុវត្ថិភាព</h3>
                <p class="card-text">
                  សិស្សានុសិស្សចូលរួមធ្វើតេស្តដោយភាពរលូន និងមានសុវត្ថិភាពខ្ពស់ ធានាបាននូវភាពស្មោះត្រង់ និងការពាររាល់ការលួចចម្លងពីកម្មវិធីផ្សេង។
                </p>
                <div class="card-footer">
                  <span class="card-footer-dot"></span>
                  ប្រព័ន្ធការពារការលួចចម្លង
                </div>
              </div>
            </article>

            <!-- Card 03 - Purple (Reveal Up with Stagger Delay) -->
            <article class="feature-card purple reveal reveal-up" style="transition-delay: 450ms;">
              <div class="card-top">
                <!-- Premium High-Quality Modern Vector Image Overlay representing analytics chart -->
                <div class="card-vector-overlay">
                  <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg" class="feature-vector-img">
                    <rect x="40" y="30" width="120" height="60" rx="8" fill="rgba(139, 92, 246, 0.02)" stroke="rgba(139, 92, 246, 0.1)" stroke-width="1.5"/>
                    <rect x="60" y="60" width="15" height="20" rx="3" fill="rgba(139, 92, 246, 0.2)"/>
                    <rect x="85" y="45" width="15" height="35" rx="3" fill="#8b5cf6"/>
                    <rect x="110" y="55" width="15" height="25" rx="3" fill="rgba(139, 92, 246, 0.2)"/>
                    <rect x="135" y="38" width="15" height="42" rx="3" fill="#a78bfa"/>
                  </svg>
                </div>
                <div class="feature-icon-wrapper">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
              </div>
              <div class="card-body">
                <span class="card-number">០៣ / ការវិភាគទិន្នន័យ</span>
                <h3 class="card-title">ការវិភាគលទ្ធផលលម្អិត</h3>
                <p class="card-text">
                  ទទួលបានទិន្នន័យនៃការវាយតម្លៃភ្លាមៗ របាយការណ៍ស្ថិតិលម្អិតពីចំណុចខ្លាំងនិងចំណុចខ្សោយរបស់សិស្សម្នាក់ៗយ៉ាងច្បាស់លាស់។
                </p>
                <div class="card-footer">
                  <span class="card-footer-dot"></span>
                  ស្ថិតិស្វ័យប្រវត្តិតាមពេលវេលាពិត
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <!-- ═══════════════════ ផ្នែកតួនាទី (Roles) ═══════════════════ -->
      <section id="roles" class="section-padding">
        <div class="container roles-layout">
          <!-- ខាងឆ្វេង (Slide from Left with slow animation) -->
          <div class="roles-info reveal reveal-left">
            <p class="section-label">ផ្អែកលើតួនាទី</p>
            <h2 class="section-title">ផ្ទាំងគ្រប់គ្រងដាច់ដោយឡែក សម្រាប់គ្រប់តួនាទី</h2>
            <p class="section-desc">
              សិស្ស គ្រូ និងអ្នកគ្រប់គ្រងម្នាក់ៗទទួលបានកន្លែងធ្វើការ និងផ្ទាំងគ្រប់គ្រងដែលរចនាឡើងយ៉ាងផ្តោតច្បាស់លាស់ មិនរញ៉េរញ៉ៃ និងងាយស្រួលយល់បំផុត។
            </p>
          </div>

          <!-- ខាងស្តាំ (Staggered Reveals from Right) -->
          <div class="role-cards-stack">
            <!-- Student -->
            <div class="role-card-item green reveal reveal-right" style="transition-delay: 150ms;">
              <div class="role-avatar">សិ</div>
              <div class="role-details">
                <h3>សម្រាប់សិស្សានុសិស្ស</h3>
                <p>ចូលរួមក្នុងបន្ទប់ប្រឡងបានលឿន ធ្វើតេស្តដោយរលូនលើគ្រប់ឧបករណ៍ និងទទួលបានលទ្ធផលវាយតម្លៃផ្ទាល់ខ្លួនភ្លាមៗ។</p>
              </div>
            </div>

            <!-- Teacher -->
            <div class="role-card-item blue reveal reveal-right" style="transition-delay: 300ms;">
              <div class="role-avatar">គ</div>
              <div class="role-details">
                <h3>សម្រាប់លោកគ្រូ អ្នកគ្រូ</h3>
                <p>បង្កើតវិញ្ញាសា កំណត់ពេលវេលាប្រឡង ត្រួតពិនិត្យដំណើរការរបស់សិស្សជាពេលវេលាពិត និងកែសម្រួលលទ្ធផលដោយស្វ័យប្រវត្ត។</p>
              </div>
            </div>

            <!-- Admin -->
            <div class="role-card-item purple reveal reveal-right" style="transition-delay: 450ms;">
              <div class="role-avatar">អ</div>
              <div class="role-details">
                <h3>សម្រាប់អ្នកគ្រប់គ្រងសាលា</h3>
                <p>គ្រប់គ្រងអ្នកប្រើប្រាស់ គណនីគ្រូនិងសិស្ស ពិនិត្យមើលស្ថិតិរួមទូទាំងស្ថាប័ន និងធានាបាននូវសុវត្ថិភាពទិន្នន័យ។</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ═══════════════════ អត្ថប្រយោជន៍ (Benefits) ═══════════════════ -->
      <section id="benefits" class="section-padding white-bg">
        <div class="container">
          <div class="text-center section-header reveal reveal-up">
            <p class="section-label">ហេតុអ្វីជ្រើសរើស PROLONG</p>
            <h2 class="section-title">បង្កើតឡើងសម្រាប់សាលារៀនសម័យថ្មី</h2>
          </div>

          <div class="benefits-grid">
            <!-- Card 1 (Scale Reveal) -->
            <div class="benefit-item green reveal reveal-scale" style="transition-delay: 100ms;">
              <div class="benefit-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3>លឿនបំផុត</h3>
              <p>ដំណើរការបង្កើតបន្ទប់ប្រឡង និងការឆ្លើយតបលទ្ធផលប្រព្រឹត្តទៅក្នុងពេលភ្លាមៗ គ្មានការរង់ចាំយូរ។</p>
            </div>

            <!-- Card 2 (Scale Reveal) -->
            <div class="benefit-item blue reveal reveal-scale" style="transition-delay: 200ms;">
              <div class="benefit-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3>សុវត្ថិភាពខ្ពស់</h3>
              <p>ការការពារ និងរក្សាការសម្ងាត់ទិន្នន័យផ្ទាល់ខ្លួនរបស់សិស្សានុសិស្ស និងវិញ្ញាសាប្រឡងកម្រាស់ខ្ពស់បំផុត។</p>
            </div>

            <!-- Card 3 (Scale Reveal) -->
            <div class="benefit-item purple reveal reveal-scale" style="transition-delay: 300ms;">
              <div class="benefit-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3>ការវិភាគលម្អិត</h3>
              <p>តាមដានរាល់វឌ្ឍនភាពសិក្សារបស់សិស្សម្នាក់ៗតាមតារាងស្ថិតិច្បាស់លាស់ និងអាចទាញចេញបាន។</p>
            </div>

            <!-- Card 4 (Scale Reveal) -->
            <div class="benefit-item amber reveal reveal-scale" style="transition-delay: 400ms;">
              <div class="benefit-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3>ងាយស្រួលបំផុត</h3>
              <p>ផ្ទៃកម្មវិធីដែលត្រូវបានរចនាឡើងយ៉ាងស្អាត សាមញ្ញ ងាយស្រួលយល់ និងងាយស្រួលប្រើប្រាស់បំផុត។</p>
            </div>
          </div>
        </div>
      </section>

      <!-- ═══════════════════ ផ្នែកជំហាន (Steps) ═══════════════════ -->
      <section id="steps" class="section-padding">
        <div class="container">
          <div class="text-center section-header reveal reveal-up">
            <p class="section-label">របៀបដំណើរការ</p>
            <h2 class="section-title">ចាប់ផ្តើមក្នុងជំហានសាមញ្ញចំនួនបី</h2>
          </div>

          <div class="steps-container">
            <!-- Smooth dotted SVG path connecting steps precisely -->
            <div class="steps-connector-svg">
              <svg viewBox="0 0 1000 100" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%">
                <path d="M 166 50 Q 500 50 833 50" stroke="rgba(16, 185, 129, 0.2)" stroke-width="2" stroke-dasharray="6, 6" />
              </svg>
            </div>

            <div class="steps-grid">
              <!-- ជំហានទី 1 -->
              <div class="step-item reveal reveal-up" style="transition-delay: 150ms;">
                <div class="step-badge">1</div>
                <h3>បង្កើតការប្រឡង</h3>
                <p>រៀបចំបន្ទប់ប្រឡង បញ្ចូលកម្រងសំណួររបស់អ្នក និងកំណត់ពេលវេលាយ៉ាងលឿនបំផុត។</p>
              </div>

              <!-- ជំហានទី 2 -->
              <div class="step-item reveal reveal-up" style="transition-delay: 300ms;">
                <div class="step-badge">2</div>
                <h3>អញ្ជើញសិស្សានុសិស្ស</h3>
                <p>ចែករំលែកកូដសម្ងាត់ ឬតំណភ្ជាប់ទៅកាន់សិស្ស ដើម្បីចូលរួមប្រឡងដោយគ្មានការស្មុគស្មាញ។</p>
              </div>

              <!-- ជំហានទី 3 -->
              <div class="step-item reveal reveal-up" style="transition-delay: 450ms;">
                <div class="step-badge">3</div>
                <h3>ពិនិត្យលទ្ធផល</h3>
                <p>ទទួលបានលទ្ធផលវាយតម្លៃភ្លាមៗ ការវិភាគលម្អិត និងរបាយការណ៍ដែលស្រស់ស្អាត។</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- ═══════════════════ បាតទំព័រ ═══════════════════ -->
    <Footer />
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from "vue";

import Navbar from "@/components/layout/navbar/landing/LandingPageNavebar.vue";
import Footer from "@/components/layout/navbar/landing/FooterLandingPage.vue";

let observer;

onMounted(() => {
  const elements = document.querySelectorAll(".reveal");

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    {
      threshold: 0.15,
    }
  );

  elements.forEach((el) => observer.observe(el));
});

onBeforeUnmount(() => {
  if (observer) observer.disconnect();
});
</script>

<style scoped>

.landing-page-wrapper {      
  background-color: #f7faf9;
  min-height: 100vh;
  overflow-x: hidden;
}

/* ─── Scroll Reveal Premium Smooth Styles ─── */
.reveal {
  opacity: 0;
  will-change: transform, opacity;
  /* Premium ultra-slow transition easing curves for highly polished professional look */
  transition: transform 1.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 1.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.reveal-up {
  transform: translateY(2rem);
}

.reveal-left {
  transform: translateX(-2rem);
}

.reveal-right {
  transform: translateX(2rem);
}

.reveal-scale {
  transform: scale(0.96);
}

/* Activated State */
.reveal.visible {
  opacity: 1;
  transform: translate(0) scale(1);
}

/* ─── Layout Container ─── */
.container {
  width: 100%;
  max-width: 80rem; /* 1280px */
  margin-inline: auto;
  padding-inline: 1.5rem;
}

/* ─── ផ្នែកដំបូង (Hero) ─── */
.hero {
  position: relative;
  /* Beautifully aligned next to the Navbar with short clean gap */
  padding-top: 4.5rem;
  padding-bottom: 6rem;
  overflow: hidden;
  background: radial-gradient(circle at 85% 15%, rgba(209, 250, 229, 0.45) 0%, transparent 50%),
              radial-gradient(circle at 15% 85%, rgba(219, 234, 254, 0.3) 0%, transparent 50%);
}

.hero-mesh-bg {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 1;
}

.mesh-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(95px);
  opacity: 0.55;
  mix-blend-mode: multiply;
  will-change: transform;
}

.blob-1 {
  top: -10%;
  right: 15%;
  width: 38rem;
  height: 38rem;
  background: radial-gradient(circle, rgba(16, 185, 129, 0.18) 0%, rgba(52, 211, 153, 0.04) 100%);
  animation: float-slow 18s infinite alternate;
}

.blob-2 {
  bottom: -5%;
  left: 5%;
  width: 32rem;
  height: 32rem;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.12) 0%, rgba(147, 197, 253, 0.03) 100%);
  animation: float-slow 22s infinite alternate-reverse;
}

.blob-3 {
  top: 40%;
  right: 45%;
  width: 22rem;
  height: 22rem;
  background: radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, rgba(196, 181, 253, 0.01) 100%);
}

.dot-grid-pattern {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(rgba(15, 23, 42, 0.035) 1.5px, transparent 1.5px);
  background-size: 24px 24px;
  pointer-events: none;
  z-index: 2;
  opacity: 0.85;
}

.tech-wave-overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 2;
}

.hero-inner {
  position: relative;
  z-index: 3;
  display: grid;
  gap: 3.5rem;
  align-items: center;
}

@media (min-width: 1024px) {
  .hero-inner {
    grid-template-columns: 1.05fr 0.95fr;
    gap: 4.5rem;
  }
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.375rem 0.875rem;
  background: #ffffff;
  border: 1px solid rgba(16, 185, 129, 0.12);
  border-radius: 9999px;
  color: #059669;
  font-weight: 700;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 1.25rem;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.04);
}

.hero-badge-dot {
  width: 0.45rem;
  height: 0.45rem;
  background: #10b981;
  border-radius: 50%;
  animation: pulse-slow 2.5s infinite;
}

.hero-title {
  font-size: clamp(2.25rem, 4.5vw, 3.25rem);
  font-weight: 800;
  line-height: 1.22;
  color: #0f172a;
  margin-bottom: 1.25rem;
  letter-spacing: -0.015em;
}

.hero-title .highlight {
  position: relative;
  color: #10b981;
  display: inline-block;
}

.hero-title .highlight::after {
  content: '';
  position: absolute;
  bottom: 6px;
  left: 0;
  width: 100%;
  height: 6px;
  background: rgba(16, 185, 129, 0.12);
  z-index: -1;
  border-radius: 4px;
}

.hero-desc {
  font-size: 1.0625rem;
  color: #475569;
  margin-bottom: 2.25rem;
  max-width: 34rem;
  line-height: 1.75;
}

.hero-cta {
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
  margin-bottom: 3.5rem;
}

@media (min-width: 640px) {
  .hero-cta {
    flex-direction: row;
  }
}

.btn-hero-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: #10b981;
  color: white;
  border: none;
  font-weight: 700;
  font-size: 0.95rem;
  padding: 0.9375rem 1.875rem;
  border-radius: 1.5rem;
  box-shadow: 0 8px 25px rgba(16, 185, 129, 0.15);
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  text-decoration: none;
}

.btn-hero-primary:hover {
  background: #059669;
  transform: translateY(-2px);
  box-shadow: 0 12px 30px rgba(16, 185, 129, 0.25);
}

.btn-hero-primary:hover .cta-arrow-icon {
  transform: translateX(4px);
}

.cta-arrow-icon {
  width: 1.125rem;
  height: 1.125rem;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.btn-hero-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: white;
  border: 1px solid #f1f5f9;
  color: #475569;
  font-weight: 700;
  font-size: 0.95rem;
  padding: 0.9375rem 1.875rem;
  border-radius: 1.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.02);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  text-decoration: none;
}

.btn-hero-secondary:hover {
  border-color: #10b981;
  color: #10b981;
  transform: translateY(-2px);
  box-shadow: 0 4px 20px -2px rgba(15, 23, 42, 0.03);;
}

/* Hero Stats */
.hero-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  padding-top: 1.75rem;
  border-top: 1px solid #f1f5f9;
}

.stat-item {
  display: flex;
  flex-direction: column;
}

.stat-value {
  font-size: 1.75rem;
  font-weight: 800;
  color: #0f172a;
  line-height: 1.1;
}

.stat-item dd {
  font-size: 0.8125rem;
  color: #64748b;
  margin-top: 0.375rem;
  font-weight: 500;
}

/* Hero Mockup Frame Styles */
.hero-mockup-container {
  position: relative;
  width: 100%;
}

.animated-ring {
  position: absolute;
  inset: -1.5rem;
  border: 1.5px solid rgba(16, 185, 129, 0.1);
  border-radius: 2rem;
  pointer-events: none;
  z-index: 1;
  animation: pulse-ring 4s infinite alternate ease-in-out;
}

@keyframes pulse-ring {
  0% { transform: scale(0.98); opacity: 0.6; }
  100% { transform: scale(1.02); opacity: 1; }
}

.floating-illustration {
  position: absolute;
  bottom: -2rem;
  left: -2rem;
  z-index: 3;
  pointer-events: none;
  animation: float-slow-visual 6s infinite alternate ease-in-out;
  display: none;
}

@media (min-width: 640px) {
  .floating-illustration {
    display: block;
  }
}

@keyframes float-slow-visual {
  0% { transform: translateY(0) rotate(0deg); }
  100% { transform: translateY(-8px) rotate(4deg); }
}

/* Interactive Mockup Dashboard (Accurate with image_959b7c.jpg style) */
.dashboard-mockup {
  position: relative;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.7);
  box-shadow: 0 35px 70px -15px rgba(15, 23, 42, 0.07), 
              0 0 0 1px rgba(16, 185, 129, 0.02), 
              inset 0 1px 1.5px rgba(255, 255, 255, 0.95);
  padding: 1.75rem;
  overflow: hidden;
  width: 100%;
  z-index: 2;
}

.mockup-mesh {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 100% 0%, rgba(16, 185, 129, 0.05) 0%, transparent 60%);
  pointer-events: none;
}

.dashboard-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  padding-bottom: 1.125rem;
  border-bottom: 1px solid #f1f5f9;
  position: relative;
  z-index: 2;
}

.window-dots {
  display: flex;
  gap: 0.45rem;
}

.window-dot {
  width: 0.65rem;
  height: 0.65rem;
  border-radius: 50%;
}
.window-dot.red { background-color: #ff5f56; }
.window-dot.yellow { background-color: #ffbd2e; }
.window-dot.green { background-color: #27c93f; }

.live-indicator {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.3rem 0.75rem;
  background: rgba(239, 68, 68, 0.06);
  border: 1px solid rgba(239, 68, 68, 0.1);
  color: #ef4444;
  font-size: 0.75rem;
  font-weight: 700;
  border-radius: 9999px;
}

.live-dot {
  width: 0.375rem;
  height: 0.375rem;
  background: #ef4444;
  border-radius: 50%;
  animation: pulse-slow 1.5s infinite alternate;
}

/* Dashboard UI Elements with slow, deliberate transitions */
.mock-list {
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
  position: relative;
  z-index: 2;
}

.mock-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.875rem 1.25rem;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 1rem;
  border: 1px solid rgba(15, 23, 42, 0.015);
  transition: all 1.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.item-highlight {
  transform: scale(1.02);
  background-color: rgba(16, 185, 129, 0.04);
  border-color: rgba(16, 185, 129, 0.12);
  box-shadow: 0 4px 20px rgba(16, 185, 129, 0.02);
}

.student-profile {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.student-avatar {
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-weight: 700;
  font-size: 0.8125rem;
  box-shadow: inset 0 2px 4px rgba(15, 23, 42, 0.02);
}

.student-info h4 {
  font-size: 0.875rem;
  font-weight: 700;
  color: #0f172a;
}

.student-meta {
  font-size: 0.75rem;
  color: #64748b;
  display: flex;
  align-items: center;
  gap: 0.45rem;
  margin-top: 0.125rem;
}

.student-meta-text {
  font-size: 0.75rem;
}

.status-indicator-mini {
  width: 0.375rem;
  height: 0.375rem;
  border-radius: 50%;
  display: inline-block;
}

.student-action-area {
  display: flex;
  align-items: center;
  gap: 1.25rem;
}

/* Sleek active progress bars inside mock students */
.student-progress-bar {
  width: 4rem;
  height: 5px;
  background-color: rgba(15, 23, 42, 0.05);
  border-radius: 999px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  border-radius: 999px;
  transition: width 1.5s cubic-bezier(0.16, 1, 0.3, 1);
}

/* Correctly styled status badges dynamically matching the visual assets */
.student-status-badge {
  font-size: 0.725rem;
  font-weight: 700;
  padding: 0.35rem 0.875rem;
  border-radius: 9999px;
  letter-spacing: 0.01em;
  border: 1px solid transparent;
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

/* Custom list items transition speeds */
.list-complete-enter-active,
.list-complete-leave-active {
  transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
}
.list-complete-enter-from,
.list-complete-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

/* ─── ផ្នែកមុខងារ (Features) ─── */
.section-padding {
  padding-block: 6rem;
}

.premium-bg {
  background-color: #fafbfc;
}

.white-bg {
  background-color: #ffffff;
}

.text-center {
  text-align: center;
}

.section-header {
  max-width: 42rem;
  margin-inline: auto;
  margin-bottom: 4rem;
}

.section-label {
  font-size: 0.75rem;
  font-weight: 700;
  color: #10b981;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  margin-bottom: 0.625rem;
  display: inline-block;
}

.section-title {
  font-size: clamp(1.75rem, 3.5vw, 2.25rem);
  font-weight: 800;
  color: #0f172a;
  line-height: 1.3;
  letter-spacing: -0.015em;
}

.section-desc {
  font-size: 1rem;
  color: #64748b;
  margin-top: 0.75rem;
}

.features-grid {
  display: grid;
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .features-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 1.75rem;
  }
}

/* Feature Cards Redesign */
.feature-card {
  background: #ffffff;
  border-radius: 1.5rem;
  border: 1px solid rgba(15, 23, 42, 0.04);
  overflow: hidden;
  box-shadow: 0 4px 20px -2px rgba(15, 23, 42, 0.02);
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  display: flex;
  flex-direction: column;
}

.feature-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 35px 70px -15px rgba(15, 23, 42, 0.07);
  border-color: rgba(16, 185, 129, 0.08);
}

.card-top {
  height: 8rem;
  position: relative;
  display: flex;
  align-items: flex-end;
  padding: 1.5rem;
  overflow: hidden;
}

.card-vector-overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.feature-vector-img {
  width: 90%;
  height: 90%;
  opacity: 0.85;
}

.feature-card.green .card-top { background: linear-gradient(135deg, #f0fdf4 0%, #ffffff 100%); }
.feature-card.blue .card-top { background: linear-gradient(135deg, #eff6ff 0%, #ffffff 100%); }
.feature-card.purple .card-top { background: linear-gradient(135deg, #f5f3ff 0%, #ffffff 100%); }

.feature-icon-wrapper {
  position: absolute;
  bottom: -1.25rem;
  left: 1.5rem;
  width: 3rem;
  height: 3rem;
  border-radius: 0.875rem;
  display: grid;
  place-items: center;
  color: white;
  box-shadow: 0 4px 20px -2px rgba(15, 23, 42, 0.03);;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 2;
}

.feature-card:hover .feature-icon-wrapper {
  transform: scale(1.08) rotate(3deg);
}

.feature-card.green .feature-icon-wrapper { background: #10b981; box-shadow: 0 4px 14px rgba(16, 185, 129, 0.2); }
.feature-card.blue .feature-icon-wrapper { background: #3b82f6; box-shadow: 0 4px 14px rgba(59, 130, 246, 0.2); }
.feature-card.purple .feature-icon-wrapper { background: #8b5cf6; box-shadow: 0 4px 14px rgba(139, 92, 246, 0.2); }

.feature-icon-wrapper svg {
  width: 1.35rem;
  height: 1.35rem;
}

.card-body {
  padding: 2.25rem 1.5rem 1.5rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.card-number {
  font-size: 0.75rem;
  font-weight: 700;
  color: #64748b;
  margin-bottom: 0.375rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.card-title {
  font-size: 1.125rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 0.5rem;
}

.card-text {
  font-size: 0.875rem;
  color: #475569;
  line-height: 1.6;
  margin-bottom: 1.25rem;
}

.card-footer {
  margin-top: auto;
  padding-top: 0.875rem;
  border-top: 1px solid #f1f5f9;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8125rem;
  font-weight: 600;
  color: #64748b;
}

.card-footer-dot {
  width: 0.375rem;
  height: 0.375rem;
  border-radius: 50%;
}

.feature-card.green .card-footer-dot { background-color: #10b981; }
.feature-card.blue .card-footer-dot { background-color: #3b82f6; }
.feature-card.purple .card-footer-dot { background-color: #8b5cf6; }

/* ─── ផ្នែកតួនាទី (Roles) ─── */
.roles-layout {
  display: grid;
  gap: 3.5rem;
  align-items: center;
}

@media (min-width: 1024px) {
  .roles-layout {
    grid-template-columns: 0.95fr 1.05fr;
    gap: 4.5rem;
  }
}

.role-cards-stack {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* Role Cards Style Upgrade */
.role-card-item {
  display: flex;
  align-items: flex-start;
  gap: 1.25rem;
  background: white;
  border: 1px solid rgba(15, 23, 42, 0.03);
  border-radius: 1.5rem;
  padding: 1.25rem 1.5rem;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 4px 15px rgba(15, 23, 42, 0.01);
}

.role-card-item:hover {
  transform: translateX(6px);
}

.role-card-item.green:hover { border-color: rgba(16, 185, 129, 0.15); box-shadow: 0 8px 30px rgba(16, 185, 129, 0.04); }
.role-card-item.blue:hover { border-color: rgba(59, 130, 246, 0.15); box-shadow: 0 8px 30px rgba(59, 130, 246, 0.04); }
.role-card-item.purple:hover { border-color: rgba(139, 92, 246, 0.15); box-shadow: 0 8px 30px rgba(139, 92, 246, 0.04); }

.role-avatar {
  width: 3rem;
  height: 3rem;
  border-radius: 0.75rem;
  display: grid;
  place-items: center;
  font-size: 1.125rem;
  font-weight: 800;
  color: white;
  flex-shrink: 0;
}

.role-card-item.green .role-avatar { background: #10b981; }
.role-card-item.blue .role-avatar { background: #3b82f6; }
.role-card-item.purple .role-avatar { background: #8b5cf6; }

.role-details h3 {
  font-size: 1rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 0.25rem;
}

.role-details p {
  font-size: 0.875rem;
  color: #475569;
  line-height: 1.5;
}

/* ─── ផ្នែកអត្ថប្រយោជន៍ (Benefits) ─── */
.benefits-grid {
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
    gap: 1.5rem;
  }
}

.benefit-item {
  background: white;
  border: 1px solid rgba(15, 23, 42, 0.03);
  border-radius: 1.5rem;
  padding: 2rem 1.25rem;
  text-align: center;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 4px 15px rgba(15, 23, 42, 0.01);
}

.benefit-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 20px -2px rgba(15, 23, 42, 0.03);;
  border-color: rgba(15, 23, 42, 0.08);
}

.benefit-icon {
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 0.75rem;
  margin: 0 auto 1.125rem;
  display: grid;
  place-items: center;
  color: white;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.benefit-item:hover .benefit-icon {
  transform: rotate(-3deg) scale(1.08);
}

.benefit-item.green .benefit-icon { background: #10b981; }
.benefit-item.blue .benefit-icon { background: #3b82f6; }
.benefit-item.purple .benefit-icon { background: #8b5cf6; }
.benefit-item.amber .benefit-icon { background: #f59e0b; }

.benefit-item svg {
  width: 1.25rem;
  height: 1.25rem;
}

.benefit-item h3 {
  font-size: 1rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 0.375rem;
}

.benefit-item p {
  font-size: 0.8125rem;
  color: #64748b;
  line-height: 1.5;
}

/* ─── ផ្នែកជំហាន (Steps) ─── */
.steps-container {
  position: relative;
  margin-top: 3.5rem;
}

/* Premium smooth dotted SVG connector line styling */
.steps-connector-svg {
  position: absolute;
  top: 1.75rem;
  left: 10%;
  right: 10%;
  height: 100px;
  z-index: 1;
  display: none;
  pointer-events: none;
}

@media (min-width: 768px) {
  .steps-connector-svg {
    display: block;
  }
}

.steps-grid {
  display: grid;
  gap: 2.5rem;
  position: relative;
  z-index: 2;
}

@media (min-width: 768px) {
  .steps-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.step-item {
  text-align: center;
}

.step-badge {
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-size: 1.25rem;
  font-weight: 800;
  color: white;
  margin: 0 auto 1.25rem;
  position: relative;
  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.step-item:hover .step-badge {
  transform: scale(1.08);
}

.step-item.green .step-badge { background: #10b981; box-shadow: 0 6px 15px rgba(16, 185, 129, 0.15); }
.step-item.blue .step-badge { background: #3b82f6; box-shadow: 0 6px 15px rgba(59, 130, 246, 0.15); }
.step-item.purple .step-badge { background: #8b5cf6; box-shadow: 0 6px 15px rgba(139, 92, 246, 0.15); }

.step-badge::after {
  content: '';
  position: absolute;
  inset: -5px;
  border: 1.5px dashed rgba(16, 185, 129, 0.2);
  border-radius: 50%;
}

.step-item.blue .step-badge::after { border-color: rgba(59, 130, 246, 0.2); }
.step-item.purple .step-badge::after { border-color: rgba(139, 92, 246, 0.2); }

.step-item h3 {
  font-size: 1.0625rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 0.5rem;
}

.step-item p {
  font-size: 0.875rem;
  color: #475569;
  line-height: 1.6;
}

/* ─── Keyframe Animations ─── */
@keyframes pulse-slow {
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.35);
  }
  70% {
    transform: scale(1);
    box-shadow: 0 0 0 8px rgba(16, 185, 129, 0);
  }
  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(16, 185, 129, 0);
  }
}

@keyframes float-slow {
  0% {
    transform: translate(0, 0) scale(1);
  }
  50% {
    transform: translate(2% , 5%) scale(1.05);
  }
  100% {
    transform: translate(-3%, -2%) scale(0.98);
  }
}
</style>