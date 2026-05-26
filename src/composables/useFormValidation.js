import { ref } from 'vue'

export function useFormValidation() {
    const errors = ref({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        role: ''
    })

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    const namePattern = /^[a-zA-Z Khmer\u1780-\u17F9\s]+$/

    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()_+\-=[\]{};':"\\|,.<>\/?])[A-Za-z\d@$!%*?&#^()_+\-=[\]{};':"\\|,.<>\/?]{8,}$/;

    const validateEmail = (value) => {
        if (!value) {
            errors.value.email = 'សូមបញ្ចូលអ៊ីមែល!'
        } else if (!emailPattern.test(value)) {
            errors.value.email = 'ទម្រង់អ៊ីមែលមិនត្រឹមត្រូវ'
        } else {
            errors.value.email = ''
        }
    }

    const validatePassword = (value) => {
        if (!value) {
            errors.value.password = 'សូមបញ្ចូលពាក្យសម្ងាត់!'
        } else if (!passwordPattern.test(value)) {
            errors.value.password = 'ពាក្យសម្ងាត់ត្រូវមានយ៉ាងហោច ៨ខ្ទង់ រួមមានអក្សរធំ អក្សរតូច លេខ និងសញ្ញាពិសេសដូចជា @$!%*'
        } else {
            errors.value.password = ''
        }
    }

    const validateFirstName = (value) => {
        if (!value || value.trim() === '') {
            errors.value.firstName = 'សូមបញ្ចូលនាមខ្លួន!'
        } else if (!namePattern.test(value)) {
            errors.value.firstName = 'នាមខ្លួនអាចវាយបានតែអក្សរ (ខ្មែរ/អង់គ្លេស) ប៉ុណ្ណោះ ហាមប្រើសញ្ញាពិសេសផ្សេងៗ!'
        } else {
            errors.value.firstName = ''
        }
    }

    const validateLastName = (value) => {
        if (!value || value.trim() === '') {
            errors.value.lastName = 'សូមបញ្ចូលនាមត្រកូល!'
        } else if (!namePattern.test(value)) {
            errors.value.lastName = 'នាមត្រកូលអាចវាយបានតែអក្សរ (ខ្មែរ/អង់គ្លេស) ប៉ុណ្ណោះ ហាមប្រើសញ្ញាពិសេសផ្សេងៗ!'
        } else {
            errors.value.lastName = ''
        }
    }

    const validateRole = (value) => {
        if (!value) {
            errors.value.role = 'សូមជ្រើសរើសតួនាទីណាមួយ!'
        } else {
            errors.value.role = ''
        }
    }

    return {
        errors,
        validateEmail,
        validatePassword,
        validateFirstName,
        validateLastName,
        validateRole
    }
}