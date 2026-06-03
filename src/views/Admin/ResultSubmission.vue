<template>
  <!-- ══ RESULTS & SUBMISSIONS SECTION ══ -->
  <div id="section-results" style="display: block">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <div class="page-title">លទ្ធផល និងការបញ្ជូនចម្លើយ</div>
        <div class="page-subtitle">
          រាល់ការដាក់បញ្ជូនចម្លើយរបស់សិស្សនៅក្នុងប្រព័ន្ធទាំងមូល
        </div>
      </div>
      <BaseButton extraClass="btn-outline-green">
        <i class="bi bi-download me-1"></i> ទាញយកជាឯកសារ CSV
      </BaseButton>
    </div>

    <!-- SearchFilter Component -->
    <SearchFilter
      placeholder="ស្វែងរកសិស្ស ឬកម្រងសំណួរ..."
      @update:search="searchQuery = $event"
    >
      <template #filters>
        <div class="col-md-2">
          <select class="form-select" v-model="selectedQuiz">
            <option value="">កម្រងសំណួរទាំងអស់</option>
            <!-- loopបង្ហាញកម្រងសំណួរ -->
          </select>
        </div>
        <div class="col-md-2">
          <select class="form-select" v-model="selectedRoom">
            <option value="">បន្ទប់ទាំងអស់</option>
          </select>
        </div>
      </template>
    </SearchFilter>

    <!-- ប្រើ DataTable Component -->
    <DataTable :headers="submissionHeaders" :items="submissions" :is-loading="isLoading">
      <template #row="{ item , index}">
        <td>{{ index + 1 }}</td>
        <td>{{ item.user_name }}</td>
        <td>{{ item.quiz_title }}</td>
        <td>{{ item.roomName }}</td>
        <td>{{ item.score }}</td>
        <td>{{ item.totalMarks }}</td>
        <td>{{ item.percentage }}%</td>
        <td>{{formatDate (item.submitted_at) }}</td>
        <td>
          <span :class="['badge', getGradeClass(item.grade)]">
            {{ item.grade }}
          </span>
        </td>
      </template>
    </DataTable>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { recentActivity } from "@/api/admin.api";
import { useDate } from "@/composables/useDate";

const {formatDate} = useDate();

const submissions = ref([]);
const searchQuery = ref("");
const selectedQuiz = ref("");
const selectedRoom = ref("");
const isLoading = ref(false);

const submissionHeaders = [
  { label: "លេខសម្គាល់", key: "id" },
  { label: "សិស្ស", key: "student" },
  { label: "វិញ្ញាសា", key: "quiz" },
  { label: "បន្ទប់", key: "room" },
  { label: "ពិន្ទុ", key: "score" },
  { label: "ពិន្ទុសរុប", key: "total" },
  { label: "ភាគរយ", key: "percentage" },
  { label: "ថ្ងៃបញ្ជូនចម្លើយ", key: "date" },
  { label: "និទ្ទេស", key: "grade" },
];

const fetchResultSubmission = async () => {
  isLoading.value = true;
  try{
    const res = await recentActivity();
    submissions.value = res.data.data.logs;

  }catch(error){
    console.log(error);
  }finally{
    isLoading.value = false;
  }
}

const getGradeClass = (grade) => {
  if (grade === "A") return "bg-success";
  if (grade === "F") return "bg-danger";
  return "bg-primary";
};

onMounted(() => {
  fetchResultSubmission();
})

</script>