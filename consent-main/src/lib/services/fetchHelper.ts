class FetchHelper {
    private static instance: FetchHelper | null = null;
    private baseUrl = '/api/';
    private constructor() {}

    static getInstance(): FetchHelper {
        if (!FetchHelper.instance) {
            FetchHelper.instance = new FetchHelper();
        }
        return FetchHelper.instance;
    }

    async get<T>(endpoint: string): Promise<T> {
        const response = await fetch(`${this.baseUrl}${endpoint}`);
        const data = await response.json();
        return data;
    }

    async post<T>(endpoint: string, body: any): Promise<T> {
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        const data = await response.json();
        return data;
    }

}

export default FetchHelper;
