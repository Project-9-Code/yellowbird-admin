import type {CodegenConfig} from "@graphql-codegen/cli";
import {schemaJson} from "./src/graphql/schema";

const config: CodegenConfig = {
  overwrite: true,
  schema: schemaJson,
  generates: {
    "graphql_types.ts": {
      config: {
        useIndexSignature: true,
      },
      plugins: ["typescript", "typescript-resolvers"],
    },
  },
};

export default config;
