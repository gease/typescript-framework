import {Eventing} from "./Eventing";
import {Synching} from "./Synching";
import {Attributes} from "./Attributes";
import {Model} from "./Model";

export type UserParams = {
    id?: number,
    name?: string,
    age?: number
}

export class User extends Model<UserParams>{

    static buildUser = (params: UserParams): User => {

        return new User (new Eventing(), new Synching<UserParams>('http://localhost:3000/users/'), new Attributes<UserParams>(params))
    }

}
