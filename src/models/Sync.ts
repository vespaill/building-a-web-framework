import axios, { AxiosResponse, AxiosPromise } from "axios";
import { UserProps } from "./User";

export class Sync {
    constructor(public rootUrl: string) {}
    /**
     * Returns data from the server about a particular user.
     * @param id id of the user to fetch.
     */
    fetch(id: number): AxiosPromise {
        return axios.get(`${this.rootUrl}/${id}`);
    }
    /**
     * If the given data argument contains an id property, updates the
     * corresponding document in the database with all the specified properties.
     * Otherwise creates a new document in the database having the specified
     * properties.
     * @param data object containing user data to update or create.
     */
    save(data: UserProps): AxiosPromise {
        const { id } = data;
        if (id) return axios.put(`${this.rootUrl}/${id}`, data);
        return axios.post(this.rootUrl, data);
    }
}
