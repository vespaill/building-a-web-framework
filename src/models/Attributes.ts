export class Attributes<T> {
    constructor(private data: T) {}

    /**
     * Generic Constraint:
     * The type of K can only ever be one of the keys of T. In the case of
     * UserProps, then this means that K can only ever be the strings 'id',
     * 'name', or 'age'
     *
     * Turn 'get' into an arrow function so that 'this' always refers to an
     * instance of Attributes.
     */
    get = <K extends keyof T>(key: K): T[K] => {
        return this.data[key];
    }

    set(update: T): void {
        Object.assign(this.data, update);
    }
}
