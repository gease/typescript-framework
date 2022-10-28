import axios from "axios";

interface Identifiable {
    id?: number;
}

export class Synching<T extends Identifiable> {

    constructor(private url: string) {}

    async fetch(id: number): Promise<T | {}> {
        try {
            const data = await axios.get(`${this.url}${id}`);
            return  data.data;
        } catch (e) {
            console.log(e);
            return {};
        }
    }

    async save(object: T): Promise<T | {}> {
        try {
            const id = object.id;
            let data = {};
            if (id) {
                data = await axios.put(`${this.url}${id}`, object);
            } else {
                data = await axios.post(`${this.url}`, object);
            }
            // @ts-ignore
            return data.data;
        } catch (e) {
            console.log(e);
            return {};
        }
    }
}
