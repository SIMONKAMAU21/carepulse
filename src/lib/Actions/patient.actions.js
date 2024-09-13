import { Query, ID } from "node-appwrite";
import { users } from "../appwriteConfig.js";

export const createUser = async (user) => {
  try {
    // Creating a new user with unique ID
    const newUser = await users.create(ID.unique(), user.email, user.phone, user.name);
    console.log('New User Created:', newUser);
    return newUser;
  } catch (error) {
    // If a conflict error (email already exists) occurs, check if the user exists
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
