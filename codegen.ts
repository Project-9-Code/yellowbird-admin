import { CodegenConfig } from '@graphql-codegen/cli';
import { GRAPHQL_API_URL } from './src/utils/auth/common';

const config: CodegenConfig = {
  schema: GRAPHQL_API_URL,
  documents: ['src/**/*.{ts,tsx}'],
  generates: {
    './src/graphql/': {
      preset: 'client',
      plugins: [],
      presetConfig: {
        gqlTagName: 'gql',
      }
    }
  },
  ignoreNoDocuments: true,
};

export default config;
