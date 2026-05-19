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
                    <tr v-for="(item, index) in items" :key="index">
                        <slot name="row" :item="item" :index="index"></slot>
                    </tr>
                    <tr v-if="items.length === 0">
                        <td :colspan="headers.length" class="text-center">មិនមានទិន្នន័យឡើយ</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
defineProps({
    headers: { type: Array, required: true },
    items: { type: Array, required: true, default: () => [] }
});
</script>