import {BaseEntity, generateEntity} from "./BaseEntity";
import {ConsentEntity} from "./ConsentEntity";

export class UserEntity extends BaseEntity<UserEntity> {
    name: string = '';
    email: string = '';
    consents?: ConsentEntity[];
    constructor(data: UserEntity) {
        super();
        generateEntity<UserEntity>(this, data);
    }
}