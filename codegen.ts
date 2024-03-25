import { GRAPHQL_API_URL } from './src/utils/common';
import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: GRAPHQL_API_URL,
  documents: ['src/**/*.{ts,tsx}'],
  generates: {
    './src/graphql/': {
      preset: 'client',
      plugins: [],
      presetConfig: {
        gqlTagName: 'gql',
        dedupeFragments: true,
      }
    }
  },
  ignoreNoDocuments: true,
};

export default config;
