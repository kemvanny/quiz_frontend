<template>
  <footer class="site-footer">
    <div class="orb orb-1"></div>
    <div class="orb orb-2"></div>
    <div class="orb orb-3"></div>
    <div class="footer-glow footer-glow-1"></div>
    <div class="footer-glow footer-glow-2"></div>

    <div class="footer-inner">
      <div class="footer-main">
        <div class="footer-brand">
          <div class="footer-logo">
            <div class="footer-logo-img-wrapper">
              <img :src="logo" alt="Prolong Logo" class="footer-logo-image" />
            </div>

            <div>
              <h3>Pralong</h3>
              <span>Smart Online Exam Platform</span>
            </div>
          </div>

          <p>
            វេទិកាប្រឡងអនឡាញទំនើបសម្រាប់សាលារៀន គ្រូបង្រៀន
            និងសិស្សក្នុងការគ្រប់គ្រងការប្រឡងយ៉ាងមានប្រសិទ្ធភាព
          </p>

          <div class="social-links">
            <a href="#">
              <i class="fab fa-facebook-f"></i>
            </a>

            <a href="#">
              <i class="fab fa-telegram"></i>
            </a>

            <a href="#">
              <i class="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>

        <div class="footer-links">
          <div>
            <h4>ទំព័រ</h4>

            <ul>
              <li><router-link to="/">ទំព័រដើម</router-link></li>
              <li><router-link to="/features">មុខងារ</router-link></li>
              <li><router-link to="/about">អំពីយើង</router-link></li>
            </ul>
          </div>

          <div>
            <h4>មុខងារសំខាន់ៗ</h4>

            <ul>
              <li><a href="#">បង្កើតអ្នកប្រើប្រាស់</a></li>
              <li><a href="#">បង្កើតថ្នាក់រៀន</a></li>
              <li><a href="#">បង្កើតវិញ្ញសារប្រឡង</a></li>
              <li><a href="#">ចូលរួមប្រឡង</a></li>
            </ul>
          </div>

          <div>
            <h4>ទំនាក់ទំនង</h4>

            <ul>
              <li><a href="#">អុីមែល​៖ quizpralong@gmail.com</a></li>
              <li><a href="#">ទីតាំង៖ ភ្នំពេញ, កម្ពុជា</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <p>© 2026 Prolong. រក្សាសិទ្ធិគ្រប់យ៉ាង។</p>

        <div class="footer-bottom-links">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Cookies</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { onMounted } from "vue";
// Imported your logo image file here
import logo from "@/assets/images/pralong-logo.png";
import Homepage from "@/views/landing/homepage.vue";
import Feature from "@/views/landing/feature.vue";
import AboutUs from "@/views/landing/aboutUs.vue";

onMounted(() => {
  const footer = document.querySelector(".site-footer");

  footer?.addEventListener("mousemove", (e) => {
    const rect = footer.getBoundingClientRect();
    footer.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    footer.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  });
});
</script>

<style scoped>
/* ==========================
   FOOTER
========================== */

.site-footer {
  --mouse-x: 50%;
  --mouse-y: 50%;

  position: relative;
  overflow: hidden;
  padding: 80px 0 30px;

  background: linear-gradient(
    135deg,
    #020617 0%,
    #0f172a 35%,
    #111827 70%,
    #020617 100%
  );
  color: white;
}

.site-footer::before {
  content: "";
  position: absolute;
  inset: 0;

  background-image: linear-gradient(
      rgba(255, 255, 255, 0.04) 1px,
      transparent 1px
    ),
    linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px);
  background-size: 40px 40px;
  opacity: 0.4;
}

.site-footer::after {
  content: "";
  position: absolute;
  width: 500px;
  height: 500px;

  left: var(--mouse-x);
  top: var(--mouse-y);
  transform: translate(-50%, -50%);

  background: radial-gradient(
    circle,
    rgba(16, 185, 129, 0.15),
    transparent 70%
  );
  pointer-events: none;
  transition: 0.08s linear;
}

/* ==========================
   GLOW EFFECTS
========================== */

.footer-glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(120px);
}

.footer-glow-1 {
  width: 350px;
  height: 350px;
  top: -120px;
  left: -120px;
  background: rgba(16, 185, 129, 0.2);
}

.footer-glow-2 {
  width: 350px;
  height: 350px;
  right: -120px;
  bottom: -120px;
  background: rgba(59, 130, 246, 0.15);
}

/* ==========================
   CONTAINER
========================== */

.footer-inner {
  position: relative;
  z-index: 10;
  max-width: 1300px;
  margin: auto;
  padding: 40px;
  border-radius: 32px;
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(18px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.35);
}

.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
}

.orb-1 {
  width: 350px;
  height: 350px;
  background: rgba(16, 185, 129, 0.18);
  top: -100px;
  left: -120px;
  animation: float1 12s infinite ease-in-out;
}

.orb-2 {
  width: 300px;
  height: 300px;
  background: rgba(59, 130, 246, 0.15);
  right: -100px;
  top: 30%;
  animation: float2 14s infinite ease-in-out;
}

.orb-3 {
  width: 260px;
  height: 260px;
  background: rgba(168, 85, 247, 0.15);
  bottom: -80px;
  left: 40%;
  animation: float3 16s infinite ease-in-out;
}

@keyframes float1 {
  50% {
    transform: translateY(-40px);
  }
}
@keyframes float2 {
  50% {
    transform: translateY(35px);
  }
}
@keyframes float3 {
  50% {
    transform: translateY(-25px);
  }
}

/* ==========================
   MAIN
========================== */

.footer-main {
  display: grid;
  grid-template-columns: 1.3fr 2fr;
  gap: 60px;
}

/* ==========================
   BRAND & LOGO IMAGE
========================== */

.footer-logo {
  display: flex;
  align-items: center;
  gap: 15px;
}

.footer-logo-img-wrapper {
  width: 74px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
  transition: 0.4s ease;
}

.footer-logo-image {
  width: 95%;
  height: 100%;
  object-fit: contain;
}

.footer-logo-img-wrapper:hover {
  transform: rotate(-8deg) scale(1.08);
  border-color: #10b981;
}

.footer-logo h3 {
  font-size: 1.5rem;
  font-weight: 800;
  margin: 0;
  letter-spacing: 0.5px;
}

.footer-logo span {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
}

.footer-brand p {
  margin-top: 24px;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.7);
}

/* ==========================
   SOCIAL
========================== */

.social-links {
  display: flex;
  gap: 12px;
  margin-top: 25px;
}

.social-links a {
  width: 46px;
  height: 46px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 14px;
  color: white;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: all 0.3s ease;
}

.social-links a:hover {
  background: #10b981;
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(16, 185, 129, 0.3);
}

/* ==========================
   LINKS
========================== */

.footer-links {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
}

.footer-links h4 {
  margin-bottom: 20px;
  font-size: 1rem;
  font-weight: 700;
  color: #fff;
}

.footer-links ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.footer-links a {
  text-decoration: none;
  color: rgba(255, 255, 255, 0.65);
  transition: all 0.3s ease;
}

.footer-links a:hover {
  color: #10b981;
  padding-left: 8px;
}

/* ==========================
   BOTTOM
========================== */

.footer-bottom {
  margin-top: 60px;
  padding-top: 25px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: rgba(255, 255, 255, 0.55);
}

.footer-bottom-links {
  display: flex;
  gap: 20px;
}

.footer-bottom-links a {
  color: rgba(255, 255, 255, 0.55);
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-bottom-links a:hover {
  color: white;
}

/* ==========================
   RESPONSIVE
========================== */

@media (max-width: 991px) {
  .footer-main {
    grid-template-columns: 1fr;
    gap: 50px;
  }
  .footer-links {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .footer-links {
    grid-template-columns: 1fr;
  }
  .footer-bottom {
    flex-direction: column;
    gap: 15px;
    text-align: center;
  }
  .footer-logo {
    align-items: flex-start;
  }
}
</style>