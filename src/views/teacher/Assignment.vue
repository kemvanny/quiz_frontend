<template>
    <div class="app-shell">
        <!-- ══ MAIN COLUMN ══ -->
        <div class="main-col">

            <!-- ══ TOPBAR ══ -->
            <header class="topbar">

            <!-- Page Title -->
            <div class="tb-section grow align-items-center justify-content-start gap-2 w-100 flex-wrap py-2 py-md-0">
                <button class="btn btn-light d-lg-none shadow-sm p-1 px-2" data-bs-toggle="offcanvas" data-bs-target="#sidebarMenu">
                    <i class="fas fa-bars"></i>
                </button>
                <div class="d-flex align-items-center gap-2">
                <h4 class="mb-0 fw-bold text-dark" style="font-size:1.1rem; line-height:1;">Create Assignment</h4>
                </div>
            </div>

            <!-- Extra settings/info -->
            <div class="tb-section gap-3">
                <!-- Status Dropdown -->
                <select class="form-select form-select-sm border-0 fw-bold shadow-none cursor-pointer" style="background-color: var(--em-soft); color: var(--em); font-size:.75rem; border-radius: 8px;">
                <option>Status: Draft</option>
                <option>Status: Active</option>
                </select>
                
                <!-- Timer -->
                <div class="d-flex align-items-center gap-1 text-muted fw-bold" style="font-size:.75rem;">
                <i class="fa-regular fa-clock text-warning" style="font-size:.85rem;"></i>
                <input type="number" id="durationInput" class="form-control form-control-sm border text-dark fw-bold text-center shadow-none px-1 py-0 mx-1" value="7" min="0" style="width:45px; height:24px; font-size:.75rem; border-color:var(--bdr);" oninput="updateDuration()">
                <span>days</span>
                </div>
            </div>

            <!-- Saved Status -->
            <div class="tb-section">
                <span class="text-muted fw-bold" style="font-size:.75rem;"><i class="fas fa-check-circle text-success me-1"></i> Saved</span>
            </div>

            <!-- Actions + profile -->
            <div class="tb-section gap-3 pe-0">

                <!-- Profile Dropdown -->
                <div class="d-flex align-items-center gap-2 p-1 pe-3 rounded-pill" style="border: 1px solid var(--bdr); background: #ffffff; cursor: pointer; transition: .2s; box-shadow: var(--sh-sm);" onmouseover="this.style.borderColor='#cbd5e1'; this.style.boxShadow='0 4px 12px rgba(0,0,0,.05)'" onmouseout="this.style.borderColor='var(--bdr)'; this.style.boxShadow='var(--sh-sm)'">
                <img src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQTs4Gaz2D9hyLPSjUFHdcLhwoP5JbyaMy3-CXKrYPU4oJnTeRW" alt="avatar" style="width: 32px; height: 32px; border-radius: 50%; object-fit: cover;"/>
                <div class="d-flex flex-column justify-content-center" style="line-height: 1.1;">
                    <span class="fw-bold" style="font-size: .8rem; color: var(--txt);">Hean Liza</span>
                    <span style="font-size: .65rem; color: var(--txt-mu); font-weight: 500;">Instructor</span>
                </div>
                </div>
            </div>
            </header>

            <!-- ══ WORKSPACE ══ -->
            <div class="workspace">
            
            <!-- ── LEFT: FORM AREA ── -->
            <div class="d-flex flex-column gap-3 slide-in">
                
                <!-- Details Panel -->
                <div class="panel mb-0 border-0 shadow-sm" style="border-radius: 20px;">
                <div class="panel-head bg-transparent border-bottom px-4 py-3">
                    <div class="panel-lbl text-dark" style="font-size: .85rem;"><i class="fas fa-sliders-h" style="color:var(--em);"></i> Assignment Configuration</div>
                </div>
                <div class="p-4">
                    
                    <!-- Assignment Title -->
                    <div class="mb-4">
                    <label class="form-label text-muted fw-bold mb-2" style="font-size: .75rem; letter-spacing: 0.5px;">Assignment Title <span class="text-danger">*</span></label>
                    <div class="position-relative">
                        <input type="text" class="q-field form-control px-3 shadow-sm" id="titleInput" oninput="checkTitle()" placeholder="Enter assignment title..." style="height: 52px; border-radius: 12px; border-color: #e2e8f0; font-size: 1rem; font-weight: 600;">
                    </div>
                    </div>
                    
                    <!-- Type Chips -->
                    <div class="mb-4">
                    <label class="form-label text-muted fw-bold mb-3" style="font-size: .75rem; letter-spacing: 0.5px;">Assignment Type</label>
                    <div class="d-flex flex-wrap gap-2">
                        <div class="tchip sel" onclick="selectType(this)">
                        <div class="icon-box"><i class="fas fa-home"></i></div>
                        <span>Homework</span>
                        </div>
                        <div class="tchip" onclick="selectType(this)">
                        <div class="icon-box"><i class="fas fa-users"></i></div>
                        <span>Group Work</span>
                        </div>
                        <div class="tchip" onclick="selectType(this)">
                        <div class="icon-box"><i class="fas fa-book-open"></i></div>
                        <span>Research</span>
                        </div>
                        <div class="tchip" onclick="selectType(this)">
                        <div class="icon-box"><i class="fas fa-desktop"></i></div>
                        <span>Presentation</span>
                        </div>
                    </div>
                    </div>

                    <!-- Gray Background Group for Selects -->
                    <div class="p-4 rounded-4 mb-4" style="background: #f8fafc; border: 1px solid #f1f5f9;">
                    <div class="row g-4">
                        
                        <!-- Subject -->
                        <div class="col-md-6">
                        <label class="form-label text-muted fw-bold mb-2" style="font-size: .7rem;">Subject</label>
                        <div class="position-relative">
                            <i class="fas fa-book position-absolute" style="left: 14px; top: 50%; transform: translateY(-50%); color: #94a3b8;"></i>
                            <select class="q-field form-select ps-5" id="subjectInput" onchange="checkSubject()" style="height: 48px; border-radius: 12px; border-color: #e2e8f0; font-weight: 600;">
                            <option value="">Select Subject</option>
                            <option>Web Development</option>
                            <option>Database Systems</option>
                            <option>Networking</option>
                            <option>Data Structures</option>
                            </select>
                        </div>
                        </div>

                        <!-- Deadline -->
                        <div class="col-md-6">
                        <label class="form-label text-muted fw-bold mb-2" style="font-size: .7rem;">Submission Deadline</label>
                        <div class="position-relative">
                            <i class="fas fa-calendar-alt position-absolute" style="left: 14px; top: 50%; transform: translateY(-50%); color: #94a3b8;"></i>
                            <input type="datetime-local" class="q-field ps-5" id="deadlineInput" onchange="checkDeadline()" style="height: 48px; border-radius: 12px; border-color: #e2e8f0; font-weight: 600;">
                        </div>
                        </div>

                        <!-- Classroom -->
                        <div class="col-md-12">
                        <label class="form-label text-muted fw-bold mb-2" style="font-size: .7rem;">Target Classroom</label>
                        <div class="d-flex shadow-sm" style="border-radius: 12px;">
                            <div class="position-relative flex-grow-1">
                            <i class="fas fa-users position-absolute" style="left: 14px; top: 50%; transform: translateY(-50%); color: #94a3b8; z-index: 5;"></i>
                            <select class="q-field form-select ps-5 shadow-none m-0" id="roomInput" onchange="checkRoom()" style="height: 48px; border-radius: 12px 0 0 12px; border-color: #e2e8f0; font-weight: 600; border-right: none;">
                                <option value="">Select Classroom to assign</option>
                                <option>Grade 12-A · 32 students</option>
                                <option>Grade 11-B · 28 students</option>
                                <option>IT Foundation A · 40 students</option>
                            </select>
                            </div>
                            <button class="btn fw-bold px-4 shadow-none m-0" type="button" style="background: var(--em-soft); color: var(--em); border: 1.5px solid var(--em-mid); font-size:.85rem; transition:.2s; border-radius: 0 12px 12px 0; z-index: 1;" onmouseover="this.style.background='#d1fae5'" onmouseout="this.style.background='var(--em-soft)'" onclick="alert('Open New Classroom Modal')">
                            <i class="fas fa-plus me-1"></i> New Room
                            </button>
                        </div>
                        </div>

                    </div>
                    </div>

                    <!-- Instructions -->
                    <div>
                    <label class="form-label text-muted fw-bold mb-2" style="font-size: .75rem; letter-spacing: 0.5px;">Instructions & Requirements</label>
                    <textarea class="q-field p-3" rows="5" placeholder="Provide clear instructions for your students. Include learning objectives, submission guidelines, format requirements, and grading criteria..." style="border-radius: 16px; border-color: #e2e8f0; line-height: 1.6;"></textarea>
                    </div>
                </div>
                </div>

                <!-- Upload Panel -->
                <div class="panel">
                <div class="panel-head">
                    <div class="panel-lbl"><i class="fas fa-cloud-upload-alt" style="color:var(--em);font-size:.9rem;"></i> Learning Materials</div>
                </div>
                <div class="p-4">
                    <div class="upload-z" onclick="document.getElementById('fileInput').click()">
                    <div class="u-orb"><i class="fas fa-cloud-arrow-up"></i></div>
                    <div class="u-h">Drop Files Here</div>
                    <div class="u-s">Drag & drop or click to browse your computer</div>
                    <button class="btn btn-dark btn-sm rounded-3 fw-bold px-4 py-2" onclick="event.stopPropagation(); document.getElementById('fileInput').click()">
                        <i class="fas fa-folder-open me-2"></i> Browse Files
                    </button>
                    </div>
                    <input type="file" id="fileInput" multiple style="display:none" onchange="handleFiles(this)">
                    <div class="file-chips" id="fileChips"></div>
                </div>
                </div>
            </div>

            <!-- ── RIGHT: SUMMARY & PUBLISH ── -->
            <div class="d-flex flex-column gap-3 slide-in" style="animation-delay: .1s;">
                
                <!-- Action Card -->
                <div class="panel p-4 border-0 position-relative overflow-hidden" style="box-shadow: 0 10px 30px rgba(16,185,129,.08); border-radius: 20px; background: #ffffff;">
                <!-- Decorative Background Accent -->
                <div class="position-absolute" style="top:-50px; right:-50px; width:120px; height:120px; background: radial-gradient(circle, var(--em-soft) 0%, transparent 70%); border-radius:50%;"></div>
                
                <div class="text-center mb-4 mt-1 position-relative z-1">
                    <div class="d-inline-flex align-items-center gap-2 mb-3 px-3 py-1 rounded-pill" style="background: var(--em-soft); color: var(--em); font-size: .7rem; font-weight: 700; border: 1px solid rgba(16,185,129,.2);">
                    <span class="spinner-grow spinner-grow-sm" style="width:6px;height:6px;" role="status"></span> Ready to Publish
                    </div>
                    <h5 class="fw-bold mb-1 text-dark" style="letter-spacing: -0.5px;">Publish Assignment</h5>
                    <p class="text-muted" style="font-size: .75rem; line-height: 1.4;">Push it live and notify students instantly.</p>
                </div>
                
                <div class="d-flex flex-column gap-2 position-relative z-1">
                    <button class="btn w-100 rounded-3 fw-bold text-white py-2 shadow-sm" style="background: linear-gradient(135deg,var(--em),var(--em-dk)); transition: .2s; border: none;" onclick="openPublishModal()" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 15px rgba(16,185,129,.3)';" onmouseout="this.style.transform='none'; this.style.boxShadow='0 2px 4px rgba(0,0,0,.05)';">
                    <i class="fas fa-paper-plane me-2"></i> Publish Now
                    </button>
                    <button class="btn w-100 rounded-3 fw-bold py-2" style="background: #f8fafc; color: var(--txt-m); border: 1px solid #e2e8f0; transition: .2s;" onmouseover="this.style.background='#f1f5f9'" onmouseout="this.style.background='#f8fafc'">
                    <i class="fas fa-eye me-2" style="color: #94a3b8;"></i> Preview First
                    </button>
                </div>
                </div>

                <!-- Summary -->
                <div class="panel border-0 shadow-sm" style="border-radius: 20px;">
                <div class="panel-head bg-transparent border-bottom px-4 py-3">
                    <div class="panel-lbl text-dark" style="font-size: .85rem;"><i class="fas fa-chart-pie" style="color:var(--em);"></i> Summary</div>
                </div>
                <div class="p-4">
                    <div class="sum-row">
                    <div class="sum-k"><i class="fas fa-tag"></i> Type</div>
                    <span class="sbdg sb-b" id="sumType">Homework</span>
                    </div>
                    <div class="sum-row">
                    <div class="sum-k"><i class="fas fa-clock"></i> Duration</div>
                    <span class="sbdg sb-g" id="sumDuration">7 Days</span>
                    </div>
                    <div class="sum-row">
                    <div class="sum-k"><i class="fas fa-paperclip"></i> Attachments</div>
                    <span class="sbdg sb-s" id="sumFiles">0 Files</span>
                    </div>
                </div>
                </div>

                <!-- Checklist -->
                <div class="panel border-0 shadow-sm" style="border-radius: 20px;">
                <div class="panel-head bg-transparent border-bottom px-4 py-3">
                    <div class="panel-lbl text-dark" style="font-size: .85rem;"><i class="fas fa-list-check" style="color:var(--em);"></i> Setup Checklist</div>
                </div>
                <div class="p-4">
                    <div class="cki"><div class="ckico"><i class="fas fa-check"></i></div> Type selected</div>
                    <div class="cki pend" id="ck-title"><div class="ckico"><i class="fas fa-check"></i></div> Title filled in</div>
                    <div class="cki pend" id="ck-subject"><div class="ckico"><i class="fas fa-check"></i></div> Subject chosen</div>
                    <div class="cki pend" id="ck-deadline"><div class="ckico"><i class="fas fa-check"></i></div> Deadline set</div>
                    <div class="cki pend" id="ck-room"><div class="ckico"><i class="fas fa-check"></i></div> Classroom selected</div>
                    <div class="cki pend" id="ck-files"><div class="ckico"><i class="fas fa-check"></i></div> Files attached</div>
                </div>
                </div>

            </div>
            </div><!-- /workspace -->
        </div><!-- /main-col -->
    </div><!-- /app-shell -->
</template>

  <style>
    /* ── Design tokens ── */
    :root {
      --em:      #10b981;
      --em-dk:   #059669;
      --em-soft: #ecfdf5;
      --em-mid:  rgba(16,185,129,.25);
      --txt:     #1e293b;
      --txt-m:   #334155;
      --txt-mu:  #64748b;
      --surf:    #ffffff;
      --bdr:     #e2e8f0;
      --r-md:    10px;
      --r-lg:    14px;
      --r-xl:    20px;
      --sh-sm:   0 2px 8px rgba(0,0,0,.04);
      --sh-md:   0 8px 24px rgba(0,0,0,.08);
    }

    /* ── Base ── */
    body {
      font-family: "Kantumruy Pro", "Poppins", sans-serif;
      background: #f4f7fe;
      background-image:
        radial-gradient(at 0% 0%,   hsla(158,76%,76%,.55) 0, transparent 50%),
        radial-gradient(at 100% 100%, hsla(209,43%,80%,.55) 0, transparent 50%);
      height: 100vh;
      overflow: hidden;
    }

    /* ── Layout shell ── */
    .app-shell { display: flex; height: 100vh; overflow: hidden; }

    /* ── Sidebar ── */
    .sidebar {
      width: 240px;
      flex-shrink: 0;
      background: var(--surf);
      border-right: 1px solid var(--bdr);
      display: flex;
      flex-direction: column;
      padding: 20px 14px;
      overflow-y: auto;
    }

    .nav-item {
      display: flex; align-items: center; gap: 10px;
      padding: 9px 12px;
      border-radius: var(--r-md);
      text-decoration: none;
      color: var(--txt-mu);
      font-size: .83rem; font-weight: 500;
      transition: .17s;
    }
    .nav-item i { width: 16px; text-align: center; font-size: .8rem; }
    .nav-item.active { background: var(--em-soft); color: var(--em); font-weight: 700; }
    .nav-item:hover:not(.active) { background: #f8fafc; color: var(--txt); }

    .sidebar-cta {
      border: 2px dashed var(--em-mid);
      border-radius: var(--r-lg);
      background: var(--em-soft);
      cursor: pointer;
      transition: .2s;
    }
    .sidebar-cta:hover { background: #d1fae5; }

    /* ── Main column ── */
    .main-col { flex: 1; min-width: 0; display: flex; flex-direction: column; height: 100vh; overflow: hidden; }

    /* ── Topbar ── */
    .topbar {
      flex-shrink: 0;
      min-height: 64px;
      background: rgba(255,255,255,0.85);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid var(--bdr);
      display: flex;
      align-items: stretch;
      flex-wrap: wrap;
      padding: 0 24px;
      z-index: 100;
    }

    .tb-section { display: flex; align-items: center; padding: 0 18px; gap: 12px; }
    .tb-section:first-child { padding-left: 0; }
    .tb-section:last-child { padding-right: 0; }
    .tb-section.grow { flex: 1; }

    /* ── Workspace 2-col grid ── */
    .workspace {
      flex: 1; min-height: 0;
      display: flex; flex-direction: column;
      gap: 16px;
      padding: 16px 24px;
      overflow-y: auto; overflow-x: hidden;
    }
    @media (min-width: 992px) {
      .workspace {
        display: grid;
        grid-template-columns: 1fr 340px;
        overflow-y: auto; overflow-x: hidden;
      }
    }

    .panel {
      background: var(--surf);
      border: 1px solid var(--bdr);
      border-radius: var(--r-xl);
      box-shadow: var(--sh-sm);
      display: flex; flex-direction: column;
      overflow: hidden;
      margin-bottom: 16px;
    }
    .panel-head {
      padding: 14px 18px;
      border-bottom: 1px solid var(--bdr);
      display: flex; align-items: center; justify-content: space-between;
      background: #fafbfc;
    }
    .panel-lbl   { font-size: .75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: var(--txt-mu); display: flex; align-items: center; gap: 8px;}
    
    /* ── Form Elements (matching quiz fields) ── */
    .q-field {
      width: 100%; border: 1.5px solid var(--bdr); border-radius: var(--r-lg);
      padding: 10px 14px; font-size: .87rem; font-weight: 500; color: var(--txt);
      outline: none; font-family: inherit; background: #fafbfc;
      transition: .17s; line-height: 1.6;
    }
    .q-field:focus { border-color: var(--em); background: #fff; box-shadow: 0 0 0 3px rgba(16,185,129,.08); }
    .q-field::placeholder { color: #b0bec5; }
    
    .form-label { font-size: .7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: var(--txt-mu); margin-bottom: 6px; }

    /* type chips */
    .tchip {
      background: #ffffff; border: 1.5px solid var(--bdr); border-radius: 14px;
      cursor: pointer; transition: all .2s ease;
      color: var(--txt-mu); font-weight: 600; font-size: .8rem;
      display: inline-flex; align-items: center; padding: 6px 14px 6px 6px;
    }
    .tchip:hover { border-color: #cbd5e1; box-shadow: 0 4px 12px rgba(0,0,0,.03); transform: translateY(-1px); }
    .tchip.sel { border-color: var(--em); background: var(--em-soft); color: var(--em-dk); box-shadow: 0 4px 16px rgba(16,185,129,.15); }
    .tchip .icon-box {
      width: 28px; height: 28px; border-radius: 8px; background: #f1f5f9;
      display: flex; align-items: center; justify-content: center; color: #94a3b8; transition: .2s; margin-right: 6px;
    }
    .tchip.sel .icon-box { background: var(--em); color: white; }

    /* upload */
    .upload-z {
      border:2px dashed var(--bdr); border-radius:16px; padding:32px 20px;
      text-align:center; background: #fafbfc;
      cursor:pointer; transition:.25s;
    }
    .upload-z:hover { border-color:var(--em-mid); background:var(--em-soft); }
    .u-orb {
      width:56px; height:56px; border-radius:16px;
      background:linear-gradient(135deg,var(--em),var(--em-dk)); color:#fff; font-size:1.3rem;
      display:flex; align-items:center; justify-content:center; margin:0 auto 12px;
      box-shadow:0 10px 24px rgba(16,185,129,.24); transition:.25s;
    }
    .upload-z:hover .u-orb { transform:translateY(-3px) scale(1.04); }
    .u-h { font-size:.9rem; font-weight:800; color:var(--txt); margin-bottom:4px; }
    .u-s { font-size:.75rem; color:var(--txt-mu); margin-bottom:14px; }
    
    .file-chips { display:flex; flex-wrap:wrap; gap:8px; margin-top:14px; }
    .fchip {
      display:inline-flex; align-items:center; gap:6px;
      background:var(--em-soft); border:1px solid var(--em-mid);
      border-radius:10px; padding:6px 12px;
      font-size:.75rem; font-weight:600; color:var(--em-dk);
    }

    /* ── Checklist ── */
    .cki {
      display:flex; align-items:center; gap:10px;
      font-size:.8rem; color:var(--txt-m); font-weight: 500;
      padding:10px 0; border-bottom:1px solid #f1f5f9;
    }
    .cki:last-child { border-bottom:none; }
    .cki .ckico {
      width:22px; height:22px; border-radius:6px;
      background:var(--em-soft); color:var(--em);
      display:flex; align-items:center; justify-content:center;
      font-size:.65rem; flex-shrink:0;
    }
    .cki.pend .ckico { background:#f1f5f9; color:#cbd5e1; }
    .cki.pend { color: var(--txt-mu); }

    /* ── Summary ── */
    .sum-row {
      display:flex; align-items:center; justify-content:space-between;
      padding:10px 0; border-bottom:1px solid #f1f5f9;
    }
    .sum-row:last-child { border-bottom:none; padding-bottom:0; }
    .sum-k { display:flex; align-items:center; gap:8px; font-size:.75rem; color:var(--txt-mu); font-weight: 600; }
    .sum-k i { color:var(--em); font-size:.7rem; width:14px; text-align: center; }
    .sbdg { font-size:.7rem; font-weight:700; padding:3px 10px; border-radius:999px; }
    .sb-g { background:#dcfce7; color:#16a34a; }
    .sb-a { background:#fef9c3; color:#a16207; }
    .sb-s { background:#f1f5f9; color:#475569; }
    .sb-b { background:#dbeafe; color:#1d4ed8; }

    /* ── Animations ── */
    @keyframes slideUp { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
    .slide-in { animation: slideUp .22s ease; }

    /* ── Scrollbar ── */
    ::-webkit-scrollbar       { width: 6px; height: 6px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 999px; }
  </style>