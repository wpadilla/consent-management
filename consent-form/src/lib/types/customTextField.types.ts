export interface ICustomTextFieldValidationValue<T> {
    value?: T;
    errorMessage?: string;
}

export interface ICustomTextFieldValidations {
    minLength?: ICustomTextFieldValidationValue<number>;
    email?: ICustomTextFieldValidationValue<boolean>;
}

export type CustomTextFieldValidationRegExps = {
    [key in keyof ICustomTextFieldValidations]: (value?: any) => RegExp;
}

export interface ICustomFieldOnChangeValue {
    value: string;
    valid?: boolean;
    errorMessage?: string;
}
export interface ICustomTextFieldProps {
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
    label?: string;
    onEnter?: () => void;
    onChange?: (value: ICustomFieldOnChangeValue) => void;
    value: string;
    type?: string;
    validations?: ICustomTextFieldValidations;
    disabled?: boolean;
}
