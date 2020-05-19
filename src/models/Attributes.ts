export class Attributes<T> {
    constructor(private data: T) {}

    /**
     * Generic Constraint:
     * The type of K can only ever be one of the keys of T.
     */
    get<K extends keyof T>(key: K): T[K] {
        return this.data[key];
    }

    set(update: T): void {
        Object.assign(this.data, update);
    }
}
