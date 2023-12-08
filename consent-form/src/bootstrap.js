import {render} from "preact";
import ConsentForm from "./mods/ConsentForm";
import {CustomTextField} from "./components/CustomTextField/CustomTextField";
import {Button} from "@mui/material";
const mountConsentForm = (el) => {
    render(<ConsentForm />, el);
};

export { mountConsentForm, ConsentForm };