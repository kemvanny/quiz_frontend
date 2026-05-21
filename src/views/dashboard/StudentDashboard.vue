<template>
    <div>
        <div class="workspace">
            <div class="profile-hero mb-5">
                <div class="d-flex align-items-center gap-4">
                    <img src="https://ui-avatars.com/api/?name=Sok+Vibol&background=random" class="hero-avatar">
                    <div>
                        <h2 class="fw-bold mb-2" style="color: var(--txt); font-size: 2rem;">Sok Vibol</h2>
                        <p class="mb-4 d-flex align-items-center"
                            style="color: var(--txt-mu); font-weight: 600; font-size: 0.95rem;"><i
                                class="fas fa-user-graduate me-2 text-success" style="font-size: 1.2rem;"></i> High
                            School Student (Grade
                            12)</p>
                        <div class="d-flex gap-3">
                            <span class="hero-badge"><i class="fas fa-check-circle text-success fs-6"></i> 34
                                Exams Taken</span>
                            <span class="hero-badge"><i class="fas fa-door-open text-primary fs-6"></i> 6 Enrolled
                                Rooms</span>
                        </div>
                    </div>
                </div>
                <div>
                    <button
                        class="btn btn-light border fw-bold rounded-pill px-4 py-2 text-muted shadow-sm hover-shadow"><i
                            class="fas fa-camera me-2"></i> Update Photo</button>
                </div>
            </div>

            <div class="row g-5">
                <div class="col-lg-3">
                    <div class="settings-nav">
                        <a href="#" class="settings-nav-item active"><i class="fas fa-user fs-6 w-20px"></i> Personal
                            Info</a>
                        <a href="#" class="settings-nav-item"><i class="fas fa-lock fs-6 w-20px"></i> Security</a>
                        <a href="#" class="settings-nav-item"><i class="fas fa-bell fs-6 w-20px"></i> Notifications</a>
                        <hr class="my-3 border-secondary opacity-10">
                        <a href="#" class="settings-nav-item text-danger"><i
                                class="fas fa-sign-out-alt fs-6 w-20px"></i> Sign Out</a>
                    </div>
                </div>

                <div class="col-lg-9">
                    <div class="settings-card">
                        <h4 class="fw-bold mb-5" style="color: var(--txt);">Personal
                            Information</h4>
                        <form>
                            <div class="row g-4 mb-4">
                                <div class="col-md-6">
                                    <div class="input-group-premium">
                                        <label>First Name</label>
                                        <input type="text" value="Sok">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="input-group-premium">
                                        <label>Last Name</label>
                                        <input type="text" value="Vibol">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="input-group-premium">
                                        <label>Email Address</label>
                                        <input type="email" value="vibol.sok@student.edu">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="input-group-premium">
                                        <label>Phone Number</label>
                                        <input type="tel" value="+855 12 345 678">
                                    </div>
                                </div>
                                <div class="col-md-12 mt-4">
                                    <div class="input-group-premium">
                                        <label>Student ID (Non-editable)</label>
                                        <input type="text" value="STU-882103" disabled>
                                    </div>
                                </div>
                            </div>
                            <div class="d-flex justify-content-end mt-5 pt-4 border-top">
                                <button type="button" class="btn btn-save">Save
                                    Changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
</script>

<style>
.workspace {
        flex: 1;
        overflow-y: auto;
        padding: 2.5rem 3rem;
        background: transparent;
      }

      /* Hero */
      .profile-hero {
        background: rgba(255, 255, 255, 0.85);
        backdrop-filter: blur(16px);
        border: 1px solid var(--bdr);
        border-radius: 24px;
        padding: 40px;
        box-shadow: var(--sh-md);
        display: flex;
        justify-content: space-between;
        align-items: center;
        transition: 0.3s;
      }
      .profile-hero:hover {
        box-shadow: var(--sh-hover);
        transform: translateY(-2px);
      }

      .hero-avatar {
        width: 110px;
        height: 110px;
        border-radius: 24px;
        object-fit: cover;
        border: 4px solid #fff;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
        transition: 0.3s;
      }
      .profile-hero:hover .hero-avatar {
        transform: scale(1.05) rotate(2deg);
      }

      .hero-badge {
        background: #fff;
        border: 1px solid var(--bdr);
        padding: 8px 16px;
        border-radius: 12px;
        font-size: 0.8rem;
        font-weight: 700;
        color: var(--txt-m);
        display: flex;
        align-items: center;
        gap: 8px;
        box-shadow: var(--sh-sm);
      }

      /* Settings Nav */
      .settings-nav {
        background: rgba(255, 255, 255, 0.9);
        backdrop-filter: blur(12px);
        border-radius: 20px;
        border: 1px solid var(--bdr);
        padding: 16px;
        display: flex;
        flex-direction: column;
        gap: 4px;
        box-shadow: var(--sh-sm);
      }
      .settings-nav-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 14px 16px;
        color: var(--txt-m);
        font-weight: 600;
        font-size: 0.9rem;
        border-radius: 12px;
        transition: 0.2s;
      }
      .settings-nav-item:hover {
        background: #f8fafc;
        color: var(--txt);
        transform: translateX(4px);
      }
      .settings-nav-item.active {
        background: var(--em-soft);
        color: var(--em-dk);
        border-left: 4px solid var(--em);
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
      }

      /* Form Cards */
      .settings-card {
        background: rgba(255, 255, 255, 0.9);
        backdrop-filter: blur(16px);
        border-radius: 24px;
        border: 1px solid var(--bdr);
        padding: 40px;
        box-shadow: var(--sh-md);
      }

      .input-group-premium {
        display: flex;
        flex-direction: column;
        gap: 10px;
        position: relative;
      }
      .input-group-premium label {
        font-size: 0.75rem;
        font-weight: 700;
        text-transform: uppercase;
        color: var(--txt-mu);
        letter-spacing: 0.5px;
        transition: 0.3s;
      }
      .input-group-premium input {
        width: 100%;
        padding: 14px 18px;
        border: 2px solid var(--bdr);
        background: #f8fafc;
        border-radius: 14px;
        font-size: 0.95rem;
        font-weight: 600;
        color: var(--txt);
        transition: all 0.3s ease;
      }

      .input-group-premium input:focus {
        background: #fff;
        border-color: var(--em);
        outline: none;
        box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.1);
      }
      .input-group-premium input:focus + label {
        color: var(--em);
      }

      .input-group-premium input:disabled {
        background: #f1f5f9;
        color: var(--txt-mu);
        cursor: not-allowed;
        border-color: transparent;
      }

      .btn-save {
        background: linear-gradient(135deg, var(--em), var(--em-dk));
        border: none;
        padding: 14px 32px;
        border-radius: 14px;
        font-weight: 700;
        font-size: 0.95rem;
        box-shadow: 0 4px 12px rgba(16, 185, 129, 0.2);
        transition: 0.3s;
        color: white;
      }
      .btn-save:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(16, 185, 129, 0.3);
        color: white;
      }
</style>