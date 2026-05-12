<template>
    <!-- ══ QUIZ MANAGEMENT SECTION ══ -->
    <div id="section-quizzes" style="display: block">
        <div class="d-flex justify-content-between align-items-center mb-4">
            <div>
                <div class="page-title">Quiz Management</div>
                <div class="page-subtitle">Monitor all quizzes across all rooms</div>
            </div>
        </div>

        <!-- MINI STATS -->
        <div class="row g-3 mb-3">
            <div class="col-md-3">
                <div class="dash-card text-center">
                    <div style="
              font-size: 28px;
              font-weight: 800;
              color: var(--green-primary);
            ">
                        2,221
                    </div>
                    <div style="font-size: 12px; color: var(--text-muted); font-weight: 600">
                        Total Quizzes
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="dash-card text-center">
                    <div style="font-size: 28px; font-weight: 800; color: #f07a3b">
                        43
                    </div>
                    <div style="font-size: 12px; color: var(--text-muted); font-weight: 600">
                        Draft
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="dash-card text-center">
                    <div style="font-size: 28px; font-weight: 800; color: var(--green-dark)">
                        121
                    </div>
                    <div style="font-size: 12px; color: var(--text-muted); font-weight: 600">
                        Active
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="dash-card text-center">
                    <div style="font-size: 28px; font-weight: 800; color: #e05c5c">
                        2,057
                    </div>
                    <div style="font-size: 12px; color: var(--text-muted); font-weight: 600">
                        Closed
                    </div>
                </div>
            </div>
        </div>

        <div class="dash-card">
            <div style="overflow-x: auto">
                <table class="dash-table">
                    <thead>
                        <tr>
                            <th>Quiz ID</th>
                            <th>Title</th>
                            <th>Room</th>
                            <th>Teacher</th>
                            <th>Status</th>
                            <th>Submissions</th>
                            <th>Avg Score</th>
                            <th>Created</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody id="quizzesTable"></tbody>
                </table>
            </div>
        </div>
    </div>
</template>
