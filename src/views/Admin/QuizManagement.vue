<template>
    <!-- ══ QUIZ MANAGEMENT SECTION ══ -->
    <div id="section-quizzes" style="display: block">
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

        <DataTable :headers="quizHeaders" :items="exams" :is-loading="isLoading" :current-page="currentPage"
            :limit="limit" :total="totalRecords" @update:page="changePage">
            <template #row="{ item, index }">
                <td>{{ (currentPage - 1) * limit + index + 1 }}</td>
                <td>{{ item.title }}</td>
                <td>{{ item.teacher_name }}</td>
                <td>
                    <StatusBadge :type="item.status" />
                </td>
                <td>{{ formatDate(item.created_at) }}</td>
                <td>
                    <button class="btn btn-sm bi bi-eye text-success" @click="viewQuiz(item)"></button>
                </td>
            </template>
        </DataTable>
    </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { getAllExams, getDashboardExamData } from "@/api/admin.api";
import { useDate } from "@/composables/useDate";
import StatusBadge from "@/components/common/StatusBadge.vue";

const { formatDate } = useDate();

const exams = ref([]);
const examDashboardData = ref();
const currentPage = ref(1);
const limit = ref(10);
const totalRecords = ref(0);

const isLoading = ref(false);
const isLoadingQuiz = ref(false);

const isOpen = ref(false);
const selectedQuiz = ref(null); // បង្កើត state សម្រាប់រក្សាទុកព័ត៌មាន Quiz ដែលចុច

const viewQuiz = (item) => {
    selectedQuiz.value = item; 
    isOpen.value = true;       
};

const quizHeaders = [
    { label: "លេខសម្គាល់", key: "id" },
    { label: "ចំណងជើង", key: "title" },
    { label: "គ្រូបង្រៀន", key: "teacher" },
    { label: "ស្ថានភាព", key: "status" },
    { label: "ថ្ងៃបង្កើត", key: "createdAt" },
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
            exams.value = rawExams.sort(
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
