import { ref } from "vue";

export function useFormValidation() {
  const errors = ref({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    role: "",
    phone: "",
    address: "",
    gender: "",
  });

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,}$/;

  const namePattern = /^[a-zA-Z Khmer\u1780-\u17F9\s]+$/;

  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()_+\-=[\]{};':"\\|,.<>\/?])[A-Za-z\d@$!%*?&#^()_+\-=[\]{};':"\\|,.<>\/?]{8,}$/;

  const phonePattern = /^(0\d{8,9})$/;

  const addressPattern = /^[a-zA-Z0-9 Khmer\u1780-\u17F9\s,.\/\-]+$/;

  const validateEmail = (value ,isRequired = true) => {
    if (!value) {
      errors.value.email = isRequired ? "សូមបញ្ចូលអ៊ីមែល!" : "";
    } else if (!emailPattern.test(value)) {
      errors.value.email = "ទម្រង់អ៊ីមែលមិនត្រឹមត្រូវ";
    } else {
      errors.value.email = "";
    }
  };

  const validatePassword = (value) => {
    if (!value) {
      errors.value.password = "សូមបញ្ចូលពាក្យសម្ងាត់!";
    } else if (!passwordPattern.test(value)) {
      errors.value.password =
        "ពាក្យសម្ងាត់ត្រូវមានយ៉ាងហោច ៨ខ្ទង់ រួមមានអក្សរធំ អក្សរតូច លេខ និងសញ្ញាពិសេសដូចជា @$!%*";
    } else {
      errors.value.password = "";
    }
  };

const validateFirstName = (value) => {
  const trimmedValue = value?.trim() || "";

  if (trimmedValue === "") {
    errors.value.firstName = "សូមបញ្ចូលនាមត្រកូល!";
  } else if (trimmedValue.length < 2) {
    errors.value.firstName = "នាមត្រកូលត្រូវមានយ៉ាងហោចណាស់ ២ តួអក្សរ!";
  } else if (trimmedValue.length > 50) {
    errors.value.firstName = "នាមត្រកូលមិនអាចលើសពី ៥០ តួអក្សរទេ!";
  } else if (!namePattern.test(trimmedValue)) {
    errors.value.firstName = "នាមត្រកូលអាចវាយបានតែអក្សរ ខ្មែរ​ ឬ អង់គ្លេស ប៉ុណ្ណោះ!";
  } else {
    errors.value.firstName = "";
  }
};

const validateLastName = (value) => {
  const trimmedValue = value?.trim() || "";

  if (trimmedValue === "") {
    errors.value.lastName = "សូមបញ្ចូលនាមខ្លួន!";
  } else if (trimmedValue.length < 2) {
    errors.value.lastName = "នាមខ្លួនត្រូវមានយ៉ាងហោចណាស់ ២ តួអក្សរ!";
  } else if (trimmedValue.length > 50) {
    errors.value.lastName = "នាមខ្លួនមិនអាចលើសពី ៥០ តួអក្សរទេ!";
  } else if (!namePattern.test(trimmedValue)) {
    errors.value.lastName = "នាមខ្លួនអាចវាយបានតែអក្សរ ខ្មែរ​ ឬ អង់គ្លេស ប៉ុណ្ណោះ!";
  } else {
    errors.value.lastName = "";
  }
};

  const validateRole = (value) => {
    if (!value) {
      errors.value.role = "សូមជ្រើសរើសតួនាទីណាមួយ!";
    } else {
      errors.value.role = "";
    }
  };

 const validatePhone = (value) => {
  const phone = value?.trim() || "";

  if (!phone) {
    errors.value.phone = "សូមបញ្ចូលលេខទូរស័ព្ទ!";
  } else if (phone.length < 8 || phone.length > 10) {
    errors.value.phone = "លេខទូរស័ព្ទត្រូវមានពី ៨ ដល់ ១០ ខ្ទង់!";
  } else if (!phonePattern.test(phone)) {
    errors.value.phone = "ទម្រង់លេខទូរស័ព្ទមិនត្រឹមត្រូវ!";
  } else {
    errors.value.phone = "";
  }
};

const validateAddress = (value) => {
  const address = value?.trim() || "";

  if (!address) {
    errors.value.address = "សូមបញ្ចូលអាសយដ្ឋាន!";
  } else if (address.length < 4) {
    errors.value.address = "អាសយដ្ឋានត្រូវមានយ៉ាងហោចណាស់ ៤ តួអក្សរ!";
  } else if (address.length > 50) {
    errors.value.address = "អាសយដ្ឋានមិនអាចលើសពី ៥០ តួអក្សរទេ!";
  } else if (!addressPattern.test(address)) {
    errors.value.address = "អាសយដ្ឋានអាចវាយបានតែអក្សរ លេខ និងសញ្ញា ( , . / - ) ប៉ុណ្ណោះ!";
  } else {
    errors.value.address = "";
  }
};
  const validateAll = (data) => {
    validateFirstName(data.firstName);
    validateLastName(data.lastName);
    validatePhone(data.phone);
    validateAddress(data.address);

    return (
      !errors.value.firstName &&
      !errors.value.lastName &&
      !errors.value.phone &&
      !errors.value.address
    );
  };
  const validateGradeLevel = (value) => {
    if (!value || value.trim() === "") {
      errors.value.gradeLevel = "សូមបញ្ចូលឆ្នាំសិក្សា!";
    } else {
      errors.value.gradeLevel = "";
    }
  };

  const validateMajor = (value) => {
    if (!value || value.trim() === "") {
      errors.value.major = "សូមបញ្ចូលជំនាញ!";
    } else {
      errors.value.major = "";
    }
  };

  const validateGender = (value) => {
  if (!value || value.trim() === "") {
    errors.value.gender = "សូមជ្រើសរើសភេទរបស់អ្នក!";
  } else {
    errors.value.gender = "";
  }
};

  return {
    errors,
    validateEmail,
    validatePassword,
    validateFirstName,
    validateLastName,
    validateRole,
    validatePhone,
    validateAddress,
    validateAll,
    validateGradeLevel,
    validateMajor,
     validateGender
  };
}
