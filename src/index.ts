import {User} from "./model/User";

const user = User.buildUser({age: 50, name: "drain brain"});
user.on('save',  () => {console.log('user saved')});
user.save();
const brainDrain = user.get('name');
