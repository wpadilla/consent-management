import React, { useEffect, useRef} from "react";
import { mountConsentForm } from "consent_form/Mount";
export const ConsentFormWrapper = () => {
    const consentFormRef = useRef(null);

    useEffect(() => {
        if(consentFormRef.current) {
            mountConsentForm(consentFormRef.current);
        }
    }, []);

    return(
        <div>
            <div ref={consentFormRef}/>
        </div>
    );
}