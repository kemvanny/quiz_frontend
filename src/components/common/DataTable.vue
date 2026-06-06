<!-- DataTable.vue -->
<template>
    <div class="dash-card">
        <div style="overflow-x: auto">
            <table class="dash-table">
                <thead>
                    <tr>
                        <th v-for="col in headers" :key="col.key">{{ col.label }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="isLoading">
                        <td :colspan="headers.length" class="text-center py-5">
                            <div class="spinner-border text-success" role="status" style="width: 2rem; height: 2rem;">
                                <span class="visually-hidden">កំពុងផ្ទុក...</span>
                            </div>
                            <div class="text-muted mt-2" style="font-size: 14px;">កំពុងទាញយកទិន្នន័យ...</div>
                        </td>
                    </tr>

                    <template v-else>
                        <tr v-for="(item, index) in items" :key="index">
                            <slot name="row" :item="item" :index="index"></slot>
                        </tr>

                        <tr v-if="items.length === 0">
                            <td :colspan="headers.length" class="text-center py-4 text-muted">មិនមានទិន្នន័យឡើយ</td>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>
        <div class="mt-3" v-if="total > 0">
            <BasePagination :current-page="currentPage" :limit="limit" :total="total"
                @update:page="(page) => $emit('update:page', page)" />
        </div>
    </div>
</template>

<script setup>
defineProps({
    headers: { type: Array, required: true },
    items: { type: Array, required: true, default: () => [] },
    isLoading: { type: Boolean, default: false },
    currentPage: { type: Number, default: 1 },
    limit: { type: Number, default: 10 },
    total: { type: Number, default: 0 }
});

defineEmits(['update:page']);
</script>
