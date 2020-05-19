import { Eventing } from "./Eventing";

export interface UserProps {
    id?: number;
    name?: string /* optional */;
    age?: number;
}

/* Composition Options:
   #1: Accept dependencies as second constructor argument.
   #2: Only accept dependencies into constructor and define a static class
       method to pre-configure User and assign properties afterwards.
   #3: Only accept properties into constructor and hard-code dependencies as
       class properties.
*/
export class User {
    public events: Eventing = new Eventing();
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
}