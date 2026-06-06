<template>
    <div class="login-container">

        <router-link to="" class="floating-back-btn">
            <i class="fas fa-arrow-left"></i>
            <span>Back to Homepage</span>
        </router-link>

        <div class="card-wrapper">

            <div class="left-panel">
                <div class="welcome-text">
                    <h2>សូមស្វាគមន៍<br>ការត្រឡប់មកវិញ!</h2>
                    <p>
                        ចូលគណនីរបស់អ្នក ដើម្បីបន្តការប្រើប្រាស់
                        និងចូលប្រើព័ត៌មានរបស់អ្នកបានភ្លាមៗ
                    </p>
                </div>

                <div class="product-img-area">
                    <img src="https://mysoftltd.com/assets/img/products/product-accounts.svg" alt="Illustration">
                </div>
            </div>

            <div class="right-panel">
                <h3>ចូលគណនី</h3>
                <p class="subtitle">
                    សូមបញ្ចូលអ៊ីមែល និងពាក្យសម្ងាត់របស់អ្នក
                </p>

                <form @submit.prevent="handleLogin">
                    <div class="input-group-custom" :class="{ 'has-error': errors.email }">
                        <i class="fas fa-envelope"></i>
                        <input type="email" v-model.trim="email" placeholder="អ៊ីមែល" @input="validateEmail(email)">
                    </div>
                    <span v-if="errors.email" class="error-text">{{ errors.email }}</span>

                    <div class="input-group-custom" :class="{ 'has-error': errors.password }">
                        <i class="fas fa-lock"></i>
                        <input :type="showPassword ? 'text' : 'password'" v-model.trim="password" placeholder="ពាក្យសម្ងាត់"
                            @input="validatePassword(password)">
                        <i class="fas" :class="showPassword ? 'fa-eye-slash' : 'fa-eye'" @click="togglePassword"
                            style="cursor: pointer; margin-left: auto;"></i>
                    </div>
                    <span v-if="errors.password" class="error-text">{{ errors.password }}</span>

                    <div class="forgot-password">
                        <a href="#">ភ្លេចពាក្យសម្ងាត់?</a>
                    </div>

                    <button type="submit" class="btn-login" :disabled="isLoading">
                        <span v-if="isLoading"><i class="fas fa-spinner fa-spin"></i>កំពុងផ្ទៀងផ្ទាត់...</span>
                        <span v-else>ចូលគណនី</span>
                    </button>
                </form>
            </div>

        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { loginAPI } from '@/api/auth.api'
import { useFormValidation } from '@/composables/useFormValidation'

const router = useRouter()

const showPassword = ref(false);
const isLoading = ref(false);
const email = ref('')
const password = ref('')

const togglePassword = () => {
    showPassword.value = !showPassword.value;
};

const { errors, validateEmail, validatePassword } = useFormValidation();

const handleLogin = async () => {

    if (isLoading.value) return;

    validateEmail(email.value);
    validatePassword(password.value);

    if (errors.value.email || errors.value.password) return;

    isLoading.value = true;
    try {
        const data = await loginAPI(email.value, password.value);

        if (data && data.data.token) {
            sessionStorage.setItem('user_token', data.data.token)
            sessionStorage.setItem('user_role', data.data.role_id)
            const roleId = data.data.role_id

            if (roleId === 1) {
                router.push('/admin/dashboard')
            } else if (roleId === 2) {
                router.push('/teacher/dashboard')
            } else if (roleId === 3) {
                router.push('/student/dashboard')
            } else {
                console.log("គណនីរបស់អ្នកមិនទាន់មានសិទ្ធិ Role ក្នុងប្រព័ន្ធឡើយ!")
                const errorMessage = error.response?.data?.message || "អ៊ីមែល ឬពាក្យសម្ងាត់មិនត្រឹមត្រូវ!";


                errors.value.email = errorMessage;
                errors.value.password = "សូមពិនិត្យមើលពាក្យសម្ងាត់របស់អ្នកឡើងវិញ!";
            }
        }
    } catch (error) {
        console.error("Login Error:", error)
    } finally {
        isLoading.value = false
    }
}
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.login-container {
    position: fixed;
    top: 0;
    left: 0;
    min-height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f3f7fb;
    font-family: 'Kantumruy Pro', sans-serif;
    padding: 20px;
    z-index: 9999;

}

.login-container::before {
    content: '';
    position: absolute;
    top: -120px;
    right: -120px;
    width: 320px;
    height: 320px;
    background: #09b69f;
    border-radius: 50%;
    opacity: 0.15;
    pointer-events: none;
}

.login-container::after {
    content: '';
    position: absolute;
    bottom: -150px;
    left: -150px;
    width: 350px;
    height: 350px;
    background: #ffa41b;
    border-radius: 50%;
    opacity: 0.15;
    pointer-events: none;
}

.input-group-custom input,
.input-group-custom input::placeholder {
    font-family: 'Kantumruy Pro', sans-serif;
}

.input-group-custom input {
    width: 100%;
    border: none;
    outline: none;
    background: transparent;
    font-size: 0.95rem;
    color: #555;
    font-family: 'Kantumruy Pro', sans-serif !important;
    font-weight: 500;
}

.input-group-custom input::placeholder {
    color: #bbb;
    font-family: 'Kantumruy Pro', sans-serif !important;
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
    transition: background-color 5000s ease-in-out 0s;
    transition-property: background-color;
}

.floating-back-btn {
    position: absolute;
    top: 25px;
    left: 25px;
    z-index: 999;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 18px;
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    border: 1px solid rgba(255, 255, 255, 0.4);
    border-radius: 50px;
    text-decoration: none;
    color: #333;
    font-size: 0.92rem;
    font-weight: 700;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;
}

.floating-back-btn:hover {
    transform: translateY(-2px);
    background: #fff;
    color: #3cbfae;
    box-shadow: 0 15px 35px rgba(60, 191, 174, 0.18);
}

.floating-back-btn i {
    transition: 0.3s;
}

.floating-back-btn:hover i {
    transform: translateX(-3px);
}

.card-wrapper {
    width: 100%;
    max-width: 960px;
    min-height: 600px;
    display: flex;
    border-radius: 30px;
    overflow: hidden;
    background: #fff;
    position: relative;
    z-index: 2;
    box-shadow: 0 25px 60px rgba(0, 0, 0, 0.12);
}

.left-panel {
    width: 45%;
    background: linear-gradient(135deg, #3cbfae, #2fa898);
    padding: 50px 40px 230px;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.left-panel::before {
    content: '';
    position: absolute;
    top: -50px;
    right: -50px;
    width: 180px;
    height: 180px;
    background: rgba(255, 255, 255, 0.08);
    border-radius: 50%;
}

.left-panel::after {
    content: '';
    position: absolute;
    bottom: -60px;
    left: -60px;
    width: 220px;
    height: 220px;
    background: rgba(255, 255, 255, 0.08);
    border-radius: 50%;
}

.welcome-text {
    color: #fff;
    position: relative;
    z-index: 2;
}

.welcome-text h2 {
    font-size: 2.8rem;
    font-weight: 800;
    line-height: 1.6;
    margin-bottom: 18px;
}

.welcome-text p {
    font-size: 1rem;
    line-height: 1.7;
    opacity: 0.95;
    max-width: 320px;
}

.product-img-area {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 88%;
    z-index: 2;
}

.product-img-area img {
    width: 100%;
    max-height: 260px;
    object-fit: contain;
    filter: drop-shadow(0 12px 25px rgba(0, 0, 0, 0.18));
}

/* RIGHT PANEL */
.right-panel {
    width: 55%;
    padding: 60px 55px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: #fff;
}

.right-panel h3 {
    font-size: 2.2rem;
    font-weight: 800;
    color: #222;
    margin-bottom: 10px;
    text-align: center;
}

.subtitle {
    text-align: center;
    color: #888;
    margin-bottom: 35px;
    font-size: 0.95rem;
}

/* Input Group */
.input-group-custom {
    display: flex;
    align-items: center;
    padding: 14px 16px;
    border: 1.5px solid #e5e7eb;
    border-radius: 14px;
    margin-bottom: 18px;
    background: #fafafa;
    transition: 0.3s;
}

.input-group-custom i.fa-eye, 
.input-group-custom i.fa-eye-slash {
    margin-right: 10px;
    color: #94a3b8; 
    transition: color 0.2s;
}

.input-group-custom i.fa-eye:hover, 
.input-group-custom i.fa-eye-slash:hover {
    color: #10b981; 
}

.input-group-custom:focus-within {
    border-color: #3cbfae;
    background: #fff;
    box-shadow: 0 0 0 5px rgba(60, 191, 174, 0.12);
}

.input-group-custom i {
    color: #aaa;
    margin-right: 12px;
    font-size: 0.95rem;
}

/* Forgot Password */
.forgot-password {
    text-align: right;
    margin-top: -4px;
    margin-bottom: 25px;
}

.forgot-password a {
    color: #3cbfae;
    text-decoration: none;
    font-size: 0.9rem;
    font-weight: 700;
    transition: 0.3s;
}

.forgot-password a:hover {
    color: #2fa898;
}

/* Login Button */
.btn-login {
    width: 100%;
    border: none;
    padding: 14px;
    border-radius: 50px;
    background: linear-gradient(135deg, #3cbfae, #2fa898);
    color: #fff;
    font-weight: 800;
    font-size: 0.95rem;
    letter-spacing: 1px;
    text-transform: uppercase;
    transition: 0.3s;
    box-shadow: 0 10px 25px rgba(60, 191, 174, 0.25);
    cursor: pointer;
}

.btn-login:hover {
    transform: translateY(-2px);
    box-shadow: 0 15px 30px rgba(60, 191, 174, 0.35);
}

.btn-login:disabled {
    background: #ccc;
    cursor: not-allowed;
    box-shadow: none;
}

/* Responsive */
@media(max-width:850px) {
    .login-container {
        padding: 80px 20px 20px;
        position: absolute;
        /* អនុញ្ញាតឱ្យរត់តាមកម្ពស់អេក្រង់ទូរស័ព្ទ */
    }

    .card-wrapper {
        flex-direction: column;
        max-width: 430px;
    }

    .left-panel,
    .right-panel {
        width: 100%;
    }

    .left-panel {
        min-height: 350px;
        padding: 40px 30px 200px;
    }

    .welcome-text h2 {
        font-size: 2.2rem;
    }

    .right-panel {
        padding: 40px 28px;
    }

    .floating-back-btn {
        top: 15px;
        left: 15px;
        padding: 10px 14px;
        font-size: 0.85rem;
    }
}
</style>
