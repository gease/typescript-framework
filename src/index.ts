import {UserCollection} from "./UserCollection";
import {UserForm} from "./UserForm";

const users = new UserCollection();
users.fetch().then(() => {
  let user = users.get(0);
  console.log(user);
  const userForm = new UserForm(user);
  userForm.render();
});
