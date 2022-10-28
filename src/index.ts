import {User} from "./model/User";
import axios from "axios";

const user = new User({age: 50, name: "hujlo"});
user.on('save',  () => {console.log('user saved')});
user.save();
const putler = user.get('name');