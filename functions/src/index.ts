import graphql from "./graphql";
import {createUserProfile, deleteUserProfile} from "./syncUserProfile";
import {aggregateCourseData} from "./courseAggregation";
require("firebase-functions/logger/compat");

export {graphql, createUserProfile, deleteUserProfile, aggregateCourseData};
