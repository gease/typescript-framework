import axios from "axios";
import {Eventing} from "./Eventing";
import {Synching} from "./Synching";
import {Attributes} from "./Attributes";

export type UserParams = {
    id?: number,
    name?: string,
    age?: number
}

export class User {

    events: Eventing = new Eventing();
    synching = new Synching<UserParams>('http://localhost:3000/users/');
    attributes: Attributes<UserParams>;

    constructor(private data: UserParams) {
        this.attributes = new Attributes<UserParams>(data);
    }

    get on() {
        return this.events.on;
    }

    get trigger() {
        return this.events.trigger;
    }

    get set() {
        return this.attributes.set;
    }

    get get() {
        return this.attributes.get;
    }

    get getAll() {
        return this.attributes.getAll;
    }

    async fetch() {
        const id = this.get('id');
        if (id) {
            this.set(await this.synching.fetch(id));
        }
    }

    async save() {
        this.set(await this.synching.save(this.getAll()));
        this.trigger('save');
    }
}
    

