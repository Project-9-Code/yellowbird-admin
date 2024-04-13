/* eslint-disable new-cap */
import * as functions from "firebase-functions";
import {createYoga} from "graphql-yoga";
import {schema} from "./schema";

const yoga = createYoga({
  schema,
  graphqlEndpoint: "*",
  batching: true,
  plugins: [],
});

export default functions.https.onRequest(yoga);
