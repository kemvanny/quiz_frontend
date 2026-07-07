<template>
  <div class="workspace">

    <!-- ── LEFT: FORM ── -->
    <div class="left-col">

      <!-- Configuration Panel -->
      <div class="panel slide-in">
        <div class="panel-head">
          <span class="panel-lbl">
            <i class="fas fa-sliders-h em"></i> Assignment Configuration
          </span>
        </div>
        <div class="panel-body">

          <!-- Title -->
          <div class="field-group">
            <label class="field-label">Assignment Title <span class="req">*</span></label>
            <input
              v-model="form.title"
              type="text"
              class="q-field"
              placeholder="Enter assignment title..."
            />
          </div>

          <!-- Type Chips -->
          <div class="field-group">
            <label class="field-label">Assignment Type</label>
            <div class="chips">
              <div
                v-for="t in types"
                :key="t.label"
                class="tchip"
                :class="{ sel: form.type === t.label }"
                @click="form.type = t.label"
              >
                <div class="icon-box"><i :class="t.icon"></i></div>
                <span>{{ t.label }}</span>
              </div>
            </div>
          </div>

          <!-- Select Group -->
          <div class="select-group">
            <div class="row-2">
              <!-- Subject -->
              <div class="field-group">
                <label class="field-label">Subject</label>
                <div class="select-wrap">
                  <i class="fas fa-book select-ico"></i>
                  <select v-model="form.subject" class="q-field q-select">
                    <option value="">Select Subject</option>
                    <option>Web Development</option>
                    <option>Database Systems</option>
                    <option>Networking</option>
                    <option>Data Structures</option>
                  </select>
                </div>
              </div>

              <!-- Deadline -->
              <div class="field-group">
                <label class="field-label">Submission Deadline</label>
                <div class="select-wrap">
                  <i class="fas fa-calendar-alt select-ico"></i>
                  <input
                    v-model="form.deadline"
                    type="datetime-local"
                    class="q-field ps-ico"
                  />
                </div>
              </div>
            </div>

            <!-- Classroom -->
            <div class="field-group">
              <label class="field-label">Target Classroom</label>
              <div class="room-row">
                <div class="select-wrap flex-1">
                  <i class="fas fa-users select-ico"></i>
                  <select v-model="form.room" class="q-field q-select room-sel">
                    <option value="">Select Classroom to assign</option>
                    <option>Grade 12-A · 32 students</option>
                    <option>Grade 11-B · 28 students</option>
                    <option>IT Foundation A · 40 students</option>
                  </select>
                </div>
                <button class="btn-room" type="button" @click="$emit('new-room')">
                  <i class="fas fa-plus"></i> New Room
                </button>
              </div>
            </div>
          </div>

          <!-- Instructions -->
          <div class="field-group">
            <label class="field-label">Instructions & Requirements</label>
            <textarea
              v-model="form.instructions"
              class="q-field"
              rows="5"
              placeholder="Provide clear instructions for your students..."
            ></textarea>
          </div>

        </div>
      </div>

      <!-- Upload Panel -->
      <div class="panel slide-in" style="animation-delay:.08s">
        <div class="panel-head">
          <span class="panel-lbl"><i class="fas fa-cloud-upload-alt em"></i> Learning Materials</span>
        </div>
        <div class="panel-body">
          <div class="upload-z" @click="$refs.fileInput.click()">
            <div class="u-orb"><i class="fas fa-cloud-arrow-up"></i></div>
            <div class="u-h">Drop Files Here</div>
            <div class="u-s">Drag & drop or click to browse your computer</div>
            <button class="btn-browse" type="button" @click.stop="$refs.fileInput.click()">
              <i class="fas fa-folder-open"></i> Browse Files
            </button>
          </div>
          <input ref="fileInput" type="file" multiple style="display:none" @change="handleFiles" />
          <div class="file-chips">
            <div v-for="f in files" :key="f.name" class="fchip">
              <i class="fas fa-paperclip"></i> {{ f.name }}
            </div>
          </div>
        </div>
      </div>

    </div>

    <!-- ── RIGHT: SUMMARY & PUBLISH ── -->
    <div class="right-col">

      <!-- Publish Card -->
      <div class="panel publish-card slide-in" style="animation-delay:.1s">
        <div class="pub-badge">
          <span class="spinner-dot"></span> Ready to Publish
        </div>
        <h5 class="pub-title">Publish Assignment</h5>
        <p class="pub-sub">Push it live and notify students instantly.</p>
        <button class="btn-publish" @click="openModal">
          <i class="fas fa-paper-plane"></i> Publish Now
        </button>
        <button class="btn-preview">
          <i class="fas fa-eye"></i> Preview First
        </button>
      </div>

      <!-- Summary -->
      <div class="panel slide-in" style="animation-delay:.15s">
        <div class="panel-head">
          <span class="panel-lbl"><i class="fas fa-chart-pie em"></i> Summary</span>
        </div>
        <div class="panel-body">
          <div class="sum-row">
            <span class="sum-k"><i class="fas fa-tag em-i"></i> Type</span>
            <span class="sbdg sb-b">{{ form.type }}</span>
          </div>
          <div class="sum-row">
            <span class="sum-k"><i class="fas fa-clock em-i"></i> Duration</span>
            <span class="sbdg sb-g">{{ form.duration }} {{ form.duration == 1 ? 'Day' : 'Days' }}</span>
          </div>
          <div class="sum-row">
            <span class="sum-k"><i class="fas fa-paperclip em-i"></i> Attachments</span>
            <span class="sbdg sb-s">{{ files.length }} {{ files.length === 1 ? 'File' : 'Files' }}</span>
          </div>
        </div>
      </div>

      <!-- Checklist -->
      <div class="panel slide-in" style="animation-delay:.2s">
        <div class="panel-head">
          <span class="panel-lbl"><i class="fas fa-list-check em"></i> Setup Checklist</span>
        </div>
        <div class="panel-body">
          <div class="cki">
            <div class="ckico"><i class="fas fa-check"></i></div> Type selected
          </div>
          <div class="cki" :class="{ pend: !form.title }">
            <div class="ckico"><i class="fas fa-check"></i></div> Title filled in
          </div>
          <div class="cki" :class="{ pend: !form.subject }">
            <div class="ckico"><i class="fas fa-check"></i></div> Subject chosen
          </div>
          <div class="cki" :class="{ pend: !form.deadline }">
            <div class="ckico"><i class="fas fa-check"></i></div> Deadline set
          </div>
          <div class="cki" :class="{ pend: !form.room }">
            <div class="ckico"><i class="fas fa-check"></i></div> Classroom selected
          </div>
          <div class="cki" :class="{ pend: files.length === 0 }">
            <div class="ckico"><i class="fas fa-check"></i></div> Files attached
          </div>
        </div>
      </div>

    </div>

    <!-- ── PUBLISH MODAL ── -->
    <Teleport to="body">
      <div v-if="showModal" class="modal-overlay" @click.self="showModal = false">
        <div class="modal-box">
          <div class="modal-header">
            <h5><i class="fas fa-paper-plane em"></i> Publish Assignment</h5>
            <button class="modal-close" @click="showModal = false">&times;</button>
          </div>
          <div class="modal-body">
            <p>Are you sure you want to publish <strong>{{ form.type }}</strong> to the selected classroom?</p>
            <div class="modal-stats">
              <div class="mstat">
                <div class="mstat-lbl">Classroom</div>
                <div class="mstat-val">{{ form.room ? form.room.split('·')[0].trim() : '— Not set' }}</div>
              </div>
              <div class="mstat">
                <div class="mstat-lbl">Files</div>
                <div class="mstat-val">{{ files.length }} attached</div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn-cancel" @click="showModal = false">Cancel</button>
            <button class="btn-confirm" @click="confirmPublish">
              <i class="fas fa-check-circle"></i> Confirm & Publish
            </button>
          </div>
        </div>
      </div>
    </Teleport>

  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const showModal = ref(false)
const files = ref([])

const form = reactive({
  title: '',
  type: 'Homework',
  subject: '',
  deadline: '',
  room: '',
  instructions: '',
  duration: 7,
})

const types = [
  { label: 'Homework',     icon: 'fas fa-home' },
  { label: 'Group Work',   icon: 'fas fa-users' },
  { label: 'Research',     icon: 'fas fa-book-open' },
  { label: 'Presentation', icon: 'fas fa-desktop' },
]

function handleFiles(e) {
  files.value = Array.from(e.target.files)
}

function openModal() {
  showModal.value = true
}

function confirmPublish() {
  showModal.value = false
  alert('Assignment successfully published!')
}
</script>

<style scoped>

:root {
  --em:      #10b981;
  --em-dk:   #059669;
  --em-soft: #ecfdf5;
  --em-mid:  rgba(16,185,129,.25);
  --txt:     #1e293b;
  --txt-m:   #334155;
  --txt-mu:  #64748b;
  --bdr:     #e2e8f0;
  --r-md:    10px;
  --r-lg:    14px;
  --r-xl:    20px;
}


.workspace {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px 24px;
  overflow-y: auto;
  min-height: 0;
  font-family: "Kantumruy Pro", "Poppins", sans-serif;
}
@media (min-width: 992px) {
  .workspace {
    display: grid;
    grid-template-columns: 1fr 340px;
    align-items: start;
  }
}

.left-col,
.right-col {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.panel {
  background: #fff;
  border: 1px solid var(--bdr);
  border-radius: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,.04);
  overflow: hidden;
  
  
}
.panel-head {
  padding: 14px 20px;
  border-bottom: 1px solid var(--bdr);
  background: #fafbfc;
}
.panel-lbl {
  font-size: .75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--txt-mu);
  display: flex;
  align-items: center;
  gap: 8px;
}
.panel-body { padding: 20px; display: flex; flex-direction: column; gap: 18px;}


.field-group { display: flex; flex-direction: column; gap: 6px; }
.field-label {
  font-size: .7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: .5px;
  color: var(--txt-mu);
}
.req { color: #ef4444; }

.q-field {
  width: 100%;
  border: 1.5px solid var(--bdr);
  border-radius: var(--r-lg);
  padding: 10px 14px;
  font-size: .87rem;
  font-weight: 500;
  color: var(--txt);
  outline: none;
  font-family: inherit;
  background: #fafbfc;
  transition: .17s;
  line-height: 1.6;
  box-sizing: border-box;
}
.q-field:focus {
  border-color: #10b981;
  background: #fff;
  box-shadow: 0 0 0 3px rgba(16,185,129,.08);
}


.select-group {
  background: #f8fafc;
  border: 1px solid #f1f5f9;
  border-radius: 16px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.row-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
@media (max-width: 600px) { .row-2 { grid-template-columns: 1fr; } }

.select-wrap { position: relative; }
.select-ico {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: #94a3b8;
  pointer-events: none;
  z-index: 1;
}
.q-select { padding-left: 42px !important; }
.ps-ico   { padding-left: 42px !important; }


.room-row { display: flex; }
.flex-1   { flex: 1; min-width: 0; }
.room-sel { border-radius: 12px 0 0 12px !important; border-right: none !important; }
.btn-room {
  background: #ecfdf5;
  color: #059669;
  border: 1.5px solid rgba(16,185,129,.25);
  border-left: none;
  border-radius: 0 12px 12px 0;
  padding: 0 18px;
  font-weight: 700;
  font-size: .82rem;
  cursor: pointer;
  white-space: nowrap;
  transition: .2s;
  font-family: inherit;
}
.btn-room:hover { background: #d1fae5; }


.chips { display: flex; flex-wrap: wrap; gap: 8px; }
.tchip {
  background: #fff;
  border: 1.5px solid var(--bdr);
  border-radius: 14px;
  cursor: pointer;
  transition: all .2s;
  color: var(--txt-mu);
  font-weight: 600;
  font-size: .8rem;
  display: inline-flex;
  align-items: center;
  padding: 6px 14px 6px 6px;
}
.tchip:hover { border-color: #cbd5e1; transform: translateY(-1px); }
.tchip.sel { border-color: #10b981; background: #ecfdf5; color: #059669; box-shadow: 0 4px 16px rgba(16,185,129,.15); }
.icon-box {
  width: 28px; height: 28px; border-radius: 8px;
  background: #f1f5f9;
  display: flex; align-items: center; justify-content: center;
  color: #94a3b8; transition: .2s; margin-right: 6px;
}
.tchip.sel .icon-box { background: #10b981; color: #fff; }


.upload-z {
  border: 2px dashed var(--bdr);
  border-radius: 16px;
  padding: 32px 20px;
  text-align: center;
  background: #fafbfc;
  cursor: pointer;
  transition: .25s;
}
.upload-z:hover { border-color: rgba(16,185,129,.25); background: #ecfdf5; }
.u-orb {
  width: 56px; height: 56px; border-radius: 16px;
  background: linear-gradient(135deg,#10b981,#059669);
  color: #fff; font-size: 1.3rem;
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto 12px;
  box-shadow: 0 10px 24px rgba(16,185,129,.24); transition: .25s;
}
.upload-z:hover .u-orb { transform: translateY(-3px) scale(1.04); }
.u-h { font-size: .9rem; font-weight: 800; color: var(--txt); margin-bottom: 4px; }
.u-s { font-size: .75rem; color: var(--txt-mu); margin-bottom: 14px; }
.btn-browse {
  background: #1e293b; color: #fff;
  border: none; border-radius: 8px;
  padding: 8px 20px; font-weight: 700;
  font-size: .8rem; cursor: pointer;
  font-family: inherit;
}

.file-chips { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 12px; }
.fchip {
  display: inline-flex; align-items: center; gap: 6px;
  background: #ecfdf5; border: 1px solid rgba(16,185,129,.25);
  border-radius: 10px; padding: 6px 12px;
  font-size: .75rem; font-weight: 600; color: #059669;
}

/* ── Publish card ── */
.publish-card {
  padding: 24px;
  text-align: center;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 10px 30px rgba(16,185,129,.08);
}
.pub-badge {
  display: inline-flex; align-items: center; gap: 6px;
  background: #ecfdf5; color: #10b981;
  font-size: .7rem; font-weight: 700;
  border: 1px solid rgba(16,185,129,.2);
  border-radius: 999px; padding: 4px 12px;
  margin-bottom: 12px;
}
.spinner-dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: #10b981;
  animation: pulse 1.2s ease-in-out infinite;
}
@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.3} }
.pub-title { font-size: 1rem; font-weight: 800; color: var(--txt); margin: 0 0 4px; }
.pub-sub   { font-size: .75rem; color: var(--txt-mu); margin: 0 0 16px; }
.btn-publish {
  width: 100%; border: none; border-radius: 10px;
  padding: 10px; font-weight: 700; font-size: .87rem;
  background: linear-gradient(135deg,#10b981,#059669); color: #fff;
  cursor: pointer; margin-bottom: 8px; transition: .2s;
  font-family: inherit;
}
.btn-publish:hover { transform: translateY(-2px); box-shadow: 0 6px 15px rgba(16,185,129,.3); }
.btn-preview {
  width: 100%; border: 1px solid #e2e8f0; border-radius: 10px;
  padding: 10px; font-weight: 700; font-size: .87rem;
  background: #f8fafc; color: var(--txt-m);
  cursor: pointer; transition: .2s; font-family: inherit;
}
.btn-preview:hover { background: #f1f5f9; }

/* ── Summary ── */
.sum-row {
  display: flex; align-items: center; justify-content: space-between;
  padding: 10px 0; border-bottom: 1px solid #f1f5f9;
}
.sum-row:last-child { border-bottom: none; padding-bottom: 0; }
.sum-k { display: flex; align-items: center; gap: 8px; font-size: .75rem; color: var(--txt-mu); font-weight: 600; }
.em-i  { color: #10b981; font-size: .7rem; width: 14px; text-align: center; }
.sbdg  { font-size: .7rem; font-weight: 700; padding: 3px 10px; border-radius: 999px; }
.sb-g  { background: #dcfce7; color: #16a34a; }
.sb-a  { background: #fef9c3; color: #a16207; }
.sb-s  { background: #f1f5f9; color: #475569; }
.sb-b  { background: #dbeafe; color: #1d4ed8; }

/* ── Checklist ── */
.cki {
  display: flex; align-items: center; gap: 10px;
  font-size: .8rem; color: var(--txt-m); font-weight: 500;
  padding: 10px 0; border-bottom: 1px solid #f1f5f9;
}
.cki:last-child { border-bottom: none; }
.ckico {
  width: 22px; height: 22px; border-radius: 6px;
  background: #ecfdf5; color: #10b981;
  display: flex; align-items: center; justify-content: center;
  font-size: .65rem; flex-shrink: 0;
}
.cki.pend .ckico { background: #f1f5f9; color: #cbd5e1; }
.cki.pend         { color: var(--txt-mu); }

/* ── Modal ── */
.modal-overlay {
  position: fixed; inset: 0;
  background: rgba(0,0,0,.35); backdrop-filter: blur(4px);
  display: flex; align-items: center; justify-content: center;
  z-index: 1000;
}
.modal-box {
  background: #fff; border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0,0,0,.15);
  width: 420px; max-width: 95vw;
  overflow: hidden;
}
.modal-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 20px 24px 0;
}
.modal-header h5 {
  font-size: 1rem; font-weight: 800; color: var(--txt);
  display: flex; align-items: center; gap: 8px; margin: 0;
}
.modal-close {
  background: none; border: none; font-size: 1.4rem;
  color: #94a3b8; cursor: pointer; line-height: 1;
}
.modal-body { padding: 16px 24px; text-align: center; font-size: .87rem; color: var(--txt-m); }
.modal-stats { display: flex; justify-content: center; gap: 12px; margin-top: 16px; }
.mstat { background: #f8fafc; border-radius: 12px; padding: 12px 20px; min-width: 110px; }
.mstat-lbl { font-size: .65rem; font-weight: 700; text-transform: uppercase; color: var(--txt-mu); }
.mstat-val { font-size: .85rem; font-weight: 700; color: var(--txt); margin-top: 4px; }
.modal-footer { display: flex; justify-content: flex-end; gap: 10px; padding: 0 24px 20px; }
.btn-cancel {
  background: #f1f5f9; border: none; border-radius: 10px;
  padding: 9px 18px; font-weight: 700; font-size: .85rem;
  cursor: pointer; font-family: inherit;
}
.btn-confirm {
  background: linear-gradient(135deg,#10b981,#059669);
  color: #fff; border: none; border-radius: 10px;
  padding: 9px 20px; font-weight: 700; font-size: .85rem;
  cursor: pointer; font-family: inherit;
}

/* ── Utility ── */
.em { color: #10b981; }
@keyframes slideUp { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
.slide-in { animation: slideUp .22s ease both; }
</style>