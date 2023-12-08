class LocalStorageHelper {
    private static instance: LocalStorageHelper | null = null;

    private constructor() {}

    static getInstance(): LocalStorageHelper {
        if (!LocalStorageHelper.instance) {
            LocalStorageHelper.instance = new LocalStorageHelper();
        }
        return LocalStorageHelper.instance;
    }

    getItem<T>(key: string): T | null {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (error) {
            console.error(`Error getting item from localStorage: ${error}`);
            return null;
        }
    }

    setItem<T>(key: string, data: T): void {
        try {
            const serializedData = JSON.stringify(data);
            localStorage.setItem(key, serializedData);
        } catch (error) {
            console.error(`Error setting item in localStorage: ${error}`);
        }
    }

    updateItem<T>(key: string, updateFn: (currentData: T | null) => T): void {
        try {
            const currentData = this.getItem<T>(key);
            const updatedData = updateFn(currentData);
            this.setItem(key, updatedData);
        } catch (error) {
            console.error(`Error updating item in localStorage: ${error}`);
        }
    }

    removeItem(key: string): void {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error(`Error removing item from localStorage: ${error}`);
        }
    }
}

export default LocalStorageHelper;
