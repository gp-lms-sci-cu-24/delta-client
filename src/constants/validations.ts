import { Gender } from "@features/admin/student/type";
import { PASSWORD_LOGIN_MAX_LENGTH, PASSWORD_LOGIN_MIN_LENGTH, USERNAME_LOGIN_MAX_LENGTH, USERNAME_LOGIN_MIN_LENGTH } from "@/features/auth/constants";
import { RegisterOptions } from 'react-hook-form';

export const codeValidation: RegisterOptions = {
    required: {
      value: true,
      message: "Code field is required."
    },
    minLength: {
      value: 7,
      message: "Code must be exactly 7 characters long."
    },
    maxLength: {
      value: 7,
      message: "Code cannot exceed 7 characters."
    },
    valueAsNumber: true 
};

export const nameValidation: RegisterOptions = {
    required: {
      value: true,
      message: "Please enter a name."
    },
    minLength: {
      value: 2,
      message: "Name must be at least 2 characters long."
    }
};

export const genderValidation: RegisterOptions={
    required: {
      value: true,
      message: "Please select a gender."
    },
    validate: (value) => {
      if (!value || !(value === Gender.MALE || value === Gender.FEMALE)) {
        return "Please select a valid gender option (Male or Female).";
      }
      return true;
    }
}

export const joiningYearValidation: RegisterOptions={
    required: {
      value: true,
      message: "Joining year is required."
    },
    minLength: {
      value: 4,
      message: "Joining year must be a 4-digit number (e.g., 2023)."
    },
    maxLength: {
      value: 4,
      message: "Joining year cannot exceed 4 characters."
    }
}
export const passwordValidation: RegisterOptions={
    required: {
      value: true,
      message: "password is required",
    },
    minLength: {
      value: PASSWORD_LOGIN_MIN_LENGTH,
      message: "password is too short",
    },
    maxLength: {
      value: PASSWORD_LOGIN_MAX_LENGTH,
      message: "password is too long",
    },
}
export const emailValidation = {
    required: "Email is required",
    pattern: {
      value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      message: "Please enter a valid email address",
    },
};
export const usernameValidation: RegisterOptions = {
  required: {
    value: true,
    message: "username is required",
  },
  minLength: {
    value: USERNAME_LOGIN_MIN_LENGTH,
    message: "username is too short",
  },
  maxLength: {
    value: USERNAME_LOGIN_MAX_LENGTH,
    message: "username is too long",
  },
};
