<template>
    <div class="main-content">
        <div class="topbar">
            <div class="d-flex align-items-center gap-3">
                <div
                    style="width:44px;height:44px;border-radius:13px;background:var(--em-soft);color:var(--em-dk);display:flex;align-items:center;justify-content:center;font-size:1.2rem;">
                    <i class="fas fa-door-open"></i>
                </div>
                <div>
                    <div class="fw-bold"
                        style="font-size:1.15rem;color:var(--txt);letter-spacing:-0.3px;line-height:1.1;">My Enrolled
                        Rooms</div>
                    <div style="font-size:0.78rem;color:var(--txt-mu);font-weight:600;">Access all your classes and
                        course streams</div>
                </div>
            </div>
            <div class="d-flex align-items-center gap-3">
                <button class="d-flex align-items-center gap-2 fw-bold"
                    style="background:linear-gradient(135deg,var(--em),var(--em-dk));color:#fff;border:none;border-radius:12px;padding:9px 20px;font-size:0.85rem;cursor:pointer;transition:.2s;box-shadow:0 4px 12px rgba(16,185,129,0.25);"
                    onclick="openJoinModal()">
                    <i class="fas fa-plus"></i> Join New Room
                </button>
                <div style="width:1px;height:26px;background:var(--bdr);"></div>
                <a href="6.st-profile.html" class="d-flex align-items-center gap-2 p-1 pe-3 rounded-pill bg-white"
                    style="border:1px solid var(--bdr);box-shadow:var(--sh-sm);">
                    <img src="https://ui-avatars.com/api/?name=Sok+Vibol&background=10b981&color=fff"
                        style="width:34px;height:34px;border-radius:50%;border:2px solid var(--em-soft);">
                    <div style="line-height:1.15;">
                        <div class="fw-bold" style="font-size:.83rem;">Sok Vibol</div>
                        <div style="font-size:.7rem;color:var(--txt-mu);font-weight:600;">Student</div>
                    </div>
                </a>
            </div>
        </div>
    </div>
</template>