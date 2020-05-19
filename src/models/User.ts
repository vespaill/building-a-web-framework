import axios, { AxiosResponse } from "axios"

interface UserProps {
    id?: number;
    name?: string /* optional */;
    age?: number;
}

type Callback = () => void;

export class User {
    events: { [key: string]: Callback[] } = {};
    /**
     * @param data Object to store information about a particular user (name, age).
     */
    constructor(private data: UserProps) {}
    /**
     * Gets a single piece of info about this user (name, age).
     * @param propName name of the UserProps preperty to get.
     */
    get(propName: string): string | number {
        return this.data[propName];
    }
    /**
     * Changes information about this user (name, age).
     * @param update UserProps object with update content.
     */
    set(update: UserProps): void {
        Object.assign(this.data, update);
    }
    /**
     * Registers an event handler with this object, so other parts of the app
     * know when something changes.
     * @param eventName Name of the event.
     * @param callback Function to execute on trigger.
     */
    on(eventName: string, callback: Callback): void {
        const handlers = this.events[eventName] || [];
        handlers.push(callback);
        this.events[eventName] = handlers;
    }
    /**
     * Triggers an event ot tell other parts of the app that something has
     * changed.
     * @param eventName Name of the event to trigger.
     */
    trigger(eventName: string): void {
        const handlers = this.events[eventName];
        if (!handlers || handlers.length === 0) return;

        handlers.forEach(callback => {
            callback();
        });
    }
    /**
     * Fetches some data from the server about a particular user.
     */
    fetch(): void {
        axios
            .get(`http://localhost:3000/users/${this.get('id')}`)
            .then((response: AxiosResponse): void => {
                this.set(response.data);
            });
    }
    /**
     * Saves some data about this user to the server.
     */
    save(): void {
        const id = this.get('id');
        if (id) {
            axios.put(`http://localhost:3000/users/${id}`, this.data);
        } else {
            axios.post("http://localhost:3000/users/", this.data);
        }
    }
}
