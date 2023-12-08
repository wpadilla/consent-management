import {BaseEntity, generateEntity} from "./BaseEntity";

export class ConsentEntity extends BaseEntity<ConsentEntity> {
    name: string = '';
    constructor(data: ConsentEntity) {
        super();
        generateEntity<ConsentEntity>(this, data);
    }
}