<template>
  <div class="d-flex flex-column flex-sm-row justify-content-between align-items-center gap-3 pt-3 px-2 border-top w-100">
    
    <div class="text-muted text-center text-sm-start" style="font-size: 13px;">
      បង្ហាញ <b>{{ startRecord }}</b> ដល់ <b>{{ endRecord }}</b> នៃទិន្នន័យសរុប <b>{{ total }}</b>
    </div>

    <nav aria-label="Page navigation">
      <ul class="pagination pagination-sm mb-0 gap-1 flex-wrap justify-content-center">
        
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <button class="page-link rounded-2 d-flex align-items-center justify-content-center" @click="changePage(currentPage - 1)">
            <i class="bi bi-chevron-left"></i>
          </button>
        </li>

        <li v-for="page in displayedPages" :key="page" class="page-item" :class="{ active: currentPage === page }">
          <button class="page-link rounded-2 fw-semibold" @click="changePage(page)">
            {{ page }}
          </button>
        </li>

        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
          <button class="page-link rounded-2 d-flex align-items-center justify-content-center" @click="changePage(currentPage + 1)">
            <i class="bi bi-chevron-right"></i>
          </button>
        </li>
      </ul>
    </nav>
    
  </div>
</template>

<script setup>
import { computed } from 'vue';

const maxVisiblePages = 2;

const props = defineProps({
  currentPage: { type: Number, required: true },
  limit: { type: Number, required: true },
  total: { type: Number, required: true }
});

const emit = defineEmits(['update:page']);

const totalPages = computed(() => Math.ceil(props.total / props.limit) || 1);

const displayedPages = computed(() => {
  const pages = [];
  let start = Math.max(1, props.currentPage - Math.floor(maxVisiblePages / 2));
  let end = Math.min(totalPages.value, start + maxVisiblePages - 1);

  if (end - start + 1 < maxVisiblePages) {
    start = Math.max(1, end - maxVisiblePages + 1);
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  return pages;
});

const startRecord = computed(() => props.total === 0 ? 0 : ((props.currentPage - 1) * props.limit) + 1);
const endRecord = computed(() => {
  const currentEnd = props.currentPage * props.limit;
  return currentEnd > props.total ? props.total : currentEnd;
});

const changePage = (page) => {
  if (page < 1 || page > totalPages.value) return;
  emit('update:page', page); 
};
</script>

<style scoped>
.pagination .page-link {
  color: #2a9d6a;
  background-color: #fff;
  border: 1px solid #e2e8f0;
  padding: 6px 12px;
  min-width: 32px; 
  height: 32px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.pagination .page-link:hover {
  background-color: #e8f8f0;
  border-color: #2a9d6a;
  color: #2a9d6a;
}

.pagination .page-item.active .page-link {
  background-color: #2a9d6a !important;
  border-color: #2a9d6a !important;
  color: #fff !important;
  box-shadow: 0 4px 6px -1px rgba(42, 157, 106, 0.2);
}

.pagination .page-item.disabled .page-link {
  color: #cbd5e1;
  background-color: #f8fafc;
  border-color: #e2e8f0;
  cursor: not-allowed;
}
</style>