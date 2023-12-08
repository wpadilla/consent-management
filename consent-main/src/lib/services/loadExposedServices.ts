import {UserService} from "./userService";
import {ConsentService} from "./consentService";

const exposedServices = {
    users: UserService,
    consents: ConsentService,
}

export default exposedServices;