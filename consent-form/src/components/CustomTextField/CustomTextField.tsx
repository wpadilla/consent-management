import {Fade, FormGroup, FormHelperText, Input, InputAdornment, InputLabel, Slide} from "@mui/material";
import {useCallback, useEffect, useId, useRef} from "preact/compat";
import styled from "@emotion/styled";
import {ChangeEvent} from "react";
import {computed, useSignal} from "@preact/signals";
import {
    CustomTextFieldValidationRegExps, ICustomFieldOnChangeValue,
    ICustomTextFieldProps,
    ICustomTextFieldValidationValue
} from "../../lib/types/customTextField.types";
import {customTextFieldValidationRegExps, VALIDATION_MESSAGES} from "../../lib/constants/validationConstants";


const CustomFormGroup: any = styled(FormGroup)`
  display: flex;
  flex-direction: column;
  overflow: hidden;

  .CustomTextField {
    &__custom-label {
      font-size: 2.5rem;
      display: block;
      width: 100%;
      text-align: center;
      margin-bottom: 2rem;
    }

    &__icon {
      &-end {
        cursor: pointer;
      }
    }
  }
`;


export const CustomTextField = (
    {
        startIcon,
        endIcon,
        label,
        onEnter,
        value,
        onChange,
        type,
        validations,
        disabled,
    }: ICustomTextFieldProps) => {
    const labelRef = useRef(null);
    const id = useId();
    const customFormErrorMsg = useSignal('');
    const animations = useSignal<{ label?: boolean, input?: boolean }>({label: false, input: false});
    const enabledAnimations = computed(() => animations.value).value;
    const isTouched = useSignal(false);
    const {value: touched} = computed(() => isTouched.value);
    const handleKeyDown = (event: any) => {
        if (event.key === 'Enter') {
            onEnter?.();
        }
    }

    const handleOnChange = (event: ChangeEvent<HTMLInputElement> & any) => {
        const value = event?.target?.value || '';
        const {errorMessage, valid} = validateCustomTextField(value)
        const data: ICustomFieldOnChangeValue = {
            valid,
            errorMessage,
            value,
        }
        onChange?.(data)
    };

    const handleOnBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        isTouched.value = true;
        validateCustomTextField(value);
    }

    const validateCustomTextField = useCallback((valueStr: string = value) => {
        let error = '';
        let isValid = true;
        if (validations) {
            const validationKeys: (keyof CustomTextFieldValidationRegExps)[] = (Object.keys(validations) as (keyof CustomTextFieldValidationRegExps)[]);
            for (const key of validationKeys) {
                const {value: validValue, errorMessage} = validations[key] as ICustomTextFieldValidationValue<any>;

                const regExp = customTextFieldValidationRegExps[key]?.(validValue);
                if (regExp) {
                    isValid = regExp.test(valueStr)
                    if (!isValid) {
                        error = errorMessage || VALIDATION_MESSAGES.defaultErrorMessages;
                        break;
                    }
                }
            }
            if (touched) {
                customFormErrorMsg.value = error;
            }
        }

        return {valid: isValid, errorMessage: error};
    }, [value, touched, validations]);

    useEffect(() => {
        handleOnChange({target: {value}});
    }, [touched]);

    useEffect(() => {
        setTimeout(() => {
            animations.value = {...enabledAnimations, label: !!label};
            setTimeout(() => {
                animations.value = {...animations.value, input: true};
                setTimeout(() => {
                    labelRef.current?.click();
                }, 100)
            }, 200)
        }, 200);
    }, [label])

    return (
        <CustomFormGroup>
            {label && <Slide direction="down" in={enabledAnimations.label}>
                <InputLabel ref={labelRef} className="CustomTextField__custom-label" htmlFor={id}>{label}</InputLabel>
            </Slide>}
            <Fade in={enabledAnimations.input}>
                <Input
                    value={value}
                    disabled={disabled}
                    onBlur={handleOnBlur}
                    error={!!customFormErrorMsg.value}
                    type={type}
                    onKeyDown={handleKeyDown}
                    onChange={handleOnChange}
                    className="CustomTextField__custom-input" id={id}
                    startAdornment={
                        <InputAdornment position="start" className="CustomTextField__icon CustomTextField__icon-start">
                            {startIcon}
                        </InputAdornment>
                    }
                    endAdornment={
                        <InputAdornment position="end" className="CustomTextField__icon CustomTextField__icon-end">
                            {endIcon}
                        </InputAdornment>
                    }/>
            </Fade>
            <FormHelperText error={true}>{customFormErrorMsg}</FormHelperText>
        </CustomFormGroup>
    )
}
