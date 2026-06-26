<template>
  <div class="classroom-stream-container">
    <button @click="goBack" class="btn-modern-back mb-4">
      <i class="fas fa-arrow-left"></i> <span>ត្រឡប់ក្រោយ</span>
    </button>

    <div v-if="isLoading" class="skeleton-hero-banner skeleton-shimmer mb-4"></div>
    <div v-else-if="roomInfo" class="course-hero-banner mb-4">
      <div class="banner-content">
        <div class="course-badge">
          <i class="fas fa-code me-1"></i> ថ្នាក់រៀនសកម្ម
        </div>
        <h1 class="course-title mt-2">{{ roomInfo.room_name }}</h1>
        <p class="course-instructor-meta mb-0">
          <i class="fas fa-chalkboard-teacher me-2"></i> បង្រៀនដោយ៖ <strong class="ms-1">{{ roomInfo.teacher_name }}</strong>
        </p>
      </div>
      <div class="banner-floating-icon">
        <i class="fas fa-graduation-cap"></i>
      </div>
    </div>

    <div v-if="errorMessage" class="alert alert-danger my-3" role="alert">
      {{ errorMessage }}
    </div>

    <div v-else class="row g-4 mt-1">
      <div class="col-4 col-md-3">
        <div v-if="isLoading" class="skeleton-sidebar-card">
          <div class="sk-line-title skeleton-shimmer mb-3" style="width: 60%;"></div>
          <div class="sk-line-text skeleton-shimmer mb-2" style="width: 100%;"></div>
          <div class="sk-line-text skeleton-shimmer" style="width: 40%;"></div>
        </div>

        <div v-if="!isLoading" class="stream-sidebar-card">
          <h5 class="sidebar-card-title"><i class="fas fa-graduation-cap me-2 text-success"></i>ការណែនាំសិក្សា</h5>
          <div class="sidebar-card-body">
            <ul class="list-unstyled mb-0 small text-muted d-flex flex-column gap-2">
              <li><i class="fas fa-check-circle text-success me-2"></i> ពិនិត្យមើលសេចក្តីប្រកាសប្រចាំថ្ងៃ</li>
              <li><i class="fas fa-check-circle text-success me-2"></i> ចូលធ្វើវិញ្ញាសាឱ្យបានមុនម៉ោងកំណត់</li>
              <li><i class="fas fa-check-circle text-success me-2"></i> អាចសួរនាំក្នុងប្រអប់មតិយោបល់</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="col-8 col-md-9">

        <div v-if="!isLoading" class="announcement-input-box mb-4">
          <div class="d-flex align-items-center gap-3">
            <div class="user-avatar-placeholder">
              <i class="fas fa-user"></i>
            </div>
            <div class="flex-grow-1">
              <button class="fake-input-trigger text-start w-100">
                ចែករំលែកអ្វីមួយទៅកាន់ថ្នាក់រៀនរបស់អ្នក...
              </button>
            </div>
          </div>
        </div>

        <div v-if="isLoading">
          <div v-for="n in 2" :key="n" class="skeleton-post-card mb-4">
            <div class="sk-header d-flex align-items-center gap-3">
              <div class="sk-avatar skeleton-shimmer"></div>
              <div class="sk-meta flex-grow-1">
                <div class="sk-line-title skeleton-shimmer mb-2"></div>
                <div class="sk-line-date skeleton-shimmer"></div>
              </div>
            </div>
            <div class="sk-body">
              <div class="sk-line-text skeleton-shimmer mb-2" style="width: 100%;"></div>
              <div class="sk-line-text skeleton-shimmer mb-2" style="width: 85%;"></div>
              <div class="sk-line-text skeleton-shimmer" style="width: 50%;"></div>
            </div>
          </div>
        </div>

        <div v-else>
          <div v-if="streamPosts.length === 0" class="text-center card p-5 border-dashed text-muted">
            <i class="far fa-folder-open display-4 mb-3 text-secondary"></i>
            <p class="mb-0">មិនទាន់មានការបង្ហោះ ឬសេចក្តីប្រកាសណាមួយនៅក្នុងបន្ទប់សិក្សានេះទេ!</p>
          </div>

          <div v-for="post in displayedPosts" :key="post.id" class="stream-post-card mb-4">
            <div class="post-header">
              <div class="author-avatar" style="background-color: var(--em-soft); color: var(--em-dk);">
                <i class="fas fa-user"></i>
              </div>
              <div class="author-info">
                <h6 class="author-name">{{ roomInfo?.teacher_name || 'គ្រូបង្រៀន' }} <span
                    class="badge-teacher">គ្រូបង្រៀន</span></h6>
                <span class="post-date">បានបង្ហោះនៅ៖ {{ formatDate(post.created_at) }}</span>
              </div>
              <button class="btn-more-options"><i class="fas fa-ellipsis-v"></i></button>
            </div>

            <div class="post-body">
              <h5 v-if="post.title" class="post-title-text mb-2">{{ post.title }}</h5>
              <p class="post-text mb-0">{{ post.message }}</p>

              <div v-if="post.exam_link" class="exam-action-block mt-3">
                <a :href="post.exam_link" target="_blank"
                  class="btn w-100 py-2 shadow-sm d-flex align-items-center justify-content-center gap-2"
                  :class="isExamExpired(post.exam_expired_at) ? 'btn-secondary disabled-btn' : 'btn-success text-white'">

                  <template v-if="isExamExpired(post.exam_expired_at)">
                    <i class="fas fa-lock"></i> ការប្រឡងត្រូវបានបិទ/ហួសពេលកំណត់ហើយ
                  </template>
                  <template v-else>
                    <i class="fas fa-file-signature"></i> ចុចទីនេះដើម្បីចូលទៅធ្វើការប្រឡង
                  </template>
                </a>
              </div>
            </div>

            <div class="post-footer">
              <button class="footer-action-btn">
                <i class="far fa-comment-alt me-2"></i> បន្ថែមមតិយោបល់ក្នុងថ្នាក់...
              </button>
            </div>
          </div>

          <div v-if="!isAllLoaded && streamPosts.length > 0" class="text-center my-4">
            <button @click="loadMorePosts" class="btn btn-outline-success px-4 py-2 rounded-pill fw-bold shadow-sm">
              មើលបន្ថែម <i class="fas fa-chevron-down ms-1"></i>
            </button>
          </div>

        </div>

      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import studentApi from '@/api/student.api';
import { useRouter } from 'vue-router';

const router = useRouter();

const route = useRoute();
const roomId = route.params.room_id || route.params.id;

const roomInfo = ref(null);
const streamPosts = ref([]);
const isLoading = ref(false);
const errorMessage = ref('');
const visibleCount = ref(3);
const isAllLoaded = computed(() => visibleCount.value >= streamPosts.value.length);
const displayedPosts = computed(() => {
  return streamPosts.value.slice(0, visibleCount.value);
});

const loadMorePosts = () => {
  visibleCount.value += 3;
};

const goBack = () => {
  router.back();
};

const fetchRoomData = async () => {
  isLoading.value = true;
  errorMessage.value = '';

  try {
    const [roomRes, postsRes] = await Promise.all([
      studentApi.getRoomDetail(roomId),
      studentApi.getRoomPosts(roomId)
    ]);

    if (roomRes.data && roomRes.data.result === true) {
      roomInfo.value = roomRes.data.data;
    }

    if (postsRes.data && postsRes.data.result === true) {
      streamPosts.value = postsRes.data.data;
    }

  } catch (error) {
    errorMessage.value = "មិនអាចទាញយកទិន្នន័យថ្នាក់រៀនបានទេ! សូមព្យាយាមម្ដងទៀត។";
  } finally {
    setTimeout(() => {
      isLoading.value = false;
    }, 450);
  }
};

const isExamExpired = (expiredDateString) => {
  if (!expiredDateString) return false;
  const now = new Date();
  const expiryLimit = new Date(expiredDateString);
  return now > expiryLimit;
};

const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('km-KH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

onMounted(() => {
  if (roomId) {
    fetchRoomData();
  } else {
    errorMessage.value = "រកមិនឃើញលេខកូដបន្ទប់សិក្សាឡើយ!";
  }
});
</script>

<style scoped>
:root {
  --em: #10b981;
  --em-dk: #059669;
  --em-soft: #ecfdf5;
  --txt: #0f172a;
  --txt-m: #475569;
  --txt-mu: #94a3b8;
  --surf: #ffffff;
  --bdr: #e2e8f0;
  --sh-sm: 0 4px 12px rgba(0, 0, 0, 0.03);
  --sh-md: 0 10px 25px rgba(0, 0, 0, 0.05);
}
.btn-modern-back {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  padding: 8px 18px;
  border-radius: 25px; 
  color: #334155;
  font-size: 14px;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.btn-modern-back:hover {
  background: #f8fafc;
  color: #10b981;
  border-color: #10b981;
  transform: translateX(-4px); 
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.08);
}
.course-hero-banner {
  position: relative;
  background: linear-gradient(135deg, #f0fdf4 0%, #bbf7d0 100%) !important; 
  border-radius: 16px;
  border: 1px solid rgba(16, 185, 129, 0.15);
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
}

.banner-content {
  position: relative;
  z-index: 2;
  text-align: left; 
}

.course-badge {
  display: inline-flex;
  align-items: center;
  background: #ffffff;
  color: #065f46;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 700;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.03);
}

.course-title {
  font-size: 28px;
  font-weight: 700;
  color: #064e3b;
  margin-bottom: 8px;
}

.course-instructor-meta {
  font-size: 14px;
  color: #047857;
}
.banner-floating-icon {
  position: absolute;
  right: 5%;
  top: 50%;
  transform: translateY(-50%);
  font-size: 80px;
  color: rgba(6, 95, 70, 0.05); 
  z-index: 1;
  pointer-events: none;
}

.disabled-btn {
  pointer-events: none;
  cursor: not-allowed;
  opacity: 0.65;
}

.classroom-stream-container {
  font-family: "Inter", "Kantumruy Pro", sans-serif;
  color: var(--txt);
  padding: 10px 0;
}

.btn-back-custom {
  background: transparent;
  border: 1px solid #d1d5db;
  color: #4b5563;
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.btn-back-custom:hover {
  background: #3b9855;
  border-color: #9ca3af;
  color: #fffefe;
}

.btn-back-custom:active {
  transform: scale(0.98);
}

/* ── SKELETON ANIMATION STYLE ── */
.skeleton-shimmer {
  background: linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite linear;
}

@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }

  100% {
    background-position: -200% 0;
  }
}

.skeleton-hero-banner {
  height: 160px;
  border-radius: 22px;
  border: 1px solid var(--bdr);
}

.skeleton-post-card {
  background: var(--surf);
  border: 1px solid var(--bdr);
  border-radius: 20px;
  padding: 24px;
}

.sk-avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
}

.sk-line-title {
  height: 16px;
  width: 140px;
  border-radius: 4px;
}

.sk-line-date {
  height: 12px;
  width: 180px;
  border-radius: 4px;
}

.sk-body {
  margin-top: 20px;
}

.sk-line-text {
  height: 14px;
  border-radius: 4px;
}

/* ── 1. COURSE HERO BANNER ── */
.course-hero-banner {
  position: relative;
  border-radius: 22px;
  padding: 35px 40px;
  overflow: hidden;
  box-shadow: var(--sh-sm);
  border: 1px solid var(--bdr);
  min-height: 160px;
  display: flex;
  align-items: center;
}

.banner-content {
  position: relative;
  z-index: 2;
}

.course-badge {
  display: inline-flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(4px);
  padding: 4px 12px;
  border-radius: 30px;
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--em-dk);
  margin-bottom: 12px;
}

.course-title {
  font-size: 1.65rem;
  font-weight: 800;
  color: #064e3b;
  margin-bottom: 8px;
  line-height: 1.3;
}

.course-instructor-meta {
  font-size: 0.9rem;
  color: #047857;
  margin-bottom: 0;
  font-weight: 600;
}

.banner-floating-icon {
  position: absolute;
  right: -20px;
  bottom: -30px;
  font-size: 11rem;
  color: rgba(16, 185, 129, 0.08);
  transform: rotate(-15deg);
  pointer-events: none;
}

.skeleton-sidebar-card {
  background: var(--surf);
  border: 1px solid var(--bdr);
  border-radius: 18px;
  padding: 20px;
  height: 142px;
}

/* ── 2. SIDEBAR CARD (UPCOMING) ── */
.stream-sidebar-card {
  background: var(--surf);
  border: 1px solid var(--bdr);
  border-radius: 18px;
  padding: 20px;
  box-shadow: var(--sh-sm);
}

.sidebar-card-title {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--txt);
  margin-bottom: 15px;
}

.view-all-link {
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--em-dk);
  text-decoration: none;
  transition: 0.2s;
}

.view-all-link:hover {
  color: var(--em);
}

/* ── 3. ANNOUNCEMENT INPUT BOX ── */
.announcement-input-box {
  background: var(--surf);
  border: 1px solid var(--bdr);
  border-radius: 18px;
  padding: 16px 20px;
  box-shadow: var(--sh-sm);
}

.user-avatar-placeholder {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #f1f5f9;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--txt-mu);
}

.fake-input-trigger {
  border: 1px solid var(--bdr);
  background: #f8fafc;
  border-radius: 12px;
  padding: 10px 18px;
  font-size: 0.88rem;
  color: var(--txt-m);
  cursor: pointer;
  transition: all 0.2s;
}

.fake-input-trigger:hover {
  background: #f1f5f9;
  border-color: #cbd5e1;
}

/* ── 4. STREAM POST CARDS ── */
.stream-post-card {
  background: var(--surf);
  border: 1px solid var(--bdr);
  border-radius: 20px;
  box-shadow: var(--sh-sm);
  overflow: hidden;
  transition: box-shadow 0.25s;
}

.stream-post-card:hover {
  box-shadow: var(--sh-md);
}

.post-header {
  padding: 20px 24px 14px;
  display: flex;
  align-items: center;
  gap: 12px;
  position: relative;
}

.author-avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
}

.author-info {
  display: flex;
  flex-direction: column;
}

.author-name {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--txt);
  margin-bottom: 2px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.badge-teacher {
  background: var(--em-soft);
  color: var(--em-dk);
  font-size: 0.68rem;
  padding: 2px 8px;
  border-radius: 6px;
  font-weight: 700;
}

.post-date {
  font-size: 0.78rem;
  color: var(--txt-mu);
  font-weight: 500;
}

.btn-more-options {
  position: absolute;
  right: 20px;
  top: 22px;
  background: transparent;
  border: none;
  color: var(--txt-mu);
  cursor: pointer;
  padding: 5px;
}

.post-body {
  padding: 0 24px 20px;
}

.post-text {
  font-size: 0.92rem;
  color: var(--txt-m);
  line-height: 1.6;
}

/* ── POST FOOTER ── */
.post-footer {
  border-top: 1px solid var(--bdr);
  padding: 12px 24px;
  background: #fafbfc;
}

.footer-action-btn {
  background: transparent;
  border: none;
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--txt-m);
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: color 0.18s;
}

.footer-action-btn:hover {
  color: var(--em-dk);
}

.border-dashed {
  border-style: dashed !important;
}
</style>