import {Eventing} from "./Eventing";
export type Callback = () => void

export interface Identifiable extends Object {
    id?: number;
}

export interface EventingInterface {
    events: { [key: string]: Callback[] };
    on(eventName: string, callback: Callback): void;
    trigger(eventName: string): void;
}

export interface SynchingInterface<T extends Identifiable>{
    fetch(id: number): Promise<T | {}>
    fetchAll(): Promise<T[]>
    save (object: T): Promise<T | {}>
}

export interface AttributesInterface<T extends object> {
    get<K extends keyof T>(param: K):T[K] | undefined;

    set (param: T | {}): void;
    getAll(): T;
}

export abstract class Model<T extends Identifiable> {

    constructor(
        private events: Eventing,
        private synching: SynchingInterface<T>,
        private attributes: AttributesInterface<T>)
    {}

    get on() {
        return this.events.on;
    }

    get trigger() {
        return this.events.trigger;
    }

    set = (params: T | {}): void => {
        this.attributes.set(params);
        this.trigger('model_change');
    }

    get get() {
        return this.attributes.get;
    }

    get getAll() {
        return this.attributes.getAll;
    }

    fetch = async () => {
        const id = this.get('id');
        if (id) {
            this.set(await this.synching.fetch(id));
        }
    }

    save = async () => {
        this.set(await this.synching.save(this.getAll()));
        this.trigger('save');
    }
}
