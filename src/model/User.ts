import axios from "axios";
import {Eventing} from "./Eventing";

type UserParams = {
    id?: number,
    name?: string,
    age?: number
}

export class User {

    events: Eventing = new Eventing();

    constructor(private data: UserParams) {
    }

    public get (param: keyof UserParams): UserParams[keyof UserParams] | undefined {
        return this.data[param];
    }
    get name():string | undefined {
        return this.data.name;
    }

    public set (param: UserParams): void {
        Object.assign(this.data, param);
    }

    async fetch(): Promise<void> {
        try {
            const data = await axios.get(`http://localhost:3000/users/${this.data.id}`);
            Object.assign(this.data, data.data);
        }
        catch (e) {
            console.log(e);
        }
    }

    async save():Promise<void> {
        try {
            const id = this.get('id');
            if (id) {
                await axios.put(`http://localhost:3000/users/${id}`, this.data);
            }
            else {
                const data = await axios.post(`http://localhost:3000/users/`, this.data);
                Object.assign(this.data, data.data);
            }
        }
        catch (e) {
            console.log(e);
        }
    }
}
