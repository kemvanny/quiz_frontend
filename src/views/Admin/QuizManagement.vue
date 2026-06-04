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
                        {{ examDashboardData?.total_exams }}
                    </div>
                    <div style="font-size: 12px; color: var(--text-muted); font-weight: 600">
                        វិញ្ញាសាសរុប
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="dash-card text-center">
                    <div style="font-size: 28px; font-weight: 800; color: #f07a3b">
                        {{ examDashboardData?.total_questions }}
                    </div>
                    <div style="font-size: 12px; color: var(--text-muted); font-weight: 600">
                        សំណួរសរុប
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="dash-card text-center">
                    <div style="font-size: 28px; font-weight: 800; color: var(--green-dark)">
                        {{ examDashboardData?.pending_exams }}
                    </div>
                    <div style="font-size: 12px; color: var(--text-muted); font-weight: 600">
                        កំពុងដំណើរការ
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="dash-card text-center">
                    <div style="font-size: 28px; font-weight: 800; color: #e05c5c">
                        {{ examDashboardData?.finished_exams }}
                    </div>
                    <div style="font-size: 12px; color: var(--text-muted); font-weight: 600">
                        បានបញ្ចប់
                    </div>
                </div>
            </div>
        </div>

        <DataTable :headers="quizHeaders" :items="exams" :is-loading="isLoading" >
            <template #row="{ item, index }">
                <td>{{ index + 1 }}</td>
                <td>{{ item.title }}</td>
                <!-- <td>{{ item.room_name }}</td> -->
                <td>{{ item.teacher_name }}</td>
                <td>
                    <StatusBadge :type="item.status" />
                </td>
                <!-- <td>{{ item.submissions_count }}</td> -->
                <!-- <td>{{ item.average_score }}</td> -->
                <td>{{ formatDate(item.created_at) }}</td>
                <td>
                    <button class="btn btn-sm bi bi-eye text-success"></button>
                </td>
            </template>
        </DataTable>
    </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { getAllExams ,getDashboardExamData} from "@/api/admin.api";
import { useDate } from "@/composables/useDate";
import StatusBadge from "@/components/common/StatusBadge.vue";

const { formatDate } = useDate();
const exams = ref([]);
const examDashboardData = ref();

const isLoading = ref(false);

const quizHeaders = [
    { label: "លេខសម្គាល់", key: "id" },
    { label: "ចំណងជើង", key: "title" },
    // { label: "បន្ទប់", key: "room" },
    { label: "គ្រូបង្រៀន", key: "teacher" },
    { label: "ស្ថានភាព", key: "status" },
    // { label: "ការដាក់បញ្ជូន", key: "submissions" },
    // { label: "ពិន្ទុមធ្យម", key: "averageScore" },
    { label: "ថ្ងៃបង្កើត", key: "createdAt" },
    { label: "សកម្មភាព", key: "actions" },
];

const fetchExam = async () => {
    isLoading.value = true;
    try {
        const res = await getAllExams();
        exams.value = res.data.data;
    } catch (error) {
        console.log(error);
    } finally {
        isLoading.value = false;
    }
}

const fetchExamDashboardData = async () => {
    try {
        const res = await getDashboardExamData();
        examDashboardData.value = res.data.data;
    } catch (error) {
        console.log(error);
    }
}

onMounted(() => {
    fetchExam();
    fetchExamDashboardData();
})

</script>
