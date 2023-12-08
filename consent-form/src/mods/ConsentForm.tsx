import {
    Button,
    FormGroup,
    FormControlLabel, Checkbox, IconButton, Collapse
} from "@mui/material";
import {ArrowBackOutlined, EmailRounded, Abc, SendOutlined, EditOutlined} from "@mui/icons-material";
import {CustomTextField} from "../components/CustomTextField/CustomTextField";
import styled from "@emotion/styled";
import {UserEntity} from "../lib/entities/UserEntity";
import {ConsentEntity} from "../lib/entities/ConsentEntity";
import {ICustomFieldOnChangeValue} from "../lib/types/customTextField.types";
import {useEffect, useMemo} from "preact/compat";
import Services from "services/Load"
import {VALIDATION_MESSAGES} from "../lib/constants/validationConstants";
import {useErrorBoundary} from "preact/hooks";
import {useCustomSignal} from "../lib/hooks/useCustomSignal";

const ConsentFormWrapper: any = styled.div`
  * {
    transition: all 0.3s ease-in-out;
  }
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
    &.completed {
        gap: 2rem;
    }
  .ConsentForm {
    &__back {
      position: absolute;
      top: -0.3rem;
      left: -1rem;
    }
    
    &__give-consent-btn {
      margin-top: 1rem;
    }
    
    &__next-btn {
      margin-top: 2rem;
    }
  }
`;


const ConsentForm = () => {
    const [user, userData] = useCustomSignal<UserEntity>(new UserEntity());
    const [userDataCompleted, userIsCompleted] = useCustomSignal<boolean>(false);
    const [disableNext, isDisabledNext] = useCustomSignal(true);
    const [consents, consentsData] = useCustomSignal<ConsentEntity[]>([]);
    const [step, currentStep] = useCustomSignal<number>(1);
    const lastStep = useMemo(() => 2, []);
    const userService = useMemo(() => new Services.users(), []);
    const consentService = useMemo(() => new Services.consents(), []);
    const [error] = useErrorBoundary();
    const {name, email} = user.value;

    const onChangeUserProp = (prop: keyof UserEntity) => ({value, valid}: ICustomFieldOnChangeValue) => {
        disableNext.value = !valid;
        user.value = {
            ...userData,
            [prop]: value
        }
    }

    const onChangeConsents = ({target: {checked, value}}: any) => {
        if (checked) {
            const consent = consentsData.find(item => item.id === value);
            if (!consent) return;
            user.value = {
                ...userData,
                consents: [
                    ...(userData?.consents || []),
                    consent,
                ]
            }
        } else {
            user.value = {
                ...userData,
                consents: userData.consents?.filter(item => item.id !== value),
            }
        }
    }


    const next = () => {
        if (!isDisabledNext && currentStep !== lastStep) {
            step.value++
        }
        if (currentStep === lastStep && !isDisabledNext) {
            userDataCompleted.value = true;
        }
    };


    const back = () => {
        if(currentStep !== 1) {
            step.value--
        }
    };

    const incompleteUserData = () => userDataCompleted.value = false;

    const editUserName = () => {
        incompleteUserData();
        step.value = 1;
    }

    const sendNextIcon = useMemo(() => (
        <SendOutlined onClick={next} color={isDisabledNext ? 'disabled' : 'info'}/>
    ), [isDisabledNext]);

    const editNameIcon = useMemo(() => (
        <EditOutlined onClick={editUserName} color={'info'}/>
    ), [isDisabledNext]);

    const editEmailIcon = useMemo(() => (
        <EditOutlined onClick={incompleteUserData} color={'info'}/>
    ), [isDisabledNext]);

    const loadConsents = async () => {
        consents.value = await consentService.get();
    }

    const sendConsent = async () => {
        await userService.add(userData);
        await userService.get();
    }

    useEffect(() => {
        loadConsents();
    }, [])

    if(error) {
        console.error(error)
        return <div>Something went wrong, try Later.</div>
    }

    return (<ConsentFormWrapper className={userIsCompleted ? 'completed' : ''}>

            {currentStep > 1 && !userIsCompleted &&
                <IconButton onClick={back} className="ConsentForm__back">
                    <ArrowBackOutlined/>
                </IconButton>
            }
            {
                (currentStep === 1 || userIsCompleted) &&
                <CustomTextField
                    onChange={onChangeUserProp('name')}
                    value={name}
                    onEnter={next}
                    disabled={userIsCompleted}
                    endIcon={userIsCompleted ? editNameIcon : sendNextIcon}
                    label={!userIsCompleted ? "What is your name?" : ''}
                    startIcon={<Abc fontSize="large"/>}
                    validations={{
                        minLength: {
                            value: 3,
                            errorMessage: VALIDATION_MESSAGES.invalidLength(3),
                        }
                    }}
                />
            }
                {currentStep === lastStep &&
                    <>
                        <CustomTextField
                            onChange={onChangeUserProp('email')}
                            value={email}
                            onEnter={next}
                            disabled={userIsCompleted}
                            label={!userIsCompleted ? "What is your email?" : ''}
                            startIcon={<EmailRounded />}
                            endIcon={userIsCompleted ? editEmailIcon : sendNextIcon}
                            validations={{
                                email: {
                                    errorMessage: VALIDATION_MESSAGES.invalidEmail
                                }
                            }}
                        />
                            <Collapse orientation="vertical" in={userIsCompleted}>
                                {userIsCompleted &&
                                    <>
                                        <label>I Agree to:</label>
                                        <FormGroup>
                                            {consentsData.map(consent =>
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            value={consent.id}
                                                            onChange={onChangeConsents}
                                                        />
                                                    }
                                                    label={consent.name}
                                                />
                                            )}
                                        </FormGroup>
                                    </>
                                }
                            </Collapse>
                    </>
                }

                {userIsCompleted ?
                    <Button color="primary"
                            className="ConsentForm__give-consent-btn"
                            onClick={sendConsent}
                            variant="contained">
                        Give Consent
                    </Button>
                    : <Button className="ConsentForm__next-btn" disabled={isDisabledNext} onClick={next}>Next</Button>
                }
        </ConsentFormWrapper>
    );
}

export default ConsentForm;