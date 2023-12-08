import FetchHelper from "./fetchHelper";
import {ConsentEntity} from "../entities/ConsentEntity";
export class ConsentService {
    fetch: FetchHelper;
    constructor() {
        this.fetch = FetchHelper.getInstance();
    }
    async get() {
        return await this.fetch.get('consents');
    }

    async add(consent: ConsentEntity) {
        const event = new CustomEvent('consentAdded', { detail: consent })
        window.dispatchEvent(event);
        return await this.fetch.post('consents', consent);
    }
}