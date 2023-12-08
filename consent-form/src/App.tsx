import { render } from "preact";
import {useEffect, useRef} from "preact/compat";
import {mountConsentForm} from "./bootstrap";
const App = () => {
    const consentFormRef = useRef(null);

    useEffect(() => {
        mountConsentForm(consentFormRef.current);
    }, []);

   return (
        <div className="consent-form-app">
            {/*<ConsentForm />*/}
            <div ref={consentFormRef}/>
        </div>
    )
};

render(<App />, document.getElementById("app"));
