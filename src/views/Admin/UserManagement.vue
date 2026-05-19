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
                    <select class="form-select custom-input" v-model="selectedRoleForFilter">
                        <option value="">តួនាទីទាំងអស់</option>
                        <option value="teacher">គ្រូបង្រៀន</option>
                        <option value="student">សិស្ស</option>
                        <option value="admin">អ្នកគ្រប់គ្រង</option>
                    </select>
                </div>
            </template>
            <template #status>
                <div class="col-md-2">
                    <select class="form-select custom-input" id="statusFilter" @change="filteredUsers">
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
            <template #row="{ item }">
                <td>{{ item.user_code }}</td>
                <td>{{ item.fullName }}</td>
                <td>{{ item.email }}</td>
                <td>{{ item.role }}</td>
                <td>{{ item.status || 'Active' }}</td>
                <td>{{ formatDate(item.created_at) }}</td>
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
                    <input type="text" placeholder="អាន" v-model="form.firstName"
                        :class="{ 'input-error': errors.firstName }">
                    <span v-if="errors.firstName" class="text-danger-msg">{{ errors.firstName }}</span>
                </div>

                <div class="glass-field">
                    <label>នាមត្រកូល</label>
                    <input type="text" placeholder="ដានីកា" v-model="form.lastName"
                        :class="{ 'input-error': errors.lastName }">
                    <span v-if="errors.lastName" class="text-danger-msg">{{ errors.lastName }}</span>
                </div>

                <div class="glass-field full">
                    <label>អ៊ីមែល</label>
                    <input type="email" placeholder="andanika@gmail.com" v-model="form.email"
                        :class="{ 'input-error': errors.email }">
                    <span v-if="errors.email" class="text-danger-msg">{{ errors.email }}</span>
                </div>
                <div class="glass-field full">
                    <label>តួនាទី</label>
                    <div class="role-chips">
                        <label class="chip" :class="{ 'active': selectedRoleForCreate === 'student' }">
                            <input type="radio" value="student" v-model="selectedRoleForCreate" hidden>
                            <i class="bi bi-mortarboard"></i> សិស្ស
                        </label>

                        <label class="chip" :class="{ 'active': selectedRoleForCreate === 'teacher' }">
                            <input type="radio" value="teacher" v-model="selectedRoleForCreate" hidden>
                            <i class="bi bi-easel"></i> គ្រូបង្រៀន
                        </label>

                        <label class="chip" :class="{ 'active': selectedRoleForCreate === 'admin' }">
                            <input type="radio" value="admin" v-model="selectedRoleForCreate" hidden>
                            <i class="bi bi-shield-lock"></i>អ្នកគ្រប់គ្រង
                        </label>
                    </div>
                </div>
            </div>

            <template #footer>
                <button class="btn btn-outline-secondary" @click="isModalOpen = false"
                    :disabled="loadingSubmit">បោះបង់</button>
                <BaseButton @click="handleCreate" :disabled="loadingSubmit">
                    {{ loadingSubmit ? 'កំពុងបង្កើត...' : 'បង្កើតអ្នកប្រើប្រាស់' }}
                </BaseButton>
            </template>
        </BaseModal>
    </div>
</template>

<script setup>
import { ref, computed, onMounted ,watch} from "vue";
import { getAllUsers, createUser } from "@/api/admin.api";
import { useDate } from "@/composables/useDate";

const { formatDate } = useDate();

const isModalOpen = ref(false);
const loadingSubmit = ref(false);

const searchQuery = ref("");
const selectedRoleForFilter = ref("");
const selectedStatusForFilter = ref("");

const loading = ref(false);


//create user form
const selectedRoleForCreate = ref('student');
const form = ref({
    firstName: '',
    lastName: '',
    email: ''
})

const errors = ref({
    firstName: '',
    lastName: '',
    email: ''
})

const validateField = (field) => {
   const value = form.value[field] ? String(form.value[field]).trim() : '';

    if (!value) {
        if (field === 'firstName') errors.value.firstName = 'សូមបំពេញនាមខ្លួន!';
        if (field === 'lastName') errors.value.lastName = 'សូមបំពេញនាមត្រកូល!';
        if (field === 'email') errors.value.email = 'សូមបំពេញអ៊ីមែល!';
    } else {
        errors.value[field] = '';
    }
};

watch(() => form.value.firstName, () => validateField('firstName'));
watch(() => form.value.lastName, () => validateField('lastName'));
watch(() => form.value.email, () => validateField('email'));

const handleCreate = async () => {
    validateField('firstName');
    validateField('lastName');
    validateField('email');
    if (errors.value.firstName || errors.value.lastName || errors.value.email) {
        return;
    }
    loadingSubmit.value = true;
    try {
        let roleId = 3; 
        if (selectedRoleForCreate.value === 'teacher') roleId = 2; 
        if (selectedRoleForCreate.value === 'admin') roleId = 1;

        const payload = {
            firstName: form.value.firstName,
            lastName: form.value.lastName,
            email: form.value.email,
            role_id: roleId
        }

        const res = await createUser(payload);
        console.log(res.data);

        if (res.data.result) {
            isModalOpen.value = false;

            form.value = { firstName: '', lastName: '', email: '' };
            errors.value = { firstName: '', lastName: '', email: '' };
            selectedRoleForCreate.value = 'student';

            await fetchUsers();
        }

    } catch (error) {
        console.log(error);
    } finally {
        loadingSubmit.value = false;
    }
}

watch(isModalOpen, (isOpen) => {
    if (!isOpen) {
        errors.value = { firstName: '', lastName: '', email: '' };
    }
});

const userHeaders = [
    { label: "លេខសម្គាល់", key: "id" },
    { label: "ឈ្មោះ", key: "name" },
    { label: "អ៊ីមែល", key: "email" },
    { label: "តួនាទី", key: "role" },
    { label: "ស្ថានភាព", key: "status" },
    { label: "ចូលរួម", key: "date" },
    { label: "សកម្មភាព", key: "actions" },
];

const users = ref([]);

const fetchUsers = async () => {
    loading.value = true;
    try {
        const res = await getAllUsers();
        users.value = res.data.data;
    } catch (error) {
        console.log('can not get users');
    } finally {
        loading.value = false;
    }
}

onMounted(() => {
    fetchUsers();
})

const filteredUsers = computed(() => {
    return users.value.filter((u) => {
        const nameText = u.fullName ? u.fullName.toLowerCase() : "";
        const emailText = u.email ? u.email.toLowerCase() : "";
        const search = searchQuery.value.toLowerCase();
        const matchesSearch = nameText.includes(search) || emailText.includes(search);

        const roleText = u.role ? u.role.toLowerCase() : "";
        const filterRole = selectedRoleForFilter.value.toLowerCase();
        const matchesRole = selectedRoleForFilter.value === "" || roleText === filterRole;

        const statusText = u.status ? u.status.toLowerCase() : "active"; // បើគ្មាន status ឱ្យ default 'active'
        const filterStatus = selectedStatusForFilter.value.toLowerCase();
        const matchesStatus = selectedStatusForFilter.value === "" || statusText === filterStatus;

        return matchesSearch && matchesRole && matchesStatus;
    });
});
</script>

<style>

.input-error {
    border-color: #dc3545 !important;
    box-shadow: 0 0 0 0.25rem rgba(220, 53, 69, 0.25) !important;
}

.text-danger-msg {
    color: #dc3545;
    font-size: 12px;
    margin-top: 4px;
    display: block;
    font-weight: 500;
}
</style>
