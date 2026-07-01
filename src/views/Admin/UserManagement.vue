<template>
    <div>
        <!-- Title Section -->
        <div class="d-flex justify-content-between align-items-center mb-4">
            <div>
                <div class="page-title">គ្រប់គ្រងអ្នកប្រើប្រាស់</div>
                <div class="page-subtitle">គ្រប់គ្រងគណនីគ្រូបង្រៀន និង​ សិស្ស</div>
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
                    </select>
                </div>
            </template>
            <template #status>
                <div class="col-md-2">
                    <select class="form-select custom-input" id="statusFilter" v-model="selectedStatusForFilter">
                        <option value="">ស្ថានភាពទាំងអស់</option>
                        <option value="Active">ដំណើរការ</option>
                        <option value="Inactive">បិទដំណើរការ</option>
                    </select>
                </div>
            </template>
            <template #right-side>
                <div class="total-users-badge">
                    <span class="lbl-text">ចំនួនសរុប</span>
                    <span class="num-counter">{{ totalRecords }}</span>
                </div>
            </template>
        </SearchFilter>
        <!-- Table Component -->
        <DataTable :headers="userHeaders" :items="filteredUsers" :is-loading="isLoading" :current-page="currentPage"
            :limit="limit" :total="totalRecords" @update:page="changePage">
            <template #row="{ item }">
                <td>{{ item.user_code }}</td>
                <td class="text-capitalize">{{ item.fullName }}</td>
                <td>{{ item.email }}</td>
                <td>
                    <StatusBadge :type="item.role" />
                </td>
                <td>
                    <StatusBadge :type="item.status" />
                </td>
                <td>
                    <button type="button" class="btn-badge-wrapper" @click="handleToggleStatus(item)"
                        title="ចុចដើម្បីផ្លាស់ប្ដូរស្ថានភាព">
                        <StatusBadge :type="item.is_active ? 'Active' : 'Inactive'" />
                    </button>
                </td>
                <td>
                    <button class="btn-action-view" @click="openUserDetail(item)">
                        <i class="bi bi-arrow-right-short"></i>លម្អិត
                    </button>
                </td>
            </template>
        </DataTable>


        <!-- BaseModal -->
        <BaseModal :is-open="isModalOpen" title="បង្កើតគណនី" subtitle="បន្ថែមអ្នកប្រើប្រាស់ទៅក្នុងប្រព័ន្ធរបស់អ្នក"
            tag="អ្នកប្រើប្រាស់ថ្មី" width="600px" @close="isModalOpen = false">
            <div class="glass-grid">
                <div class="glass-field">
                    <label>នាមត្រកូល</label>
                    <input type="text" placeholder="សូមបញ្ចូលនាមត្រកូល" v-model="form.lastName"
                        :class="{ 'input-error': errors.lastName }">
                    <span v-if="errors.lastName" class="text-danger-msg">{{ errors.lastName }}</span>
                </div>

                <div class="glass-field">
                    <label>នាមខ្លួន</label>
                    <input type="text" placeholder="សូមបញ្ចូលនាមខ្លួន" v-model="form.firstName" @input="handleInput"
                        :class="{ 'input-error': errors.firstName }">
                    <span v-if="errors.firstName" class="text-danger-msg">{{ errors.firstName }}</span>
                </div>

                <div class="glass-field full">
                    <label>អ៊ីមែល</label>
                    <input type="email" placeholder="សូមបញ្ចូលអ៊ីមែល" @input="validateEmail(form.email, false)" v-model="form.email" 
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
                    </div>
                </div>
            </div>

            <template #footer>
                <button class="btn btn-outline-secondary" @click="closeModal"
                    :disabled="loadingSubmit">បោះបង់</button>
                <BaseButton @click="handleCreate" :disabled="loadingSubmit">
                    {{ loadingSubmit ? 'កំពុងបង្កើត...' : 'បង្កើតអ្នកប្រើប្រាស់' }}
                </BaseButton>
            </template>
        </BaseModal>

        <UserDetailModal v-if="isDetailModalOpen" :show="isDetailModalOpen" :user="selectedUser"
            @close="isDetailModalOpen = false" />
    </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, nextTick } from "vue";
import { getAllUsers, createUser, ChangeStatusUser } from "@/api/admin.api";
import { useFormValidation } from "@/composables/useFormValidation";
import StatusBadge from "@/components/common/StatusBadge.vue";
import Swal from 'sweetalert2';
import UserDetailModal from "@/components/admin/UserDetailModal.vue";
import { useToast } from "@/composables/useToast";

const { triggerToast } = useToast();

const { errors, validateFirstName, validateLastName, validateEmail } = useFormValidation();

const users = ref([]);
const isLoading = ref(false);
const isModalOpen = ref(false);
const loadingSubmit = ref(false);

const isDetailModalOpen = ref(false);
const selectedUser = ref(null);

const searchQuery = ref("");
const selectedRoleForFilter = ref("");
const selectedStatusForFilter = ref("");

const currentPage = ref(1);
const limit = ref(10);
const totalRecords = ref(0);

const isDirty = ref(false);


const selectedRoleForCreate = ref('student');
const form = ref({ firstName: '', lastName: '', email: '' })

watch(() => form.value.firstName, (val) => validateFirstName(val));
watch(() => form.value.lastName, (val) => validateLastName(val));
watch(() => form.value.email, (val) => validateEmail(val));

const handleInput = () => {
  isDirty.value = true; 
};

const resetForm = () => {
    form.value = { firstName: '', lastName: '', email: '', role: 'student' };
    errors.value = { firstName: '', lastName: '', email: '' };
};

watch(isModalOpen, (isOpen) => {
    if (!isOpen) resetForm();
    isDirty.value = false;
});

const closeModal = () => {
   isDirty.value = false; 
    
    resetForm(); 
    
    isModalOpen.value = false;
};

const openUserDetail = async (user) => {
    selectedUser.value = user;
    await nextTick();
    isDetailModalOpen.value = true;
}
const userHeaders = [
    { label: "លេខសម្គាល់", key: "id" },
    { label: "ឈ្មោះ", key: "name" },
    { label: "អ៊ីមែល", key: "email" },
    { label: "តួនាទី", key: "role" },
    { label: "គណនី", key: "status" },
    { label: "ស្ថានភាព", key: "is_active" },
    { label: "សកម្មភាព", key: "actions" },
];


const changePage = async (newPage) => {
    currentPage.value = newPage;
    await fetchUsers();
};

const filteredUsers = computed(() => {
    return users.value.filter((u) => {

        const nameText = u.fullName ? u.fullName.toLowerCase() : "";
        const emailText = u.email ? u.email.toLowerCase() : "";
        const search = searchQuery.value.toLowerCase();
        const matchesSearch = nameText.includes(search) || emailText.includes(search);

        const roleText = u.role ? u.role.toLowerCase() : "";
        const filterRole = selectedRoleForFilter.value.toLowerCase();
        const matchesRole = selectedRoleForFilter.value === "" || roleText === filterRole;

        const filterStatus = selectedStatusForFilter.value.toLowerCase();
        let matchesStatus = true;
        if (filterStatus === 'active') {
            matchesStatus = u.is_active === 1 || u.is_active === true;
        } else if (filterStatus === 'inactive') {
            matchesStatus = u.is_active === 0 || u.is_active === false;
        }

        return matchesSearch && matchesRole && matchesStatus;
    });
});

const fetchUsers = async () => {
    isLoading.value = true;
    try {

        const res = await getAllUsers({
            page: currentPage.value,
            limit: limit.value,
            search: searchQuery.value,
            role: selectedRoleForFilter.value,
            status: selectedStatusForFilter.value
        });

        if (res.data && res.data.data) {
            const rawUsers = res.data.data.users || [];
            console.log("Fetched users:", rawUsers);

            users.value = rawUsers;

            totalRecords.value = res.data.data.total || 0;
            currentPage.value = res.data.data.page || 1;
            limit.value = res.data.data.limit || 10;
        }
    } catch (error) {
        triggerToast("មិនអាចទាញយកទិន្នន័យបានទេ!", 'fa-solid fa-circle-xmark');
    } finally {
        isLoading.value = false;
    }
}

const handleCreate = async () => {
    
    validateFirstName(form.value.firstName);
    validateLastName(form.value.lastName);
    validateEmail(form.value.email, true);
   
    if (errors.value.firstName || errors.value.lastName || errors.value.email) {
        return;
    }

    loadingSubmit.value = true;
    triggerToast("កំពុងបង្កើតគណនី សូមរង់ចាំ...", 'fa-solid fa-spinner fa-spin');

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
        const token =localStorage.getItem('user_token');
        const res = await createUser(payload, token);

        if (res.data?.result) {
            

            form.value = { firstName: '', lastName: '', email: '' };

            errors.value = { firstName: '', lastName: '', email: '' };

            isModalOpen.value = false;

            selectedRoleForCreate.value = 'student';

            await fetchUsers();

            triggerToast("បង្កើតគណនីអ្នកប្រើប្រាស់បានជោគជ័យ!", 'fa-solid fa-circle-check');
        }

    } catch (error) {

        const errorDetails = error.response?.data?.details || "";

        if (error.response?.status === 409 || errorDetails.includes('Duplicate entry')) {
            errors.value.email = "អ៊ីមែលនេះត្រូវបានប្រើប្រាស់រួចរាល់ហើយ! សូមប្តូរថ្មី។";
            triggerToast("អ៊ីមែលនេះត្រូវបានប្រើប្រាស់រួចហើយ!", 'fa-solid fa-circle-xmark');
        } else if (error.response?.status === 500) {
            if (errorDetails.includes('Duplicate entry')) {
                errors.value.email = "អ៊ីមែលនេះមានក្នុងប្រព័ន្ធរួចហើយ!";
                triggerToast("អ៊ីមែលនេះត្រូវបានប្រើប្រាស់រួចហើយ!", 'fa-solid fa-circle-xmark');
            } else {
                triggerToast("មានបញ្ហានៅលើម៉ាស៊ីនមេ (Server Error)!", 'fa-solid fa-triangle-exclamation');
            }
        } else {
            triggerToast("ការបង្កើតគណនីបានបរាជ័យ!", 'fa-solid fa-circle-xmark');
        }
    } finally {
        loadingSubmit.value = false;
    }
}

const handleToggleStatus = async (user) => {
    const currentStatus = user.is_active === 1 || user.is_active === true;

    const titleText = currentStatus
        ? 'តើអ្នកពិតជាចង់បិទគណនីនេះមែនទេ?'
        : 'តើអ្នកចង់បើកដំណើរការគណនីនេះឡើងវិញមែនទេ?';

    const confirmButtonText = currentStatus ? 'បិទគណនី' : 'បើកដំណើរការ';
    const confirmButtonColor = currentStatus ? '#dc3545' : '#26a269';

    Swal.fire({
        title: titleText,
        text: `គណនីរបស់៖ ${user.fullName || 'អ្នកប្រើប្រាស់'}`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: confirmButtonColor,
        cancelButtonColor: '#6c757d',
        confirmButtonText: confirmButtonText,
        cancelButtonText: 'បោះបង់',
        background: '#ffffff',
        width: '360px',
        customClass: {
            title: 'small-swal-title',
            htmlContainer: 'small-swal-text',
            confirmButton: 'small-swal-btn',
            cancelButton: 'small-swal-btn'
        },
        buttonsStyling: true
    }).then(async (result) => {
        if (result.isConfirmed) {
            isLoading.value = true;
            try {

                const newStatus = currentStatus ? 0 : 1;
                const token = sessionStorage.getItem('token');


                const res = await ChangeStatusUser(user.id, { is_active: newStatus }, token);

                if (res.data?.result || res.status === 200) {
                    await fetchUsers();

                    triggerToast("ស្ថានភាពគណនីត្រូវបានផ្លាស់ប្ដូរដោយជោគជ័យ!", 'fa-solid fa-circle-check');
                }
            } catch (error) {
                triggerToast("ការផ្លាស់ប្ដូរស្ថានភាពបានបរាជ័យ!", 'fa-solid fa-circle-xmark');
            } finally {
                isLoading.value = false;
            }
        }
    });
};


onMounted(() => {
    fetchUsers();
})

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

.btn-action-view {
    background: transparent;
    color: #26a269;
    border: 1px solid rgba(38, 162, 105, 0.4);
    padding: 4px 10px;
    border-radius: 15px;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 2px;
    transition: all 0.2s ease;
}

.btn-action-view:hover {
    background: linear-gradient(135deg, rgba(232, 245, 233, 0.8) 0%, rgba(200, 230, 201, 0.8) 100%);
    color: #1b5e20;
    border-color: #26a269;
    box-shadow: 0 2px 8px rgba(38, 162, 105, 0.15);
}

.bt-action-view i {
    font-size: 16px;
    line-height: 1;
}

.total-users-badge {
    display: inline-flex;
    align-items: center;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.7) 0%, rgba(230, 247, 237, 0.4) 100%);
    border: 1px solid rgba(38, 162, 105, 0.25);
    padding: 4px 6px 4px 14px;
    border-radius: 10px;
    backdrop-filter: blur(6px);
    box-shadow: 0 2px 8px rgba(38, 162, 105, 0.05);
    gap: 10px;
}

.total-users-badge .lbl-text {
    font-size: 13px;
    font-weight: 600;
    color: #495057;
}

.total-users-badge .num-counter {
    background: linear-gradient(135deg, #26a269 0%, #2e7d32 100%);
    color: #ffffff;
    font-size: 13px;
    font-weight: 700;
    min-width: 28px;
    height: 24px;
    padding: 0 6px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.btn-badge-wrapper {
    background: transparent !important;
    border: none !important;
    padding: 0 !important;
    margin: 0 !important;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    transition: transform 0.15s ease, opacity 0.15s ease;
}

.btn-badge-wrapper:hover {
    transform: scale(1.03);
    opacity: 0.9;
}

.btn-badge-wrapper:active {
    transform: scale(0.97);
}

.small-swal-popup {
    padding: 1.20rem !important;
    border-radius: 12px !important;
}

.small-swal-popup .swal2-icon {
    transform: scale(0.7) !important;
    margin: 0px auto -10px auto !important;
}

.small-swal-title {
    font-size: 18px !important;
    font-weight: 700 !important;
    color: #2c3e50 !important;
    padding: 0 !important;
    margin-top: 10px !important;
}

.small-swal-text {
    font-size: 14.5px !important;
    color: #5a6a85 !important;
    margin-top: 6px !important;
    margin-bottom: 15px !important;
}

.small-swal-btn {
    font-size: 16px !important;
    padding: 6px 14px !important;
    border-radius: 6px !important;
    margin: 0 4px !important;
}
</style>