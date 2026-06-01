<template>
  <div class="content-area">
    
    <div class="profile-hero mb-4">
      <div class="d-flex flex-column flex-md-row align-items-center align-items-md-start gap-4 text-center text-md-start">
        <div class="position-relative">
          <img :src="profileData.avatarUrl || 'https://ui-avatars.com/api/?name=' + profileData.firstName + '+' + profileData.lastName + '&background=random'" class="hero-avatar" id="profileImagePreview">
          <div class="hero-edit-btn shadow-sm" @click="triggerFileInput"><i class="fas fa-camera"></i></div>
          <input type="file" id="profileImageUpload" style="display: none;" accept="image/*" @change="handleAvatarUpload">
        </div>
        <div>
          <h2 class="fw-bold mb-1" style="color: var(--txt); letter-spacing: -0.5px;">{{ profileData.firstName }} {{ profileData.lastName }}</h2>
          <p class="mb-3" style="color: var(--txt-mu); font-weight: 500; font-size: 0.9rem;"><i class="fas fa-chalkboard-teacher me-2 text-primary"></i>Instructor</p>
          <div class="d-flex flex-wrap justify-content-center justify-content-md-start gap-2">
            <span class="hero-badge"><i class="fas fa-star text-warning"></i> 4.9 Rating</span>
            <span class="hero-badge"><i class="fas fa-users text-primary"></i> 1,284 Students</span>
            <span class="hero-badge"><i class="fas fa-layer-group text-success"></i> 12 Active Classes</span>
          </div>
        </div>
      </div>
      
      <div v-if="profileData.avatarUrl" class="w-100 w-md-auto d-flex justify-content-center mt-3 mt-md-0">
        <button class="btn btn-outline-danger fw-bold rounded-pill px-4" style="border-width: 2px;" @click="handleDeleteAvatar" :disabled="loadingAvatar">
          <i class="fas fa-spinner fa-spin me-2" v-if="loadingAvatar"></i>
          <i class="fas fa-trash-alt me-2" v-else></i> លុបរូបភាព
        </button>
      </div>
    </div>

    <div class="row g-4">
      <div class="col-lg-3">
        <div class="settings-nav">
            <a href="javascript:void(0)" :class="['settings-nav-item', currentTab === 'general' ? 'active' : '']" @click="currentTab = 'general'"><i class="fas fa-user"></i> General Info</a>
            <a href="javascript:void(0)" :class="['settings-nav-item', currentTab === 'security' ? 'active' : '']" @click="currentTab = 'security'"><i class="fas fa-lock"></i> Security & Password</a>
            <a href="javascript:void(0)" :class="['settings-nav-item', currentTab === 'notifications' ? 'active' : '']" @click="currentTab = 'notifications'"><i class="fas fa-bell"></i> Notifications</a>
            <a href="javascript:void(0)" :class="['settings-nav-item', currentTab === 'sessions' ? 'active' : '']" @click="currentTab = 'sessions'"><i class="fas fa-shield-alt"></i> Active Sessions</a>
            <hr class="my-2 border-secondary opacity-10">
            <a href="javascript:void(0)" class="settings-nav-item text-danger" @click="handleSignOut"><i class="fas fa-sign-out-alt"></i> Sign Out</a>
        </div>
      </div>

      <div class="col-lg-9">
        
        <div v-if="currentTab === 'general'" id="tab-general" class="settings-tab-content">
          <div class="settings-card">
            <h5 class="fw-bold mb-4" style="color: var(--txt);">Personal Information</h5>
            
            <div v-if="loadingData" class="text-center py-4">
              <div class="spinner-border text-success spinner-border-sm" role="status"></div>
            </div>

            <form v-else @submit.prevent="handleSaveProfile">
              <div class="row g-4">
                <div class="col-md-6">
                  <div class="input-group-premium">
                    <label>First Name</label>
                    <input type="text" v-model="profileData.firstName">
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="input-group-premium">
                    <label>Last Name</label>
                    <input type="text" v-model="profileData.lastName">
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="input-group-premium">
                    <label>Email Address</label>
                    <input type="email" v-model="profileData.email" disabled style="cursor: not-allowed; opacity: 0.7;">
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="input-group-premium">
                    <label>Phone Number</label>
                    <input type="text" v-model="profileData.phone">
                  </div>
                </div>
                <div class="col-12">
                  <div class="input-group-premium">
                    <label>Address</label>
                    <input type="text" v-model="profileData.address">
                  </div>
                </div>
              </div>

              <div class="d-flex justify-content-end gap-3 mt-4 pt-4 border-top">
                <button type="button" class="btn btn-light fw-bold px-4" style="border-radius: 12px; color: var(--txt-mu);" @click="fetchUserProfile">Discard changes</button>
                <button type="submit" class="btn btn-success fw-bold px-4" style="border-radius: 12px; background: var(--em); border-color: var(--em);" :disabled="updatingProfile">
                  <i class="fas fa-spinner fa-spin me-1" v-if="updatingProfile"></i>
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
        
        <div v-if="currentTab === 'security'" id="tab-security" class="settings-tab-content">
          <div class="settings-card">
            <h5 class="fw-bold mb-4" style="color: var(--txt);">Security & Password</h5>
            <form>
              <div class="row g-4">
                <div class="col-12">
                  <div class="input-group-premium">
                    <label>Current Password</label>
                    <input type="password" placeholder="Enter current password">
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="input-group-premium">
                    <label>New Password</label>
                    <input type="password" placeholder="Enter new password">
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="input-group-premium">
                    <label>Confirm New Password</label>
                    <input type="password" placeholder="Confirm new password">
                  </div>
                </div>
              </div>
              <div class="d-flex justify-content-end mt-4 pt-4 border-top">
                <button type="button" class="btn btn-success fw-bold px-4" style="border-radius: 12px; background: var(--em); border-color: var(--em);">Update Password</button>
              </div>
            </form>
          </div>
        </div>

        <div v-if="currentTab === 'notifications'" id="tab-notifications" class="settings-tab-content">
          <div class="settings-card">
            <h5 class="fw-bold mb-4" style="color: var(--txt);">Notification Preferences</h5>
            
            <div class="d-flex justify-content-between align-items-center mb-3 pb-3 border-bottom">
              <div>
                <h6 class="fw-bold mb-1" style="color: var(--txt);">Email Notifications</h6>
                <p class="mb-0 text-muted" style="font-size: 0.8rem;">Receive daily summaries of class activity.</p>
              </div>
              <div class="form-check form-switch custom-switch">
                <input class="form-check-input" type="checkbox" checked>
              </div>
            </div>

            <div class="d-flex justify-content-between align-items-center mb-3 pb-3 border-bottom">
              <div>
                <h6 class="fw-bold mb-1" style="color: var(--txt);">Exam Submissions</h6>
                <p class="mb-0 text-muted" style="font-size: 0.8rem;">Get notified instantly when a student submits an exam.</p>
              </div>
              <div class="form-check form-switch custom-switch">
                <input class="form-check-input" type="checkbox" checked>
              </div>
            </div>
          </div>
        </div>

        <div v-if="currentTab === 'sessions'" id="tab-sessions" class="settings-tab-content">
          <div class="settings-card">
            <h5 class="fw-bold mb-4" style="color: var(--txt);">Active Sessions</h5>
            <div class="d-flex align-items-center gap-3 mb-3 pb-3 border-bottom">
              <div class="rounded-circle d-flex align-items-center justify-content-center" style="width: 40px; height: 40px; background: var(--em-soft); color: var(--em); font-size: 1.2rem;">
                <i class="fas fa-desktop"></i>
              </div>
              <div class="flex-grow-1">
                <h6 class="fw-bold mb-0 text-dark" style="font-size: 0.9rem;">Windows 11 • Chrome</h6>
                <p class="mb-0 text-muted" style="font-size: 0.75rem;">Phnom Penh, Cambodia — <span class="text-success fw-bold">Active now</span></p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useToast } from 'vue-toastification';
import { getProfile, updateProfile, updateAvatar, deleteAvatar } from '@/api/teacher.api';

const toast = useToast();
const currentTab = ref('general');
const loadingData = ref(false);
const updatingProfile = ref(false);
const loadingAvatar = ref(false);

const credentials = {
  email: sessionStorage.getItem('user_email') || sessionStorage.getItem('email'), 
  password: sessionStorage.getItem('user_password') || sessionStorage.getItem('password')
};

console.log("Credentials លោតមកក្នុង Profile:", credentials);

const profileData = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  avatarUrl: ''
});

const fetchUserProfile = async () => {
  if (!credentials.email || !credentials.password) {
    console.warn("រកមិនឃើញព័ត៌មាន Email ឬ Password នៅក្នុង Session ឡើយ។");
    toast.warning("សូមបំពេញព័ត៌មានគណនីឱ្យបានពេញលេញ ដើម្បីកែប្រែប្រវត្តិរូប។");
    return; 
  }

  try {
    loadingData.value = true;
    const res = await getProfile(credentials);
    const user = res.data?.data || res.data;
    
    if (user) {
      profileData.firstName = user.firstName || '';
      profileData.lastName = user.lastName || '';
      profileData.email = user.email || credentials.email;
      profileData.phone = user.phone || '';
      profileData.address = user.address || '';
      profileData.avatarUrl = user.avatar || user.avatarUrl || ''; 
    }
  } catch (err) {
    console.error("Fetch profile error:", err);
    toast.error("មិនអាចទាញយកព័ត៌មានប្រវត្តិរូបបានទេ");
  } finally {
    loadingData.value = false;
  }
};

onMounted(() => {
  fetchUserProfile();
});

const handleSaveProfile = async () => {
  try {
    updatingProfile.value = true;
    
    const payload = {
      firstName: profileData.firstName.trim(),
      lastName: profileData.lastName.trim(),
      phone: profileData.phone.trim(),
      address: profileData.address.trim()
    };
    
    await updateProfile(payload);
    toast.success("រក្សាទុកការកែប្រែជោគជ័យ");
    await fetchUserProfile();
  } catch (err) {
    console.error("Update profile error:", err);
    toast.error("ការរក្សាទុកទិន្នន័យបានបរាជ័យ");
  } finally {
    updatingProfile.value = false;
  }
};

const triggerFileInput = () => {
  document.getElementById('profileImageUpload').click();
};

const handleAvatarUpload = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append('avatar', file);

  try {
    loadingAvatar.value = true;
    await updateAvatar(formData);
    toast.success("បានផ្លាស់ប្តូររូបភាពប្រវត្តិរូបជោគជ័យ");
    await fetchUserProfile();
  } catch (err) {
    console.error("Upload avatar error:", err);
    toast.error("មិនអាចផ្ទុករូបភាពឡើងបានទេ");
  } finally {
    loadingAvatar.value = false;
  }
};

const handleDeleteAvatar = async () => {
  if (!confirm("តើអ្នកពិតជាចង់លុបរូបភាពប្រវត្តិរូបនេះមែនទេ?")) return;
  
  try {
    loadingAvatar.value = true;
    await deleteAvatar(credentials);
    profileData.avatarUrl = '';
    toast.success("បានលុបរូបភាពប្រវត្តិរូបរួចរាល់");
    await fetchUserProfile();
  } catch (err) {
    console.error("Delete avatar error:", err);
    toast.error("ប្រតិបត្តិការលុបរូបភាពបានបរាជ័យ");
  } finally {
    loadingAvatar.value = false;
  }
};

const handleSignOut = () => {
  sessionStorage.clear();
  window.location.href = '/login';
};
</script>
<style scoped>
.content-area {
  flex: 1;
  overflow-y: auto;
  padding: 30px 40px;
  display: flex;
  flex-direction: column;
}

.profile-hero {
  background: #ffffff;
  border: 1px solid var(--bdr);
  border-radius: 24px;
  padding: 30px;
  box-shadow: var(--sh-sm);
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: space-between;
  align-items: center;
}

.hero-avatar { width: 100px; height: 100px; border-radius: 20px; object-fit: cover; border: 4px solid #fff; box-shadow: var(--sh-md); }
.hero-edit-btn { position: absolute; bottom: -10px; right: -10px; width: 34px; height: 34px; border-radius: 10px; background: var(--em); color: #fff; border: 2px solid #fff; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: .2s; }
.hero-edit-btn:hover { transform: scale(1.1); background: var(--em-dk); }

.hero-badge { background: #f8fafc; border: 1px solid var(--bdr); padding: 5px 12px; border-radius: 10px; font-size: 0.75rem; font-weight: 700; color: var(--txt-m); display: flex; align-items: center; gap: 6px; }

.settings-nav { background: #fff; border-radius: 20px; border: 1px solid var(--bdr); padding: 12px; display: flex; flex-direction: column; gap: 4px; }
.settings-nav-item { display: flex; align-items: center; gap: 12px; padding: 12px 16px; color: var(--txt-mu); text-decoration: none; font-weight: 600; font-size: 0.85rem; border-radius: 12px; transition: .2s; }
.settings-nav-item i { width: 16px; text-align: center; }
.settings-nav-item:hover { background: #f8fafc; color: var(--txt); }
.settings-nav-item.active { background: var(--em-soft); color: var(--em); }

.settings-card { background: #fff; border-radius: 24px; border: 1px solid var(--bdr); padding: 30px; box-shadow: var(--sh-sm); }

.input-group-premium { display: flex; flex-direction: column; gap: 8px; }
.input-group-premium label { font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: var(--txt-mu); }
.input-group-premium input {
  width: 100%; padding: 12px 16px; border: 2px solid transparent; background: #f8fafc;
  border-radius: 12px; font-size: 0.9rem; font-weight: 500; color: var(--txt); transition: .2s;
}
.input-group-premium input:focus {
  background: #fff; border-color: var(--em); outline: none; box-shadow: 0 4px 12px rgba(16,185,129,0.1);
}

.custom-switch .form-check-input { width: 45px; height: 24px; border-radius: 24px; cursor: pointer; }
.custom-switch .form-check-input:checked { background-color: var(--em); border-color: var(--em); }

</style>