import { Eventing } from "./Eventing";
import { Sync } from "./Sync";
import { Attributes } from "./Attributes";

export interface UserProps {
    id?: number;
    name?: string;
    age?: number;
}

const rootUrl = "http://localhost:3000/users";

/* Composition Options:
   #1: Accept dependencies as second constructor argument.
   #2: Only accept dependencies into constructor and define a static class
       method to pre-configure User and assign properties afterwards.
   #3: Only accept properties into constructor and hard-code dependencies as
       class properties.
*/
export class User {
    public events: Eventing = new Eventing();
    public sync: Sync<UserProps> = new Sync<UserProps>(rootUrl);
    public attributes: Attributes<UserProps>;

    constructor(attrs: UserProps) {
        this.attributes = new Attributes<UserProps>(attrs);
    }
}
