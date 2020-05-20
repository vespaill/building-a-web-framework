import { User } from "./User";
import { Eventing } from "./Eventing";
import axios, { AxiosResponse } from "axios";

export class Collection {
    model: User[] = [];
    events: Eventing = new Eventing();

    constructor(public rootUrl: string) {}

    get on () { return this.events.on }
    get trigger() { return this.events.trigger }
    fetch(): void {
        axios
            .get(this.rootUrl)
            .then((response: AxiosResponse) => {
                response.data.forEach(value => {
                    this.model.push(User.buildUser(value));
                });
            });
        this.trigger("change");
    }
}