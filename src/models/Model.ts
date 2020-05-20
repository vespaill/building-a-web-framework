import { AxiosResponse, AxiosPromise } from "axios";

interface ModelAttributes<T> {
    get<K extends keyof T>(key: K): T[K];
    getAll(): T;
    set(update: T): void;
}

interface Sync<T> {
    fetch(id: number): AxiosPromise;
    save(data: T): AxiosPromise;
}

interface Events {
    on(eventName: string, callback: () => void): void;
    trigger(eventName: string): void;
}

interface HasId {
    id?: number;
}

export class Model<T extends HasId> {
    constructor(
        private attributes: ModelAttributes<T>,
        private events: Events,
        private sync: Sync<T>
    ) {}

    /**
     * These 'getters' are the save as if we had written something like
     * get on() { return this.events.on; }
     * However, they only work if the properties they reference have already
     * been defined. To make sure that's the case, we need to include them in a
     * constructor list as arguments.
     */
    on = this.events.on;
    trigger = this.events.trigger;
    get = this.attributes.get;

    set(update: T): void {
        this.attributes.set(update);
        this.events.trigger("change");
    }

    fetch(): void {
        const id = this.get("id");
        if (typeof id !== "number")
            throw new Error("Cannot fetch without an id");

        this.sync
            .fetch(id)
            .then((response: AxiosResponse): void => {
                this.set(response.data);
            });
    }

    save(): void {
        this.sync
            .save(this.attributes.getAll())
            .then((response: AxiosResponse): void => {
                this.trigger("save");
            })
            .catch(() => {
                this.trigger("error");
            });
    }
}
