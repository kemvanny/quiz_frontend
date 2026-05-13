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
      <button class="btn-outline-green">
        <i class="bi bi-download me-1"></i> ទាញយកជាឯកសារ CSV
      </button>
    </div>

    <!-- SearchFilter Component -->
    <SearchFilter 
      placeholder="ស្វែងរកសិស្ស ឬកម្រងសំណួរ..." 
      @update:search="searchQuery = $event"
    >
      <template #filters>
        <div class="col-md-2">
          <select class="form-select " v-model="selectedQuiz">
            <option value="">កម្រងសំណួរទាំងអស់</option>
            <!-- loopបង្ហាញកម្រងសំណួរ -->
          </select>
        </div>
        <div class="col-md-2">
          <select class="form-select " v-model="selectedRoom">
            <option value="">បន្ទប់ទាំងអស់</option>
          </select>
        </div>
      </template>
    </SearchFilter>

    <!-- ប្រើ DataTable Component -->
    <DataTable :headers="submissionHeaders" :items="filteredSubmissions">
      <template #row="{ item }">
        <td>{{ item.id }}</td>
        <td>{{ item.studentName }}</td>
        <td>{{ item.quizTitle }}</td>
        <td>{{ item.roomName }}</td>
        <td>{{ item.score }}</td>
        <td>{{ item.totalMarks }}</td>
        <td>{{ item.percentage }}%</td>
        <td>{{ item.submittedAt }}</td>
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
import { ref, computed } from 'vue';
import SearchFilter from '@/components/common/SearchFilter.vue';
import DataTable from '@/components/common/DataTable.vue';

const submissionHeaders = [
  { label: 'លេខសម្គាល់', key: 'id' },
  { label: 'សិស្ស', key: 'student' },
  { label: 'កម្រងសំណួរ', key: 'quiz' },
  { label: 'បន្ទប់', key: 'room' },
  { label: 'ពិន្ទុ', key: 'score' },
  { label: 'ពិន្ទុសរុប', key: 'total' },
  { label: 'ភាគរយ', key: 'percentage' },
  { label: 'ថ្ងៃបញ្ជូនចម្លើយ', key: 'date' },
  { label: 'និទ្ទេស', key: 'grade' }
];

// ទិន្នន័យ ទាញពី API
const submissions = ref([
  // ឧទាហរណ៍៖ { id: 'S-001', studentName: 'កក្កដា', ... }
]);

const searchQuery = ref('');
const selectedQuiz = ref('');
const selectedRoom = ref('');

// Filter
const filteredSubmissions = computed(() => {
  return submissions.value.filter(s => {
    const matchSearch = s.studentName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                        s.quizTitle.toLowerCase().includes(searchQuery.value.toLowerCase());
    return matchSearch;
  });
});

//  Grade
const getGradeClass = (grade) => {
  if (grade === 'A') return 'bg-success';
  if (grade === 'F') return 'bg-danger';
  return 'bg-primary';
};
</script>