declare module "consent_form/Mount" {
    const Mount: any;
    export default Mount;
}

declare module "consent_list/Mount" {
    const Mount: any;
    export default Mount;
}


declare module "main_consent/Store" {
    import {Signal} from "@preact/signals-react";
    const Store: Signal;
    export default Store;
}
