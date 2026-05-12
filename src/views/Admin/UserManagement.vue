<template>
    <!-- ══ USER MANAGEMENT SECTION ══ -->
    <div id="section-users" style="display: block">
        <div class="d-flex justify-content-between align-items-center mb-4">
            <div>
                <div class="page-title">User Management</div>
                <div class="page-subtitle">
                    Manage teachers, students and admin accounts
                </div>
            </div>
            <button class="btn-green" data-bs-toggle="modal" data-bs-target="#addUserModal">
                <i class="bi bi-person-plus-fill me-1"></i> Create Account
            </button>
        </div>

        <!-- FILTERS -->
        <div class="dash-card mb-3">
            <div class="row g-2 align-items-center">
                <div class="col-md-4">
                    <div class="input-group">
                        <span class="input-group-text bg-white" style="
                      border: 1.5px solid var(--green-mid);
                      border-right: none;
                      border-radius: 10px 0 0 10px;
                    ">
                            <i class="bi bi-search" style="color: var(--text-muted)"></i>
                        </span>
                        <input type="text" class="form-control" placeholder="Search by name or email…" id="userSearch"
                            oninput="filterUsers()" style="border-left: none; border-radius: 0 10px 10px 0" />
                    </div>
                </div>
                <div class="col-md-2">
                    <select class="form-select" id="roleFilter" onchange="filterUsers()">
                        <option value="">All Roles</option>
                        <option value="Teacher">Teacher</option>
                        <option value="Student">Student</option>
                        <option value="Admin">Admin</option>
                    </select>
                </div>
                <div class="col-md-2">
                    <select class="form-select" id="statusFilter" onchange="filterUsers()">
                        <option value="">All Status</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                </div>
                <div class="col-md-4 text-end">
                    <span id="userCount" style="
                    font-size: 13px;
                    color: var(--text-muted);
                    font-weight: 600;
                  "></span>
                </div>
            </div>
        </div>

        <div class="dash-card">
            <div style="overflow-x: auto">
                <table class="dash-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Joined</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody id="usersTable"></tbody>
                </table>
            </div>
        </div>
    </div>
</template>