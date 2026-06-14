<template>
    <div>
        <div class="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4">
            <div>
                <h4 class="page-title mb-0">គ្រប់គ្រងបន្ទប់រៀន
                </h4>
                <p class="page-subtitle mb-0 mt-1">
                    គ្រប់គ្រង និងតាមដានរាល់បន្ទប់សិក្សាទាំងអស់
                </p>
            </div>
        </div>
        <div class="room-management-page">
            <div class="page-header mb-4">
                <!-- Search & Filter Bar -->
                <div class="search-bar-wrapper">
                    <div class="row g-3 align-items-center">
                        <div class="col-12 col-md-6 col-lg-5">
                            <div class="input-search-group">
                                <i class="bi bi-search search-icon"></i>
                                <input v-model="searchQuery" type="text" class="form-control search-input"
                                    placeholder="ស្វែងរកថ្នាក់រៀន..." @input="handleSearch" />
                                <button v-if="searchQuery" class="btn btn-clear-search" @click="clearSearch">
                                    <i class="bi bi-x-lg"></i>
                                </button>
                            </div>
                        </div>
                        <div class="col-auto ms-auto">
                            <div class="results-badge">
                                <i class="bi bi-grid-3x3-gap me-1"></i>
                                {{ pagination?.total }} បន្ទប់
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Loading State -->
            <div v-if="loading" class="loading-state text-center py-5">
                <div class="spinner-border text-success" role="status">
                    <span class="visually-hidden">កំពុងផ្ទុក...</span>
                </div>
                <p class="mt-3 text-muted">កំពុងផ្ទុកបន្ទប់រៀន...</p>
            </div>

            <!-- Error State -->
            <div v-else-if="error" class="alert alert-danger d-flex align-items-center gap-2" role="alert">
                <i class="bi bi-exclamation-triangle-fill"></i>
                <span>{{ error }}</span>
                <button class="btn btn-sm btn-outline-danger ms-auto" @click="fetchRooms">ព្យាយាមម្តងទៀត</button>
            </div>

            <!-- Empty State -->
            <div v-else-if="rooms.length === 0" class="empty-state text-center py-5">
                <div class="empty-icon mb-3">
                    <i class="bi bi-door-closed"></i>
                </div>
                <h5 class="text-muted">រកមិនឃើញបន្ទប់រៀនទេ</h5>
                <p class="text-muted small">សូមសាកល្បងស្វែងរកពាក្យផ្សេង ឬបន្ថែមបន្ទប់ថ្មី។</p>
            </div>

            <!-- Room Cards Grid -->
            <div v-else class="row g-4 room-grid">
                <div v-for="room in rooms" :key="room.id" class="col-12 col-sm-6 col-lg-4 col-xl-3">
                    <div class="room-card h-100">
                        <div class="card-accent">
                            <div class="room-avatar">
                                {{ getInitials(room.name) }}
                            </div>
                        </div>

                        <div class="card-body-content">
                            <h6 class="room-name">{{ room.name }}</h6>

                            <div class="teacher-row">
                                <span class="teacher-avatar-sm">{{ getInitials(room.teacher_name) }}</span>
                                <span class="teacher-name">{{ room.teacher_name }}</span>
                            </div>

                            <div class="card-divider my-3"></div>

                            <div class="stats-row">
                                <div class="stat-item">
                                    <div class="stat-icon">
                                        <i class="bi bi-people-fill"></i>
                                    </div>
                                    <div>
                                        <div class="stat-value">{{ room.students_count }}</div>
                                        <div class="stat-label">សិស្ស</div>
                                    </div>
                                </div>
                                <div class="stat-divider"></div>
                                <div class="stat-item">
                                    <div class="stat-icon stat-icon-blue">
                                        <i class="bi bi-file-text-fill"></i>
                                    </div>
                                    <div>
                                        <div class="stat-value">{{ room.posts_count }}</div>
                                        <div class="stat-label">ការបង្ហោះ</div>
                                    </div>
                                </div>
                            </div>

                            <div class="card-footer-row">
                                <span class="created-date">
                                    <i class="bi bi-calendar3 me-1"></i>
                                    {{ formatDate(room.created_at) }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <BasePagination v-if="pagination.total > 0" :current-page="pagination.page" :limit="8"
                :total="pagination.total" @update:page="fetchRooms" />

        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getRoom } from '@/api/admin.api'
import BasePagination from '@/components/common/BasePagination.vue'

const rooms = ref([])
const loading = ref(false)
const error = ref(null)
const searchQuery = ref('')
const pagination = ref({ page: 1, total: 0 });

const fetchRooms = async (page = 1) => {
    loading.value = true;
    error.value = null;
    try {
        const response = await getRoom({
            page: page,
            limit: 8, // កំណត់ត្រឹម ៨
            search: searchQuery.value
        });
        rooms.value = response.data.data;
        pagination.value = response.data.pagination;
    } catch (e) {
        console.error(e);
        error.value = 'មានបញ្ហាក្នុងការផ្ទុកទិន្នន័យ';
    } finally {
        loading.value = false;
    }
};


const getInitials = (name = '') => name.split(' ').slice(0, 2).map(w => w[0]?.toUpperCase() ?? '').join('');

function formatDate(iso) {
    return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

let searchTimer = null

function handleSearch() {
    clearTimeout(searchTimer)
    searchTimer = setTimeout(() => fetchRooms(1), 400)
}
function clearSearch() {
    searchQuery.value = '';
    fetchRooms(1);
}

onMounted(() => fetchRooms())
</script>

<style scoped>
.room-management-page {
    padding: 1.75rem 1.5rem;
    min-height: 100vh;
    font-family: 'DM Sans', sans-serif;
    background: #f1fdf7;
    border-radius: 30px;
}


.page-subtitle {
    font-size: 0.82rem;
    color: #6b7280;
}

.search-bar-wrapper {
    background: #fff;
    border: 1px solid #dcfce7;
    border-radius: 14px;
    padding: 0.85rem 1.1rem;
    box-shadow: 0 1px 6px rgba(16, 185, 129, 0.06);
}

.input-search-group {
    position: relative;
}

.search-icon {
    position: absolute;
    left: 0.85rem;
    top: 50%;
    transform: translateY(-50%);
    color: #10b981;
    font-size: 0.9rem;
    pointer-events: none;
}

.search-input {
    padding-left: 2.4rem;
    padding-right: 2.4rem;
    border-radius: 8px;
    border: 1.5px solid #dcfce7;
    background: #f0fdf4;
    font-size: 0.875rem;
    color: #064e3b;
    transition: border-color .2s, box-shadow .2s;
}

.search-input:focus {
    border-color: #10b981;
    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.12);
    background: #fff;
}

.search-input::placeholder {
    color: #9ca3af;
}

.btn-clear-search {
    position: absolute;
    right: 0.6rem;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: #9ca3af;
    padding: 0.1rem 0.3rem;
    font-size: 0.75rem;
    line-height: 1;
}

.btn-clear-search:hover {
    color: #064e3b;
}

.results-badge {
    background: #dcfce7;
    color: #065f46;
    border-radius: 8px;
    padding: 0.35rem 0.85rem;
    font-size: 0.8rem;
    font-weight: 600;
}

.room-card {
    background: #fff;
    border: 1.5px solid #dcfce7;
    border-radius: 16px;
    overflow: hidden;
    cursor: pointer;
    transition: transform .22s ease, box-shadow .22s ease, border-color .22s ease;
    display: flex;
    flex-direction: column;
}

.room-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(16, 185, 129, 0.14);
    border-color: #10b981;
}

.card-accent {
    background: linear-gradient(160deg, #dcfce7 0%, #a7f3d0 100%);
    padding: 1.1rem 1rem 1.5rem;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.room-avatar {
    width: 44px;
    height: 44px;
    border-radius: 12px;
    background: #10b981;
    backdrop-filter: blur(4px);
    border: 1.5px solid rgba(255, 255, 255, 0.35);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.9rem;
    font-weight: 700;
    color: #fff;
    letter-spacing: 0.5px;
}


/* Card body */
.card-body-content {
    padding: 0.95rem 1.1rem 1rem;
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-top: -0.5rem;
}

.room-name {
    font-size: 0.95rem;
    font-weight: 700;
    color: #064e3b;
    margin-bottom: 0.5rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-family: 'Plus Jakarta Sans', sans-serif;
}

/* Teacher row */
.teacher-row {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.teacher-avatar-sm {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: linear-gradient(135deg, #bbf7d0, #34d399);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.62rem;
    font-weight: 700;
    color: #065f46;
    flex-shrink: 0;
}

.teacher-name {
    font-size: 0.78rem;
    color: #6b7280;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

/* Divider */
.card-divider {
    height: 1px;
    background: #f0fdf4;
    border-top: 1px dashed #dcfce7;
}

/* Stats */
.stats-row {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.85rem;
}

.stat-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex: 1;
}

.stat-divider {
    width: 1px;
    height: 28px;
    background: #dcfce7;
}

.stat-icon {
    width: 30px;
    height: 30px;
    border-radius: 8px;
    background: #f0fdf4;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #10b981;
    font-size: 0.8rem;
    flex-shrink: 0;
}

.stat-icon-blue {
    color: #3b82f6;
    background: #eff6ff;
}

.stat-value {
    font-size: 0.95rem;
    font-weight: 700;
    color: #064e3b;
    line-height: 1.1;
}

.stat-label {
    font-size: 0.68rem;
    color: #9ca3af;
    text-transform: uppercase;
    letter-spacing: 0.4px;
}

/* Footer row */
.card-footer-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: auto;
    padding-top: 0.6rem;
    border-top: 1px solid #f0fdf4;
}

.created-date {
    font-size: 0.72rem;
    color: #9ca3af;
}

/* Action icon buttons */
.card-actions {
    display: flex;
    gap: 0.3rem;
}

.btn-icon-action {
    width: 28px;
    height: 28px;
    border-radius: 7px;
    border: 1.5px solid #dcfce7;
    background: #f0fdf4;
    color: #10b981;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.72rem;
    transition: all .18s ease;
    cursor: pointer;
}

.btn-icon-action:hover {
    background: #10b981;
    color: #fff;
    border-color: #10b981;
}

.btn-icon-danger {
    color: #ef4444;
    border-color: #fee2e2;
    background: #fff5f5;
}

.btn-icon-danger:hover {
    background: #ef4444;
    color: #fff;
    border-color: #ef4444;
}

/* ── Loading / Empty ─────────────────────────────────── */
.loading-state,
.empty-state {
    color: #064e3b;
}

.empty-icon {
    width: 72px;
    height: 72px;
    border-radius: 20px;
    background: #dcfce7;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    color: #10b981;
    margin: 0 auto;
}

.spinner-border.text-success {
    color: #10b981 !important;
}

/* ── Pagination ──────────────────────────────────────── */
.pagination-wrapper {
    border-top: 1px solid #dcfce7;
    padding-top: 1.25rem;
}

.pagination-info {
    font-size: 0.82rem;
    color: #6b7280;
}

.pagination-info strong {
    color: #064e3b;
}

.custom-pagination .page-link {
    border: 1.5px solid #dcfce7;
    color: #10b981;
    border-radius: 8px !important;
    margin: 0 2px;
    min-width: 36px;
    text-align: center;
    font-size: 0.85rem;
    font-weight: 600;
    padding: 0.4rem 0.65rem;
    transition: all .18s ease;
    background: #fff;
}

.custom-pagination .page-link:hover {
    background: #f0fdf4;
    border-color: #10b981;
    color: #059669;
}

.custom-pagination .page-item.active .page-link {
    background: linear-gradient(135deg, #10b981, #059669);
    border-color: transparent;
    color: #fff;
    box-shadow: 0 3px 10px rgba(16, 185, 129, 0.3);
}

.custom-pagination .page-item.disabled .page-link {
    color: #d1d5db;
    border-color: #f3f4f6;
    background: #f9fafb;
}

.custom-pagination .page-item.page-ellipsis .page-link {
    border-color: transparent;
    background: none;
    color: #9ca3af;
}
</style>
