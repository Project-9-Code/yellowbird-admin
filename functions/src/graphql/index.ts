/* eslint-disable new-cap */
import * as functions from "firebase-functions";
import {createYoga} from "graphql-yoga";
import {schema} from "./schema";
import {useResponseCache} from "@graphql-yoga/plugin-response-cache";

const yoga = createYoga({
  schema,
  graphqlEndpoint: "*",
  batching: true,
  plugins: [
    useResponseCache({
      session: () => null,
    }),
  ],
});

export default functions.https.onRequest(yoga);
