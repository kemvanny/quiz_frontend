<template>
    <div>
        <!-- Title Section -->
        <div class="d-flex justify-content-between align-items-center mb-4">
            <div>
                <div class="page-title">គ្រប់គ្រងអ្នកប្រើប្រាស់</div>
                <div class="page-subtitle">គ្រប់គ្រងគណនីគ្រូបង្រៀន សិស្ស និង admin</div>
            </div>
            <BaseButton>
                <i class="bi bi-person-plus-fill me-1"></i>បង្កើតគណនី
            </BaseButton>
            
        </div>

        <!-- Search Component -->
        <SearchFilter placeholder="ស្វែងរកតាមឈ្មោះ ឬអ៊ីមែល..." @update:search="searchQuery = $event">
            <template #filters>
                <div class="col-md-2">
                    <select class="form-select custom-input" v-model="selectedRole">
                        <option value="">តួនាទីទាំងអស់</option>
                        <option value="Teacher">គ្រូបង្រៀន</option>
                        <option value="Student">សិស្ស</option>
                        <option value="Admin">អ្នកគ្រប់គ្រង</option>
                    </select>
                </div>
            </template>
            <template #status>
                <div class="col-md-2">
                    <select class="form-select custom-input" id="statusFilter" onchange="filterUsers()">
                        <option value="">ស្ថានភាពទាំងអស់</option>
                        <option value="Active">សកម្មភាព</option>
                        <option value="Inactive">អសកម្ម</option>
                    </select>
                </div>
            </template>
            <template #right-side>
                <span>ចំនួនសរុប: {{ filteredUsers.length }}</span>
            </template>
        </SearchFilter>

        <!-- Table Component -->
        <DataTable :headers="userHeaders" :items="filteredUsers">
            <template #row="{ item, index }">
                <td>{{ index + 1 }}</td>
                <td>{{ item.name }}</td>
                <td>{{ item.email }}</td>
                <td>
                    <span class="badge">{{ item.role }}</span>
                </td>
                <td>{{ item.status }}</td>
                <td>{{ item.joinedDate }}</td>
                <td>
                    <button class="btn btn-sm bi bi-pencil-square"></button>
                    <button class="btn btn-sm bi bi-trash text-danger"></button>
                </td>
            </template>
        </DataTable>
    </div>
</template>

<script setup>
import BaseButton from "@/components/common/BaseButton.vue";
import { ref, computed } from "vue";

const searchQuery = ref("");
const selectedRole = ref("");

//  Header
const userHeaders = [
    { label: "លេខសម្គាល់", key: "id" },
    { label: "ឈ្មោះ", key: "name" },
    { label: "អ៊ីមែល", key: "email" },
    { label: "តួនាទី", key: "role" },
    { label: "ស្ថានភាព", key: "status" },
    { label: "ចូលរួម", key: "date" },
    { label: "សកម្មភាព", key: "actions" },
];

const users = ref([
    /* ទិន្នន័យពី API */
]);

const filteredUsers = computed(() => {
    return users.value.filter(
        (u) =>
            u.name.toLowerCase().includes(searchQuery.value.toLowerCase()) &&
            (selectedRole.value === "" || u.role === selectedRole.value),
    );
});
</script>
