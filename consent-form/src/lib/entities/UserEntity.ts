import {BaseEntity} from "./BaseEntity";
import {ConsentEntity} from "./ConsentEntity";

export class UserEntity extends BaseEntity<UserEntity> {
    name: string = '';
    email: string = '';
    consents: ConsentEntity[] = [];
}