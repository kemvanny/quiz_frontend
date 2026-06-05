import { ref } from 'vue'

export function useFormValidation() {
    const errors = ref({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        role: ''
    })

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,}$/

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
        const trimmedValue = value ? value.trim() : '';

        if (trimmedValue === '') {
            errors.value.firstName = 'សូមបញ្ចូលនាមខ្លួន!'
        } else if (trimmedValue.length < 2) {
            errors.value.firstName = 'នាមខ្លួនត្រូវមានយ៉ាងហោចណាស់ ២ តួអក្សរឡើងទៅ!'
        } else if (trimmedValue.length > 50) {
            errors.value.firstName = 'នាមខ្លួនមិនអាចវែងជាង ៥០ តួអក្សរឡើយ!'
        } else if (!namePattern.test(trimmedValue)) {
            errors.value.firstName = 'នាមខ្លួនមិនអាចមានលេខ ឬសញ្ញាពិសេសឡើយ អនុញ្ញាតតែអក្សរខ្មែរ ឬ អង់គ្លេស)!'
        } else {
            errors.value.firstName = ''
        }
    }

   const validateLastName = (value) => {
        const trimmedValue = value ? value.trim() : '';

        if (trimmedValue === '') {
            errors.value.lastName = 'សូមបញ្ចូលនាមត្រកូល!'
        } else if (trimmedValue.length < 2) {
            errors.value.lastName = 'នាមត្រកូលត្រូវមានយ៉ាងហោចណាស់ ២ តួអក្សរឡើងទៅ!'
        } else if (trimmedValue.length > 50) {
            errors.value.lastName = 'នាមត្រកូលមិនអាចវែងជាង ៥០ តួអក្សរឡើយ!'
        } else if (!namePattern.test(trimmedValue)) {
            errors.value.lastName = 'នាមត្រកូលមិនអាចមានលេខ ឬសញ្ញាពិសេសឡើយ អនុញ្ញាតតែអក្សរខ្មែរ ឬ អង់គ្លេស)!'
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