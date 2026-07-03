<template>
  <div class="app-shell">
    <div class="main-col">
      <div class="workspace">
        <div class="class-banner">
          <div class="class-banner-content">
            <h1 class="class-title">{{ roomData?.name || "Loading..." }}</h1>
            <div class="class-meta d-flex align-items-center gap-4 flex-wrap">
              <span>
                <i class="fas fa-users me-2"></i>
                {{ students.length }}
                Students
              </span>
            </div>
          </div>
        </div>

        <div
          class="class-tabs-container d-flex align-items-center justify-content-between"
        >
          <div class="class-tabs">
            <div
              class="class-tab"
              :class="{ active: currentTab === 'stream' }"
              @click="handleTabChange('stream')"
            >
              <i class="fas fa-stream"></i> ថ្នាក់រៀន
            </div>
            <div
              class="class-tab"
              :class="{ active: currentTab === 'people' }"
              @click="handleTabChange('people')"
            >
              <i class="fas fa-users"></i> សិស្សសរុប
              <span class="badge-count">{{ students.length }}</span>
            </div>
            <div
              class="class-tab"
              :class="{ active: currentTab === 'results' }"
              @click="handleTabChange('results')"
            >
              <i class="fas fa-chart-bar"></i> លទ្ធផលសិស្ស
            </div>
          </div>
          <RouterLink
            :to="`/teacher/room-management/${props.roomId}/exams`"
            class="btn-exams-link"
          >
            <i class="fas fa-file-alt me-2"></i>មើលការប្រឡងទាំងអស់
          </RouterLink>
        </div>

        <div v-if="currentTab === 'stream'" class="tab-pane active">
          <div class="stream-grid">
            <div class="side-panel">
              <div
                class="d-flex align-items-center justify-content-between mb-2"
              >
                <span
                  style="
                    font-size: 0.7rem;
                    font-weight: 700;
                    color: var(--txt-mu);
                    text-transform: uppercase;
                    letter-spacing: 1px;
                  "
                  >ទិដ្ឋភាពទូទៅនៃថ្នាក់រៀន</span
                >
                <button class="btn btn-sm text-muted p-0">
                  <i class="fas fa-chart-line"></i>
                </button>
              </div>
              <div class="d-flex gap-2 mt-2">
                <div class="text-center flex-fill">
                  <div
                    style="
                      font-weight: 700;
                      color: var(--txt);
                      font-size: 1.2rem;
                    "
                  >
                    {{ students.length }}
                  </div>
                  <div
                    style="
                      font-size: 0.65rem;
                      color: var(--txt-mu);
                      font-weight: 600;
                    "
                  >
                    សិស្ស
                  </div>
                </div>
                <div class="text-center flex-fill border-start border-end">
                  <div
                    style="
                      font-weight: 700;
                      color: var(--em);
                      font-size: 1.2rem;
                    "
                  >
                    {{ averageGrade }}%
                  </div>
                  <div
                    style="
                      font-size: 0.65rem;
                      color: var(--txt-mu);
                      font-weight: 600;
                    "
                  >
                    មធ្យមភាគ
                  </div>
                </div>
                <div class="text-center flex-fill">
                  <div
                    style="
                      font-weight: 700;
                      color: var(--txt);
                      font-size: 1.2rem;
                    "
                  >
                    {{ posts?.length || 0 }}
                  </div>
                  <div
                    style="
                      font-size: 0.65rem;
                      color: var(--txt-mu);
                      font-weight: 600;
                    "
                  >
                    ដាក់ផ្សាយ
                  </div>
                </div>
              </div>
            </div>

            <div class="feed-container">
              <div class="composer-card">
                <input
                  v-model="newPost.title"
                  class="form-control mb-4"
                  placeholder="ចំណងជើង..."
                />
                <textarea
                  v-model="newPost.message"
                  class="composer-input"
                  rows="2"
                  placeholder="សរសេរការប្រកាស..."
                ></textarea>
                <div class="composer-actions">
                  <button class="btn-post" @click="handleCreatePost">
                    ការបង្ហោះ
                  </button>
                </div>
              </div>

              <div class="d-flex flex-column gap-4">
                <div class="post-card" v-for="post in posts" :key="post.id">
                  <div
                    class="post-header d-flex justify-content-between align-items-center"
                  >
                    <div class="d-flex align-items-center">
                      <img
                        :src="authStore.avatarUrl"
                        class="avatar-img me-2"
                        alt="avatar"
                        style="width: 40px; height: 40px; border-radius: 50%"
                      />
                      <div>
                        <h6 class="mb-0">
                          {{ authStore.fullName }}
                          <span class="role-badge">Teacher</span>
                        </h6>
                        <small class="text-muted">
                          {{
                            new Date(post.created_at).toLocaleDateString(
                              "en-US",
                              { month: "short", day: "numeric" },
                            )
                          }},
                          {{
                            new Date(post.created_at).toLocaleTimeString(
                              "en-US",
                              {
                                hour: "numeric",
                                minute: "2-digit",
                                hour12: true,
                              },
                            )
                          }}
                        </small>
                      </div>
                    </div>
                    <div class="post-actions">
                      <button
                        class="btn-action-menu"
                        @click.stop="toggleMenu(post.id)"
                      >
                        <i class="fas fa-ellipsis-v"></i>
                      </button>
                      <div
                        class="action-dropdown"
                        v-if="activeMenu === post.id"
                      >
                        <button @click="openEditModal(post)">
                          <i class="fas fa-edit me-2"></i>Edit
                        </button>
                        <button class="danger" @click="handleDelete(post.id)">
                          <i class="fas fa-trash me-2"></i>Delete
                        </button>
                      </div>
                    </div>
                  </div>

                  <div class="post-content mt-3">
                    <p>{{ post.message }}</p>
                  </div>

                  <div
                    v-if="post.exam_link || post.examLink"
                    class="assignment-card-link d-flex align-items-center border rounded-3 shadow-sm overflow-hidden mt-3 mb-2 bg-white p-2"
                  >
                    <div
                      class="d-flex align-items-center justify-content-center"
                      style="
                        width: 70px;
                        height: 70px;
                        background-color: #f6993f;
                        flex-shrink: 0;
                        border-radius: 8px;
                      "
                    >
                      <i class="fas fa-laptop-code text-white fa-2x"></i>
                    </div>
                    <div class="p-3 flex-grow-1">
                      <h6 class="mb-0 fw-bold text-dark">
                        {{ post.title || "វិញ្ញាសាប្រឡង" }}
                      </h6>
                    </div>
                    <div class="pe-3">
                      <button
                        class="btn btn-sm px-3 rounded-pill"
                        style="
                          background-color: #e6fffa;
                          color: #38b2ac;
                          font-weight: 600;
                          border: 1px solid #b2f5ea;
                        "
                        @click="viewExamResults(post.exam_id)"
                      >
                        <i class="fas fa-chart-bar me-1"></i> មើលលទ្ធផល
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="currentTab === 'people'" class="tab-pane active">
          <div class="roster-container">
            <div
              class="roster-header d-flex justify-content-between align-items-center"
            >
              <h3>សិស្សសរុប {{ students.length }}</h3>
            </div>

            <div class="table-responsive">
              <table class="table align-middle table-hover roster-table">
                <thead>
                  <tr>
                    <th style="font-size: 15px; font-weight: 600; width: 80px">
                      រូបភាព
                    </th>
                    <th style="font-size: 15px; font-weight: 600">លេខសិស្ស</th>
                    <th style="font-size: 15px; font-weight: 600">ឈ្មោះ</th>
                    <th style="font-size: 15px; font-weight: 600">ជំនាញ</th>
                    <th style="font-size: 15px; font-weight: 600">
                      ថ្ងៃចូលរៀន
                    </th>
                    <th
                      class="text-center"
                      style="font-size: 15px; font-weight: 600; width: 140px"
                    >
                      សកម្មភាព
                    </th>
                  </tr>
                </thead>

                <tbody v-if="students.length">
                  <tr v-for="student in students" :key="student.id">
                    <td>
                      <img
                        :src="getRoomStudentAvatar(student)"
                        class="student-avatar"
                        alt="Student Avatar"
                      />
                    </td>

                    <td>
                      {{ student.student_card_id }}
                    </td>

                    <td>
                      {{ student.first_name }}
                      {{ student.last_name }}
                    </td>

                    <td>
                      {{ student.major || "មិនទាន់បំពេញ" }}
                    </td>

                    <td>
                      {{ formatDate(student.joined_at) }}
                    </td>

                    <td class="text-center">
                      <button
                        class="btn-remove-students"
                        @click="openDeleteModal(student)"
                      >
                        លុបចេញពីបន្ទប់
                      </button>
                    </td>
                  </tr>
                </tbody>

                <tbody v-else>
                  <tr>
                    <td colspan="6" class="text-center py-5 text-muted">
                      មិនទាន់មានសិស្សនៅក្នុងថ្នាក់នេះទេ
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div v-if="currentTab === 'results'" class="tab-pane active">
          <div
            v-if="loading"
            class="d-flex flex-column align-items-center justify-content-center p-5 text-muted"
          >
            <div class="spinner-border text-primary mb-3" role="status">
              <span class="visually-hidden">កំពុងផ្ទុក...</span>
            </div>
            <span class="fw-medium text-secondary">កំពុងផ្ទុកទិន្នន័យ...</span>
          </div>

          <div
            v-else-if="studentResults.length === 0"
            class="d-flex flex-column align-items-center justify-content-center p-5 text-muted border border-dashed rounded-4 bg-light"
          >
            <div class="empty-state-icon mb-3 text-secondary-50">
              <i class="far fa-folder-open fa-3x"></i>
            </div>
            <p class="mb-0 fw-medium">
              មិនមានលទ្ធផលសម្រាប់សិស្សទេ។ សូមត្រលប់ទៅកាន់ Tab "ថ្នាក់រៀន"
              រួចចុចលើប៊ូតុង "មើលលទ្ធផល" នៃវិញ្ញាសាណាមួយ។
            </p>
          </div>

          <div v-else class="card border-0 shadow-sm rounded-4 overflow-hidden">
            <div
              class="card-header bg-white border-bottom-0 pt-4 px-4 pb-3 d-flex align-items-center justify-content-between flex-wrap gap-3"
            >
              <div>
                <h5 class="card-title fw-bold text-dark mb-1">លទ្ធផលសិស្ស</h5>
                <p class="text-muted small mb-0">
                  បង្ហាញព័ត៌មានលទ្ធផល និងការផ្តល់មតិត្រឡប់
                </p>
              </div>

              <div class="d-flex align-items-center gap-3 flex-wrap">
                <div class="d-flex align-items-center gap-2">
                  <span class="text-muted small fw-semibold text-nowrap"
                    >កម្រងវិញ្ញាសា</span
                  >
                  <select
                    v-model="selectedExam"
                    class="form-select form-select-sm border border-secondary-subtle rounded-pill px-3 py-2 text-dark"
                    style="
                      min-width: 180px;
                      font-size: 0.82rem;
                      font-weight: 600;
                      background-color: #f8fafc;
                    "
                  >
                    <option value="all">ទាំងអស់</option>
                    <option
                      v-for="title in availableExams"
                      :key="title"
                      :value="title"
                    >
                      {{ title }}
                    </option>
                  </select>
                </div>
                <span
                  class="badge bg-light text-dark border px-3 py-2 rounded-pill fw-semibold"
                >
                  សរុប {{ filteredResults.length }} នាក់
                </span>
              </div>
            </div>

            <div class="px-4 pb-4">
              <div class="table-responsive">
                <table class="table align-middle mb-0 custom-results-table">
                  <thead>
                    <tr>
                      <th
                        class="text-secondary text-uppercase py-3 ps-3"
                        style="font-size: 0.75rem; letter-spacing: 0.5px"
                      >
                        សិស្ស
                      </th>
                      <th
                        class="text-secondary text-uppercase py-3"
                        style="font-size: 0.75rem; letter-spacing: 0.5px"
                      >
                        វិញ្ញាសា
                      </th>
                      <th
                        class="text-secondary text-uppercase py-3 text-center"
                        style="font-size: 0.75rem; letter-spacing: 0.5px"
                      >
                        ពិន្ទុ
                      </th>
                      <th class="text-secondary text-uppercase py-3 text-center"
                        style="font-size: 0.75rem; letter-spacing: 0.5px">
                        កាលបរិច្ឆេទ
                      </th>
                      <th
                        class="text-secondary text-uppercase py-3"
                        style="
                          font-size: 0.75rem;
                          letter-spacing: 0.5px;
                          min-width: 240px;
                        "
                      >
                        មតិកែលម្អ
                      </th>
                      <th
                        class="text-center text-secondary text-uppercase py-3 pe-3"
                        style="
                          font-size: 0.75rem;
                          letter-spacing: 0.5px;
                          width: 90px;
                        "
                      >
                        សកម្មភាព
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="res in paginatedResults"
                      :key="res.submission_id"
                      class="card-row"
                    >
                      <td class="ps-3 py-3">
                        <div class="d-flex align-items-center gap-3">
                          <div class="avatar-circle-custom">
                            {{
                              res.first_name ? res.first_name.charAt(0) : "S"
                            }}
                          </div>
                          <div>
                            <div class="fw-semibold text-dark mb-0">
                              {{ res.first_name }} {{ res.last_name }}
                            </div>
                            <span class="text-muted small">{{
                              res.student_code
                            }}</span>
                          </div>
                        </div>
                      </td>

                      <td class="py-3">
                        <span class="fw-medium text-dark-emphasis">{{
                          res.exam_title
                        }}</span>
                      </td>

                      <td class="py-3 text-center">
                        <span
                          class="badge rounded-pill px-3 py-2 fw-semibold d-inline-flex align-items-center gap-1"
                          :class="getScoreClass(res)"
                        >
                          <i class="fas" :class="getScoreIcon(res)"></i>
                          {{ formatScore(res) }}
                        </span>
                      </td>

                      <td class="py-3 text-center text-muted small">
                        {{ new Date(res.submitted_at).toLocaleDateString() }}
                      </td>

                      <td class="py-3">
                        <input
                          type="text"
                          class="form-control form-control-sm border-0 bg-light rounded-3 px-3 py-2 feedback-input-field"
                          v-model="res.feedback"
                          placeholder="សរសេរមតិកែលម្អនៅទីនេះ..."
                        />
                      </td>

                      <td class="text-center pe-3 py-3">
                        <button
                          class="btn btn-action-send btn-sm rounded-3"
                          @click="sendFeedback(res.submission_id, res.feedback)"
                          title="ផ្ញើមតិកែលម្អ"
                        >
                          <i class="fas fa-paper-plane"></i>
                        </button>
                      </td>
                    </tr>
                    <tr v-if="paginatedResults.length === 0">
                      <td colspan="6" class="text-center py-5 text-muted">
                        មិនមានលទ្ធផលត្រូវគ្នានឹងការចម្រោះរបស់អ្នកឡើយ។
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div
                v-if="totalPages > 1"
                class="d-flex align-items-center justify-content-between mt-4 border-top pt-3 flex-wrap gap-2"
              >
                <div class="text-muted small fw-medium">
                  បង្ហាញ {{ (currentPage - 1) * itemsPerPage + 1 }} ដល់
                  {{
                    Math.min(currentPage * itemsPerPage, filteredResults.length)
                  }}
                  នៃលទ្ធផលសរុប {{ filteredResults.length }} នាក់
                </div>
                <nav aria-label="Result pagination">
                  <ul
                    class="pagination pagination-sm mb-0 align-items-center gap-1"
                  >
                    <li
                      class="page-item"
                      :class="{ disabled: currentPage === 1 }"
                    >
                      <button
                        class="page-link border-0 rounded-circle d-flex align-items-center justify-content-center p-0"
                        @click="prevPage"
                        style="width: 32px; height: 32px"
                      >
                        <i
                          class="fas fa-chevron-left"
                          style="font-size: 0.8rem"
                        ></i>
                      </button>
                    </li>

                    <li
                      v-for="page in totalPages"
                      :key="page"
                      class="page-item"
                      :class="{ active: currentPage === page }"
                    >
                      <button
                        class="page-link border-0 rounded-circle d-flex align-items-center justify-content-center p-0 fw-semibold"
                        @click="goToPage(page)"
                        style="width: 32px; height: 32px; font-size: 0.82rem"
                      >
                        {{ page }}
                      </button>
                    </li>

                    <li
                      class="page-item"
                      :class="{ disabled: currentPage === totalPages }"
                    >
                      <button
                        class="page-link border-0 rounded-circle d-flex align-items-center justify-content-center p-0"
                        @click="nextPage"
                        style="width: 32px; height: 32px"
                      >
                        <i
                          class="fas fa-chevron-right"
                          style="font-size: 0.8rem"
                        ></i>
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div
    class="modal-overlay"
    v-if="isEditModalOpen"
    @click.self="isEditModalOpen = false"
  >
    <div class="edit-modal">
      <h6>Edit Post</h6>
      <input
        v-model="editPost.title"
        class="form-control mb-2"
        placeholder="ចំណងជើង..."
      />
      <textarea
        v-model="editPost.message"
        class="form-control mb-2"
        rows="3"
        placeholder="សរសេរការប្រកាស..."
      ></textarea>
      <input v-model="editPost.exam_link" type="hidden" />
      <div class="d-flex justify-content-end gap-2 mt-3">
        <button class="btn-cancel" @click="isEditModalOpen = false">
          Cancel
        </button>
        <button class="btn-post" @click="handleUpdate">Save</button>
      </div>
    </div>
  </div>

  <RemoveStudentModal
    :is-open="isDeleteModalOpen"
    :student="studentToDelete"
    :loading="isDeleting"
    @close="isDeleteModalOpen = false"
    @confirm="confirmDelete"
  />
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { useAuthStore } from "@/stores/authStore";
import { getStudentResultsByExam, addFeedback } from "@/api/exam.api";

import {
  getOneRoom,
  getStudentsInRoom,
  removeStudentFromRoom,
  createPost,
  getPosts,
  deletePost,
  updatePost,
} from "@/api/teacher.api";

import RemoveStudentModal from "@/components/teachermodal/RemoveStudentModal.vue";
import defaultAvatar from "@/assets/images/default.png";

const router = useRouter();
const toast = useToast();
const authStore = useAuthStore();

const props = defineProps(["roomId"]);

const roomData = ref(null);
const posts = ref([]);

const loading = ref(true);
const currentTab = ref("stream");

const isDeleteModalOpen = ref(false);
const isEditModalOpen = ref(false);

const studentToDelete = ref(null);
const students = ref([]);

const activeMenu = ref(null);
const studentResults = ref([]);
const currentSelectedExamId = ref(null);

const selectedExam = ref("all");
const currentPage = ref(1);
const itemsPerPage = ref(10);
const isDeleting = ref(false);

const BASE_IMAGE_URL = import.meta.env.VITE_BASE_URL_FOR_IMAGE;

const getStudentAvatar = (student) => {
  if (student.profile_image) {
    return `${BASE_IMAGE_URL}/${student.profile_image}`.replace(
      "//uploads",
      "/uploads",
    );
  }

  return `https://ui-avatars.com/api/?name=${encodeURIComponent(
    student.first_name + " " + student.last_name,
  )}`;
};

const formatDate = (date) => {
  if (!date) return "-";

  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const availableExams = computed(() => {
  if (!studentResults.value) return [];
  const titles = studentResults.value
    .map((res) => res.exam_title)
    .filter(Boolean);
  return [...new Set(titles)];
});

const filteredResults = computed(() => {
  if (!studentResults.value) return [];
  if (selectedExam.value === "all") {
    return studentResults.value;
  }
  return studentResults.value.filter(
    (res) => res.exam_title === selectedExam.value,
  );
});

const paginatedResults = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage.value;
  const endIndex = startIndex + itemsPerPage.value;
  return filteredResults.value.slice(startIndex, endIndex);
});

const totalPages = computed(() => {
  return Math.ceil(filteredResults.value.length / itemsPerPage.value) || 1;
});

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const averageGrade = computed(() => {
  if (!studentResults.value || studentResults.value.length === 0) {
    return 0;
  }

  const totalScore = studentResults.value.reduce((sum, res) => {
    return sum + Number(res.score || 0);
  }, 0);

  return Math.round(totalScore / studentResults.value.length);
});

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const goToPage = (page) => {
  currentPage.value = page;
};

watch(selectedExam, () => {
  currentPage.value = 1;
});

//new post
const newPost = ref({
  title: "",
  message: "",
  examLink: "",
});

//edit post
const editPost = ref({
  id: null,
  title: "",
  message: "",
  exam_link: "",
});

const fetchStudents = async () => {
  try {
    const res = await getStudentsInRoom(props.roomId);
    students.value = res.data.data || [];
  } catch (err) {
    console.error(err);
    students.value = [];
  }
};

const getRoomStudentAvatar = (student) => {
  const avatar = student?.avatar;

  if (!avatar || avatar === "default.png" || avatar.includes("default")) {
    return defaultAvatar;
  }

  return `${BASE_IMAGE_URL}${avatar}`;
};

//fetch room
const fetchRoomData = async () => {
  try {
    loading.value = true;
    const response = await getOneRoom(props.roomId);
    roomData.value = response.data.data || response.data;
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

//fetch posts
const fetchPosts = async () => {
  try {
    const res = await getPosts(props.roomId);

    posts.value = (res.data.data || []).reverse();
  } catch (err) {
    console.error("getPosts error status:", err.response?.status);
    console.error("getPosts error message:", err.response?.data);
  }
};

//create post
const handleCreatePost = async () => {
  if (!newPost.value.message.trim()) return;

  try {
    await createPost(props.roomId, {
      title: newPost.value.title,
      message: newPost.value.message,
      examLink: newPost.value.examLink,
    });

    toast.success("បានបង្ហោះជោគជ័យ!");

    newPost.value = {
      title: "",
      message: "",
      examLink: "",
    };
    await fetchPosts();
  } catch (err) {
    console.error("កំហុស:", err.response?.data);
    toast.error("មានកំហុស");
  }
};

//delete post
const handleDelete = async (postId) => {
  try {
    await deletePost(props.roomId, postId);
    toast.success("បានលុបជោគជ័យ!");
    await fetchPosts();
  } catch (err) {
    toast.error("មិនអាចលុបបាន");
  }
};

//update post
const handleUpdate = async () => {
  try {
    const payload = {
      title: editPost.value.title,
      message: editPost.value.message,
    };
    await updatePost(editPost.value.id, payload);

    toast.success("បានកែប្រែជោគជ័យ!");
    isEditModalOpen.value = false;
    await fetchPosts();
  } catch (err) {
    console.error("កំហុស:", err.response?.data);
    toast.error("មិនអាចកែប្រែបាន");
  }
};

//open delete modal
const openDeleteModal = (student) => {
  studentToDelete.value = student;
  isDeleteModalOpen.value = true;
};

//confirm delete
const confirmDelete = async () => {
  if (!studentToDelete.value) return;

  try {
    isDeleting.value = true;

    // IMPORTANT: make sure this is correct ID
    const studentId = studentToDelete.value.id;

    await removeStudentFromRoom(props.roomId, studentId);

    // update UI locally first (NO reload flicker)
    students.value = students.value.filter((s) => s.id !== studentId);

    toast.success("បានលុបសិស្សជោគជ័យ!");
  } catch (error) {
    console.error(error);
    toast.error("មិនអាចលុបសិស្សបាន");
  } finally {
    isDeleting.value = false;
    isDeleteModalOpen.value = false;
    studentToDelete.value = null;
  }
};
//toggle menu
const toggleMenu = (postId) => {
  activeMenu.value = activeMenu.value === postId ? null : postId;
};

//open edit modal
const openEditModal = (post) => {
  editPost.value = {
    id: post.id,
    title: post.title,
    message: post.message,
    exam_link: post.exam_link,
  };
  isEditModalOpen.value = true;
  activeMenu.value = null;
};

const viewExamResults = (examId) => {
  if (!examId) {
    toast.error("មិនអាចមើលលទ្ធផលបានទេ!");
    return;
  }
  currentSelectedExamId.value = examId;
  currentTab.value = "results";
  fetchStudentResults(examId);
};

const handleTabChange = (tab) => {
  currentTab.value = tab;

  if (tab === "results") {
    if (currentSelectedExamId.value) {
      fetchStudentResults(currentSelectedExamId.value);
    } else {
      studentResults.value = [];
    }
  }
};

const fetchStudentResults = async (examId) => {
  if (!examId) return;
  loading.value = true;
  studentResults.value = [];
  try {
    const res = await getStudentResultsByExam(examId);
    const rawData = res.data?.data || res.data || [];
    studentResults.value = Array.isArray(rawData) ? rawData : [];
    if (studentResults.value.length === 0) {
      toast.info("វិញ្ញាសានេះ មិនទាន់មានសិស្សធ្វើការប្រឡងឡើយ");
    }
  } catch (err) {
    console.error(err);
    toast.error("មានកំហុសក្នុងការទាញយកលទ្ធផល");
    studentResults.value = [];
  } finally {
    loading.value = false;
  }
};

const formatScore = (res) => {
  const score = Number(res.score || 0);
  const total = Number(res.total_points || 1);

  return `${score.toFixed(0)} / ${total}`;
};

const getScoreClass = (res) => {
  const score = Number(res.score || 0);
  const total = Number(res.total_points || 1);

  const percent = (score / total) * 100;

  if (percent >= 50) return "bg-success-subtle text-success";
  return "bg-danger-subtle text-danger";
};

const getScoreIcon = (res) => {
  const score = Number(res.score || 0);
  const total = Number(res.total_points || 1);

  return (score / total) * 100 >= 50 ? "fa-check-circle" : "fa-times-circle";
};

const sendFeedback = async (subId, feedbackText) => {
  try {
    await addFeedback(subId, feedbackText);
    toast.success("បានផ្ញើ Feedback ជោគជ័យ!");
  } catch (err) {
    console.error(err);
    toast.error("មានកំហុសក្នុងការផ្ញើ Feedback");
  }
};

onMounted(async () => {
  await authStore.fetchProfile;

  await Promise.all([fetchRoomData(), fetchStudents(), fetchPosts()]);
});
</script>

<style scoped>
.custom-results-table {
  border-collapse: separate !important;
  border-spacing: 0 12px !important;
  width: 100%;
}

.custom-results-table thead tr th {
  border: none;
  background-color: #f8f9fa;

  padding: 0.85rem 1rem;
}

.custom-results-table thead tr th:first-child {
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
}

.custom-results-table thead tr th:last-child {
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
}

.custom-results-table tbody tr.card-row {
  background-color: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  border-radius: 12px;
  transition: all 0.2s ease-in-out;
}

.custom-results-table tbody tr.card-row:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

/* Standardized row cell padding */
.custom-results-table tbody tr.card-row td {
  border-top: 1px solid rgba(0, 0, 0, 0.03);
  border-bottom: 1px solid rgba(0, 0, 0, 0.03);
  padding: 1.25rem 1rem;
  /* Generous internal cell padding */
}

/* Row-edge paddings for alignment with container boundaries */
.custom-results-table tbody tr.card-row td:first-child {
  border-left: 1px solid rgba(0, 0, 0, 0.03);
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
  padding-left: 1.5rem;
}

.custom-results-table tbody tr.card-row td:last-child {
  border-right: 1px solid rgba(0, 0, 0, 0.03);
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
  padding-right: 1.5rem;
}

/* Custom Avatar Layout */
.avatar-circle-custom {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: linear-gradient(135deg, #a5b4fc 0%, #6366f1 100%);
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.95rem;
  box-shadow: 0 2px 6px rgba(99, 102, 241, 0.15);
}

/* Pastel Badge Styling */
.bg-success-subtle {
  background-color: #ecfdf5 !important;
  color: #16a34a !important;
  border: 1px solid rgba(22, 163, 74, 0.15);
}

.bg-danger-subtle {
  background-color: #fef2f2 !important;
  color: #dc2626 !important;
  border: 1px solid rgba(220, 38, 38, 0.15);
}

/* Feedback Input Field Padding & Styling */
.feedback-input-field {
  font-size: 0.875rem;
  background-color: #f4f5f7 !important;
  border: 1px solid transparent !important;
  padding: 0.625rem 1rem !important;
  /* Enhanced internal padding */
  transition: all 0.2s ease-in-out;
  width: 100%;
}

.feedback-input-field:focus {
  background-color: #ffffff !important;
  border-color: #cbd5e1 !important;
  box-shadow: 0 0 0 3px rgba(165, 180, 252, 0.25) !important;
  outline: none;
}

/* Action Button Hover styling */
.btn-action-send {
  background-color: #e6fcf5;
  border: none;
  color: #059669;
  width: 38px;
  height: 38px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.btn-action-send:hover {
  background-color: #10b981;
  color: #ffffff;
  transform: scale(1.05);
}

.btn-action-send:active {
  transform: scale(0.95);
}

/* Empty State Container Styles */
.border-dashed {
  border-style: dashed !important;
  border-width: 2px !important;
  border-color: #cbd5e1 !important;
}

:root {
  --em: #10b981;
  --em-dk: #059669;
  --em-mid: #34d399;
  --em-soft: #ecfdf5;
  --bg: #f8fafc;
  --surf: #ffffff;
  --bdr: #e2e8f0;
  --txt: #1e293b;
  --txt-m: #475569;
  --txt-mu: #94a3b8;
  --sh-sm: 0 4px 12px rgba(0, 0, 0, 0.03);
  --sh-md: 0 8px 24px rgba(0, 0, 0, 0.06);
}

/* Table Card structure */
.table-card {
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  padding-bottom: 20px;
}

.results-table {
  border-collapse: separate !important;
  border-spacing: 0 10px !important;
}

.results-table thead th {
  border: none !important;
  padding: 15px !important;
}

.custom-results-table {
  border-collapse: separate;
  border-spacing: 0;
}

.custom-results-table thead th {
  background-color: #f8f9fa;
  font-weight: 600;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.custom-results-table tbody tr {
  transition: background-color 0.2s ease;
}

.custom-results-table tbody tr:hover {
  background-color: #fafbfc;
}

/* Custom Soft Gradient Avatar */
.avatar-circle-custom {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: linear-gradient(135deg, #a5b4fc 0%, #6366f1 100%);
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.9rem;
  box-shadow: 0 2px 4px rgba(99, 102, 241, 0.1);
}

/* Subtle Soft Badge Colors */
.bg-success-subtle {
  background-color: #ecfdf5 !important;
  color: #065f46 !important;
  border: 1px solid rgba(5, 150, 105, 0.15);
}

.bg-danger-subtle {
  background-color: #fef2f2 !important;
  color: #991b1b !important;
  border: 1px solid rgba(220, 38, 38, 0.15);
}

/* Custom Pagination styles matching layout theme */
.pagination .page-link {
  color: var(--txt-m);
  background-color: #f1f5f9;
  border: none;
  transition: all 0.2s ease;
}

.pagination .page-link:hover {
  background-color: var(--em-soft);
  color: var(--em-dk);
}

.pagination .page-item.active .page-link {
  background-color: var(--em) !important;
  color: #ffffff !important;
  box-shadow: 0 4px 8px rgba(16, 185, 129, 0.2);
}

.pagination .page-item.disabled .page-link {
  background-color: #f8fafc;
  color: #cbd5e1;
  cursor: not-allowed;
}

/* Input Field styling */
.feedback-input-field {
  font-size: 0.85rem;
  background-color: #f3f4f6 !important;
  border: 1px solid transparent !important;
  transition: all 0.2s ease-in-out;
}

.feedback-input-field:focus {
  background-color: #ffffff !important;
  border-color: #cbd5e1 !important;
  box-shadow: 0 0 0 3px rgba(165, 180, 252, 0.25) !important;
  outline: none;
}

/* Micro-interaction Send Button */
.btn-action-send {
  background-color: #f0fdf4;
  border: none;
  color: #16a34a;
  width: 36px;
  height: 36px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.btn-action-send:hover {
  background-color: #16a34a;
  color: #ffffff;
  transform: translateY(-1px);
  box-shadow: 0 4px 6px -1px rgba(22, 163, 74, 0.2);
}

.btn-action-send:active {
  transform: translateY(0);
}

/* Custom Dashed Border for Blank State */
.border-dashed {
  border-style: dashed !important;
  border-width: 2px !important;
  border-color: #e2e8f0 !important;
}

/* Formatting single row components */
.card-row {
  background: #ffffff !important;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.03) !important;
  transition: 0.2s;
}

.card-row td {
  padding: 18px 15px !important;
  border: none !important;
}

.card-row td:first-child {
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
}

.card-row td:last-child {
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
}

/* Global Shell Structures */
.avatar-circle {
  width: 40px;
  height: 40px;
  background: #e0f2f1;
  color: #059669;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
}

.score-pill {
  padding: 6px 14px;
  color: white;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 700;
  display: inline-block;
}

.feedback-input {
  border-radius: 20px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  font-size: 0.85rem;
  padding: 8px 15px;
  transition: 0.2s;
}

.btn-emerald-soft {
  background: #f0fdf4;
  color: #059669;
  border-radius: 50%;
  width: 38px;
  height: 38px;
  border: none;
}

.btn-emerald-soft:hover {
  background: #d1fae5;
}

.app-shell {
  display: flex;
  height: 100vh;
  overflow: hidden;
  width: 100%;
}

.sidebar {
  width: 240px;
  border-right: 1px solid var(--bdr);
  background: #fff;
  padding: 20px 14px;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 12px;
  border-radius: 10px;
  text-decoration: none;
  color: var(--txt-mu);
  font-size: 0.83rem;
  font-weight: 600;
  transition: 0.15s;
}

.nav-item.active {
  background: var(--em-soft);
  color: var(--em);
}

.nav-item:hover:not(.active) {
  background: #f8fafc;
  color: var(--txt);
}

.class-sidebar {
  width: 220px;
  background: #ffffff;
  border-right: 1px solid var(--bdr);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.sidebar-header {
  font-size: 0.75rem;
  font-weight: 800;
  color: var(--txt-mu);
  text-transform: uppercase;
}

.class-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px;
  border-radius: 12px;
  cursor: pointer;
  transition: 0.2s;
}

.class-item.active {
  background: var(--em-soft);
  color: var(--em);
}

.class-initial {
  width: 35px;
  height: 35px;
  background: var(--em);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  font-weight: 700;
}

.class-info h6 {
  font-size: 0.85rem;
  margin: 0;
  font-weight: 700;
}

.class-info span {
  font-size: 0.7rem;
  color: var(--txt-mu);
}

.btn-add-class {
  margin-top: auto;
  padding: 10px;
  border: 2px dashed var(--bdr);
  background: transparent;
  border-radius: 12px;
  font-weight: 700;
  cursor: pointer;
}

.main-col {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.topbar {
  height: 70px;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--bdr);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 28px;
}

.search-bar {
  background: white;
  border-radius: 30px;
  padding: 8px 16px;
  border: 1px solid var(--bdr);
  max-width: 320px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.search-bar input {
  border: none;
  outline: none;
  font-size: 0.8rem;
  width: 100%;
}

.profile-pill {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px;
  border-radius: 30px;
  background: #fff;
  border: 1px solid var(--bdr);
}

.profile-pill img {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  object-fit: cover;
}

.workspace {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
}

.class-banner {
  background: linear-gradient(
    135deg,
    rgba(16, 185, 129, 0.95),
    rgba(5, 150, 105, 0.95)
  );
  border-radius: 24px;
  padding: 36px;
  color: white;
  margin-bottom: 24px;
  box-shadow: 0 10px 30px rgba(16, 185, 129, 0.15);
}

.class-title {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 6px;
}

.class-meta {
  font-size: 0.9rem;
  opacity: 0.9;
}

/* Tabs Layout */
.class-tabs-container {
  margin-bottom: 24px;
}

.class-tabs {
  display: inline-flex;
  background: #fff;
  padding: 6px;
  border-radius: 30px;
  border: 1px solid var(--bdr);
  gap: 4px;
  box-shadow: var(--sh-sm);
}

.class-tab {
  padding: 8px 20px;
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--txt-mu);
  cursor: pointer;
  border-radius: 24px;
  transition: 0.2s;
}

.class-tab.active {
  color: #fff;
  background: var(--em);
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.2);
}

.results-table {
  border-collapse: separate !important;
  border-spacing: 0 16px !important;
}

/* Card Rows Transformation */
.results-table tbody tr {
  background: #ffffff !important;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05) !important;
  border-radius: 12px !important;
  transition: all 0.3s ease;
}

.results-table tbody tr td:first-child {
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
}

.results-table tbody tr td:last-child {
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
}

.results-table td {
  padding: 20px 15px !important;
}

.feedback-input {
  border-radius: 25px !important;
  background-color: #f8fafc !important;
  border: 1px solid #e2e8f0 !important;
  padding: 8px 16px !important;
}

/* Stream Layout Grid */
.stream-grid {
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: 24px;
  align-items: start;
}

@media (max-width: 992px) {
  .stream-grid {
    grid-template-columns: 1fr;
  }
}

.side-panel {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(16px);
  border-radius: 20px;
  border: 1px solid var(--bdr);
  padding: 20px;
  box-shadow: var(--sh-md);
}

.overview-lbl {
  font-size: 0.68rem;
  font-weight: 700;
  color: var(--txt-mu);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.stat-num {
  font-weight: 700;
  color: var(--txt);
  font-size: 1.15rem;
}

.stat-lbl {
  font-size: 0.62rem;
  color: var(--txt-mu);
  font-weight: 600;
}

.panel-title {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--txt);
  margin-bottom: 12px;
}

.upcoming-item {
  display: flex;
  gap: 10px;
  align-items: flex-start;
  margin-bottom: 12px;
}

.upcoming-icon {
  width: 30px;
  height: 30px;
  border-radius: 8px;
  background: var(--em-soft);
  color: var(--em);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  flex-shrink: 0;
}

.upcoming-text h6 {
  font-size: 0.78rem;
  font-weight: 700;
  margin: 0;
  color: var(--txt);
}

.upcoming-text p {
  font-size: 0.68rem;
  margin: 0;
  color: var(--txt-mu);
}

.feed-container {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.composer-card {
  background: #fff;
  border-radius: 20px;
  border: 1px solid var(--bdr);
  padding: 20px;
  box-shadow: var(--sh-md);
}

.avatar-img {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  object-fit: cover;
}

.composer-input {
  width: 100%;
  border: none;
  background: transparent;
  outline: none;
  font-size: 0.92rem;
  resize: none;
}

.composer-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 14px;
  padding-top: 14px;
  border-top: 1px solid var(--bdr);
}

.attach-btns {
  display: flex;
  gap: 10px;
}

.btn-attach {
  border: 1px solid var(--bdr);
  background: #fff;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 6px 14px;
  border-radius: 30px;
  color: var(--txt-m);
}

.btn-attach.quiz {
  color: #2563eb;
}

.btn-attach.assignment {
  color: #d97706;
}

.btn-post {
  background: var(--em);
  color: #fff;
  border: none;
  padding: 8px 20px;
  border-radius: 30px;
  font-weight: 700;
  font-size: 0.8rem;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.25);
  cursor: pointer;
}

.post-card {
  background: #fff;
  border-radius: 20px;
  border: 1px solid var(--bdr);
  padding: 20px;
  box-shadow: var(--sh-md);
}

.pinned-banner {
  background: var(--em-soft) !important;
  border-color: var(--em-mid) !important;
}

.pin-wrap {
  width: 30px;
  height: 30px;
  border-radius: 8px;
  background: var(--em);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  flex-shrink: 0;
}

.pinned-text {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--txt);
}

.pinned-meta {
  font-size: 0.68rem;
  color: var(--txt-mu);
  margin-top: 2px;
}

.post-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.post-author {
  display: flex;
  align-items: center;
  gap: 10px;
}

.post-author-info h6 {
  margin: 0;
  font-size: 0.9rem;
  font-weight: 700;
}

.post-author-info span {
  font-size: 0.72rem;
  color: var(--txt-mu);
}

.role-badge {
  font-size: 0.58rem;
  font-weight: 700;
  padding: 1px 5px;
  border-radius: 4px;
  background: var(--em-soft);
  color: var(--em);
  margin-left: 4px;
}

.post-content {
  font-size: 0.9rem;
  color: var(--txt-m);
  line-height: 1.5;
}

.table {
  border-collapse: separate !important;
  border-spacing: 0 12px !important;
  background: transparent !important;
}

tbody tr {
  background: #ffffff !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05) !important;
  border-radius: 12px !important;
  overflow: hidden;
}

.table td,
.table th {
  padding: 16px 12px;
}

tbody tr td:first-child {
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
}

tbody tr td:last-child {
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
}

.table td {
  padding: 18px 15px !important;
}

.table > :not(caption) > * > * {
  border-bottom-width: 0 !important;
}

.card-row {
  background: #ffffff !important;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05) !important;
  transition: all 0.2s ease;
}

.card-row:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08) !important;
}

.card-row td:first-child {
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
}

.card-row td:last-child {
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
}

.avatar-circle {
  width: 35px;
  height: 35px;
  background: #eef2ff;
  color: #4f46e5;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.9rem;
}

.score-pill {
  padding: 6px 16px;
  color: white;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 700;
  display: inline-block;
}

.avatar-circle {
  width: 35px;
  height: 35px;
  background: #e0f2f1;
  color: #00796b;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 0.9rem;
}

.score-pill {
  padding: 4px 12px;
  color: white;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 700;
  display: inline-block;
}

.btn-emerald-soft {
  background: #ecfdf5;
  color: #059669;
  border: none;
  width: 35px;
  height: 35px;
  border-radius: 50%;
}

.btn-emerald-soft:hover {
  background: #d1fae5;
}

/* TAB 2: People Roster Table */
.roster-container {
  background: #fff;
  border: 1px solid var(--bdr);
  border-radius: 16px;
  padding: 24px;
  box-shadow: var(--sh-sm);
}

.roster-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.roster-header h3 {
  font-size: 1.15rem;
  font-weight: 700;
  margin: 0;
}

.btn-emerald {
  background: var(--em);
  color: #fff;
  font-weight: 700;
  font-size: 0.8rem;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
}

.roster-table {
  width: 100%;
  border-collapse: collapse;
}

.roster-table th {
  padding: 12px 16px;
  font-size: 0.7rem;
  text-transform: uppercase;
  color: var(--txt-mu);
  font-weight: 700;
  border-bottom: 1px solid var(--bdr);
  text-align: left;
}

.roster-table td {
  padding: 14px 16px;
  border-bottom: 1px solid var(--bdr);
  vertical-align: middle;
}

.student-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.student-info img {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  object-fit: cover;
}

.student-info h6 {
  margin: 0;
  font-size: 0.88rem;
  font-weight: 700;
}

.student-info span {
  font-size: 0.7rem;
  color: var(--txt-mu);
}

.bg-online {
  background: rgba(16, 185, 129, 0.1);
  color: var(--em-dk);
}

.bg-offline {
  background: #f1f5f9;
  color: #64748b;
}

.date-lbl {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--txt-m);
}

.btn-remove-student {
  padding: 4px 12px;
  border-radius: 6px;
  border: 1px solid rgba(239, 68, 68, 0.25);
  background: #fff;
  color: #ef4444;
  font-size: 0.7rem;
  font-weight: 700;
  cursor: pointer;
}

.small-meta-lbl {
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--txt-m);
}

.result-grid-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid var(--bdr);
  border-radius: 12px;
  overflow: hidden;
  margin-top: 12px;
}

.rg-header {
  display: grid;
  grid-template-columns: 2.5fr 1.5fr 1.5fr 1.2fr 1fr 100px;
  padding: 12px 16px;
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--txt-mu);
  background: #f8fafc;
  border-bottom: 1px solid var(--bdr);
}

.rg-row {
  display: grid;
  grid-template-columns: 2.5fr 1.5fr 1.5fr 1.2fr 1fr 100px;
  padding: 12px 16px;
  border-bottom: 1px solid var(--bdr);
  align-items: center;
  font-size: 0.82rem;
}

.rg-row:last-child {
  border-bottom: none;
}

.badge-status {
  display: inline-flex;
  align-items: center;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 0.68rem;
  font-weight: 700;
}

.badge-review {
  background: #fef3c7;
  color: #b45309;
}

.badge-graded {
  background: var(--em-soft);
  color: var(--em-dk);
}

.time-text {
  font-weight: 600;
  color: var(--txt);
}

.time-muted {
  color: var(--txt-mu);
}

.score-val {
  font-weight: 700;
  font-size: 1rem;
}

.score-green {
  color: var(--em);
}

.score-orange {
  color: #f59e0b;
}

.score-muted {
  color: var(--txt-mu);
}

.btn-row-action {
  padding: 5px 12px;
  border-radius: 6px;
  font-size: 0.72rem;
  font-weight: 700;
  background: #fff;
  border: 1px solid var(--bdr);
  color: var(--txt-m);
  cursor: pointer;
}

.btn-row-review {
  background: var(--em-soft);
  color: var(--em-dk);
  border-color: transparent;
}

.btn-exams-link {
  background: transparent;
  color: #10b981;
  border: 1px solid #10b981;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.82rem;
  font-weight: 700;
  transition: all 0.3s ease;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.btn-exams-link:hover {
  background: #10b981;
  color: white;
}

.assignment-card-link {
  display: flex !important;
  cursor: pointer !important;
  text-decoration: none !important;
  color: inherit !important;
  transition: all 0.3s ease;
}

.assignment-card-link * {
  cursor: pointer !important;
}

.post-actions {
  position: relative;
}

.btn-action-menu {
  background: none;
  border: none;
  color: var(--txt-mu);
  padding: 4px 8px;
  cursor: pointer;
  border-radius: 6px;
}

.btn-action-menu:hover {
  background: #f1f5f9;
}

.action-dropdown {
  position: absolute;
  right: 0;
  top: 100%;
  background: #fff;
  border: 1px solid var(--bdr);
  border-radius: 10px;
  box-shadow: var(--sh-md);
  z-index: 100;
  min-width: 130px;
  overflow: hidden;
}

.action-dropdown button {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 10px 14px;
  border: none;
  background: none;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  color: var(--txt);
}

.action-dropdown button:hover {
  background: #f8fafc;
}

.action-dropdown button.danger {
  color: #ef4444;
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
}

.edit-modal {
  background: #fff;
  border-radius: 20px;
  padding: 28px;
  width: 480px;
  box-shadow: var(--sh-md);
}

.edit-modal h6 {
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 16px;
}

.btn-cancel {
  padding: 8px 20px;
  border-radius: 30px;
  border: 1px solid var(--bdr);
  background: #fff;
  font-weight: 700;
  font-size: 0.8rem;
  cursor: pointer;
}
.student-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #e5e7eb;
}

.roster-table th {
  background: #f8fafc;
  font-weight: 700;
  white-space: nowrap;
}

.roster-table td {
  vertical-align: middle;
}

.btn-remove-students {
  width: 125px;
  padding: 8px 18px;
  border: 1px solid #ef4444;
  color: #ef4444;
  background: white;
  font-size: 0.9rem;
  border-radius: 8px;
  font-weight: 600;
  transition: 0.2s;
}

.btn-remove-students:hover {
  background: #ef4444;
  color: white;
}
</style>
