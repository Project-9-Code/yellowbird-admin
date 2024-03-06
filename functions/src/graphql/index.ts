/* eslint-disable new-cap */
import express from "express";
import cors from "cors";
import http from "http";
import * as functions from "firebase-functions";
import {ApolloServer} from "@apollo/server";
import {expressMiddleware} from "@apollo/server/express4";
import {
  ApolloServerPluginDrainHttpServer,
} from "@apollo/server/plugin/drainHttpServer";
import {schema} from "./schema";

const app = express();
const httpServer = http.createServer(app);

app.use(cors());
app.use(express.json());

const plugins = [ApolloServerPluginDrainHttpServer({httpServer})];

const server = new ApolloServer({
  schema,
  status400ForVariableCoercionErrors: true,
  introspection: true,
  plugins: plugins,
  csrfPrevention: false,
});

server.start().then(() => {
  app.use("/", expressMiddleware(server));
  console.log("Server started");
});

export default functions.https.onRequest(app);
