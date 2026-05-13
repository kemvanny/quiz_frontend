<template>
    <div>
        <!-- Title Section -->
        <div class="d-flex justify-content-between align-items-center mb-4">
            <div>
                <div class="page-title">គ្រប់គ្រងអ្នកប្រើប្រាស់</div>
                <div class="page-subtitle">គ្រប់គ្រងគណនីគ្រូបង្រៀន សិស្ស និង admin</div>
            </div>
            <BaseButton @click="isModalOpen = true">
                <i class="bi bi-person-plus-fill me-1"></i>បង្កើតគណនីអ្នកប្រើប្រាស់
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
        <!-- BaseModal -->
        <BaseModal :is-open="isModalOpen" title="បង្កើតគណនី" subtitle="បន្ថែមអ្នកប្រើប្រាស់ទៅក្នុងប្រព័ន្ធរបស់អ្នក"
            tag="អ្នកប្រើប្រាស់ថ្មី" width="600px" @close="isModalOpen = false">
            <div class="glass-grid">
                <div class="glass-field">
                    <label>នាមខ្លួន</label>
                    <input type="text" placeholder="អាន">
                </div>

                <div class="glass-field">
                    <label>នាមត្រកូល</label>
                    <input type="text" placeholder="ដានីកា">
                </div>

                <div class="glass-field full">
                    <label>អ៊ីមែល</label>
                    <input type="email" placeholder="andanika@gmail.com">
                </div>
                <div class="glass-field full">
                    <label>តួនាទី</label>

                    <div class="role-chips">
                        <label class="chip " :class="{ 'active': selectedRole === 'student' }">
                            <input type="radio" value="student" v-model="selectedRole" checked hidden>
                            <i class="bi bi-mortarboard"></i> សិស្ស
                        </label>

                        <label class="chip" :class="{ 'active': selectedRole === 'teacher' }">
                            <input type="radio" value="teacher" v-model="selectedRole" hidden>
                            <i class="bi bi-easel"></i> គ្រូបង្រៀន
                        </label>

                        <label class="chip" :class="{ 'active': selectedRole === 'admin' }">
                            <input type="radio" value="admin" v-model="selectedRole" hidden>
                            <i class="bi bi-shield-lock"></i>អ្នកគ្រប់គ្រង
                        </label>
                    </div>
                </div>
            </div>

            <template #footer>
                <button class="btn  btn-outline-secondary" @click="isModalOpen = false">បោះបង់</button>
                <BaseButton @click="handleCreate">បង្កើតអ្នកប្រើប្រាស់</BaseButton>
            </template>
        </BaseModal>
    </div>
</template>

<script setup>
import { ref, computed } from "vue";

const isModalOpen = ref(false);

const selectedRole = ref('student');

const handleCreate = (data) => {
  isModalOpen.value = false;
}

const searchQuery = ref("");
const selectedRoles = ref("");

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
            (selectedRoles.value === "" || u.role === selectedRoles.value),
    );
});
</script>
