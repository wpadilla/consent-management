
export function generateEntity<T>(instance: T, data: T) {
    const keys: (keyof T)[] = Object.keys(data) as (keyof T)[];
    keys.forEach((key) => {
        instance[key] = data[key];
    });
}
export class BaseEntity<T> {
    readonly id?: string = Math.random().toString(36).substr(2, 9);
}

