import { Query, ID } from "node-appwrite";
import { users } from "../appwriteConfig.js";

export const createUser = async (user) => {
  try {
    const newUser = await users.create(ID.unique(), user.email, user.phone,undefined, user.name);
    console.log('New User Created:', newUser);
    return newUser;
  } catch (error) {
    if (error && error?.code === 409) {
      try {
        const userList = await users.list([Query.equal('email', user.email)]);
        if (userList.total > 0) {
          console.log('User already exists:', userList.documents[0]);
          return userList.documents[0];
        }
      } catch (listError) {
        console.log('Error fetching user:', listError);
      }
    } else {
      console.log('Error creating user:', error);
    }
  }
};
