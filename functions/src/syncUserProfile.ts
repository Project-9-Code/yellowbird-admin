import {auth} from "firebase-functions";
import {createItem, deleteItem} from "./utils/database";
import {UserProfileInput} from "../graphql_types";

export const createUserProfile = auth.user().onCreate((user) => {
  createItem("users", {
    id: user.uid,
    email: user.email,
    name: user.displayName,
    profilePic: user.photoURL,
    isEmailVerified: user.emailVerified,
  } as UserProfileInput);
});

export const deleteUserProfile = auth.user().onDelete((user) => {
  deleteItem("users", user.uid);
});
