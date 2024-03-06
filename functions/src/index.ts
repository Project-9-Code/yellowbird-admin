import graphql from "./graphql";
import {createUserProfile, deleteUserProfile} from "./syncUserProfile";
require("firebase-functions/logger/compat");

export {graphql, createUserProfile, deleteUserProfile};
