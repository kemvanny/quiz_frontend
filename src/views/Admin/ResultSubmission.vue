<template>
  <div id="section-results" style="display: block">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <div class="page-title">លទ្ធផល និងការបញ្ជូនចម្លើយ</div>
        <div class="page-subtitle">
          រាល់ការដាក់បញ្ជូនចម្លើយរបស់សិស្សនៅក្នុងប្រព័ន្ធទាំងមូល
        </div>
      </div>
      <BaseButton extraClass="btn-outline-green" @click="exportToCSV">
        <i class="bi bi-download me-1"></i> ទាញយកជាឯកសារ CSV
      </BaseButton>
    </div>

    <SearchFilter placeholder="ស្វែងរកសិស្ស ឬកម្រងសំណួរ..." @update:search="searchQuery = $event">
      <template #filters>
        <div class="col-md-3">
          <select class="form-select" v-model="selectedQuiz">
            <option value="">កម្រងសំណួរទាំងអស់</option>
            <option v-for="quiz in uniqueQuizzes" :key="quiz" :value="quiz">
              {{ quiz }}
            </option>
          </select>
        </div>

      </template>
    </SearchFilter>

    <DataTable :headers="submissionHeaders" :items="filteredSubmissions" :is-loading="isLoading" :current-page="currentPage" :limit="limit" :total="totalRecords" @update:page="changePage">
      <template #row="{ item }">
        <td>{{item.user_id }}</td>
        <td>{{ item.display_student_name }}</td>
        <td>{{ item.display_quiz_title }}</td>
        <td class="fw-bold text-success">{{ item.display_score }}</td>
        <td class="text-muted">{{ item.display_total_marks }}</td>
        <td>{{ item.computed_percentage }}</td>
        <td>{{ formatDate(item.submitted_at) }}</td>
        <td>
          <span :class="['badge-grade', getGradeClass(item.computed_grade)]">
            {{ item.computed_grade }}
          </span>
        </td>
      </template>
    </DataTable>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { getAllSubmissions } from "@/api/admin.api";
import { useDate } from "@/composables/useDate";

const { formatDate } = useDate();

const submissions = ref([]);
const searchQuery = ref("");
const selectedQuiz = ref("");
const isLoading = ref(false);

const currentPage = ref(1);
const limit = ref(10);
const totalRecords = ref(0);

const submissionHeaders = [
  { label: "លេខសម្គាល់", key: "id" },
  { label: "សិស្ស", key: "student" },
  { label: "វិញ្ញាសា", key: "quiz" },
  { label: "ពិន្ទុ", key: "score" },
  { label: "ពិន្ទុសរុប", key: "total" },
  { label: "ភាគរយ", key: "percentage" },
  { label: "ថ្ងៃបញ្ជូនចម្លើយ", key: "date" },
  { label: "និទ្ទេស", key: "grade" },
];


// Data Filtering
const uniqueQuizzes = computed(() => {
  const quizzes = submissions.value.map(item => item.display_quiz_title);
  return [...new Set(quizzes)].filter(Boolean);
});



// Search & Filter
const filteredSubmissions = computed(() => {
  return submissions.value.filter((item) => {
    const studentName = item.display_student_name ? item.display_student_name.toLowerCase() : "";
    const quizTitle = item.display_quiz_title ? item.display_quiz_title.toLowerCase() : "";
    const search = searchQuery.value.toLowerCase();

    const matchesSearch = studentName.includes(search) || quizTitle.includes(search);
    const matchesQuiz = selectedQuiz.value === "" || item.display_quiz_title === selectedQuiz.value;
   

    return matchesSearch && matchesQuiz;
  });
});


// Grade
const calculateGrade = (score, maxScore = 10) => {
  const percentage = (score / maxScore) * 100;
  if (percentage >= 90) return 'A';
  if (percentage >= 80) return 'B';
  if (percentage >= 70) return 'C';
  if (percentage >= 60) return 'D';
  if (percentage >= 50) return 'E'
  return 'F';
};

const getGradeClass = (grade) => {
  if (grade === 'A') return 'grade-a';
  if (grade === 'B' || grade === 'C') return 'grade-b-c';
  return 'grade-fail';
};

const fetchResultSubmission = async () => {
  isLoading.value = true;
  try {
    const res = await getAllSubmissions({
      page: currentPage.value,
      limit: limit.value
    });
    if (res.data && res.data.result) {
      const rawSubmissions = res.data.data.submissions || [];

      submissions.value = rawSubmissions.map(item => {
        const currentScore = Number(item.score);
        const maxScore = Number(item.total_points);
        const percentage = (currentScore / maxScore) * 100;

        return {
          ...item,
          display_student_name: item.student?.name || item.user_name || "មិនស្គាល់ឈ្មោះ",
          display_quiz_title: item.exam?.title || item.quiz_title || "មិនស្គាល់វិញ្ញាសា",
          display_score: currentScore.toFixed(2),
          display_total_marks: maxScore.toFixed(2),
          computed_percentage: percentage.toFixed(0) + '%',
          computed_grade: calculateGrade(currentScore, maxScore)
        };
      });

      totalRecords.value = res.data.data.total || 0;
      currentPage.value = res.data.data.page || 1;
      limit.value = res.data.data.limit || 10;
    }
  } catch (error) {
    console.error("Error fetching submissions:", error);
  } finally {
    isLoading.value = false;
  }
};

const changePage = async (newPage) => {
    currentPage.value = newPage;
    await fetchResultSubmission();
};

const exportToCSV = () => {
  const headers = ["ល.រ", "ឈ្មោះសិស្ស", "វិញ្ញាសា", "ពិន្ទុទទួលបាន", "ពិន្ទុសរុប", "ភាគរយ", "ថ្ងៃបញ្ជូនចម្លើយ", "និទ្ទេស"];

  const rows = filteredSubmissions.value.map((item, index) => [
    index + 1,
    item.display_student_name,
    item.display_quiz_title,
    item.display_score,
    item.display_total_marks,
    item.computed_percentage,
    formatDate(item.submitted_at),
    item.computed_grade
  ]);

  const csvContent = "\ufeff" + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement("a");
  const dateStr = new Date().toISOString().slice(0, 10);
  
  link.setAttribute("href", url);
  link.setAttribute("download", `លទ្ធផល_បញ្ជូនចម្លើយ_${dateStr}.csv`);
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// LIFECYCLE HOOKS
onMounted(() => {
  fetchResultSubmission();
});
</script>

<style scoped>
.badge-grade {
  padding: 5px 12px;
  border-radius: 30px;
  font-weight: 700;
  font-size: 12px;
  display: inline-block;
  min-width: 35px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
}

.grade-a {
  background: linear-gradient(135deg, rgba(232, 245, 233, 0.5) 0%, rgba(200, 230, 201, 0.5) 100%);
  color: #1b5e20;
  border: 1px solid rgba(46, 125, 50, 0.15);
}

.grade-b-c {
  background: linear-gradient(135deg, rgba(224, 242, 254, 0.5) 0%, rgba(186, 230, 253, 0.5) 100%);
  color: #0369a1;
  border: 1px solid rgba(3, 105, 161, 0.15);
}

.grade-fail {
  background: linear-gradient(135deg, rgba(255, 235, 238, 0.5) 0%, rgba(255, 205, 210, 0.5) 100%);
  color: #c62828;
  border: 1px solid rgba(198, 40, 40, 0.15);
}
</style>
