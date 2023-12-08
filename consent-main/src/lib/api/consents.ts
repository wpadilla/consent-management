import { http, HttpResponse } from 'msw';
import LocalStorageHelper from "../services/localStorage";
import {ConsentEntity} from "../entities/ConsentEntity";
import {UserEntity} from "../entities/UserEntity";

export const consentsHandlers = [
    http.get('/api/consents', ({request}) => {
        const localData = LocalStorageHelper.getInstance();
        const consents = localData.getItem<ConsentEntity[]>('consents') || [];
        return HttpResponse.json([
            new ConsentEntity({
                name: 'Receive newsletter',
            }),
            new ConsentEntity({
                name: 'Be shown targeted ads',
            }),
            new ConsentEntity({
                name: 'Contributor to anonymous visit statistics',
            }),
        ], { status: 201 });
    }),

    // Mock a POST request
    http.post('/api/consents', async ({request}) => {
        const consent: ConsentEntity = (await request.json()) as ConsentEntity;
        const localData = LocalStorageHelper.getInstance();
        const consents = localData.getItem<ConsentEntity[]>('consents') || [];
        consents.push(consent);
        localData.setItem('consents', consents);
        return HttpResponse.json( consent, { status: 201 });
    }),
];