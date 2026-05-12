<template>
    <!-- ══ RESULTS & SUBMISSIONS SECTION ══ -->
        <div id="section-results" style="display: block">
          <div class="d-flex justify-content-between align-items-center mb-4">
            <div>
              <div class="page-title">Results & Submissions</div>
              <div class="page-subtitle">
                All student submissions system-wide
              </div>
            </div>
            <button class="btn-outline-green">
              <i class="bi bi-download me-1"></i> Export CSV
            </button>
          </div>

          <div class="dash-card">
            <div class="row g-2 mb-3 align-items-center">
              <div class="col-md-4">
                <input type="text" class="form-control" placeholder="Search student or quiz…" />
              </div>
              <div class="col-md-2">
                <select class="form-select">
                  <option>All Quizzes</option>
                </select>
              </div>
              <div class="col-md-2">
                <select class="form-select">
                  <option>All Rooms</option>
                </select>
              </div>
            </div>
            <div style="overflow-x: auto">
              <table class="dash-table">
                <thead>
                  <tr>
                    <th>Submission ID</th>
                    <th>Student</th>
                    <th>Quiz</th>
                    <th>Room</th>
                    <th>Score</th>
                    <th>Total Marks</th>
                    <th>Percentage</th>
                    <th>Submitted At</th>
                    <th>Grade</th>
                  </tr>
                </thead>
                <tbody id="submissionsTable"></tbody>
              </table>
            </div>
          </div>
        </div>
</template>