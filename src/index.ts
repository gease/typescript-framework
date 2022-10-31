import {User} from "./model/User";
import {UserCollection} from "./UserCollection";

const users = new UserCollection();
users.on('loaded', () => console.log('Users loaded'));
users.fetch();