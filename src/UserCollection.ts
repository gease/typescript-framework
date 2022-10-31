import {User, UserParams} from "./model/User";
import {EventingInterface, Identifiable, Model, SynchingInterface} from "./model/Model";
import {Eventing} from "./model/Eventing";
import {Synching} from "./model/Synching";

export abstract class Collection<K extends Identifiable> {
    protected models: Model<K>[] = [];
    protected abstract events: EventingInterface;
    protected abstract synching: SynchingInterface<K>;
    abstract fetch(): void;

    get = (i: number): Model<K> => {
        return this.models[i];
    }

    get on() {
        return this.events.on;
    }

    get trigger() {
        return this.events.trigger;
    }
}


export class UserCollection extends Collection<UserParams> {

    protected events: EventingInterface;
    protected synching: SynchingInterface<UserParams>;

    constructor() {
        super();
        this.events = new Eventing();
        this.synching = new Synching<UserParams>('http://localhost:3000/users/')
    }

    fetch = async () => {
        const response = await this.synching.fetchAll();
        response.forEach((item) => {
            this.models.push(User.buildUser(item))
        })
        this.trigger('loaded');
        console.log(this.models);
    }
}
