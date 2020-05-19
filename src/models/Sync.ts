import axios, { AxiosResponse, AxiosPromise } from "axios";

interface HasId {
    id?: number;
}

/**
 * Can only use class Sync with some type T that has an id property that is a
 * number.
 */
export class Sync<T extends HasId> {
    constructor(public rootUrl: string) {}
    /**
     * Returns data from the server about a particular user.
     * @param id id of the user to fetch.
     */
    fetch(id: number): AxiosPromise<T> {
        return axios.get(`${this.rootUrl}/${id}`);
    }
    /**
     * If the given data argument contains an id property, updates the
     * corresponding document in the database with all the specified properties.
     * Otherwise creates a new document in the database having the specified
     * properties.
     * @param data object containing user data to update or create.
     */
    save(data: T): AxiosPromise<T> {
        const { id } = data;
        if (id) {
            return axios.put(`${this.rootUrl}/${id}`, data);
        } else {
            return axios.post(this.rootUrl, data);
        }
    }
}
