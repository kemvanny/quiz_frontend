# ប្រព័ន្ធគ្រប់គ្រង Quiz — Frontend (Vue.js)

Frontend សម្រាប់ប្រព័ន្ធគ្រប់គ្រង Quiz បង្កើតឡើងដោយប្រើ Vue 3, Pinia សម្រាប់ state management, Axios សម្រាប់ហៅ API, និង Bootstrap សម្រាប់ UI។

---

## មាតិកា

- [លក្ខខណ្ឌតម្រូវ](#លក្ខខណ្ឌតម្រូវ)
- [ការដំឡើង](#ការដំឡើង)
- [Environment Variables](#environment-variables)
- [ការដំណើរការ Project](#ការដំណើរការ-project)
- [ចំណាំសុវត្ថិភាព](#ចំណាំសុវត្ថិភាព)

---

## លក្ខខណ្ឌតម្រូវ

មុននឹងចាប់ផ្តើម សូមប្រាកដថាអ្នកបានដំឡើងកម្មវិធីខាងក្រោមរួចហើយ៖

- [Node.js](https://nodejs.org/) (ជំនាន់ v16 ឡើងទៅ ត្រូវបានណែនាំ)
- [npm](https://www.npmjs.com/) (មកជាមួយ Node.js ស្រាប់)

---

## ការដំឡើង

1. នៅពេលបើក project លើកដំបូង សូម run command ខាងក្រោមដើម្បីដំឡើង dependencies មូលដ្ឋាន៖

  - npm install

2. បន្ទាប់មក ដំឡើង package បន្ថែមដែលត្រូវការសម្រាប់ project នេះ៖
  
  npm install axios pinia vue vue-router vue-toastification sweetalert2 bootstrap bootstrap-icons @fontsource/plus-jakarta-sans @fortawesome/fontawesome-free

---

## Environment Variables

បង្កើតឯកសារ `.env` នៅក្នុង folder `QUIZ_FRONTEND` ដោយបញ្ចូលព័ត៌មានដូចខាងក្រោម៖


  - VITE_BASE_URL=https://quiz-management-system.tdomain.work.gd/api
  - VITE_BASE_URL_FOR_IMAGE=https://quiz-management-system.tdomain.work.gd


 **ចំណាំ៖** តម្លៃទាំងនេះជា URL របស់ server ដែល frontend នេះនឹងភ្ជាប់ទៅប្រើប្រាស់។ សូមប្តូរទៅជា URL ត្រឹមត្រូវ បើសិនជាអ្នកប្រើ server ខុសគ្នា (ឧទាហរណ៍៖ local backend)។

---

## ការដំណើរការ Project

នៅពេលដែល dependencies ត្រូវបានដំឡើងរួច និងឯកសារ `.env` ត្រូវបានកំណត់រួច សូម run command ខាងក្រោមដើម្បីចាប់ផ្តើម development server៖

  - npm run dev

Project នឹងអាចមើលបានតាមរយៈ address ដែលបង្ហាញនៅក្នុង terminal (ជាធម្មតាគឺ `http://localhost:5173`)។

---

## ចំណាំសុវត្ថិភាព

- **កុំដែល commit ឯកសារ `.env`** ចូលទៅក្នុង version control ជាដាច់ខាត — សូមបញ្ចូលវាទៅក្នុង `.gitignore`។
- ត្រូវប្រាកដថា `VITE_BASE_URL` និង `VITE_BASE_URL_FOR_IMAGE` ត្រូវនឹង environment ដែលអ្នកកំពុងប្រើ (development, staging, production)។

---

*រក្សាទុកនិងថែទាំដោយក្រុមគម្រោង Pralong។*