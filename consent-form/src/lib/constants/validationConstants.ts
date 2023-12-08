import {CustomTextFieldValidationRegExps} from "../types/customTextField.types";

export const VALIDATION_MESSAGES = {
    defaultErrorMessages: 'Invalid value.',
    invalidEmail: 'Please enter a valid email address.',
    invalidLength: (length: number) => `At least ${length} characters required.`,
}

export const customTextFieldValidationRegExps: CustomTextFieldValidationRegExps = {
    minLength: (value: number) => new RegExp(`^.{${value},}$`),
    email: () => new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'),
}