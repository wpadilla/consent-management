import FetchHelper from "./fetchHelper";
import {UserEntity} from "../entities/UserEntity";

export class UserService {
    fetch: FetchHelper;
    constructor() {
        this.fetch = FetchHelper.getInstance();
    }
    async get() {
        const users = await this.fetch.get('users');
        const event = new CustomEvent('loadUsers', { detail: users })
        window.dispatchEvent(event);
        return users;
    }

    async add(user: UserEntity) {
        const event = new CustomEvent('userAdded', { detail: user })
        window.dispatchEvent(event);
        return await this.fetch.post('users', user);
    }
}