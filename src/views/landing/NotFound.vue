<template>
     <div class="shell">


    <header class="topbars">
      <div class="logo-mark"> <i class="bi bi-mortarboard-fill"></i></div>
      <span class="logo-texts">Pralong</span>
    </header>

    <main class="content">
      <div class="scene-card">

        <div class="illus-wrap" aria-hidden="true">

          <div class="q-badge q1">?</div>
          <div class="q-badge q2">?</div>
          <div class="q-badge q3">?</div>

          <div class="paper">
            <div class="rows">
              <div class="row-item">
                <div class="row-num"></div>
                <div class="row-line"></div>
              </div>
              <div class="row-item">
                <div class="row-num"></div>
                <div class="row-line"></div>
              </div>
              <div class="row-item missing">
                <div class="row-num"></div>
                <div class="row-line"></div>
              </div>
              <div class="row-item">
                <div class="row-num"></div>
                <div class="row-line"></div>
              </div>
              <div class="row-item">
                <div class="row-num"></div>
                <div class="row-line"></div>
              </div>
              <div class="row-item missing">
                <div class="row-num"></div>
                <div class="row-line"></div>
              </div>
              <div class="row-item">
                <div class="row-num"></div>
                <div class="row-line"></div>
              </div>
            </div>
          </div>
          <svg class="mag-glass" viewBox="0 0 82 82" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <circle cx="34" cy="34" r="26" stroke="#3db882" stroke-width="7" fill="rgba(178,232,210,.25)" />
            <line x1="54" y1="54" x2="75" y2="75" stroke="#1f9e67" stroke-width="7" stroke-linecap="round" />
            <text x="34" y="42" text-anchor="middle" font-family="Space Grotesk,sans-serif" font-weight="700"
              font-size="26" fill="#1f9e67">?</text>
          </svg>
        </div>

        <div class="error-num" aria-label="Error 404">
          <span>4</span>
          <span class="zero-icon">
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <circle cx="44" cy="44" r="34" />
              <line x1="69" y1="69" x2="90" y2="90" stroke-linecap="round" />
            </svg>
          </span>
          <span>4</span>
        </div>

        <div class="divider"></div>

        <div class="copy">
          <h1>រកមិនឃើញទំព័រនេះទេ!</h1>
          <p>សូមអភ័យទោស! ទំព័រដែលអ្នកកំពុងស្វែងរក ត្រូវបានផ្លាស់ទីឬមិនមាននៅក្នុងប្រព័ន្ធ</p>
        </div>

        <div class="actions">
          <a href="/" class="btn btn-solid">
            <i class="bi bi-speedometer2"></i> ត្រឡប់ទៅផ្ទាំងគ្រប់គ្រង
          </a>
        </div>

      </div>

    </main>

    <footer>
      <p>QuizMaster &nbsp;·&nbsp;កំហុសលេខ 404 &nbsp;·&nbsp;រកមិនឃើញទំព័រនេះទេ</p>
    </footer>

  </div>
</template>
  <style scoped>

    *,
    *::before,
    *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    .topbars {
      padding: 0 2rem;
      height: 60px;
      display: flex;
      align-items: center;
      gap: .6rem;
      background: rgba(242, 251, 246, .85);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid var(--card-border);
    }

    .logo-mark {
      width: 34px;
      height: 34px;
      background: var(--g500);
      border-radius: 9px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-size: 1rem;
      flex-shrink: 0;
    }

    .logo-texts {
      font-size: .95rem;
      color: var(--ink);
      letter-spacing: -.01em;
      font-weight: 700;
    }

    .logo-texts span {
      color: var(--g500);
    }

    .topbar-right {
      margin-left: auto;
      display: flex;
      align-items: center;
      gap: .75rem;
    }

    .nav-pill {
      font-size: .78rem;
      font-weight: 500;
      color: var(--ink-mid);
      padding: .28em .85em;
      border-radius: var(--radius-pill);
      border: 1px solid var(--card-border);
      background: var(--surface);
      text-decoration: none;
      transition: background .15s, color .15s;
      display: inline-flex;
      align-items: center;
      gap: .35rem;
    }

    .nav-pill:hover {
      background: var(--g100);
      color: var(--g600);
    }

    .shell {
      height: 100vh;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      font-family: inherit;
    }

    .content {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 1rem;
    }


    .scene-card {
      background: var(--surface);
      border: 1px solid var(--card-border);
      border-radius: var(--radius-card);
      box-shadow: var(--shadow);
      padding: 1.3rem 2.5rem 2.25rem;
      max-width: 560px;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.5rem;
    }

    .illus-wrap {
      position: relative;
      width: 220px;
      height: 200px;
      flex-shrink: 0;
    }

    .paper {
      position: absolute;
      left: 50%;
      top: 0;
      transform: translateX(-50%) rotate(-4deg);
      width: 150px;
      height: 188px;
      background: #fff;
      border-radius: 10px;
      border: 1.5px solid var(--g200);
      box-shadow: 0 6px 24px rgba(21, 122, 79, .10);
    }

    .paper::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 28px;
      background: var(--g100);
      border-radius: 8px 8px 0 0;
      border-bottom: 1.5px solid var(--g200);
    }

    .paper::after {
      content: '';
      position: absolute;
      top: 8px;
      left: 22px;
      right: 22px;
      height: 10px;
      background: var(--g300);
      border-radius: 5px;
      opacity: .55;
    }


    .rows {
      position: absolute;
      top: 42px;
      left: 18px;
      right: 18px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .row-item {
      display: flex;
      align-items: center;
      gap: 7px;
    }

    .row-num {
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background: var(--g200);
      flex-shrink: 0;
    }

    .row-line {
      flex: 1;
      height: 7px;
      background: var(--g100);
      border-radius: 4px;
    }

    .row-item.missing .row-line {
      background: #fde8e8;
    }

    .row-item.missing .row-num {
      background: #fbb;
    }

    .mag-glass {
      position: absolute;
      right: 0;
      bottom: 12px;
      width: 82px;
      height: 82px;
    }

    .q-badge {
      position: absolute;
      font-family: 'Space Grotesk', sans-serif;
      font-weight: 700;
      color: var(--g500);
      background: var(--g100);
      border: 1.5px solid var(--g300);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      animation: floatQ 2.8s ease-in-out infinite;
    }

    .q-badge.q1 {
      width: 32px;
      height: 32px;
      font-size: 1rem;
      top: 4px;
      right: 22px;
      animation-delay: 0s;
    }

    .q-badge.q2 {
      width: 22px;
      height: 22px;
      font-size: .72rem;
      top: 28px;
      left: 8px;
      animation-delay: .9s;
      opacity: .7;
    }

    .q-badge.q3 {
      width: 18px;
      height: 18px;
      font-size: .62rem;
      bottom: 8px;
      left: 34px;
      animation-delay: 1.7s;
      opacity: .55;
    }

    @keyframes floatQ {

      0%,
      100% {
        transform: translateY(0) rotate(-5deg);
      }

      50% {
        transform: translateY(-8px) rotate(5deg);
      }
    }

    .error-num {
      font-family: 'Space Grotesk', sans-serif;
      font-size: clamp(4.5rem, 16vw, 7.5rem);
      font-weight: 700;
      line-height: 1;
      letter-spacing: -.05em;
      color: var(--g400);
      display: flex;
      align-items: center;
      gap: .05em;
    }

    .error-num .zero-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }

    .error-num .zero-icon svg {
      width: .82em;
      height: .82em;
      stroke: var(--g400);
      fill: none;
      stroke-width: 14px;
      stroke-linecap: round;
    }

    .copy {
      display: flex;
      flex-direction: column;
      gap: .6rem;
      align-items: center;
      justify-content: center;
      text-align: center;
      

    }

    .copy h1 {
      font-family: 'Space Grotesk', sans-serif;
      font-size: clamp(1.15rem, 3.5vw, 1.4rem);
      font-weight: 700;
      color: var(--ink);
      justify-content: center;
      letter-spacing: -.02em;
      font-family: inherit;
    }

    .copy p {
      font-size: .95rem;
      color: var(--ink-low);
      line-height: 1.65;
      max-width: 380px;
      margin: 0 auto;
      font-family: inherit;
    }

    .divider {
      width: 48px;
      height: 3px;
      background: linear-gradient(90deg, var(--g300), var(--g500));
      border-radius: 2px;
    }

    .actions {
      display: flex;
      flex-wrap: wrap;
      gap: .75rem;
      justify-content: center;
      width: 100%;
    }

    .btn {
      display: inline-flex;
      align-items: center;
      gap: .45rem;
      font-family: 'DM Sans', sans-serif;
      font-size: .9rem;
      font-weight: 500;
      border-radius: var(--radius-btn);
      padding: .62rem 1.4rem;
      cursor: pointer;
      text-decoration: none;
      transition: transform .18s, box-shadow .18s, background .18s, color .18s;
      border: none;
    }

    .btn-solid {
      background: var(--g500);
      color: #fff;
      box-shadow: 0 3px 14px rgba(31, 158, 103, .28);
      font-family: inherit;
    }

    .btn-solid:hover {
      background: var(--g600);
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(31, 158, 103, .38);
      color: #fff;
    }

    .btn-ghost {
      background: var(--surface);
      color: var(--ink-mid);
      border: 1px solid var(--card-border);
    }

    .btn-ghost:hover {
      background: var(--g100);
      color: var(--g600);
      transform: translateY(-1px);
    }

    .quick-links {
      display: flex;
      flex-wrap: wrap;
      gap: .5rem;
      justify-content: center;
      margin-top: 1.5rem;
    }

    .quick-label {
      width: 100%;
      font-size: .72rem;
      font-weight: 500;
      letter-spacing: .07em;
      text-transform: uppercase;
      color: var(--ink-low);
      margin-bottom: .2rem;
    }

    .chip {
      display: inline-flex;
      align-items: center;
      gap: .35rem;
      font-size: .8rem;
      color: var(--ink-mid);
      background: var(--surface);
      border: 1px solid var(--card-border);
      border-radius: var(--radius-pill);
      padding: .28em .9em;
      text-decoration: none;
      transition: background .15s, color .15s;
    }

    .chip:hover {
      background: var(--g100);
      color: var(--g600);
    }

    footer {
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-top: 1px solid var(--card-border);
      background: rgba(242, 251, 246, .85);
    }

    footer p {
      font-size: .75rem;
      color: var(--ink-low);
    }


    @media (max-width: 520px) {
      .scene-card {
        padding: 2rem 1.25rem 1.75rem;
      }

      .topbar {
        padding: 0 1rem;
      }

      .q-badge,
      .illus-wrap {
        display: none;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .q-badge {
        animation: none;
      }
    }
  </style>