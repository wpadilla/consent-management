import { http, HttpResponse } from 'msw';
import LocalStorageHelper from "../services/localStorage";
import {UserEntity} from "../entities/UserEntity";

export const userHandlers = [
    http.get('/api/users', ({request}) => {
        const localData = LocalStorageHelper.getInstance();
        const users = localData.getItem<UserEntity[]>('users') || [];
        return HttpResponse.json(users, { status: 200 });
    }),

    // Mock a POST request
    http.post('/api/users', async ({request}) => {
        const user: UserEntity = (await request.json()) as UserEntity;
        const localData = LocalStorageHelper.getInstance();
        const users = localData.getItem<UserEntity[]>('users') || [];
        users.unshift(user);
        localData.setItem('users', users);
        return HttpResponse.json(user, { status: 201 });
    }),
];