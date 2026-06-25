<template>
    <!-- ══ QUIZ MANAGEMENT SECTION ══ -->
    <div id="section-quizzes" >
        <div class="d-flex justify-content-between align-items-center mb-4">
            <div>
                <div class="page-title">ការគ្រប់គ្រងកម្រងសំណួរ</div>
                <div class="page-subtitle">តាមដានរាល់កម្រងសំណួរនៅតាមបន្ទប់ទាំងអស់</div>
            </div>
        </div>

        <!-- MINI STATS -->
        <div class="row g-3 mb-3">
            <div class="col-md-3">
                <div class="dash-card text-center">
                    <div style="
              font-size: 28px;
              font-weight: 800;
              color: var(--green-primary);
            ">
                        <span v-if="isLoadingQuiz" class="skeleton skeleton-text"></span>
                        <span v-else>{{ examDashboardData?.total_exams ?? 0 }}</span>
                    </div>
                    <div style="font-size: 12px; color: var(--text-muted); font-weight: 600">
                        វិញ្ញាសាសរុប
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="dash-card text-center">
                    <div style="font-size: 28px; font-weight: 800; color: #f07a3b">
                        <span v-if="isLoadingQuiz" class="skeleton skeleton-text"></span>
                        <span v-else>{{ examDashboardData?.total_questions ?? 0 }}</span>
                    </div>
                    <div style="font-size: 12px; color: var(--text-muted); font-weight: 600">
                        សំណួរសរុប
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="dash-card text-center">
                    <div style="font-size: 28px; font-weight: 800; color: var(--green-dark)">
                        <span v-if="isLoadingQuiz" class="skeleton skeleton-text"></span>
                        <span v-else>{{ examDashboardData?.pending_exams ?? 0 }}</span>
                    </div>
                    <div style="font-size: 12px; color: var(--text-muted); font-weight: 600">
                        កំពុងដំណើរការ
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="dash-card text-center">
                    <div style="font-size: 28px; font-weight: 800; color: #e05c5c">
                        <span v-if="isLoadingQuiz" class="skeleton skeleton-text"></span>
                        <span v-else>{{ examDashboardData?.finished_exams ?? 0 }}</span>
                    </div>
                    <div style="font-size: 12px; color: var(--text-muted); font-weight: 600">
                        បានបញ្ចប់
                    </div>
                </div>
            </div>
        </div>

        <DataTable :headers="quizHeaders" :items="exam" :is-loading="isLoading" :current-page="currentPage"
            :limit="limit" :total="totalRecords" @update:page="changePage">
            <template #row="{ item, index }">
                <td>{{ (currentPage - 1) * limit + index + 1 }}</td>
                <td>{{ item.title }}</td>
                <td>{{ item.teacher_name }}</td>
                <td>
                    <StatusBadge :type="item.status" />
                </td>
                <td>
                    <button class="btn btn-sm  btn-action-view" @click="openQuizDetail(item)"><i
                            class="bi bi-arrow-right-short"></i>លម្អិត</button>
                </td>
            </template>
        </DataTable>

        <QuizDetailModal :show="isOpenQuizDetail" :exam="selectedQuiz" @close="isOpenQuizDetail = false" />
    </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { getAllExams, getDashboardExamData, getQuizDetail } from "@/api/admin.api";
import StatusBadge from "@/components/common/StatusBadge.vue";
import QuizDetailModal from "@/components/admin/QuizDetailModal.vue";

const exam = ref([]);
const examDashboardData = ref();
const currentPage = ref(1);
const limit = ref(10);
const totalRecords = ref(0);

const isLoading = ref(false);
const isLoadingQuiz = ref(false);


const isOpenQuizDetail = ref(false);
const selectedQuiz = ref(null);

const openQuizDetail = async (item) => {

    try {
        const response = await getQuizDetail(item.id);
        if (response.data.data) {
            selectedQuiz.value = response.data.data;
            isOpenQuizDetail.value = true;
        }
    } catch (err) {
        console.error("មិនអាចទាញយកទិន្នន័យបានទេ៖", err);
    }
};

const quizHeaders = [
    { label: "លេខសម្គាល់", key: "id" },
    { label: "ចំណងជើង", key: "title" },
    { label: "គ្រូបង្រៀន", key: "teacher" },
    { label: "ស្ថានភាព", key: "status" },
    { label: "សកម្មភាព", key: "actions" },
];

const changePage = async (newPage) => {
    currentPage.value = newPage;
    await fetchExam();
};

const fetchExam = async () => {
    isLoading.value = true;
    try {
        const res = await getAllExams({
            page: currentPage.value,
            limit: limit.value,
        });
        if (res.data && res.data.data) {
            const rawExams = res.data.data.quizzes || [];
            exam.value = rawExams.sort(
                (a, b) => new Date(b.created_at) - new Date(a.created_at),
            );
            totalRecords.value = res.data.data.total || 0;
            currentPage.value = res.data.data.page || 1;
            limit.value = res.data.data.limit || 10;
        }
    } catch (error) {
        console.log("Cannot get quizzes", error);
    } finally {
        isLoading.value = false;
    }
};

const fetchExamDashboardData = async () => {
    try {
        isLoadingQuiz.value = true;
        const res = await getDashboardExamData();
        examDashboardData.value = res.data.data;
    } catch (error) {
        console.log("Cannot get exam dashboard data", error);
    } finally {
        isLoadingQuiz.value = false;
    }
};

onMounted(() => {
    fetchExam();
    fetchExamDashboardData();
});
</script>

<style scoped>
.btn-action-view {
    background: transparent;
    color: #26a269;
    border: 1px solid rgba(38, 162, 105, 0.4);
    padding: 4px 10px;
    border-radius: 15px;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 2px;
    transition: all 0.2s ease;
}

.btn-action-view:hover {
    background: linear-gradient(135deg, rgba(232, 245, 233, 0.8) 0%, rgba(200, 230, 201, 0.8) 100%);
    color: #1b5e20;
    border-color: #26a269;
    box-shadow: 0 2px 8px rgba(38, 162, 105, 0.15);
}

.bt-action-view i {
    font-size: 16px;
    line-height: 1;
}
.modal-backdrop-custom {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 9999; /* ធានាថាវាបង្ហាញពីលើគេ */
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
