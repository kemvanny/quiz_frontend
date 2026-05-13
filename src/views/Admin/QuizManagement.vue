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
                        2,221
                    </div>
                    <div style="font-size: 12px; color: var(--text-muted); font-weight: 600">
                        កម្រងសំណួរសរុប
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="dash-card text-center">
                    <div style="font-size: 28px; font-weight: 800; color: #f07a3b">
                        43
                    </div>
                    <div style="font-size: 12px; color: var(--text-muted); font-weight: 600">
                        សេចក្តីព្រាង
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="dash-card text-center">
                    <div style="font-size: 28px; font-weight: 800; color: var(--green-dark)">
                        121
                    </div>
                    <div style="font-size: 12px; color: var(--text-muted); font-weight: 600">
                        កំពុងដំណើរការ
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="dash-card text-center">
                    <div style="font-size: 28px; font-weight: 800; color: #e05c5c">
                        2,057
                    </div>
                    <div style="font-size: 12px; color: var(--text-muted); font-weight: 600">
                        បានបញ្ចប់
                    </div>
                </div>
            </div>
        </div>

        <DataTable :headers="quizHeaders" :items="quizzes">
            <template #row="{ item, index }">
                <td>{{ index + 1 }}</td>
                <td>{{ item.title }}</td>
                <td>{{ item.room }}</td>
                <td>{{ item.teacher }}</td>
                <td>{{ item.status }}</td>
                <td>{{ item.submissions }}</td>
                <td>{{ item.averageScore }}</td>
                <td>{{ item.createdAt }}</td>
                <td>
                    <button class="btn btn-sm bi bi-pencil-square"></button>
                    <button class="btn btn-sm bi bi-trash text-danger"></button>
                </td>
            </template>
        </DataTable>
    </div>
</template>
<script setup>
import { ref } from "vue";
import DataTable from "@/components/common/DataTable.vue";
const quizHeaders = [
    { label: "លេខសម្គាល់", key: "id" },
    { label: "ចំណងជើង", key: "title" },
    { label: "បន្ទប់", key: "room" },
    { label: "គ្រូបង្រៀន", key: "teacher" },
    { label: "ស្ថានភាព", key: "status" },
    { label: "ការដាក់បញ្ជូន", key: "submissions" },
    { label: "ពិន្ទុមធ្យម", key: "averageScore" },
    { label: "ថ្ងៃបង្កើត", key: "createdAt" },
    { label: "សកម្មភាព", key: "actions" },
];
const quizzes = ref([]);
</script>
