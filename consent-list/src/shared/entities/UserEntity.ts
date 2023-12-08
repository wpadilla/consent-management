import {ConsentEntity} from "./ConsentEntity";

export class UserEntity {
    id = ''
    name = '';
    email = '';
    consents: ConsentEntity[] = [];
}
